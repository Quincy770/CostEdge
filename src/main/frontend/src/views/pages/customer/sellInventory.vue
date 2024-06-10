<template>
  <!-- <div id="main-div" class="vx-row">
    <div id="div" class="w-full mb-base"> -->
  <vx-card id="external-card" title="" no-shadow card-border class="">
    <h3>{{ $t("sellInventoryItems") }}</h3>
    <vx-card id="internal-card" class="mt-10 mb-0" title>
      <loading :active.sync="isLoading" :can-cancel="true"></loading>
      <vs-alert v-if="validationError != ''" color="danger" icon-pack="feather" icon="icon-info">
        <span>{{ validationError }}</span>
      </vs-alert>
      <div class="vx-row">
        <div class="vx-col w-1/2">
          <span class="ml-1">{{ $t("selectItem") }} </span>

          <v-select v-model="inventoryId" class="w-full" label="inventoryGenericName"
            @input="generateRowInput(inventoryId)" :options="inventoryItems"
            :reduce="(inventoryItem) => inventoryItem.inventoryId" name="inventoryGenericName">
          </v-select>
        </div>
        <div class="vx-col w-1/3">
          <span class="ml-1">{{ $t("pickSoldDate") }} </span>
          <flat-pickr :config="configdateTimePicker" v-model="soldDate" v-validate="'required'"
            v-validate:soldDate="'required'" name="soldDate" class="w-full" size="medium" />
          <span v-show="errors.has('soldDate')" class="text-danger">{{
              errors.first("soldDate")
          }}</span>
        </div>
      </div>

      <div class="mt-4" v-if="inc != -1">
        <vs-table :data="tabledata" id="table">
          <vs-th>{{ $t("genericName") }}</vs-th>
          <vs-th>{{ $t("Quantity") }}
            <p class="ml-1" id="required">*</p>
          </vs-th>
          <vs-th>{{ $t("sellPrice") }}
            <p class="ml-1" id="required">*</p>
          </vs-th>
          <vs-tr class="w-1/2" v-for="(option, index) in clickedInventoryId" :key="index">

            <vs-td class="w-1/5 mb-3" v-if="sellPrice[index] > 0">
              <p>{{ clikedInventoryName[index] }}</p>
            </vs-td>

            <vs-td class="w-1/4 mb-3" v-if="sellPrice[index] > 0">
              <vs-input v-model="quantity[index]" data-vv-validate-on="blur"
                @input="checkQuantity(quantity[index], option, index)" :name="clikedInventoryName[index] + ' quantity'"
                v-validate="'required|decimal:10'" :class="[
                  {
                    error_input: errors.has(
                      clikedInventoryName[index] + ' quantity'
                    ),
                  },
                ]" @change="resetValidationError" />
              <span class=" p-0 text-danger" v-if="checkQuantityError">
                {{ checkQuantityError[index] }}
                <!-- <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" /> -->
              </span>
            </vs-td>
            <!-- <div class="vx-row" v-if="checkQuantityError">
                  <span class="text-danger" style="margin-left: 30px">{{ checkQuantityError }}</span>
                </div> -->
            <vs-td class="w-1/4 mb-3 ml-6" v-if="sellPrice[index] > 0">
              <p>{{ sellPrice[index] }}USD </p>
            </vs-td>

            <vs-td v-if="sellPrice[index] > 0">
              <span class=" p-0" id="edit-icon" @click="removeRow(index)">
                <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
              </span>
            </vs-td>
            <td class="w-1/3" v-else>
              <span class="text-danger">Ask the Administrator to set the price first!</span>
            </td>
          </vs-tr>
        </vs-table>

        <!-- sell detail -->
        <div class="vx-row">
          <div class="w-1/2"></div>
          <div class="w-1/2">
            <vs-table :data="tabledata" id="table" v-if="totalPrice() > 0">
              <th>{{ $t('TOTAL') }}</th>
              <vs-th>{{ $t('TAX') }}(5%)</vs-th>
              <th>{{ $t('grandTotal') }}</th>
              <vs-tr>
                <vs-td>{{ (totalPrice()).toLocaleString('en-US') }} USD</vs-td>
                <vs-td>{{ ((totalPrice()) * 0.05).toLocaleString('en-US') }} USD</vs-td>

                <vs-td class="font-bold text-black">{{ ((totalPrice()) +
                    ((totalPrice()) * 0.05)).toLocaleString('en-US')
                }} USD</vs-td>

              </vs-tr>

              <!-- sell detail -->

            </vs-table>
            <vs-button color="success" class="mt-10 mb-0" size="medium" style="float:right; margin-right: 50px;"
              @click="addInventoryItemList">{{
                  $t("sell")
              }}
            </vs-button>
          </div>


        </div>


      </div>
    </vx-card>
  </vx-card>
  <!-- </div> -->
  <!-- {{ inventoryItems }}
    checkQuantityError:{{ checkQuantityError }} -->
  <!-- </div> -->
