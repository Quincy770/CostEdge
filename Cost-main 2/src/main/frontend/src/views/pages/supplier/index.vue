<template>
  <vx-card :title="$t('All Suppliers')">
    <div id="knowledge-base-page">
      <!-- JUMBOTRON -->
      <div class="knowledge-base-jumbotron">
        <div
          class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base"
        >
          <div class="vx-row">
            <div class="w-2/5">
              <vs-input
                :placeholder="$t('Seach Supplier Hint')"
                v-model="searchKey"
                icon-pack="feather"
                icon="icon-search"
                size="large"
                class="w-full no-icon-border mt-6"
                @keyup="fetchSuppliers()"
              />
            </div>
            <div class="w-1/6" id="dropdown">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div
                  class="p-4 mt-6 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
                >
                  <span class="pl-4 pr-4">
                    <p>{{(currentPage-1)*perPage+1}}-{{currentPage*perPage}} of {{totalPage*perPage}}</p>
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
                  <vs-dropdown-item>
                    <span @click="perPage=15 ,fetchSuppliers()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=25,fetchSuppliers()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=50,fetchSuppliers()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=75,fetchSuppliers()">75</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="w-1/5 mt-8">
              <vs-button
              v-if="isGranted('Add Supplier')"
                class="small text-base"
                icon-pack="feather"
                icon="icon-plus"
                type="gradient"
                color="success"
                @click.prevent="add"
              >{{$t('Add Supplier')}}</vs-button>
            </div>

            <div class="w-1/6 ml-12 mt-6">
            </div>
          </div>
        </div>
      </div>
    </div>
    <vx-card id="internal-card" title no-shadow card-border>

<vs-table
  class="stripe"
  hoverFlat
  @selected="goToDetail"
  :max-items="perPage"
  :data="suppliers"
>
  <template slot="thead">
    <vs-th sort-key="number">#</vs-th>
    <vs-th sort-key="name">{{$t('Name')}}</vs-th>
    <vs-th sort-key="email">{{$t('Email')}}</vs-th>
    <vs-th sort-key="phone">{{$t('Phone')}}</vs-th>
    <vs-th>{{$t('Actions')}}</vs-th>
  </template>
  <template slot-scope="{data}">
    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
      <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
      <vs-td class="pr-4 w-1/4" :data="data[indextr].name">{{data[indextr].name}}</vs-td>
      <vs-td class="pr-4 w-1/4" :data="data[indextr].email">{{data[indextr].email}}</vs-td>
      <vs-td class="pr-4 w-1/4" :data="data[indextr].phone">{{data[indextr].phone}}</vs-td>
      <vs-td class="p-0" :data="data[indextr].supplierId">
        <span v-if="isGranted('editSupplier')" @click="updateSupplier(data[indextr].supplierId)">
          <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
        </span>
       
        <span v-if="isGranted('deleteSupplier')"
          @click=" openConfirm(data[indextr].supplierId)">
          <vs-avatar color="danger" icon-pack="feather" icon="icon-delete"/>
        </span>
      </vs-td>
    </vs-tr>
  </template>
</vs-table>
<p v-if="increament!=0">.</p>
</vx-card>
<vs-pagination class="m-4" :total="total" v-model="currentPage" @change="fetchSuppliers"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      suppliers: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      searchKey: "",
      perPage: 20,
      totalPage: 0,
      preventTableClickAction: false,
      supplierId: ""
    };
  },
  methods: {

fetchSuppliers(){
  const thisIns = this;
  this.isLoading=true
  this.$http
    .get("/supplier",{
      params: { 
        page: thisIns.currentPage, 
        limit: thisIns.limit, 
        searchKey: thisIns.searchKey }
    })
    .then(function(response) {
      thisIns.isLoading=false
      thisIns.suppliers = response.data;
      thisIns.total = response.data[0].totalPage;
    }).catch(error => {
        thisIns.isLoading=false
    });
},


openConfirm(supplierId) {
  this.supplierId = supplierId;
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
  const thisIns = this;
  this.$http
    .delete("/supplier/"+this.supplierId)
    .then(function(response) {
      thisIns.$vs.notify({
        color: "success",
        title: "Status",
        text: "Supplier Deleted!"
      });
      thisIns.fetchSuppliers();
    }).catch(error => {
    });

},

add: function() {
  this.$router.push({ name: "addSupplier" });
},
updateSupplier: function(id) {
  this.$router.push({ path: "/pages/edit-supplier/" + id });
}
},
created() {
this.fetchSuppliers();
},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vuesax/pages/switch.scss";
// @import "@/assets/scss/custom.scss";
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
