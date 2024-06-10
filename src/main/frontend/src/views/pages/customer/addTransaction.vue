<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('addTransaction')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col w-1/5">
              <span class="ml-1">{{ $t("selectItem") }} </span>
              <v-select v-model="inventoryId" class="w-full" label="inventoryName" :options="inventoryItems"
                :reduce="(inventoryItem) => inventoryItem.inventoryId" name="inventoryName" v-validate="'required'"
                data-vv-validate-on="blur">
              </v-select>
            </div>
            <div class="vx-col sm:w-1/5 w-full mb-6">
              <vs-input class="w-full" :label="$t('quantity')" v-model="quantity" name="quantity"
                v-validate="'required'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first("quantity") }}</span>
            </div>
            <!-- <div class="vx-col sm:w-1/5 w-full mb-6">
              <vs-input class="w-full" :label="$t('reasonOfTransaction')" v-model="reasonOfTransaction"
                name="reasonOfTransaction" />
              <span class="text-danger">{{
              errors.first("reasonOfTransaction")
              }}</span>
            </div> -->
            <div class="vx-col w-1/5">
              <span class="ml-1">{{ $t("selectTransactionReason") }} </span>
              <v-select v-model="transactionReasonId" class="w-full" label="transactionReason"
                :options="transactionReasons" :reduce="(transactionReason) => transactionReason.transactionReasonId"
                name="transactionReason" v-validate="'required'" data-vv-validate-on="blur">
              </v-select>
            </div>

            <div class="vx-col w-1/5">
              <span class="ml-1">{{ $t("selectTransactionType") }} </span>
              <v-select v-model.trim="transactionType" class="w-full" :options="transactionTypes"
                name="transactionType">
              </v-select>
            </div>

            <div class="vx-col w-1/5">
              <span class="ml-1">{{ $t("pickSoldTransactionDate") }} </span>
              <flat-pickr :config="configdateTimePicker" v-model="transactionDate" v-validate="'required'"
                v-validate:transactionDate="'required'" name="transactionDate" class="w-full" size="medium" />
              <span v-show="errors.has('transactionDate')" class="text-danger">{{ errors.first("transactionDate")
              }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                <br />
                <vs-button @click="addTransaction" color="success" class="mr-3 mb-2">{{ $t("save") }}</vs-button>
              </div>
            </div>
          </div>
        </vx-card>
      </vx-card>
    </div>
  </div>
</template>

<script>
import router from "@/router.js";
import { Validator } from "vee-validate";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
const dict = {
  custom: {
    countryName: {
      required: "Please enter country type",
      alpha: "country type must be character",
    },
  },
};
Validator.localize("en", dict);
import VSelect from "vue-select";
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading,
    flatPickr,
  },
  data() {
    return {
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y-m-dTH:i",
      },
      transactionTypes: ["In", "Out"],
      registerButtonClicked: false,
      clicked: 0,
      error: false,
      isLoading: false,
      customerSoldInventoryDetailId: this.$route.params.id,
      inventoryId: "",
      quantity: "",
      sellPrice: "",
      inventoryItems: [],
      item: {},
      searchKey: "",
      transactions: "",
      filteredInventories: [],
      userId: localStorage.getItem("userId"),
      transactionType: "",
      transactionReasonId: "",
      transactionDate: new Date(),
      transactionReasons: [],
    };
  },
  methods: {
    getDateFormatted(date) {
      return new Date(date).toLocaleDateString(["en-US"], {
        timeZone: "Africa/Nairobi",
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    addTransaction() {
      this.$validator.validateAll().then((customer) => {
        if (customer) {
          this.$vs.loading({ color: this.customerSoldInventoryDetailId });
          this.$http
            .post("/customer-inventory-transaction", {
              inventoryId: this.inventoryId,
              quantity: this.quantity,
              transactionType: this.transactionType,
              transactionReasonId: this.transactionReasonId,
              transactionDate: this.transactionDate,
              customerId: this.userId,
            })
            .then((response) => {
              console.log(response.data);
              this.$vs.notify({
                title: this.$t("Add"),
                text: this.$t("Updated Successfully!"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
              });
              this.$vs.loading.close();
              //this.$router.push({ path: "/pages/country-type/"+this.countryId });
              this.$router.push({ path: "/pages/customer/view-transaction" });
            })
            .catch((error) => {
              this.$vs.loading.close();
            });
        }
      });
    },
    getAllInventoryTransactions() {
      this.$http
        .get(`/customer-inventory-transaction`, {
          params: { searchKey: this.searchKey },
        })
        .then((response) => {
          this.transactions = response.data;
          let result = Object.values(
            this.transactions.reduce(
              (
                c,
                { inventoryId, quantity, inventoryName, transactionType }
              ) => {
                const temp = { inventoryId, quantity: 0 };
                c[inventoryId] = c[inventoryId] || temp;
                c[inventoryId].inventoryName = inventoryName;
                transactionType == "Out"
                  ? (c[inventoryId].quantity -= quantity)
                  : (c[inventoryId].quantity += quantity);
                return c;
              },
              {}
            )
          );
          this.filteredInventories = result.filter((fi) => fi.quantity > 0);
          this.inventoryItems = this.filteredInventories;
        });
    },
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
          this.totalPage = response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
  },

  created() {
    this.getTransactionReasons();
    this.getAllInventoryTransactions();
    const thisIns = this;
    // this.$http
    //   .get(
    //     "/customer-sold-inventory-detail/" + this.customerSoldInventoryDetailId,
    //     {
    //       params: { page: this.currentPage, limit: this.limit },
    //     }
    //   )
    //   .then(function (response) {
    //     thisIns.item = response.data;
    //     this.responseGeted = true;
    //   })
    //   .catch((error) => {
    //     this.responseGeted = true;
    //   });
  },
  updated() { },
};
</script>
