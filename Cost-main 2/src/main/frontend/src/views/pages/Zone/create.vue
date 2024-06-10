<template>
  <div id="main-div" class="vx-row">
   
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addZone')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('zoneName')"
                v-model="zoneName"
                name="zoneName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('zoneName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <span>{{ $t('Country') }}</span>
              <v-select
                v-model="countryId"
                :placeholder="$t('country')"
                class="ml-2"
                label="name"
                :options="countries"
                :reduce="country => country.countryId"
                :on-change="updateDependableOptions(countryId, 'Country')"
                name="countryId"
              ></v-select>
              <span class="text-danger">{{ errors.first('countryId') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <span>{{ $t('Region') }}</span>
              <v-select
                v-model="regionId"
                :placeholder="$t('region')"
                class="ml-2"
                label="name"
                :options="regions"
                :reduce="region => region.regionId"
                :on-change="updateDependableOptions(regionId, 'Region')"
                name="regionId"
              ></v-select>
              <span class="text-danger">{{ errors.first('regionId') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="addZone" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
            </div>
            </div>
          </div>

          <div class="vx-row">
            <!-- <div class="vx-col w-full">
              <vs-button @click="addZone" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
            </div> -->
          </div>
          <div v-if="registerButtonClicked==true&&!error" class="loader-overlay">
            <div class="loader"></div>
            <span class="text" v-html="text"></span>
          </div>
        </vx-card>
      </vx-card>
    </div>
  </div>
</template>


<script>
import router from "@/router.js";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    zoneName: {
      required: "Please enter zone type",
      alpha: "zone type must be character"
    }
  }
};
Validator.localize("en", dict);
import VSelect from "vue-select";
// import flatPickr from "vue-flatpickr-component";
// import "flatpickr/dist/flatpickr.css";
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading
  },
  data() {
    return {
      countryId: '',
      regionId: '',
      zoneName: "",
      registerButtonClicked: false,
      clicked: 0,
      error: false,
      isLoading: false,
      refCountryId: '',
      refRegionId: '',
      countries: [],//[{countryId: 1, name: 'Ethiopia'}, {countryId: 2, name: 'Eritrea'}, ],
      regions: [],//[{regionId: 1, name: 'Tigray'}, {regionId: 2, name: 'Amhara'}, ],
      allRegions: [],
    };
  },
  methods: {
    onSubmit() {
    },
    checkzoneIfNotExist: function() {
      this.$http.get("zone/checkname/" + this.zoneName).then(response => {
        if (response.data == "Test zone Type exists") {
          this.checkzone = "This zone type already Exists";
        } else this.checkzone = "";
      });
    },
    addZone() {
      this.$validator.validateAll().then(zone => {
        if (zone) {
          if (true/*this.checkzone == ""*/) {
            this.$vs.loading({ color: this.colorLoading });
            
            this.$http
              .post("/zone", {
                name: this.zoneName,
                countryId: this.countryId,
                regionId: this.regionId,
              })
              .then(response => {
                  console.log(response.data);
                this.$vs.notify({
                  title: this.$t("Add"),
                  text: this.$t("Registered Successfully!"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success"
                });
                this.$vs.loading.close();
                this.$router.push({ path: "/pages/view-zones" });
              })
              .catch(error => {
                this.$vs.loading.close();
              });
          }
        }
      });

      // }
    },
    updateDependableOptions(parentId, level){
      var collectionsKey='', url='';
      if(level=='Country'){
        if(parentId=='' || this.refCountryId==parentId){
          return;
        }
      this.refCountryId=parentId;
        // collectionsKey='regions';
        // url=`/region?countryId=${parentId}`;
        this.regionId='';
        this.regions=this.allRegions.filter(region=>region.countryId==this.countryId);
      }
      if(level=='Region'){

        collectionsKey='zones';
        url=`/zone?regionId=${parentId}`;
      }
      if(level=='Zone'){
        collectionsKey='woredas';
        url=`/woreda?zoneId=${parentId}`;
      }
      if(level=='Woreda'){
        collectionsKey='kebelles';
        url=`/kebelle?woredaId=${parentId}`;
      }

    /*this.$http
        .get(url, {
          params: {
            page: 1,
            limit: 100000
          }
        })
        .then(response => {
          this.isLoading = false;
          if(JSON.stringify(this.regions)!=JSON.stringify(response.data)){
            alert("different")
            this[collectionsKey] = response.data;
          }
          if(level=='Country'){
            alert("country regions")
          alert(JSON.stringify(response.data))
          }
        })
        .catch(error => {
          this.isLoading = false;
        });*/
    }
  
  },
  created() {
    this.$http
        .get("/country")
        .then(response => {
          this.countries = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
        this.$http
        .get("/region")
        .then(response => {
          //this.regions = response.data;
          this.allRegions=response.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
  },
  updated() {
    if (this.email == "") {
      this.checkzone = "";
    }
  }
};
</script>
<style  lang="scss" scoped>

#checkPassword {
  color: red;
}
#mobilePhone {
  color: red;
}

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
  span.text {
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