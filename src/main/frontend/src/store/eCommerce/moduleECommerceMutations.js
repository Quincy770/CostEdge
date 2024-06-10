/*=========================================================================================
  File Name: moduleEcommerceMutations.js
  Description: Ecommerce Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {
    TOGGLE_ITEM_IN_WISH_LIST(state, item) {
        const index = state.wishList.findIndex(i => i.inventoryId == item.inventoryId)
        if (index < 0) {
            state.wishList.push(item)
        } else {
            state.wishList.splice(index, 1)
        }
    },
    TOGGLE_ITEM_IN_CART(state, item) {
        const index = state.cartItems.findIndex(i => i.inventoryId == item.inventoryId)
        if (index < 0) {
            state.cartItems.push(item)
        } else {
            state.cartItems.splice(index, 1)
        }
    },
    ADD_ITEM_IN_CART(state, item) {
        state.cartItems.push(item)
        var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        cartItems.push(item);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    UPDATE_ITEM_QUANTITY(state, payload) {
      state.cartItems[payload.index].quantity = payload.quantity
      var cartItems =JSON.parse(localStorage.getItem("cartItems"));
      cartItems[payload.index].quantity = payload.quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    CLEAR_CART(state){
        state.cartItems.length = 0;
    },
    CLEAR_WISH_LIST(state){
        state.wishList.length = 0;
    }
}
