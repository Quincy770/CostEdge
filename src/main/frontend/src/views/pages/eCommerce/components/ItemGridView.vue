

<template>
  <vx-card class="grid-view-item mb-base overflow-hidden px-1" style="">
    <template slot="no-body">
      <!-- <div class="bg-white h-32 flex items-center justify-center margins" style="">
        <img v-if="item.inventoryImage" :src="(`${$domain}/inventory-item-images/${item.inventoryImage}`)"
          class="responsive card-img-top grid-view-img" />
        <img v-if="!item.inventoryImage" :src="require(`@/assets/images/inventory-item-images/no_image.png`)"
          :alt="item.inventoryBrandName" class="responsive card-img-top grid-view-img" />
      </div> -->
      <div class="item-details" style="margin-top: -10px;;">

        <div class="centerTitle mt-6">
          <!-- <h5 style="height:15px;"> <b v-if="item.inventoryBrandName" class="truncate mb-1 font-size">{{
          item.inventoryBrandName.charAt(0).toUpperCase() + item.inventoryBrandName.slice(1) }}</b> </h5>
          <h5><b v-if="!item.inventoryBrandName" class="truncate font-bold h-5"></b>
          </h5> -->




          <!-- <del class="text-sm strike font-size">{{ (item.sellPrice +
          item.discountAmount*item.sellPrice/100).toLocaleString('en-US')}}
            {{$t('USD')}}</del>&nbsp; -->
          <span class="text-success font-size">{{item.sellPrice.toLocaleString('en-US')}} {{$t('USD')}}</span>

          <p style="height:30px;font-size: 0.8em;" class="font-size">{{ item.inventoryGenericName }}</p>
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
    max-width: 70%;
    max-height: 70%;
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
      opacity: 0.7;
    }
  }
  .centerTitle {
    text-align: center;
  }
}
</style>