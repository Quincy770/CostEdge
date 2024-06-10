<template>
  <div id="main-div" class="vx-row" >
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('uploadReceipt')">
        <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
          <vx-card :title="$t('uploadReceipt')" no-shadow card-border>
          <div class="vx-col sm:w-1/3 mt-5 w-full mb-6">
          <span v-if="index2!=0" class="ml-4 bg-red">
            <b>{{$t('clickHereToAddMoreFiles')}}</b>
          </span>
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
              </form>
            </div>
            <div class="vx-row" v-for="(option,index) in index2" :key="index">
            <div class="vx-col sm:w-1/6 mt-5 w-full mb-6">
              <img :src="images[index]" height="100px" width="150px" />
             </div>
                  
          <div class="vx-col w-16 mt-8">
                <span class="lg:p-0 mr-2" id="edit-icon" @click="removeRow(index)">
                  <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                </span>
               </div>
          </div>
        </vx-card>
        <br>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button @click="uploadReceipt" class="mr-3 mb-2">{{$t('upload')}}</vs-button>
          </div>
        </div>
      </vx-card>
      </vx-card>
    </div>
  </div>
</template>


<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import VSelect from "vue-select";
import { Validator } from "vee-validate";
import { log } from 'util';
const dict = {
  custom: {
      
  }
};
Validator.localize("en", dict);
export default {
  data() {
    return {
      rooms:[],
      description:[],
      uploadedFiles:[],
      file:"",
       images:[],
       index1:1,
       index2:0,
       image:"",
    };
  },
  methods: {

    removeRow: function(index) {
      this.index2--;
      this.uploadedFiles.splice(index, 1);
      this.images.splice(index, 1);
    },
    onSelect() { 
      const file = this.$refs.file.files[0];
      this.file=file;      
      this.uploadedFiles[this.index2] = file;
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.images[this.index2++]=e.target.result;
      };
      
      reader.readAsDataURL(file);
      this.$refs.file.value = null;
      
    },
    cancel() {
      this.$refs.file.value = null;
      this.image = "";
    },
    addCustomer() {           
            
                 for(let k=0;k<this.index2;k++){
                    const formData = new FormData();
                    formData.append("uploadFile",this.uploadedFiles[k]);
                    formData.append("description",this.description[k]);
                    formData.append("customerId","2");
                    this.$http.post('/rent/documents',formData).then(response => {
                        this.$vs.notify({
                        title:this.$t('Add'),
                        text: this.$t('addedSuccessfully'),
                        iconPack: "feather",
                        icon: "icon-alert-circle",
                        color: "success"
                    });
                  }).catch(error=>{
                    console.log(error)
                });
        }
    },
  },
  components: {
    flatPickr,
     "v-select": VSelect

  },
};
</script>
<style  scoped>

</style>