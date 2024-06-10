/*=========================================================================================
  File Name: moduleEcommerceGetters.js
  Description: Ecommerce Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
    isInCart: state => itemId => {
        return state.cartItems.some((item) => item.inventoryId == itemId )
    },
    isInStorage: itemId =>{
        var cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        return cartItems.some((item)=> item.inventoryId == itemId)
    },
    isInWishList: state => itemId => {
        return state.wishList.some((item) => item.inventoryId == itemId )
    }
}