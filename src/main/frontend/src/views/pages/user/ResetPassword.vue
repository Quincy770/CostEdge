<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
    
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <loading :active.sync="isLoading" :can-cancel="true"></loading>
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-2/5 mx-auto self-center">
            <vs-button @click="back" class="w-full sm:w-auto float-left ml-2">{{$t('Back')}}</vs-button>
              <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-3/5 mx-auto self-center d-theme-dark-bg">
              <div class="p-8 mb-16">
                <div class="vx-card__title mb-4">
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
                  <h4 class="mb-4">{{$t('Reset Password')}}</h4>
                  <p>{{$t('Please fill the form below.')}}</p>
                </div>
                <div class="vx-row">
                  <div class="vx-col w-64 mb-6 mr-8">
                    <vs-input
                      type="password"
                      :label="$t('newPassword')"
                      v-model="newPassword"
                      v-validate="'required'"
                      name="newPassword"
                    />
                    <span class="text-danger">{{ errors.first('newPassword') }}</span>
                  </div>
                  <div class="vx-col w-64 mb-8">
                    <vs-input
                      type="password"
                      :label="$t('confirmPassword')"
                      v-model="confirmPassword"
                      @change="passwordConfirm"
                    />
                    <p id="checkPassword">{{checkPassword}}</p>
                  </div>
                </div>
                <div class="flex flex-wrap justify-between flex-col-reverse sm:flex-row">
                  <vs-button @click="resetPassword" class="w-full sm:w-auto">{{$t('resetPassword')}}</vs-button>
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
      email:this.$route.query.email,
      newPassword: "",
      confirmPassword: "",
      resetCode:this.$route.query.resetCode,
      checkPassword: "",
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
    resetPassword: function() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading=true
          this.$http
            .put("/accounts/resetpassword", {
              email: this.email,
              resetCode: this.resetCode,
              newPassword: this.newPassword
            })
            .then(response => {
              this.isLoading=false
              this.$vs.notify({
                  title: this.$t('Reset'),
                  text: this.$t('yourPasswordResetted'),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success"
                });
                localStorage.removeItem('email')
              router.push({path:'/pages/login',query:{email:this.email}});
            }).catch(error=>{
              this.isLoading=false
            })
        }});
    },
    back(){
      router.push("/resetpassword");
    }
  },
  computed: {
   getCurrentLocaleData() {
      const locale = this.$i18n.locale;
      if (locale == "en") return { flag: "us", lang: "English" };
      else if (locale == "am") return { flag: "am", lang: "Amharic" };
    },
  },
};
</script>
<style  scoped>
#checkPassword {
  color: red;
}
</style>
