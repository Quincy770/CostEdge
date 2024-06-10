<template>
    <div class="vx-row w-full" v-if="userIsFinance=='Finance' || userIsFinance=='Admin'">
    <vs-table hoverFlat stripe :data="orderDocuments.orderPaymentResponseModels" v-if="orderDocuments.orderPaymentResponseModels.length>0">
        <template slot="header"></template>
        <!-- HEADER -->
        <template slot="thead">
            <vs-th>{{$t('paidAmount')}}</vs-th>
            <vs-th>{{$t('paymentDateTime')}}</vs-th>
            <vs-th> </vs-th>
                    
        </template>
        <template slot-scope="{data}">
            <vs-tr v-for="(tr, index) in data" :key="index">
            <vs-td class="text-left" :data="data[index].paidAmount">
                <span class="cursor-pointer my-2"> {{ data[index].paidAmount.toLocaleString('en-US')}} {{$t('USD')}}</span>
            </vs-td>
            <vs-td class="text-left" :data="data[index].paymentDateTime">{{ data[index].paymentDateTime |date2()}}</vs-td>

            </vs-tr>
        </template>
        </vs-table>
<div class="vx-row ml-16"><strong>{{$t('totalPaidAmount')}}: <h2>{{totalPaidAmount.toLocaleString('en-US')}} {{$t('USD')}}</h2></strong></div>
<div class="vx-row ml-16"><strong>{{$t('remainedPayment')}}: <h2>{{(orderDocuments.totalPrice-totalPaidAmount).toLocaleString('en-US') }} {{$t('USD')}}</h2></strong></div>
            <vs-divider class="mb-4"></vs-divider>
    <div class="mb-3" v-for="(ts, indexx) in orderDocuments.orderPaymentVerificationResponseModel" :key="indexx" style=" border-bottom: 1px solid #888888;border-left: 1px solid #888888;">
       <div v-if="haveTransactionNumber(ts.orderPaymentTransactionResponseModels) || ts.orderDocumentsResponseModels.length>0">
      <vs-th v-if="ts.status!='Approved'  && !ts.paid && userIsFinance=='Finance'">  <vs-button
                    color="success"
                    icon-pack="feather"
                    class="mt-2 text-white small text-sm"
                    text-color="white"
                    icon="icon-upload"
                    size="medium"
                    @click="checkToVerifiyPayment(ts.orderPaymentVerificationId)"
                  >{{$t('verify')}}</vs-button></vs-th>
                  <vs-th v-if="ts.status!='Rejected'  && !ts.paid && userIsFinance=='Finance'">  <vs-button
                      class="small"
                      color="danger"
                      type="filled"
                      icon-pack="feather"
                      icon="icon-x"
                      @click="rejectionReason = '', showRejectOrderPopup = true, orderPaymentVerificationId=ts.orderPaymentVerificationId"
                     
                    >{{$t('reject')}}</vs-button></vs-th>
                     <vs-th v-if="ts.status=='Approved' && !ts.paid && userIsFinance=='Finance'">  <vs-button 
                       color="success"
                    icon-pack="feather"
                    class="mt-2 text-white small text-sm"
                    text-color="white"
                    icon="icon-upload"
                      @click="payOrderPayment(ts.orderPaymentVerificationId)"
                     
                    >{{$t('pay')}}</vs-button></vs-th>
                        <vs-th v-if="ts.paid && userIsFinance=='Finance'">  <vs-button 
                       color="success"
                    icon-pack="feather"
                    class="mt-2 text-white small text-sm"
                    text-color="white"
                    icon="icon-upload"
                      @click="editPayment(ts.ordaerPaymentIds,ts.orderPaymentVerificationId)"
                     
                    >{{$t('editPayment')}}</vs-button></vs-th>   
                    </div>
       <vs-table hoverFlat stripe :data="ts.orderDocumentsResponseModels" v-if="ts.orderDocumentsResponseModels.length>0">
        <template slot="header"></template>
        <!-- HEADER -->
        <template slot="thead">
            <vs-th>{{$t('document')}}</vs-th>
            <vs-th>{{$t('uploadDate')}}</vs-th>
            <vs-th> </vs-th>
        </template>
        <!-- DATA  v-if="order.paymentStatus !== 'Rejected'"-->
                    

        <template slot-scope="{data}">
            <vs-tr v-for="(tr, index) in data" :key="index">
            <vs-td class="text-left" :data="data[index].uploadedDocument">
                <span class="cursor-pointer my-2 text-primary" @click="loadOrderDocument(data[index].uploadedDocument)"><u> {{ data[index].uploadedDocument }} </u></span>
            </vs-td>
            <vs-td class="text-left" :data="data[index].uploadedDate">{{ getDateFormatted(data[index].uploadedDate) }}</vs-td>
            <vs-td class="text-left">
                <vs-button class="my-2 px-3 py-2 pull-right" color="primary" size="small" @click="downloadOrderDocument(data[index].uploadedDocument)">
                <feather-icon icon="DownloadIcon" svgClasses="h-4 w-4" />
                </vs-button>
            </vs-td>

            </vs-tr>
        </template>
        </vs-table>
        
              <vs-table hoverFlat stripe :data="ts.orderPaymentTransactionResponseModels" v-if="ts.orderPaymentTransactionResponseModels.length>0 && haveTransactionNumber(ts.orderPaymentTransactionResponseModels)">
        
        <template slot="header"></template>
        <!-- HEADER -->
        <template slot="thead">
            <vs-th>{{$t('transactionNumber')}}</vs-th>                  
        </template>
        <!-- DATA  v-if="order.paymentStatus !== 'Rejected'"-->
                    
        <template slot-scope="{data}">
            <vs-tr v-for="(tr, index) in data" :key="index">
            
            <vs-td class="text-left" :data="data[index].transactionNumber">
                <span class="cursor-pointer my-2 text-primary" ><u>{{ data[index].transactionNumber }} </u></span>
            </vs-td>
        

            </vs-tr>
        </template>

        </vs-table>  
            
            <h4 class="vx-row ml-4" v-if="ts.rejectedPaymentReasonResponseModels.length>0"><u class="cursor-pointer my-0 text-primary">{{$t('paymentStatus')}}</u>: <h5 class="ml-2 mt-1 cursor-pointer my-0 text-danger"> {{ts.status}}</h5></h4>
           <div class="ml-6" :key="index" v-for="(tr, index) in ts.rejectedPaymentReasonResponseModels" v-if="ts.rejectedPaymentReasonResponseModels.length>0 && ts.status=='Rejected'">
               <div class="text-left vx-row"  >
                <h5 class="mt-1">{{$t('rejectionReason')}}: </h5><span class="ml-2 cursor-pointer my-0 text-primary" > {{" "+tr.rejectedReason }} </span>
            </div>
        </div>
        <template slot="header"></template>
        <!-- HEADER -->
        <!-- <template slot="thead"  style="margin-top:-20px;">
            <vs-th>{{$t('rejectionReason')}}</vs-th>           
        </template>
        <template slot-scope="{data}">
            <vs-tr v-for="(tr, index) in data" :key="index" >
            <vs-td class="text-left"  :data="data[index].reason">
                <span class="cursor-pointer my-0 text-primary" ><u> {{ data[index].reason }} </u></span>
            </vs-td>
            </vs-tr>
        </template>
        </vs-table> -->
        

    </div>
    <div class="vx-col w-1/2">
        <div class="w-full ml-2 mt-5">
        <embed
            v-if="previewDocumentData && isDocumentFile"
            :src="`data:application/pdf;base64,${previewDocumentData}`"
            type="application/pdf"
            class="font-bold mt-2 img-responsive"
            style="
            width: 100%;
            height: 500px;
            display: block;
            cursor: pointer;
            margin: 0 0px 10px;
            background-size: cover;
            background-position: center center;
            "
        />
        <img
        v-else-if="previewDocumentData && isImageFile"
        :src="`data:image/jpg;base64,${previewDocumentData}`"
        class="font-bold mt-2 img-responsive"
        style="
            width: 100%;
            height: 500px;
            display: block;
            cursor: pointer;
            margin: 0 0px 10px;
            background-size: cover;
            background-position: center center;
            border: 2px solid grey;
            box-shadow: 5px 7px 5px 12px lightgrey
        "/>
        </div>
    </div>
        <vs-prompt
          v-if="showRejectOrderPopup"
          @accept="rejectOrderPayment()"
          :acceptText="$t('reject')"
          :cancelText="$t('cancel')"
          classContent="popup-example"
          :title="$t('rejectOrderPayment')"
          :active.sync="showRejectOrderPopup"
        >
          <vs-textarea
            v-model="rejectionReason"
          ></vs-textarea>
          <span v-if="orderRejectionReasonError" class="text-danger">{{orderRejectionReasonError}}</span>
        </vs-prompt>


         <vs-prompt
          v-if="showPayPopup"
          @cancel="cancelPayment()"
          @accept="pay()"
          :acceptText="$t('pay')"
          :cancelText="$t('cancel')"
          classContent="popup-example"
          :title="$t('insertOrderPayment')"
          :active.sync="showPayPopup"
        >

        <div class="vx-row">
          <div class="vx-col w-1/2">
          <vs-input class="w-full"
                    :label="$t('amount')"

                        type="number"
                        v-model="payment"
                        @input="checkAmount(orderDocuments)"
                      />
                     
                                 <span v-if="paymentError" class="text-danger">{{paymentError}}</span>

           </div>
              <!-- <div class="vx-col sm:w-1/4 w-full mt-6"> -->
              <div class="vx-col w-1/2">
               <span >{{$t('paymentDate')}}</span>
                    <flat-pickr
                      :config="configdateTimePicker"
                      v-model.trim="paymentDateTime"
                      v-validate:paymentDateTime="'required'"
                      name="paymentDateTime"
                      class="w-full"

                    />
                    <span
                      v-show="errors.has('paymentDateTime')"
                      class="text-danger"
                    >{{ errors.first('paymentDate') }}</span>
                    
                  </div>
                  </div>
        </vs-prompt>
              <vs-prompt
          v-if="showEditPaymentPopup"
          @accept="editpay()"
          :acceptText="$t('update')"
          :cancelText="$t('cancel')"
          classContent="popup-example"
          :title="$t('editOrderPayment')"
          :active.sync="showEditPaymentPopup"
        >
        <div class="vx-row">
          <div class="vx-col w-1/2 mr-2 mt-2" style="margin-left:-10px;">
          <vs-input
                        type="number"
                        :label="$t('amount')"
                        v-model.trim="filteredOrderPayment.paidAmount"
                         @input="checkEditOrderAmount(orderDocuments)"
                      />
                        <span v-if="paymentError" class="text-danger">{{paymentError}}</span>
        
          </div>
          
          <div class="vx-col w-1/2">
            <span >{{$t('paymentDate')}}</span>
                    <flat-pickr
                      :config="configdateTimePicker"
                      :label="$t('paymentDate')"
                      v-model.trim="filteredOrderPayment.paymentDateTime"
                      v-validate="'required'"
                      v-validate:paymentDateTime="'required'"
                      name="paymentDateTime"
                      class="w-full mt-2"
                    

                    />
                    <span
                      v-show="errors.has('paymentDateTime')"
                      class="text-danger"
                    >{{ errors.first('paymentDateTime') }}</span>
                    </div>
                    </div>
                    
        </vs-prompt>
         <vs-prompt
          v-if="showVerificationPopup"
          @cancel="orderPaymentVerificationId=0, this.showVerificationPopup=false;"
          @accept="verifiyPayment()"
          :acceptText="$t('yes')"
          :cancelText="$t('cancel')"
          classContent="popup-example"
          :title="$t('')"
          :active.sync="showVerificationPopup"
        >
                    <span
                    >{{$t('areYouSureToVerify') }}?</span>               
        </vs-prompt>
    </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VSelect from "vue-select";
