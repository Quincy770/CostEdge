<template>
  <div id="invoice-page">
    <vx-card id="card" :title="$t('Company Detail')">
      <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
       <loading :active.sync="isLoading" :can-cancel="true"></loading>
      <div  class="vx-row leading-loose p-base">
        <div class="vx-col w-full md:w-1/4 text-left">
          <div class="invoice__invoice-detail">
            <h6 class="mt-4">{{$t('companyName')}}</h6>
            <p class="flex items-center">
            <feather-icon icon="BriefcaseIcon" svgClasses="h-4 w-4"></feather-icon>

              <span class="ml-2">{{company.companyName}}</span>
            </p>
            <h6 class="mt-4">{{$t('licenceNumber')}}</h6>
            <p class="flex items-center">
                 <feather-icon icon="CreditCardIcon" svgClasses="h-4 w-4"></feather-icon>

              <span class="ml-2">{{company.licenceNumber}}</span>
            </p>
            <h6 class="mt-4">{{$t('tinNumber')}}</h6>
            <p class="flex items-center">
              <feather-icon icon="SquareIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{company.tinNumber}}</span>
            </p>

          </div>
        </div>
        <div class="vx-col w-full md:w-1/3 text-left">
          <div class="invoice__invoice-detail">
             <h6 class="mt-4">{{$t('Address')}}</h6>
            <p class="flex items-center">
              <feather-icon icon="MapPinIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{company.region}}, {{company.woredaCity}}, {{company.street}}</span>
            </p>
                        <h6 class="mt-4">{{$t('companyStatus')}}</h6>
            <p class="flex items-center">
              <feather-icon icon="BookIcon" svgClasses="h-4 w-4"></feather-icon>
              <span class="ml-2">{{company.companyStatus}}</span>
            </p>
          </div>
        </div>
      </div>
    </vx-card>
    </vx-card>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default{
    components:{
      Loading
    },
    data() {
        return {
         company:[],
         id:this.$route.params.id,
         isLoading:false

            
        }
    },
    methods:{
      companyDetail(){
       this.isLoading=true
       this.$http.get('company/'+this.id).then((response)=>{
          this.isLoading=false
          this.company=response.data;
          }).catch((err)=>{
            this.isLoading=false
          })
      }
    },
created(){
      this.companyDetail()
    }

}
</script>
<style lang="scss" scoped>
#card{
  height: 600px;
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
            transform: translate(-50%,-50%);
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
                content: '';
                border-radius: 50%;
                height: 80px;
                width: 80px;
                position: absolute;
            }
        }
        @keyframes loader-animate {
            0% {
                transform: rotate(0deg)
            }
            100% {
                transform: rotate(220deg)
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