<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics

========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row" v-if=" orders.length">


      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <vs-card>
          <div style="color: #1749FA;" class="vx-row mt-2 ml-10">
            Total Category Products
          </div>

          <div class="vx-row ml-16 mt-2">
            {{ orders[0].totalCategorys }}
          </div>

          <div style="color: #1749FA;" class="vx-row mt-2 ml-10">
            Total Products
          </div>

          <div class="vx-row ml-16 mt-2">
            {{ orders[0].totalProducts }}
          </div>
  </vs-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/5 mb-base">
        <vs-card>
          <div style="color: #1749FA;" class="vx-row mt-2 ml-4">
            Total Suppliers
          </div>

          <div class="vx-row ml-10 mt-2">
            {{ orders[0].totalSuppliers }}
          </div>

          <div style="color: #1749FA;" class="vx-row mt-2 ml-4">
            Total Departments
          </div>

          <div class="vx-row ml-10 mt-2">
            {{ orders[0].totalDepartments }}
          </div>
  </vs-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/5 mb-base">
        <vs-card>
          <div style="color: #1749FA;" class="vx-row mt-2 ml-4">
            Total Employees
        </div>

          <div class="vx-row ml-10 mt-2">
      {{ orders[0].totalEmpployees }}
          </div>
  </vs-card>
      </div>
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mb-base">
        <vs-card>
          <div style="color: #1749FA;" class="vx-row mt-2" v-for="item in orders[0].inventoryDetailRequestModels" :key="item.inventoryId">
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-2/2 xl:w-2/3 mb-base">
              {{ item.inventoryGenericName }}
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/5 mb-base">
              {{ item.availableQuantity }}
            </div>

        </div>
  </vs-card>
      </div>
    </div>



    <!-- <div>
  <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
</div> -->


      <div id="chart">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>

      <div id="chart">
        <apexchart type="area" height="350" :options="chartOptions2" :series="series2"></apexchart>
      </div>
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="List of Products">
          <div slot="no-body" class="mt-4">
            <vs-table :max-items="currentPage" :data="inventory">
        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th  sort-key="inventoryGenericName">{{ $t("genericName") }}</vs-th>
          <vs-th  sort-key="inventoryType">{{ $t("Category") }}</vs-th>
          <vs-th  sort-key="availableQuantity">{{ $t("Available Qty") }}</vs-th>
          <vs-th sort-key="minimumStockQuantity">{{ $t("Min Qty") }}</vs-th>
          <vs-th v-if="isAdmin" class="p-0 w-16">{{ $t("Edit") }}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :state="data[indextr].availableQuantity < data[indextr].minimumStockQuantity ? 'warning' : null"
            :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>{{ indextr + 1 }}</vs-td>
            <router-link v-bind:to="'/inventory/inventory-Item-Price-Details/' + tr.inventoryId">
              <vs-td :data="data[indextr].inventoryGenericName">{{ data[indextr].inventoryGenericName }}
                {{ data[indextr].dosageForm }} {{ data[indextr].strength }}</vs-td>
            </router-link>
            <vs-td class="ml-10" :data="data[indextr].inventoryType">{{ data[indextr].inventoryType }}</vs-td>
            <vs-td class="ml-10" :data="data[indextr].availableQuantity">{{ data[indextr].availableQuantity }}</vs-td>
            <vs-td style="margin-left: 30;" :data="data[indextr].minimumStockQuantity">{{ data[indextr].minimumStockQuantity }}
            </vs-td>

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
import analyticsData from './ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'

