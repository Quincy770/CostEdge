<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
    
========================================================================================== -->
<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <loading :active.sync="isLoading" :can-cancel="true"></loading>
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <vs-dropdown
                    vs-custom-content
                    vs-trigger-click
                    class="cursor-pointer float-right mt-0"
                  >
                    <span class="cursor-pointer flex i18n-locale">
                      <img
                        class="h-4 w-5"
                        :src="require(`@/assets/images/flags/${$i18n.locale}.png`)"
                        :alt="$i18n.locale"
                      />
                      <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
                    </span>
                    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
                      <vs-dropdown-item @click="updateLocale('en')">
                        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/en.png" alt="en" /> &nbsp;English
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="updateLocale('am')">
                        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/am.png" alt="am" /> &nbsp;Amharic
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                  <h4 class="mb-4">{{$t('Verify reset code')}}</h4>
                  <p>{{$t('Please fill the form below.')}}</p>
                </div>
                <div class="vx-row">
                  <div class="vx-col w-full mb-6">
                    <vs-input
                      type="text"
                      :label-placeholder="$t('Reset code')"
                      v-model="resetCode"
                      v-validate="'required'"
                      name="resetCode"
                    data-vv-validate-on="blur"
                    />
                    <span class="text-danger">{{ errors.first('resetCode') }}</span>
                  </div>
                </div>
                <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                  <vs-button @click="verifyResetCode" class="w-full sm:w-auto">{{$t('Verify')}}</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import router from "@/router.js";
import { Validator } from "vee-validate";
import { error } from 'util';
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
const dict = {
  custom: {
    newPassword: {
      required: "New password is required"
    },
    resetCode: {
      required: "Reset code is required",
      alpha: "password must contain alphabets"
    },
    email: {
      required: "Email is required",
      email: "Please enter valid email"
    }
  }
};

// register custom messages
Validator.localize("en", dict);
export default {
  components:{
   Loading
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      resetCode:this.$route.query.resetCode,
      checkPassword: "",
      email:localStorage.getItem('email'),
      isLoading:false
    };
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
    },
    passwordConfirm: function() {
      if (this.newPassword != this.confirmPassword) {
        this.checkPassword = "Password Doesn't Match";
      } else {
        this.checkPassword = "";
      }
    },
    verifyResetCode: function() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading=true
         this.$http
        .post("/verify/checkresetcode", {
            email:this.email,
            resetCode:this.resetCode
        })
        .then(response => {
          this.isLoading=false
           this.$vs.notify({
           title: "Verify",
            text: "Verified Successfully!",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "success",
            time:7000
      });
            this.$router.push({path:'/pages/reset-password',query:{email:this.email,resetCode:this.resetCode}},);
        }).catch(error=>{
          this.isLoading=false
        })
        }})
    }
  },
  computed: {
   getCurrentLocaleData() {
      const locale = this.$i18n.locale;
      if (locale == "en") return { flag: "us", lang: "English" };
      else if (locale == "am") return { flag: "am", lang: "Amharic" };
    },
  },
  created(){
    if(this.$route.query.resetCode!=""){
         this.$http
        .post("/verify/checkresetcode", {
            email:this.email,
            resetCode:this.resetCode
        })
        .then(response => {
        this.$vs.notify({
           title: "Verify",
          text: "Verified Successfully!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "success",
          time:7000
      });    
        this.$router.push({path:'/pages/reset-password',query:{email:this.email,resetCode:this.resetCode}});
        }).catch(error=>{
        })
    }
    }
};
</script>
<style  scoped>
#checkPassword {
  color: red;
}
</style>
