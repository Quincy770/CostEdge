<template>
  <div id="main-div" class="vx-row">
   
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('orderTypeStatusType')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <span class="ml-2">{{$t('orderStatusType')}}</span>
              <v-select
                v-model="orderStatusType"
                class="w-full"
                :options="orderStatusTypes"
                label="orderStatusType"
                :reduce="orderStatusType=>orderStatusType.orderStatusTypeId"
                name="orderStatusType"
                @input="filterOrderType()"
                close="filterOrderType()"
              ></v-select> 
              <span class="text-danger">{{ errors.first('orderStatusType') }}</span>
            </div>
            <div class="vx-col w-1/6  mr-4 ml-1">
            <span class="ml-2">{{$t('orderType')}}</span>
            <v-select
              v-model="orderType"
              class="w-full"
              :options="filteredOrderTypes"
              label="orderType"
              :reduce="orderType=>orderType.orderTypeId"
              name="orderType"
            ></v-select> 
            <span class="text-danger">{{ errors.first('orderType') }}</span>           
          </div>
          <div class="vx-col sm:w-1/6 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('weight')"
                v-model="weight"
                name="weight"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('weight') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="addOrderTypeStatusType" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
      required: "Please enter status type",
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
      orderStatusTypes: "",
      orderTypeStatusType: "",
      orderTypes: [],
      filteredOrderTypes: [],
      isLoading: false,
      weight: "",
      orderType: "",
      orderStatusType: "",
    };
  },
  methods: {

    filterOrderType(){
      // if(this.orderStatusType =='' || this.orderStatusTypes == null)
      //     this.filteredOrderTypes = this.orderTypes;
      // else{
      //     this.filteredOrderTypes = this.orderTypes;
      //     var orderTypeStatusType = this.orderTypeStatusTypes.find(item=>item.orderStatusTypeId==this.orderStatusType);
      //     this.filteredOrderTypes = this.orderTypes.filter(orderType=>orderType.orderTypeId==orderTypeStatusType.orderTypeId);
      // }
    },

    getOrderTypeStatusTypes() {
      this.$http
        .get(`/order-type-status-type`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey
          }
        })
        .then(response => {
          this.orderTypeStatusTypes = response.data;
          this.totalPage = response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

    getOrderStatusTypes() {
      this.$http
        .get(`/order-status-type`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey
          }
        })
        .then(response => {
          this.orderStatusTypes=response.data;
          this.totalPage = response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

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
          this.filteredOrderTypes = this.orderTypes;
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
    addOrderTypeStatusType() {
      this.$validator.validateAll().then(site => {
        if (site) {
             this.isLoading = true;
             var data={
                         orderStatusTypeId: this.orderStatusType,
                         orderTypeId: this.orderType,
                         weight: this.weight
                       }
               this.$http
              .post("/order-type-status-type", data)
              .then(response => {
                  this.isLoading = false;
                  this.$vs.notify({
                       title: this.$t("Save"),
                       text: this.$t("Saved Successfully!"),
                       iconPack: "feather",
                       icon: "icon-alert-circle",
                       color: "success"
                });
                this.$vs.loading.close();
                this.$router.push({ path: "/pages/order-type-status-type" });
              })
              .catch(error => {
                this.isLoading = false;
              });

        }
      });

      // }
    },

    getOrderTypeStatusTypes() {
      this.$http
        .get(`/order-type-status-type`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey
          }
        })
        .then(response => {
          this.orderTypeStatusTypes = response.data;
          this.totalPage = response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
  },
  created(){
   this.getOrderTypes();
   this.getOrderStatusTypes();
   this.getOrderTypeStatusTypes();
  }
};
</script>
<style  lang="scss" scoped>

</style>