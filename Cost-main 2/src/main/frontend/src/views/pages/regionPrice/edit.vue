<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addRegionPrice')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 md:w-full lg:w-1/3 xl:w-1/3 mb-6">
                  <span class="inputLabel">{{ $t("region") }}</span>
                  <v-select
                    v-model.trim="regionId"
                    class="w-full"
                    :options="regions"
                    label="name"
                    v-validate="'required'"
                    :reduce="(region) => region.regionId"
                    name="name"
                  ></v-select>
                  <span
                    class="text-danger"
                    v-show="errors.has('region')"
                    >{{ errors.first("region") }}</span
                  >
                </div>


                <div class="vx-col sm:w-1/4 md:w-full lg:w-1/3 xl:w-1/3 mb-6">
                  <span class="inputLabel">{{ $t("Product") }}</span>
                  <v-select
                    v-model.trim="productId"
                    class="w-full"
                    :options="products"
                    label="inventoryGenericName"
                    v-validate="'required'"
                    :reduce="(product) => product.productId"
                    name="name"
                  ></v-select>
                  <span
                    class="text-danger"
                    v-show="errors.has('Product')"
                    >{{ errors.first("Product") }}</span
                  >
                </div>

            <div class="vx-col sm:w-1/4 md:w-full lg:w-1/3 xl:w-1/3 mb-6">
              <vs-input
                class="w-full"
                :label="$t('price')"
                v-model="price"
                name="price"
                v-validate="'required'"
                data-vv-validate-on="blur"
                type="number"
              />
              <span class="text-danger">{{ errors.first('price') }}</span>
            </div>

          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-1/4 md:w-full lg:w-4/5 xl:w-4/5 mb-6">
    
  </div>
              <vs-button v-if="isGranted('addRegionPrice')" @click="editRegionPrice" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    regionPriceName: {
      required: "Please enter regionPrice name",
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
      name: "",
      description:"",      
      isLoading: false,
      regionPriceId: this.$route.params.id
    };
  },
  methods: {
    fetchRegionPrice(){
      this.$http.get("/api/region-price/"+this.regionPriceId)
             .then(response => {
              this.regionId=response.data.regionId,
              this.productId=response.data.productId
              this.price=response.data.price
             }).catch(error=>{
             }) 
    },
    editRegionPrice() {
      this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .put("/api/region-price/"+this.regionPriceId,
             {
              regionId: this.regionId,
              productId: this.productId,
              price: this.price
             })
             .then(response => {
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Update'),
                 text: this.$t('Updated Successfully!'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success",
                 time:6000
               });
               this.$router.push({ path: "/pages/view-region-price" });
             }).catch(error=>{
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Update'),
                 text: this.$t('notRegistered'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "warnning",
                 time:6000
               });
             })            
       }
     });
    }
  },

  created(){
    this.fetchRegionPrice();
  }
 
};
</script>
<style  lang="scss" scoped>

</style>