</template>
<script>
import { Validator } from "vee-validate";
import VSelect from "vue-select";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
let k = 0;
const dict = {
  custom: {
    quantity: {
      required: "please enter quantity",
      integer: "Quantity must be integer",
    },
    sellPrice: {
      required: "Please Enter Sell Price",
      integer: "Sell price must be integer",
    },
  },
};
// }
Validator.localize("en", dict);
export default {
  components: {
    "v-select": VSelect,
    Loading,
    flatPickr,
  },
  data() {
    return {
      inc: -1,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y-m-dTH:i",
      },
      userId: localStorage.getItem("userId"),
      inventoryItems: [],
      clickedInventoryId: [],
      clikedInventoryName: [],
      transactionType: [],
      quantity: [],
      sellPrice: [],
      soldDate: new Date(),
      inventoryNames: [],
      tabledata: "sdfdsf",
      validationError: "",
      isLoading: false,
      transactions: [],
      checkQuantityError: [],
      filteredInventories: [
        { "inventoryId": "", "inventoryName": "", "sellQuantity": "", "sellPrice": "" }
      ],
      inventories: [],
      sellInventory: [
        {
          inventoryId: "",
        },
      ],
    };
  },
  computed: {
    getCurrentUser() {
      return { userType: localStorage.getItem('userType') };
    },
    isCustomer() {
      return this.getCurrentUser.userType == 'Customer';
    },
    isCustomerAdmin() {
      return this.getCurrentUser.userType == 'CustomerAdmin';
    },
    isCustomerSeller() {
      return this.getCurrentUser.userType == 'CustomerSeller';
    },
    isAdmin() {
      return this.getCurrentUser.userType == 'Admin';
    },
    customError(model) {
      if (model == "") {
        return "the field is required";
      } else {
        return "Please enter number";
      }
    },
  },
  created() {
    this.getInvenrotries();
    // this.getAllInventoryTransactions();
  },
  mounted() { },
  methods: {
    checkQuantity(quantity, inventoryId, index) {
      // alert(JSON.stringify(Number(quantity) > this.inventoryItems.filter(ii => ii.inventoryId == inventoryId)[0].availableQuantity))
      // let index = 0; index < this.clickedInventoryId.length; index++)
      if (Number(quantity) > this.inventoryItems.filter(ii => ii.inventoryId == inventoryId)[0].availableQuantity) {
        this.checkQuantityError[index] = "Quantity must be Less than or Equal to " + this.inventoryItems.filter(ii => ii.inventoryId == inventoryId)[0].availableQuantity;
      }
      else {
        this.checkQuantityError[index] = "";
      }

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
          thisIns.inventoryItems = response.data;
          thisIns.total = thisIns.inventoryItems[0].totalPages;
          for (let k = 0; k < response.data.length; k++) {
            thisIns.inventoryItems[k].inventoryGenericName = response.data[k].inventoryGenericName + " " + response.data[k].inventoryBrandName + " " +
              response.data[k].strength;
          }
          thisIns.$store.dispatch('inventory/populateInventory', response.data);
          this.responseGeted = true;
        }).catch(error => {
          this.responseGeted = true;
          thisIns.isLoading = false
        });
    },
    removeRow: function (index) {
      this.inc--;
      this.clickedInventoryId.splice(index, 1);
      this.clikedInventoryName.splice(index, 1);
      this.quantity.splice(index, 1);
      this.sellPrice.splice(index, 1);
    },
    generateRowInput: function (inventoryId, inventoryName, inventoryItem) {
      if (this.inventoryItems.filter(ii => ii.inventoryId == inventoryId)[0].currentPrice == 0)
        return;
      if (inventoryId != null) {
        let checker = 0;
        for (let k = 0; k < this.inc + 1; k++) {
          if (inventoryId == this.clickedInventoryId[k]) checker = 1;
        }
        if (checker == 0) {
          this.inc++;
          this.clickedInventoryId[this.inc] = inventoryId;
          this.sellPrice[this.inc] = this.inventoryItems.filter(ii => ii.inventoryId == inventoryId)[0].currentPrice;

          for (let i = 0; this.inventoryItems.length; i++) {
            if (inventoryId == this.inventoryItems[i].inventoryId) {
              this.clikedInventoryName[this.inc] =
                this.inventoryItems[i].inventoryGenericName + " " + this.inventoryItems[i].inventoryBrandName;
            }
          }

          this.transactionType[this.inc] = "";
          this.quantity[this.inc] = "";

        } else this.inc--;
      }
    },
    totalPrice() {
      var totalPrice = 0;
      for (let index = 0; index < this.clickedInventoryId.length; index++) {
        totalPrice = totalPrice + (Number(this.quantity[index]) ? Number(this.quantity[index]) : 0) * Number(this.sellPrice[index]);
      }
      return totalPrice;
    },
    addInventoryItemList() {
      var checkIfError = true;
      for (let i = 0; i < this.checkQuantityError.length; i++) {
        if (this.checkQuantityError[i] != "") {
          checkIfError = false;
        }
      }
      if (checkIfError) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.isLoading = true;
            this.validationError = "";
            let inventoryItemLists = [];

            for (let index = 0; index < this.clickedInventoryId.length; index++) {
              let inventoryItemList = {};
              inventoryItemList["inventoryId"] = this.clickedInventoryId[index];
              inventoryItemList["transactionType"] = "In";
              inventoryItemList["quantity"] = Number(this.quantity[index]);
              inventoryItemList["sellPrice"] = Number(this.sellPrice[index]);
              inventoryItemLists.push(inventoryItemList);
            }
            this.$http
              .post("/customer-sold-inventory", {
                customerId: this.userId,
                soldDate: this.soldDate,
                customerSoldInventoryDetailRequestModels: inventoryItemLists,
              })
              .then((response) => {
                this.isLoading = false;
                this.clickedInventoryId = [];
                this.clikedInventoryName = [];
                this.quantity = [];
                this.sellPrice = [];
                this.inc = -1;
                this.$vs.notify({
                  title: this.$t("Add"),
                  text: this.$t("Added Successfully!"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success",
                });
                this.$router.push({
                  path: "/pages/customer/view-customer-inventory",
                });
              })
              .catch(() => {
                this.isLoading = false;
              });
          } else {
            this.validationError = "Please enter number on all fields";
          }
        });
      }
    },
    resetValidationError() {
      this.validationError = "";
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
    addTransaction() { },
  },
};
</script>
