<template>
  <div id="main-div" class="vx-row register">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addNewUser')">
        <vx-card id="internal-card" class="mt-0" title no-shadow card-border>
          <div class="vx-row mt-10">
            <loading :active.sync="isLoading" :can-cancel="true"></loading>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('firstName')" v-model="firstName" name="firstName"
                v-validate="'required|alpha'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('firstName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('Middle Name')" v-model="lastName" name="lastName"
                 />
              <span class="text-danger">{{ errors.first('lastName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('Last Name')" v-model="grandFatherName" name="grandFatherName"
                v-validate="'required|alpha'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('grandFatherName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <vs-input icon-pack="feather" icon="icon-country-code" icon-no-border
              class="w-full"
                :label="$t('mobilePhone')" v-model="mobilePhone"
                name="mobilePhone"
                data-vv-validate-on="blur" @keyup="space" />
              <span class="text-danger">{{ errors.first('mobilePhone') }}</span>
              <span id="mobilePhone">{{ validateMobilePhone }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <vs-input type="email" :label="$t('Email')" v-model="email" class="w-full" name="email"
                v-validate="'required|email'" data-vv-validate-on="blur" @change="checkEmailIfNotExist" />
              <span class="text-danger">{{ errors.first('step-1.email') }}</span>
              <span class="text-danger">{{ errors.first('email') }}</span>
              <p id="checkPassword">{{ checkEmail }}</p>
            </div>

            <div class="vx-col w-1/4 mb-6">
              <span class="ml-2">{{ $t('role') }}</span>
              <v-select v-model="role" v-validate="'required'" class="w-full"
                :options="roles" v-validate:role="'required'"
                name="role" :class="{ danger: errors.has('role') }"></v-select>
              <span class="text-danger" v-show="errors.has('role')">{{ errors.first('role') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <vs-input type="password" v-validate="'required|min:6|max:10'" :label="$t('Password')" name="password"
                v-model="password" class="w-full" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('password') }}</span>
            </div>

            <div class="vx-col sm:w-1/4 w-full mb-2">
              <vs-input :label="$t('confirmPassword')" v-model="confirmPassword" class="w-full" type="password"
                name="confirm_password" @change="passwordConfirm" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('confirm_password') }}</span>
              <p id="checkPassword">{{ checkPassword }}</p>
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-button style="float:right;" @click="addUser" class="mt-2">{{ $t('Register') }}</vs-button>
            </div>
          </div>
        </vx-card>
      </vx-card>
    </div>

  </div>
</template>


<script>
import router from "@/router.js";
import { Validator } from "vee-validate";
import Loading from "vue-loading-overlay";
import VSelect from "vue-select";
import "vue-loading-overlay/dist/vue-loading.css";
const dict = {
  custom: {
    firstName: {
      required: "Please enter First Name",
      alpha: "First Name must be character"
    },
    lastName: {
      required: "Please Enter Last Name",
      alpha: "Last Name must be character"
    },
    grandFatherName: {
      required: "Please Enter Grand Father Name",
      alpha: "Grand Father Name must be character"
    },
    email: {
      required: "Please Enter email",
      email: "Please enter valid email"
    },
    mobilePhone: {
      regex: "Invalid phone number format"
    },
    password: {
      required: "Please enter password"
    }
  }
};
Validator.localize("en", dict);
export default {
  components: {
    Loading,
    'v-select': VSelect,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      grandFatherName: "",
      mobilePhone: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      companyId: localStorage.getItem('companyId'),
      checkPassword: "",
      checkEmail: "",
      validateMobilePhone: "",
      isLoading: false,
      roles: [
        "Admin",
        "Customer",
      ],
      customerRoles: [
        "CustomerAdmin",
        "CustomerSeller",
      ],
    };
  },
  methods: {
    space() {
      let temp = this.mobilePhone;
      if (this.mobilePhone.length < 2 && this.mobilePhone != " ") {
        this.mobilePhone = " " + temp;
      }
      if (this.mobilePhone == "")
        this.validateMobilePhone = "Please enter mobile phone";
      else this.validateMobilePhone = "";
      if (this.mobilePhone.length > 10) {
        this.mobilePhone = this.mobilePhone.substring(0, this.mobilePhone.length - 1);
      }
    },
    passwordConfirm: function () {
      if (this.password != this.confirmPassword) {
        this.checkPassword = "Password Doesn't Match";
      } else {
        this.checkPassword = "";
      }
    },

    checkEmailIfNotExist: function () {
      this.$http.get("accounts/checkemail/" + this.email).then(response => {
        if (response.data == "Email exists") {
          this.checkEmail = "This email already Exists";
        } else this.checkEmail = "";
      });
    },
    addUser() {
      if (this.password != this.confirmPassword) {
        this.checkPassword = "Password Doesn't Match";
      } else {
        this.checkPassword = "";
      }
      if (this.mobilePhone == "") this.validateMobilePhone = "Mobile phone is required";
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          if (this.checkEmail == "" && this.mobilePhone != "") {
            this.$http
              .post("/auth/signup", {
                firstName: this.firstName,
                lastName: this.lastName,
                grandFatherName: this.grandFatherName,
                mobilePhone: "+251" + this.mobilePhone.substr(1),
                email: this.email,
                userType: this.role,
                password: this.password,
                companyId: this.companyId ? this.companyId : 0
              })
              .then(response => {
                this.isLoading = false
                this.$vs.notify({
                  title: this.$t('Add'),
                  text: this.$t('Registered Successfully!'),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success",
                  time: 6000
                });
                this.$router.push({ path: "/pages/view-user" });
              }).catch(error => {
                this.isLoading = false
                this.$vs.notify({
                  title: this.$t('Add'),
                  text: this.$t('notRegistered'),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "warnning",
                  time: 6000
                });
              })
          }
        }
      });

      // }
    }
  },
  updated() {
    if (this.email == "") {
      this.checkEmail = "";
    }
  }
};
</script>
<style  scoped>
#checkPassword {
  color: red;
}

#mobilePhone {
  color: red;
}
</style>
