<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <loading :active.sync="isLoading" :can-cancel="true"></loading>
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8 mb-16">
                <div class="vx-card__title">
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
                  <h4 class="mb-4">{{$t('Recover your password')}}</h4>
                  <p>{{$t('Please enter your email address and well send you instructions on how to reset your password.')}}</p>
                </div>
                <div class="mb-4">
                  <vs-input
                    type="email"
                    :label-placeholder="$t('Email')"
                    v-model="email"
                    class="w-full"
                    name="email"
                    v-validate="'required|email'"
                    data-vv-validate-on="blur"
                    @keyup.enter="recoverPasword"
                  />
                  <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                </div>
                <vs-button
                  type="border"
                  to="/pages/login"
                  class="px-4 w-full md:w-auto"
                >{{$t('Back To Login')}}</vs-button>
                <vs-button
                  :disabled="clicked"
                  @click="recoverPasword"
                  class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0"
                >{{$t('Recover Password')}}</vs-button>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import router from "../../router";
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components:{
   Loading
  },
  data() {
    return {
      email: "",
      waitingTime:2,
      isLoading:false,
      clicked: false,
      waitingTime: 2
    };
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
      this.$store.dispatch("locale/changeLocale", locale);
    },
    recoverPasword: function() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading=true
         this.$http
        .post("/verify/sendpasswordresetcode/" + this.email)
        .then(response => {
          this.isLoading=false
            this.$vs.notify({
                  title: this.$t('Reset'),
                  text: this.$t('resetCodeSenttoYourEmail'),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success",
                  time:7000
                });
                localStorage.setItem('email',this.email)
               this.$router.push({path:'/resetpassword',query:{email:this.email}});
        }).catch(error => {
                  this.isLoading=false
                  this.$vs.notify({
                  title: this.$t('Reset'),
                  text: this.$t('Reset code not sent check your connection'),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success",
                  time:7000
                 
                });
        });
          this.clicked = true;
          this.$http
            .post("/verify/sendpasswordresetcode/" + this.email)
            .then(response => {
              console.log(response);
              this.$vs.notify({
                title: this.$t("Reset"),
                text: this.$t("resetCodeSenttoYourEmail"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
                time: 7000
              });
              this.clicked = false;
              localStorage.setItem("email", this.email);
              this.$router.push({
                path: "/resetpassword",
                query: { email: this.email }
              });
            })
            .catch(error => {
              this.clicked = false;
              this.$vs.notify({
                title: this.$t("Reset"),
                text: this.$t("Reset code not sent check your connection"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
                time: 7000
              });
            });
        }
      });
    }
  },
  computed: {
    getCurrentLocaleData() {
      if (localStorage.getItem("locale") == null) {
        const locale = this.$i18n.locale;
        if (locale == "en") return { flag: "us", lang: "English" };
        else if (locale == "am") return { flag: "am", lang: "Amharic" };
      } else {
        const locale = localStorage.getItem("locale");
        if (locale == "en") return { flag: "us", lang: "English" };
        else if (locale == "am") return { flag: "am", lang: "Amharic" };
      }
    }
  }
};
</script>
<style  lang="scss">
.loader-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  cursor: pointer;
  span {
    display: inline-block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
  .loader {
    animation: loader-animate 1.5s linear infinite;
    clip: rect(0, 80px, 80px, 40px);
    height: 80px;
    width: 80px;
    position: absolute;
    left: calc(50% - 40px);
    top: calc(50% - 40px);
    &:after {
      animation: loader-animate-after 1.5s ease-in-out infinite;
      clip: rect(0, 80px, 80px, 40px);
      content: "";
      border-radius: 50%;
      height: 80px;
      width: 80px;
      position: absolute;
    }
  }
  @keyframes loader-animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }
  @keyframes loader-animate-after {
    0% {
      box-shadow: inset #fff 0 0 0 17px;
      transform: rotate(-140deg);
    }
    50% {
      box-shadow: inset #fff 0 0 0 2px;
    }
    100% {
      box-shadow: inset #fff 0 0 0 17px;
      transform: rotate(140deg);
    }
  }
}
</style>