<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter  justify-center login-page">
    <vs-card class=" login-navbar" style="margin-top: -5px; margin-bottom: 0;">
      <div class="vx-row">
        <div class="vx-col xs:w-full sm:w-full md:w-full lg:w-3/5">
          <div class="vx-row">
            <div class="vx-col xs:w-full sm:w-full md:w-full lg:w-1/4 ">
              <img src="@/assets/images/logo/logo.png" />
            </div>
            <div class="vx-col xs:w-full sm:w-full md:w-full lg:w-1/2 col-lg text-center border border-dark mt-8"
              style="text-align: center;">
              <div class="" style=" border-bottom: 2px solid black; line-height: 1.2 !important;">
                <h4 class="font-bold">
                  Cost Edge
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div class="vx-col xs:w-full sm:w-full md:w-full lg:w-2/5">
          <div class="vx-row">
            <div class="vx-col xs:w-full sm:w-full md:w-full lg:w-2/5">
              <span style="color: white;">{{ $t('Email') }}</span>
              <vs-input v-validate="'required|email'" data-vv-validate-on="blur" name="email" icon="icon icon-mail"
                icon-pack="feather" v-model="email" class="w-full" @keyup.enter="login" />
              <span class="text-danger text-sm">{{ errors.first('email') }}</span>
            </div>
            <div class="vx-col xs:w-full sm:w-full md:w-full lg:w-1/3">
              <span style="color: white;">{{ $t('Password') }}</span>
              <vs-input data-vv-validate-on="blur" v-validate="'required'" type="password" name="password"
                icon="icon icon-lock" icon-pack="feather" v-model="password" class="w-full" @keyup.enter="login" />
              <span class="text-danger text-sm">{{ errors.first('password') }}</span>
            </div>
            <div class="vx-col xs:w-full sm:w-full md:w-full lg:w-1/4 mt-5">
              <vs-button @click="login">{{ $t('Login') }}</vs-button>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col xs:w-full sm:w-full md:w-full lg:w-1/3 mt-2 ml-4">
              <router-link style="color: white;" to="/pages/forgot-password">{{ $t('Forgot Password?') }}</router-link>
            </div>
            <div class="vx-col xs:w-full sm:w-full md:w-full lg:w-1/3 mt-2 ml-12">
              <router-link style="color: white;" to="/pages/register">New? {{ $t('Sign Up') }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </vs-card>
    <div class="vx-col">
      <div class="vx-col hidden lg:block lg:w-full md:w-full sm:w-full">
        <img style="height: 540px; width: 1400px;" src="@/assets/images/pages/login.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    password: {
      required: "Please enter password",
      alpha: "Please enter password"
    },
    email: {
      required: "Please enter email",
      alpha: "Please enter email"
    }
  }
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmedEmail: "",
      verificationtoken: "",
      popupActive: false,
      logedin: false
    };
  },
  methods: {
    resend() {
      this.$http.post("/verify/resend/" + this.email).then(function (response) {
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
      localStorage.setItem("locale", locale);
    },
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
  },
  created() {
    if (this.$router.query && this.$router.query.email != "") this.email = this.$router.query.email;
    if (
      localStorage.getItem("userId") != null &&
      localStorage.getItem("accessToken") != null
    ) {
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      });
      // if (localStorage.getItem("userId") == "Admin" || localStorage.getItem("userId") == "Customer")
      router.push("/pages/orders/shop");
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

#email {
  color: blue;
}

.login-navbar {
  height: 120px;
  margin-top: 15px;
  background: rgb(179, 74, 179);
}

// .login-form{
//   margin-left: 950px;
// }
.login-page {
  height: 3000px;
  background: #1d5288;
}
</style>
