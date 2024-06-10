<template>
  <div id="invoice-page">
    <vx-card>
      <vx-card id="internal-card" title no-shadow card-border>
        <div class="vx-row leading-loose">
          <div class="vx-col w-full md:w-1/4">
            <vs-avatar v-if="userDetails.profilePicture" size="150px"
              :src="(`${$domain}/profiles/${userDetails.profilePicture}`)" />
            <vs-avatar v-if="!userDetails.profilePicture" size="150px"
              :src="require(`@/assets/images/profiles//CnDoEPXVInjLaSTWgvVYaYOrd0UJGz.png`)" />
          </div>
          <div class="vx-col w-full md:w-1/4 text-left">
            <div class="invoice__invoice-detail">
              <h6 class="mt-4">{{$t('userName')}}</h6>
              <p class="flex items-center">
                <feather-icon icon="UserIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2">{{order.fullName}}</span>
              </p>
              <h6 class="mt-4">{{$t('companyName')}}</h6>
              <p class="flex items-center">
                <feather-icon icon="BriefcaseIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2" v-if="order.companyName">{{order.companyName || 'ordered by admin'}}</span>
                <span class="ml-2" v-if="order.companyId == 0">{{ 'Ordered by Admin'}}</span>
              </p>
              <!--
              <vs-button
                class="small m-2"
                color="success"
                type="filled"
                icon-pack="feather"
                icon="icon-credit-card"
                @click="popUpActive = true"
                v-if="order.orderStatus == 'Ordered'"
              >{{$t('Pay')}}</vs-button>
              <vs-button
                class="small m-2"
                color="danger"
                type="filled"
                icon-pack="feather"
                icon="icon-x"
                @click="openStatusChangeConfirm()"
                v-if="order.orderStatus == 'Ordered'"
              >{{$t('Cancel')}}</vs-button>
              -->
            </div>
          </div>
          <div class="vx-col w-full md:w-1/4 text-left">
            <div class="invoice__invoice-detail">
              <h6 class="mt-4">{{$t('orderNumber')}}</h6>
              <p class="flex items-center">
                <feather-icon icon="HashIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2">{{order.orderNumber}}</span>
              </p>
              <!-- <h6 class="mt-4">{{$t('orderStatus')}}</h6>
              <p class="flex items-center">
                <feather-icon icon="TagIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2">{{order.orderStatus}}</span>
              </p>
              <h6 class="mt-4">{{$t('Payment')}} {{$t('Status')}}</h6>
              <p class="flex items-center">
                <feather-icon icon="CreditCardIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2">{{order.paymentStatus}}</span>
              </p> -->

              <h6 class="mt-4">{{$t('Payment')}} {{$t('Option')}}</h6>
              <p class="flex items-center">
                <feather-icon icon="CreditCardIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2">{{order.paymentOption}}</span>
              </p>
            </div>
          </div>
          <div class="vx-col w-full md:w-1/4 text-left">
            <div class="invoice__invoice-detail">
              <h6 class="mt-4">{{$t('orderDate')}}</h6>
              <p class="flex items-center">
                <feather-icon icon="ClockIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2">{{order.orderDateTime | date2()}}</span>
              </p>
              <h6 v-if="order.siteName!=null" class="mt-4">{{$t('pickupTime')}}</h6>
              <h6 v-else class="mt-4">{{$t('deliveryTime')}}</h6>
              <p class="flex items-center">
                <feather-icon icon="WatchIcon" svgClasses="h-4 w-4"></feather-icon>
                <span v-if="order.deliveryDateTime" class="ml-2">{{order.deliveryDateTime | date2()}}</span>
                <span v-else class="ml-2">Not Specified</span>
              </p>

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
          <div v-if="order.preOrderInfo!=null && order.preOrderInfo!=[] && order.preOrderInfo!=''"
            class="bg-white border-top" style="border-style: ridge; margin-left:500px; width:1100px;">
            <h3> {{$t('preOrderInformation')}}</h3>

            <div class="vx-row leading-loose p-2">

              <!-- <div class="vx-col w-full md:w-1/4 text-left">
            <div class="invoice__invoice-detail">
             
              <vs-button
                class="small m-2"
                color="success"
                type="filled"
                icon-pack="feather"
                icon="icon-credit-card"
                @click="preOrderPopUpActive = true"
                v-if="order.preOrderStatus == 'Ordered'"
              >{{$t('Pay')}}</vs-button>
              <vs-button
                class="small m-2"
                color="danger"
                type="filled"
                icon-pack="feather"
                icon="icon-x"
                @click="openStatusChangeConfirm()"
                v-if="order.preOrderStatus == 'Ordered'"
              >{{$t('Cancel')}}</vs-button>
            </div>
          </div> -->
              <div class="vx-col w-full md:w-1/2 text-left">
                <div class="invoice__invoice-detail">
                  <h6 class="mt-4">{{$t('preOrderStatus')}}</h6>
                  <p class="flex items-center">
                    <feather-icon icon="ClockIcon" svgClasses="h-4 w-4"></feather-icon>
                    <span class="ml-2">{{order.preOrderStatus}}</span>
                  </p>
                  <h6 class="mt-4">{{$t('preOrderPaymentStatus')}}</h6>
                  <p class="flex items-center">
                    <feather-icon icon="ClockIcon" svgClasses="h-4 w-4"></feather-icon>
                    <span class="ml-2">{{order.preOrderpaymentStatus}}</span>
                  </p>
                </div>
              </div>
              <div class="vx-col w-full md:w-1/2 text-left" v-for="(preOrder,i) in order.preOrderInfo" :key="i">
                <div class="invoice__invoice-detail">
                  <h6 class="mt-4">{{$t('orderQuantity')}}</h6>
                  <p class="flex items-center">
                    <feather-icon icon="ClockIcon" svgClasses="h-4 w-4"></feather-icon>
                    <span class="ml-2">{{preOrder.orderQuantity}}</span>
                  </p>
                  <h6 class="mt-4">{{$t('unitPrice')}}</h6>
                  <p class="flex items-center">
                    <feather-icon icon="WatchIcon" svgClasses="h-4 w-4"></feather-icon>
                    <span class="ml-2">{{preOrder.unitPrice.toLocaleString('en-US')}}</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

          <vs-divider></vs-divider>
          <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
          <div class="vx-col w-full md:w-full">
            <div>
              <vs-table max-items="3" stripe :data="order.orderItems">
                <template slot="header">
                  <div class="vx-row w-full">
                    <div class="vx-col w-1/2">
                      <h4 class="p-1 mb-2 rounded-lg bg-grey-light">{{$t('orderedItems')}}</h4>
                    </div>
                    <!-- <div v-if="userIsFinance" class="vx-col w-1/9">      
                    <vs-button
                      class="small"
                      color="success"
                      type="filled"
                      icon-pack="feather"
                      icon="icon-credit-card"
                      @click="showConfirmOrderPopup = true"
                      v-if="order.paymentStatus !== 'Paid' && order.paymentStatus !== 'PostPaid' && order.paymentStatus !== 'PartialPaid'"
                    >{{$t('confirmOrderPayment')}}</vs-button>
                    </div>
                    <div v-if="userIsFinance" class="vx-col w-1/9">      
                    <vs-button
                      class="small"
                      color="danger"
                      type="filled"
                      icon-pack="feather"
                      icon="icon-x"
                      @click="orderRejectionReason = '', showRejectOrderPopup = true"
                      v-if="order.paymentStatus !== 'Rejected'"
                    >{{$t('reject')}}</vs-button>
                    </div> -->
                  </div>
                </template>
                <template slot="thead">
                  <vs-th>#</vs-th>
                  <vs-th>{{ $t("genericName") }}</vs-th>
                  <vs-th>{{ $t("orderQuantity") }}</vs-th>
                  <vs-th>{{ $t("preOrderQuantity") }}</vs-th>
                  <vs-th>{{$t('unitPrice')}}</vs-th>
                  <vs-th>{{ $t("subTotal") }}</vs-th>
                </template>

                <template slot-scope="{data}">
                  <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td class="py-0 text-left" :data="indextr">{{indextr+1}}</vs-td>
                    <vs-td :data="data[indextr] && data[indextr].inventoryGenericName">{{ data[indextr] &&
                    data[indextr].inventoryGenericName }} {{data[indextr] && data[indextr].dosageForm != null ?
                      data[indextr].dosageForm : ""}} {{data[indextr] && data[indextr].strength != null ?
                      data[indextr].strength : "" }}</vs-td>


                    <vs-td :data="data[indextr].orderQuantity">x{{ data[indextr].orderQuantity }}</vs-td>
                    <vs-td :data="data[indextr].orderQuantity">x{{ data[indextr].preOrderQuantity }}</vs-td>

                    <vs-td :data="data[indextr].unitPrice">{{ data[indextr].unitPrice.toLocaleString('en-US') }}</vs-td>
                    <vs-td :data="data[indextr].unitPrice" class="pl-10">{{ (data[indextr].unitPrice *
                    data[indextr].orderQuantity + data[indextr].unitPrice *
                    data[indextr].preOrderQuantity).toLocaleString('en-US')}} USD</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
              <div class="vx-row">
                <div class="vx-col w-1/2"></div>
                <div class="vx-col w-1/2">
                  <vs-table stripe class="w-full ml-auto mt-4" :data="order">
                    <vs-tr>
                      <vs-th class="ml-12">{{$t('TOTAL')}}</vs-th>
                      <vs-td>{{ (order.totalPrice / 1.05).toLocaleString('en-US') }} USD</vs-td>
                    </vs-tr>
                    <vs-tr>
                      <vs-th>{{$t('TAX')}}(5%)</vs-th>
                      <vs-td>{{ ((order.totalPrice / 1.05) * 0.05).toLocaleString('en-US') }} USD</vs-td>
                    </vs-tr>
                    <vs-tr>
                      <th>{{$t('grandTotal')}}</th>
                      <td class="text-black font-bold">{{ order.totalPrice.toLocaleString('en-US') }} {{$t('USD')}}</td>
                    </vs-tr>
                    <vs-divider />

                    <vs-tr v-if="order.paymentOption=='PartialPaid'">
                      <th>{{$t('amountToBePaid')}}</th>
                      <td class="text-black font-bold">{{ order.amountToBePaid.toLocaleString('en-US') }} {{$t('USD')}}
                      </td>
                    </vs-tr>
                    <vs-tr v-if="order.paymentOption=='PartialPaid'">
                      <th>{{$t('creditAmount')}}</th>
                      <td class="text-black font-bold">{{ order.creditAmount.toLocaleString('en-US') }} {{$t('USD')}}
                      </td>
                    </vs-tr>
                  </vs-table>
                </div>
                <!-- <div :key="indextr" v-for="(tr, indextr) in order.orderPaymentVerificationResponseModel">
                 
            </div> -->
                <OrderVerification :orderId="id" :orderDocuments="order" :totalPaidAmount="totalPaidAmount" />
              </div>
            </div>
          </div>
        </div>

        <!-- id:{{order.orderPaymentVerificationResponseModel}} -->
        <vs-prompt @accept="save()" :acceptText="$t('Save')" :cancelText="$t('Cancel')" classContent="popup-example"
          title="Payment Details" :active.sync="popUpActive">
          <h5>Payment Option</h5>
          <loading :active.sync="isLoadingPayment" :can-cancel="true" :is-full-page="fullPage"></loading>

          <v-select class="m-1 vs-select-no-border d-theme-input-dark-bg w-full" :options="typeOfPayment"
            v-validate="'required'" v-model="selectedPaymentType" name="paymentType"></v-select>
          <div v-if="order.siteName==null">
            <span class="text-danger text-sm" v-show="errors.has('paymentType')">{{ errors.first('paymentType')
            }}</span>
            <h5>Order Status</h5>
            <v-select class="m-1 vs-select-no-border d-theme-input-dark-bg w-full" :options="typeOfOrderStatuses"
              v-model="selectedOrderStatus" v-validate="'required'" name="statusType"></v-select>
            <span class="text-danger text-sm" v-show="errors.has('statusType')">{{ errors.first('statusType') }}</span>
          </div>
          <div v-else>
            <span class="text-danger text-sm" v-show="errors.has('paymentType')">{{ errors.first('paymentType')
            }}</span>
            <h5>Order Status</h5>
            <v-select class="m-1 vs-select-no-border d-theme-input-dark-bg w-full" :options="pickUpOrderStatuses"
              v-model="selectedOrderStatus" v-validate="'required'" name="statusType"></v-select>
            <span class="text-danger text-sm" v-show="errors.has('statusType')">{{ errors.first('statusType') }}</span>
          </div>
        </vs-prompt>

        <vs-prompt v-if="preOrderPopUpActive" @accept="save()" :acceptText="$t('Save')" :cancelText="$t('Cancel')"
          classContent="popup-example" title="Payment Details" :active.sync="preOrderPopUpActive">
          <h5>Payment Option</h5>
          <loading :active.sync="isLoadingPayment" :can-cancel="true" :is-full-page="fullPage"></loading>

          <v-select class="m-1 vs-select-no-border d-theme-input-dark-bg w-full" :options="typeOfPayment"
            v-validate="'required'" v-model="selectedPaymentTypePreOrder" name="paymentType"></v-select>
          <div v-if="order.siteName==null">
            <span class="text-danger text-sm" v-show="errors.has('paymentType')">{{ errors.first('paymentType')
            }}</span>
            <h5>Order Status</h5>
            <v-select class="m-1 vs-select-no-border d-theme-input-dark-bg w-full" :options="typeOfOrderStatuses"
              v-model="selectedOrderStatusPreOrder" v-validate="'required'" name="statusType"></v-select>
            <span class="text-danger text-sm" v-show="errors.has('statusType')">{{ errors.first('statusType') }}</span>
          </div>
          <div v-else>
            <span class="text-danger text-sm" v-show="errors.has('paymentType')">{{ errors.first('paymentType')
            }}</span>
            <h5>Order Status</h5>
            <v-select class="m-1 vs-select-no-border d-theme-input-dark-bg w-full" :options="pickUpOrderStatuses"
              v-model="selectedOrderStatusPreOrder" v-validate="'required'" name="statusType"></v-select>
            <span class="text-danger text-sm" v-show="errors.has('statusType')">{{ errors.first('statusType') }}</span>
          </div>
        </vs-prompt>

        <vs-prompt v-if="showConfirmOrderPopup" @accept="confirmOrderPayment()" :acceptText="$t('confirm')"
          :cancelText="$t('cancel')" classContent="popup-example" :title="$t('confirmOrderPayment')"
          :active.sync="showConfirmOrderPopup">
          <h5>{{$t('confirmOrderPayment')}}</h5>
        </vs-prompt>
        <vs-prompt v-if="showRejectOrderPopup" @accept="rejectOrderPayment()" :acceptText="$t('reject')"
          :cancelText="$t('cancel')" classContent="popup-example" :title="$t('rejectOrderPayment')"
          :active.sync="showRejectOrderPopup">
          <h5>{{$t('rejectOrderReaseon')}}</h5>
          <vs-textarea v-model="orderRejectionReason"></vs-textarea>
          <span v-if="orderRejectionReasonError" class="text-danger">{{orderRejectionReasonError}}</span>
        </vs-prompt>

      </vx-card>
    </vx-card>
  </div>
