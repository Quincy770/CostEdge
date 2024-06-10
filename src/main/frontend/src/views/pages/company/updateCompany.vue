<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" title>
        <h3>{{ $t("updateCompany") }}</h3>
        <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
          <div class="vx-row mt-10">
            <loading :active.sync="isLoading" :can-cancel="true"></loading>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('companyName')" v-model="companyName" name="companyName"
                v-validate="'required'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('companyName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('licenceNumber')" v-model="licenceNumber" name="licenceNumber"
                v-validate="'required'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('licenceNumber') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('tinNumber')" v-model="tinNumber" name="tinNumber"
                v-validate="'required'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('tinNumber') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <span>{{ $t('Status') }}</span>
              <v-select class="selectExample" :label="$t('Status')" v-model="status" :options="options"
                label-placeholder="Autocomplete" vs-multiple autocomplete v-validate="'required'" name="status">
              </v-select>
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col md:w-1/4 w-full mt-4 mb-6 mr-12">
              <span>{{ $t('Region') }}</span>
              <v-select class="selectExample" :label="$t('Region')" v-model="region" :options="regions"
                label-placeholder="Autocomplete" vs-multiple autocomplete v-validate="'required'" name="region">
              </v-select>
              <span class="text-danger" v-show="errors.has('region')">{{ errors.first('region') }}</span>
            </div>
            <div class="vx-col md:w-1/4 w-full mb-6">
              <vs-input :label="$t('Woreda/City')" v-model="woredaCity" class="w-full mt-4" name="woredaCity"
                v-validate="'required'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('woredaCity') }}</span>
            </div>

            <div class="vx-col md:w-1/4 w-full mb-6">
              <vs-input :label="$t('Street')" v-model="street" class="w-full mt-4" name="street" v-validate="'required'"
                data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('street') }}</span>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-button style="float:right;" @click="updateCompany" class="mr-3 mb-2">{{ $t('Update') }}</vs-button>
            </div>
          </div>
          <p></p>
          <div v-if="buttonClicked" class="loader-overlay">
            <div class="loader"></div>
            <span class="text" v-html="text"></span>
          </div>
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
const dict = {
  custom: {
    companyName: {
      required: "Please enter company name",
      alpha: "Company Name must be character"
    },
    licenceNumber: {
      required: "Please enter licence number",
      alpha: "Licence number must be character"
    },
    tinNumber: {
      required: "Please enter tin number",
      alpha: "Tin Number must be character"
    },
    companyStatus: {
      required: "Please Enter Company Status",
      alpha: "Company Status must be character"
    },
    region: {
      required: 'Please enter region'
    },
    woredaCity: {
      required: "Please enter woreda/city",
    },
    street: {
      required: "Please enter street",
    }
  }
};
Validator.localize("en", dict);
import VSelect from "vue-select";
export default {
  components: {
    "v-select": VSelect,
    Loading
  },
  data() {
    return {
      company: [],
      id: this.$route.params.id,
      companyName: "",
      licenceNumber: "",
      tinNumber: "",
      companyStatus: "",
      region: "",
      woredaCity: "",
      street: "",
      status: "Active",
      buttonClicked: false,
      isLoading: false,
      options: [
        "Active",
        "Disabled",
      ],
      regions: [
        this.$t('Tigray'),
        this.$t('Afar'),
        this.$t('Oromia'),
        this.$t('Amhara'),
        this.$t('Gambiela'),
        this.$t('Harer'),
        this.$t('Somali'),
        this.$t('Debub Hzboch'),
        this.$t('Benshangul Gumuz'),
        this.$t('Addis Ababa'),
        this.$t('Driedawa'),
      ]
    };
  },
  methods: {
    updateCompany() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.$http
            .put("/company/" + this.id, {
              companyName: this.companyName,
              licenceNumber: this.licenceNumber,
              tinNumber: this.tinNumber,
              companyStatus: this.status,
              region: this.region,
              woredaCity: this.woredaCity,
              street: this.street
            })
            .then(response => {
              this.isLoading = false
              this.$vs.notify({
                title: this.$t('Update'),
                text: this.$t('Updated Successfully!'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
                time: 6000
              });
              this.buttonClicked = false;
              this.$router.push({ path: "/pages/view-company" });
            }).catch((error) => {
              this.isLoading = false
            })

        }
      });
    },
    getCompanyDetail() {
      this.isLoading = true
      this.$http.get('company/' + this.id).then((response) => {
        this.isLoading = false
        this.company = response.data;
        this.companyName = this.company.companyName;
        this.licenceNumber = this.company.licenceNumber;
        this.tinNumber = this.company.tinNumber;
        this.companyStatus = this.company.companyStatus;
        this.status = this.company.companyStatus;
        this.region = this.company.region;
        this.woredaCity = this.company.woredaCity;
        this.street = this.company.street;
      }).catch((err) => {
        this.isLoading = false
      })
    },
  },

  created() {
    if (this.$store.getters["company/getCompany"](this.id)) {
      this.company = this.$store.getters["company/getCompany"](this.id);
      this.companyName = this.company.companyName;
      this.licenceNumber = this.company.licenceNumber;
      this.tinNumber = this.company.tinNumber;
      this.companyStatus = this.company.companyStatus;
      this.status = this.company.companyStatus;
      this.region = this.company.region;
      this.woredaCity = this.company.woredaCity;
      this.street = this.company.street;
    }

    else {
      this.getCompanyDetail()
    }
  }
};
</script>
<style  scoped>
</style>
