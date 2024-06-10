<template>
  <div id="main-div" class="vx-row">
   
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editOrderTimeLimit')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('timeLimit')"
                v-model="orderTimeLimit"
                name="orderTimeLimit"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('orderTimeLimit') }}</span>
            </div>

            <div class="vx-col w-1/6 mb-6 mr-4 ml-1">
            <span class="ml-2">{{$t('unit')}}</span>
            <v-select
              v-model="unit"
              class="w-full"
              :options="units"
              label="unit"
              name="unit"
            ></v-select>  
            <span class="text-danger">{{ errors.first('unit') }}</span>          
          </div>
            <!-- <div class="vx-col sm:w-1/4 w-full mb-6">
                    <flat-pickr
                      class="w-full"
                      :config="configdateTimePicker"
                      v-model="paymentDateTime"
                      v-validate="'required'"
                      v-validate:paymentDateTime="'required'"
                      data-vv-validate-on="blur"
                      data-vv-scope="specimen"
                      name="paymentDateTime"
                    />

            </div> -->
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="editOrderTimeLimit()" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
            </div>
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
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
const dict = {
  custom: {
    siteName : {
      required: "Please enter site name",
    },
    
  }
};
Validator.localize("en", dict);
import VSelect from "vue-select";
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading,
    flatPickr,
  },
  data() {
    return {
      orderTimeLimit: "",
      timeLimitInMinute: "",
      unit: "",
      units: ["Minute","Hour", "Day", "Month", "Year"],
      isLoading: false,
      paymentDateTime: "",
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y-m-dTH:i",
      },
      orderTimeLimitId: this.$route.params.orderTimeLimitId
    };
  },
  methods: {

    resetValues(){
      this.siteName= "";
    },

    convertToMinute(){
      if(this.unit=="Hour")
          this.timeLimitInMinute = this.orderTimeLimit * 60;
      else if(this.unit=="Day")
          this.timeLimitInMinute = this.orderTimeLimit * 60*24;
      else if(this.unit=="Month")
          this.timeLimitInMinute = this.orderTimeLimit * 60*24*30;
      else if(this.unit=="Year")
          this.timeLimitInMinute = this.orderTimeLimit * 60*24*30*12;
      else
          this.timeLimitInMinute = this.orderTimeLimit;
      
    },
    editOrderTimeLimit() {
      this.convertToMinute();
      this.$validator.validateAll().then(orderTimeLimit => {
        if (orderTimeLimit) {
              this.isLoading = true;
             var data=
                    {
                    "timeLimit": this.timeLimitInMinute,
                    }
               this.$http
                  .put("/order-time-limit/" + this.orderTimeLimitId, data)
                  .then(response => {
                      this.isLoading = false;
                      this.$vs.notify({
                          title: this.$t("update"),
                          text: this.$t("Updated Successfully!"),
                          iconPack: "feather",
                          icon: "icon-alert-circle",
                          color: "success"
                    });
                this.$vs.loading.close();
                this.$router.push({ path: "/pages/view-order-time-limit" });
              })
              .catch(error => {
                this.isLoading = false;
              });

        }
      });

      // }
    },


    getOrderTimeLimit() {
      this.$http
        .get(`/order-time-limit/`+this.orderTimeLimitId)
        .then(response => {
          this.orderTimeLimit = response.data.timeLimit
          this.unit = "Minute"
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

  },

  created(){
   this.getOrderTimeLimit();
  }
};
</script>
<style  lang="scss" scoped>
  
</style>