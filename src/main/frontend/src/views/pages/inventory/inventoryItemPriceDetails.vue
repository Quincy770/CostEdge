<template>
  <vx-card :title="$t('sellPriceDetail')">
    <vx-card id="internal-card" class="mt-0" title no-shadow card-border>
      <table :data="sampleData">
        <tr>
          <th>{{ $t('inventoryGenericName') }}:</th>
          <td>{{ inventoryDetail.invenoryDetail.inventoryGenericName }}</td>
          <th>{{ $t('dosageForm') }}:</th>
          <td class="w-1/5">{{ inventoryDetail.invenoryDetail.dosageForm }}</td>
          <th class="w-1/5">{{ $t('strength') }}:</th>
          <td>{{ inventoryDetail.invenoryDetail.strength }}</td>

        </tr>

        <tr>
          <th>{{ $t('brandName') }}:</th>
          <td>{{ inventoryDetail.invenoryDetail.inventoryBrandName }}</td>
          <th>{{ $t('measuringUnit') }}:</th>
          <td>{{ inventoryDetail.invenoryDetail.measuringUnit }}</td>
          <th>{{ $t('volume') }}:</th>
          <td>{{ inventoryDetail.invenoryDetail.volume }}</td>

        </tr>

        <tr>

          <th>{{ $t('category') }}:</th>
          <td>{{ inventoryDetail.invenoryDetail.inventoryType }}</td>
          <th>{{ $t('subCategory') }}:</th>
          <td>{{ inventoryDetail.invenoryDetail.subCategory }}</td>
          <th>{{ $t('availableQuantity') }}:</th>
          <td>{{ inventoryDetail.invenoryDetail.availableQuantity }}</td>

        </tr>
      </table>
      <div class="vx-row">
        <div class="vx-col sm:w-full md:w-full lg:w-1/4">
          <vs-dropdown vs-custom-content vs-trigger-click>
            <div style="height: 30px;"
              class="p-4 w-16 mb-2 border border-solid d-theme-border-grey-light d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
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
        <div class="vx-col buttons">
          <span>
            <vs-button size="small" color="success" @click="insertSellPricePopUp = true">{{ $t('setSellPrice') }}
            </vs-button>
            <vs-button v-if="isAdmin" class="ml-2" size="small" color="success"
              @click="inventoryTransactionPopUp = true, getInventoryDetail()">{{ $t('otherTransactions') }}</vs-button>
          </span>
        </div>
      </div>
      <vs-table v-if="isAdmin" class="stripe" :max-items="page" :data="inventoryDetail.inventoryPriceList">
        <template slot="thead">
          <vs-th getcustomerreport sort-key="sellPrice">{{ $t('sellPrice') }}</vs-th>
          <vs-th v-if="isAdmin" sort-key="Discount">{{ $t('Discount') }}</vs-th>
          <vs-th sort-key="Discount">{{ $t('effectiveDateTime') }}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :state="data[indextr].activeSellPrice ? 'success' : null" :data="tr" :key="indextr"
            v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].sellPrice">{{ data[indextr].sellPrice.toLocaleString('en-US') }} USD
            </vs-td>
            <vs-td v-if="isAdmin" :data="data[indextr].discountAmount">
              {{ data[indextr].discountAmount.toLocaleString('en-US') }} USD</vs-td>

            <vs-td :data="data[indextr].effectiveDateTime">
              {{ getDateFormatted(data[indextr].effectiveDateTime) }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-table v-if="isCustomer || isCustomerAdmin" class="stripe" :max-items="page"
        :data="customerInventoryPriceList">
        <template slot="thead">
          <vs-th getcustomerreport sort-key="sellPrice">{{ $t('sellPrice') }}</vs-th>
          <vs-th sort-key="Discount">{{ $t('effectiveDateTime') }}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :state="data[indextr].activeSellPrice ? 'success' : null" :data="tr" :key="indextr"
            v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].sellPrice">{{ data[indextr].sellPrice.toLocaleString('en-US') }} USD
            </vs-td>

            <vs-td :data="data[indextr].effectiveDateTime">
              {{ getDateFormatted(data[indextr].effectiveDateTime) }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <vs-pagination :total="totalPage" v-model="currentPage" @change="getInventoryDetail()"></vs-pagination>
    </vx-card>
    <vs-prompt @cancel="quantity = '', costOfInventory = '', sellPrice = '', discountAmount = ''"
      @accept="updateInventoryCostSellPrice()" classContent="popup-example" title="Edit Cost Sell Price" buttons-hidden
      :active.sync="inventoryPricePopUp">
      <div>
        <vs-alert v-if="validationError != ''" color="danger" icon-pack="feather" icon="icon-info">
          <span>{{ validationError }}</span>
        </vs-alert>
        <div class="vx-row">
          <vs-input class="vx-col w-1/2 mb-2" v-model="quantity" data-vv-validate-on="blur" :label="$t('quantity')"
            :name="quantity" v-validate="'required|decimal:10'" @change="resetValidationError" />
          <vs-input class="vx-col w-1/2 mb-2" v-model="costOfInventory" :label="$t('cost')" :name="costOfInventory"
            v-validate="'required|decimal:10'" data-vv-validate-on="blur" @change="resetValidationError" />

          <vs-input class="vx-col w-1/2 mb-2" v-model="sellPrice" :name="sellPrice" :label="$t('sellPrice')"
            v-validate="'required|decimal:10'" data-vv-validate-on="blur" @change="resetValidationError" />
          <vs-input class="vx-col w-1/2 mb-2" v-model="discountAmount" :label="$t('discountAmount')"
            :name="discountAmount" v-validate="'required|decimal:10'" data-vv-validate-on="blur"
            @change="resetValidationError" />
        </div>
      </div>
      <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
      <div class="flex items-stretch mt-5">
        <vs-button class="flex-1" color="success" type="filled" @click.prevent="updateInventoryCostSellPrice()">
          {{ $t('Save') }}</vs-button>
      </div>
      </div>
    </vs-prompt>


    <!-- ----------------------------------------Set Inventory Sell Price------------------------------------------------------------------------ -->
    <vs-prompt
      @cancel="inventorySellPriceDetail.availableQuantity = '', inventorySellPriceDetail.effectiveDateTime = '', inventorySellPriceDetail.sellPrice = '', inventorySellPriceDetail.discountAmount = ''"
      @accept="insertInventorySellPrice()" classContent="popup-example" title="Insert Sell Price" buttons-hidden
      :active.sync="insertSellPricePopUp">
      <div>
        <vs-alert v-if="validationError != ''" color="danger" icon-pack="feather" icon="icon-info">
          <span>{{ validationError }}</span>
        </vs-alert>
        <div class="vx-row">
          <div class="vx-col w-1/2">
            <vs-input class="w-full" v-model="inventorySellPriceDetail.sellPrice"
              :name="inventorySellPriceDetail.sellPrice" :label="$t('sellPrice')" v-validate="'required|decimal:10'"
              data-vv-validate-on="blur" @change="resetValidationError" />
          </div>

          <div class="vx-col w-1/2">
            <span>{{ $t('effectiveDateTime') }}</span>
            <flat-pickr class="w-full" :config="configdateTimePicker"
              v-model.trim="inventorySellPriceDetail.effectiveDateTime" v-validate="'required'"
              v-validate:effectiveDateTime="'required'" data-vv-validate-on="blur" data-vv-scope="specimen"
              :name="inventorySellPriceDetail.effectiveDateTime" @change="resetValidationError" />
          </div>
        </div>
        <div class="vx-row" v-if="isAdmin">
          <div class="vx-col w-1/2">
            <vs-input class="w-full" v-model="inventorySellPriceDetail.discountAmount" :label="$t('discountAmount')"
              :name="inventorySellPriceDetail.discountAmoun" v-validate="'required|decimal:10'"
              data-vv-validate-on="blur" @change="resetValidationError" />
          </div>


        </div>

      </div>
      <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
      <div class="flex items-stretch mt-5">
        <vs-button class="flex-1" color="success" type="filled" @click.prevent="insertInventorySellPrice()">
          {{ $t('Save') }}</vs-button>
      </div>
      </div>
    </vs-prompt>

    <!-- ----------------------------------------Other Inventory Transactions------------------------------------------------------------------------ -->
    <vs-prompt
      @cancel="inventoryTransaction.transactionType = '', inventoryTransaction.quantity = '', inventoryTransaction.sellPrice = '', inventoryTransaction.cost = ''"
      @accept="addTransaction()" classContent="popup-example" title="Add Transaction" buttons-hidden
      :active.sync="inventoryTransactionPopUp">
      <div>
        <vs-alert v-if="validationError != ''" color="danger" icon-pack="feather" icon="icon-info">
          <span>{{ validationError }}</span>
        </vs-alert>
        <div class="vx-row">
          <div class="vx-col w-1/2">
            <vs-input class="w-full" v-model="inventoryTransaction.quantity" :name="inventoryTransaction.quantity"
              :label="$t('quantity')" v-validate="'required'" data-vv-validate-on="blur" @change="validateQuantity()" />
            <span class="text-danger">{{ quantityValidationError }}</span>
          </div>

          <div class="vx-col w-1/2">
            <vs-input class="w-full" v-model="inventoryTransaction.transactionType" data-vv-validate-on="blur"
              :label="$t('transactionType')" :name="inventoryTransaction.transactionType" v-validate="'required'"
              @change="resetValidationError" />
          </div>

          <!-- <div class="vx-col w-1/2">
                          <vs-input
                                class="w-full"
                                v-model="inventoryTransaction.sellPrice"
                                :name="inventoryTransaction.sellPrice"
                                :label="$t('sellPrice')"
                                v-validate="'required|decimal:10'"
                                data-vv-validate-on="blur"
                                @change="resetValidationError"
                              />
                        </div> -->


        </div>
        <div class="vx-row">


        </div>

      </div>
      <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
      <div class="flex items-stretch mt-5">
        <vs-button class="flex-1" color="success" type="filled" @click.prevent="addTransaction()">{{ $t('Save') }}
        </vs-button>
      </div>
      </div>
    </vs-prompt>
  </vx-card>
</template>

<script>
import router from "@/router";
import "@/assets/scss/vuesax/extraComponents/agGridStyleOverride.scss";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  components: {
    flatPickr,
  },
  data() {
    return {
      sampleData: "",
      id: this.$route.params.id,
      inventoryDetail: "",
      limit: 15,
      currentPage: 1,
      totalPage: 0,
      page: 1,
      total: 0,
      inventory: [],
      inventoryPricePopUp: false,
      inventoryId: "",
      userId: localStorage.getItem('userId'),
      companyId: localStorage.getItem("companyId"),
      validationError: "",
      customerInventoryPriceList: [],
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y-m-dTH:i",
      },
      insertSellPricePopUp: false,
      inventoryTransactionPopUp: false,
      inventorySellPriceDetail: {
        sellPrice: "",
        discountAmount: "",
        effectiveDateTime: "",
        availableQuantity: ""
      },
      inventoryTransaction: {
        quantity: "",
        sellPrice: "",
        cost: "",
        transactionType: "",

      },

    };
  },

  methods: {

    getDateFormatted(date) {
      return new Date(date).toLocaleDateString(['en-US'], { timeZone: "Africa/Nairobi", month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    },


    validateQuantity() {
      if (this.inventoryTransaction.quantity > this.inventoryDetail.availableQuantity)
        this.quantityValidationError = "You couldn't enter above available quantity!";
      else
        this.quantityValidationError = "";
    },


    addTransaction() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.validationError = "";

          let inventoryItemLists = [];
          let inventoryItemList = {};
          inventoryItemList["inventoryId"] = this.id;
          inventoryItemList["transactionType"] = this.inventoryTransaction.transactionType;
          inventoryItemList["quantity"] = this.inventoryTransaction.quantity;
          inventoryItemList["costOfInventory"] = this.inventoryTransaction.cost;
          inventoryItemList["sellPrice"] = this.inventoryTransaction.sellPrice;
          inventoryItemLists.push(inventoryItemList);

          this.$http
            .post("/inventorytransaction", inventoryItemLists).then(response => {
              this.inventoryTransactionPopUp = false;
              this.inventoryTransaction.quantity = '', this.inventoryTransaction.cost = '',
                this.inventoryTransaction.sellPrice = '', this.inventoryTransaction.transactionType = '';
              this.isLoading = false
              this.$vs.notify({
                title: this.$t('Add'),
                text: this.$t('Added Successfully!'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success"
              });
            })
            .catch(() => {
              this.isLoading = false
            });
        }
        else {
          this.validationError = "Please enter number on all fields"
        }
      });

    },

    insertInventorySellPrice() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.validationError = "";
          if (this.isAdmin)
            this.$http
              .post("/inventorytransaction/sell-price",
                {
                  "inventoryId": this.id,
                  "sellPrice": this.inventorySellPriceDetail.sellPrice,
                  "discountAmount": this.inventorySellPriceDetail.discountAmount,
                  "effectiveDateTime": new Date(this.inventorySellPriceDetail.effectiveDateTime),

                }
              )
              .then(response => {
                this.insertSellPricePopUp = false;
                this.inventorySellPriceDetail.availableQuantity = '', this.inventorySellPriceDetail.effectiveDateTime = '',
                  this.inventorySellPriceDetail.sellPrice = '', this.inventorySellPriceDetail.discountAmount = '';
                this.isLoading = false
                this.$vs.notify({
                  title: this.$t('Add'),
                  text: this.$t('Added Successfully!'),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "success"
                });
                this.getInventoryDetail();
              })
              .catch(() => {
                this.isLoading = false
              });
          else if (this.isCustomerAdmin || this.isCustomer) {
            this.insertCustomerInventorySellPrice();
          }
        }
        else {
          this.validationError = "Please enter number on all fields"
        }
      });

    },
    insertCustomerInventorySellPrice() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.validationError = "";

          this.$http
            .post("/customer-inventory-sell-price",
              {
                "inventoryId": this.id,
                "sellPrice": this.inventorySellPriceDetail.sellPrice,
                "effectiveDateTime": new Date(this.inventorySellPriceDetail.effectiveDateTime),
                "companyId": this.companyId,
                "customerId": this.userId,

              }
            )
            .then(response => {
              this.insertSellPricePopUp = false; this.inventorySellPriceDetail.effectiveDateTime = '',
                this.inventorySellPriceDetail.sellPrice = '',
                this.isLoading = false;
              this.getAllCustomerInventorySellPrices();

              this.$vs.notify({
                title: this.$t('Add'),
                text: this.$t('Added Successfully!'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success"
              });
            })
            .catch(() => {
              this.isLoading = false
            });
        }
        else {
          this.validationError = "Please enter number on all fields";
          this.getAllCustomerInventorySellPrices();
        }
      });

    },
    updateInventoryCostSellPrice() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.validationError = "";

          this.$http
            .post("/inventorytransaction")
            .then(response => {
              this.isLoading = false
              this.$vs.notify({
                title: this.$t('Add'),
                text: this.$t('Added Successfully!'),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success"
              });
            })
            .catch(() => {
              this.isLoading = false
            });
        }
        else {
          this.validationError = "Please enter number on all fields"
        }
      });

    },
    resetValidationError() {
      this.validationError = ""
    },
    search: function (input) { },
    pageLimit: function (limit) {
      this.limit = limit;
      if (45 % this.limit != 0)
        this.total = Math.ceil((50 / this.limit));
      else this.total = 45 / this.limit;
    },
    pagination: function (page) {
      this.page = page;
      this.$http
        .get("/pricelist/" + this.id, {
          params: { page: this.page, limit: this.limit },
        })
        .then(function (response) {
          this.inventory = response.data;
        });
    },

    getInventoryDetail() {
      const thisIns = this;
      this.$http
        .get("/pricelist/" + this.id, {
          params: { page: thisIns.currentPage, limit: thisIns.limit },
        })
        .then(function (response) {
          thisIns.inventoryDetail = response.data;
          thisIns.totalPage = response.data.inventoryPriceList[0].totalPage;

        });

    },
    getAllCustomerInventorySellPrices() {
      const thisIns = this;
      this.$http
        .get("/customer-inventory-sell-price", {
          params: { inventoryId: this.id, page: thisIns.currentPage, limit: thisIns.limit, companyId: this.companyId },
        })
        .then(function (response) {
          thisIns.customerInventoryPriceList = response.data;
          thisIns.totalPage = response.data[0].totalPages;


        });

    },

  },
  created() {
    this.getInventoryDetail();
    if (this.isCustomer || this.isCustomerAdmin) {
      this.getAllCustomerInventorySellPrices();
    }
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
    isAdmin() {
      return this.getCurrentUser.userType == 'Admin';
    },
    getInventoryItem() {
      return this.$store.getters["inventory/getInventoryItemPriceDetail"](this.id);
    }
  }
};
</script>

</script>
<style  scoped>
#search {
  margin-left: 500px;
  width: 300px;
}

#dropdown {
  width: 500px;
  margin-left: 20px;
}

#add {
  width: 200px;
  background: aliceblue;
  text-decoration-color: white;
}

table {
  border: 1px solid black;
  margin-bottom: 8px;
}
</style>
