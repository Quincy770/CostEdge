<!-- =========================================================================================
    File Name: ItemListView.vue
    Description: Item Component - List VIew
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <vx-card class="list-view-item mb-4 overflow-hidden">

        <template slot="no-body">
            <div class="vx-row item-details no-gutter">

                <!-- IMG COL -->
                <div class="
                vx-col sm:w-1/4 w-full item-img-container bg-white flex items-center justify-center">
                    <img
                        src="http://www.drugfreecollier.org/wp-content/uploads/2015/03/pills.jpg"
                        :alt="item.inventoryGenericName"
                        class="grid-view-img p-4">
                </div>

                <!-- ITEM NAME & DESC COL -->
                <div class="vx-col sm:w-1/2">
                    <div class="p-4 pt-6">
                        <slot name="item-meta">
                            <h6 class="item-name font-semibold mb-1">{{ item.inventoryGenericName }}</h6>
                            <p class="text-sm mb-4 cursor-pointer">From <span class="text-primary font-semibold">{{ item.inventoryBrandName }}</span></p>
                            <span class="text-sm mb-4 cursor-pointer">Category {{ item.inventoryType }}</span>
                            <p class="item-description text-sm">{{ item.description }}</p>
                             <span class="text-success text-center text-sm">Available Quantity {{ item.availableQuantity }}</span>
                        </slot>
                    </div>
                </div>
                <!-- PURCHASE COL -->
                <div class="vx-col sm:w-1/4 w-full flex items-center">

                    <div class="p-4 flex flex-col w-full border border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0">

                        <div class="bg-primary flex self-end text-white py-1 px-2 rounded">
                            <span class="text-sm mr-2">{{ item.rating }}</span>
                            <feather-icon icon="StarIcon" svgClasses="h-4 w-4" />
                        </div>

                        <div class="centerTitle">
                            <del class="strike font-bold">{{ item.discountAmount+item.sellPrice}} USD</del><span class="text-center font-bold text-success font-bold"> {{item.sellPrice}} USD</span>
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
export default{
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        isInCart() {
            return (itemId) => this.$store.getters['eCommerce/isInCart'](itemId)
        },
        isInWishList() {
            return (itemId) => this.$store.getters['eCommerce/isInWishList'](itemId)
        },
    },
    methods: {
        toggleItemInWishList(item) {
            this.$store.dispatch('eCommerce/toggleItemInWishList', item)
        },
        additemInCart(item) {
            this.$store.dispatch('eCommerce/additemInCart', item)
        },
        cartButtonClicked(item) {
            if(this.isInCart(item.inventoryId)) this.$router.push('/apps/orders/checkout')
            else this.additemInCart(item)
        }
    }
}
</script>

<style lang="scss" scoped>
.list-view-item {
    .item-name, .item-description {
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
        transition: .35s;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 4px 25px 0px rgba(0,0,0,.25);

        .grid-view-img{
            opacity: 0.9;
        }
    }
    .centerTitle{
      text-align: center
  }
  .strike {
    text-decoration: line-through;
  }
}
</style>
