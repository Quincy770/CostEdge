

<template>
  <div id="invoice-page">
    <vx-card>
      <!-- INVOICE METADATA -->
      <div class="vx-row leading-loose p-base">
        <div class="vx-col w-full md:w-1/4">
          {{  userDetails.profilePicture}}
          <!-- <img class="w-10 h-10" src="../../assets/images/profiles/CnDoEPXVInjLaSTWgvVYaYOrd0UJGz.jpg" alt="vuesax-logo"> -->
          <!-- <vs-avatar size="120px" src="../../assets/images/profiles/CnDoEPXVInjLaSTWgvVYaYOrd0UJGz.jpg" /> -->
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
          <!-- <vs-upload action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload" /> -->
          <!-- <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"> -->
          <!-- <vs-chip @click="toggleChangeVisibility()">Change profile picture</vs-chip> -->
          <!-- <vs-button
            v-if="!changeProfile"
            type="gradient"
            class="small"
            @click="openSelection(),toggleChangeVisibility()"

            icon-pack="feather"
            icon="icon-user"
          >Change Profile</vs-button>
          <vs-button
            v-if="changeProfile"
            type="gradient"
            class="small"
            @click="toggleChangeVisibility"
            icon-pack="feather"
            icon="icon-x"
          >Cancel</vs-button>-->

          <!-- <div >
            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <input id="file" type="file" ref="file" name="file" @input="onSelect" />

              <button type="button" v-on:click="onSubmit">Upload</button>
            </form>
          </div>-->
        </div>
        <div class="vx-col w-full md:w-1/3 text-left">
          <h3>{{$t('accountDetails')}}</h3>
          <div class="invoice__invoice-detail mt-6">
            <h6>Full Name.</h6>
            <p class="flex items-center">
              <feather-icon icon="UserIcon" svgClasses="h-4 w-4"></feather-icon>
              <span
                class="ml-2"
              >{{ userDetails.firstName+" "+userDetails.lastName+ " "+userDetails.grandFatherName }}</span>
            </p>
            <h6 class="mt-4">Status</h6>
            <p class="text-success">{{ userDetails.userStatus}}</p>

            <!-- <h6 class="mt-4">Phone Number.</h6>
            <p class="flex items-center">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{userDetails.mobilePhone}}</span>
            </p>-->
            <vs-button
              v-if="!changeProfile"
              type="gradient"
              class="small"
              @click="toggleChangeVisibility()"
              icon-pack="feather"
              icon="icon-user"
            >Change Profile</vs-button>
            <vs-button
              v-if="changeProfile"
              type="gradient"
              class="small"
              @click="toggleChangeVisibility"
              icon-pack="feather"
              icon="icon-x"
            >Cancel</vs-button>

            <div v-if="changeProfile" class="vx-row">
              <!-- <input id="file-upload" type="file" /> -->
              <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                <!-- <label for="file-upload" class="custom-file-upload"  @input="onSelect">Custom Upload</label> -->
               <input
                  class="file-upload rounded-lg mr-4 mt-2 vs-button small bg-grey vs-button-gradient w-64 text-sm"
                  type="file"
                  id="file"
                  ref="file"
                  name="file"
                  @input="onSelect"
                />
              </form>
              <!-- <vs-button
                class="small"
                type="filled"
                color="success"
                icon-pack="feather"
                icon="icon-upload"
                v-on:click="onSubmit"
              >Upload</vs-button>-->
              <vs-button
                color="primary"
                icon-pack="feather"
                class="mt-2 text-white small text-sm"
                text-color="white"
                icon="icon-upload"
                @click="onSubmit"
              >{{$t('Upload')}}</vs-button>
            </div>
          </div>
        </div>
        <div class="vx-col w-full md:w-1/4 text-left">
          <div class="invoice__invoice-detail mt-4 pt-6">
            <h6 class="mt-4">Phone Number.</h6>
            <p class="flex items-center">
              <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{userDetails.mobilePhone}}</span>
            </p>
            <h6 class="mt-4">Email.</h6>
            <p class="flex items-center">
              <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{userDetails.email}}</span>
            </p>
            <vs-button
              class="small"
              color="warning"
              type="filled"
              icon-pack="feather"
              icon="icon-lock"
              @click="popUpActive = true"
            >Change Password</vs-button>
          </div>
        </div>
        <!-- <div class="vx-col w-full md:w-1/5 text-left">
          <div class="invoice__invoice-detail mt-6 pt-8 pl-2">
            <h6>GrandFather Name.</h6>
            <p>{{ userDetails.grandFatherName }}</p>

            <h6 class="mt-4">Status</h6>
            <p class="text-success">{{ userDetails.userStatus}}</p>
          </div>
        </div>-->
        <vs-divider></vs-divider>
        <vx-card
          v-if="userDetails.companyId != 0"
          class="w-1/2 rounded-lg px-8"
          :title="$t('companyDetails')"
          title-color="#fff"
          content-color="#000"
          card-background="linear-gradient(120deg, #7f7fd0,#7367F0 ,#6a7fd0)"
        >
          <div class="vx-col w-full md:w-3/4">
            <div class="p-5 rounded-lg bg-grey-light invoice__recipient-info">
              <p>
                Company Name:
                <span class="font-bold">
                  <small>{{ companyDetails.companyName }}</small>
                </span>
              </p>
              <p>
                Licence Number :
                <span class="font-bold">
                  <small>{{ companyDetails.licenceNumber }}</small>
                </span>
              </p>
              <p>
                Tin Number:
                <span class="font-bold">
                  <small>{{ companyDetails.tinNumber }}</small>
                </span>
              </p>
              <p class="flex items-center">
                <feather-icon icon="MapIcon" svgClasses="h-4 w-4"></feather-icon>
                <span
                  class="ml-2 font-bold"
                >{{companyDetails.street+" "+companyDetails.woredaCity+" "+companyDetails.region}}</span>
              </p>
            </div>
            <!-- <div class="invoice__recipient-contact">

              <p class="flex items-center">
                <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                <span class="ml-2">PO BOX</span>
              </p>
            </div>-->
          </div>
        </vx-card>
      </div>
      <vs-popup classContent="popup-example" title="Change Password" :active.sync="popUpActive">
        <vs-input
          v-validate="'required'"
          name="oldPassword"
          icon-pack="feather"
          icon="icon-link"
          type="password"
          placeholder="Old Password"
          ref="oldPassword"
          v-model="oldPassword"
          class="w-full mb-2"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('oldPassword')"
        >{{ errors.first('oldPassword') }}</span>
        <vs-input
          v-validate="'required|min:6'"
          name="newPassword"
          icon-pack="feather"
          icon="icon-lock"
          type="password"
          placeholder="New Password"
          ref="newPassword"
          v-model="newPassword"
          class="w-full"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('newPassword')"
        >{{ errors.first('newPassword') }}</span>
        <vs-input
          v-validate="'required|confirmed:newPassword'"
          name="confirmationPassword"
          icon-pack="feather"
          type="password"
          icon="icon-shield"
          placeholder="Confirmation Password"
          v-model="confirmationPassword"
          class="mt-2 mb-2 w-full"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('confirmationPassword')"
        >{{ errors.first('confirmationPassword') }}</span>
        <!-- <br></br> -->
        <div>
          <vs-button @click.prevent="acceptButton" color="primary" type="filled">Change Password</vs-button>
        </div>
      </vs-popup>
    </vx-card>
  </div>
