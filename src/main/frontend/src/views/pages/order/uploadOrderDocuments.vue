<template>
  <div>
    <vx-card>
      <vx-card
          class="w-full rounded-lg"
          :title="$t('orderDetails')"
          title-color="#000"
          content-color="#000"
        >
        
          <div class="vx-col w-full md:w-full">
          
            <vs-table hoverFlat stripe :data="order.orderItems">
              <template slot="header"></template>
              <!-- HEADER -->
              <template slot="thead">
                <vs-th>{{$t('genericName')}}</vs-th>
                <vs-th>{{$t('Quantity')}}</vs-th>
                <vs-th>{{$t('unitPrice')}}</vs-th>
                <vs-th>{{$t('subTotal')}}</vs-th>
              </template>

              <!-- DATA -->
              <template slot-scope="{data}">
                <vs-tr v-for="(tr, index) in data" :key="index">
                  <vs-td>{{data[index].inventoryGenericName}}</vs-td>
                  <vs-td class="text-left" :data="data[index].hours">{{ data[index].preOrderQuantity + data[index].orderQuantity }}</vs-td>
                  <vs-td class="text-left" :data="data[index].unitPrice">{{ data[index].unitPrice.toLocaleString('en-US') }} USD</vs-td>
                  <vs-td
                    :data="data[index].unitPrice * data[index].orderQuantity"
                  >{{ (data[index].unitPrice * (data[index].orderQuantity +data[index].preOrderQuantity)).toLocaleString('en-US') }} USD</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      <div class="vx-row leading-loose p-base">
        <div class="vx-col w-full md:w-full text-left">
          <h3>{{$t('submitPaymentInformation')}}</h3>
          <div class="invoice__invoice-detail mt-6">
            <div class="vx-row">
              <div class="vx-col w-1/4">
                <h6>{{$t('customerDetails')}}</h6>
                <p class="flex items-center">
                  <feather-icon icon="UserIcon" svgClasses="h-4 w-4"></feather-icon>
                  <span
                    class="ml-2"
                  >{{ userDetails.firstName+" "+userDetails.lastName+ " "+userDetails.grandFatherName }}</span>
                </p>
              </div>

              <div class="vx-col w-3/4">

              <div class="vx-row">
                <div class="w-1/2">
                 <div class="vx-row">
                <h6 class=" vx-col w-2/7">{{$t('transactionID')}} </h6>               
                  <vs-button
                  class="vx-col w-1/11"
                        icon-pack="feather"
                        icon="icon-plus"
                        type="border"
                        color="success"
                        size="small"
                        @click.prevent="addTransaction"
                      ><strong>{{$t('add')}}</strong>
                      </vs-button>
                      </div>
                <div v-for="(transaction, index) in transactionIds" :key="index"
                    class="vx-row p-2 " style="margin-top:-10px;">
                <vs-input
                  v-validate="files? '[]':'required'"
                  name="transactionID"
                  icon-pack="feather"
                  icon="icon-link"
                  type="text"
                  v-model.trim="transactionIds[index].transactionID"
                  class=" mt-2 mb-2"
                />
                <div class="  ml-3 mt-3" v-if="transactionIds.length>1 && index!=0">
                      <vs-button
                        style="z-index: 100"
                        class="vs-col mr-2 mt-1"
                        color="danger"
                        size="small"
                        icon-pack="feather"
                        icon="icon-delete"
                        @click.prevent="removeTransaction(index)"
                      ></vs-button>
                    </div>
                </div>
              </div>


     
              </div>

              </div>
            </div>
    <div class="vx-col w-1/4" style="margin-top:-15px; margin-left:700px;">
                  <vs-button
                    color="success"
                    icon-pack="feather"
                    class="mt-2 text-white small text-sm"
                    text-color="white"
                    icon="icon-upload"
                    size="medium"
                    @click="onVerifiyPayment"
                  >{{$t('upload')}}</vs-button>
                  </div>
          </div>
        </div>
                <div class="w-11/12">
                <h6 class="w-full mt-0">{{$t('uploadReceipt')}}</h6>
                  <div class="vx-row">
                  <div class="vx-col w-1/4">
                    <form enctype="multipart/form-data">
                    <input
                        multiple
                        class="file-input"
                        type="file"
                        ref="files"
                        @change="onFileChange"
                      />                      
                    </form>
                  </div>
             
                  </div>
               </div>

                  <div style="border: 1px solid #eef" class="vx-row" >
                     <div v-for="(file,index) in files" :key="index" class="vx-row">
                       <div class="vx-col">
                          <div>{{file.name}}</div>
                       </div>
                       <div class="vx-col mr-4">
                         <a @click.prevent="files.splice(index,1)" class="fa fa-remove" style="color:red;"></a>
                    </div>
                  </div>
                  </div>


        <vs-divider></vs-divider>

        <vx-card class="w-1/2" v-for="(file,index) in files" :key="index">
          <embed
              v-if="file.type=='application/pdf'"
              :src="tempUrl(file)"
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
            v-else-if="file.type=='image/png' ||'image/jpg' ||'image/jpeg' ||'image/gif'"
            :src="tempUrl(file)"
            class="font-bold mt-2 img-responsive"
            style="
              width: 100%;
              height: 500px;
              display: block;
              cursor: pointer;
              margin: 0 0px 10px;
              background-size: cover;
              background-position: center center;
              border: 1px solid lightgrey;
            "
            @click="showScanPassportCameraPopup = true"
          />
          <div v-else>
            <center><br><span style="font-size: 40px; text-shadow: 4px 6px lightgrey;">{{$t('preview')}}</span></center>            
          </div>
        </vx-card>
      </div>
      <!-- {{tempUrl}} -->
      <!-- <div class="" v-for="(ts, indexx) in order.orderPaymentVerificationResponseModel" :key="indexx">
    
    </div> -->
    
    <!-- {{order}} -->
       <vx-card>
        <div class="mb-3" v-for="(ts, indexx) in order.orderPaymentVerificationResponseModel" :key="indexx"  style="border-left: 1px solid #888888;">
        <vs-table hoverFlat stripe :data="ts.orderDocumentsResponseModels" v-if="ts.orderDocumentsResponseModels.length>0 && ts.status=='Rejected'">
        <template slot="header"></template>
        <!-- HEADER -->
        <template slot="thead">
            <vs-th>{{$t('document')}}</vs-th>
            <vs-th>{{$t('uploadDate')}}</vs-th>
            <vs-th> {{$t('status')}}</vs-th>                   
        </template>
        <!-- DATA  v-if="order.paymentStatus !== 'Rejected'"-->
                    
        <template slot-scope="{data}">
            <vs-tr v-for="(tr, index) in data" :key="index">
            
            <vs-td class="text-left" :data="data[index].uploadedDocument">
                <span class="cursor-pointer my-2 text-primary" @click="loadOrderDocument(data[index].uploadedDocument)"><u> {{ data[index].uploadedDocument }} </u></span>
            </vs-td>
            <vs-td class="text-left" :data="data[index].uploadedDate">{{ getDateFormatted(data[index].uploadedDate) }}</vs-td>
             <vs-td class="text-left">
                <span class="cursor-pointer my-2 text-primary" > {{ ts.status }}</span>
            </vs-td>
            <vs-td class="text-left">
                <vs-button class="my-2 px-3 py-2 pull-right" color="primary" size="small" @click="downloadOrderDocument(data[index].uploadedDocument)">
                <feather-icon icon="DownloadIcon" svgClasses="h-4 w-4" />
                </vs-button>
            </vs-td>

            </vs-tr>
        </template>

        </vs-table>     
      <vs-table hoverFlat stripe :data="ts.orderPaymentTransactionResponseModels" v-if="ts.orderPaymentTransactionResponseModels.length>0 && ts.status=='Rejected' ">
        
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


           <div style=" " class="ml-6" :key="index" v-for="(tr, index) in ts.rejectedPaymentReasonResponseModels" v-if="ts.rejectedPaymentReasonResponseModels.length>0">
               <div class="text-left vx-row"  >
                <h5 class="mt-1">{{$t('rejectionReason')}}: </h5><span class="ml-2 cursor-pointer my-0 text-primary" > {{" "+tr.reason }} </span>
            </div>
        </div>
