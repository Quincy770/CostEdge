<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" title="">
        <form
            class="mt-8 vx-col mb-6 mr-0 ml-4 p-0 "
            @submit.prevent="onSubmit"
            enctype="multipart/form-data"
          >
            <input
              class="lg:w-2/3 mr-2 w-32"
              type="file"
              text="Upload Image"
              ref="file"
              name="file"
              @change="onSelect"
            />
            <span @click="cancel">
              <feather-icon icon="XCircleIcon" svgClasses="h-4 w-4"></feather-icon>
            </span>
          </form>
      </vx-card>
    </div>
  </div>
</template>


<script>
import VSelect from "vue-select";
import inventoryCategory from "./inventoryCategory.js";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    genericName: {
      required: "Please enter generic name",
      alpha: "Generic Name must be character"
    },
    brandName: {
      required: "Please enter brand name",
      alpha: "Brand Name must be character"
    },
    inventoryType: {
      required: "Please enter category",
      alpha: "Inventory Type must be character"
    },
    measuringUnit: {
      required: "Please enter unit",
      alpha: "Unit must be character"
    },
    subCategory: {
      required: "Please enter sub category"
    },
    volume: {
      required: "Please enter volume"
    },
    strength: {
      required: "Please enter strength"
    },
    minimumStockQuantity: {
      required: "Please Enter quantity",
      integer: "please Enter Integer"
    },
    dosageForm: {
      required: "Please Dosage Form form"
    }
  }
};
Validator.localize("en", dict);
export default {
  components: {
    "v-select": VSelect
  },
  data() {
    return {
      inventoryGenericName: [],
      inventoryBrandName: [],
      inventoryType: "",
      measuringUnit: "",
      subCategory: "",
      dosageForm: "",
      strength: "",
      volume: "",
      minimumStockQuantity: "",
      categories: inventoryCategory,
      measuringUnits: ["Number", "ml", "mg"],
      file: "",
      image: ""
    };
  },
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0];
      this.file = file;
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    cancel() {
      this.$refs.file.value = null;
      this.image = "";
    },
    addInventory() {
      console.log("file" + this.file);
      const formData = new FormData();
      if (this.file != "") {
        formData.append("uploadImage", this.file);
      }
      formData.append("inventoryGenericName", this.inventoryGenericName);
      formData.append("inventoryBrandName", this.inventoryBrandName);
      formData.append("inventoryType", this.inventoryType);
      formData.append("measuringUnit", this.measuringUnit);
      formData.append("subCategory", this.subCategory);
      formData.append("dosageForm", this.dosageForm);
      formData.append("strength", this.strength);
      formData.append("volume", this.volume);
      formData.append("minimumStockQuantity", this.minimumStockQuantity);
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$http.post("/inventory", formData).then(response => {
            this.$vs.notify({
              title:this.$t('Add'),
              text: this.$t('Registered Successfully!'),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success"
            });
            this.$router.push({ path: "/pages/view-inventory" });
          });
        }
      });
    },
    fileChange(fileList) {
      this.files.inventory /
        updateInventory /
        ("file", fileList[0], fileList[0].name);
    },
    upload(){
      axios({
        method: "POST",
        url: "http://localhost:3000",
        data: this.files
      }).then(
        result => {
          console.dir(result.data);
        },
        error => {
          console.error(error);
        }
      );
    },
    navigate(){
       this.$router.push({ path: "/pages/view-inventory" });
    }
  }
};
</script>
<style  scoped>
</style>