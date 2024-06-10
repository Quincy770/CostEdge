<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editRole')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('roleName')"
                v-model="roleName"
                name="roleName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('roleName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('roleFullName')"
                v-model="roleFullName"
                name="roleFullName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('roleFullName') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button v-if="isGranted('editRole')" @click="editRole" color="success" class="mr-3 mb-2">{{$t('update')}}</vs-button>
            </div>
            </div>
          </div>

          <div class="vx-row">
            <!-- <div class="vx-col w-full">
              <vs-button @click="editRole" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    roleName: {
      required: "Please enter role name",
      alpha: "Role name must be character"
    },
    roleFullName: {
      required: "Please enter role full name",
      alpha: "Role full name must be character"
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
      roleName: "",
      roleFullName: "",
      registerButtonClicked: false,
      clicked: 0,
      error: false,
      isLoading: false,
      id:this.$route.params.id,
      roleId:this.$route.params.id,
      item: {},
    };
  },
  methods: {
    checRoleNameIfNotExist: function() {
      this.$http.get("role/checkname/" + this.roleName).then(response => {
        if (response.data == "Role type exists") {
          this.checkRoleName = "This role already Exists";
        } else this.checkRoleName = "";
      });
    },

  editRole() {

     this.$validator.validateAll().then(role => {
       if (role) {
        this.$store.dispatch('RoleModule/editRole', {roleName:this.roleName,roleFullName:this.roleFullName,roleId:this.id}).then(() => {
              this.isLoading=true;
              this.$vs.notify({
                    title: this.$t("Add"),
                    text: this.$t("Saved Successfully!"),
                    iconPack: "feather",
                    icon: "icon-alert-circle",
                    color: "success"
                  });
            });
       }});
      },

    populateForms(){
      this.roleName = this.getRole.roleName;
      this.roleFullName = this.getRole.roleFullName;
      this.roleId = this.getRole.roleId;
    }

  },

computed: {
   getRole(){
     return this.$store.getters["RoleModule/getRole"];
   }
 },

created(){
    this.$store.dispatch('RoleModule/fetchRole', this.id).then(() => {
      this.populateForms();
    })
  }


};
</script>
<style  lang="scss" scoped>

</style>
