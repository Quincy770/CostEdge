<template>
  <vx-card>
    <div class="mt-2">
      <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
      <div :key="indextr" v-for="(order, indextr) in filteredOrders">
       <vs-collapse
          type="border"
          ref="open_me"
          class="knowledge-base-jumbotron-content"
        >
          <vs-collapse-item id="order" class="collapseItem" style="height: auto">
            <div slot="header" class="vx-row">
              <div class="vx-col sm:w-1/6 md-1/6 w-1/6">
                {{indextr + 1}}
              </div>
              <div class="vx-col sm:w-1/3 md-1/3 w-1/3">
                <strong>
                  {{order.orderNumber}}
                </strong>
              </div>
              <div class="vx-col sm:w-1/3 md-1/3 w-1/3">
                <strong>
                  {{order.companyName ? order.companyName : order.fullName}}
                </strong>
              </div>
            </div>
           <vs-table
              class="stripe"
              hoverFlat
              :data="order.orderItems"
            >
              <template slot="thead">
                <vs-th sort-key="number">#</vs-th>
                <vs-th sort-key="inventoryName">{{
                  $t("inventoryName")
                }}</vs-th>
                <vs-th sort-key="quantity">{{ $t("quantity") }}</vs-th>
                <vs-th sort-key="date">{{ $t("date") }}</vs-th>
                <vs-th sort-key="action">{{ $t("action") }}</vs-th>
              </template>
              <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(orderItem, indextr) in data">
                  <vs-td class="w-10">{{
                    indextr + 1 + perPage * (currentPage - 1)
                  }}</vs-td>
                  <vs-td
                    class="pr-4 w-1/4"
                    :data="orderItem.inventoryGenericName"
                    >{{ orderItem.inventoryGenericName }}</vs-td
                  >
                  <vs-td class="pr-4 w-1/4" :data="orderItem.quantity">{{
                    getOrderItemStatusHelper(orderItem, 'quantity')
                  }}</vs-td>
                  <vs-td class="pr-4 w-1/4">{{
                    getDateFormatted(getOrderItemStatusHelper(orderItem, 'statusDateTime'))
                  }}</vs-td>
                  <vs-td class="p-0">
                    <div class="vx-row w-full">
                    <div class="vx-col w-1/6">
                    <vs-avatar color="warning" size="small" icon-pack="feather" icon="icon-chevrons-right"
                    @click="navigateToDetail(order.orderId)" />
                    </div>
                    <div class="vx-col w-1/3">
                    <vs-button
                      v-if="isGranted('approveReadyForPickupDate')"
                      class="small p-2"
                      icon-pack="feather"
                      icon="icon-check"
                      color="success"
                      @click.prevent="openConfirm(orderItem)"
                    >{{$t('approve')}}</vs-button>
                    </div>
                    <div class="vx-col w-1/3">
                    <vs-button
                      v-if="isGranted('changeReadyForPickupDate')"
                      class="small p-2"
                      icon-pack="feather"
                      icon="icon-calendar"
                      color="warning"
                      @click.prevent="showChangeReadyForPickupDatePopup(orderItem)"
                    >{{$t('change')}}</vs-button>
                    </div>
                    </div>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </vs-collapse-item>
        </vs-collapse>
      </div>
    </div>

    
    <vs-popup class="holamundo" :title="$t('changeReadyForPickupDate')" :active.sync="showChangeReadyForPickupDate">
      <div class="vx-row py-5">
      <div class="vx-col sm:w-1/10 w-3 mt-2">
      </div>
      <div class="vx-col sm:w-1/2 w-3 mt-2">
        <span class="ml-1">{{$t('newReadyForPckupDate')}} {{currentItem? 'for '+currentItem.inventoryGenericName: ''}} </span>
      </div>
      <div class="vx-col sm:w-1/3 w-1/3 mt-2">
        <flat-pickr :config="configdateTimePicker" v-model="currentReadyForPckupDate" v-validate="'required'"
          v-validate:currentReadyForPckupDate="'required'" name="currentReadyForPckupDate" class="w-full" size="medium" />
        <span v-show="errors.has('currentReadyForPckupDate')" class="text-danger">{{
        errors.first('currentReadyForPckupDate') }}</span>
      </div>
      </div>
      <div class="flex items-stretch mt-5">
        <vs-button class="flex-1" icon="icon-check-circle" icon-pack="feather" color="success" type="filled"
          @click.prevent="saveChangedReadyForPickupDate()">{{$t('save')}}</vs-button>

        <vs-button class="flex-1" icon="icon-x" icon-pack="feather" color="dark" type="border"
          @click="cancelChangeReadyForPickupDate()">{{$t('Cancel')}}</vs-button>
      </div>
    </vs-popup>

  </vx-card>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { Validator } from "vee-validate";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

