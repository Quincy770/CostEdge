
<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <loading :active.sync="isLoading" :can-cancel="true"></loading>
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4 items-center justify-center">
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components:{
   Loading
  },
  data() {
    return {
      verificationtoken:this.$route.query.verificationToken,
      isLoading:false
    };
  },
  created(){
    if(this.verificationtoken!=""){
        this.isLoading=true
        this.$http
        .get("/verify/account/"+this.verificationtoken)
        .then(function(response) {
          this.isLoading=false
          router.push('/pages/login');
          this.$store.state.confirm.email="";
          this.$vs.notify({
           title: "Verify",
          text: "Verified Successfully!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "success",
          time:7000
      });
      }).catch(error=>{
        this.isLoading=false
      })
    }
  }
};
</script>

<style lang="scss">
#page-login {
  .social-login {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
#email {
  color: blue;
}
</style>
