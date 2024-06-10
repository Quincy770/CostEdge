<template>
  <vx-card :title="$t('priceDetail')">
    <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
      <span style="float: right">
        <vs-button size="small" color="success" @click="insertSellPricePopUp = true">{{ $t('setSellPrice') }}</vs-button>
        <vs-button class="ml-2" size="small" color="success"
          @click="inventoryTransactionPopUp = true, getInventoryDetail()">{{ $t('otherTransactions') }}</vs-button>
      </span>
      <vs-table class="stripe" :max-items="page" :data="inventoryPriceDetail">
        <template slot="thead">
          <vs-th class="pr-4" sort-key="Quantity">{{ $t('Quantity') }}</vs-th>
          <!-- <vs-th class="p-0" sort-key="cost">{{$t('Cost')}}</vs-th> -->
          <vs-th class="p-0" sort-key="sellPrice">{{ $t('sellPrice') }}</vs-th>
          <vs-th class="p-0" sort-key="companyStatus">{{ $t('edit') }}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="pr-4" :data="data[indextr].quantity">{{ data[indextr].quantity }}</vs-td>
            <!-- <vs-td class="p-0" :data="data[indextr].costOfInventory">
              {{data[indextr].costOfInventory.toLocaleString('en-US')}} USD</vs-td> -->
            <vs-td class="p-0" :data="data[indextr].sellPrice">{{ data[indextr].sellPrice.toLocaleString('en-US') }} USD
            </vs-td>
            <vs-td class="p-0" :data="data[indextr].discountAmount">
              {{ data[indextr].discountAmount.toLocaleString('en-US') }} USD</vs-td>
            <vs-td class="p-0 w-24" :data="data[indextr].id">
              <span id="edit-icon"
                @click="updateInventoryCostPrice(data[indextr].inventoryId, data[indextr].quantity, data[indextr].costOfInventory, data[indextr].sellPrice, data[indextr].discountAmount)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
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
        <div class="vx-row">
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
      id: this.$route.params.id,
      selected: [],
      inventoryPriceDetail: [],
      limit: 5,
      page: 1,
      total: 0,
      searchInventory: "",
      inventoryName: "",
      inventory: [],
      inventoryPricePopUp: false,
      inventoryId: "",
      quantity: "",
      costOfInventory: "",
      sellPrice: "",
      discountAmount: "",
      effectiveDateTime: "",
      validationError: "",
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
      inventoryDetail: {},
      quantityValidationError: ""
    };
  },

  methods: {
    validateQuantity() {
      if (this.inventoryTransaction.quantity > this.inventoryDetail.availableQuantity)
        this.quantityValidationError = "You couldn't enter above available quantity!";
      else
        this.quantityValidationError = "";
    },
    updateInventoryCostPrice(inventoryId, quantity, cost, sell, discount) {
      this.inventoryId = inventoryId;
      this.inventoryPricePopUp = true;
      this.quantity = quantity;
      this.costOfInventory = cost;
      this.sellPrice = sell;
      this.discountAmount = discount;
    },

    insertInventorySellPrice() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.validationError = "";
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

    updateInventoryCostSellPrice() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.validationError = "";

          this.$http
            .put("/customer-inventory-sell-price/" + this.customerInventorySellPriceId, {
              "inventoryId": this.id,
              "sellPrice": this.inventorySellPriceDetail.sellPrice,
              "discountAmount": this.inventorySellPriceDetail.discountAmount,
              "effectiveDateTime": new Date(this.inventorySellPriceDetail.effectiveDateTime),
            })
            .then(response => {
              this.isLoading = false
              this.$vs.notify({
                title: this.$t('Add'),
                text: this.$t('Updated Successfully!'),
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
      this.isLoading = true;
      this.$http
        .get("/inventorylistview/" + this.id)
        .then(response => {
          this.inventoryTransaction.sellPrice = response.data.sellPrice;
          this.inventoryDetail = response.data;
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },

    getAllCustomerInventorySellPrices() {
      const thisIns = this;
      this.$http
        .get("/customer-inventory-sell-price", {
          params: { page: 1, limit: thisIns.limit },
        })
        .then(function (response) {
          thisIns.inventoryPriceDetail = response.data;
        });
      thisIns.total = 50 / thisIns.limit;

      this.$http
        .get("/inventory/" + thisIns.id)
        .then(function (response) {
          thisIns.inventoryName = response.data.inventoryGenericName;
        });
    }

  },
  created() {
    this.getAllCustomerInventorySellPrices();
  },
  computed: {
    getInventoryItem() {
      return this.$store.getters["inventory/getInventoryItemPriceDetail"](this.id);
    }
  }
};
</script>
