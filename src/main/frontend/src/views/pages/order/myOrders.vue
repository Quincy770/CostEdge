<template>
  <vx-card :title="$t('myOrders')">
    <div>
      <vs-dropdown class vs-custom-content vs-trigger-click>
        <div
          class="p-2 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
          <span class="mr-2">
            <p>{{(currentPage-1)*perPage+1}}-{{currentPage*perPage}} of {{totalPage*perPage}}</p>
          </span>
          <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
        </div>
        <vs-dropdown-menu>
          <vs-dropdown-item>
            <span @click="setPageLimitMyOrders(10)">10</span>
          </vs-dropdown-item>
          <vs-dropdown-item>
            <span @click="setPageLimitMyOrders(20)">20</span>
          </vs-dropdown-item>
          <vs-dropdown-item>
            <span @click="setPageLimitMyOrders(30)">30</span>
          </vs-dropdown-item>
          <vs-dropdown-item>
            <span @click="setPageLimitMyOrders(40)">40</span>
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
      <vs-avatar v-if="searchOrder != ''" color="warning" icon-pack="feather" class="float-right ml-4"
        svgClasses="h-4 w-4 cursor-pointer text-black" size="small" icon="icon-x"
        @click="searchOrder='',setPageLimitMyOrders(10)" />
      <div class="float-right">
        <vs-input @keypress.enter="searchMyOrder()" icon="icon-search" icon-pack="feather"
          class="w-full mx-2 input-rounded-full no-icon-border" placeholder="search" v-model="searchOrder" />
      </div>
    </div>
    <div>
      <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
      <div v-for="(order, index1) in myOrders" :key="index1">
        <div v-if="order.orderType=='Pick Up'" class="vx-row w-full">
          <strong class="vx-col w-3/4 mt-10 mr-4">{{order.orderDateTime | date2()}}</strong>
          <div class="vx-col w-1/8 mr-4">
            <vs-button class="mt-10 px-3" color="primary" type="border" icon-pack="feather" icon="icon-credit-card"
              size="small" @click="$router.push({ name: 'uploadOrderDocuments', params: {id: order.orderId} })"
              v-if="getCurrentUser.userType == 'Customer' && (order.paymentStatus !== 'Paid' && order.paymentStatus !== 'PostPaid' && order.paymentStatus !== 'PartialPaid')">
              {{$t('submitPayment')}}
            </vs-button>
          </div>
          <div class="vx-col w-1/12" style="margin-left: -30px">
            <vs-button class="mt-10" color="primary" type="border" icon-pack="feather" icon="icon-file" size="small"
              @click="$router.push({ path: '/pages/invoice/'+ order.orderId})">{{$t('print')}}
            </vs-button>
          </div>
        </div>
        <div class="vx-row" :title="$t('orderNumber')+': '+order.orderNumber"
          :subtitle="$t('orderStatus')+': '+order.orderStatus">
          <div class="vx-col w-1/4 mt-5">
            <h5>{{$t('orderNumber')}}</h5>
            {{order.orderNumber}}
          </div>          
          <div class="vx-col w-1/4 mt-5">
            <h5>{{$t('orderDateTime')}} 
              </h5>
              {{order.orderDateTime.slice(0, 10)}} {{ order.orderDateTime.slice(12, 16)}}
          </div>

          <div class="vx-col w-1/4 mt-5">
            <h5>{{$t('totalPrice')}} 
              </h5>
               {{ order.totalPrice}}
          </div>
          
          <div class="vx-col w-5/6">

            <vs-table hoverFlat stripe :data="order.orderItems" >
              <!-- HEADER -->
              <template slot="thead">
                <vs-th>{{$t('Name')}} </vs-th>
                <vs-th>{{$t('orderQuantity')}}</vs-th>
                <vs-th>{{$t('total')}}</vs-th>
                <vs-th>{{$t('unitPrice')}}</vs-th>
                <vs-th>{{$t('subTotal')}}</vs-th>
              </template>
              <!-- DATA -->
              <template slot-scope="{data}">
                <vs-tr v-for="(orderItem, index) in order.orderItems" :key="index">
                  <vs-td>{{ orderItem.inventoryGenericName }}</vs-td>
                  <vs-td class="text-left">{{ orderItem.orderQuantity }}</vs-td>
                  <vs-td class="text-left">{{ orderItem.unitPrice.toLocaleString('en-US') }}</vs-td>

                  <vs-td :data="orderItem.unitPrice * orderItem.orderedQuantity">{{ (orderItem.unitPrice *
                  (orderItem.orderQuantity + orderItem.preOrderQuantity)).toLocaleString('en-US') }} {{$t('USD')}}
                  </vs-td>
              
              
                </vs-tr>
              </template>
            </vs-table>
          </div>

          <!-- Verify Payment -->

        </div>
      </div>

      <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getMyOrders()"></vs-pagination>
    </div>
  </vx-card>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      myOrders: [],
      secondInventory: [],
      selected: "",
      totalPage: "",
      perPage: "10",
      currentPage: "1",
      searchOrder: "",
      isLoading: false,
      fullPage: false,
    };
  },
  computed: {
    getCurrentUser() {
      return { userType: localStorage.getItem('userType') };
    }
  },
  methods: {
     getValidItemStatusInfo(orderItem) {
      let currentOrderItemStatusInfo = [];
      orderItem.orderItemStatusInfo.forEach(status => {
        if (status.orderStatusType == this.readyForPickUp && new Date(status.statusDateTime) >= new Date()) {
          let statusInfo = currentOrderItemStatusInfo.find(ois=>ois.orderStatusType==this.ordered);
          if(statusInfo) {
            statusInfo.quantity += status.quantity;
            status = statusInfo;
            return;
          } else {
            status.orderStatusType = this.ordered;
          }
        }
        currentOrderItemStatusInfo.push(status);
      });
      return currentOrderItemStatusInfo;
     },
     checkIfPreorder(order){
       for(let i = 0;i<order.orderItems.length;i++){
         if(order.orderItems[i].preOrderQuantity>0){
           return false;
         }
       }
       return true;
    },

    checkIfOrdered(order){
      
       for(let i = 0;i<order.orderItems.length;i++){
          for(let j=0;j<order.orderItems[i].orderItemStatusInfo.length;j++){
             if(order.orderItems[i].orderItemStatusInfo[j].orderStatusType==this.ordered){
                 return true;
             }
         }
       }
       return false;
    },
     checkIfReadyForPickUp(order){
       for(let i = 0;i<order.orderItems.length;i++){
         for(let j=0;j<order.orderItems[i].orderItemStatusInfo.length;j++){
             if(order.orderItems[i].orderItemStatusInfo[j].orderStatusType==this.readyForPickUp){
                 return true;
             }
         }
        
       }
       return false;
    },

    checkIfPickedUp(order){
       for(let i = 0;i<order.orderItems.length;i++){
          for(let j=0;j<order.orderItems[i].orderItemStatusInfo.length;j++){
             if(order.orderItems[i].orderItemStatusInfo[j].orderStatusType==this.pickedUp){
                 return true;
             }
         }
        
       }
       return false;
    },
    checkIfReadyForShipment(order){
       for(let i = 0;i<order.orderItems.length;i++){
         for(let j=0;j<order.orderItems[i].orderItemStatusInfo.length;j++){
             if(order.orderItems[i].orderItemStatusInfo[j].orderStatusType=='Ready for Shipment'){
                 return true;
             }
         }
       }
       return false;
    },
    checkIfInTransit(order){
       for(let i = 0;i<order.orderItems.length;i++){
          for(let j=0;j<order.orderItems[i].orderItemStatusInfo.length;j++){
             if(order.orderItems[i].orderItemStatusInfo[j].orderStatusType=='In Transit'){
                 return true;
             }
         }
        
       }
       return false;
    },
    checkIfDelivered(order){
       for(let i = 0;i<order.orderItems.length;i++){
         for(let j=0;j<order.orderItems[i].orderItemStatusInfo.length;j++){
             if(order.orderItems[i].orderItemStatusInfo[j].orderStatusType=='Delivered'){
                 return true;
             }
         }
       }
       return false;
    },
    getMyOrders() {
      var userId = localStorage.getItem("userId");
      this.isLoading = true;
      this.$http
        .get(`/order/myorderhistory/${userId}`, {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.myOrders = response.data;
          this.totalPage = response.data[0].totalPages;
          this.secondInventory.length = 0;
          // for (let index1 = 0; index1 < this.myOrders.length; index1++) {
          //   let inventorys = new Array();
          //   for (
          //     let index = 0;
          //     index < this.myOrders[index1].orders.length;
          //     index++
          //   ) {
          //     if(this.myOrders[index1].preOrderInfo[index].orderQuantity!=0 && this.myOrders[index1].preOrderInfo[index].orderQuantity!=null)
          //         this.myOrders[index1].orderItems[index].orderQuantity = this.myOrders[index1].orderDetails[index].orderQuantity + this.myOrders[index1].preOrderInfo[index].orderQuantity;
          //     var inventory = {};
          //     this.$http
          //       .get(
          //         `/inventory/${this.myOrders[index1].orders[index].inventoryId}`
          //       )
          //       .then(response => {
          //         inventorys.push(response.data);
          //       });
          //   }
          //   this.secondInventory.push(inventorys);
          // }
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    getInventoryById(id, index) {
      this.$http.get(`/inventory/${id}`).then(response => {
        this.secondInventory[index].push(response.data);

        console.log(this.order);
      });
    },
    navigateToDetail(id) {
      this.$router.push({ path: "/pages/order/" + id });
    },
    navigateToSelectedDetail(tr) {
      this.$router.push({ path: "/pages/order/" + tr.orderId });
    },
    setPageLimitMyOrders(page) {
      this.perPage = page;
      this.getMyOrders();
    },
    searchMyOrder() {
      this.$http.get(`/order/search/${this.searchOrder}`).then(response => {
        this.myOrders = [];
              this.myOrders.push(response.data);
                            this.$forceUpdate();



        this.perPage = 10;
        this.totalPage = 1;

      });

    }
  },
  created() {
    this.getMyOrders();
  },
  components: {
    Loading
  }
};
</script>

<style>
.quanitityLabel{
  font-family: algerian;
  font-weight: bold;
  color: lightgreen;
  text-decoration: underline;
  padding-right: 10px;
}
.statusHeaderElem {
  font-weight: bold;
  text-align: center;
}
</style>