
<template>
  <div id="dashboard-analytics">       
    <div class="vx-row">
      <div class="vx-col w-full">
        <vx-card :title="$t('manufacturerReport')">
        <div class="vx-row w-full">
        <div class="vx-col sm:w-full md:w-full lg:w-1/4 mb-2">
          <span class="inputLabel">{{$t('from')}}</span>
          <flat-pickr
            class="w-full"
            v-model="fromDate"
            :format="format"
            name="fromDate"
          />
        </div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/4  mb-2">
          <span class="inputLabel">{{$t('to')}}</span>
          <flat-pickr
            class="w-full"
            v-model="toDate"
            :format="format"
            name="toDate"
          />
        </div>

        <div class="vx-col vx-col sm:w-full md:w-full lg:w-1/4 mb-2">
           <span class="inputLabel">{{$t('filterByInventory')}}</span>
            <v-select
              v-model="inventoryId"
              :options="inventoryItems"
              label="inventoryGenericName"
              :reduce="obj => obj.inventoryId"
              name="inventoryId"
              @input ="getSoldGoods()"
            ></v-select>
        </div>

        <div class="vx-col sm:w-full md:w-full lg:w-1/4  mb-2">
          <vs-button
            @click="getSoldGoods()"
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
                <vs-th>{{$t('manufacturedQuantity')}}</vs-th>
                <vs-th>{{$t('soldQuantity')}}</vs-th>
                <vs-th>{{$t('availableQuantity')}}</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="indextr+1">
                    <span>{{indextr+1}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].inventoryGenericName">
                    <span>{{data[indextr].inventoryGenericName}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].manufacturedQuantity">
                    <span>{{data[indextr].manufacturedQuantity}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].soldQuantity">
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
                    <vs-th>{{totalManufacturedGoods}}</vs-th>
                    <vs-th>{{totalSoldGoods}}</vs-th>
                    <vs-th>{{totalAvailableQuantity}}</vs-th>
                </vs-tr>
              </template>
            </vs-table>
          </div>

        </vx-card>
      </div>
    </div>

  <!-- <vx-card class="mt-2">
        <div class="vx-row w-full">
        <div class="vx-col sm:w-full md:w-full lg:w-1/4 mb-2">
          <span class="inputLabel">{{$t('from')}}</span>
          <flat-pickr
            class="w-full"
            v-model="fromDate"
            :format="format"
            name="fromDate"
          />
        </div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/4  mb-2">
          <span class="inputLabel">{{$t('to')}}</span>
          <flat-pickr
            class="w-full"
            v-model="toDate"
            :format="format"
            name="toDate"
          />
        </div>
        <div class="vx-col sm:w-full md:w-full lg:w-1/4  mb-2">
          <vs-button
            @click="getSoldGoods()"
            size="medium"
            color="success"
            icon-pack="feather"
            icon="icon-rotate-ccw"
            class="mt-4 mb-2 text-lg"
          >{{$t('Generate Report')}}
          </vs-button>
        </div>
        </div>
        <div class="vx-col w-full lg:w-1/4">
        <vx-card slot="no-body" class="greet-user product-card">
          <span>
          <feather-icon icon="ShoppingBagIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
          </span>
          <ul style="color: white">
            <li class="pl-0 ml-0">
                <p>Manufactured Goods: {{totalManufacturedGoods}}</p>
            </li>
            <li class="pl-0 ml-0">
                <p>Sold Goods: {{totalSoldGoods}}</p>
            </li>
            <li class="pl-0 ml-0">
                <p>Remaining Goods: {{totalAvailableQuantity}}</p>
            </li>
          </ul>
          </vx-card> -->
      </div>
    </vx-card> 
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
            customer: "",
            analyticsData: analyticsData,
            isImp: false,
            navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
            show: false,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            nextNum: 10,
            fromDate: "",
            toDate: "",
            inventoryId: "",
            totalSoldGoods: 0,
            totalManufacturedGoods: 0,
            totalAvailableQuantity: 0,
            'tableList': [
                'vs-th: Component',
                'vs-tr: Component',
                'vs-td: Component',
                'thread: Slot',
                'tbody: Slot',
                'header: Slot'
            ],
            inventories: [],
            
            inventoryItems: []
        }
        
        
    },

methods: {
getSoldGoods(){
    let fromDateD = new Date(this.fromDate);
    let fromDateStr = this.fromDate != '' ? fromDateD.getFullYear() + "-" + ((Number(fromDateD.getUTCMonth() + 1) < 10 ? '0' : '') + (Number(fromDateD.getUTCMonth()) + 1)) + "-" + (Number(fromDateD.getUTCDate()) < 10 ? '0' : '') + fromDateD.getUTCDate() : '';
    let toDateD = new Date(this.toDate);
    let toDateStr = this.toDate != '' ? toDateD.getFullYear() + "-" + ((Number(toDateD.getUTCMonth() + 1) < 10 ? '0' : '') + (Number(toDateD.getUTCMonth()) + 1)) + "-" + (Number(toDateD.getUTCDate()) < 10 ? '0' : '') + toDateD.getUTCDate() : '';
    this.$http.get(`/inventorytransaction/report`,
                  {
            params: {
              fromDate: fromDateStr,
              toDate: toDateStr,
              inventoryId: this.inventoryId,
              limit: 1000000,
              page: 1,
            },
         }).then(response => {
        this.inventories = response.data;
        this.setTotalQuantities();
    });
},

setTotalQuantities(){
      this.totalSoldGoods = 0;
      this.totalManufacturedGoods=0;
      this.totalAvailableQuantity=0;
      this.inventories.forEach(element => {
        this.totalSoldGoods+=element.soldQuantity;
        this.totalManufacturedGoods+=element.manufacturedQuantity;
        this.totalAvailableQuantity+=element.availableQuantity;
      });
  },

  getInvenrotries(){
    const thisins =this;
        this.$http
          .get("/inventory", {
            params: { page:1 , limit: 100000 }
          })
          .then(function(response) {
            thisins.inventoryItems= response.data;
          }).catch(error=>{
          });
    }
 },

created(){
  this.getSoldGoods();
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

.product-card{
  background: rgb(5, 192, 142);
  align-content: left;
  margin-left: 50px;
}
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
