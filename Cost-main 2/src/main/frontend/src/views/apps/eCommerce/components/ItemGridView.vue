<!-- =========================================================================================
	File Name: ItemGridView.vue
	Description: Item Component - Grid VIew
	----------------------------------------------------------------------------------------
	Item Name: Vuesax Admin - VueJS Dashboard Admin Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <!-- <div class="item-grid-view vx-row match-height">
  <div class="vx-col" :class="gridColumnWidth" v-for="item in items" :key="item.objectID">-->
  <vx-card class="grid-view-item mb-base overflow-hidden">
    <template slot="no-body">
      <!-- ITEM IMAGE -->
      <div class="item-img-container bg-white h-60 flex items-center justify-center mb-4">
        <img
          src="http://www.drugfreecollier.org/wp-content/uploads/2015/03/pills.jpg"
          :alt="item.inventoryBrandName"
          class="responsive card-img-top"
        />
      </div>
      <div class="item-details px-4">
        <!-- RATING & PRICE -->
        <!-- <div class="flex justify-between items-center"> -->
          <!-- <div class="bg-primary flex text-white py-1 px-2 rounded"> -->
            <!-- <span class="text-sm mr-2">{{ item.rating }}</span> -->
            <!-- <div
              class=" p-1 flex flex-grow items-center justify-center cursor-pointer"
              @click="toggleItemInWishList(item)"
            >
              <feather-icon
                icon="StarIcon"
                :svgClasses="[{'text-warning fill-current' : isInWishList(item.inventoryId)}, 'h-5 w-5']"
              />
            </div> -->
          <!-- </div> -->
          <!-- <h6 class="font-bold">{{ item.sellPrice }} USD</h6> -->
        <!-- </div> -->

        <!-- TITLE & DESCRIPTION -->
        <div class="my-4 centerTitle">
          <h6 class="mx-auto centerTitle truncate font-semibold">{{ item.inventoryGenericName }}</h6>
          <del class="text-sm strike">{{ item.discountAmount+item.sellPrice}} USD</del><span class="text-success font-bold"> {{item.sellPrice}} USD</span>
          <p class="truncate font-bold mb-1 text-sm">{{ item.inventoryBrandName }}</p>
          <!-- <p><span>
            <vs-icon icon="mood"></vs-icon>
          </span>{{item.inventoryType}}</p>-->
        </div>
      </div>

      <!-- SLOT: ACTION BUTTONS -->
      <slot name="action-buttons" />
    </template>
  </vx-card>
  <!--  </div>
  </div>-->
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    isInWishList() {
      return itemId => this.$store.getters["eCommerce/isInWishList"](itemId);
    }
  },
  methods: {
    toggleItemInWishList(item) {
      this.$store.dispatch("eCommerce/toggleItemInWishList", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.grid-view-item {
  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }
  .strike {
    text-decoration: line-through;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }
  .centerTitle{
      text-align: center
  }
}
</style>