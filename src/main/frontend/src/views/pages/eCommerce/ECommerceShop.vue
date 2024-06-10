<template>
  <div id="algolia-instant-search-demo" class="vs-con-loading__container">
    <div class="algolia-header mb-4">
      <div class="flex lg:hidden md:items-end items-center justify-between flex-wrap">
        <feather-icon class="inline-flex lg:hidden cursor-pointer mr-4" icon="MenuIcon"
          @click.stop="toggleFilterSidebar" />
        <p class="lg:inline-flex hidden font-semibold algolia-filters-label"></p>
        <div class="flex justify-between items-end flex-grow">
          <p class="font-semibold md:block hidden">{{ inventoryItems.length }} {{ $t('resultsFound') }}</p>

          <div class="flex flex-wrap">
            <vs-select class="mr-4 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg w-48"
              v-model="perPage" @change="searchInventory">
              <vs-select-item v-for="page in perPageOptions" :key="page" :value="page" :text="page" />
            </vs-select>

            <div>
              <feather-icon icon="GridIcon" @click="currentItemView = 'item-grid-view'"
                class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden"
                :svgClasses="{ 'text-primary stroke-current': currentItemView == 'item-grid-view' }" />
              <feather-icon icon="ListIcon" @click="currentItemView = 'item-list-view'"
                class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
                :svgClasses="{ 'text-primary stroke-current': currentItemView == 'item-list-view' }" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="algolia-content-container" class="relative clearfix ">

      <vs-sidebar class="items-no-padding vs-sidebar-rounded background-absolute" parent="#algolia-content-container"
        :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isFilterSidebarActive">
        <div class="p-6 filter-container">
          <h6 class="font-bold mb-4">{{ $t('category') }}</h6>
          <div class="categoryList">
            <vs-radio class="flex items-center cursor-pointer py-1" v-for="(category, index) in categoryList"
              :key="index" v-model="inventoryType" :vs-value="category.inventoryType" @change="searchInventory">
              <p style="font-size: 0.7em;">{{ category.inventoryType | capitalize() }}</p>
            </vs-radio>
          </div>
          <vs-divider />

          <vs-button @click="inventoryType = '', selectedBrands = [], searchInventory()">{{ $t('clearAllFilter') }}
          </vs-button>
        </div>
      </vs-sidebar>

      <div :class="{ 'sidebar-spacer-with-margin': clickNotClose }" class="">
        <div class="flex md:items-end items-center justify-between flex-wrap mb-4 cart-item">
          <div class="w-3/4 lg:w-5/6">
            <div class="vx-row flex items-stretch">
              <vs-input class="flex-2 w-2/3 ml-5 svs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg right-0"
                :placeholder="$t('searchHere')" v-model="inventoryName" @keyup="searchInventory"
                @submit="searchInventory" size="medium" />
              <div slot="submit-icon" class="my-3 ml-1 padSmall" v-if="inventoryName == ''" @click="searchInventory">
                <feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
              </div>

              <div slot="reset-icon" v-else>
                <feather-icon icon="XIcon" svgClasses="h-6 w-6 cursor-pointer" class="my-3 ml-1 padSmall"
                  @click="inventoryName = '', searchInventory()" />
              </div>

              <!-- <div class="flex-2 w-1/7"><vs-button  @click="viewOrders" type="filled">{{$t('viewOrders')}}</vs-button></div> -->
              <div class="w-1/4">
                <vs-select
                  class="ml-2 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg sm:w-12 lg:w-12 xl:w-24 xxl:w-auto md:w-12"
                  v-model="perPage" @change="searchInventory">
                  <vs-select-item v-for="page in perPageOptions" :key="page" :value="page" :text="page" />
                </vs-select>
              </div>
            </div>
          </div>
          <div class="disappear inline-flex w-1/6 flex overflow-hidden sm:w-2/12 flex-row">
            <div class="absolute top-0 right-0 px-6 flex-auto">
              <feather-icon icon="GridIcon" @click="currentItemView = 'item-grid-view'"
                class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
                :svgClasses="{ 'text-primary stroke-current': currentItemView == 'item-grid-view' }" />
              <feather-icon icon="ListIcon" @click="currentItemView = 'item-list-view'"
                class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
                :svgClasses="{ 'text-primary stroke-current': currentItemView == 'item-list-view' }" />
            </div>
          </div>
        </div>
        <div>
          <template v-if="currentItemView == 'item-grid-view'">
            <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>

            <div class="items-grid-view vx-row match-height">
              <div class="vx-col lg:w-1/6 sm:w-1/3 w-full cart-item" v-for="(item, index) in inventoryItems"
                :key="item.inventoryId">
                <item-grid-view :item="item">

                  <template slot="action-buttons">
                    <div class="flex flex-wrap" v-if="isInCart(item.inventoryId)">
                      <div v-if="isInCart(item.inventoryId)"
                        class="bg-white text-white pt-1 pb-1 pl-2 font-bold container">
                        <vs-input-number min="1"
                          :value="cartItems[cartItems.findIndex(i => i.inventoryId == item.inventoryId)].quantity"
                          @input="updateItemQuantity($event, cartItems.findIndex(i => i.inventoryId == item.inventoryId))"
                          size="medium" color="primary" />
                        <div id="cartButton"
                          class="item-view-secondary-action-btn bg-danger p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                          @click="removeItemFromCart(item)">
                          <feather-icon icon="XIcon" class="text-black" svgClasses="h-4 w-4" />
                          <span class="text-sm font-semibold">{{ $t('remove') }}</span>
                        </div>
                      </div>
                      <div v-else id="cartButton"
                        class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                        @click="cartButtonClicked(item, index)">
                        <span class="text-sm font-semibold">{{ $t('addToCart') }}</span>
                      </div>
                    </div>
                    <div class="flex flex-wrap" v-else>
                      <vs-input-number min="1" class="mr-6 ml-4 container" v-model="quantityHolder[index]" size="medium"
                        color="primary" @input="checkStockQuantity()" />
                      <div id="cartButton"
                        class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                        @click="cartButtonClicked(item, index)">
                        <span class="text-sm font-semibold">{{ $t('addToCart') }}</span>
                      </div>
                    </div>
                  </template>
                </item-grid-view>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="items-list-view" v-for="(item, index) in inventoryItems" :key="item.inventoryId">
              <item-list-view :item="item" :quantityHolder="quantityHolder[index]" :index="index"
                @messageFromChild="messageFromChild">
                <template slot="action-buttons">
               
                  <div
                    class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
                    @click="cartButtonClicked(item, index)" v-if="!isInCart(item.inventoryId)">
                    <!-- <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" style="margin-left:-10px;" /> -->

                    <span class="text-sm font-semibold">{{ $t('addToCart') }}</span>
                  </div>
                </template>
              </item-list-view>
            </div>
          </template>
        

        </div>

        <vs-pagination :total="totalPage" v-model="currentIndex" @change="searchInventory" />
      </div>
    </div>
    <!-- </ais-instant-search> -->
  </div>
