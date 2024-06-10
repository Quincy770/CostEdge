<template>
  <div id="main-div" class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addRegion')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 md:w-full lg:w-1/3 xl:w-1/3 mb-6">
              <vs-input
                class="w-full"
                :label="$t('regionName')"
                v-model="name"
                name="name"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('name') }}</span>
            </div>

            <div class="vx-col sm:w-1/4 md:w-full lg:w-1/3 xl:w-1/3 mb-6">
              <vs-input
                class="w-full"
                :label="$t('description')"
                v-model="description"
                name="description"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('description') }}</span>
            </div>

          </div>
          <div class="vx-row">
            <div class="vx-col sm:w-1/4 md:w-full lg:w-4/5 xl:w-4/5 mb-6">
    
  </div>
              <vs-button v-if="isGranted('addRegion')" @click="addRegion" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    regionName: {
      required: "Please enter region name",
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
    };
  },
  methods: {
    addRegion() {
      this.$validator.validateAll().then(result => {
       if (result) {
         this.isLoading=true
           this.$http
             .post("/region",
             {
              name: this.name,
              description:this.description
             })
             .then(response => {
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
                 text: this.$t('Registered Successfully!'),
                 iconPack: "feather",
                 icon: "icon-alert-circle",
                 color: "success",
                 time:6000
               });
               this.$router.push({ path: "/pages/view-region" });
             }).catch(error=>{
               this.isLoading=false
               this.$vs.notify({
                 title:this.$t('Add'),
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
 
};
</script>
<style  lang="scss" scoped>

</style>