</template>

<script>
import {eventBus} from '../../main';

export default {
  data() {
    return {
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
      oldPassword: "",
      newPassword: "",
      confirmationPassword: "",
      changeProfile: false,
      isFileSelected:''
    };
  },
  computed: {},
  created() {
    this.getUserDetail();
    // this.getCompanyDetail();
  },
  mounted() {},
  methods: {
    onSelect() {
       const file = this.$refs.file.files[0];
      if (
        file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg" ||
        file.type == "image/gif"
      ) {
        this.isFileSelected = true;
        this.file = file;
      } else {
        this.isFileSelected = false;
        this.$vs.notify({
          title: this.$t("Error"),
          text: this.$t("pleaseSelectOnlyImages"),
          position: "top-right",
          duration: 7000,
          color: "danger"
        });
      }
    },
    onSubmit() {
      if(this.isFileSelected){
        let userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("profilePicture", this.file);
      formData.append("userId", userId);
      try {
        this.$http.post("/accounts/uploadprofile", formData).then(response => {
          this.$vs.notify({
            title: "Notification",
            text: response.data,
            position: "top-right",
            color: "success",
            iconPack: "feather",
            icon: "icon-check",
            time: 4000
          });
          this.changeProfile = false;
          this.getUserDetail();
         eventBus.$emit("fireFetchUser");
        });
      } catch (error) {}
      }
    },
    toggleChangeVisibility() {
      return (this.changeProfile = !this.changeProfile);
    },

    acceptButton() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.changePassword();
        } else {
          this.$vs.notify({
            title: "Error",
            text: "Please enter valid details",
            color: "warning",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
          // form have errors
        }
      });
    },
    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "Password didn't change!"
      });
    },
    clearValMultiple() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmationPassword = "";
    },
    getUserDetail() {
      let userId = localStorage.getItem("userId");
      this.$http.get(`/accounts/${userId}`).then(response => {
        this.userDetails = response.data;
        this.getCompanyDetail();
      });
    },
    getCompanyDetail() {
      this.$http
        .get(`/company/${this.userDetails.companyId}`)
        .then(response => {
          this.companyDetails = response.data;
        });
    },
    changePassword() {
      this.$http
        .put(`/auth/changepassword/`, {
          email: this.userDetails.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
        .then(response => {
          console.log(response);
          this.popUpActive = false;
          this.clearValMultiple();
          response.data == "Password changed successfully"
            ? this.$vs.notify({
                title: "Confirmation",
                text: "Password changed successfully",
                color: "success"
              })
            : this.$vs.notify({
                title: "Error",
                text: "Somthing went wrong. Please try again.",
                color: "danger"
              });
        })
        .catch(error => {
          this.$vs.notify({
            title: "Error",
            time: 3500,
            position: "top-right",
            text: "Somthing went wrong. Please insert correct credentials.",
            color: "danger",
            iconPack: "feather",
            icon: "icon-alert-circle"
          });
        });
    }
  },
  components: {}
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
