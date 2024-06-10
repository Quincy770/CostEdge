<template>
  <div id="main-div" class="vx-row">
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" title>
        <h3>{{$t('updateTransaction')}}</h3>
        <div class="vx-row lg:w-1/2">
          <div class="vx-col sm:w-1/3 w-full mb-6">
            <vs-input
              class="w-full"
              label-placeholder="Quantity"
              v-model="inventory.quantity"
              v-validate="'numeric'"
              name="quantity"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('quantity')"
            >{{ errors.first('quantity') }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-6">
            <vs-input
              class="w-full"
              label-placeholder="Cost of Inventory"
              v-model="inventory.costOfInventory"
              v-validate="'numeric'"
              name="costOfInventory"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('costOfInventory')"
            >{{ errors.first('costOfInventory') }}</span>
          </div>
        </div>
        <div class="vx-row lg:w-1/2">
          <div class="vx-col sm:w-1/3 w-full mb-6">
            <vs-input
              class="w-full"
              label-placeholder="Selling Price"
              v-model="inventory.sellPrice"
              v-validate="'numeric'"
              name="sellPrice"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('sellPrice')"
            >{{ errors.first('sellPrice') }}</span>
          </div>
          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-input
              class="w-full"
              label-placeholder="Discount Amount"
              v-model="inventory.discountAmount"
              v-validate="'numeric'"
              name="discountAmount"
            />
            <span
              class="text-danger text-sm"
              v-show="errors.has('discountAmount')"
            >{{ errors.first('discountAmount') }}</span>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button @click.prevent="updateInventoryTransaction" class="mr-3 mb-2">{{$t('Update')}}</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>


<script>
// import { throws } from "assert";
import { Validator } from 'vee-validate';
const dict = {
  custom: {
    quantity: {
      numeric: 'Please enter number only'
    },
    costOfInventory: {
      numeric: 'Please enter number only'
    },
    sellPrice: {
      numeric: 'Please enter number only'
    },
    discountAmount: {
      numeric: 'Please enter number only'
    },
    
  }
};

// register custom messages
Validator.localize('en', dict);
export default {
  data() {
    return {
      inventory: {
        quantity:'',
        costOfInventory:'',
        sellPrice:'',
        discountAmount:''
      },
      id: this.$route.params.id,
     
    };
  },
  methods: {
    updateInventoryTransaction() {
      this.$http
        .put("/inventorytransaction/" + this.id, {
          quantity: this.inventory.quantity,
          costOfInventory: this.inventory.costOfInventory,
          sellPrice: this.inventory.sellPrice,
          discountAmount: this.inventory.discountAmount
        })
        .then(response => {
          this.$vs.notify({
            title: "Status",
            text: "Succesfully updated trasaction",
            color: "success",
            iconPack: "feather",
            icon: "icon-check"
          });
          this.$router.push({ path: "/pages/transaction/viewTransaction" });
        });
    }
  },

  created() {
    const thisIns = this;
    this.$http
      .get("/inventorytransaction/" + thisIns.id)
      .then(function(response) {
        thisIns.inventory = response.data;
      });
  }
};
</script>
<style  scoped>
</style>