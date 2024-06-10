<template>
  <vx-card>
    <div class="mt-2">
      <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
          <vx-card id="internal-card" title no-shadow card-border>
            <div>
              <vs-table stripe class="w-full ml-auto" v-model="selected" :max-items="perPage" :data="orders">
                <template slot="header">
                  <div>
                    <vs-dropdown class="mb-1" vs-custom-content vs-trigger-click>
                      <div
                        class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">
                          <p>{{(currentPage-1)*perPage+1}}-{{currentPage*perPage}} of {{totalPage*perPage}}</p>
                        </span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                      </div>
                      <vs-dropdown-menu>
                        <vs-dropdown-item>
                          <span @click="setPageLimitPaid(10)">10</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item>
                          <span @click="setPageLimitPaid(20)">20</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item>
                          <span @click="setPageLimitPaid(30)">30</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item>
                          <span @click="setPageLimitPaid(40)">40</span>
                        </vs-dropdown-item>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </div>
                  <div id="search" class="float-right">
                    <vs-input @keypress.enter="getOrders()" icon="icon-search" icon-pack="feather"
                      class="w-full mx-2 input-rounded-full no-icon-border" v-model="orderNumber"
                      :placeholder="$t('searchHere')" />
                  </div>
                </template>
                <template slot="thead">
                  <vs-th>#</vs-th>

                  <vs-th sort-key="orderNumber">{{$t('orderNumber')}}</vs-th>
                  <vs-th sort-key="fullName">{{$t('User')}}</vs-th>
                  <vs-th sort-key="companyName">{{$t('Company')}}</vs-th>
                  <vs-th sort-key="totalPrice">{{$t('totalPrice')}}</vs-th>


                  <vs-th>{{$t('detail')}}</vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td class="py-0 text-left" :data="indextr">{{indextr+1}}</vs-td>
                    <vs-td class="py-0 text-left" :data="data[indextr].orderNumber">{{data[indextr].orderNumber}}
                    </vs-td>
                    <vs-td class="py-0" :data="data[indextr].fullName">{{data[indextr].fullName}}</vs-td>
                    <vs-td class="py-0" :data="data[indextr].companyName">{{data[indextr].companyName}}</vs-td>
                    <vs-td class="py-0" :data="data[indextr].deliveryTime" v-if="data[indextr].siteName!=null">
                      {{data[indextr].siteName}}</vs-td>
                   
                    <vs-td class="py-0" :data="data[indextr].totalPrice">
                      {{data[indextr].totalPrice.toLocaleString('en-US')}}</vs-td>
                    <vs-td class="py-0" :data="data[indextr].orderId">
                      <vs-avatar color="warning" size="small" icon-pack="feather" icon="icon-chevrons-right"
                        @click="navigateToDetail(data[indextr].orderId)" />
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
              <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getOrders()">
              </vs-pagination>
            </div>
          </vx-card>
    </div>
  </vx-card>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      filter: "",
      totalPage: "",
      orderNumber:"",
      perPage: "10",
      currentPage: "1",
      canceledOrders: [],
      paidOrders: [],
      postPaidOrders: [],
      orders: [],
      UnPaidOrders: [],
      searchPaid: "",
      searchUnPaid: "",
      searchPostPaid: "",
      searchCanceled: "",
      isLoading: false,
      fullPage: false
    };
  },
  methods: {
   
 

    getOrders() {
      this.isLoading = true;
      this.$http
        .get(`order`)
        .then(response => {
          this.orders = response.data;
          this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },


    setPageLimitPaid(page) {
      this.perPage = page;
      this.getPaidOrders();
    },

    setPageLimitUnPaid(page) {
      this.perPage = page;
      this.getUnPaidOrders();
    },


    setPageLimitPostPaid(page) {
      this.perPage = page;
      this.getPostPaidOrders();
    },
    setPageLimitCanceled(page) {
      this.perPage = page;
      this.getCanceledOrders();
    },
    navigateToDetail(id) {
      this.$router.push({ path: "/pages/order/" + id });
    },
    navigateToSelectedDetail(tr) {
      this.$router.push({ path: "/pages/order/" + tr.orderId });
    },
  

  
  },
  created() {
    this.getOrders();
  },
  components: {
    Loading
  }
};
</script>

<style>
</style>