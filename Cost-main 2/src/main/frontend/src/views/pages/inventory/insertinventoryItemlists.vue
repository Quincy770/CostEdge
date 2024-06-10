<template>
  <div id="main-div" class="vx-row">
    <div id="div" class="w-full mb-base">
      <vx-card id="external-card" title="">
        <h3>{{ $t("Insert Inventory Item List") }}</h3>
        <vx-card id="internal-card" class="mt-10" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
    
          <vs-alert
            v-if="validationError != ''"
            color="danger"
            icon-pack="feather"
            icon="icon-info"
          >
            <span>{{ validationError }}</span>
          </vs-alert>
          <div class="vx-col w-1/2">
            <v-select
              v-model="inventoryNames"
              :placeholder="$t('selectInventoryItemToInsert')"
              class="w-full"
              label="inventoryGenericName"
              @input="generateRowInput(inventoryNames, inventoryNames)"
              :options="inventoryItems"
              :reduce="(inventoryItem) => inventoryItem.inventoryId"
              name="inventoryGenericName"
            ></v-select>
          </div>
          <div class="mt-4" v-if="inc != -1">
            <vs-table :data="tabledata" id="table">
              <!-- HEADER -->
              <vs-th>{{ $t("genericName") }}</vs-th>
              <vs-th
                >{{ $t("Quantity") }}
                <p class="ml-1" id="required">*</p></vs-th
              >
              <vs-th
                >{{ $t("Cost") }}
                <p class="ml-1" id="required">*</p></vs-th
              >
              <vs-th
                >{{ $t("sellPrice") }}
                <p class="ml-1" id="required">*</p></vs-th
              >
              <vs-th
                >{{ $t("discountAmount") }}
                <p class="ml-1" id="required">*</p></vs-th
              >

              <vs-tr v-for="(option, index) in clickedInventoryId" :key="index">
                <vs-td class="pl-0">
                  <p>
                    {{ clikedInventoryName[index] }}
                    {{ clikedDosageForm[index] }} {{ clikedStrength[index] }}
                  </p>
                </vs-td>
                <vs-td class="pl-0">
                  <vs-input
                    class="w-3/5 mb-6"
                    v-model="quantity[index]"
                    data-vv-validate-on="blur"
                    :name="clikedInventoryName[index] + ' quantity'"
                    v-validate="'required|decimal:10'"
                    :class="[
                      {
                        error_input: errors.has(
                          clikedInventoryName[index] + ' quantity'
                        ),
                      },
                    ]"
                    @change="resetValidationError"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    class="w-3/5 mb-6"
                    v-model="costOfInventory[index]"
                    :name="clikedInventoryName[index] + ' cost'"
                    v-validate="'required|decimal:10'"
                    data-vv-validate-on="blur"
                    :class="[
                      {
                        error_input: errors.has(
                          clikedInventoryName[index] + ' cost'
                        ),
                      },
                    ]"
                    @change="resetValidationError"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    class="w-3/5 mb-6 mr-8"
                    v-model="sellPrice[index]"
                    :name="clikedInventoryName[index] + ' sellPrice'"
                    v-validate="'required|decimal:10'"
                    data-vv-validate-on="blur"
                    :class="[
                      {
                        error_input: errors.has(
                          clikedInventoryName[index] + ' sellPrice'
                        ),
                      },
                    ]"
                    @change="resetValidationError"
                  />
                </vs-td>
                <vs-td>
                  <vs-input
                    class="w-3/5 mb-6"
                    v-model="discountAmount[index]"
                    :name="clikedInventoryName[index] + ' discount'"
                    v-validate="'required|decimal:10'"
                    data-vv-validate-on="blur"
                    :class="[
                      {
                        error_input: errors.has(
                          clikedInventoryName[index] + ' discount'
                        ),
                      },
                    ]"
                    @change="resetValidationError"
                  />
                </vs-td>
                <vs-td>
                  <span class="p-0" id="edit-icon" @click="removeRow(index)">
                    <vs-avatar
                      color="danger"
                      icon-pack="feather"
                      icon="icon-delete"
                    />
                  </span>
                </vs-td>
              </vs-tr>
            </vs-table>
            
            <vs-button @click="addInventoryItemList">{{ $t("Add") }}</vs-button>
          </div>
        </vx-card>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { Validator } from "vee-validate";
