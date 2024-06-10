<template>
  <div id="invoice-page">
    <vx-card id="internal-card" title no-shadow card-border>
      <div class="vx-row leading-loose">
        <!-- <div class="vx-col w-full md:w-1/4">
          <vs-avatar
            v-if="userDetails.profilePicture"
            size="150px"
            :src="(`${$domain}/profiles/${userDetails.profilePicture}`)"
          />
          <vs-avatar
            v-if="!userDetails.profilePicture"
            size="150px"
            :src="require(`@/assets/images/profiles//CnDoEPXVInjLaSTWgvVYaYOrd0UJGz.png`)"
          />
        </div> -->
        <div class="vx-col w-full md:w-1/5 text-left">
          <div class="invoice__invoice-detail">
            <h6 class="mt-4">{{$t('companyName')}}</h6>
            <p class="flex items-center">
              <feather-icon icon="BriefcaseIcon" svgClasses="h-4 w-4"></feather-icon>
              <span
                class="ml-2"
                v-if="order.companyName"
              >{{order.companyName || 'ordered by admin'}}</span>
              <span class="ml-2" v-if="order.companyId == 0">{{ 'Ordered by Admin'}}</span>
            </p>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/5 text-left">
          <div class="invoice__invoice-detail">
            <h6 class="mt-4">{{$t('orderNumber')}}</h6>
            <p class="flex items-center">
              <feather-icon icon="HashIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{order.orderNumber}}</span>
            </p>    
          </div>
        </div>   
        <div class="vx-col w-full md:w-1/5 text-left">
          <div class="invoice__invoice-detail">
            <h6 class="mt-4">{{$t('orderDate')}}</h6>
            <p class="flex items-center">
              <feather-icon icon="ClockIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{order.orderedDateTime | date2()}}</span>
            </p>       
          </div>
        </div>
        <div class="vx-col w-full md:w-1/5 text-left">
          <div class="invoice__invoice-detail">          
            <h6 v-if="order.siteName!=null" class="mt-4">{{$t('pickupTime')}}</h6>
            <h6 v-else class="mt-4">{{$t('deliveryTime')}}</h6>
            <p class="flex items-center">
              <feather-icon icon="WatchIcon" svgClasses="h-4 w-4"></feather-icon>
              <span v-if="order.deliveryDateTime" class="ml-2">{{order.deliveryDateTime | date2()}}</span>
              <span v-else class="ml-2">Not Specified</span>
            </p>       
          </div>
        </div>
        <div class="vx-col w-full md:w-1/5 text-left">
          <div class="invoice__invoice-detail">    
            <span v-if="order.siteName!=null">
                <h6 class="mt-4">{{$t('pickupLocation')}}</h6>
                <p class="flex items-center">
                  <feather-icon icon="MapPinIcon" svgClasses="h-4 w-4"></feather-icon>
                  <span class="ml-2">{{order.siteName}}</span>
                </p>
            </span>
            <span v-else>
                <h6 class="mt-4">{{$t('deliveryLocation')}}</h6>
                <p class="flex items-center">
                  <feather-icon icon="MapPinIcon" svgClasses="h-4 w-4"></feather-icon>
                  <span class="ml-2">{{order.deliveryAddress}}</span>
                </p>
            </span>
          </div>
        </div>
        <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>

        <div class="vx-col w-full md:w-full">
          <div>
            <div class="vx-row" style="border: 1px solid lightgreen">
              <div class="vx-row w-full">
                <div class="vx-col w-5/6">
                  <h6 class="pl-10 mb-2 rounded-lg py-5"><strong>{{$t('manageDeliveryStatus')}}</strong></h6>
                </div>
                <div class="vx-col w-1/9">      
                <vs-button
                  v-if="userIsLogistics"
                  class="medium mt-3"
                  color="success"
                  type="border"
                  icon-pack="feather"
                  icon="icon-save"
                  @click="saveOrderItemStatuses"
                >{{$t('save')}}</vs-button>
                </div>
              </div>
            </div>
            <div class="vx-row bg-grey-light">
              <div class="vx-col w-1/9 text-success">#</div>
              <div class="vx-col w-1/3 text-success"><strong>{{ $t("genericName") }}</strong></div>
              <div class="vx-col w-1/6 text-success"><strong>{{ $t("quantity") }}</strong></div>
              <div class="vx-col w-1/6 text-success"><strong>{{ $t("status") }}</strong></div>
              <div class="vx-col w-1/6 text-success"><strong>{{ $t("statusDate") }}</strong></div>
            </div>
            <div class="vx-row" :key="orderItemIndex" v-for="(orderItem, orderItemIndex) in order.orderItems">
              <div class="vx-col w-1/9" :data="orderItemIndex">{{orderItemIndex+1}}</div>
              <div class="vx-col w-1/5"
                :data="secondInventoryBackup[orderItemIndex] && secondInventoryBackup[orderItemIndex].inventoryGenericName"
              >{{ secondInventoryBackup[orderItemIndex] && secondInventoryBackup[orderItemIndex].inventoryGenericName }} {{secondInventoryBackup[orderItemIndex] && secondInventoryBackup[orderItemIndex].dosageForm != null ? secondInventoryBackup[orderItemIndex].dosageForm : ""}} {{secondInventoryBackup[orderItemIndex] && secondInventoryBackup[orderItemIndex].strength != null ? secondInventoryBackup[orderItemIndex].strength : "" }}
              </div>
              <div class="vx-col w-1/6"
                :data="orderItem.orderQuantity"
              >{{ orderItem.orderQuantity }}
              </div>
              <div class="vx-col w-3/5">
                <div class="vx-row my-1">
                  <div class="vx-col w-1/2 text-warning">
                    {{$t('orderStatus')}}
                  </div>
                  <div class="vx-col w-1/2 text-warning">
                    {{$t('quantity')}}<span v-if="orderItem.preOrderQuantity > 0" class="text-danger">  | {{$t('preOrder')}}: <u class="badge bg-green"> &nbsp; {{orderItem.preOrderQuantity}}  &nbsp; </u></span>
                  </div>
                  <div class="vx-col w-1/6">
                    <!--
                    <vs-button
                      style="float: right"
                      color="success"
                      type="border"
                      icon="icon-plus"
                      iconPack="feather"
                      @click="addOrderItemStatuses(orderItem, orderItemIndex)">
                    </vs-button>
                    -->
                  </div>
                </div>
                <div v-if="orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId)!==undefined">
                <div v-for="(orderItemStatus, statusIndex) in orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId).statuses" :key="statusIndex">
                  <div class="vx-row my-1 w-full" v-if="(orderStatusType = orderStatusTypes.find(ost=>ost.orderStatusTypeId === orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId).statuses[statusIndex].orderStatusTypeId))">
                    <div class="vx-col w-1/4" style="font-weight: bold;">
                    {{ orderStatusType.orderStatusType }}
                    </div>
                    <div class="vx-col w-1/3">
                      <vs-input
                      type="number"
                      @change="handleQuantity(orderItem, orderItemIndex, statusIndex)"
                      class="w-full"
                      v-model.lazy="orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId).statuses[statusIndex].quantity" />
                    </div>
                    <div class="vx-col w-1/3">
                      <flat-pickr :config="configdateTimePicker" v-model="orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId).statuses[statusIndex].statusDateTime" v-validate="'required'"
                       class="w-full" size="medium" />
                    </div>
                    <!--
                    <div class="vx-col w-1/2">
                      <v-select
                        class="w-full"
                        v-model="orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId).statuses[statusIndex].orderStatusTypeId"
                        v-validate="'required'"
                        :options="orderStatusTypes"        
                        label="orderStatusType"
                        :reduce="(orderStatusType) => orderStatusType.orderStatusTypeId"
                        name="orderStatusTypeId"
                        @input="validateOrderStatusType(orderItemIndex, statusIndex)"
                      ></v-select>
                    </div>
                    -->
                    <div class="1/9">
                    <span v-if="statusIndex > 0" @click="removeItemStatus(orderItemIndex, statusIndex)">
                      <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                    </span>
                    </div>
                    <div class="vx-row" v-if="orderItemStatuses[orderItemIndex].statuses[statusIndex].errorMessage">
                      <span class="text-danger" style="margin-left: 30px">{{orderItemStatuses[orderItemIndex].statuses[statusIndex].errorMessage}}</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div class="vx-row" style="border-top: 1px solid lightgreen">
              <div class="vx-row w-full">
                <div class="vx-col w-5/6">
                </div>
                <div class="vx-col w-1/9">      
                <vs-button
                  v-if="userIsLogistics"
                  class="medium mt-4"
                  color="success"
                  type="border"
                  icon-pack="feather"
                  icon="icon-save"
                  @click="saveOrderItemStatuses"
                >{{$t('save')}}</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <vs-prompt
        @accept="save()"
        :acceptText="$t('Save')"
        :cancelText="$t('Cancel')"
        classContent="popup-example"
        title="Payment Details"
        :active.sync="popUpActive"
      >
        <h5>Payment Option</h5>
        <loading :active.sync="isLoadingPayment" :can-cancel="true" :is-full-page="fullPage"></loading>

        <v-select
          class="m-1 vs-select-no-border d-theme-input-dark-bg w-full"
          :options="typeOfPayment"
          v-validate="'required'"
          v-model="selectedPaymentType"
          name="paymentType"
        ></v-select>
        <div v-if="order.siteName==null">
            <span
              class="text-danger text-sm"
              v-show="errors.has('paymentType')"
            >{{ errors.first('paymentType') }}</span>
            <h5>Order Status</h5>
            <v-select
              class="m-1 vs-select-no-border d-theme-input-dark-bg w-full"
              :options="typeOfOrderStatuses"
              v-model="selectedOrderStatus"
              v-validate="'required'"
              name="statusType"
            ></v-select>
            <span
              class="text-danger text-sm"
              v-show="errors.has('statusType')"
            >{{ errors.first('statusType') }}</span>
        </div>
        <div v-else>
            <span
              class="text-danger text-sm"
              v-show="errors.has('paymentType')"
            >{{ errors.first('paymentType') }}</span>
            <h5>Order Status</h5>
            <v-select
              class="m-1 vs-select-no-border d-theme-input-dark-bg w-full"
              :options="pickUpOrderStatuses"
              v-model="selectedOrderStatus"
              v-validate="'required'"
              name="statusType"
            ></v-select>
            <span
              class="text-danger text-sm"
              v-show="errors.has('statusType')"
            >{{ errors.first('statusType') }}</span>
        </div>
      </vs-prompt>

      <vs-prompt
        v-if="preOrderPopUpActive"
        @accept="save()"
        :acceptText="$t('Save')"
        :cancelText="$t('Cancel')"
        classContent="popup-example"
        title="Payment Details"
        :active.sync="preOrderPopUpActive"
      >
        <h5>Payment Option</h5>
        <loading :active.sync="isLoadingPayment" :can-cancel="true" :is-full-page="fullPage"></loading>

        <v-select
          class="m-1 vs-select-no-border d-theme-input-dark-bg w-full"
          :options="typeOfPayment"
          v-validate="'required'"
          v-model="selectedPaymentTypePreOrder"
          name="paymentType"
        ></v-select>
        <div v-if="order.siteName==null">
            <span
              class="text-danger text-sm"
              v-show="errors.has('paymentType')"
            >{{ errors.first('paymentType') }}</span>
            <h5>Order Status</h5>
            <v-select
              class="m-1 vs-select-no-border d-theme-input-dark-bg w-full"
              :options="typeOfOrderStatuses"
              v-model="selectedOrderStatusPreOrder"
              v-validate="'required'"
              name="statusType"
            ></v-select>
            <span
              class="text-danger text-sm"
              v-show="errors.has('statusType')"
            >{{ errors.first('statusType') }}</span>
        </div>
        <div v-else>
            <span
              class="text-danger text-sm"
              v-show="errors.has('paymentType')"
            >{{ errors.first('paymentType') }}</span>
            <h5>Order Status</h5>
            <v-select
              class="m-1 vs-select-no-border d-theme-input-dark-bg w-full"
              :options="pickUpOrderStatuses"
              v-model="selectedOrderStatusPreOrder"
              v-validate="'required'"
              name="statusType"
            ></v-select>
            <span
              class="text-danger text-sm"
              v-show="errors.has('statusType')"
            >{{ errors.first('statusType') }}</span>
        </div>
      </vs-prompt>
    </vx-card>
  </div>
