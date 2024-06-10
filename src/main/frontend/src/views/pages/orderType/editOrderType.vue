<template>
  <div id="main-div" class="vx-row">
   
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editOrderType')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('orderType')"
                v-model="orderType"
                name="orderType"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('orderType') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="editOrderType" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
const dict = {
  custom: {
    orderType : {
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
    Loading
  },
  data() {
    return {
      orderType: "",
      isLoading: false,
      orderTypeId: this.$route.params.orderTypeId,
    };
  },
  methods: {
    resetValues(){
      this.orderType= "";
    },
    editOrderType() {
      this.$validator.validateAll().then(site => {
        if (site) {
              this.isLoading = true;
             var data={
                         orderType: this.orderType,
                       }
               this.$http
              .put("/order-type/"+this.orderTypeId, data)
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
                this.$router.push({ path: "/pages/view-order-type" });
              })
              .catch(error => {
                this.isLoading = false;
              });

        }
      });

    },

   getOrderType(){
          this.$http
              .get("/order-type/"+this.orderTypeId)
              .then(response => {
                  this.orderType = response.data.orderType;
                  this.isLoading = false;
                  this.$vs.notify({
                       title: this.$t("Update"),
                       text: this.$t("Registered Successfully!"),
                       iconPack: "feather",
                       icon: "icon-alert-circle",
                       color: "success"
                });
                this.$vs.loading.close();
              })
              .catch(error => {
                this.isLoading = false;
              });
   }

  },

  created(){
   this.getOrderType();
  }
};
</script>
<style  lang="scss" scoped>

</style>