export default {
    data() {
        return {



          series2: [{
            name: 'Order',
            data: [31, 40, 28, 90, 42, 80, 10]
          }],
          chartOptions2: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'line',
              categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
              "Saturday", "Sunday"]
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },



          series: [{
            name: 'Sell',
            type: 'column',
            data: [0, 10, 5, 10, 0, 0, 0, 0,0,0,0,0]
          }, {
            name: 'Cost',
            type: 'column',
            data: [0, 15, 10, 20, 0, 0, 0, 0,0,0,0,0]
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              stacked: false
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: [1, 1, 4]
            },
            title: {
              text: 'Order Analysis (January - December)',
              align: 'left',
              offsetX: 110
            },
            xaxis: {
              categories: ["January", "February", "March", "April", "May", "June", "July", "Augest","September","October","November","December"],
            },
            yaxis: [
              {
                min: 0,
                seriesName: 'Income',
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#008FFB'
                },
                labels: {
                  style: {
                    colors: '#008FFB',
                  }
                },
                title: {
                  text: "Sell",
                  style: {
                    color: '#008FFB',
                  }
                },
                tooltip: {
                  enabled: true
                }
              },
              {
                min: 0,
                seriesName: 'Cashflow',
                opposite: true,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#00E396'
                },
                labels: {
                  style: {
                    colors: '#00E396',
                  }
                },
                title: {
                  text: "Cost",
                  style: {
                    color: '#00E396',
                  }
                },
              },

            ],
            tooltip: {
              fixed: {
                enabled: true,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60
              },
            },
            legend: {
              horizontalAlign: 'left',
              offsetX: 40
            }
          },
            orders:[],
            inventoryItems:[],
            inventory: [],
            analyticsData: analyticsData,
            isImp: false,
            navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
            show: false,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            nextNum: 10,
            'tableList': [
                'vs-th: Component',
                'vs-tr: Component',
                'vs-td: Component',
                'thread: Slot',
                'tbody: Slot',
                'header: Slot'
            ],
            inventories: [
              {
                    "inventoryName": "Liquid Paraffi",
                    "purchasedQuantity": "1000",
                    "soldQuantity": "200",
                    "remainQuantity": "800",
                    "orderNo": 1
                },
                {
                    "inventoryName": "Glycerin",
                    "purchasedQuantity": "1000",
                    "soldQuantity": "200",
                    "remainQuantity": "800",
                    "orderNo": 2
                },
                {
                    "inventoryName": "Chlorhexidine 4%",
                    "purchasedQuantity": "1000",
                    "soldQuantity": "200",
                    "remainQuantity": "800",
                    "orderNo": 3
                },
                {
                    "inventoryName": "Chlorhexidine 3%",
                    "purchasedQuantity": "1000",
                    "soldQuantity": "200",
                    "remainQuantity": "800",
                    "orderNo": 4
                }

            ]
        }
    },
    methods: {
      getInvenrotries() {
      const thisIns = this;
      this.isLoading = true
      this.$http
        .get("/inventory", {
          params: { customerType: (this.isCustomer ? "Customer" : ""), page: this.currentPage, limit: this.limit }
        })
        .then(function (response) {
          thisIns.isLoading = false
          thisIns.inventory = response.data;
          thisIns.total = thisIns.inventory[0].totalPages;
          thisIns.$store.dispatch('inventory/populateInventory', response.data);
          this.responseGeted = true;
        }).catch(error => {
          this.responseGeted = true;
          thisIns.isLoading = false
        });
    },
      fetchOrders(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/order")
        .then(function(response) {

          thisIns.isLoading=false
          thisIns.orders = response.data;
          thisIns.total = 1;
        }).catch(error => {
            thisIns.isLoading=false
        });
    },
    searchRoles() {
      this.isLoading = true;
      this.$http
        .get("/roles?searchKey="+this.searchKey/*, {
          searchKey: this.searchKey
        }*/)
        .then(response => {
          this.roles = response.data;

          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

    openConfirm(roleId) {
      this.roleId = roleId;
      this.$vs.dialog({
        type: "confirm",
        color: "warning",
        title: `Confirm`,
        text: this.$t("deleteConfirmation"),
        accept: this.acceptAlert,
        acceptText: this.$t("Yes"),
        cancelText: this.$t("No")
      });
    },
    acceptAlert() {
      const thisIns = this;
      this.$http
        .delete("/roles/"+this.roleId)
        .then(function(response) {
          thisIns.$vs.notify({
            color: "success",
            title: "Status",
            text: "Role Deleted!"
          });
          thisIns.fetchRoles();
        }).catch(error => {
        });

    },

    add: function() {
      this.$router.push({ name: "addRole" });
    },
    updateRole: function(id) {
      this.$router.push({ path: "/pages/edit-role/" + id });
    },
    assignPermission:function(id) {
      this.$router.push({ path: "/pages/permission/" + id });
    },
    assignPermissions: function(id){
      this.$router.push({ path: "/pages/permissions/" + id });
    },
    assignCategory: function(id){
      this.$router.push({ path: "/pages/view-privilege-categories/" , query: { foo: id}});
    },


    getReport(){
      const thisIns = this;
      this.isLoading=true
      this.$http
        .get("/inventorytransaction/reporting")
        .then(function(response) {
          thisIns.series[1].data=response.data.valuesYearlyCost;
          thisIns.series[0].data=response.data.valuesYearlySell;
          thisIns.series2[0].data = response.data.valuesOfWeeklySell;

          thisIns.isLoading=false
          thisIns.orders = response.data;
          thisIns.total = 1;
        }).catch(error => {
            thisIns.isLoading=false
        });
    },
  },
 created() {
  this.getReport();
    this.fetchOrders();
    this.getInvenrotries();


  },
    components: {
        VueApexCharts,
        StatisticsCardLine,
        ChangeTimeDurationDropdown
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
