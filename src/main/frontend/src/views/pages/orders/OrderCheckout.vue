<template>
  <div id="ecommerce-checkout-demo">
    <!-- style="margin-top:-100px; margin-left:-25px;" -->
    <form-wizard ref="checkoutWizard" color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null"
      :hide-buttons="true">
      <tab-content :title="$t('Cart')" icon="feather icon-shopping-cart">
        <div class="vx-row" v-if="cartItems.length">
          <div class="vx-col lg:w-1/2 w-full relative">
            <div class="items-list-view" v-for="(item, index) in cartItems" :key="item.inventoryId">
              <CheckoutView :item="item">
                <template slot="item-meta">
                  <h6 class="item-name font-semibold mb-1">{{ item.inventoryGenericName }} {{ item.dosageForm != null ?
                      item.dosageForm : ""
                  }} {{ +item.strength != null ? item.strength : "" }}</h6>
                  <p class="text-sm mb-2 cursor-pointer" v-if="item.inventoryBrandName">
                    <span class="text-primary font-semibold">{{ item.inventoryBrandName }}</span>
                  </p>
                  <span class="mt-4 font-bold text-sm">{{ $t('Quantity') }}</span>&nbsp;
                  <vs-input-number min="1" :value="item.quantity" @input="updateItemQuantity($event, index)"
                    class="inline-flex" />
                </template>
                <template slot="sellPrice">
                  <div class="my-2 centerTitle">
                    <del class="strike font-bold">{{ ((item.sellPrice +
                        item.discountAmount * item.sellPrice / 100) * item.quantity).toLocaleString('en-US')
                    }}
                      USD</del>&nbsp;
                    <span class="text-center font-bold text-success font-bold">{{ (item.sellPrice *
                        item.quantity).toLocaleString('en-US')
                    }}
                      USD</span>
                  </div>
                </template>
                <template slot="action-buttons" @click="removeItemFromCart(item)">
                  <div
                    class="item-view-primary-action-btn bg-grey p-1 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-1"
                    @click="removeItemFromCart(item)">
                    <feather-icon icon="XIcon" class="text-black" svgClasses="h-4 w-4" />
                    <span class="text-sm font-semibold ml-25 text-black">{{ $t('remove') }}</span>
                  </div>
                </template>
              </CheckoutView>
            </div>
          </div>
          <div class="vx-col lg:w-1/2 w-full">
            <vx-card>
              <h5 class="mb-3 bg-grey rounded-lg text-center py-2">{{ $t('priceDetails') }}</h5>
              <vs-table hoverFlat :data="cartItems" class="text-black">
                <template slot="thead">
                  <vs-th>#</vs-th>
                  <vs-th>{{ $t('genericName') }}</vs-th>
                  <vs-th v-if="checkIfOrder(cartItems)">{{ $t('orderQuantity') }}</vs-th>
                  <vs-th v-if="checkIfPreorder(cartItems)">{{ $t('preOrderQuantity') }}</vs-th>
                  <!-- v-if="!checkIfPreorder(cartItems)" -->
                  <vs-th>
                    {{ $t('unitPrice') }}
                    <i class="fas fa-parking-circle"></i>
                  </vs-th>
                  <vs-th>{{ $t('subTotal') }}</vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr v-for="(tr, index) in data" :key="index">
                    <vs-td class="py-0 text-left" :data="index">{{ index + 1 }}</vs-td>
                    <vs-td>{{ data[index].inventoryGenericName }} {{ data[index].dosageForm != null ?
                        data[index].dosageForm : ""
                    }} {{ +data[index].strength != null ? data[index].strength : "" }}
                    </vs-td>
                    <vs-td v-if="checkIfOrder(cartItems) && data[index].quantity <= data[index].availableQuantity">x{{
                        data[index].quantity
                    }}
                    </vs-td>
                    <vs-td v-else-if="checkIfOrder(cartItems) && data[index].quantity > data[index].availableQuantity">
                      x{{
                          data[index].availableQuantity
                      }}
                    </vs-td>
                    <vs-td
                      v-if="checkIfPreorder(cartItems) && data[index].quantity - data[index].availableQuantity > 0">{{
                          data[index].quantity -
                          data[index].availableQuantity
                      }}</vs-td>
                    <vs-td
                      v-else-if="checkIfPreorder(cartItems) && data[index].quantity - data[index].availableQuantity <= 0">
                      x0</vs-td>
                    <vs-td>{{ data[index].sellPrice.toLocaleString('en-US') }} USD</vs-td>
                    <vs-td>{{ (data[index].sellPrice * data[index].quantity).toLocaleString('en-US') }} USD</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
              <!-- <div> -->
              <vs-table hoverFlat class="w-3/4 ml-auto mt-4 text-black" :data="cartItems">
                <vs-tr>
                  <th>{{ $t('TOTAL') }}</th>
                  <td>{{ totalPrice.toLocaleString('en-US') }} USD</td>
                </vs-tr>
                <vs-tr>
                  <vs-th>{{ $t('TAX') }}(5%)</vs-th>
                  <vs-td>{{ (0.05 * totalPrice).toLocaleString('en-US') }} USD
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <th>{{ $t('grandTotal') }}</th>
                  <td v-if="totalPrice != ''" class="font-bold text-black">{{ (totalPrice + totalPrice *
                      0.05).toLocaleString('en-US')
                  }} USD</td>
                </vs-tr>
              </vs-table>
        
              <div class="vx-row">

                <div class="vx-col lg:w-1/2">

