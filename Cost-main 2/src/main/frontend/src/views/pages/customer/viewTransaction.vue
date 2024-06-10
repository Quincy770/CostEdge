<template>
  <vx-card :title="$t('allCustomerTransactions')">
    <div id="knowledge-base-page">
      <!-- JUMBOTRON -->
      <div class="knowledge-base-jumbotron" style="margin-top: -30px">
        <div class="knowledge-base-jumbotron-content lg:p-1 md:p-1 sm:p-1 py-1 rounded-lg mb-base">
          <div class="vx-row">
            <div class="w-2/5">
              <vs-input :placeholder="$t('searchCustomerTransactionHint')" v-model="searchKey" icon-pack="feather"
                icon="icon-search" size="large" class="w-full no-icon-border mt-6 ml-3" @keyup="getTransactions()" />
            </div>
            <div class="w-1/6" id="dropdown">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div
                  class="p-4 mt-6 ml-6 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="pl-4 pr-4">
                    <p>
                      {{ (currentPage - 1) * perPage + 1 }}-{{
                          currentPage * perPage
                      }}
                      of {{ totalPage * perPage }}
                    </p>
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
                  <vs-dropdown-item>
                    <span @click="(perPage = 15), getTransactions()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="(perPage = 25), getTransactions()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="(perPage = 50), getTransactions()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="(perPage = 75), getTransactions()">75</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="w-1/5 mt-8">
              <vs-button v-if="isGranted('addTransaction') && !isCustomerSeller" class="small text-base"
                icon-pack="feather" icon="icon-plus" type="gradient" color="success" @click.prevent="add">{{
                    $t("addTransaction")
                }}</vs-button>
            </div>

            <div class="w-1/6 ml-12 mt-6"></div>
          </div>
        </div>
      </div>
    </div>
    <div id="internal-card" title style="margin-top: -20px">
      <vs-table class="stripe" hoverFlat @selected="goToDetail" :max-items="perPage" :data="transactions">
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="inventoryName">{{ $t("inventoryName") }}</vs-th>
          <vs-th sort-key="transactionType">{{ $t("transactionType") }}</vs-th>
          <vs-th sort-key="transactionDate">{{ $t("transactionDate") }}</vs-th>
          <vs-th sort-key="transactionBy">{{ $t("transactionBy") }}</vs-th>
          <vs-th sort-key="transactionReason">{{
              $t("transactionReason")
          }}</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{
                indextr + 1 + perPage * (currentPage - 1)
            }}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].inventoryName">{{
                data[indextr].inventoryName
            }}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].transactionType">{{
                data[indextr].transactionType
            }}</vs-td>

            <vs-td class="pr-4 w-1/4" :data="data[indextr].transactionDate">{{
                data[indextr].transactionDate | date2()
            }}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].customer">{{
                data[indextr].customer
            }}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].transactionReason">{{ data[indextr].transactionReason }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getTransactions"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dot: "",
      transactions: [],
      limit: 15,
      total: 0,
      colorAlert: "primary",
      titleAlert: "Alert",
      activeConfirm: false,
      valueInput: "",
      accepted: false,
      companyId: "",
      customerInventoryTransactionId: "",
      userType: localStorage.getItem("userId"),
      increament: 0,
      decreament: 0,
      inventoryName: "",
      searchKey: "",
      kb: [],
      perPage: 50,
      currentPage: 1,
      totalPage: 0,
      preventTableClickAction: false,
    };
  },
  computed: {
    getCurrentUser() {
      return { userType: localStorage.getItem('userType') };
    },
    isCustomerAdmin() {
      return this.getCurrentUser.userType == 'CustomerAdmin';
    },
    isCustomerSeller() {
      return this.getCurrentUser.userType == 'CustomerSeller';
    },
  },
  methods: {
    getTransactions() {
      this.$http
        .get(`/customer-inventory-transaction`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey,
            companyId: this.companyId,
            userType: localStorage.getItem("userType"),
          },
        })
        .then((response) => {
          this.transactions = response.data;
          this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },

    openConfirm(customerInventoryTransactionId) {
      this.customerInventoryTransactionId = customerInventoryTransactionId;
      this.$vs.dialog({
        type: "confirm",
        color: "warning",
        title: `Confirm`,
        text: this.$t("deleteConfirmation"),
        accept: this.acceptAlert,
        acceptText: this.$t("Yes"),
        cancelText: this.$t("No"),
      });
    },
    acceptAlert() {
      this.$http
        .delete(
          "/customer-inventory-transaction/" +
          this.customerInventoryTransactionId,
          {}
        )
        .then((response) => {
          this.$vs.notify({
            color: "success",
            title: "Status",
            text: "customer transaction Deleted",
          });
          this.getCountries();
        });
    },

    add: function () {
      this.$router.push({ path: "/pages/customer/add-transaction" });
    },
    updateCustomerInventoryTransaction: function (id) {
      this.$router.push({ path: "/pages/customer/edit-transaction/" + id });
    },
  },
  created() {
    this.getTransactions();
  },
};
</script>
