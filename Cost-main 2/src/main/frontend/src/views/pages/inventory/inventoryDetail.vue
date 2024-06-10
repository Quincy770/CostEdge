<template>
  <div id="invoice-page"  style="margin-top:-100px;">
    <vx-card id="card" :title="$t('Inventory Detail')">
      <div class="ml-32">
      </div>
      <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
        <div class="vx-row leading-loose p-base">
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-col w-full md:w-1/4">
            <vs-avatar
              v-if="inventory.inventoryImage"
              size="150px"
              :src="(`${$domain}/inventory-item-images/${inventory.inventoryImage}`)"
            />
            <vs-avatar
              v-if="!inventory.inventoryImage"
              size="150px"
              :src="require(`@/assets/images/profiles//CnDoEPXVInjLaSTWgvVYaYOrd0UJGz.png`)"
            />
          </div>
          <div class="vx-col w-full md:w-1/4 text-left">
            <div class="invoice__invoice-detail">
              <h5 class="mt-4">{{$t('genericName')}}</h5>
              <p class="flex items-center">
                <span class="ml-2">{{inventory.inventoryGenericName}},{{inventory.strength}},{{inventory.strength}}</span>
              </p>
              <h5 class="mt-4">{{$t('brandName')}}</h5>
              <p class="flex items-center">
                <span class="ml-2">{{inventory.inventoryBrandName}}</span>
              </p>
              <h5 class="mt-4">{{$t('Category')}}</h5>
              <p class="flex items-center">
                <span class="ml-2">{{inventory.inventoryType}}</span>
              </p>
             <h5 class="mt-4">{{$t('measuringUnit')}}</h5>
              <p class="flex items-center">
                <span class="ml-2">{{inventory.measuringUnit}}</span>
              </p>
            </div>
          </div>
          <div class="vx-col w-full md:w-1/3 text-left">
            <div class="invoice__invoice-detail">
              <h5 class="mt-4">{{$t('availableQuantity')}}</h5>
              <p class="flex items-center">
                <span class="ml-2">{{inventory.availableQuantity}}</span>
              </p>
              <h5 class="mt-4">{{$t('subCategory')}}</h5>
              <p class="flex items-center">
                <span class="ml-2">{{inventory.subCategory}}</span>
              </p>
              <h5 class="mt-4">{{$t('minimumQuantity')}}</h5>
              <p class="flex items-center">
                <span class="ml-2">{{inventory.minimumStockQuantity}}</span>
              </p>
            </div>
          </div>
        </div>
      </vx-card>
    </vx-card>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components:{
   Loading
  },
  data() {
    return {
      inventory: [],
      id: this.$route.params.id,
      isLoading: false
    };
  },

  methods:{
   inventoryDetail(){
      this.isLoading=true
      this.$http.get("inventory/" + this.id).then(response => {
          this.isLoading = false
          this.inventory = response.data;       
        }).catch(error=>{
          this.isLoading=false
        })
   }
  },
  created() {
    this.inventoryDetail()
  }
};
</script>
<style scoped>
#card {
  height: 600px;
}
</style>