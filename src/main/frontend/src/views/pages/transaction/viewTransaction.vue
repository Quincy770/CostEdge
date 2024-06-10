<template>
  <vx-card :title="$t('inventoryTransation')" class="pb-1">
    <!-- <h3>Inventory Transaction</h3> -->
    <vx-card id="internal-card" title no-shadow card-border>
      <div class="chat__profile-search flex pb-2">
        <!-- <div id="add"
        class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
        @click="add"
      >
        <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
        <span class="ml-2 text-base text-primary">Add New</span>
        </div>-->
        <div>
          <vs-dropdown vs-custom-content vs-trigger-click>
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">
                <p>{{(currentPage-1)*perPage+1}}-{{currentPage*perPage}} of {{totalPage*perPage}}</p>
              </span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item>
                <span @click="pageLimit(10)">10</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span @click="pageLimit(20)">20</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span @click="pageLimit(30)">30</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span @click="pageLimit(40)">40</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- <vs-select
        class="m-1 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg md:flex lg:w-1/5 xl:w-1/5 sm:w-1/5"
        v-model="selectedInventory"
        placeholder="Filter Option"
        @select="filterInventoryTransaction"
      >
        <vs-select
          v-for="inventory in inventorys"
          :key="inventory.inventoryId"
          :value="inventory.inventoryId"
          :text="inventory.inventoryGenericName"
        />
        </vs-select>-->

        <vs-select autocomplete @input="filterInventoryTransaction"
          class="m-1 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg lg:w-1/5 xl:w-1/5 sm:w-1/5"
          :placeholder="$t('filterOption')" v-model="selectedInventory">
          <vs-select-item v-for="inventory in inventorys" :key="inventory.inventoryId" :value="inventory.inventoryId"
            :text="inventory.inventoryGenericName" />
        </vs-select>
        <vs-avatar color="warning" size="small" class="my-auto" icon-pack="feather" icon="icon-x"
          @click="getInventoryTransaction(), selectedInventory=''" />
        <!-- <vs-dropdown>

    <a class="flex items-center" href="#"  :v-bind="selectedInventory">
      {{selectedInventory}}
      <i class="material-icons"> expand_more </i>
    </a>

    <vs-dropdown-menu>

      <vs-dropdown-item  v-for="inventory in inventorys"
          :key="inventory.inventoryId"
          :value="inventory.inventoryId"
          :text="inventory.inventoryGenericName"
          >
       {{inventory.inventoryGenericName}}
      </vs-dropdown-item>

    </vs-dropdown-menu>
        </vs-dropdown>-->
        <!-- 
    <div>
  <b-dropdown id="dropdown-1"  v-model="selectedInventory" :text="selectedInventory" @change="filterInventoryTransaction" class="m-md-2">
    <b-dropdown-item v-for="inventory in inventorys"
          :key="inventory.inventoryId"
          :value="inventory.inventoryId"
          :text="inventory.inventoryGenericName"
          @select="filterInventoryTransaction"
          > {{inventory.inventoryGenericName}}</b-dropdown-item>
  </b-dropdown>
        </div>-->
        <!-- <div id="search" class="float-right">
        <vs-input
          @change="search"
          icon="icon-search"
          icon-pack="feather"
          class="w-full mx-2 input-rounded-full no-icon-border ml-auto"
          placeholder="Search"
          v-model="search"
        />
        </div>-->
        <!-- <b-form-select v-model="selectedInventory">
         <option :value="inventory.inventoryId" v-for="inventory in inventorys"
          :key="inventory.inventoryId"  :text="inventory.inventoryGenericName"
          @input="filterInventoryTransaction"> {{inventory.inventoryGenericName}}</option>
        </b-form-select>-->
        <!-- <div>  -->
        <!-- <b-form-select v-model="selectedInventory" class="mb-3" >
        <option :value="null">Please select an option</option>-->
        <!-- </b-form-select> -->

        <!-- <div class="mt-2">Selected: <strong>{{ selectedInventory }}</strong></div> -->
      </div>
      <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>

      <vs-table stripe class="w-full ml-auto" v-model="selected" :max-items="perPage" :data="inventoryTransation">
        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th sort-key="inventoryGenericName">{{ $t("genericName") }}</vs-th>
          <!-- <vs-th sort-key="transactionType">Transaction Type</vs-th> -->
          <!-- <vs-avatar color="grey" icon-pack="feather" icon="icon-calendar" /> -->
          <vs-th sort-key="transactionType">
            <feather-icon class="inline-flex cursor-pointer mr-4" icon="ShuffleIcon" />
          </vs-th>
          <vs-th sort-key="inventoryType">{{$t("Category")}}</vs-th>
          <vs-th sort-key="quantity">{{$t("Quantity")}}</vs-th>
          <vs-th sort-key="Cost">{{$t("Cost")}}</vs-th>
          <vs-th sort-key="soldPrice">{{$t("soldPrice")}}</vs-th>
          <vs-th sort-key="discountAmount">{{$t("Discount")}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <!-- <router-link v-bind:to="'/transaction/' + tr.inventoryTransactionDetailId"> -->
            <vs-td class="py-0 text-left" :data="indextr">{{indextr+1}}</vs-td>
            <vs-td class="py-0 text-left" :data="data[indextr].inventoryGenericName">{{
              data[indextr].inventoryGenericName }} {{data[indextr].dosageForm != null ? data[indextr].dosageForm : ""}}
              {{+data[indextr].strength != null ? data[indextr].strength : "" }}</vs-td>
            <!-- </router-link> -->

            <vs-td class="py-0" :data="data[indextr].transactionType">{{data[indextr].transactionType}}</vs-td>

            <vs-td class="py-0" :data="data[indextr].inventoryType">{{data[indextr].inventoryType}}</vs-td>
            <vs-td class="py-0" :data="data[indextr].quantity">{{data[indextr].quantity}}</vs-td>
            <vs-td class="py-0" :data="data[indextr].costOfInventory">
              {{data[indextr].costOfInventory.toLocaleString('en-US')}} USD</vs-td>
            <vs-td class="py-0" :data="data[indextr].soldPrice">{{data[indextr].soldPrice.toLocaleString('en-US')}}USD
            </vs-td>
            <vs-td class="py-0" :data="data[indextr].discountAmount">
              {{data[indextr].discountAmount.toLocaleString('en-US')}} USD</vs-td>

          </vs-tr>
        </template>
      </vs-table>
      <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" :max="6" @change="getInventoryTransaction()">
      </vs-pagination>
    </vx-card>
  </vx-card>
</template>

<script>
import router from "@/router";
import "@/assets/scss/vuesax/extraComponents/agGridStyleOverride.scss";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  data() {
    return {
      selected: [],
      inventorys: [],
      selectedInventory: "",
      inventoryTransation: [],
      limit: 5,
      page: 1,
      currentPage: 1,
      perPage: "10",
      totalPage: 3,
      total: 0,
      search: "",
      isLoading: false,
      fullPage: false,
      userType: localStorage.getItem('userType')
    };
  },
  components: {
    Loading
  },

  methods: {
    pageLimit: function(limit) {
      this.perPage = limit;
      this.getInventoryTransaction();
      // this.limit = limit;
      // if (45 % this.limit != 0) this.total = Math.ceil(50 / this.limit);
      // else this.total = 45 / this.limit;
    },
    navigateToDetail(tr) {
      this.$router.push({
        path: "/transaction/" + tr.inventoryTransactionDetailId
      });
    },
    pagination: function(page) {
      this.page = page;
      this.$http
        .get("/inventory", {
          params: { page: this.page, limit: this.limit }
        })
        .then(function(response) {
          this.inventory = response.data;
        });
    },
    updateInventory: function(id) {
      this.$router.push({ path: "/transaction/" + id });

      // eventBus.$emit(
      //   "updateTransaction",
      //   this.inventoryTransation.find(
      //     this.inventoryTransation.inventoryTransactionDetailId == id
      //   )
      // );
    },
    add: function() {
      this.$router.push({ path: "/pages/add-inventory" });
    },

    deletecustomer: function(id) {
      this.$http.delete("employee/" + id).then(function(data) {
        window.location.reload();
      });
    },
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
    },
    getInventoryTransaction() {
      this.isLoading = true;
      this.$http
        .get("/inventorytransaction", {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.inventoryTransation = response.data;
          this.totalPage =
            response.data.length != 0 ? response.data[0].totalPages : 0;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },
    getInventory() {
      this.$http.get("/inventory").then(response => {
        this.inventorys = response.data;
      });
    },
    filterInventoryTransaction() {
      this.currentPage = 1;
      this.perPage = 10;
      this.isLoading = true;
      this.$http
        .get(`/inventorytransaction/search/${this.selectedInventory}`, {
          params: { page: this.currentPage, limit: this.perPage }
        })
        .then(response => {
          this.inventoryTransation = response.data;
          this.totalPage =
            response.data.length != 0 ? response.data[0].totalPages : 0;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    }
  },
  created() {
    const thisIns = this;
    thisIns.getInventory();
    thisIns.isLoading = true;
    thisIns.getInventoryTransaction();
    // this.$http
    //   .get("/inventorytransaction", {
    //     params: { page: this.currentPage, limit: this.perPage }
    //   })
    //   .then(function(response) {
    //     thisIns.totalPage =
    //       response.data.length != 0 ? response.data[0].totalPages : 0;
    //     thisIns.totalPage = response.data[0].totalPages;
    //     thisIns.inventoryTransation = response.data;
    //     this.isLoading = false;
    //   })
    //   .catch(_ => {
    //     this.isLoading = false;
    //   });
  }
};
</script>

<style  scoped>
#search {
  margin-left: 500px;
  width: 300px;
}
#dropdown {
  width: 500px;
}
#add {
  width: 200px;
  background: aliceblue;
  text-decoration-color: white;
}
</style>