import VSelect from "vue-select";
import Loading from "vue-loading-overlay";
// // Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
let k = 0;
// for(let i=0;i<10;i++){
const dict = {
  custom: {
    quantity: {
      required: "please enter quantity",
      integer: "Quantity must be integer",
    },
    Cost: {
      required: "Please Enter Cost",
      integer: "Cost must be integer",
    },
    sellPrice: {
      required: "Please Enter Sell Price",
      integer: "Sell price must be integer",
    },
    Discount: {
      required: "Please Enter Discount",
      integer: "Discount must be integer",
    },
  },
};
// }
Validator.localize("en", dict);
export default {
  components: {
    "v-select": VSelect,
    Loading,
  },
  data() {
    return {
      inc: -1,
      inventoryItems: [],
      clickedInventoryId: [],
      clikedInventoryName: [],
      clikedDosageForm: [],
      clikedStrength: [],
      transactionType: [],
      quantity: [],
      costOfInventory: [],
      sellPrice: [],
      discountAmount: [],
      inventoryNames: [],
      tabledata: "sdfdsf",
      validationError: "",
      isLoading: false,
    };
  },
  // computed: {
  //   validateForm() {
  //     return !this.errors.any() && (this.quantity[0] != "") == true;
  //   }
  // },
  methods: {
    removeRow: function (index) {
      this.inc--;
      this.clickedInventoryId.splice(index, 1);
      this.clikedInventoryName.splice(index, 1);
      this.clikedDosageForm.splice(index, 1);
      this.clikedStrength.splice(index, 1);
      this.quantity.splice(index, 1);
      this.costOfInventory.splice(index, 1);
      this.sellPrice.splice(index, 1);
      this.discountAmount.splice(index, 1);
    },
    generateRowInput: function (inventoryId, inventoryName) {
      if (inventoryId != null) {
        let checker = 0;
        for (let k = 0; k < this.inc + 1; k++) {
          if (inventoryId == this.clickedInventoryId[k]) checker = 1;
        }
        if (checker == 0) {
          this.inc++;
          this.clickedInventoryId[this.inc] = inventoryId;
          for (let i = 0; this.inventoryItems.length; i++) {
            if (inventoryId == this.inventoryItems[i].inventoryId) {
              this.clikedInventoryName[this.inc] =
                this.inventoryItems[i].inventoryGenericName;
              this.clikedDosageForm[this.inc] =
                this.inventoryItems[i].dosageForm;
              this.clikedStrength[this.inc] = this.inventoryItems[i].strength;
            }
          }
          this.transactionType[this.inc] = "";
          this.quantity[this.inc] = "";
          this.costOfInventory[this.inc] = "";
          this.sellPrice[this.inc] = "";
          this.discountAmount[this.inc] = "";
        } else this.inc--;
      }
    },
    addInventoryItemList() {
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
            inventoryItemList["costOfInventory"] = Number(
              this.costOfInventory[index]
            );
            inventoryItemList["sellPrice"] = Number(this.sellPrice[index]);
            inventoryItemList["discountAmount"] = Number(
              this.discountAmount[index]
            );
            inventoryItemLists.push(inventoryItemList);
            console.log(inventoryItemList);
          }
          this.$http
            .post("/inventorytransaction", inventoryItemLists)
            .then((response) => {
              this.isLoading = false;
              this.clickedInventoryId = [];
              this.clikedInventoryName = [];
              this.quantity = [];
              this.costOfInventory = [];
              this.sellPrice = [];
              this.discountAmount = [];
              this.inc = -1;
              this.$vs.notify({
                title: this.$t("Add"),
                text: this.$t("Added Successfully!"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
              });
            })
            .catch(() => {
              this.isLoading = false;
            });
        } else {
          this.validationError = "Please enter number on all fields";
        }
      });
    },
    resetValidationError() {
      this.validationError = "";
    },

    getInventories() {
      const thisIns = this;
      this.$http
        .get("/inventory", {
          params: {
            page: this.currentPage,
            limit: 100000,
          },
        })
        .then(function (response) {
          thisIns.inventoryItems = response.data;
          for (let k = 0; k < response.data.length; k++) {
            thisIns.inventoryItems[k].inventoryGenericName =
              response.data[k].inventoryGenericName +
              " " +
              response.data[k].dosageForm +
              " " +
              response.data[k].strength;
          }
        });
    },
  },
  created() {
    this.getInventories();
  },
  computed: {
    customError(model) {
      if (model == "") {
        return "the field is required";
      } else {
        return "Please enter number";
      }
    },
  },
};
</script>
<style scoped>
#div {
  width: 100%;
}
#internal-card {
  width: 100%;
}
#external-card {
  width: 100%;
}

#required {
  color: red;
  font-size: 15px;
}
</style>
