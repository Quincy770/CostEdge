<template>
  <div id="main-div" class="vx-row">
   
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editorderStatusType')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('orderStatusType')"
                v-model="orderStatusType"
                name="orderStatusType"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('orderStatusType') }}</span>
            </div>

            <div class="vx-col w-1/6 mb-6 mr-4 ml-1">
              <span class="ml-2">{{$t('orderType')}}</span>
              <v-select
                multiple
                v-model="orderTypeIds"
                class="w-full"
                :options="orderTypes"
                label="orderType"
                :reduce="orderType=>orderType.orderTypeId"
                name="orderTypeIds"
              ></v-select>            
          </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="editorderStatusType" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    orderStatusType : {
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
      orderStatusType: "",
      orderTypeIds: "",
      orderTypes: [],
      isLoading: false,
      orderStatusTypeId: this.$route.params.orderStatusTypeId,
    };
  },
  methods: {    
    getOrderTypes() {
      this.$http
        .get(`/order-type`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey
          }
        })
        .then(response => {
          this.orderTypes=response.data;
          this.totalPage = response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

    resetValues(){
      this.orderStatusType= "";
    },
    editorderStatusType() {
      this.$validator.validateAll().then(site => {
        if (site) {
              this.isLoading = true;
             var data={
                         orderStatusType: this.orderStatusType,
                         orderTypeIds: this.orderTypeIds
                       }
               this.$http
              .put("/order-status-type/"+this.orderStatusTypeId, data)
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
                this.$router.push({ path: "/pages/view-order-status-type" });
              })
              .catch(error => {
                this.isLoading = false;
              });

        }
      });

    },

   getOrderStatusType(){
          this.$http
              .get("/order-status-type/"+this.orderStatusTypeId)
              .then(response => {
                  this.orderStatusType = response.data.orderStatusType;
                  this.orderTypeIds = response.data.orderTypeIds;
                  this.isLoading = false;                 
                this.$vs.loading.close();
              })
              .catch(error => {
                this.isLoading = false;
              });
   }

  },

  created(){
   this.getOrderStatusType();
   this.getOrderTypes();
  }
};
</script>
<style  lang="scss" scoped>

</style>