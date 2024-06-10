<template >
  <vx-card>
    <div>
      <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
      <vx-card id="internal-card" title no-shadow card-border>
        <div>
          <vs-table stripe class="w-full ml-auto" :max-items="perPage" :data="orderedOrders">
            <template slot="header">
              <div>
                <vs-dropdown class="mb-1" vs-custom-content vs-trigger-click>
                  <div
                    class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">
                      <p>{{(currentPage-1)*perPage+1}}-{{currentPage*perPage}} of {{totalPage*perPage}}</p>
                    </span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <vs-dropdown-menu>
                    <vs-dropdown-item>
                      <span @click="setPageLimitOrdered(10)">10</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <span @click="setPageLimitOrdered(20)">20</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <span @click="setPageLimitOrdered(30)">30</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <span @click="setPageLimitOrdered(40)">40</span>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
              <div id="search" class="float-right">
                <vs-input @keypress.enter="searchOrderedOrders()" icon="icon-search" icon-pack="feather"
                  class="w-full mx-2 input-rounded-full no-icon-border" :placeholder="$t('searchHere')"
                  v-model="searchOrdered" />
              </div>
            </template>
            <template slot="thead">
              <vs-th>#</vs-th>
              <vs-th sort-key="orderNumber">{{$t('orderNumber')}}</vs-th>
              <vs-th sort-key="fullName">{{$t('User')}}</vs-th>
              <vs-th sort-key="companyName">{{$t('Company')}}</vs-th>
              <vs-th sort-key="deliveryLocation">{{$t('deliveryLocation')}}/{{$t('pickupLocation')}}</vs-th>
              <vs-th sort-key="totalPrice">{{$t('totalPrice')}}</vs-th>

              <vs-th>{{$t('detail')}}</vs-th>
            </template>
            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td class="py-0 text-left" :data="indextr">{{indextr+1}}</vs-td>
                <vs-td class="py-0 text-left" :data="data[indextr].orderNumber">{{data[indextr].orderNumber}}</vs-td>

                <vs-td class="py-0" :data="data[indextr].fullName">{{data[indextr].fullName}}</vs-td>

                <vs-td class="py-0" :data="data[indextr].companyName">{{data[indextr].companyName}}</vs-td>
                <vs-td class="py-0" :data="data[indextr].deliveryTime" v-if="data[indextr].siteName!=null">
                  {{data[indextr].siteName}}</vs-td>
                <vs-td class="py-0" :data="data[indextr].deliveryTime" v-else>{{data[indextr].deliveryAddress}}</vs-td>
                <vs-td class="py-0" :data="data[indextr].totalPrice">
                  {{data[indextr].totalPrice.toLocaleString('en-US')}}</vs-td>
                <vs-td class="py-0" :data="data[indextr].soldPrice">{{ data[indextr].soldPrice.toLocaleString('en-US') }}
                </vs-td>

                <vs-td class="py-0" :data="data[indextr].measuringUnit">{{data[indextr].measuringUnit}}</vs-td>

                <vs-td class="py-0" :data="data[indextr].orderId">
                  <vs-avatar color="warning" size="small" icon-pack="feather" icon="icon-chevrons-right"
                    @click="navigateToDetail(data[indextr].orderId)" />
                  <vs-avatar color="success" size="small" icon-pack="feather" icon="icon-chevrons-right"
                    @click="manageOrderDeliveryStatus(data[indextr])" />
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getOrderedOrders()">
          </vs-pagination>
        </div>
      </vx-card>

      <vs-prompt @cancel="selectedOrderStatus=''" @accept="changeStatus('getReadyForShipmentOrders')"
        classContent="popup-example" title="Change order status" buttons-hidden :active.sync="statusPopUp">
        <div>
          <h6>Please select new order status.</h6>
          <v-select class="m-1 vs-select-no-border d-theme-input-dark-bg w-full" :options="typeOfOrderForReady"
            v-model="selectedOrderStatus" v-validate="'required'" name="status"></v-select>
          <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
          <div class="flex items-stretch mt-5">
            <vs-button class="flex-1" color="success" type="filled"
              @click.prevent="changeStatus('getReadyForShipmentOrders')">{{$t('Save')}}</vs-button>
            <vs-button class="flex-1" color="black" type="border"
              @click="statusPopUp = false, selectedOrderStatus='', selectedPaymentType=''">{{$t('Cancel')}}</vs-button>
          </div>
        </div>
      </vs-prompt>
      <vs-prompt @cancel="selectedOrderStatus=''" @accept="changeStatus('getInTransitOrders','Delivered')"
        classContent="popup-example" title="Change order status" color="warning" :acceptText="$t('Save')"
        :cancelText="$t('Cancel')" :active.sync="statusPopUp2">
        <div>
          <h6>
            Are you want to change the status to
            <b>Delivered</b> ?
          </h6>
          <!-- <v-select
            class="m-1 vs-select-no-border d-theme-input-dark-bg w-full"
            :options="typeOfOrderStatuses"
            v-model="selectedOrderStatus"
          ></v-select>-->
        </div>
      </vs-prompt>
    </div>
  </vx-card>
