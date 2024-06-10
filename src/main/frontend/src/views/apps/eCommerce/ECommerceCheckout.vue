<!-- =========================================================================================
	File Name: ECommerceCheckout.vue
	Description: eCommerce Checkout page
	----------------------------------------------------------------------------------------
	Item Name: Vuesax Admin - VueJS Dashboard Admin Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="ecommerce-checkout-demo">
    <form-wizard
      ref="checkoutWizard"
      color="rgba(var(--vs-primary), 1)"
      :title="null"
      :subtitle="null"
      :hide-buttons="true"
    >
      <!-- tab 1 content -->
      <tab-content title="Cart" icon="feather icon-shopping-cart">
        <!-- IF CART HAVE ITEMS -->
        <div class="vx-row" v-if="cartItems.length">
          <!-- LEFT COL -->
          <div class="vx-col lg:w-2/3 w-full relative">
            <div class="items-list-view" v-for="(item, index) in cartItems" :key="item.inventoryId">
              <CheckoutView :item="item">
                <!-- SLOT: ITEM META -->
                <template slot="item-meta">
                  <h6 class="item-name font-semibold mb-1">{{ item.inventoryGenericName }}</h6>
                  <p class="text-sm mb-2 cursor-pointer">
                    From
                    <span class="text-primary font-semibold">{{ item.inventoryBrandName }}</span>
                  </p>
                  <!-- <p class="text-success text-sm">In Stock</p> -->

                  <span class="mt-4 font-bold text-sm">Quantity</span>&nbsp;
                  <vs-input-number
                    min="1"
                    v-model="quantity[index]"
                    :value="quantity[index]"
                    class="inline-flex"
                  />

                  <!-- <p class="font-medium text-grey mt-4">Delivery by, {{ item.delivery_date }}</p> -->
                  <!-- <p class="text-success font-medium">{{ item.discount_in_percentage }}% off {{ item.offers_count }} offers Available</p> -->
                </template>
                <template slot="sellPrice">
                  <div class="my-2 centerTitle">
                    <del
                      class="strike font-bold"
                    >{{ (item.discountAmount+item.sellPrice)*quantity[index]}} USD</del>&nbsp;
                    <span
                      class="text-center font-bold text-success font-bold"
                    >{{item.sellPrice*quantity[index]}} USD</span>
                    <!-- <span class="text-grey flex items-start justify-center mt-1" v-if="item.free_shipping"> -->
                    <!-- <feather-icon icon="ShoppingCartIcon" svgClasses="w-4 h-4" />
                    <span class="text-sm ml-2">Free Shipping</span>-->
                    <!-- </span> -->
                  </div>
                </template>
                <!-- SLOT: ACTION BUTTONS -->
                <template slot="action-buttons">
                  <!-- PRIMARY BUTTON: REMOVE -->
                  <!-- <div
                    class="item-view-primary-action-btn bg-danger p-1 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-1"
                    @click="removeItemFromCart(item)"
                  >-->
                  <vs-chip
                    class="text-black w-full"
                    @click="removeItemFromCart(item)"
                    closable
                  >Remove</vs-chip>
                  <!-- <feather-icon icon="XIcon" class="text-white" svgClasses="h-4 w-4" />
                  <span class="text-sm font-semibold ml-25 text-white">REMOVE</span>-->
                  <!-- </div> -->
                </template>
              </CheckoutView>
            </div>
          </div>

          <!-- RIGHT COL -->
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card>
              <p class="text-grey mb-3">Options</p>
              <div class="flex justify-between">
                <span class="font-semibold">Coupons</span>
                <span class="font-medium text-primary cursor-pointer">Apply</span>
              </div>

              <vs-divider />

              <p class="font-semibold mb-3">Price Details</p>
              <div
                class="flex justify-between mb-2"
                v-for="(item,index) in cartItems"
                :key="item.inventoryId"
              >
                <span class="text-grey">{{item.inventoryGenericName}}</span>
                <!-- <span class="text-grey" >X{{quantity[index]}}</span> -->
                <span>{{item.sellPrice*quantity[index]}} USD</span>
              </div>
              <!-- <div class="flex justify-between mb-2">
                <span class="text-grey">Bag Discount</span>
                <span class="text-success">-25$</span>
              </div>-->
              <div class="flex justify-between mb-2">
                <span class="text-grey">Estimated Tax</span>
                <span>150 USD</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-grey">Service Charges</span>
                <span class="text-primary">20 USD</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-grey">Delivery Charges</span>
                <span class="text-success">Free</span>
              </div>

              <vs-divider />

              <div class="flex justify-between font-semibold mb-3">
                <span>Total</span>
                <span>{{getTotalPrice(cartItems)}} USD</span>
              </div>

              <vs-button class="w-full" @click="$refs.checkoutWizard.nextTab()">CONTINUE</vs-button>
            </vx-card>
          </div>
        </div>

        <!-- IF NO ITEMS IN CART -->
        <vx-card title="You don't have any items in your cart." v-else>
          <vs-button @click="$router.push('/apps/orders/shop')">Browse Shop</vs-button>
        </vx-card>
      </tab-content>

      <!-- tab 2 content -->
      <tab-content title="Address" icon="feather icon-home" class="mb-5">
        <div class="vx-row">
          <!-- LEFT COL: NEW ADDRESS -->
          <div class="vx-col lg:w-2/3 w-full">
            <vx-card title="Add New Address" class="mb-base">
              <form data-vv-scope="add-new-address">
                <!-- <div class="vx-row"> -->
                <!-- <div class="vx-col sm:w-1/2 w-full"> -->
                <!-- <vs-input
                      v-validate="'required|alpha_spaces'"
                      data-vv-as="field"
                      name="fullName"
                      label="Full Name:"
                      v-model="fullName"
                      class="w-full mt-5"
                    />
                    <span
                      v-show="errors.has('add-new-address.fullName')"
                      class="text-danger"
                >{{ errors.first('add-new-address.fullName') }}</span>-->
                <!-- </div> -->

                <!-- <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-validate="'required|digits:10'"
                      name="mobileNum"
                      label="Mobile Number:"
                      v-model="mobileNum"
                      class="w-full mt-5"
                    />
                    <span
                      v-show="errors.has('add-new-address.mobileNum')"
                      class="text-danger"
                    >{{ errors.first('add-new-address.mobileNum') }}</span>
                </div>-->
                <!-- </div> -->

                <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-validate="'required'"
                      name="deliveryAddress"
                      label="Delivery Address:"
                      v-model="deliveryAddress"
                      class="w-full mt-2"
                      icon-pack="feather"
                      icon="icon-map"
                      icon-no-border
                      label-placeholder="Enter the delivery address"
                    />
                    <span
                      v-show="errors.has('add-new-address.deliveryAddress')"
                      class="text-danger"
                    >{{ errors.first('add-new-address.deliveryAddress') }}</span>
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <flat-pickr
                      :config="configdateTimePicker"
                      v-model="deliveryDatetime"
                      placeholder="Pick Deliver Date"
                      v-validate="'required'"
                      name="deliveryTime"
                      class="w-full mt-2"
                    />
                    <span
                      v-show="errors.has('add-new-address.deliveryTime')"
                      class="text-danger"
                    >{{ errors.first('add-new-address.deliveryTime') }}</span>
                    <!-- <vs-input
                      v-validate="'required'"
                      name="deliveryTime"
                      label="Delivery Time:"
                      v-model="deliveryTime"
                      class="w-full mt-5"
                      icon-pack="feather"
                      icon="icon-clock"
                      icon-no-border
                      label-placeholder="Enter the delivery time"
                    />
                    <span
                      v-show="errors.has('add-new-address.deliveryTime')"
                      class="text-danger"
                    >{{ errors.first('add-new-address.deliveryTime') }}</span>-->
                  </div>
                </div>

                <!-- <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-validate="'required'"
                      name="city"
                      label=":"
                      v-model="city"
                      class="w-full mt-5"
                    />
                    <span
                      v-show="errors.has('add-new-address.city')"
                      class="text-danger"
                    >{{ errors.first('add-new-address.city') }}</span>
                  </div>
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-validate="'required'"
                      name="state"
                      label="State:"
                      v-model="state"
                      class="w-full mt-5"
                    />
                    <span
                      v-show="errors.has('add-new-address.state')"
                      class="text-danger"
                    >{{ errors.first('add-new-address.state') }}</span>
                </div>-->
                <!-- <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-validate="'required|min:3|max:6|numeric'"
                      name="pincode"
                      label="Pincode:"
                      v-model="pincode"
                      class="w-full mt-5"
                    />
                    <span
                      v-show="errors.has('add-new-address.pincode')"
                      class="text-danger"
                    >{{ errors.first('add-new-address.pincode') }}</span>
                </div>-->
                <!-- </div> -->

                <!-- <div class="vx-row">
                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-input
                      v-validate="'required'"
                      name="state"
                      label="State:"
                      v-model="state"
                      class="w-full mt-5"
                    />
                    <span
                      v-show="errors.has('add-new-address.state')"
                      class="text-danger"
                    >{{ errors.first('add-new-address.state') }}</span>
                  </div>

                  <div class="vx-col sm:w-1/2 w-full">
                    <vs-select label="Address Type:" v-model="addressType" class="w-full mt-5">
                      <vs-select-item
                        :key="index"
                        :value="item.value"
                        :text="item.text"
                        v-for="(item,index) in addressTypeOptions"
                      />
                    </vs-select>
                  </div>
                </div>-->
              </form>
              <div class="p-base">
                <!-- INVOICE TASKS TABLE -->
                <vs-table hoverFlat :data="cartItems">
                  <!-- HEADER -->
                  <template slot="thead">
                    <vs-th>ITEM</vs-th>
                    <vs-th>QUANTITY</vs-th>
                    <vs-th>
                      UNIT PRICE
                      <i class="fas fa-parking-circle"></i>
                    </vs-th>
                    <vs-th>TOTAL(USD)</vs-th>
                  </template>

                  <!-- DATA -->
                  <template slot-scope="{data}">
                    <vs-tr v-for="(tr, index) in data" :key="index">
                      <vs-td>{{ data[index].inventoryGenericName }}</vs-td>
                      <vs-td>x{{ quantity[index] }}</vs-td>
                      <vs-td>{{ data[index].sellPrice }}</vs-td>
                      <vs-td>{{ data[index].sellPrice*quantity[index]}}</vs-td>
                    </vs-tr>
                  </template>
                </vs-table>

                <!-- INVOICE SUMMARY TABLE -->
                <vs-table hoverFlat class="w-1/2 ml-auto mt-4" :data="cartItems">
                 <vs-tr>
                    <vs-th>SERVICE CHARGE</vs-th>
                    <vs-td>{{   (totalPrice*0.05).toFixed(2) }} USD</vs-td>
                  </vs-tr>
                  <vs-tr>
                    <vs-th>DISCOUNT</vs-th>
                    <vs-td class="text-success font-bold">{{ getTotalDiscount(cartItems) }} USD</vs-td>
                  </vs-tr>
                  <vs-tr>
                    <th>TOTAL</th>
                    <td >{{ totalPrice }} USD</td>
                  </vs-tr>
                </vs-table>

                <vs-button
                  class="mt-3 ml-auto flex"
                  @click.prevent="submitNewAddressForm"
                >SAVE AND DELIVER HERE</vs-button>
              </div>
            </vx-card>
          </div>

          <!-- RIGHT COL: CONTINUE WITH SAVED ADDRESS -->
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card title="John Doe">
              <div>
                <p>9447 Glen Eagles Drive</p>
                <p>Lewis Center, OH 43035</p>
                <p class="my-4">UTC-5: Eastern Standard Time (EST)</p>
                <p>202-555-0140</p>
              </div>

              <vs-divider />

              <vs-button
                class="w-full"
                @click="$refs.checkoutWizard.nextTab()"
              >DELIVER TO THIS ADDRESS</vs-button>
            </vx-card>
          </div>
        </div>
      </tab-content>

      <!-- tab 3 content -->
      <tab-content title="Payment" icon="feather icon-credit-card" class="mb-5">
        <div class="vx-row">
          <!-- LEFT COL: PAYMENT OPTIONS -->
          <div class="vx-col lg:w-2/3 w-full">
            <vx-card
              title="Payment Options"
              subtitle="Be sure to click on correct payment option"
              class="mb-base"
            >
              <div class="mt-3">
                <ul>
                  <!-- OPTION 1 -->
                  <li>
                    <!-- CARD DETAILS -->
                    <div class="flex flex-wrap justify-between items-center">
                      <vs-radio v-model="paymentMethod" vs-value="debit-card">
                        <div class="flex items-center">
                          <img
                            src="@/assets/images/pages/orders/bank.png"
                            alt="bank-logo"
                            height="40"
                            width="50"
                            class="inline-flex"
                          />
                          <span>US Unlocked Debit Card 12XX XXXX XXXX 0000</span>
                        </div>
                      </vs-radio>
                      <span>John Doe</span>
                      <span>11/2020</span>
                    </div>

                    <!-- CVV BLOCK -->
                    <form data-vv-scope="cvv-form">
                      <div class="flex items-center flex-wrap">
                        <span class="mt-4">Enter CVV:</span>
                        <vs-input
                          v-validate="'required|digits:3'"
                          name="cvv"
                          v-model="cvv"
                          class="mr-3 ml-2 mt-4"
                        />
                        <vs-button
                          class="mt-4"
                          @click.prevent="makePayment"
                          :disabled="false"
                        >CONTINUE</vs-button>
                      </div>
                      <span
                        v-show="errors.has('cvv-form.cvv')"
                        class="text-danger ml-24"
                      >{{ errors.first('cvv-form.cvv') }}</span>
                    </form>
                  </li>

                  <vs-divider class="my-6" />

                  <!-- OPTION 2 -->
                  <li>
                    <vs-radio
                      v-model="paymentMethod"
                      vs-value="credit-debit-atmCard"
                    >Credit / Debit / ATM Card</vs-radio>
                  </li>

                  <!-- OPTION 3 -->
                  <li class="mt-2">
                    <vs-radio v-model="paymentMethod" vs-value="nUSDanking">Net Banking</vs-radio>
                  </li>

                  <!-- OPTION 4 -->
                  <li class="mt-2">
                    <vs-radio v-model="paymentMethod" vs-value="emi">EMI (Easy Installment)</vs-radio>
                  </li>

                  <!-- OPTION 5 -->
                  <li class="mt-2">
                    <vs-radio v-model="paymentMethod" vs-value="cashOnDelivery">Cash On Delivery</vs-radio>
                  </li>
                </ul>

                <vs-divider />

                <!-- GIFT CARD -->
                <div class="inline-flex items-center cursor-pointer">
                  <feather-icon icon="PlusSquareIcon" class="mr-2" svgClasses="h-6 w-6" />
                  <span>Add Gift Card</span>
                </div>
              </div>
            </vx-card>
          </div>

          <!-- RIGHT COL: PRICE -->
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card title="Price Details">
              <div class="flex justify-between mb-2">
                <span>Price 3 Items</span>
                <span class="font-semibold">$699.30</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Delivery Charges</span>
                <span class="text-success">Free</span>
              </div>

              <vs-divider />

              <div class="flex justify-between">
                <span>Amount Payable</span>
                <span class="font-semibold">$699.30</span>
              </div>
            </vx-card>
          </div>
        </div>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
