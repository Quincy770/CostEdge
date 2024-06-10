<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('updateInventory')">
        <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
        <div class="vx-row mt-10">
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-col sm:w-1/4 w-full mb-6">
            <vs-input
              class="w-full"
              :label="$t('genericName')"
              v-model="inventoryGenericName"
              name="genericName"
              v-validate="'required'"
              data-vv-validate-on="blur"
            />
            <span class="text-danger">{{ errors.first('genericName') }}</span>
          </div>
         <div class="vx-col sm:w-1/4 w-full mb-6">
            <vs-input
              class="w-full"
              :label="$t('Description')"
              v-model="dosageForm"
              data-vv-validate-on="blur"
            />
          </div>
       
          <div class="vvx-col sm:w-1/4 w-full mb-6">
            <span class="ml-4">{{$t('Category')}}</span>
            <v-select
              vs-multiple
              :options="options.map(c => c.inventoryType)"
              autocomplete
              v-model="inventoryType"
              v-validate="'required'" name="inventoryType" :class="{ danger: errors.has('Category') }">
            >
    
            </v-select>
              <span class="text-danger" v-show="errors.has('Category')" >
             {{ errors.first('Category') }}
  </span>
          </div>

          <div class="vx-col sm:w-1/4 w-full mb-3">
                  <span class="inputLabel">{{ $t("supplier") }}</span>
                  <v-select
                    v-model.trim="supplierId"
                    class="w-full"
                    :options="suppliers"
                    label="name"
                    v-validate="'required'"
                    :reduce="(supplier) => supplier.supplierId"
                    name="name"
                  ></v-select>
                  <span
                    class="text-danger"
                    v-show="errors.has('supplier')"
                    >{{ errors.first("supplier") }}</span
                  >
                </div>
          <div class="vx-col sm:w-1/4 w-full mb-6">
            <vs-input
              class="w-full"
              :label="$t('minimumQuantity')"
              v-model="minimumStockQuantity"
              name="minimumStockQuantity"
              v-validate="'required|integer'"
              data-vv-validate-on="blur"
            />
            <span class="text-danger">{{ errors.first('minimumStockQuantity') }}</span>
          </div>
  
          <form label="Product Image" class="mt-8 vx-col  mb-6 mr-0 pr-0" @submit.prevent="onSubmit" enctype="multipart/form-data">
            <input class="lg:w-2/3 mr-2 w-32" type="file" text="Upload Image" ref="file" name="file" @change="onSelect" />
            <span @click="cancel"><feather-icon icon="XCircleIcon" svgClasses="h-4 w-4"></feather-icon></span>
          </form> 
       <div class="vx-col mb-6 " v-if="image!=''" >
      <img  :src="image"     height="100px"
         width="150px"/>
      <!-- <button >Remove image</button> -->
    </div>
            </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button @click="updateInventory" class="mr-3 mb-2">{{$t('Update')}}</vs-button>
          </div>
        </div>
      </vx-card>
      </vx-card>
    </div>
  </div>
</template>
<script>
import VSelect from 'vue-select';
import inventoryCategory from "./inventoryCategory.js";
import router from "@/router";
import { throws } from "assert";
import { Validator } from "vee-validate";
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
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
      alpha: "Measuring Unit must be character"
    },
   subCategory: {
      required: "Please Enter Sub Category",
      alpha: "Measuring Unit must be character"
    },
  dosageForm: {
      required: "Please Enter Dosage Form",
      alpha: "Measuring Unit must be character"
    },
  strength: {
      required: "Please Enter Strength",
      alpha: "Measuring Unit must be character"
    },
  volume: {
      required: "Please Enter Volume",
      alpha: "Measuring Unit must be character"
    },
  minimumStockQuantity: {
      required: "Please enter  quantity",
      numeric: "Minimum Stock Quantity Must be number"
    }

  }
};
Validator.localize("en", dict);
export default {
    components:{
   'v-select':VSelect,
   Loading
  },
  data() {
    return {
      inventory: [],
      id: this.$route.params.id,
      inventoryGenericName: "",
      inventoryBrandName: "",
      measuringUnit: "",
      inventoryType: "",
      subCategory:"",
      dosageForm:"",
      strength:"",
      volume:"",
      suppliers:[],
      supplierId:"",
      minimumStockQuantity:"",
      file:"",
      image:'',
      options: [], // inventoryCategory,
      measuringUnits: [
        "Number",
        "ml",
        "mg"
      ],
      isLoading:false

    };
  },
  methods: {
    getSuppliers(){
    this.$http.get("/supplier",
      ).then(response => {
        this.suppliers=response.data
      });
   },
    getCategories() {
      this.$http
        .get(`/category`, {
          params: {
            limit: 1000000000,
          }
        })
        .then(response => {
          this.options=response.data;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    onSelect(){
        const file=this.$refs.file.files[0];
        this.file=file;
        var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
        cancel(){
      this.$refs.file.value = null;
       this.image = '';
    },
    updateInventory() {
          const formData=new FormData();
          if(this.file!=""){
             formData.append('uploadImage',this.file);
          } 
          formData.append('inventoryGenericName',this.inventoryGenericName); 
          formData.append('inventoryType',this.inventoryType); 
          this.supplierId = this.inventory.supplierId;
          formData.append('dosageForm',this.dosageForm); 
          formData.append('minimumStockQuantity',this.minimumStockQuantity);
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading=true
          this.$http
            .put("/inventory/"+this.id,formData)
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
              this.$router.push({ path: "/pages/view-inventory" });
            }).catch(error=>{
              this.isLoading=false
              this.$vs.notify({
                title:this.$t('Update'),
                text: this.$t('notUpdated'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warnning",
                time:6000
              });
            })
        }
      });
    },

    inventoryDetail(){
      this.isLoading=true
      this.$http.get("inventory/" + this.id).then(response => {
          this.isLoading=false
          this.inventory = response.data;
          this.inventoryGenericName = this.inventory.inventoryGenericName;
          this.inventoryType = this.inventory.inventoryType;
          this.supplierId = this.inventory.supplierId;
          this.minimumStockQuantity = this.inventory.minimumStockQuantity;
          this.dosageForm = this.inventory.dosageForm;
        }).catch(error=>{
          this.isLoading=false
        })
   },

   getInventoryFromState(){
      this.inventory = this.$store.getters["inventory/getInventory"](this.id)
          this.inventoryGenericName = this.inventory.inventoryGenericName;
          this.inventoryType = this.inventory.inventoryType;
          this.supplierId = this.inventory.supplierId;
          this.minimumStockQuantity = this.inventory.minimumStockQuantity;
          this.dosageForm = this.inventory.dosageForm;
   }
  },

  created() {
    this.getCategories()
    if(this.$store.getters["inventory/getInventory"](this.id)){
          this.getInventoryFromState();
    }

    else{
        this.inventoryDetail()
    }
  },
  computed: {
    getInventoryItem() {
      return this.$store.getters["inventory/getInventory"](this.id);
    }
  }
};
</script>
<style  scoped>
</style>