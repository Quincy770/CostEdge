<template>
  <div class="div_class">
    <h3>You will be redirected to payment page</h3>

    <div class="alert alert-primary" role="alert">
      While making payment use card number 4242 4242 4242 4242 and enter random
      cvv(3 digit)
    </div>

    <button
      class="checkout_button"
      id="proceed-to-checkout"
      @click="goToCheckout()"
    >
      Make payment
    </button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      stripeAPIToken: "pk_live_51P9jrC02vf5Db3TzxVShDCkjtkowAMWfA7zWBiWml51w5x2FMPjIrIK1qWRBjcOqWbTWg2DFMXCUWP2pltOrDksm00YOPYqEOu",
      stripe: '',
      token: null,
      sessionId: null,
      checkoutBodyArray: [],
    };
  },

  name: 'Checkout',
  props: ['baseURL'],
  methods: {
    /*
      Configures Stripe by setting up the elements and
      creating the card element.
    */
    configureStripe() {},

    getAllItems() {

            let len = 2;
            for (let i = 0; i < len; i++)
              this.checkoutBodyArray.push({
                imageUrl: null,
                productName: "wwwwwwwwwwwwwwwwwww",
                quantity: 4,
                price: 20,
                productId: 4,
                userId: 1,
              });


    },

    goToCheckout() {
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
  },
  mounted() {
    // get the token
    this.token = localStorage.getItem('accessToken');
    // get all the cart items
    this.stripe = Stripe(this.stripeAPIToken);
    this.getAllItems();
  },
};
</script>

<style>
.alert {
  width: 50%;
}

.div_class {
  margin-top: 5%;
  margin-left: 30%;
}

.checkout_button {
  background-color: #5d3dec;
  border: none;
  color: white;
  margin-left: 15%;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  border-radius: 15px;
}

.checkout_button:focus {
  outline: none;
  box-shadow: none;
}

.checkout_button:disabled {
  background-color: #9b86f7;
  border: none;
  color: white;
  margin-left: 15%;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  border-radius: 15px;
  cursor: not-allowed;
}
</style>
