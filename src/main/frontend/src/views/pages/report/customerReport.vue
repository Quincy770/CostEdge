<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <div class="vx-col w-full">
        <vx-card :title="$t('customerReport')">
        <div class="vx-row w-full">
        <div class="vx-col sm:w-full md:w-full lg:w-1/6 mb-2">
          <span class="inputLabel">{{$t('from')}}</span>
          <flat-pickr
            class="w-full"
            v-model="fromDate"
            :format="format"
            name="fromDate"
          />
        </div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/6  mb-2">
          <span class="inputLabel">{{$t('to')}}</span>
          <flat-pickr
            class="w-full"
            v-model="toDate"
            :format="format"
            name="toDate"
          />
        </div>

        <div class="vx-col vx-col sm:w-full md:w-full lg:w-1/5 mb-2">
           <span class="inputLabel">{{$t('filterByCustomer')}}</span>
            <v-select
              v-model="customerId"
              :options="customers"
              label="firstName"
              :reduce="obj => obj.userId"
              name="customer"
              @input ="getCustomerReport()"
            ></v-select>
        </div>

         <div class="vx-col vx-col sm:w-full md:w-full lg:w-1/5 mb-2">
           <span class="inputLabel">{{$t('filterByInventory')}}</span>
            <v-select
              v-model="inventoryId"
              :options="inventoryItems"
              label="inventoryGenericName"
              :reduce="obj => obj.inventoryId"
              name="inventoryId"
              @input ="getCustomerReport()"
            ></v-select>
        </div>

        <div class="vx-col sm:w-full md:w-full lg:w-1/4  mb-2">
          <vs-button
            @click="getCustomerReport()"
            size="medium"
            color="success"
            icon-pack="feather"
            icon="icon-rotate-ccw"
            class="mt-4 mb-2 text-lg"
          >{{$t('Generate Report')}}
          </vs-button>
        </div>
        </div>
          <div class="mt-4">
            <vs-table :data="inventories">
              <template slot="thead">
                <vs-th>#</vs-th>
                <vs-th>{{$t('inventoryName')}}</vs-th>
                <vs-th>{{$t('purchasedQuantity')}}</vs-th>
                <vs-th>{{$t('soldQuantity')}}</vs-th>
                <vs-th>{{$t('remainQuantity')}}</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="indextr+1">
                    <span>{{indextr+1}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].inventoryName">
                    <span>{{data[indextr].inventoryName}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].purchasedQuantity">
                    <span>{{data[indextr].purchasedQuantity}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].purchasedQuantity">
                    <span>{{data[indextr].soldQuantity}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].availableQuantity">
                    <span>{{data[indextr].availableQuantity}}</span>
                  </vs-td>
                </vs-tr>

                <vs-tr v-if="inventories.length>0">
                    <vs-th></vs-th>
                    <vs-th>
                      Total: 
                    </vs-th>
                    <vs-th>{{totalPurchasedGoods}}</vs-th>
                    <vs-th>{{totalSoldGoods}}</vs-th>
                    <vs-th>{{totalAvailableQuantity}}</vs-th>
                </vs-tr>
              </template>
            </vs-table>
          </div>

        </vx-card>
      </div>
    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from '@/views/ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
    data() {
        return {
            fromDate: "",
            toDate: "",
            customerId: "",
            inventoryId: "",
            inventories: [],
            allInventories: [],
            customers: [],
            totalSoldGoods: 0,
            totalPurchasedGoods: 0,
            totalAvailableQuantity: 0,
            inventoryItems: []
        }
        
    },

methods: {
getCustomerReport(){
    let fromDateD = new Date(this.fromDate);
    let fromDateStr = this.fromDate != '' ? fromDateD.getFullYear() + "-" + ((Number(fromDateD.getUTCMonth() + 1) < 10 ? '0' : '') + (Number(fromDateD.getUTCMonth()) + 1)) + "-" + (Number(fromDateD.getUTCDate()) < 10 ? '0' : '') + fromDateD.getUTCDate() : '';
    let toDateD = new Date(this.toDate);
    let toDateStr = this.toDate != '' ? toDateD.getFullYear() + "-" + ((Number(toDateD.getUTCMonth() + 1) < 10 ? '0' : '') + (Number(toDateD.getUTCMonth()) + 1)) + "-" + (Number(toDateD.getUTCDate()) < 10 ? '0' : '') + toDateD.getUTCDate() : '';
    this.$http.get(`/inventorytransaction/customer-report`,
                  {
            params: {
              fromDate: fromDateStr,
              toDate: toDateStr,
              inventoryId: this.inventoryId,
              customerId: this.customerId ==null?"":this.customerId,
              limit: 10000,
              page: 1,
            },
         }).then(response => {
        this.inventories = response.data;
        this.setTotalQuantities();
    });
},

getAllUsers(){
  this.$http.get(`/accounts/users`).then(response => {
       this.customers = response.data;
   });
},
setTotalQuantities(){
        this.totalSoldGoods=0;
        this.totalPurchasedGoods=0;
        this.totalAvailableQuantity=0;

       this.inventories.forEach(element => {
          this.totalSoldGoods+=element.soldQuantity;
          this.totalPurchasedGoods+=element.purchasedQuantity;
          this.totalAvailableQuantity+=element.availableQuantity;
      });
  },

  getInvenrotries(){
    const thisins =this;
        this.$http
          .get("/inventory", {
            params: { page:1 , limit: 1000000 }
          })
          .then(function(response) {
            thisins.inventoryItems= response.data;
          }).catch(error=>{
          });
    }



 },

created(){
  this.getCustomerReport();
  this.getAllUsers();
  this.getInvenrotries();
 },

components: {
        VueApexCharts,
        StatisticsCardLine,
        ChangeTimeDurationDropdown,
        flatPickr,
    },
}
</script>

<style lang="scss">
#dashboard-analytics {
  .greet-user{
    position: relative;
    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
</style>