const dict = {
  custom: {
    currentReadyForPckupDate : {
      required: "Please select new Ready for Pickup date",
    },
  }
};
Validator.localize("en", dict);

export default {
  data() {
    return {
      filter: "",
      totalPage: "",
      orderNumber:"",
      perPage: 10,
      currentPage: 1,
      filteredOrders: [],
      isLoading: false,
      fullPage: false,
      orderTypeId: "",
      orderStatusTypeId: "",
      showChangeReadyForPickupDate: false,
      currentReadyForPckupDate: undefined,
      currentItem: undefined,
    };
  },
  methods: {
    saveChangedReadyForPickupDate() {
      this.$validator.validateAll().then(result => {
        if(result) {
          alert("valid")
        } else {
          alert("not valid")
        }
      });
      //this.cancelChangeReadyForPickupDate();
    },
    cancelChangeReadyForPickupDate() {
      this.currentReadyForPckupDate = undefined;
      this.showChangeReadyForPickupDate = false;
    },
    showChangeReadyForPickupDatePopup(orderItem) {
      this.currentItem = orderItem;
      let orderItemStatusInfo = orderItem.orderItemStatusInfo.find(status=>status.orderStatusType==this.readyForPickUp);
      if(orderItemStatusInfo)
        this.currentReadyForPckupDate = orderItemStatusInfo.statusDateTime;
      this.showChangeReadyForPickupDate = true;
    },
    
    openConfirm(orderItem) {
      this.currentItem = orderItem;
      let orderItemStatusInfo = orderItem.orderItemStatusInfo.find(status=>status.orderStatusType==this.readyForPickUp);
        if(!orderItemStatusInfo)
          return;

      this.$vs.dialog({
        type: "confirm",
        color: "success",
        title: `Confirm`,
        text: "Confirm Ready for Pickup status for "+orderItemStatusInfo.quantity+" of "+orderItem.inventoryGenericName+" at "+orderItemStatusInfo.statusDateTime,
        accept: this.acceptAlert,
        cancel: this.acceptAlert,
        acceptText: this.$t("approve"),
        cancelText: this.$t("change")
      });
    },
    acceptAlert() {
      this.showChangeReadyForPickupDatePopup(this.currentItem);
    },
    getOrderItemStatusHelper(orderItem, key) {
      let orderItemStatusInfo = orderItem.orderItemStatusInfo.find(ois=>ois.orderStatusType === this.readyForPickUp);
      return orderItemStatusInfo? orderItemStatusInfo[key]: "";
    },
    fetchOrders(){ 
      var formData = new FormData();
      formData.append('orderTypeId', this.orderTypeId);
      formData.append('orderStatusTypeId', this.orderStatusTypeId);
       this.$http.get('/order',{
         params:{
           orderTypeId: this.orderTypeId,
           orderStatusTypeId: this.orderStatusTypeId
         }
       }).then(response=>{
         this.filteredOrders=response.data;
       }).catch(err=>{
         this.filteredOrders=[];
       })
    },
    getOrderTypes() {
      this.$http
        .get(`/order-type`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: ""
          }
        })
        .then(response => {
          this.orderTypes=response.data;
          this.getOrderStatusTypes();
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    getOrderStatusTypes(){
      var orderType = this.orderTypes.find(ost=>ost.orderType=='Pick Up');
      if(!orderType)
        return;
       this.$http.get('/order-type-status-type',{params:{
         orderTypeId: orderType.orderTypeId,
       }}).then(response=>{
          this.orderStatusTypes = response.data;
          var orderStatus = this.orderStatusTypes.find(ost=>ost.orderStatusType==this.readyForPickUp);

          if(!orderStatus)
            return;
          this.orderTypeId = orderType.orderTypeId;
          this.orderStatusTypeId = orderStatus.orderStatusTypeId;
         this.fetchOrders();
       });
    },
    setPageLimit(page) {
      this.perPage = page;
      this.filterOrders();
    },
    navigateToDetail(id) {
      this.$router.push({ path: "/pages/order/" + id });
    },
    navigateToSelectedDetail(tr) {
      this.$router.push({ path: "/pages/order/" + tr.orderId });
    },
  },
  created() {
    this.getOrderTypes();
  },
  components: {
    Loading,
    flatPickr,
  },
};
</script>

<style>
</style>