import { Validator } from "vee-validate";
export default {
  data() {
    return {
      order: {},
      isLoading: false,
      previewDocumentData: "",
      fileName: "",
      showRejectOrderPopup: false,
      documentStatus:"",
      rejectionReason:"",
      orderPaymentVerificationId:"",
      tatalEditPayment:0,
      status:"",
      previousPayment:0,
      showPayPopup:false,
      showEditPaymentPopup:false,
      showVerificationPopup:false,
      checkTheEditPayment:0,
      payment:"",
      filteredOrderPayment:{"orderPaymentVerificationId": "", "orderId": "", "paidAmount": "", "paymentDateTime": "" },
      filteredOrderPayments:[],
      orderPaymentId:"",
      paymentDateTime:"",
        configdateTimePicker: {
         enableTime: true,
         dateFormat: "Y-m-dTH:i",
      },
      
    }
},
  components: {
    flatPickr,
    FormWizard,
    TabContent,
    Loading,
    VSelect,
  },
props: ['orderId', 'orderDocuments','totalPaidAmount'],
computed: {
    userIsFinance(){
      const userType = localStorage.getItem('userType');
      return userType;
    },
    
    isImageFile(){
      return this.fileName && (this.fileName.endsWith(".png") ||
          this.fileName.endsWith(".jpg") ||
          this.fileName.endsWith(".jpeg") ||
          this.fileName.endsWith(".gif")
          );
      },
    isDocumentFile(){
      return this.fileName && (this.fileName.endsWith(".pdf"));
    }
  },
  created() {
    
    // this.getOrderById();

  },
  //  computed: {
  //   filterdItems: function() {
  //     return this.inventoryItems.filter(inventory => {
  //       return inventory.inventoryGenericName.match(this.search);
  //     });
  //   },
  methods: {
       haveTransactionNumber(transactions){
        for(let i=0;i<transactions.length;i++){
          if(transactions[i].transactionNumber!='')
             return true;
        }
        return false;
       },
    editpay(){
        if(JSON.stringify(this.filteredOrderPayment.paymentDateTime).indexOf('Z')>0){
          this.filteredOrderPayment.paymentDateTime=this.filteredOrderPayment.paymentDateTime;
        }
          else
            this.filteredOrderPayment.paymentDateTime=this.filteredOrderPayment.paymentDateTime+":00Z";
        if(this.filteredOrderPayment.paidAmount === undefined || this.filteredOrderPayment.paidAmount === ''){
          this.paymentError='Please enter payment';
          this.showEditPaymentPopup = true;
          return;
        }
        if(this.paymentError=="" ||this.paymentError== undefined){
        this.$http.put(`/order-payment/`+this.orderPaymentId,{
           paidAmount:this.filteredOrderPayment.paidAmount,
           paymentDateTime: this.filteredOrderPayment.paymentDateTime,
           orderId:this.filteredOrderPayment.orderId,
           orderPaymentVerificationId:this.filteredOrderPayment.orderPaymentVerificationId,
        }).then(response => {
          // this.sendNewNotification(this.orderRejectionReason, this.$t("orderRejectedAndNotificationSent"));
          this.getOrderById();

          this.$vs.notify({
          title: this.$t("success"),
          text: this.$t("paymentEdited"),
          position: "bottom-right",
          duration: 7000,
          color: "success"
        });
          this.$router.push({ path: "/pages/order/paidOrders" });

        //   setTimeout(() => {
        //   this.$router.go()
        // }, 500);

        }).catch(err=>{
          this.$vs.notify({
          title: this.$t("error"),
          text: this.$t("somethingWentWrong"),
          position: "bottom-right",
          duration: 7000,
          color: "danger"
        });
        });
        }
        else{
          this.showEditPaymentPopup = true;
        }
       
    },

    editPayment(ordaerPaymentIds,orderPaymentVerificationId){

      //  this.filteredOrderPayment = this.orderDocuments.orderPaymentResponseModels
         this.filteredOrderPayments = this.orderDocuments.orderPaymentResponseModels.filter((op) =>
                  ordaerPaymentIds.includes(op.orderPaymentId)
                );
                this.orderPaymentId =  this.filteredOrderPayments[0].orderPaymentId;
                this.filteredOrderPayment.orderPaymentVerificationId = orderPaymentVerificationId;
                this.filteredOrderPayment.orderId = this.orderDocuments.orderId;
                this.filteredOrderPayment.paidAmount = this.filteredOrderPayments[0].paidAmount;
                this.checkTheEditPayment=this.filteredOrderPayments[0].paidAmount;
                this.filteredOrderPayment.paymentDateTime = this.filteredOrderPayments[0].paymentDateTime;
                this.showEditPaymentPopup=true;
                this.paymentError="";
    },
    payOrderPayment(orderPaymentVerificationId){
      this.orderPaymentVerificationId = orderPaymentVerificationId;
      this.showPayPopup=true;
      this.payment = "";
      this.paymentError="";
    },
    checkEditOrderAmount(order){
       if(order.paymentOption=="Partial Paid"){
        if(this.orderDocuments.orderPaymentResponseModels.filter(opr=>opr.paidAmount!=0 && opr.paidAmount!=null).length===1 && this.totalPaidAmount>=order.amountTobePaid){
        if(this.filteredOrderPayment.paidAmount<order.amountTobePaid || this.filteredOrderPayment.paidAmount>order.totalPrice){
          this.paymentError='Payment must be >= '+order.amountTobePaid +" And <="+order.totalPrice;
           this.showEditPaymentPopup = true;
        }
         else{
          this.paymentError="";
        }
        }
        else{

        if(this.filteredOrderPayment.paidAmount>(order.totalPrice+this.checkTheEditPayment-this.totalPaidAmount)){
          this.paymentError='Payment must be  <='+(order.totalPrice+this.checkTheEditPayment-this.totalPaidAmount);
           this.showEditPaymentPopup = true;
        }
         else{
           
          this.paymentError="";
        }

        }
      }
      else if(order.paymentOption=='In Cash'){
        if(this.filteredOrderPayment.paidAmount<order.totalPrice ||this.filteredOrderPayment.paidAmount>order.totalPrice){
          this.paymentError='Payment must be '+order.totalPrice;
           this.showEditPaymentPopup = true;
        }
        else{
          this.paymentError="";
        }
      } 
      else if(order.paymentOption=='Post Paid'){
        if(this.filteredOrderPayment.paidAmount>(order.totalPrice+this.checkTheEditPayment-this.totalPaidAmount)){
          this.paymentError='Payment must be <= '+order.totalPrice;
           this.showEditPaymentPopup = true;
        }
        else{
          this.paymentError="";
        }
      }        
    },
    cancelPayment(){
     this.payment="";
     this.paymentDateTime="";
    },
    checkAmount(order){
    
      // for(let i=0;i<this.orderDocuments.orderPaymentResponseModels.length;i++){
      //   this.previousPayment = this.previousPayment + this.orderDocuments.orderPaymentResponseModels[i].paidAmount;
      // }
      if(order.paymentOption=="Partial Paid"){
        if(this.totalPaidAmount==0 || this.totalPaidAmount==null || this.totalPaidAmount=='' || this.totalPaidAmount==undefined){
        if(this.payment<order.amountTobePaid || this.payment>order.totalPrice){
          this.paymentError='Payment must be >= '+order.amountTobePaid+" And <="+order.totalPrice;
           this.showPayPopup = true;
        }
         else{
          this.paymentError="";
        }
        }

        else{
           if(this.payment>(order.totalPrice-this.totalPaidAmount)){
          this.paymentError='Payment must be <='+(order.totalPrice-this.totalPaidAmount);
           this.showPayPopup = true;
        }
         else{
          this.paymentError="";
        }
        }
      }

      else if(order.paymentOption=='In Cash'){

        if(this.payment<order.totalPrice || this.payment>order.totalPrice){                                           
          this.paymentError='Payment must be '+order.totalPrice;
           this.showPayPopup = true;
        }
        else{
          this.paymentError="";
        }
      }
      else if(order.paymentOption=='Post Paid'){
        if(this.payment>(order.totalPrice-this.totalPaidAmount)){
          this.paymentError='Payment must be <= '+(order.totalPrice-this.totalPaidAmount);
           this.showPayPopup = true;
        }
        else{
          this.paymentError="";
        }
      }  
    },
      pay(){
        this.paymentDateTime=this.paymentDateTime+":00Z";
        if(this.payment === undefined || this.payment === ''){
          this.paymentError='Please enter payment';
          this.showPayPopup = true;
          return;
        }
        if(this.paymentError==""){
        this.$http.post(`/order-payment`,{
           paidAmount:this.payment,
           paymentDateTime:this.paymentDateTime,
           orderId:this.orderId,
           orderPaymentVerificationId:this.orderPaymentVerificationId,
        }).then(response => {
          // this.sendNewNotification(this.orderRejectionReason, this.$t("orderRejectedAndNotificationSent"));
          this.getOrderById();

                      
          this.$vs.notify({
          title: this.$t("success"),
          text: this.$t("orderPayed"),
          position: "bottom-right",
          duration: 7000,
          color: "success"
        });
          this.$router.push({ path: "/pages/order/paidOrders" });

        //   setTimeout(() => {
        //   this.$router.go()
        // }, 500);
        }).catch(err=>{
          this.$vs.notify({
          title: this.$t("error"),
          text: this.$t("somethingWentWrong"),
          position: "bottom-right",
          duration: 7000,
          color: "danger"
        });
        });
        }
        else{
          this.showPayPopup = true;
        }
    },
checkToVerifiyPayment(orderPaymentVerificationId){
   this.orderPaymentVerificationId = orderPaymentVerificationId;
   this.showVerificationPopup=true;
},
    verifiyPayment(){
         this.status="Approved";
         var data ={
              status:"Approved",
              rejectedReason:"",
         };
        this.$http.put(`/order-payment/verify/${this.orderPaymentVerificationId}`, data).then(response => {
          this.sendNewNotification(this.$t("orderVerificationAndNotificationSent"));
       this.showVerificationPopup=false;
           this.getOrderById();

          this.$vs.notify({
          title: this.$t("success"),
          text: this.$t("orderApproved"),
          position: "bottom-right",
          duration: 500,
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
        sendNewNotification(message){
        var data={
          senderId: localStorage.getItem('userId'),
          receiverId: this.orderDocuments.userId,
          receiverIsRole: false,
          // detailLink: '/pages/order/uploadOrderDocuments/'+this.orderDocuments.orderId,
          message: message,
      };
      this.$http.post(`/user-notifications/add-user-notification`, data).then(response => {
        // this.connect();
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
        if(this.rejectionReason === undefined || this.rejectionReason === ''){
          this.orderRejectionReasonError='Please enter rejection reason';
          this.showRejectOrderPopup = true;
          return;
        }
           var data ={
              status:"Rejected",
              rejectedReason:this.rejectionReason,
         };
        this.$http.put(`/order-payment/verify/${this.orderPaymentVerificationId}`,data).then(response => {
          this.sendNewNotification(this.$t("orderRejectedAndNotificationSent"));
          this.getOrderById();
          this.$vs.notify({
          title: this.$t("success"),
          text: this.$t("orderRejected"),
          position: "bottom-right",
          duration: 500,
          color: "success"
        });
        // 
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
    loadOrderDocument(documentPath){
      this.fileName = documentPath;
        this.$http.get(`/order/get-order-document/${documentPath}`).then(response => {
          this.previewDocumentData = response.data;
        }).catch(err=>{
        });
    },
    downloadOrderDocument(documentPath) {
      this.$http
        .get(`/order/get-order-document/${documentPath}`).then((response) => {
          var a = document.createElement("a"); //Create <a>
          a.href = "data:image/png;base64," + response.data; //Image Base64 Goes here
          a.download = `${documentPath}`; //File name Here
          a.click();
          }).catch(err=>{
            console.log("Couldn't download order document")
          });
      },
    getOrderById() {
      this.totalPaidAmount=0;
      this.isLoading = true;
      this.$http
        .get(`/order/${this.orderId}`)
        .then(response => {
          this.orderDocuments = response.data;
                  for(let i=0;this.orderDocuments.orderPaymentResponseModels.length;i++){
         
                   this.totalPaidAmount = this.totalPaidAmount + this.orderDocuments.orderPaymentResponseModels[i].paidAmount;


    }
          // this.getCompanyDetail();
          // this.getUserDetail();
          // for (let index = 0; index < this.order.orderDetails.length; index++) {
          //   this.getInventoryById(
          //     this.orderDocuments.orderDetails[index].inventoryId,
          //     index
          //   );
          // }
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
}
};
</script>