// import { print } from "util";
const CheckoutView = () => import("./components/CheckoutView.vue");
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  data() {
    return {
      //TAb 1
      quantity: new Array(this.$store.state.eCommerce.cartItems.length).fill(1),
      totalPrice: "",
      // TAB 2
      deliveryAddress: "",
      deliveryTime: "",
      deliveryDatetime: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        position: "auto"
      },
      invoiceData: {
        tasks: [
          {
            id: 1,
            task: "Website Redesign",
            hours: 60,
            rate: 15,
            amount: 90000
          },
          {
            id: 2,
            task: "Newsletter template design",
            hours: 20,
            rate: 12,
            amount: 24000
          }
        ],
        subtotal: 114000,
        discountPercentage: 5,
        discountedAmount: 5700,
        total: 108300
      },
      fullName: "",
      mobileNum: "",
      pincode: "",
      houseNum: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      addressType: 1,
      addressTypeOptions: [
        { text: "Home", value: 1 },
        { text: "Office", value: 2 }
      ],

      // TAB 3
      paymentMethod: "debit-card",
      cvv: ""
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.eCommerce.cartItems.slice().reverse();
    },
    isInWishList() {
      return itemId => this.$store.getters["eCommerce/isInWishList"](itemId);
    }
  },
  methods: {
    // TAB 1
    removeItemFromCart(item) {
      this.$store.dispatch("eCommerce/toggleItemInCart", item);
    },
    wishListButtonClicked(item) {
      // Toggle in Wish List
      if (this.isInWishList(item.objectID))
        this.$router.push("/apps/orders/wish-list");
      else {
        this.toggleItemInWishList(item);
        this.removeItemFromCart(item);
      }
    },
    toggleItemInWishList(item) {
      this.$store.dispatch("eCommerce/toggleItemInWishList", item);
    },
    updateItemQuantity(event, index) {
      const itemIndex = Math.abs(index + 1 - this.cartItems.length);
      this.$store.dispatch("eCommerce/updateItemQuantity", {
        quantity: event,
        index: itemIndex
      });
      console.log(index);
    },
    getTotalPrice(cartItems) {
      var price = [];
      for (let index = 0; index < cartItems.length; index++) {
        price.push(cartItems[index].sellPrice * this.quantity[index]);
        // this.totalPrice += cartItems[index].sellPrice
      }
      this.totalPrice = price.reduce((a, b) => a + b, 0);
      return this.totalPrice;
    },
    getTotalDiscount(cartItems) {
      var totalDiscount = [];
      for (let index = 0; index < cartItems.length; index++) {
        // price.push(cartItems[index].sellPrice * this.quantity[index]);
        // this.totalPrice += cartItems[index].sellPrice
        totalDiscount.push(this.quantity[index] * cartItems[index].discountAmount);
      }
      console.log(totalDiscount.reduce((a, b) => a + b, 0));
      return totalDiscount.reduce((a,b) => a+b,0);
    },

    // TAB 2
    submitNewAddressForm() {
      return new Promise(() => {
        this.$validator.validateAll("add-new-address").then(result => {
          if (result) {
            // if form have no errors
            this.$refs.checkoutWizard.nextTab();
          } else {
            this.$vs.notify({
              title: "Error",
              text: "Please enter valid details",
              color: "warning",
              iconPack: "feather",
              icon: "icon-alert-circle"
            });
          }
        });
      });
    },

    // TAB 3
    makePayment() {
      return new Promise(() => {
        this.$validator.validateAll("cvv-form").then(result => {
          if (result) {
            // if form have no errors
            this.$vs.notify({
              title: "Success",
              text: "Payment received successfully",
              color: "success",
              iconPack: "feather",
              icon: "icon-check"
            });
          } else {
            this.$vs.notify({
              title: "Error",
              text: "Please enter valid details",
              color: "warning",
              iconPack: "feather",
              icon: "icon-alert-circle"
            });
          }
        });
      });
    }
  },
  components: {
    CheckoutView,
    flatPickr,
    FormWizard,
    TabContent
  }
};
</script>

<style lang="scss" scoped>
#ecommerce-checkout-demo {
  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
  }

  .item-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
  }

  .vue-form-wizard {
    /deep/ .wizard-header {
      padding: 0;
    }

    /deep/ .wizard-tab-content {
      padding-right: 0;
      padding-left: 0;
    }
    .centerTitle {
      text-align: center;
    }
    .strike {
      text-decoration: line-through;
    }
  }
}
</style>
