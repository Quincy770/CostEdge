
<template>
  <div
    class="h-screen flex w-full vx-row no-gutter items-baseline justify-center login-bg"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w- xl:w-1/3 sm:m-0 mx-4 items-end justify-center">
      <!-- <vx-card>
        <div slot="no-body" class="pt-2 px-2">
          <div class="vx-row flex flex-row ml-24 items-center">
            <div class="flex flex-col items-center">
              <feather-icon
                icon="MessageSquareIcon"
                class="mb-4 bg-white p-8 shadow-md rounded-full"
                svgClasses="w-16 h-16"
              ></feather-icon>
               <img
                class="h-4 w-32 h-32  mb-4 bg-white p-1 shadow-md rounded-full"
                src="@/assets/images/flags/british.png"
                alt="am"
              />
              <h5 class="py-2 px-4 bg-white shadow-md rounded-full cursor-pointer">England</h5>
            </div>
            <div class="flex flex-col mx-48 items-center">
              <feather-icon
              icon="MessageSquareIcon"
              class="mb-4 bg-white p-8 shadow-md rounded-full"
              svgClasses="w-16 h-16"
              ></feather-icon>
              <img
                class="h-4 w-32 h-32 mb-4 bg-white p-2 shadow-md rounded-full"
                src="@/assets/images/flags/et.jpg"
                alt="am"
              />
              <h5 class="py-2 px-4 bg-white shadow-md rounded-full cursor-pointer">Ethiopia</h5>
            </div>
            <div class="flex flex-col items-center">
              <feather-icon
              icon="MessageSquareIcon"
              class="mb-4 bg-white p-8 shadow-md rounded-full"
              svgClasses="w-16 h-16"
              ></feather-icon>
              <img
                class="h-4 w-32 h-32 mb-4 bg-white p-2 shadow-md rounded-full"
                src="@/assets/images/logo/MekelleUniversity.png"
                alt="am"
              />
              <h5
                class="py-2 px-4 bg-white shadow-md rounded-full cursor-pointer"
              >Mekelle University</h5>
            </div>
          </div>
          <div class="my-2 py-2 px-6  rounded-lg shadow text-center cursor-pointer">
            <h4 class="font-semibold">{{$t('appName')}}</h4>
            <h5>{{$t('appDescription')}}</h5>
          </div>
        </div>
      </vx-card>-->

      <!-- <vx-card> -->
      <div>
        <div class="vx-row">
          <!-- <div v-if="!isNew" class="vx-col hidden lg:block lg:w-1/3">
              <img src="@/assets/images/pages/not-authorized.png" alt="login" class="mx-auto" />
            </div>
          <div v-else class="vx-col hidden lg:block lg:w-1/3 items-center justify-center">-->
          <!-- <vs-alert class="lg:block lg:w-3/4 ml-16 mt-16" color="success" title active="true">
                <p>
                  <b>{{$t('You have registered successfully!')}}</b>
                </p>
                <p>{{$t('Confirmation code is sent to this email')}}</p>
                <b>{{confirmedEmail}}</b>
                <p>{{$t('Please visit your email and click on the link to confirm')}}</p>
          <vs-button @click="resend" class="pt-3 pb-3 mt-2 mb-2">{{$t('Resend')}}</vs-button>-->
          <!-- <vs-button
                  @click="popupActive=true"
                  color="primary"
                  type="filled"
                  class="mt-5 ml-2"
          >Verify</vs-button>-->
          <!-- </vs-alert>
          </div>-->
          <div
            class="vx-col mt-24 text-white sm:w-full md:w-full lg:w-full d-theme-dark-bg border-solid rounded-lg"
            style="background: transparent;"
          >
           <!-- <h2 class="mt-2 mb-4 text-white flex  justify-center">{{$t('appName')}}</h2> -->
           <h5 class="text-center mt-2 text-white font-extrabold">
           {{$t('KILITECHESTROBIOTECHPLC')}}</h5>
            <div class="p-8">
              <div class="vx-card__title mb-8">
                <div class="row">
                  <vs-dropdown
                    vs-custom-content
                    vs-trigger-cli
                    class="cursor-pointer float-right mt-0"
                  >
                    <!-- <span class="cursor-pointer flex i18n-locale">
                      <img
                        class="h-4 w-5"
                        :src="require(`@/assets/images/flags/${$i18n.locale}.png`)"
                        :alt="$i18n.locale"
                      />
                      <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
                    </span> -->
                    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
                      <vs-dropdown-item @click="updateLocale('en')">
                        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/en.png" alt="en" /> &nbsp;English
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="updateLocale('am')">
                        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/am.png" alt="am" /> &nbsp;Amharic
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                  <!-- <h2 class="mb-4 text-white">{{$t('appName')}}</h2> -->
                </div>
                <p class="ml-4 font-bold">{{$t('Welcome back, please login to your account.')}}</p>
              </div>
                            <span class="font-bold ml-2 text-sm">{{$t('Email') }}</span>

              <vs-input
                v-validate="'required|email'"
                data-vv-validate-on="blur"
                name="email"
                icon="icon icon-user"
                icon-pack="feather"
                v-model="email"
                class="mb-2 w-full no-icon-border text-black "
                @keyup.enter="login"
              />
              <span class="text-danger text-sm">{{ errors.first('email') }}</span>

           <span class="mt-3 font-bold ml-2 text-sm">{{$t('Password') }}</span>
              <vs-input
                data-vv-validate-on="blur"
                v-validate="'required'"
                type="password"
                name="password"
                icon="icon icon-lock"
                icon-pack="feather"
                v-model="password"
                class="w-full no-icon-border text-black"
                @keyup.enter="login"
              />
              <span class="text-danger text-sm">{{ errors.first('password') }}</span>

              <div class="flex flex-wrap justify-between my-5">
                <router-link
                  class="text-white"
                  to="/pages/forgot-password"
                >{{$t('Forgot Password?')}}</router-link>
              </div>
                            <vs-button class="text-black mr-6" color="white" @click="login">{{$t('Login')}}</vs-button>

            <vs-button  class="text-black" style="float:right;" color="white" @click="registerUser">{{$t('Register')}}</vs-button>

            </div>
          </div>

          <div class="vx-card notificationArea" >
                <h5>Log in with your username and password - if you can't login contact your system administrator
            </h5>
            </div>
        </div>
      </div>
      <div>
        <footer class="footer mx-auto the-footer flex-wrap justify-between p-2" :class="classes">
          <span class="md:flex hidden items-center"></span>
          <div class="vx-row mx-auto notificationArea">

            <span id="footer">
              <a
                class="text-center text-black mx-2"
                href="https://www.medcoanalytics.com"
              >Powered By</a>
            </span>
             <img
              class="flex mx-auto h-6"
              src="@/assets/images/pages/eCommerce/medco_logo.png"

            />
          </div>
        </footer>
      </div>
      <!-- </vx-card> -->
    </div>
    <!-- <vs-prompt
      buttons-hidden
      title="Verify your Account "
      :active.sync="popupActive">
      <div class="con-exemple-prompt">
        <span>Enter Verification Token</span>
      <vs-input vs-placeholder="" v-model="verificationtoken" class="mt-3 w-full" />
      <vs-button class="ml-4 mt-4" @click="verifyAccount" color="primary" type="filled">Verify</vs-button>
      </div>
    </vs-prompt>-->
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      classes: [],
      email: "",
      password: "",
      confirmedEmail: "",
      verificationtoken: "",
      popupActive: false,
      logedin: false,
      userType: localStorage.getItem("userType")
    };
  },
  methods: {
    resend() {
      this.$http.post("/verify/resend/" + this.email).then(function(response) {
        this.$vs.notify({
          title: this.$t("Resend"),
          text: this.$t("Verification token sent agian"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "success"
        });
      });
    },
    updateLocale(locale) {
      this.$i18n.locale = locale;
    },
    // verifyAccount: function() {
    //   this.$http
    //     .get("/verify/account/"+this.verificationtoken)
    //     .then(function(response) {
    //       router.push('/pages/view-company');
    //       this.$store.state.confirm.email="";
    //       this.$vs.notify({
    //        title: "Verify",
    //       text: "Verified Successfully!",
    //       iconPack: "feather",
    //       icon: "icon-alert-circle",
    //       color: "success"
    //   });
    //     });
    //   this.popupActive = false;
    // },
    login() {
      // Loading
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading();
          const payload = {
            userDetails: {
              email: this.email,
              password: this.password
            },
            notify: this.$vs.notify,
            closeAnimation: this.$vs.loading.close
          };
          this.$store.dispatch("auth/loginAttempt", payload);
        }
      });
    },
    registerUser() {
      this.$router.push("/pages/register");
    }
  },
  computed: {
    isNew() {
      this.confirmedEmail = this.$store.state.confirm.email;
      if (this.$store.state.confirm.email != "") {
        this.confirmedEmail = this.$store.state.confirm.email;
        this.email = this.confirmedEmail;
        return true;
      } else return false;
    },
    validateForm() {
      return !this.errors.any() && this.email != "" && this.password != "";
    },
    getCurrentLocaleData() {
      const locale = this.$i18n.locale;
      if (locale == "en") return { flag: "us", lang: "English" };
      else if (locale == "am") return { flag: "am", lang: "Amharic" };
    }
  },
  created() {
    //to allow re-login after token expired
    if(this.$route.params.isTokeExpired)
      window.location.reload();

    if (this.$router.query && this.$router.query.email != "") this.email = this.$router.query.email;
    if (
      localStorage.getItem("userId") != null &&
      localStorage.getItem("accessToken") != null
    ) {
      //this.$store.dispatch("auth/loadAllPrivileges");
      if(this.$route.params.isTokeExpired){
        //alert ("TokeExpired"+this.$route.params.isTokeExpired);
        return;
      }
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      });
     switch (this.userType) {
          case "Admin":
            router.push("/pages/view-patients");
            break;
          case "Registration":
            router.push("/pages/view-patients");
            break;
          case "Laboratory":
            router.push("/pages/view-lab-order");
            break;
          case "Result":
            router.push("/pages/view-lab-result");
            break;
          case "ResultAccess":
            router.push("/pages/view-lab-result");
            break;
          default:
              router.push("/pages/view-patients");
     }
    }
    }
};
</script>

<style lang="scss">
#page-login {
  .social-login {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
.login-bg {
    background: #778899;
    }
#email {
  color: blue;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: transparent;
  color: white;
  text-align: center;
}
.notificationArea {
    background-color: #DAEAFA;
    color: #333;
    margin-top: 15px;
    padding: 15px;
    border-radius: 3px;
}
</style>