<vs-button
@click="goToCheckout()"
>
Make payment
</vs-button>
</div>

          <div class="vx-col lg:w-1/2">

            <vs-button @click="$refs.checkoutWizard.nextTab()">
                {{ $t('CONTINUE') }}</vs-button>

            
            </div>


            </div>
    

            </vx-card>
          </div>
        </div>


        <!-- deleted the else -->
        <vx-card v-if="cartItems.length == 0" :title="$t('youDontHaveCart')">
          <vs-button @click="$router.push('/pages/orders/shop')">{{ $t('Browse Product To Order') }}</vs-button>
        </vx-card>
        <vx-card v-else>
          <vs-button @click="$router.push('/pages/orders/shop')">{{ $t('Browse Product To Order') }}</vs-button>
        </vx-card>
      </tab-content>

      <tab-content :title="$t('Order')" icon="feather icon-truck" class="mb-5">
        <div class="vx-row">
          <!-- LEFT COL: NEW ADDRESS -->
          <div class="vx-col lg:w-2/3 w-full">
            <vx-card class="mb-base">
              <form data-vv-scope="add-new-address">
                <vs-alert v-if="amountChecker != 0" color="danger" icon-pack="feather" icon="icon-info">
                  <span>{{ amountChecker }}</span>
                </vs-alert>
             
             
              </form>
              <div class="p-base">
                <vs-table hoverFlat :data="cartItems" class="text-black">
                  <template slot="thead">
                    <vs-th>#</vs-th>
                    <vs-th>{{ $t('genericName') }}</vs-th>
                    <vs-th v-if="checkIfOrder(cartItems)">{{ $t('orderQuantity') }}</vs-th>
                    <vs-th v-if="checkIfPreorder(cartItems)">{{ $t('preOrderQuantity') }}</vs-th>
                    <vs-th>
                      {{ $t('unitPrice') }}
                      <i class=" fas fa-parking-circle"></i>
                    </vs-th>
                    <vs-th>{{ $t('subTotal') }}</vs-th>
                  </template>
                  <template slot-scope="{data}">
                    <vs-tr v-for="(tr, index) in data" :key="index">
                      <vs-td class="py-0 text-left" :data="index">{{ index + 1 }}</vs-td>
                      <vs-td>{{ data[index].inventoryGenericName }} {{ data[index].dosageForm != null ?
                          data[index].dosageForm : ""
                      }} {{ +data[index].strength != null ? data[index].strength : "" }}
                      </vs-td>
                      <vs-td>x{{
                          data[index].quantity
                      }}
                      </vs-td>
            
                      <vs-td>{{ data[index].sellPrice.toLocaleString('en-US') }}</vs-td>
                      <vs-td>{{ (data[index].sellPrice * data[index].quantity).toLocaleString('en-US') }}</vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
                <!-- <div> -->
                <vs-table hoverFlat class="w-3/5 ml-auto mt-4 text-black" :data="cartItems">
                  <vs-tr>
                    <th>{{ $t('TOTAL') }}</th>
                    <td>{{ totalPrice.toLocaleString('en-US') }} USD</td>
                  </vs-tr>
                  <vs-tr>
                    <vs-th>{{ $t('TAX') }}(5%)</vs-th>
                    <vs-td>{{ (totalPrice * 0.05).toLocaleString('en-US') }} USD</vs-td>
                  </vs-tr>
                  <vs-tr>
                    <th>{{ $t('grandTotal') }}</th>
                    <td>

                      <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>


                      {{ (getTotalPrice(cartItems) + (totalPrice * 0.05)).toLocaleString('en-US') }}
                      {{ $t('USD') }}

                    </td>
                  </vs-tr>
                </vs-table>
                mmmmmmmmmmmmmmmmmmm
              </div>
            </vx-card>
          </div>
          <div class="vx-col lg:w-1/3 w-full">
            <vx-card>
            
              <vs-divider />
              <div >
                <vs-button class="w-full"
                  @click="showConfirmation = true, calculatePreOrderQuantity()">{{ $t('CONTINUE') }}</vs-button>
         
              </div>
            </vx-card>

            <vs-popup class="holamundo" :title="$t('orderedProducts')" :active.sync="showConfirmation">

              <h4 style="margin-top:-10px;">
                <strong>{{ $t('customerConfirmationText') }}</strong>
              </h4>
           
              <vs-table class="stripe" hoverFlat :max-items="perPage" :data="cartItems">

                <template slot="thead">
                  <vs-th sort-key="number">#</vs-th>
                  <vs-th class="lg:w-1/2" sort-key="itemName">{{ $t('itemName') }}</vs-th>
                  <vs-th class="lg:w-1/2" v-if="!checkOrderQuantity() && checkPreOrderQuantity()"
                    sort-key="orderQuantity">{{ $t('orderQuantity') }}</vs-th>
                  <vs-th class="lg:w-1/4" v-else-if="!checkOrderQuantity() && !checkPreOrderQuantity()"
                    sort-key="orderQuantity">{{ $t('orderQuantity') }}</vs-th>
                  <vs-th class="lg:w-1/4" v-else-if="checkOrderQuantity() && !checkPreOrderQuantity()"
                    sort-key="orderQuantity">{{ $t('orderQuantity') }}</vs-th>

                  <!-- <vs-th class="lg:w-1/4" v-if="" sort-key="quantityInStock">{{$t('quantityInStock')}}</vs-th> -->
                  <vs-th class="lg:w-1/4" v-if="!checkOrderQuantity() && !checkPreOrderQuantity() || isPreOrder2"
                    sort-key="preOrderQuantity">{{ $t('preOrderQuantity') }}</vs-th>
                  <vs-th class="lg:w-1/2" v-else-if="checkOrderQuantity() && !checkPreOrderQuantity() || isPreOrder2"
                    sort-key="order">{{ $t('preOrderQuantity') }}</vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td class="w-10">{{ indextr + 1 }}</vs-td>

                    <vs-td class="lg:w-1/2">{{ inventoryName(tr) }}</vs-td>
                    <vs-td class="lg:w-1/4" v-if="tr.tempQuantity != 0">{{ +tr.tempQuantity }}</vs-td>
                    <vs-td class="lg:w-1/4" v-else>{{ $t('noQuantityInStock') }}</vs-td>

                    <vs-td class="lg:w-1/4">
                      <div v-if="tr.preOrderQuantity != 0 && tr.preOrderQuantity != null || isPreOrder2">
                        <vs-input-number min="1" class="mr-6 ml-4" v-model="tr.preOrderQuantity" size="small"
                          color="primary" @input="getTotalPrice(cartItems), isPreOrder23()" />
                      </div>
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
              <vs-table hoverFlat class="" :data="cartItems">

                <vs-tr>
                  <th>{{ $t('TOTAL') }}</th>
                  <td>{{ totalPrice.toLocaleString('en-US') }} Birr</td>
                </vs-tr>
                <vs-tr>
                  <vs-th>{{ $t('TAX') }}(5%)</vs-th>
                  <vs-td>{{ (totalPrice * 0.05).toLocaleString('en-US') }} Birr</vs-td>
                </vs-tr>
                <vs-tr>
                  <th>{{ $t('grandTotal') }}</th>
                  <td v-if="totalPrice != ''" class="font-bold text-black">{{ (totalPrice +
                      (totalPrice * 0.05)).toLocaleString('en-US')
                  }} Birr</td>
                </vs-tr>
              </vs-table>
              <div class="flex items-stretch mt-5">
                <vs-button class="flex-1" icon="icon-check-circle" icon-pack="feather" color="success" type="filled"
                  @click.prevent="showConfirmation = false, orderInventory(cartItems)">{{ $t('Confirm') }}</vs-button>

                <vs-button class="flex-1" icon="icon-x" icon-pack="feather" color="dark" type="border"
                  @click="cancelOrder()">{{ $t('Cancel') }}</vs-button>
              </div>
            </vs-popup>
          </div>
        </div>
      </tab-content>

      <tab-content :title="$t('Confirmation')" icon="feather icon-pocket" class="mb-5">
        <div id="invoice-page">
          <div class="vx-row leading-loose px-5">
            <vs-col>
              <vs-row>
                <vs-chip color="success">
                  <vs-avatar icon-pack="feather" icon="icon-message-square" color="success" size="30px" />
                  <h5 class="text-white">Dear customer your products have been succesfully ordered. Thank you for
                    ordering with us.</h5>
                </vs-chip>
                <vs-button color="dark" type="border" @click="navigateToShop(cartItems)" icon-pack="feather"
                  class="text-center text-black" icon="icon-x">Close</vs-button>
              </vs-row>
            </vs-col>
            <div class="vx-col w-full lg:w-1/2 mb-base p-5">
              <vx-card title="Ordered Items">
                <vs-table hoverFlat :data="orderResponse.cartItems">
                  <template slot="thead">
                    <vs-th>ITEM</vs-th>
                    <vs-th>QUANTITY</vs-th>
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr v-for="(tr, index) in data" :key="index">
                      <vs-td>{{ data[index].inventoryGenericName }}</vs-td>
                      <vs-td>x{{ data[index].quantity }}</vs-td>
                      <vs-td>{{ data[index].sellPrice * quantity[index] }}</vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </vx-card>
            </div>

            <div class="vx-col w-full lg:w-1/2 mb-base mt-5">
              <vx-card title="Order Details">
                <ul class="activity-timeline">
                  <li>
                    <div class="timeline-icon bg-warning">
                      <feather-icon icon="HashIcon" svgClasses="text-white stroke-current w-5 h-5"></feather-icon>
                    </div>
                    <div class="timeline-info">
                      <p class="font-semibold">Order Number</p>
                      <span class="activity-desc">This is your unique order number to follow up on your products
                        .</span>
                      <h6 class="text-black">
                        Order Number:
                        <b class="rounded-full bg-grey py-2 px-4 text-black">{{ orderResponse.orderNumber }}</b>
                      </h6>
                    </div>
                  </li>

                  <li>
                    <div class="timeline-icon bg-primary">
                      <feather-icon icon="InfoIcon" svgClasses="text-white stroke-current w-5 h-5"></feather-icon>
                    </div>
                    <div class="timeline-info">
                      <p class="font-semibold">Order Status</p>
                      <span class="activity-desc">
                        Your products are now
                        <b>ordered</b> and ready for shipment .
                      </span>
                    </div>
                  </li>
                  <li>
                    <div class="timeline-icon bg-danger">
                      <feather-icon icon="MapPinIcon" svgClasses="text-white stroke-current w-5 h-5"></feather-icon>
                    </div>
                    <div class="timeline-info">
                      <p class="font-semibold">Delivery Address</p>
                      <h5 class="text-black">
                        <small>Delivery Location:</small>
                        <b class="py-2 px-4 text-black">{{ orderResponse.deliveryAddress }}</b>
                      </h5>
                    </div>
                  </li>
                  <li>
                    <div class="timeline-icon bg-success">
                      <feather-icon icon="ClockIcon" svgClasses="text-white stroke-current w-5 h-5"></feather-icon>
                    </div>
                    <div class="timeline-info">
                      <p class="font-semibold">Delivery Date</p>
                      <h6 class="font-bold py-2 px-4 text-black">{{ orderResponse.deliveryTime | date2() }}</h6>&nbsp;
                    </div>
                  </li>
                </ul>
              </vx-card>
            </div>
          </div>
        </div>
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
const CheckoutView = () => import("./components/CheckoutView.vue");
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VSelect from "vue-select";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    orderStatusType: {
      required: "Please select payment option",
    },
    orderTypeId: {
      required: "Please select how to get your order",
    },



  }
};
export default {
  data() {
    return {
      trialOrder:[],
      orderStatusTypeId: "",
      creditAmount: "",
      amountToBePaid: "",
      amountChecker: "",
      paymentOptions: ["In Cash", "Post Paid", "Partial Paid"],
      paymentOption: "",
      options: ["Delivery", "Pickup"],
      pickupAddresses: [],
      pickupAddress: "",
      quantity: new Array(this.$store.state.eCommerce.cartItems.length).fill(1),
      totalPrice: "",
      companyInfo: {},
      showConfirmation: false,
      companyAddress: "companyAddress",
      deliveryAddress: "",
      deliveryTime: "",
      deliveryDateTime: "",
      filteredAdderess: [],
      orderDateTime: "",
      configdateTimePicker: {
        enableTime: true,
        dateFormat: "Y-m-dTH:i",
      },
      user: {},
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
      isOrdered: false,
      orderResponse: {},
      orderDetails: [],
      isLoading: false,
      fullPage: false,
      paymentMethod: "debit-card",
      isPreOrder: false,
      orderTypes: [],
      x: 20,
      y: 0,
      z: 0,
      cvv: "",
      orderStatusTypes: [],
      orderTypeId: "",
      orderStatusType: "",
      orderType: "",
      isPreOrder2: false,

      stripeAPIToken: "pk_live_51P9jrC02vf5Db3TzxVShDCkjtkowAMWfA7zWBiWml51w5x2FMPjIrIK1qWRBjcOqWbTWg2DFMXCUWP2pltOrDksm00YOPYqEOu",
      stripe: '',
      token: null,
      sessionId: null,
      checkoutBodyArray: [],
      inventoryNameToSell:""
    };
  },
  created() {
    this.getUserId();
    this.getSites();
    this.getOrderTypes();
  },
  computed: {
    cartItems() {
      return this.$store.state.eCommerce.cartItems.slice().reverse();
    },
    isInWishList() {
      return itemId => this.$store.getters["eCommerce/isInWishList"](itemId);
    }
  },

  mounted() {
    // get the token
    this.token = localStorage.getItem('accessToken');
    // get all the cart items
    this.stripe = Stripe(this.stripeAPIToken);
  },
  methods: {


    checkIfOrder(items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].availableQuantity > 0) {
          return true;
        }
      }
      return false;
    },
    checkIfPreorder(items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].quantity - items[i].availableQuantity > 0) {
          return true;
        }
      }
      return false;
    },
    selectAdress(siteId) {
      this.filteredAdderess = this.pickupAddresses.filter(c => c.siteId == siteId);
    },
    isPreOrder23() {
      this.isPreOrder2 = true;
    },
    assignOrderStatusType(orderStatusTypeId) {

      this.orderStatusType = this.orderStatusTypes.find(ost => ost.orderStatusTypeId == orderStatusTypeId).orderStatusType;
    },
    featchOrderStatusTypes(orderTypeId) {
      this.orderType = this.orderTypes.find(ot => ot.orderTypeId == orderTypeId).orderType;

      this.$http
        .get(`/order-type-status-type`, {
          params: {
            orderTypeId: orderTypeId
          }
        })
        .then(response => {
          this.orderStatusTypes = response.data;
          this.totalPage = response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    getOrderTypes() {
      this.$http
        .get(`/order-type`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey
          }
        })
        .then(response => {
          this.orderTypes = response.data;
          this.orderTypeId = this.orderTypes.find(ost => ost.orderType == 'Pick Up').orderTypeId;
          this.totalPage = this.orderTypes.find(ost => ost.orderType == 'Pick Up').totalPage;
          this.isLoading = false;
          this.featchOrderStatusTypes(this.orderTypeId);
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    checkPreOrderQuantity() {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].preOrderQuantity > 0) {
          return false;
        }
      }
      return true;
    },

    checkOrderQuantity() {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].tempQuantity > 0) {
          return false;
        }
      }
      return true;
    },
    calculatePreOrderQuantity() {
      var inventoryIds = [];
      for (let i = 0; i < this.cartItems.length; i++) {
        inventoryIds.push(this.cartItems[i].inventoryId);
      }

      this.$http.get("/inventory/selected-items", { params: { inventoryIds: inventoryIds.join(',') } })
        .then(response => {

          this.orderResponse = response.data;
          for (let j = 0; j < response.data.length; j++) {
            if (this.cartItems[j].quantity > response.data.find(rd => rd.inventoryId == this.cartItems[j].inventoryId).availableQuantity) {
              this.cartItems[j].preOrderQuantity = this.cartItems[j].quantity - response.data.find(rd => rd.inventoryId == this.cartItems[j].inventoryId).availableQuantity;
              this.cartItems[j].tempQuantity = response.data.find(rd => rd.inventoryId == this.cartItems[j].inventoryId).availableQuantity;
            }
            else {
              this.cartItems[j].tempQuantity = this.cartItems[j].quantity;

            }

          }

          this.$store.dispatch("invoice/insertOrder", response.data);
          this.isLoading = false;
          // this.$vs.notify({
          //   title: "Notification",
          //   text: "Order successful",
          //   color: "success",
          //   position: "top-right"
          // });
        });
    },
    acceptAlert(color) {
      this.updateItemQuantity(this.x + this.y, this.z);
      this.$vs.notify({
        color: 'success',
        title: 'Accept Selected',
        text: 'Lorem ipsum dolor sit amet, consectetur'
      });
      this.isPreOrder = false;
      this.y = 0;
    },
    close() {
      this.y = 0;
      this.updateItemQuantity(this.x, this.z);
      this.$vs.notify({
        color: 'danger',
        title: 'Closed',
        text: 'You close a dialog!'
      })
    },

    cancel() {
      this.y = 0;
      this.updateItemQuantity(this.x, this.z);
      this.$vs.notify({
        color: 'danger',
        title: 'Closed',
        text: 'You close a dialog!'
      })
    },
    checkAmount() {
      this.creditAmount = (parseInt(this.totalPrice) + parseInt(this.totalPrice * 0.05)) - this.amountToBePaid;
      if ((parseInt(this.totalPrice) + parseInt(this.totalPrice * 0.05)) == (parseInt(this.creditAmount) + parseInt(this.amountToBePaid)))
        this.amountChecker = "";
      else if (this.creditAmount != "" && this.amountToBePaid != "")
        this.amountChecker = "Sum of the credit amount and amount to be paid should be equal with the total price";
      else
        this.amountChecker = "";
    },
    getSites() {
      this.$http
        .get(`/stock-site`, {
          params: {
          }
        })
        .then(response => {
          this.pickupAddresses = response.data;
        })
        .catch(error => {
        });
    },
    inventoryName(item) {
      this.inventoryNameToSell = item.inventoryGenericName;
      return (
        item.inventoryGenericName +
        " " +
        (item.dosageForm != null ? item.dosageForm : "") +
        " " +
        (item.strength != null ? item.strength : "")
      );
    },
    removeItemFromCart(item) {
      this.$store.dispatch("eCommerce/toggleItemInCart", item);
      var cartItems = JSON.parse(localStorage.getItem("cartItems"));
      const index = cartItems.findIndex(i => i.inventoryId == item.inventoryId);
      if (index < 0) {
        cartItems.push(item);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
    },
    wishListButtonClicked(item) {
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
    //==================updated================
    updateItemQuantity(event, index) {
      if (event > this.x) {
        this.isPreOrder = true;
        this.y = event - this.x;
        this.z = index;
      }
      const itemIndex = Math.abs(index + 1 - this.cartItems.length);
      this.$store.dispatch("eCommerce/updateItemQuantity", {
        quantity: event,
        index: itemIndex
      });
    },
    getTotalPrice(cartItems) {
      var price = [];
      for (let index = 0; index < cartItems.length; index++) {
        if (cartItems[index].tempQuantity != 0 && cartItems[index].tempQuantity != null) {
          if (cartItems[index].preOrderQuantity != 0 && cartItems[index].preOrderQuantity != null)
            price.push(cartItems[index].sellPrice * cartItems[index].tempQuantity + cartItems[index].sellPrice * cartItems[index].preOrderQuantity);
          else
            price.push(cartItems[index].sellPrice * cartItems[index].tempQuantity);

        }
        else {
          price.push(cartItems[index].sellPrice * cartItems[index].quantity);

        }
      }
      this.totalPrice = price.reduce((a, b) => a + b, 0);

      return this.totalPrice;
    },
    getTotalDiscount(cartItems) {
      var totalDiscount = [];
      for (let index = 0; index < cartItems.length; index++) {
        if (cartItems[index].tempQuantity != 0 && cartItems[index].tempQuantity != null) {
          if (cartItems[index].preOrderQuantity != 0 && cartItems[index].preOrderQuantity != null) {
            totalDiscount.push(this.cartItems[index].tempQuantity * cartItems[index].discountAmount + this.cartItems[index].preOrderQuantity * cartItems[index].discountAmount);
          }
          else
            totalDiscount.push(this.cartItems[index].tempQuantity * cartItems[index].discountAmount)
        }
        else
          totalDiscount.push(this.cartItems[index].quantity * cartItems[index].discountAmount);
      }
      return totalDiscount.reduce((a, b) => a + b, 0);
    },

    cancelOrder() {
      this.showConfirmation = false;
      this.$vs.notify({
        title: "Notification",
        text: "Confirmation canceled!",
        color: "warning",
        position: "top-right"
      });
    },
    submitNewAddressForm(cartItems) {
      return new Promise(() => {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.showConfirmation = true;

          } else {
            this.$vs.notify({
              title: "Error",
              text: "Please enter required details",
              color: "warning",
              iconPack: "feather",
              position: "top-right",
              icon: "icon-alert-circle"
            });
          }
        });
      });
    },
    getUserId: function () {
      let userId = localStorage.getItem("userId");
      this.$http.get(`/accounts/${userId}`).then(response => {
        this.user = response.data;
        this.$http.get(`/company/${this.user.companyId}`).then(response => {
          this.companyInfo = response.data;
          console.log(response.data);
        });
        console.log(response.data);
      });
    },

    navigateToShop(cartItems) {

      this.$router.push({
        path: "/pages/invoice/" + this.orderResponse.orderId
      });
    },

    getDateFormatted(date) {
      return new Date(date).toLocaleDateString(['en-US'], { timeZone: "Africa/Nairobi", month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    },

    goToCheckout(){

      let userId = localStorage.getItem("userId");

        for (let i = 0; i < this.cartItems.length; i++)
              this.checkoutBodyArray.push({
                imageUrl: null,
                productName: this.inventoryNameToSell,
                quantity: this.cartItems[i].quantity,
                price: this.cartItems[i].sellPrice,
                productId: this.cartItems[i].inventoryId,
                userId: 1,
              });
      
      this.$http
        .post('order/create-checkout-session',
          this.checkoutBodyArray
        )
        .then((response) => {
          localStorage.setItem('sessionId', response.data.sessionId);
          return response.data;
        })
        .then((session) => {
          return this.stripe.redirectToCheckout({
            sessionId: session.sessionId,
          });
        });
    
    },

    configureStripe() {},

    orderInventory(cartItems) {

      let userId = localStorage.getItem("userId");
      for (let index = 0; index < cartItems.length; index++) {
        let orderDetail = {};
        orderDetail["inventoryId"] = cartItems[index].inventoryId;
        orderDetail["orderQuantity"] = cartItems[index].tempQuantity;
        orderDetail["unitPrice"] = cartItems[index].sellPrice;
        this.orderDetails.push(orderDetail);
      }
      // var tempOrderDateTime = this.getDateFormatted(new Date());
      var tempDeliveryDateTime = this.getInstantFromDate(this.deliveryDateTime);
      this.isLoading = true;
      this.$validator.validateAll().then(site => {
        if (site) {
          this.$http
            .post("/order", {
              companyId: this.user.companyId,
              userId,
              totalPrice: (this.totalPrice + this.totalPrice * 0.05).toFixed(2),
              amountTobePaid: this.amountToBePaid,
              creditAmount: this.creditAmount,
              orderItems: this.orderDetails,
          

            })
            .then(response => {
              this.orderResponse = response.data;
              this.trialOrder = response.data;
              this.orderResponse["cartItems"] = cartItems;


              this.$store.dispatch("invoice/insertOrder", response.data);
              this.isLoading = false;
              this.$vs.notify({
                title: "Notification",
                text: "Order successful",
                color: "success",
                position: "top-right"
              });
              this.$router.push({ path: "/pages/invoice/" + response.data.orderId });
              this.isOrdered = true;
              for (let index = 0; index < this.orderDetails.length; index++) {
                this.$store.dispatch(
                  "eCommerce/toggleItemInCart",
                  cartItems[index]
                );
              }
              localStorage.removeItem("cartItems");

            })
            .catch(_ => {
              this.isLoading = false;
            });

        }
      });
    }


  },
  components: {
    CheckoutView,
    flatPickr,
    FormWizard,
    TabContent,
    Loading,
    VSelect
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
      align-self: auto;
      text-align: center;
    }

    .strike {
      text-decoration: line-through;
    }

    #chip {
      align-items: center;
      align-content: center;
    }
  }
}
</style>
