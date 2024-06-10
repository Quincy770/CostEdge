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
                v-model="item.privilegeName"
                name="privilegeName"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeName') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('privilegeUrl')"
                v-model="item.privilegeUrl"
                name="privilegeUrl"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('privilegeUrl') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('method')"
                v-model="item.method"
                name="method"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('method') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="editPrivilege" color="success" class="mr-3 mb-2">{{$t('update')}}</vs-button>
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
      required: "Please enter privilege type",
      alpha: "privilege type must be character"
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
      privilegeUrl: '',
      method: "",
      registerButtonClicked: false,
      clicked: 0,
      error: false,
      isLoading: false,
      privilegeId:this.$route.params.id,
      item: {},
    };
  },
  methods: {
    onSubmit() {
    },
    // checzoneNameIfNotExist: function() {
    //   this.$http.get("zone/checkname/" + this.zoneName).then(response => {
    //     if (response.data == "zone Type exists") {
    //       this.checkzoneName = "This zone already Exists";
    //     } else this.checkzoneName = "";
    //   });
    // },
    editPrivilege() {
      this.$validator.validateAll().then(agent => {
        if (agent) {
          // if (true/*this.checkzoneName == ""*/) {
            alert(JSON.stringify(this.privilegeName))
            this.$vs.loading({ color: this.colorLoading });
            this.$http
              .put("/privileges/"+this.privilegeId, {
                privilegeName: this.item.privilegeName,
                privilegeUrl:this.item.privilegeUrl,
                method:this.item.method,
              })
              .then(response => {
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
                this.$router.push({ path: "/pages/view-privileges" });
              })
              .catch(error => {
                this.$vs.loading.close();
              });
          }});
      //   }
      // });

      // }
    },

  },

  created() {
    const thisIns = this;
    this.$http
      .get("/privileges/"+this.privilegeId, {
        params: { page: this.currentPage, limit: this.limit }
      })
      .then(function(response) {
        thisIns.item = response.data;
        //alert(JSON.stringify(response.data));
        this.responseGeted = true;
      })
      .catch(error => {
    //alert("rr")
        this.responseGeted = true;
      });

  },
  updated() {
    if (this.email == "") {
      this.checkzoneName = "";
    }
  }
};
</script>
<style  lang="scss" scoped>

#checkPassword {
  color: red;
}
#phoneNumber {
  color: red;
}

.loader-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  cursor: pointer;
  span.text {
    display: inline-block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
  .loader {
    animation: loader-animate 1.5s linear infinite;
    clip: rect(0, 80px, 80px, 40px);
    height: 80px;
    width: 80px;
    position: absolute;
    left: calc(50% - 40px);
    top: calc(50% - 40px);
    &:after {
      animation: loader-animate-after 1.5s ease-in-out infinite;
      clip: rect(0, 80px, 80px, 40px);
      content: "";
      border-radius: 50%;
      height: 80px;
      width: 80px;
      position: absolute;
    }
  }
  @keyframes loader-animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }
  @keyframes loader-animate-after {
    0% {
      box-shadow: inset #fff 0 0 0 17px;
      transform: rotate(-140deg);
    }
    50% {
      box-shadow: inset #fff 0 0 0 2px;
    }
    100% {
      box-shadow: inset #fff 0 0 0 17px;
      transform: rotate(140deg);
    }
  }

}
</style>
