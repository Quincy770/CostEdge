<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editCountry')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('countryName')"
                v-model="item.name"
                name="countryName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('countryName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('nationality')"
                v-model="item.nationality"
                name="nationalityName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('nationalityName') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="editCountry" color="success" class="mr-3 mb-2">{{$t('update')}}</vs-button>
            </div>
            </div>
          </div>

          <div class="vx-row">
            <!-- <div class="vx-col w-full">
              <vs-button @click="editCountry" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    countryName: {
      required: "Please enter country type",
      alpha: "country type must be character"
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
      registerButtonClicked: false,
      clicked: 0,
      error: false,
      isLoading: false,
      countryId:this.$route.params.id,
      item: {},
    };
  },
  methods: {
    onSubmit() {
    },
    checcountryNameIfNotExist: function() {
      this.$http.get("country/checkname/" + this.countryName).then(response => {
        if (response.data == "country Type exists") {
          this.checkcountryName = "This country already Exists";
        } else this.checkcountryName = "";
      });
    },
    editCountry() {
      this.$validator.validateAll().then(country => {
        if (country) {
          if (true/*this.checkcountryName == ""*/) {
            this.$vs.loading({ color: this.colorLoading });
            this.$http
              .put("/country/"+this.countryId, {
                name: this.item.name,
                nationality: this.item.nationality,
              })
              .then(response => {
                  console.log(response.data);
                this.$vs.notify({
                  title: this.$t("Add"),
                  text: this.$t("Updated Successfully!"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success"
                });
                this.$vs.loading.close();
                //this.$router.push({ path: "/pages/country-type/"+this.countryId });
                this.$router.push({ path: "/pages/view-countries" });
              })
              .catch(error => {
                this.$vs.loading.close();
              });
          }
        }
      });

      // }
    }
  },

  created() {
    const thisIns = this;
    this.$http
      .get("/country/"+this.countryId, {
        params: { page: this.currentPage, limit: this.limit }
      })
      .then(function(response) {
        thisIns.item = response.data;
        //alert(JSON.stringify(response.data));
        this.responseGeted = true;
      })
      .catch(error => {
    //alert("rr")
        this.responseGeted = true;
      });
  },
  updated() {
    if (this.email == "") {
      this.checkcountryName = "";
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
