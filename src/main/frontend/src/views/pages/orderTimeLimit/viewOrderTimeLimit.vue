<template>
  <vx-card :title="$t('orderTimeLimits')">
    <div id="knowledge-base-page">

      <div class="knowledge-base-jumbotron">
        <div
          class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base"
        >     
        </div>
      </div>
    </div>
    <vx-card id="internal-card" title no-shadow card-border>
      <!-- KNOWLEDGE BASE CARDS  -->
      <vs-table
        class="stripe"
        hoverFlat
        :max-items="perPage"
        :data="orderTimeLimits"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="orderTimeLimit">{{$t('orderTimeLimit')}}</vs-th>
          <vs-th>{{$t('edit')}}</vs-th>
          <vs-th>{{$t('delete')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(perPage*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].timeLimit">{{data[indextr].timeLimit}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].orderTimeLimitId">
              <span  @click="update(data[indextr].orderTimeLimitId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
            </vs-td>
            <vs-td class="p-0" :data="data[indextr].orderTimeLimitId">
              <ul class="switch-container">
                <li>
                  <span
                    @click="preventTableClickAction=true, openConfirm(data[indextr].orderTimeLimitId)"
                  >
                    <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                  </span>
                </li>
              </ul>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      orderTimeLimits: [],  
      orderTimeLimitId: "",    
      searchKey: "",
      perPage: 50,
      page: 1,
      currentPage: 1,
      totalPage: 0,
      preventTableClickAction: false
    };
  },
  methods: {
    getOrderTimeLimits() {
      this.$http
        .get(`/order-time-limit`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey
          }
        })
        .then(response => {
          this.orderTimeLimits.push(response.data);
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    
    openConfirm(orderTimeLimitId) {     
      this.orderTimeLimitId = orderTimeLimitId;
      this.$vs.dialog({
        type: "confirm",
        color: "warning",
        title: `Confirm`,
        text: this.$t("deleteConfirmation"),
        accept: this.acceptAlert,
        acceptText: this.$t("Yes"),
        cancelText: this.$t("No")
      });
    },
    acceptAlert() {
      this.$http
        .delete("/order-time-limit/" + this.orderTimeLimitId, {
        })
        .then(response => {
          this.$vs.notify({
            color: "success",
            title: "Status",
            text: "Country Deleted"
          });
          this.getOrderTimeLimits();

        });
      
    },
    
    add: function() {
      this.$router.push({ path: "/pages/add-order-time-limit" });
    },
    update: function(id) {
      this.$router.push({ path: "/pages/edit-order-time-limit/" + id });
    }
  },
  created() {
    this.getOrderTimeLimits();
  }
};
</script>

<style lang="scss" scoped>
#search {
  margin-left: 150px;
  width: 300px;
}
#dropdown {
  width: 500px;
  margin-left: 50px;
}
#add {
  width: 180px;
  background: aliceblue;
  text-decoration-color: white;
}

</style>
