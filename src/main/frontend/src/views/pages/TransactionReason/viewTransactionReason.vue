<template>
  <vx-card :title="$t('allTransactionReasons')">
    <div id="knowledge-base-page">
      <div class="knowledge-base-jumbotron">
        <div class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base">
          <div class="vx-row">

            <div class="w-1/5 mt-6">
              <vs-button class="small text-base" icon-pack="feather" icon="icon-plus" type="gradient" color="success"
                @click.prevent="add">{{ $t('addTransactionReason') }}</vs-button>
            </div>
            <div class="w-1/6" id="dropdown">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div
                  class="p-4 mt-6 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="pl-4 pr-4">
                    <p>{{ (currentPage - 1) * perPage + 1 }}-{{ currentPage * perPage }} of {{ totalPage * perPage }}
                    </p>
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
                  <vs-dropdown-item>
                    <span @click="perPage = 15, getTransactionReasons()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage = 25, getTransactionReasons()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage = 50, getTransactionReasons()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage = 75, getTransactionReasons()">75</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="w-2/5" id="search">
              <vs-input @keyup="getTransactionReasons" icon="icon-search" icon-pack="feather"
                class="w-full mx-2 input-rounded-full no-icon-border mt-6" :placeholder="$t('Search')"
                v-model="searchKey" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <vx-card id="internal-card" title no-shadow card-border>
      <!-- KNOWLEDGE BASE CARDS  -->
      <vs-table class="stripe" hoverFlat :max-items="perPage" :data="transactionReasons">
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="transactionReason">{{ $t('transactionReason') }}</vs-th>
          <vs-th>{{ $t('edit') }}</vs-th>
          <vs-th>{{ $t('delete') }}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{ (indextr + 1) + (perPage * (currentPage - 1)) }}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].transactionReason">{{ data[indextr].transactionReason }}
            </vs-td>
            <vs-td class="p-0" :data="data[indextr].transactionReasonId">
              <span @click="update(data[indextr].transactionReasonId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
            </vs-td>
            <vs-td class="p-0" :data="data[indextr].transactionReasonId">
              <ul class="switch-container">
                <li>
                  <span @click="preventTableClickAction = true, openConfirm(data[indextr].transactionReasonId)">
                    <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                  </span>
                </li>
              </ul>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
    <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getTransactionReasons"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      transactionReasons: [],
      transactionReasonId: "",
      searchKey: "",
      perPage: 50,
      page: 1,
      currentPage: 1,
      totalPage: 0,
      preventTableClickAction: false
    };
  },
  methods: {
    getTransactionReasons() {
      this.$http
        .get(`/transaction-reason`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey
          }
        })
        .then(response => {
          this.transactionReasons = response.data;
          this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

    openConfirm(transactionReasonId) {

      this.transactionReasonId = transactionReasonId;
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
      this.$http
        .delete("/transaction-reason/" + this.transactionReasonId, {
        })
        .then(response => {
          this.$vs.notify({
            color: "success",
            title: "Status",
            text: "Country Deleted"
          });
          this.getTransactionReasons();

        });

    },

    add: function () {
      this.$router.push({ path: "/pages/add-transaction-reason" });
    },
    update: function (id) {
      this.$router.push({ path: "/pages/edit-transaction-reason/" + id });
    }
  },
  created() {
    this.getTransactionReasons()
  }
};
</script>

<style lang="scss" scoped>
#search {
  margin-left: 150px;
  width: 300px;
}

#dropdown {
  width: 500px;
  margin-left: 50px;
}

#add {
  width: 180px;
  background: aliceblue;
  text-decoration-color: white;
}
</style>