<div style="border-bottom: 1px solid #888888;" v-if="ts.orderDocumentsResponseModels.length>0 && ts.status=='Rejected'">
       <vs-button v-if="ts.orderDocumentsResponseModels.length>0 && ts.status=='Rejected'" style="margin-left:1000px;"
                  class="mb-4"
                        icon-pack="feather"
                        icon="icon-plus"
                        type="border"
                        color="success"
                        size="small"
                         @click="editOrderDocument(ts.orderPaymentVerificationId)">
               <strong>{{$t('edit')}}</strong>
                </vs-button>
                </div>
    </div>

    </vx-card>

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
      <OrderVerification :orderId="this.$route.params.id"/>
    </vx-card>
  </div>
</template>

<script>
import {eventBus} from '../../../main';
import OrderVerification from "@/layouts/components/ePharmacy/OrderVerification.vue";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import _ from "lodash";
export default {
  data() {
    return {
       isToEdit:false,
       orderPaymentVerificationId:"",
        received_messages: [],
        allNotifications: [],
        companyDetails: {
        companyId: "",
        accountId: "",
        companyName: "",
        licenceNumber: "",
        companyStatus: "",
              fileName: "",
        registrationDate: "",
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
      oldPassword: "",
      newPassword: "",
      confirmationPassword: "",
      changeProfile: false,
      isFileSelected: false,
      selectedFile: undefined,
      order: {},
      inventories: [],
      previewUploadedDocument: '',
      previewDocumentData: "",
      transactionIds:[
        {
          transactionID: "",
        }
       ],
       transactionID:[],
      files:[],
      tempUrls:'',
    };
  },
  computed: {
        userIsFinance(){
      const userType = localStorage.getItem('userType');
      return userType==='Finance';
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
    // isImageFile(){
    //   return this.selectedFile && this.selectedFile.name
    //     && (this.selectedFile.type == "image/png" ||
    //       this.selectedFile.type == "image/jpg" ||
    //       this.selectedFile.type == "image/jpeg" ||
    //       this.selectedFile.type == "image/gif"
    //       );
    //   },
    // isDocumentFile(){
    //   return this.selectedFile && this.selectedFile.name
    //     && (this.selectedFile.type == "application/pdf");
    // }
  },
  created() {
    // this.connect();
    this.getUserDetail();
    this.getOrderById();
    this.fetchInventories();
  },
  mounted() {},
  methods: {
    
    editOrderDocument(orderPaymentVerificationId){
      this.orderPaymentVerificationId = orderPaymentVerificationId;
      this.$router.push({ path: "/pages/order/editUploadOrderDocuments/" + orderPaymentVerificationId, params:{orderId:this.$route.params.id} });
      // this.isToEdit=true;
    },
      getDateFormatted(date){
        return new Date(date).toLocaleDateString(['en-US'],{timeZone: "Africa/Addis_Ababa", month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
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
       removeTransaction(index){
      if(this.transactionIds.length > 1)
        this.transactionIds.splice(index, 1);
    },
    addTransaction(){
       this.transactionIds.push(
        {
          transactionID: "",
        }
       );
    },
send() {
            console.log("Send message:" + this.send_message);
            if (this.stompClient && this.stompClient.connected) {
              const msg = { name: "Ashu" };
              this.stompClient.send("/app/hello", JSON.stringify(msg), {});
            }
          },
          connect() {
            this.socket = new SockJS(`${this.onlineBackendAddress}/gs-guide-websocket`);
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
              {},
              frame => {
                this.connected = true;               
                this.send();
                console.log(frame);
                this.stompClient.subscribe("/topic/greetings", tick => {
                });
              },
              error => {
                console.log(error);
                this.connected = false;
              }
            );
          },
    sendNewNotification(message, receiverId, receiverIsRole){
        var data={
          senderId: localStorage.getItem('userId'),
          receiverId: receiverId,
          receiverIsRole: receiverIsRole,
          detailLink: '/pages/order/'+this.order.orderId,
          message: message,
      };
      this.$http.post(`/user-notifications/add-user-notification`, data).then(response => {
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
    getInventoryName(obj){
      if(this.inventories.length === 0)
      return '';
      let inventory=this.inventories[0].find(inventory=>inventory.inventoryId === obj.inventoryId);
      if(inventory === undefined)
      return '';
      return inventory.inventoryGenericName
    },
    fetchInventories() {
      this.$http
        .get(
          `/inventory`
        )
        .then(response => {
          this.inventories.push(response.data);
        });
    },
    getOrderById() {
      this.$http
        .get(`/order/${this.$route.params.id}`)
        .then(response => {
          this.order = response.data;
          for(let index=0;index<this.order.orderDetails.length;index++){
            if(this.order.preOrderInfo[index].orderQuantity !=0 && this.order.preOrderInfo[index].orderQuantity !=null)
              this.order.orderDetails[index].orderQuantity = this.order.orderDetails[index].orderQuantity + this.order.preOrderInfo[index].orderQuantity;
          }
          this.transactionID=this.order.transactionID;
        })
        .catch(_ => {
        });
    },
    tempUrl(f){
     return URL.createObjectURL(f)
    },
    onFileChange() {
      
       const files = this.$refs.files.files;
       this.files = [ ...this.files, ...files ];
        
       for(let i=0;i<this.files.length-2; i++){
          if(this.files[this.files.length-1].name==this.files[i].name){
            this.files.pop();
          }
       }
      // this.selectedFile = e.target.files[0];
      // if(this.selectedFile === undefined){
      //   this.tempUrl = '';
      //   return;
      // }
      // if (this.isDocumentFile || this.isImageFile) {
      //   this.isFileSelected = true;
      // }
      // else{
      //   this.isFileSelected = false;
      // }
      // this.tempUrl = URL.createObjectURL(this.selectedFile);
    },
    onSelect() {
       const file = this.$refs.file.files[0];
      if (this.isDocumentFile || this.isImageFile) {
        this.previewUploadedDocument = file;
        this.isFileSelected = true;
        this.selectedFile = file;
      } else {
        this.isFileSelected = false;
        this.$vs.notify({
          title: this.$t("Error"),
          text: this.$t("pleaseSelectOnlyImagesOrPDF"),
          position: "top-right",
          duration: 7000,
          color: "danger"
        });
      }
    },

    onVerifiyPayment() {
            this.transactionIds=this.transactionIds.filter(tI=>tI.transactionID!='');

      for(let i=0; i<this.transactionIds.length;i++){
        this.transactionID.push(this.transactionIds[i].transactionID);
      }
      if(this.files.length === 0 && this.transactionID.length === 0){
        this.$vs.notify({
            title: "Notification",
            text: "Please enter either Transaction ID or Upload payment receipt",
            position: "bottom-right",
            color: "warning",
            iconPack: "feather",
            icon: "icon-warning",
            time: 7000
          });
        return;
      }

      if(this.files.length>0 || this.transactionID.length>0){
      let userId = localStorage.getItem("userId");
      const formData = new FormData();
     if(this.transactionID.length>0)
        formData.append("transactionID", this.transactionID);
      else
         formData.append("transactionID", []);

      if(this.files.length>0){
          _.forEach(this.files, file => {

        formData.append("uploadedDocument",  file);
      });
      }
      try {
        this.$http.post(`/order/uploadOrderDocument/${this.$route.params.id}`, formData).then(response => {  
          this.connect();
          var notificationMessage="";
          if(this.files.length>0 && this.transactionID.length>0)
  					notificationMessage = "Customer uploaded Receipt & Transaction ID for order payment verification";
				  else if(this.files.length>0)
      			notificationMessage = "Customer uploaded reciept for order payment verification";
          else if(this.transactionID.length>0)
					  notificationMessage = "Customer uploaded Transaction ID or Document for order payment verification";       
          // this.sendNewNotification(notificationMessage, "Finance", true);
          this.getOrderById();
           this.files=[];
           this.transactionID=[];
            this.transactionIds=[
        {
          transactionID: "",
        }
       ],
          this.$vs.notify({
            title: "Notification",
            text: "Your order is waiting for verification!",
            position: "top-right",
            color: "success",
            iconPack: "feather",
            icon: "icon-check",
            time: 500
          });
          this.$router.push({ path: "/pages/order/myOrders"});

        });
      } catch (error) {
        console.log('Document failed to upload');
      }
      }
    },
    getUserDetail() {
      let userId = localStorage.getItem("userId");
      this.$http.get(`/accounts/${userId}`).then(response => {
        this.userDetails = response.data;
      });
    },
  },
  components: {
    OrderVerification,
  }
};
</script>

<style scoped>
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
/* input[type="file"] {
  display: none;
} */
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>