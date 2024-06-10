<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editPrivilege')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('privilegeName')"
                v-model="privilegeName"
                name="privilegeName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeName') }}</span>
            </div>
          <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('privilegeDescription')"
                v-model="privilegeDescription"
                name="privilegeDescription"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeDescription') }}</span>
            </div>


            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('privilegeUrl')"
                v-model="privilegeUrl"
                name="privilegeUrl"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeUrl') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('method')"
                v-model="method"
                name="method"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('method') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button v-if="isGranted('editPrivilege')" @click="editPrivilege" color="success" class="mr-3 mb-2">{{$t('update')}}</vs-button>
            </div>
            </div>
          </div>

          <div class="vx-row">
            <!-- <div class="vx-col w-full">
              <vs-button @click="editZone" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    privilegeName: {
      required: "Please enter privilege Name",
      alpha: "privilege name must be character"
    },
     privilegeDescription: {
      required: "Please enter Privilege Description",
      alpha: "Privilege Description must be character"
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
      privilegeName: '',
      privilegeDescription:'',
      privilegeUrl: '',
      method: "",
      registerButtonClicked: false,
      id: this.$route.params.id,
      clicked: 0,
      error: false,
      isLoading: false,
      privilegeId:this.$route.params.id,
      item: {},
    };
  },
  methods: {
    editPrivilege() {
      this.$validator.validateAll().then(privilege => {
        if (privilege) {
             this.$store.dispatch('PrivilegeModule/editPrivilege',{
                privilegeName: this.privilegeName,
                privilegeDescription: this.privilegeDescription,
                privilegeUrl:this.privilegeUrl,
                method:this.method,
                privilegeId:this.id,
                updatedBy: localStorage.getItem('userId'),
              }).then(response => {
                  console.log(response.data);
                this.$vs.notify({
                  title: this.$t("Add"),
                  text: this.$t("Updated Successfully!"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success"
                });
                this.$vs.loading.close();
                //this.$router.push({ path: "/pages/zones-type/"+this.zoneId });
                if(this.isGranted('viewPrivileges'))
                  this.$router.push({ name: "viewPrivileges" });
              })
              .catch(error => {
                this.$vs.loading.close();
              });
          }});
      //   }
      // });

      // }
    },
       populateForms(){
      this.privilegeName= this.getPrivilege.privilegeName;
      this.privilegeDescription = this.getPrivilege.privilegeDescription;
      this.privilegeUrl = this.getPrivilege.privilegeUrl;
      this.method = this.getPrivilege.method;
      this.privilegeId = this.getPrivilege.privilegeId;
    }

  },

computed: {
   getPrivilege(){
     return this.$store.getters["PrivilegeModule/getPrivilege"];
   }
 },

created(){
    this.$store.dispatch('PrivilegeModule/fetchPrivilege', this.id).then(() => {
      this.populateForms();
    })
  }
};
</script>
<style  lang="scss" scoped>

</style>
