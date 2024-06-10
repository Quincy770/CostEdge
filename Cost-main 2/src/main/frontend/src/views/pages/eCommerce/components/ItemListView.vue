<!-- =========================================================================================
    File Name: ItemListView.vue
    Description: Item Component - List VIew
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card class="list-view-item mb-1 overflow-hidden">
    <template slot="no-body" class="">
      <!-- style="height:110px; margin-top:-10px;" -->
      <div class="vx-row item-details no-gutter mt-1 grid-list-view-margins">
        <!-- IMG COL -->
        <div class="vx-col sm:w-1/6 w-full h-32 item-img-container bg-white flex items-center justify-center">
          <img v-if="item.inventoryImage" :src="(`${$domain}/inventory-item-images/${item.inventoryImage}`)"
            :alt="item.inventoryBrandName" class="responsive card-img-top grid-view-img p-2" />
          <img v-if="!item.inventoryImage" :src="require(`@/assets/images/inventory-item-images/no_image.png`)"
            :alt="item.inventoryBrandName" class="responsive card-img-top grid-view-img p-2" />
        </div>

        <!-- ITEM NAME & DESC COL -->
        <div class="vx-col sm:w-1/2">
          <!-- style="margin-top:-20px;" -->
          <div class="p-4 pt-6">
            <slot name="item-meta">
              <h5 class="item-name font-semibold mb-1">{{ item.inventoryGenericName }} {{item.dosageForm != null ?
              item.dosageForm : ""}} {{+item.strength != null ? item.strength : "" }}</h5>
              <p class="text-sm cursor-pointer mb-1">
                {{$t('brandName')}}: <span class="text-primary font-semibold">{{ item.inventoryBrandName }}</span>
              </p>
              <span class="cursor-pointer">
                {{$t('category')}}:
                <b>{{ item.inventoryType }}</b>
              </span>
              <p v-if="item.subCategory" class="item-description text-sm">{{$t('subCategory')}} {{ item.subCategory }}
              </p>
              <span v-if="item.volume" class="text-success text-center text-sm">{{$t('volume')}} {{ item.volume
              }}</span>
              <div style="width:30%; float:right;" v-if="isInCart(item.inventoryId)"
                class="bg-grey-light rounded-lg text-white font-bold">

                <vs-input-number min="1"
                  :value="cartItems[cartItems.findIndex(i => i.inventoryId == item.inventoryId)].quantity"
                  @input="updateItemQuantity($event, cartItems.findIndex(i => i.inventoryId == item.inventoryId))"
                  size="medium" color="primary" />
              </div>
              <div v-else class="bg-grey-light rounded-lg text-white font-bold" style="width:30%; float:right;">

                <vs-input-number min="1" class="mr-6 ml-4" v-model="quantity" @input="messageParent()" size="medium"
                  color="primary" />
              </div>
            </slot>
          </div>
        </div>
        <!-- PURCHASE COL -->
        <div class="vx-col sm:w-1/4 w-full flex items-center rounded bg-grey-light">
          <div
            class="p-4 flex flex-col w-full border border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0">


            <div class="my-6 centerTitle">
              <div v-if="isInCart(item.inventoryId)">
                <del class="strike font-bold">{{ ((item.sellPrice*cartItems[cartItems.findIndex(i => i.inventoryId ==
                item.inventoryId)].quantity) +
                ((item.sellPrice*item.discountAmount*0.01*cartItems[cartItems.findIndex(i => i.inventoryId ==
                item.inventoryId)].quantity))).toLocaleString('en-US')}} {{$t('USD')}}</del>&nbsp;
                <span class="text-center font-bold text-success font-bold">{{(item.sellPrice *
                cartItems[cartItems.findIndex(i => i.inventoryId ==
                item.inventoryId)].quantity).toLocaleString('en-US')}} {{$t('USD')}}</span>
              </div>
              <div v-else>
                <del class="strike font-bold">{{ (item.sellPrice +
                item.discountAmount*item.sellPrice*0.01).toLocaleString('en-US')}}
                  {{$t('USD')}}</del>&nbsp;
                <span class="text-center font-bold text-success font-bold">{{ item.sellPrice.toLocaleString('en-US') }}
                  {{$t('USD')}}</span>
              </div>

              <span class="text-grey flex items-start justify-center mt-1" v-if="item.free_shipping">
                <feather-icon icon="ShoppingCartIcon" svgClasses="w-4 h-4" />
                <span class="text-sm ml-2">Free Shipping</span>
              </span>
            </div>

            <!-- SLOT: ACTION BUTTONS -->
            <slot name="action-buttons" />
          </div>
        </div>
      </div>
    </template>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      quantity:''
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    quantityHolder: {
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    isInCart() {
      return itemId => this.$store.getters["eCommerce/isInCart"](itemId);
    },
    isInWishList() {
      return itemId => this.$store.getters["eCommerce/isInWishList"](itemId);
    },
    cartItems() {
      return this.$store.state.eCommerce.cartItems.slice().reverse();
    }
  },
  methods: {
    toggleItemInWishList(item) {
      this.$store.dispatch("eCommerce/toggleItemInWishList", item);
    },
    additemInCart(item) {
      this.$store.dispatch("eCommerce/additemInCart", item);
    },
    cartButtonClicked(item) {
      if (this.isInCart(item.inventoryId))
        this.$router.push("/apps/eCommerce/checkout");
      else this.additemInCart(item);
    },
    updateItemQuantity(event, index) {
      const itemIndex = Math.abs(index + 1 - this.cartItems.length);
      this.$store.dispatch("eCommerce/updateItemQuantity", {
        quantity: event,
        index: itemIndex
      });
    },
    messageParent() {
      this.$emit("messageFromChild", this.quantity, this.index);
    }
  },
  created() {
    this.quantity = this.quantityHolder
  },
};
</script>

<style lang="scss" scoped>
.list-view-item {
  .item-name,
  .item-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-name {
    -webkit-line-clamp: 2;
  }

  .item-description {
    -webkit-line-clamp: 5;
  }

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }
  .centerTitle {
    text-align: center;
  }
  .strike {
    text-decoration: line-through;
  }
}
</style>
