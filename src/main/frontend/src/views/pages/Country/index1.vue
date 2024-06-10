<template>
  <vx-card :title="$t('allCountries')">
    <div id="knowledge-base-page">
      <!-- JUMBOTRON -->
      <div class="knowledge-base-jumbotron">
        <div
          class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base"
        >
          <div class="vx-row">
            <div class="w-2/5">
              <vs-input
                :placeholder="$t('seachCountryHint')"
                v-model="searchKey"
                icon-pack="feather"
                icon="icon-search"
                size="large"
                class="w-full no-icon-border mt-6"
                @keyup="searchCountries()"
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
                    <span @click="perPage=15 ,getCountries()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=25,getCountries()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=50,getCountries()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=75,getCountries()">75</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="w-1/5 mt-8">
              <vs-button
                class="small text-base"
                icon-pack="feather"
                icon="icon-plus"
                type="gradient"
                color="success"
                @click.prevent="add"
              >{{$t('addCountry')}}</vs-button>
            </div>

            <div class="w-1/6 ml-12 mt-6">
              <!-- <feather-icon
                icon="GridIcon"
                @click="currentItemView='item-grid-view'"
                class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
                :svgClasses="{'text-primary stroke-current': currentItemView == 'item-grid-view'}"
              />-->
              <!-- <feather-icon
                icon="ListIcon"
                @click="currentItemView='item-list-view'"
                class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
                :svgClasses="{'text-primary stroke-current': currentItemView == 'item-list-view'}"
              />-->
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
        @selected="goToDetail"
        :max-items="perPage"
        :data="countries"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="countryName">{{$t('countryName')}}</vs-th>
          <vs-th sort-key="nationalityName">{{$t('nationality')}}</vs-th>
          <vs-th>{{$t('edit')}}</vs-th>
          <vs-th>{{$t('delete')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].name">{{data[indextr].name}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].nationality">{{data[indextr].nationality}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <span @click="updateCountry(data[indextr].countryId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
            </vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <ul class="switch-container">
                <li>
                  <span
                    @click="preventTableClickAction=true, openConfirm(status[indextr],data[indextr].countryId,'success'),increament++,decreament--"
                  >
                    <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                  </span>
                </li>
              </ul>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <p v-if="increament!=0">.</p>
    </vx-card>
    {{currentPage}}
    <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getCountries"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dot: "",
      countries: [],
      selected: [],
      selected: [],
      limit: 15,
      total: 0,
      searchCountry: "",
      status: [],
      swich: true,
      countriestatus: "",
      updateStatus: false,
      colorAlert: "primary",
      titleAlert: "Alert",
      activeConfirm: false,
      valueInput: "",
      accepted: false,
      countryId: "",
      confirm: "",
      increament: 0,
      decreament: 0,
      responseGeted: false,
      currentItemView: "item-grid-view",
      knowledgeBaseSearchQuery: "",
      searchKey: "",
      kb: [],
      allCountries: [],
      perPage: 15,
      currentPage: 1,
      totalPage: 0,
      preventTableClickAction: false
    };
  },
  methods: {
    getCountries() {
      this.$http
        .get(`/country`, {
          params: {
            page: this.currentPage,
            limit: this.perPage
          }
        })
        .then(response => {
          this.countries=response.data;
          this.totalPage = response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          // this.$vs.loading.close("#pu-body> .con-vs-loading");
          this.isLoading = false;
        });
    },
    searchCountries() {
      // const thisIns = this;
      this.isLoading = true;
      this.$http
        .get("/country?searchKey="+this.searchKey/*, {
          searchKey: this.searchKey
        }*/)
        .then(response => {
          this.countries = response.data;

          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    goToDetail(countryName) {
      if (true/*this.preventTableClickAction*/) return;
      this.$router.push({
        path: "/pages/countries/" + countryName.countryId
      });
    },
    search: function(searchKey) {
      this.$http
        .post(
          "/country/search",
          {
            searchKey: searchKey
          },
          { params: { page: this.currentPage, limit: this.limit } }
        )
        .then(response => {
          this.countries = response.data;
          this.total = thisIns.countries[0].totalPages;
          thisIns.$store.dispatch("user/populateUser", response.data);
        });
    },
    openConfirm(status, countryId, color) {
      this.status[0] = true;
      if (status == true) {
        this.countriestatus = "Disabled";
        this.confirm = "Do You Want to Disable?";
      } else {
        this.countriestatus = "Active";
        this.confirm = "Do You Want to Delete";
      }
      this.countryId = countryId;
      this.$vs.dialog({
        type: "confirm",
        color: "warning",
        title: `Confirm`,
        text: this.confirm,
        accept: this.acceptAlert,
        acceptText: this.$t("Yes"),
        cancelText: this.$t("No")
      });
    },
    acceptAlert() {
      this.$http
        .delete("/country/" + this.countryId, {
          countriestatus: this.countriestatus
        })
        .then(response => {});
      this.$vs.notify({
        color: "success",
        title: "Status",
        text: "country Type Deleted"
      });
      this.getCountries();
    },
    pageLimit: function(limit) {
      this.limit = limit;
      this.updateStatus = true;
      this.pagination();
      this.updateStatus = false;
    },
    pagination: function() {
      const thisIns = this;
      this.$http
        .get("/country", {
          params: { page: this.currentPage, limit: this.limit }
        })
        .then(function(response) {
          thisIns.countries = response.data;
          thisIns.total = thisIns.countries[0].totalPages;
          thisIns.$store.dispatch("user/populateUser", response.data);
          if (thisIns.updateStatus == true) {
            for (let i = 0; i < thisIns.countries.length; i++) {
              if (thisIns.countries[i].countriestatus == "Active")
                thisIns.status[i] = true;
              else thisIns.status[i] = false;
            }
          }
        });
    },
    add: function() {
      this.$router.push({ path: "/pages/add-country" });
    },
    updateCountry: function(id) {
      this.$router.push({ path: "/pages/edit-countries/" + id });
    }
  },
  created() {
    const thisIns = this;
    this.$http
      .get("/country", {
        params: { page: this.currentPage, limit: this.limit }
      })
      .then(function(response) {
        thisIns.countries = response.data;
        thisIns.total = thisIns.countries[0].totalPages;
        thisIns.$store.dispatch("user/populateUser", response.data);
        for (let i = 0; i < thisIns.countries.length; i++) {
          if (thisIns.countries[i].countriestatus == "Active")
            thisIns.status[i] = true;
          else thisIns.status[i] = false;
        }
        this.responseGeted = true;
      })
      .catch(error => {
        this.responseGeted = true;
      });
  },
  updated() {
    if (this.searchCountry == "" && this.increament != 0) {
      const thisIns = this;
      this.$http
        .get("/country", {
          params: { page: this.currentPage, limit: this.limit }
        })
        .then(function(response) {
          thisIns.countries = response.data;
          thisIns.total = thisIns.countries[0].totalPages;
          for (let i = 0; i < thisIns.countries.length; i++) {
            if (thisIns.countries[i].countriestatus == "Active")
              thisIns.status[i] = true;
            else thisIns.status[i] = false;
          }
        });
    }
  },
  computed: {
    filteredKB() {
      return this.kb.filter(
        item =>
          item.title
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.knowledgeBaseSearchQuery.toLowerCase())
      );
    }
  }
};
</script>

<style lang="scss" scoped>
// .knowledge-base-jumbotron-content {
//   background:#2561cf;
//   background-size: cover;
// }
@import "@/assets/scss/vuesax/pages/switch.scss";
@import "@/assets/scss/custom.scss";
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
.loader-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  cursor: pointer;
  span.text {
    display: inline-block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
  .loader {
    animation: loader-animate 1.5s linear infinite;
    clip: rect(0, 80px, 80px, 40px);
    height: 80px;
    width: 80px;
    position: absolute;
    left: calc(50% - 40px);
    top: calc(50% - 40px);
    &:after {
      animation: loader-animate-after 1.5s ease-in-out infinite;
      clip: rect(0, 80px, 80px, 40px);
      content: "";
      border-radius: 50%;
      height: 80px;
      width: 80px;
      position: absolute;
    }
  }
  @keyframes loader-animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }
  @keyframes loader-animate-after {
    0% {
      box-shadow: inset #fff 0 0 0 17px;
      transform: rotate(-140deg);
    }
    50% {
      box-shadow: inset #fff 0 0 0 2px;
    }
    100% {
      box-shadow: inset #fff 0 0 0 17px;
      transform: rotate(140deg);
    }
  }
}
</style>
