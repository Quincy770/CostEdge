<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('updateUser')">
        <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
          <div class="vx-row mt-10">
            <loading :active.sync="isLoading" :can-cancel="true"></loading>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('firstName')" v-model="firstName" name="firstName"
                v-validate="'required|alpha'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('firstName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('fatherName')" v-model="lastName" name="lastName"
                v-validate="'required|alpha'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('lastName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('grandFatherName')" v-model="grandFatherName" name="grandFatherName"
                v-validate="'required|alpha'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('grandFatherName') }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <vs-input icon-pack="feather" icon="icon-country-code" icon-no-border class="w-full"
                :label="$t('mobilePhone')" v-model="mobilePhone" name="mobilePhone"
                v-validate="{ regex: (/^[' '][9]\d{8}$/) }" data-vv-validate-on="blur" @keyup="space" />
              <span class="text-danger">{{ errors.first('mobilePhone') }}</span>
              <span id="mobilePhone">{{ validateMobilePhone }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-2">
              <vs-input class="w-full" :label="$t('Email')" v-model="email" name="email" v-validate="'required|email'"
                data-vv-validate-on="blur" @keyup.enter="updateUser" />
              <span class="text-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="vx-col w-1/4 mb-6 mr-4 ml-1">
              <span class="ml-2">{{ $t('role') }}</span>
              <v-select v-model="role" v-validate="'required'" class="w-full" :options="roles"
                v-validate:role="'required'" name="role" :class="{ danger: errors.has('role') }"></v-select>
              <span class="text-danger" v-show="errors.has('role')">{{ errors.first('role') }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-3/4">
              <vs-button style="float:right;" @click="updateUser" class="mr-3 mb-2">{{ $t('Update') }}</vs-button>
            </div>
          </div>
          <p></p>
        </vx-card>
      </vx-card>
    </div>
  </div>
</template>


<script>
import { Validator } from "vee-validate";
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import VSelect from "vue-select";
const dict = {
  custom: {
    firstName: {
      required: "First name is required",
      alpha: "First name must be characters"
    },
    lastName: {
      required: "Last name is required",
      alpha: "Last name must be characters"
    },
    grandFatherName: {
      required: "Grand fahter is required",
      alpha: "Grand Father name must be characters"
    },
    mobilePhone: {
      regex: "Invalid phone number format"
    },
    password: {
      required: "Password is required",
    },
    confirm_password: {
      required: "Password is required",
      alpha: "password must contain alphabets"
    },
    email: {
      required: "Email is required",
      email: "Please enter valid email"
    },
    company_name: {
      required: "company name is required",
      alpha_spaces: "company must be characters"
    },
    licence_number: {
      required: "licence number is required",
      alpha_dash: "Tin Number can contain characters, dashes, underscores and numbers"
    },
    tin_number: {
      required: "Tin Number is required",
      alpha_dash: "Tin Number can contain characters, dashes, underscores and numbers"
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
      users: [],
      id: this.$route.params.id,
      firstName: "",
      lastName: "",
      grandFatherName: "",
      mobilePhone: "",
      email: "",
      role: "",
      roles: [
        "Admin",
        "Customer",
        "Finance",
      ],
      validateMobilePhone: "",
      isLoading: false
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
    updateUser() {
      if (this.mobilePhone == "") this.validateMobilePhone = "Mobile phone is required";
      this.$validator.validateAll().then(result => {
        if (result && this.mobilePhone != "") {
          this.isLoading = true
          this.$http
            .put("/accounts/" + this.id, {
              firstName: this.firstName,
              lastName: this.lastName,
              grandFatherName: this.grandFatherName,
              mobilePhone: "+251" + this.mobilePhone.substr(1),
              email: this.email,
              userType: this.role,
            })
            .then(response => {
              this.isLoading = false
              this.$vs.notify({
                title: this.$t('Update'),
                text: this.$t('Updated Successfully!'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success"
              });
              this.$router.push({ path: "/pages/view-customer" });
            }).catch(error => {
              this.isLoading = false
            })

        }
      });
    },
    getUserDetail() {
      this.$http
        .get("/accounts/" + this.id, {
        })
        .then(response => {
          this.users = response.data;
          this.firstName = this.users.firstName;
          this.lastName = this.users.lastName;
          this.grandFatherName = this.users.grandFatherName;
          this.mobilePhone = " " + this.users.mobilePhone.substr(4);
          this.email = this.users.email;
          this.role = this.users.userType
          this.isLoading = false
        }).catch(error => {
          this.isLoading = false
        })
    },
  },

  created() {

    if (this.$store.getters["user/getUser"](this.id)) {
      this.users = this.$store.getters["user/getUser"](this.id);
      this.firstName = this.users.firstName;
      this.lastName = this.users.lastName;
      this.grandFatherName = this.users.grandFatherName;
      this.mobilePhone = " " + this.users.mobilePhone.substr(4);
      this.email = this.users.email;
      this.role = this.users.userType
    }

    else {
      this.getUserDetail()
    }
  },


};
</script>
<style  scoped>
#mobilePhone {
  color: red;
}
</style>
