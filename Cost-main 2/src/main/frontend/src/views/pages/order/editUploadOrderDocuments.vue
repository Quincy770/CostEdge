<template>
  <div>
    <vx-card>
      <div class="vx-row leading-loose p-base">
        <div class="vx-col w-full md:w-full text-left">
          <h3>{{$t('editPaymentInformation')}}</h3>
          <div class="invoice__invoice-detail mt-6">
            <div class="vx-row">
              <div class="vx-col w-1/4">         
              </div>

              <div class="vx-col w-3/4">

              <div class="vx-row">
                <div class="w-1/3">
                 <div class="vx-row">
                <h6 class="vs-col mb-4">{{$t('transactionID')}}  </h6>               
                  <vs-button
                  class="vs-col mb-4"
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
                    class="vx-row p-2  " style="margin-top:-25px;">
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
 <div class="vx-col w-1/4" style="margin-top:-50px; margin-left:400px;">
                  <vs-button
                    color="success"
                    icon-pack="feather"
                    class="mt-2 text-white small text-sm"
                    text-color="white"
                    icon="icon-upload"
                    size="medium"
                    @click="editPaymentDocuments"
                  >{{$t('upload')}}</vs-button>
                  </div>
                
         
              </div>
            </div>
       <div class="w-11/12 ml-10">
                <h6 class="w-full mt-0">{{$t('uploadReceipt')}}</h6>
                  <div class="vx-row">
                  <div class="vx-col w-2/3">
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
      <!-- <OrderVerification :orderId="this.$route.params.id"/> -->
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
      orderPaymentVerificationId:this.$route.params.id,
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
   
  },
  created() {
    this.connect();
    this.getUserDetail();
    this.getOrderById();
    this.fetchInventories();
  },
  mounted() {},
  methods: {
   
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
            
            this.socket = new SockJS("http://localhost:8081/gs-guide-websocket");
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
              {},
              frame => {
                this.connected = true;
                // this.send();
                console.log(frame);
                this.stompClient.subscribe("/topic/greetings", tick => {
                this.received_messages.push(JSON.parse(tick.body));  
                this.allNotifications = this.received_messages[0]
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


 editPaymentDocuments() {
      this.transactionIds=this.transactionIds.filter(tI=>tI.transactionID!='');

      for(let i=0; i<this.transactionIds.length;i++){
        this.transactionID.push(this.transactionIds[i].transactionID);
      }
      this.send()
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
        this.$http.put(`/order-payment/order-payment-verification/${this.orderPaymentVerificationId}`, formData).then(response => {  
          var notificationMessage="";
          if(this.files.length>0 && this.transactionID.length>0)
  					notificationMessage = "Customer uploaded Receipt & Transaction ID for order payment verification";
				  else if(this.files.length>0)
      			notificationMessage = "Customer uploaded reciept for order payment verification";
          else if(this.transactionID.length>0)
					  notificationMessage = "Customer uploaded Transaction ID Or Document for order payment verification";       
          this.sendNewNotification(notificationMessage, "Finance", true);
          this.getOrderById();
           this.files=[];
           this.transactionID=[];
           setTimeout(() => {
             this.isToEdit=false;
           }, 2000);
            this.transactionIds=[
        {
          transactionID: "",
        }

       ];
          this.$router.push({ path: "/pages/order/myOrders" });

// this.$router.push({path:"/pages/order/uploadOrderDocuments/"+this.$route.query.orderId})
//           this.$vs.notify({
//             title: "Notification",
//             text: "Your order is waiting for verification!",
//             position: "top-right",
//             color: "success",
//             iconPack: "feather",
//             icon: "icon-check",
//             time: 500
//           });
        // setTimeout(() => {
        //   this.$router.go(-1);
        // }, 500);
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