</template>

<script>
import {
  AisInstantSearch,
  AisSearchBox,
  AisConfigure,
  AisStats,
  AisClearRefinements,
  AisNumericMenu,
  AisSortBy,
  AisRangeInput,
  AisHierarchicalMenu,
  AisRatingMenu,
  AisRefinementList
} from "vue-instantsearch";
import algoliasearch from "algoliasearch/lite";
import vSelect from "vue-select";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    vSelect,
    Loading,
    ItemGridView: () => import("./components/ItemGridView.vue"),
    ItemListView: () => import("./components/ItemListView.vue")
  },

  data() {
    return {
      searchClient: algoliasearch(
        "latency",
        "6be0576ff61c053d5f9a3225e2a90f76"
      ),
      isFilterSidebarActive: true,
      clickNotClose: true,
      inventoryItems: [],
      search: "",
      currentIndex: 1,
      perPage: 12,
      totalPage: 3,
      perPageOptions: [12, 24, 30, 48, 90],
      inventoryName: "",
      categoryList: [],
      inventoryType: "",
      brands: ["Brand1", "Brand2", "Brand3"],
      selectedBrands: [],
      quantityHolder: [],
      isLoading: false,
      fullPage: false,
      x: 30,
      isAddedToCart: [],
      windowWidth: window.innerWidth,
      currentItemView: "item-grid-view",
      numericItems: [
        { label: "All" },
        { label: "<= $10", end: 10 },
        { label: "$10 - $100", start: 10, end: 100 },
        { label: "$100 - $500", start: 100, end: 500 },
        { label: ">= $500", start: 500 }
      ],
      algoliaCategories: [
        "hierarchicalCategories.lvl0",
        "hierarchicalCategories.lvl1",
        "hierarchicalCategories.lvl2",
        "hierarchicalCategories.lvl3"
      ]
    };
  },
  mounted() {
    this.searchInventory();
  },
  watch: {
    quantityValue: function (item) {
      return this.cartItems[
        this.cartItems.findIndex(i => i.inventoryId == item.inventoryId)
      ].quantity;
    }
  },
  computed: {
    filterdItems: function () {
      return this.inventoryItems.filter(inventory => {
        return inventory.inventoryGenericName.match(this.search);
      });
    },
    toValue() {
      return (value, range) => [
        value.min !== null ? value.min : range.min,
        value.max !== null ? value.max : range.max
      ];
    },

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
    checkStockQuantity() {
    },
    messageFromChild(quantitiy, index) {
      this.quantityHolder[index] = quantitiy;
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 992) {
        this.isFilterSidebarActive = this.clickNotClose = false;
      } else {
        this.isFilterSidebarActive = this.clickNotClose = true;
      }
    },

    toggleFilterSidebar() {
      if (this.clickNotClose) return;
      this.isFilterSidebarActive = !this.isFilterSidebarActive;
    },
    toggleItemInWishList(item) {
      this.$store.dispatch("eCommerce/toggleItemInWishList", item);
    },
    additemInCart(item, index) {
      this.$store.dispatch("eCommerce/additemInCart", {
        item: item,
        quantity: parseInt(this.quantityHolder[index])
      });
    },

    ///added
    viewOrders() {
      for (let index = 0; index < this.inventoryItems.length; index++) {
        this.isAddedToCart[this.inventoryItems[index].inventoryId] = false;
      }
      this.$router.push("/pages/eCommerce/checkout");
    },
    cartButtonClicked(item, index) {

      if (this.isInCart(item.inventoryId)) {
        this.$router.push("/pages/eCommerce/checkout");
      } else {
        this.isAddedToCart[item.inventoryId] = true;
        this.additemInCart(item, index);

      }
    },
    updateItemQuantity(event, index) {
      const itemIndex = Math.abs(index + 1 - this.cartItems.length);
      this.$store.dispatch("eCommerce/updateItemQuantity", {
        quantity: event,
        index: itemIndex
      });
    },

    getInventory() {
      this.isLoading = true;
      this.$http
        .get("/inventorylistview", {
          params: { page: this.currentIndex, limit: this.perPage }
        })
        .then(response => {
          for (let index = 0; index < response.data.length; index++) {
            response.data[index].quantity = 1;
            this.isAddedToCart[response.data[index].inventoryId] = false;
          }
          this.inventoryItems = response.data;

          this.totalPage = response.data[0].totalPages;
          this.quantityHolder = new Array(this.inventoryItems.length).fill("1");
          this.isLoading = false;
        })
        .catch(_ => {
          this.isLoading = false;
        });
    },

    getInventoryCategory() {
      this.$http.get("/inventory/category").then(response => {
        this.categoryList = response.data;
      });
    },
    searchInventory() {
      this.isLoading = true;
      this.$http
        .post("/inventorylistview/search", {
          inventoryName: this.inventoryName,
          inventoryType: this.inventoryType
        }, { params: { page: this.currentIndex, limit: this.perPage } })
        .then(response => {
          this.inventoryItems = response.data;
          this.totalPage = response.data[0].totalPages;
          this.isLoading = false;
        })
        .catch(_ => {
          this.inventoryItems = [];
          this.isLoading = false;
        });
    },
    isInStorage: itemId => {
      var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      return cartItems.some(item => item.inventoryId == itemId);
    },
    addItemToCart(item) {
      var cartItem = JSON.parse(localStorage.getItem("cartItems") || "[]");
      cartItem.push(item);
      localStorage.setItems("cartItems", JSON.stringify(cartItem));
    },
    toggleItemInCart() { },
    openLoadingInDiv() {
      this.$vs.loading({
        container: "#algolia-instant-search-demo",
        scale: 0.6
      });
      setTimeout(() => {
      }, 3000);
    }
  },
  created() {
    this.getInventory();
    // this.quantityHolder[0] = 1;
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
    this.getInventoryCategory();
    this.$store.commit("TOGGLE_REDUCE_BUTTON", true);

  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleWindowResize);
  }
};
</script>

<style lang="scss">
#algolia-instant-search-demo {
  .algolia-header {
    .algolia-filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #algolia-content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .algolia-search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .algolia-price-slider {
    min-width: unset;
  }

  // .item-list-view {
  //     .algolia-result-img {

  //     }
  // }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}

.theme-dark {
  #algolia-instant-search-demo {
    #algolia-content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 450px) {
  .disappear {
    display: none !important;
  }

  .padSmall {
    padding-left: 12px;
  }
}

@media (max-width: 992px) {
  #algolia-content-container {
    .vs-sidebar {
      position: absolute !important;
      float: none !important;
    }
  }
}

.categoryList {
  width: 230px;
  height: 330px;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