</template>


<script>
import vSelect from "vue-select";
import { Validator } from "vee-validate";
import { icon } from "@fortawesome/fontawesome-svg-core";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

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
     totalPaidAmount:0,
    };
  },
  computed: {
    userIsFinance(){
      const userType = localStorage.getItem('userType');
      return userType==='Finance';
    },
  },
  created() {
    this.getOrderById();
    // this.getInventoryById();
  },
  methods: {
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
      rejectOrderPayment(){
        if(this.orderRejectionReason === undefined || this.orderRejectionReason === ''){
          this.orderRejectionReasonError='Please enter rejection reason';
          this.showRejectOrderPopup = true;
          return;
        }
        this.$http.get(`/order/reject-order-payment-status/${this.order.orderId}`).then(response => {
          this.sendNewNotification(this.orderRejectionReason, this.$t("orderRejectedAndNotificationSent"));
          this.getOrderById();
        /*
          this.$vs.notify({
          title: this.$t("error"),
          text: this.$t("orderRejected"),
          position: "bottom-right",
          duration: 7000,
          color: "success"
        });
        */
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
    confirmOrderPayment(){
        this.$http.get(`/order/verify-order-payment-status/${this.order.orderId}`).then(response => {
          this.sendNewNotification('Your payment for order has been verified!', this.$t("orderVerifiedAndNotificationSent"));
          this.getOrderById();

          /*this.$vs.notify({
          title: this.$t("error"),
          text: this.$t("orderVerified"),
          position: "bottom-right",
          duration: 7000,
          color: "success"
        });*/
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
          for(let i=0;this.order.orderPaymentResponseModels.length;i++){
         
                   this.totalPaidAmount = this.totalPaidAmount + this.order.orderPaymentResponseModels[i].paidAmount;


    }
          this.getCompanyDetail();
          this.getUserDetail();

          for (let index = 0; index < this.order.orderItems.length; index++) {

            // if(this.order.preOrderInfo[index].orderQuantity!=0 && this.order.preOrderInfo[index].orderQuantity !=null)
            //    this.order.orderItems[index].orderQuantity =  this.order.orderItems[index].orderQuantity +  this.order.preOrderInfo[index].orderQuantity; 

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

    openStatusChangeConfirm() {
      this.$vs.dialog({
        type: "confirm",

        color: "danger",
        title: `Confirm`,
        text: "Are you sure you want to cancel this order?",
        accept: this.cancleOrder,
        acceptText: this.$t("Yes"),
        cancelText: this.$t("No")
      });
    },

    cancleOrder() {
      this.$http
        .put(`/order/changeorderstatus/${this.id}`, {
          orderStatus: "Canceled",
          preOrderStatus:"Canceled"
        })
        .then(response => {
          this.$vs.notify({
            title: "Notification",
            text: "Order successfully canceled",
            color: "primary",
            iconPack: "feather",
            icon: "icon-check",
            position: "top-right"
          });

          this.$router.push({ path: "/pages/order/viewOrders" });
        });
    },

    save() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoadingPayment = true;
          this.$http
            .post("/order/sell", {
              orderNumber: this.order.orderNumber,
              orderStatus: this.selectedOrderStatus,
              paymentStatus: this.selectedPaymentType,
              preOrderStatus: this.selectedOrderStatusPreOrder,
              preOrderPaymentStatus: this.selectedPaymentTypePreOrder
            })
            .then(response => {
              this.selectedOrderStatus = "";
              this.selectedPaymentType = "";
              this.selectedPaymentTypePreOrder = "";
              this.selectedOrderStatusPreOrder = "";
              this.isLoadingPayment = false;
              this.$vs.notify({
                title: "Payment Stauts",
                text: "Payment successfully.",
                color: "success",
                iconPack: "feather",
                icon: "icon-check"
              });
              this.popUpActive = false;
              this.preOrderPopUpActive=false;
              this.$router.push("/pages/order/viewOrders");
            })
            .catch(_ => {
              this.isLoadingPayment = false;
            });
        } else {
          this.$vs.notify({
            title: "Error",
            text: "Please enter valid details",
            color: "warning",
            iconPack: "feather",
            icon: "icon-alert-circle",
            position: "top-right"
          });
          // form have errors
        }
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
    getCompanyDetail() {
      this.$http
        .get(`/company/${this.order.companyId}`)
        .then(response => {
          this.companyDetails = response.data;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    }
  },
  components: {
    "v-select": vSelect,
    Loading,
    OrderVerification,
  }
};
</script>
