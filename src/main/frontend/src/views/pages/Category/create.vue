<template>
  <div id="main-div" class="vx-row">
   
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addCategory')">

      <vs-tabs alignment="fixed">
        <vs-tab
          :label="$t('addCategoryItem')"
          >
        <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
        
        
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('inventoryType')"
                v-model="inventoryType"
                name="inventoryType"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('inventoryType') }}</span>
            </div>
            <div class="vx-col sm:w-1/4 md:w-full lg:w-1/3 xl:w-1/3 mb-6">
              <vs-input
                class="w-full"
                :label="$t('Description')"
                v-model="description"
                name="description"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first('description') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="addCategory" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
            </div>
            </div>
          </div>

          </vx-card>
          </vs-tab>
          <vs-tab :label="$t('categoryFile')">
            <vx-card id="card-id" title="">
            <div class="vx-row">
                <form
                class="mt-8 vx-col mb-6 mr-0 ml-4 p-0 "
                @submit.prevent="onSubmit"
                enctype="multipart/form-data"
              >
                <input
                  class="mr-2 w-64"
                  type="file"
                  text="Upload Image"
                  ref="categoryFile"
                  name="categoryFile"
                  @change="onSelectText"
                />
                <span @click="cancelText">
                  <feather-icon icon="XCircleIcon" svgClasses="h-4 w-4"></feather-icon>
                </span>
              </form>
              <div class="vx-col w-full">
                <vs-button @click="addCatetoryFile" class="mr-3 mb-2 mt-2">{{$t('Import')}}</vs-button>
              </div>
              </div> 
            </vx-card>
          </vs-tab>
          </vs-tabs>

      </vx-card>
    </div>
  </div>
</template>


<script>
import router from "@/router.js";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    inventoryType: {
      required: "Please enter Category name",
      alpha: "Category type must be character"
    },
    
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
      inventoryType: "",
      registerButtonClicked: false,
      clicked: 0,
      error: false,
      categoryFile: "",
      isLoading: false,
      description:""
    };
  },
  methods: {
    onSelectText() {
      const categoryFile = this.$refs.categoryFile.files[0];
      this.categoryFile = categoryFile;
      var textImage = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.textImage = e.target.result;
      };
      reader.readAsDataURL(categoryFile);
    },
    cancelText() {
      this.$refs.categoryFile.value = null;
      this.textImage = "";
    },
    addCatetoryFile(){
     const formData = new FormData();
      if (this.categoryFile != "") {
        formData.append("importExcel", this.categoryFile);
      }
      this.isLoading=true
      this.$http.post("/category/import", formData).then(response => {
            this.isLoading=false
            this.$vs.notify({
              title:this.$t('Add'),
              text: this.$t('importedSuccessfully'),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success"
            });
            this.$router.push({ path: "/pages/view-categories" });
          }).catch(error=>{
            this.isLoading=false
          })
    },
    onSubmit() {
    },
    checkCategoryIfNotExist: function() {
      this.$http.get("category/checkname/" + this.inventoryType).then(response => {
        if (response.data == "Test Category Type exists") {
          this.checkCategory = "This Category type already Exists";
        } else this.checkCategory = "";
      });
    },
    addCategory() {
      this.$validator.validateAll().then(Category => {
        if (Category) {
          if (true/*this.checkCategory == ""*/) {
            this.$vs.loading({ color: this.colorLoading });
            this.$http
              .post("/category", {
                inventoryType: this.inventoryType,
                description:this.description
              })
              .then(response => {
                  console.log(response.data);
                this.$vs.notify({
                  title: this.$t("Add"),
                  text: this.$t("Registered Successfully!"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success"
                });
                this.$vs.loading.close();
                this.$router.push({ path: "/pages/view-categories" });
              })
              .catch(error => {
                this.$vs.loading.close();
              });
          }
        }
      });

      // }
    }
  },
  updated() {
    if (this.email == "") {
      this.checkCategory = "";
    }
  }
};
</script>
<style  lang="scss" scoped>

#checkPassword {
  color: red;
}
#mobilePhone {
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