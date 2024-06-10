<template>
  <vx-card :title="$t('All Products Items')">
    <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
      <div class="chat__profile-search flex p-4 mt-6">
        <div v-if="isAdmin" id="add"
          class="p-3 mb-4 mr-4 w-64 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
          @click="add">
          <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
          <span class="ml-2  text-base text-primary">{{ $t("addNewInventory") }}</span>
        </div>
        <div id="dropdown" class=" ml-8 lg:w-1/6">
          <vs-dropdown vs-custom-content vs-trigger-click>
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">
                <p>{{ limit }}</p>
              </span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item>
                <span @click="pageLimit(15)">15</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span @click="pageLimit(25)">25</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span @click="pageLimit(50)">50</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span @click="pageLimit(75)">75</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
        <div id="search" class="float-right">
          <vs-input @keyup="search(searcCompany)" icon="icon-search" icon-pack="feather"
            class="w-full mx-2 input-rounded-full no-icon-border" :placeholder="$t('Search')" v-model="searcCompany" />
        </div>
      </div>
      <loading :active.sync="isLoading" :can-cancel="true"></loading>
      <vs-table :max-items="currentPage" :data="inventory">
        <template slot="thead">
          <vs-th>#</vs-th>
          <vs-th class="p-4 w-48" sort-key="inventoryGenericName">{{ $t("genericName") }}</vs-th>
          <vs-th class="p-0" sort-key="inventoryType">{{ $t("Category") }}</vs-th>
          <vs-th class="p-0" sort-key="measuringUnit">{{ $t("Unit") }}</vs-th>
          <vs-th class="p-4 w-48" sort-key="availableQuantity">{{ $t("Available Qty") }}</vs-th>
          <vs-th class="p-0 w-32" sort-key="minimumStockQuantity">{{ $t("Min Qty") }}</vs-th>
          <vs-th v-if="isAdmin" class="p-0 w-16">{{ $t("Edit") }}</vs-th>
          <vs-th class="p-0 w-24">{{ $t("Detail") }}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :state="data[indextr].availableQuantity < data[indextr].minimumStockQuantity ? 'warning' : null"
            :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>{{ indextr + 1 }}</vs-td>
            <router-link v-bind:to="'/inventory/inventory-Item-Price-Details/' + tr.inventoryId">
              <vs-td class="p-4" :data="data[indextr].inventoryGenericName">{{ data[indextr].inventoryGenericName }}
                {{ data[indextr].dosageForm }} {{ data[indextr].strength }}</vs-td>
            </router-link>
            <vs-td class="p-0" :data="data[indextr].inventoryType">{{ data[indextr].inventoryType }}</vs-td>
            <vs-td class="p-4" :data="data[indextr].id">{{ data[indextr].measuringUnit }}</vs-td>
            <vs-td class="p-4" :data="data[indextr].availableQuantity">{{ data[indextr].availableQuantity }}</vs-td>
            <vs-td class="p-4" :data="data[indextr].minimumStockQuantity">{{ data[indextr].minimumStockQuantity }}
            </vs-td>
            <vs-td v-if="isAdmin" class="p-0 w-24" :data="data[indextr].id">
              <span id="edit-icon" @click="updateInventory(data[indextr].inventoryId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
            </vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <span id="detail-icon" @click="inventoryDetail(data[indextr].inventoryId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-chevrons-right" />
              </span>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-pagination v-if="inventory != ''" :total="total" v-model="currentPage" @change="pagination()"></vs-pagination>
    </vx-card>
  </vx-card>
</template>

<script>
import router from "@/router";
import "@/assets/scss/vuesax/extraComponents/agGridStyleOverride.scss";
import { error } from 'util';
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Loading
  },
  data() {
    return {
      selected: [],
      inventory: [],
      limit: 15,
      currentPage: 1,
      total: 0,
      searcCompany: "",
      isVisible: true,
      text: "",
      responseGeted: false,
      isLoading: false
    };
  },

  methods: {
    inventoryDetail: function (tr) {
      this.$router.push({ path: "/pages/inventory-detail/" + tr });
    },
    navigateToDetail(tr) {
      this.$router.push({ path: "/inventory/inventory-Item-Price-Details/" + tr.inventoryId });
    },
    search: function (searchKey) {
      this.$http.post('/inventory/search', {
        "searchKey": searchKey, customerType: (this.isCustomer ? "Customer" : "")
      },
        { params: { page: this.currentPage, limit: this.limit } }

      )
        .then(response => {
          this.inventory = response.data;
          this.total = thisIns.inventory[0].totalPages;
          thisIns.$store.dispatch('inventory/populateInventory', response.data);
        });
    },
    pageLimit: function (limit) {
      this.limit = limit;
      this.pagination();
    },
    pagination: function () {
      const thisIns = this;
      this.getInvenrotries();
    },
    updateInventory: function (id) {
      this.$router.push({ path: "/inventory/" + id });
    },
    add: function () {
      this.$router.push({ path: "/pages/add-inventory" });
    },

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
    }

  },
  computed: {
    getCurrentUser() {
      return { userType: localStorage.getItem('userType') };
    },
    isCustomer() {
      return this.getCurrentUser.userType == 'Customer';
    },
    isAdmin() {
      return this.getCurrentUser.userType == 'Admin';
    },
  },
  created() {
    this.getInvenrotries();
  }
};
</script>
<style lang="scss" scoped>
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

#search {
  margin-left: 450px;
  width: 350px;
}

#dropdown {
  width: 500px;
  margin-left: 200px;
}

#add {
  width: 195px;
  background: aliceblue;
  text-decoration-color: white;
}
</style>
