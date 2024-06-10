<template>
  <div id="main-div" class="vx-row">

    <div class="vx-col w-full mb-base">
      <vx-card id="card-id" :title="$t('editTransactionReason')">
        <vx-card id="internal-card" class="mt-5" title no-shadow card-border>
          <loading :active.sync="isLoading" :can-cancel="true"></loading>
          <div class="vx-row mt-10">
            <div class="vx-col sm:w-1/4 w-full mb-6">
              <vs-input class="w-full" :label="$t('transactionReason')" v-model="transactionReason"
                name="transactionReason" v-validate="'required'" data-vv-validate-on="blur" />
              <span class="text-danger">{{ errors.first('transactionReason') }}</span>
            </div>
            <div class="vx-col sm:w-1/6 w-full mb-6">
              <div class="vx-col w-full">
                <br>
                <vs-button @click="editTransactionReason" color="success" class="mr-3 mb-2">{{ $t('save') }}</vs-button>
              </div>
            </div>
          </div>
        </vx-card>
      </vx-card>
    </div>
  </div>
</template>


<script>
import router from "@/router.js";
import { Validator } from "vee-validate";
const dict = {
  custom: {
    transactionReason: {
      required: "Please enter Transaction Reason",
    },

  }
};
Validator.localize("en", dict);
import VSelect from "vue-select";
import Loading from "vue-loading-overlay";
export default {
  components: {
    "v-select": VSelect,
    Loading
  },
  data() {
    return {
      transactionReason: "",
      isLoading: false,
      transactionReasonId: this.$route.params.id,
    };
  },
  methods: {
    resetValues() {
      this.transactionReason = "";
    },
    editTransactionReason() {
      this.$validator.validateAll().then(transaction => {
        if (transaction) {
          this.isLoading = true;
          var data = {
            transactionReason: this.transactionReason,
          }
          this.$http
            .put("/transaction-reason/" + this.transactionReasonId, data)
            .then(response => {
              this.isLoading = false;
              this.$vs.notify({
                title: this.$t("Add"),
                text: this.$t("Registered Successfully!"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success"
              });
              this.$vs.loading.close();
              this.$router.push({ path: "/pages/view-transaction-reason" });
            })
            .catch(error => {
              this.isLoading = false;
            });

        }
      });

    },

    getTransactionReason() {
      this.$http
        .get("/transaction-reason/" + this.transactionReasonId)
        .then(response => {
          this.transactionReason = response.data.transactionReason;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    }

  },

  created() {
    this.getTransactionReason();
  }
};
</script>
<style  lang="scss" scoped>
</style>