</template>
<script>
import vSelect from "vue-select";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      pickedupOrders: [],
      readyForPickupOrders: [],
      orderedOrders: [],
      paidOrders: [],
      inTransitOrders: [],
      canceledOrders: [],
      deliveredOrders: [],
      readyForShipmentOrders: [],
      totalPage: 0,
      perPage: "10",
      currentPage: 1,
      filter: "",
      selectd: "",
      paymentStatusPopUp: false,
      typeOfOrderForReady: ["In-Transit", "Delivered"],
      typeOfOrderForReadyPickup: ["Pickedup"],
      selectedOrderStatus: "",
      orderIdPreserver: "",
      statusPopUp: false,
      statusPopUp2: false,
      paymentStatus: [],
      singlePaymentStatus: "",
      searchInTransit: "",
      searchReady: "",
      searchDelivered: "",
      searchOrdered: "",
      renderComponent: true,
      isLoading: false,
      fullPage: false
    };
  },
  computed: {
    Ordered() {
      return this.$t("Ordered");
    }
  },
  created() {
    this.getOrderedOrders();
  },
  methods: {
    confirmPaymentStatus(orderId, status, index, get) {
      this.$vs.dialog({
        type: "confirm",
        title: "Confirmation",
        text: "Are you sure you want to change the status?",

        color: "danger",
        accept: () => {
          this.paymentStatus[index] = !status;
          this.paymentStatus[index] == true
            ? (this.singlePaymentStatus = "Paid")
            : (this.singlePaymentStatus = "Unpaid");

          this.$http
            .put(`/order/changepaymentstatus/${orderId}`, {
              paymentStatus: this.singlePaymentStatus
            })
            .then(response => {
              switch (get) {
                case "getCanceledOrders":
                  this.getCanceledOrders();
                  break;
                case "getPaidOrders":
                  this.getPaidOrders();
                  break;
                case "getDeliveredOrders":
                  this.getDeliveredOrders();
                  break;
                case "getOrderedOrders":
                  this.getOrderedOrders();
                  break;
                case "getInTransitOrders":
                  this.getInTransitOrders();
                  break;
                case "getReadyForShipmentOrders":
                  this.getReadyForShipmentOrders();
                  break;
              }
            });
          this.$vs.notify({
            color: "success",
            title: "Payment Status",
            position: "top-right",
            text: "Payment status changed "
          });
        },
        cancel: () => {
          this.$vs.notify({
            color: "warning",
            title: "Payment Status",
            position: "top-right",
            text: "Payment status canceled "
          });
        }
      });
    },

    showChangePaymentPopUp() {
      this.paymentStatusPopUp = true;
    },
    changePaymentStatus() {},
    
    showStatusChangePopUp(orderId, orderStatus) {
      if(orderStatus=='Ready For Pickup'){
          this.typeOfOrderForReady = ["Pickedup"];
      }
      this.statusPopUp = true;
      this.orderIdPreserver = orderId;
    },
    showStatusChangePopUp2(orderId) {
      this.statusPopUp2 = true;
      this.orderIdPreserver = orderId;
    },
    changeStatus(get, status) {
      if (status == "Delivered") this.selectedOrderStatus = "Delivered";

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$http
            .put(`/order/changeorderstatus/${this.orderIdPreserver}`, {
              orderStatus: this.selectedOrderStatus
            })
            .then(response => {
              this.selectedOrderStatus = "";
              this.statusPopUp = false;
              switch (get) {
                case "getCanceledOrders":
                  this.getCanceledOrders();
                  break;
                case "getPaidOrders":
                  this.getPaidOrders();
                  break;
                case "getDeliveredOrders":
                  this.getDeliveredOrders();
                  break;
                case "getOrderedOrders":
                  this.getOrderedOrders();
                  break;
                case "getInTransitOrders":
                  this.getInTransitOrders();
                  break;
                case "getReadyForShipmentOrders":
                  this.getReadyForShipmentOrders();
                  break;
              }
            });
        } else {
          this.$vs.notify({
            title: "Error",
            text: "Please enter valid details",
            color: "warning",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
        }
      });
    },
    getPaidOrders() {
      this.$http
        .get(`order/filter/Ordered`, {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.paidOrders = response.data;
          this.totalPage = response.data[0].totalPages;
        });
    },
    getCanceledOrders() {
      this.$http
        .get(`order/filter/Canceled`, {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.canceledOrders = response.data;
          this.totalPage = response.data[0].totalPages;
          for (let index = 0; index < this.canceledOrders.length; index++) {
            this.canceledOrders[index].paymentStatus == "Paid"
              ? (this.paymentStatus[index] = true)
              : (this.paymentStatus[index] = false);
          }
        });
    },
    getDeliveredOrders() {
      this.isLoading = true;
      this.$http
        .get(`order/filter/Delivered`, {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.deliveredOrders = response.data;
          this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    getOrderedOrders() {
      this.isLoading = true;
      this.$http
        .get(`/order`, {
          params: { 
            data: {
              searchKey: '', orderTypeId: '', orderStatusTypeId: '', fromDate: '', toDate: ''
            },
            page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.orderedOrders = response.data;
          if(response.data.length > 0)  
            this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    getInTransitOrders() {
      this.isLoading = true;
      this.$http
        .get(`order/filter/In-Transit`, {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.inTransitOrders = response.data;
          this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    getReadyForShipmentOrders() {
      this.isLoading = true;
      this.$http
        .get(`order/filter/Ready For Shipment`, {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.readyForShipmentOrders = response.data;
          this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },

    getReadyForPickupOrders() {
      this.isLoading = true;
      this.$http
        .get(`order/filter/Ready For Pickup`, {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.readyForPickupOrders = response.data;
          this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },

    getPickedupOrders() {
      this.isLoading = true;
      this.$http
        .get(`order/filter/Pickedup`, {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.pickedupOrders = response.data;
          this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },

    searchOrderedOrders() {
      this.isLoading = true;
      this.$http
        .get(`/order/search/${this.searchOrdered}`)
        .then(response => {
          this.orderedOrders.length = 0;
          this.orderedOrders.push(response.data);
          this.perPage = 10;
          this.totalPage = 1;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });

      if (this.searchOrdered == "") this.getOrderedOrders();
    },
    searchReadyForShipment() {
      this.isLoading = true;
      this.$http
        .get(`/order/search/${this.searchReady}`)
        .then(response => {
          this.readyForShipmentOrders.length = 0;
          this.readyForShipmentOrders.push(response.data);
          this.perPage = 10;
          this.totalPage = 1;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
      if (this.searchReady == "") this.getReadyForShipmentOrders();
    },
    searchDeliveredOrders() {
      if (this.searchDelivered == "") this.getDeliveredOrders();
      this.isLoading = true;
      this.$http
        .get(`/order/search/${this.searchDelivered}`)
        .then(response => {
          this.deliveredOrders.length = 0;
          this.deliveredOrders.push(response.data);
          this.perPage = 10;
          this.totalPage = 1;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    searchInTransitOrdered() {
      this.isLoading = true;
      this.$http
        .get(`/order/search/${this.searchInTransit}`)
        .then(response => {
          this.inTransitOrders.length = 0;
          this.inTransitOrders.push(response.data);
          this.perPage = 10;
          this.totalPage = 1;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
      if (this.searchInTransit == "") this.getInTransitOrders();
    },
    setPageLimitPaid(page) {
      this.perPage = page;
      this.getPaidOrders();
    },
    setPageLimitDelivered(page) {
      this.perPage = page;
      this.getDeliveredOrders();
    },
    setPageLimitOrdered(page) {
      this.perPage = page;
      this.getOrderedOrders();
    },
    setPageLimitInTransit(page) {
      this.perPage = page;
      this.getInTransitOrders();
    },
    setPageLimitCanceled(page) {
      this.perPage = page;
      this.getCanceledOrders();
    },
    setPageLimitReadyForShipment(page) {
      this.perPage = page;
      this.getReadyForShipmentOrders();
    },

    setPageLimitReadyForPickup(page) {
      this.perPage = page;
      this.getReadyForPickupOrders();
    },

    setPageLimitPickedup(page) {
      this.perPage = page;
      this.getPickedupOrders();
    },

    navigateToDetail(id) {
      this.$router.push({ path: "/pages/order/" + id });
    },
    manageOrderDeliveryStatus(tr) {
      this.$router.push({ name: "manageOrderDeliveryStatus", params: { id: tr.orderId } });
    },
    forceRerender() {
      this.renderComponent = false;

      // const renderer = require('vue-server-renderer').createRenderer()
      this.$nextTick().then(() => {
        // Add the component back in
        this.renderComponent = true;
        console.log("re-rendered");
      });
    }
  },
  components: {
    "v-select": vSelect,
    Loading
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/vuesax/pages/switch.scss";
</style>