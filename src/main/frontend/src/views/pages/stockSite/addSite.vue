<template>
  <div id="main-div" class="vx-row">
   
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addSite')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('siteName')"
                v-model="siteName"
                name="siteName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('siteName') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="addSite" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    Loading
  },
  data() {
    return {
      siteName: "",
      isLoading: false,
    };
  },
  methods: {
    resetValues(){
      this.siteName= "";
    },
    addSite() {
      this.$validator.validateAll().then(site => {
        if (site) {
              this.isLoading = true;
             var data={
                         siteName: this.siteName,
                       }
               this.$http
              .post("/stock-site", data)
              .then(response => {
                  this.isLoading = false;
                  this.$vs.notify({
                       title: this.$t("Add"),
                       text: this.$t("Registered Successfully!"),
                       iconPack: "feather",
                       icon: "icon-alert-circle",
                       color: "success"
                });
                this.$vs.loading.close();
                this.$router.push({ path: "/pages/view-stock-sites" });
              })
              .catch(error => {
                this.isLoading = false;
              });

        }
      });

      // }
    }
  },
};
</script>
<style  lang="scss" scoped>

</style>