</template>


<script>
import vSelect from "vue-select";
import { Validator } from "vee-validate";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import OrderVerification from "@/layouts/components/ePharmacy/OrderVerification.vue";

const dict = {
  custom: {
    paymentType: {
      required: "Please enter payment type"
    },
    statusType: {
      required: "Please enter status type"
    }
  }
};
export default {
  data() {
    return {
      id: this.$route.params.id,
      order: {
        secondInventory: []
      },
      secondInventoryBackup: [],
      typeOfOrderStatuses: ["Ready For Shipment", "In-Transit", "Delivered"],
      pickUpOrderStatuses: ["Ready For Pickup",],
      typeOfPayment: ["Paid", "PostPaid", "PartialPaid"],
      selectedPaymentType: "",
      selectedOrderStatus: "",
      companyDetails: {
        companyId: "",
        accountId: "",
        companyName: "",
        licenceNumber: "",
        companyStatus: "",
        registrationDate: ""
      },
      userDetails: {
        firstName: "",
        lastName: "",
        gfatherName: "",
        email: "",
        mobilePhone: "",
        userType: "",
        companyId: ""
      },
      popUpActive: false,
      preOrderPopUpActive:false,
      oldPassword: "",
      newPassword: "",
      confirmationPassword: "",
      changePassword: false,
      isLoading: false,
      isLoadingPayment: false,
      fullPage: false,
      selectedPaymentTypePreOrder:"",
      selectedOrderStatusPreOrder:"",
      showConfirmOrderPopup: false,
      showRejectOrderPopup: false,
      orderRejectionReason: "",
      orderRejectionReasonError: "",
      orderStatusTypes: [],
      orderItemStatuses: [],
      configdateTimePicker: {
         enableTime: true,
         dateFormat: "Y-m-dTH:i",
      },
    };
  },
  computed: {
    getSortedOrderStatusTypes(){
      return this.orderStatusTypes.sort((a, b) => {return a.weight - b.weight;})
    },
    userIsLogistics(){
      const userType = localStorage.getItem('userType');
      return userType==='Logistics';
    },
  },
  created() {
    this.getOrderById();
    // this.getInventoryById();
  },
  methods: {
    addNextOrderItemStatus() {
      for(let orderItemIndex=0; orderItemIndex < this.order.orderItems.length; orderItemIndex++){
        let orderItem = this.order.orderItems[orderItemIndex];
        let orderItemStatuses=this.orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId).statuses;
        if(orderItemStatuses.length < 1 || orderItemStatuses[orderItemStatuses.length - 1].quantity > 0)
          this.addOrderItemStatuses(orderItem, orderItemIndex);
      }
    },
    getNextOrderStatusTypeId(orderItem, orderItemIndex, statusIndex){
      var nextOrderStatusType=undefined;
      if(!this.orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId) || !this.orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId).statuses[statusIndex]) {
        if(this.getSortedOrderStatusTypes.length > 0)
          nextOrderStatusType = this.getSortedOrderStatusTypes[0];
      } 
      else {
        var latestPrevOrderStatusTypeId = this.orderItemStatuses.find(ois=>ois.orderItemId===orderItem.orderItemId).statuses[statusIndex].orderStatusTypeId;
        var latestPrevOrderStatusType = this.getSortedOrderStatusTypes.find(ost=>ost.orderStatusTypeId === latestPrevOrderStatusTypeId);
        if(!latestPrevOrderStatusType && this.getSortedOrderStatusTypes.length > 0)
          nextOrderStatusType = this.getSortedOrderStatusTypes[0];
        else
          nextOrderStatusType = this.getSortedOrderStatusTypes.find(ost=>ost.weight > latestPrevOrderStatusType.weight);
      }
      return nextOrderStatusType? nextOrderStatusType.orderStatusTypeId : 0;
    },
    validateOrderStatusType(orderItemIndex, statusIndex){
      let orderStatusTypeId=this.orderItemStatuses[orderItemIndex].statuses[statusIndex].orderStatusTypeId;
      if(this.orderItemStatuses[orderItemIndex].statuses.filter(st=>st.orderStatusTypeId===orderStatusTypeId).length > 1){
        this.orderItemStatuses[orderItemIndex].statuses[statusIndex].errorMessage=`Order status ${this.orderStatusTypes.find(ost=>ost.orderStatusTypeId===orderStatusTypeId).orderStatusType} already exists!`;
        this.orderItemStatuses[orderItemIndex].statuses[statusIndex].orderStatusTypeId="";
      }else{
        this.orderItemStatuses[orderItemIndex].statuses[statusIndex].errorMessage="";
      }
      this.$forceUpdate();
    },
    handleQuantity(orderItem, orderItemIndex, idx){
      let totalQuantity=0;
      let currentQuantity=Number(this.orderItemStatuses[orderItemIndex].statuses[idx].quantity);
      for(let i=0; i<this.orderItemStatuses[orderItemIndex].statuses.length; i++){
        totalQuantity += Number(this.orderItemStatuses[orderItemIndex].statuses[i].quantity);
        this.orderItemStatuses[orderItemIndex].statuses[i].errorMessage='';
      }
      let totalQuantityErrorMessage=`Sum of the quantities should be ${Number(orderItem.orderQuantity)}.`;
      if(totalQuantity > Number(orderItem.orderQuantity)){
        this.orderItemStatuses[orderItemIndex].statuses[idx].errorMessage=`${currentQuantity} is not valid quantity. ${totalQuantityErrorMessage} Current is ${totalQuantity}`;
      }else if(totalQuantity < Number(orderItem.orderQuantity)){
        this.orderItemStatuses[orderItemIndex].statuses[idx].errorMessage=`${totalQuantityErrorMessage} Current is ${totalQuantity}`;
      }else{
        this.orderItemStatuses[orderItemIndex].statuses[idx].errorMessage='';
      }
      this.$forceUpdate();
    },
    removeItemStatus(orderItemIndex, statusIndex){
      this.orderItemStatuses[orderItemIndex].statuses.splice(statusIndex, 1);
    },
    addOrderItemStatuses(orderItem, orderItemIndex){
      let latestStatusIndex = this.orderItemStatuses[orderItemIndex].statuses.length - 1;
      let nextOrderStatusTypeId = this.getNextOrderStatusTypeId(orderItem, orderItemIndex, latestStatusIndex);
      if(!nextOrderStatusTypeId)
        return;
      if(this.orderItemStatuses[orderItemIndex]!==undefined && this.orderItemStatuses[orderItemIndex].statuses!==undefined)
        this.orderItemStatuses[orderItemIndex].statuses.push({quantity: '', orderStatusTypeId: nextOrderStatusTypeId, statusDateTime: '', errorMessage: ''});
      else
        this.orderItemStatuses.push({orderItemId: orderItem.orderItemId, statuses: [{quantity: '', orderStatusTypeId: nextOrderStatusTypeId, statusDateTime: '', errorMessage: ''}]});
    },
    getOrderStatusTypes(orderTypeId){
       this.$http.get('/order-type-status-type',{params:{
         orderTypeId:orderTypeId,
       }}).then(response=>{
          this.orderStatusTypes = response.data;
          this.getOrderItemsStatusByOrderId();
       });
    },
    sendNewNotification(message, statusInfo){
        var data={
          senderId: localStorage.getItem('userId'),
          receiverId: this.order.userId,
          detailLink: '/pages/order/'+this.order.orderId,
          message: message,
      };
      this.$http.post(`/user-notifications/add-user-notification`, data).then(response => {
          this.$vs.notify({
          title: this.$t("Notification"),
          text: statusInfo,
          position: "bottom-right",
          duration: 7000,
          color: "success"
        });
        }).catch(err=>{
          this.$vs.notify({
          title: this.$t("error"),
          text: this.$t("somethingWentWrong"),
          position: "bottom-right",
          duration: 7000,
          color: "danger"
        });
      });
      },
    getOrderById() {
      this.isLoading = true;
      this.$http
        .get(`/order/${this.id}`)
        .then(response => {
          this.order = response.data;
          this.getOrderStatusTypes(this.order.orderTypeId);
          this.getUserDetail();
          for (let index = 0; index < this.order.orderItems.length; index++) {
            // this.order.orderItems[index].orderedQuantity =  this.order.orderItems[index].orderedQuantity +  this.order.preOrderInfo[index].orderedQuantity; 
            this.getInventoryById(
              this.order.orderItems[index].inventoryId,
              index
            );
          }
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    getInventoryById(id, index) {
      this.$http
        .get(`/inventory/${id}`)
        .then(response => {
          this.secondInventoryBackup.push(response.data);
          this.order.secondInventory = this.secondInventoryBackup;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    saveOrderItemStatuses() {
      for(let orderItemIndex=0; orderItemIndex<this.order.orderItems.length; orderItemIndex++){
        for(let statusIndex=0; statusIndex<this.orderItemStatuses[orderItemIndex].statuses.length; statusIndex++){
          if(!this.orderItemStatuses[orderItemIndex].statuses[statusIndex].quantity && this.orderItemStatuses[orderItemIndex].statuses[statusIndex].orderStatusTypeId){
            this.orderItemStatuses[orderItemIndex].statuses[statusIndex].errorMessage=`Please enter quantity`;
            this.$forceUpdate();
            return;
          }
          if(false && !this.orderItemStatuses[orderItemIndex].statuses[statusIndex].orderStatusDate && this.orderItemStatuses[orderItemIndex].statuses[statusIndex].orderStatusTypeId){
            this.orderItemStatuses[orderItemIndex].statuses[statusIndex].errorMessage=`Please enter date`;
            this.$forceUpdate();
            return;
          }
          if((this.orderItemStatuses[orderItemIndex].statuses[statusIndex].orderStatusTypeId === ''
            || this.orderItemStatuses[orderItemIndex].statuses[statusIndex].orderStatusTypeId === null)
            && (this.orderItemStatuses[orderItemIndex].statuses[statusIndex].quantity !== ''
            || this.orderItemStatuses[orderItemIndex].statuses[statusIndex].quantity !== null)){
            this.orderItemStatuses[orderItemIndex].statuses[statusIndex].errorMessage=`Please select status`;

            this.$forceUpdate();
            return;
          }
          this.orderItemStatuses[orderItemIndex].statuses[statusIndex].quantity=Number(this.orderItemStatuses[orderItemIndex].statuses[statusIndex].quantity)
        }
      }

      for(let orderItemIndex=0; orderItemIndex<this.order.orderItems.length; orderItemIndex++){
        let orderItem=this.order.orderItems.find(oi=>oi.orderItemId === this.orderItemStatuses[orderItemIndex].orderItemId);
        let totalQuantity=0;
        for(let i=0; i<this.orderItemStatuses[orderItemIndex].statuses.length; i++){
          totalQuantity += Number(this.orderItemStatuses[orderItemIndex].statuses[i].quantity);
          this.orderItemStatuses[orderItemIndex].statuses[i].errorMessage='';
        }

        let totalQuantityErrorMessage=`Sum of the quantities should be ${Number(orderItem.orderQuantity)}.`;
        if(totalQuantity !== Number(orderItem.orderQuantity)){
          let errorMessage=`${totalQuantity} is not valid total quantity. ${totalQuantityErrorMessage} Current is ${totalQuantity}`;
          this.$vs.notify({
            title: "notification",
            text: errorMessage,
            color: "danger",
            iconPack: "feather",
            duration: 7000,
            icon: "icon-close"
          });
          return;
        }

        for(let i=0; i<this.orderItemStatuses[orderItemIndex].statuses.length; i++){
          this.orderItemStatuses[orderItemIndex].statuses[i].statusDateTime = this.getInstantFromDate(this.orderItemStatuses[orderItemIndex].statuses[i].statusDateTime);
        }
      }


      this.isLoadingPayment = true;
      this.$http
        .post('/order-item-status', {orderItemsStatusInfo: this.orderItemStatuses})
        .then(response => {
          let notificationMessage=`Current status of your order, `;
          for(let orderItemIndex=0; orderItemIndex<this.order.orderItems.length; orderItemIndex++){
            for(let statusIndex=0; statusIndex<this.orderItemStatuses[orderItemIndex].statuses.length; statusIndex++){
              let orderStatusType=this.orderItemStatuses[orderItemIndex].statuses[statusIndex].orderStatusTypeId;
              let orderStatusTypeId=orderStatusType? orderStatusType.orderStatusTypeId: "";
              let statusDateTime=orderStatusType? orderStatusType.statusDateTime: "";
              let orderStatusTypeObj=this.orderStatusTypes.find(ost=>ost.orderStatusTypeId===orderStatusTypeId);
              let orderStatusTypeStr=(orderStatusTypeObj!==undefined? orderStatusTypeObj.orderStatusType: "Unkown")+" at "+statusDateTime;

              notificationMessage += orderStatusTypeStr+": "+this.orderItemStatuses[orderItemIndex].statuses[statusIndex].quantity+"  ";
            }
          }
          this.sendNewNotification(notificationMessage, "Notification sent");
          this.$vs.notify({
            title: "notification",
            text: this.$t("savedSuccessfully"),
            color: "success",
            iconPack: "feather",
            icon: "icon-check"
          });
          this.$router.push({ name: "viewOrders" });
        })
        .catch(_ => {
          //this.isLoadingPayment = false;
        });
    },

    getUserDetail() {
      this.$http
        .get(`/accounts/${this.order.userId}`)
        .then(response => {
          this.userDetails = response.data;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    getOrderItemsStatusByOrderId() {
      this.$http
        .get(`/order-item-status/${this.id}`)
        .then(response => {
          this.orderItemStatuses = response.data.orderItemsStatusInfo;
          this.addNextOrderItemStatus();
        })
        .catch(_ => {
          this.isLoading = false;
        });
    }
  },
  components: {
    flatPickr,
    "v-select": vSelect,
    Loading,
    OrderVerification,
  }
};
</script>
