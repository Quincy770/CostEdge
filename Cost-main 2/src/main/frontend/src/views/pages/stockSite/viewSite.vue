<template>
  <vx-card :title="$t('allSites')">
    <div id="knowledge-base-page">
      <div class="knowledge-base-jumbotron">
        <div
          class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base"
        >
          <div class="vx-row">    

            <div class="w-1/5 mt-6" >
              <vs-button
                class="small text-base"
                icon-pack="feather"
                icon="icon-plus"
                type="gradient"
                color="success"
                @click.prevent="add"
              >{{$t('addSite')}}</vs-button>
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
                    <span @click="perPage=15 ,getSites()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=25,getSites()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=50,getSites()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=75,getSites()">75</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="w-2/5" id="search">
              <vs-input
                @keyup="getSites"
                icon="icon-search"
                icon-pack="feather"
                class="w-full mx-2 input-rounded-full no-icon-border mt-6"
                :placeholder="$t('Search')"
                v-model="searchKey"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <vx-card id="internal-card" title no-shadow card-border>
      <!-- KNOWLEDGE BASE CARDS  -->

      <vs-table
        class="stripe"
        hoverFlat
        :max-items="perPage"
        :data="sites"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="siteName">{{$t('siteName')}}</vs-th>
          <vs-th>{{$t('edit')}}</vs-th>
          <vs-th>{{$t('delete')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(perPage*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].siteName">{{data[indextr].siteName}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].siteId">
              <span  @click="update(data[indextr].siteId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
            </vs-td>
            <vs-td class="p-0" :data="data[indextr].siteId">
              <ul class="switch-container">
                <li>
                  <span
                    @click="preventTableClickAction=true, openConfirm(data[indextr].siteId)"
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
    <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getSites"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sites: [],  
      siteId: "",    
      searchKey: "",
      perPage: 50,
      page: 1,
      currentPage: 1,
      totalPage: 0,
      preventTableClickAction: false
    };
  },
  methods: {
    getSites() {
      this.$http
        .get(`/stock-site`, {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            searchKey: this.searchKey
          }
        })
        .then(response => {
          this.sites=response.data;
          this.totalPage = response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    
    openConfirm(siteId) {
     
      this.siteId = siteId;
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
        .delete("/stock-site/" + this.siteId, {
        })
        .then(response => {
          this.$vs.notify({
            color: "success",
            title: "Status",
            text: "Country Deleted"
          });
          this.getSites();

        });
      
    },
    
    add: function() {
      this.$router.push({ path: "/pages/add-site" });
    },
    update: function(id) {
      this.$router.push({ path: "/pages/edit-site/" + id });
    }
  },
  created() {
    this.getSites()
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
