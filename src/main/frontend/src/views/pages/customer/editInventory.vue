<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editCustomerSellInvetory')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col w-1/2">
              <span class="ml-1">{{ $t("selectItem") }} </span>
              <v-select v-model="item.inventoryId" class="w-full" label="inventoryName" :options="inventoryItems"
                :reduce="(inventoryItem) => inventoryItem.inventoryId" name="inventoryName">
              </v-select>
            </div>
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('quantity')" v-model="item.quantity" name="quantity"
                v-validate="'required'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first("quantity") }}</span>
            </div>
            <!-- <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input
                class="w-full"
                :label="$t('sellPrice')"
                v-model="item.sellPrice"
                name="sellPrice"
                v-validate="'required'"
                data-vv-validate-on="blur"
              />
              <span class="text-danger">{{ errors.first("sellPrice") }}</span>
            </div> -->
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                <br />
                <vs-button @click="editCustomerSoldInventoryDetail" color="success" class="mr-3 mb-2">{{ $t("update") }}
                </vs-button>
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
  },
  data() {
    return {
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
    };
  },
  methods: {
    editCustomerSoldInventoryDetail() {
      this.$validator.validateAll().then((customer) => {
        if (customer) {
          if (true /*this.checkcountryName == ""*/) {
            this.$vs.loading({ color: this.customerSoldInventoryDetailId });
            this.$http
              .put(
                "/customer-sold-inventory-detail/" +
                this.customerSoldInventoryDetailId,
                {
                  inventoryId: this.item.inventoryId,
                  quantity: this.item.quantity,
                  sellPrice: this.item.sellPrice,
                  customerId: this.userId,
                }
              )
              .then((response) => {
                this.$vs.notify({
                  title: this.$t("Add"),
                  text: this.$t("Updated Successfully!"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success",
                });
                this.$vs.loading.close();
                //this.$router.push({ path: "/pages/country-type/"+this.countryId });
                this.$router.push({
                  path: "/pages/customer/view-customer-inventory",
                });
              })
              .catch((error) => {
                this.$vs.loading.close();
              });
          }
        }
      });

      // }
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
  },

  created() {
    this.getAllInventoryTransactions();
    const thisIns = this;
    this.$http
      .get(
        "/customer-sold-inventory-detail/" + this.customerSoldInventoryDetailId,
        {
          params: { page: this.currentPage, limit: this.limit },
        }
      )
      .then(function (response) {
        thisIns.item = response.data;
        this.responseGeted = true;
      })
      .catch((error) => {
        this.responseGeted = true;
      });
  },
  updated() { },
};
</script>
