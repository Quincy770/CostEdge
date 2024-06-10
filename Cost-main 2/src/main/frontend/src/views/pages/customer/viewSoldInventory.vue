<template>
  <vs-card>
    <div class="vx-row">
      <div class="w-4/5 mt-8">

      </div>

      <div class="w-1/5 mt-8 mb-2">
        <vs-button v-if="isGranted('sellItem')" class="small text-base" icon-pack="feather" icon="icon-plus"
          type="gradient" color="success" @click.prevent="add">{{ $t("sellItem") }}</vs-button>
      </div>

    </div>
    <vx-card no-shadow card-border>
      <div class="vx-row mt-2 ml-0" style=" height: 40px">
        <div class="vx-col sm:w-1/5 ml-3" style="margin-top: 10px">
          <h3>{{ $t("sellNumber") }}</h3>
        </div>
        <div class="vx-col sm:w-1/3" style="margin-top: 10px">
          <h3>{{ $t("soldDate") }}</h3>
        </div>
      </div>
      <div v-if="customerSoldInventories" style="">
        <div :key="indextr" v-for="(tr, indextr) in customerSoldInventories">
          <vs-collapse type="border" ref="open_me" class="knowledge-base-jumbotron-content">
            <vs-collapse-item id="item" class="collapseItem" style="height: auto">
              <div slot="header" class="vx-row">
                <div class="vx-col sm:w-1/6">
                  <strong>
                    {{ tr.sellNumber + " " }}
                  </strong>
                </div>
                <div class="vx-col sm:w-1/3">
                  <strong>,
                    {{
                        new Date(tr.soldDate) &&
                        daysOfWeek[new Date(tr.soldDate).getDay() - 1]
                    }}</strong>
                  , {{ tr.soldDate.split("T")[0] }}
                  {{
                      tr.soldDate.split("T").length > 0 &&
                      tr.soldDate.split("T")[1].split("Z")[0]
                  }}
                </div>
              </div>

              <vs-table class="stripe" hoverFlat @selected="goToDetail" :max-items="perPage" :data="
                customerSoldInventories[indextr]
                  .customerSoldInventoryDetailResponseModels
              ">
                <template slot="thead">
                  <vs-th sort-key="number">#</vs-th>
                  <vs-th sort-key="inventoryName">{{
                      $t("inventoryName")
                  }}</vs-th>
                  <vs-th sort-key="quantity">{{ $t("quantity") }}</vs-th>
                  <vs-th sort-key="sellPrice">{{ $t("sellPrice") }}</vs-th>
                  <vs-th sort-key="action">{{ $t("action") }}</vs-th>
                </template>
                <template slot-scope="{ data }">
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td class="w-10">{{
                        indextr + 1 + perPage * (currentPage - 1)
                    }}</vs-td>
                    <vs-td class="pr-4 w-1/4" :data="data[indextr].inventoryName">{{ data[indextr].inventoryName }}
                    </vs-td>
                    <vs-td class="pr-4 w-1/4" :data="data[indextr].quantity">{{
                        data[indextr].quantity
                    }}</vs-td>
                    <vs-td class="pr-4 w-1/4" :data="data[indextr].sellPrice">{{
                        data[indextr].sellPrice
                    }}</vs-td>
                    <vs-td class="p-0" :data="data[indextr].id">
                      <span v-if="isGranted('editCustomerSoldInventoryDetail')" @click="
                        updateCustomerSoldInventory(
                          data[indextr].customerSoldInventoryDetailId
                        )
                      ">
                        <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
                      </span>
                    </vs-td>
                    <vs-td class="p-0" :data="data[indextr].id">
                      <ul class="switch-container">
                        <li>
                          <span v-if="isGranted('deleteSoldItem')" @click="
                            (preventTableClickAction = true),
                            openConfirm(
                              data[indextr].customerSoldInventoryDetailId
                            )
                          ">
                            <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                          </span>
                        </li>
                      </ul>
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </vs-collapse-item>
          </vs-collapse>
        </div>
      </div>
    </vx-card>
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
        <!-- <div class="vx-row">
          <div class="vx-col w-1/2">
            <vs-input class="w-full" v-model="inventorySellPriceDetail.discountAmount" :label="$t('discountAmount')"
              :name="inventorySellPriceDetail.discountAmoun" v-validate="'required|decimal:10'"
              data-vv-validate-on="blur" @change="resetValidationError" />
          </div>
        </div> -->
      </div>
      <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
      <div class="flex items-stretch mt-5">
        <vs-button class="flex-1" color="success" type="filled" @click.prevent="insertInventorySellPrice()">
          {{ $t('Save') }}</vs-button>
      </div>
      </div>
    </vs-prompt>
    <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getTransactions"></vs-pagination>

  </vs-card>
</template>
<script>
import Loading from "vue-loading-overlay";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  components: {
    Loading,
    flatPickr,
  },

  data() {
    return {
      format: "yyyy-MM-dd",
      perPage: 15,
      searchKey: "",
      currentPage: 1,
      limit: 15,
      total: 0,
      companyId: "",
      validationError: "",
      customerSoldInventories: [],
      customerSoldInventoryDetailId: "",
      userId: localStorage.getItem("userId"),
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y-m-dTH:i",
      },
      insertSellPricePopUp: false,
      inventorySellPriceDetail: {
        sellPrice: "",
        discountAmount: "",
        effectiveDateTime: "",
        availableQuantity: ""
      },
    };
  },
  methods: {
    resetValidationError() {
      this.validationError = ""
    },

    insertInventorySellPrice() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isLoading = true
          this.validationError = "";
          this.$http
            .post("/customer-inventory-sell-price",
              {
                "inventoryId": 1,
                "sellPrice": this.inventorySellPriceDetail.sellPrice,
                "effectiveDateTime": new Date(this.inventorySellPriceDetail.effectiveDateTime),
                "customerId": this.userId,

              }
            )
            .then(response => {
              this.insertSellPricePopUp = false; this.inventorySellPriceDetail.effectiveDateTime = '',
                this.inventorySellPriceDetail.sellPrice = '',
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
    updateCustomerSoldInventory: function (id) {
      this.$router.push({
        path: "/pages/customer/edit-customer-inventory/" + id,
      });
    },
    openConfirm(customerSoldInventoryDetailId) {
      this.customerSoldInventoryDetailId = customerSoldInventoryDetailId;
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
          "/customer-sold-inventory-detail/" + this.customerSoldInventoryDetailId
        )
        .then((response) => {
          this.$vs.notify({
            color: "success",
            title: "Status",
            text: "Sold item Type Deleted",
          });
          this.getAllCustomerSoldInventories();
        });
    },
    // updateCustomerSoldInventory: function (id) {
    //   this.$router.push({ path: "/pages/edit-agent/" + id });
    // },
    getAllCustomerSoldInventories() {
      this.$http
        .get("/customer-sold-inventory", {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            companyId: this.companyId,
            userType: localStorage.getItem("userType"),
            searchKey: this.searchKey
          },
        })
        .then((response) => {
          this.customerSoldInventories = response.data;
        });
    },
    add: function () {
      this.$router.push({ path: "/pages/customer/add-customer-inventory" });
    },
  },
  created() {
    this.getAllCustomerSoldInventories();
  },
  computed: {},
};
</script>
