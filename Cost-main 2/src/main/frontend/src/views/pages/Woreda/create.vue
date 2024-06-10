<template>
  <div id="main-div" class="vx-row">
   
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addWoreda')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('woredaName')"
                v-model="woredaName"
                name="woredaName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('woredaName') }}</span>
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
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <span>{{ $t('Zone') }}</span>
              <v-select
              v-model="zoneId"
                :placeholder="$t('zone')"
                class="ml-2"
                label="name"
                :options="zones"
                :reduce="zone => zone.zoneId"
                :on-change="updateDependableOptions(zoneId, 'Zone')"
                name="zoneId"
              ></v-select>
              <span class="text-danger">{{ errors.first('zoneId') }}</span>
            </div>
            
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="addWoreda" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
            </div>
            </div>
          </div>

          <div class="vx-row">
            <!-- <div class="vx-col w-full">
              <vs-button @click="addWoreda" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    woredaName: {
      required: "Please enter woreda type",
      alpha: "woreda type must be character"
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
      zoneId: '',
      woredaName: "",
      registerButtonClicked: false,
      clicked: 0,
      error: false,
      isLoading: false,
      refCountryId: '',
      refRegionId: '',
      refZoneId: '',
      countries: [],//[{countryId: 1, name: 'Ethiopia'}, {countryId: 2, name: 'Eritrea'}, ],
      regions: [],//[{regionId: 1, name: 'Tigray'}, {regionId: 2, name: 'Amhara'}, ],
      zones: [],//[{zoneId: 1, name: 'Mekelle'}, {zoneId: 2, name: 'Eastern'}, ],
      allRegions: [],
      allZones: [],
    };
  },
  methods: {
    onSubmit() {
    },
    checkworedaIfNotExist: function() {
      this.$http.get("woreda/checkname/" + this.woredaName).then(response => {
        if (response.data == "Test woreda Type exists") {
          this.checkworeda = "This woreda type already Exists";
        } else this.checkworeda = "";
      });
    },
    addWoreda() {
      this.$validator.validateAll().then(woreda => {
        if (woreda) {
          if (true/*this.checkworeda == ""*/) {
            this.$vs.loading({ color: this.colorLoading });
            this.$http
              .post("/woreda", {
                name: this.woredaName,
                countryId: this.countryId,
                regionId: this.regionId,
                zoneId: this.zoneId,
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
                this.$router.push({ path: "/pages/view-woredas" });
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
        if(parentId=='' || this.refRegionId==parentId){
          return;
        }
      this.refRegionId=parentId;
        // collectionsKey='zones';
        // url=`/zone?regionId=${parentId}`;
        this.zoneId='';
        this.zones=this.allZones.filter(zone=>zone.regionId==this.regionId);
        }
      if(level=='Zone'){
        collectionsKey='woredas';
        url=`/woreda?zoneId=${parentId}`;
      }
      if(level=='Woreda'){
        collectionsKey='kebelles';
        url=`/kebelle?woredaId=${parentId}`;
      }
/*
    this.$http
        .get(url, {
          params: {
            page: 1,
            limit: 100000
          }
        })
        .then(response => {
          this.isLoading = false;
          this[collectionsKey] = response.data;
        })
        .catch(error => {
          this.isLoading = false;
        });
        */
    }
  
  },
  created(){
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
          this.allRegions = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
        this.$http
        .get("/zone")
        .then(response => {
          this.allZones = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });

  },
  updated() {
    if (this.email == "") {
      this.checkworeda = "";
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