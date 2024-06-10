<template>
  <vx-card :title="$t('allCountries')">
    <div id="knowledge-base-page">
      <!-- JUMBOTRON -->
      <div class="knowledge-base-jumbotron">
        <div class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base">
          <div class="vx-row">
            <div class="w-2/5">
              <vs-input :placeholder="$t('seachCountryHint')" v-model="searchKey" icon-pack="feather" icon="icon-search"
                size="large" class="w-full no-icon-border mt-6" @keyup="getCountries()" />
            </div>
            <div class="w-1/6" id="dropdown">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div
                  class="p-4 mt-6 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="pl-4 pr-4">
                    <p>{{ (currentPage - 1) * perPage + 1 }}-{{ currentPage * perPage }} of {{ totalPage * perPage }}</p>
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu>
                  <vs-dropdown-item>
                    <span @click="perPage = 15, getCountries()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage = 25, getCountries()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage = 50, getCountries()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage = 75, getCountries()">75</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="w-1/5 mt-8">
              <vs-button v-if="isGranted('addCountry')" class="small text-base" icon-pack="feather" icon="icon-plus"
                type="gradient" color="success" @click.prevent="add">{{ $t('addCountry') }}</vs-button>
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

      <vs-table class="stripe" hoverFlat @selected="goToDetail" :max-items="perPage" :data="countries">
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="countryName">{{ $t('countryName') }}</vs-th>
          <vs-th sort-key="nationalityName">{{ $t('nationality') }}</vs-th>
          <vs-th>{{ $t('edit') }}</vs-th>
          <vs-th>{{ $t('delete') }}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{ (indextr + 1) + (perPage * (currentPage - 1)) }}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].name">{{ data[indextr].name }}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].nationality">{{ data[indextr].nationality }}</vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <span v-if="isGranted('editCountry')" @click="updateCountry(data[indextr].countryId)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
            </vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <ul class="switch-container">
                <li>
                  <span v-if="isGranted('deleteCountry')"
                    @click="preventTableClickAction = true, openConfirm(data[indextr].countryId)">
                    <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
                  </span>
                </li>
              </ul>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
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
      perPage: 50,
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
            limit: this.perPage,
            searchKey: this.searchKey
          }
        })
        .then(response => {
          this.countries = response.data;
          this.totalPage = response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

    openConfirm(countryId) {

      this.countryId = countryId;
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
        .delete("/country/" + this.countryId, {
          countriestatus: this.countriestatus
        })
        .then(response => {
          this.$vs.notify({
            color: "success",
            title: "Status",
            text: "Country Deleted"
          });
          this.getCountries();

        });

    },

    add: function () {
      this.$router.push({ path: "/pages/add-country" });
    },
    updateCountry: function (id) {
      this.$router.push({ path: "/pages/edit-countries/" + id });
    }
  },
  created() {
    this.getCountries()
  }
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
