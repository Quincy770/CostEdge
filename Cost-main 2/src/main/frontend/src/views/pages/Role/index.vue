<template>
  <vx-card :title="$t('allRoles')">
    <div id="knowledge-base-page">
      <!-- JUMBOTRON -->
      <div class="knowledge-base-jumbotron">
        <div
          class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base"
        >
          <div class="vx-row">
            <div class="w-2/5">
              <vs-input
                :placeholder="$t('seachRoleHint')"
                v-model="searchKey"
                icon-pack="feather"
                icon="icon-search"
                size="large"
                class="w-full no-icon-border mt-6"
                @keyup="searchRoles()"
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
                    <span @click="perPage=15 ,getAllRoles()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=25,getAllRoles()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=50,getAllRoles()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=75,getAllRoles()">75</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="w-1/5 mt-8">
              <vs-button
              v-if="isGranted('addRole')"
                class="small text-base"
                icon-pack="feather"
                icon="icon-plus"
                type="gradient"
                color="success"
                @click.prevent="add"
              >{{$t('addRole')}}</vs-button>
            </div>

            <div class="w-1/6 ml-12 mt-6">
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
        :data="getRoles"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="roleName">{{$t('roleName')}}</vs-th>
          <vs-th sort-key="roleFullName">{{$t('roleFullName')}}</vs-th>
          <vs-th>{{$t('edit')}}</vs-th>
          <vs-th>{{$t('delete')}}</vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].roleName">{{data[indextr].roleName}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].roleFullName">{{data[indextr].roleFullName}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <span v-if="isGranted('editRole')" @click="updateRole(data[indextr].id)">
                <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
              </span>
            </vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <ul class="switch-container">
                <li>
                  <span v-if="isGranted('deleteRole')"
                    @click="preventTableClickAction=true, openConfirm(data[indextr].id),increament++,decreament--"
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
    <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getAllRoles"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dot: "",
      roles: [],
      selected: [],
      limit: 15,
      total: 0,
      searchRole: "",
      currentPage: 1,
      status: [],
      swich: true,
      roleStatus: "",
      updateStatus: false,
      colorAlert: "primary",
      titleAlert: "Alert",
      activeConfirm: false,
      valueInput: "",
      accepted: false,
      id: "",
      confirm: "",
      increament: 0,
      decreament: 0,
      responseGeted: false,
      currentItemView: "item-grid-view",
      knowledgeBaseSearchQuery: "",
      searchKey: "",
      kb: [],
      allRoles: [],
      perPage: 20,
      totalPage: 0,
      preventTableClickAction: false
    };
  },
  methods: {
    getAllRoles() {
      var params = {limit: this.perPage, page: this.currentPage}
      this.$store.dispatch('RoleModule/fetchRoles', params).then(response => {
          this.totalPage = 1; //response.data[0].totalPage;
          this.isLoading = false;
        })
        .catch(error => {
          // this.$vs.loading.close("#pu-body> .con-vs-loading");
          this.isLoading = false;
        });
    },
    searchRoles() {
      // const thisIns = this;
      this.isLoading = true;
      this.$http
        .get("/roles?searchKey="+this.searchKey/*, {
          searchKey: this.searchKey
        }*/)
        .then(response => {
          this.roles = response.data;

          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

    openConfirm(id) {
      this.id = id;
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
     this.$store.dispatch('RoleModule/deleteRole', this.id)
        .then(response => {
          this.$vs.notify({
        color: "success",
        title: this.$t("notificationStatus"),
        text: this.$t("deleteSuccess")
      });
      this.getAllRoles();
        });

    },

    add: function() {
      this.$router.push({ name: "addRole" });
    },
    updateRole: function(id) {
      this.$router.push({ path: "/pages/edit-role/" + id });
    }
  },
 created() {
    this.getAllRoles();
  },

  computed: {
    getRoles(){
        return this.$store.getters["RoleModule/getRoles"];
      },
        getRole(){
        return this.$store.getters["RoleModule/getRole"];
      },
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
