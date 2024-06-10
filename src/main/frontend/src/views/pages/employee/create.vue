<template>
  <div id="main-div" class="vx-row">
   
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addEmployee')">

        <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
        
        
          <div class="vx-row mt-10">
          
            <div
                            class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('firstName')"
                              v-model="record.firstName"
                              class="w-full"
                              name="firstName"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("firstName")
                            }}</span>
                          </div>
                        
                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('middleName')"
                              v-model="record.middleName"
                              class="w-full"
                              name="middleName"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("middleName")
                            }}</span>
                        </div>
                     
                        <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('lastName')"
                              v-model="record.lastName"
                              class="w-full"
                              name="lastName"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("lastName")
                            }}</span>
                        </div>
                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('email')"
                              v-model="record.email"
                              class="w-full"
                              name="email"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("email")
                            }}</span>
                          </div>
                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('phoneNumber')"
                              v-model="record.phoneNumber"
                              class="w-full"
                              name="phoneNumber"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("phoneNumber")
                            }}</span>
                          </div>

                          <div
                          class="vx-col sm:w-full md:w-full l:w-1/4 xl:w-1/4"
                          >
                            <vs-input
                              :label="$t('position')"
                              v-model="record.position"
                              class="w-full"
                              name="position"
                              v-validate="'required'"
                              data-vv-validate-on="blur"
                            />
                            <span class="text-danger">{{
                              errors.first("position")
                            }}</span>
                          </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                  <br>
              <vs-button @click="addEmployee" color="success" class="mr-3 mb-2">{{$t('save')}}</vs-button>
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
    inventoryType: {
      required: "Please enter Employee name",
      alpha: "Employee type must be character"
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
      record: {
        firstName: "",
        middleName: "",
        lastName:"",
        phoneNumber: "",
        email: "",
        postion:""
        }
    };
  },

  methods: {

addEmployee() {
  this.$validator.validateAll().then(result => {
   if (result) {
     this.isLoading=true
       this.$http
         .post("/employee", this.record)
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
           this.$router.push({ path: "/pages/view-employee" });
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