<template>
  <vx-card :title="$t('allPrivileges')+' | '+role.roleName">
    <!-- <div id="knowledge-base-page">
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
                    <span @click="perPage=15 ,getRoles()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=25,getRoles()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=50,getRoles()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=75,getRoles()">75</span>
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
              >{{$t('addRole')}}</vs-button>
            </div>

            <div class="w-1/6 ml-12 mt-6">
              
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <vx-card id="internal-card" title no-shadow card-border>
      <!-- KNOWLEDGE BASE CARDS  -->

      <vs-table
        class="stripe"
        hoverFlat
        @selected="goToDetail"
        :max-items="perPage"
        :data="getPrivileges"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="privilegeName">{{$t('privilegeName')}}</vs-th>
          <vs-th sort-key="privilegeUrl">{{$t('privilegeUrl')}}</vs-th>
          <vs-th sort-key="method">{{$t('method')}}</vs-th>
          <vs-th sort-key="actions">{{$t('allowAll')}}
            <ul style="margin-left: 15px" class="switch-container">
                <li>
                  <span v-if="isGranted('setRolePermission')" @click="onAllowAllPermissionChanged(),increament++,decreament--">
                    <vs-switch color="success" v-model="hasAllPermissionsGranted" />
                  </span>
                </li>
              </ul>
          </vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].privilegeDescription">{{data[indextr].privilegeDescription}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].privilegeUrl">{{data[indextr].privilegeUrl}}</vs-td>
            <vs-td class="pr-4 w-1/4" :data="data[indextr].method">{{data[indextr].method}}</vs-td>
            <vs-td class="p-0" :data="data[indextr].id">
              <ul class="switch-container">
                <li>
                  <span v-if="isGranted('setRolePermission')" @click="onPermissionChanged(data[indextr].privilegeId, !status[indextr]),increament++,decreament--">
                    <vs-switch color="success" v-model="status[indextr]" />
                  </span>
                </li>
              </ul>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <p v-if="increament!=0">.</p>
    </vx-card>
    <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getRoles"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dot: "",
      privileges: [],
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
      roleId: this.$route.params.id,
      role: {},
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
      currentPage: 1,
      totalPage: 0,
      preventTableClickAction: false,
      hasAllPermissionsGranted: false,
    };
  },
  methods: {
    loadRole() {
      const thisIns = this;
      this.$http
        .get("/roles/"+thisIns.roleId)
        .then(function(response) {
          thisIns.role = response.data;
          thisIns.responseGeted = true;
        })
        .catch(error => {
          this.responseGeted = true;
        });
    },
    getRoles() {
      this.$http
        .get(`roles`, {
          params: {
            page: 1,
            limit: 1000000
          }
        })
        .then(response => {
          this.privileges=response.data;
          this.totalPage = 1;//response.data[0].totalPage;
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
        .get("/role?searchKey="+this.searchKey/*, {
          searchKey: this.searchKey
        }*/)
        .then(response => {
          this.privileges = response.data;

          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    goToDetail(privilegeName) {
      if (true/*this.preventTableClickAction*/) return;
      this.$router.push({
        path: "/pages/role/" + privilegeName.roleId
      });
    },
    search: function(searchKey) {
      this.$http
        .post(
          "/role/search",
          {
            searchKey: searchKey
          },
          { params: { page: this.currentPage, limit: this.limit } }
        )
        .then(response => {
          this.privileges = response.data;
          this.total = thisIns.privileges[0].totalPages;
          thisIns.$store.dispatch("user/populateUser", response.data);
        });
    },
    
    onAllowAllPermissionChanged() {
      for (let i = 0; i < this.privileges.length; i++) {
                this.status[i] = !this.hasAllPermissionsGranted;
                this.onPermissionChanged(this.privileges[i].privilegeId, this.status[i])
            }
    this.hasAllPermissionsGranted=this.status.filter(privileged=>privileged).length==this.status.length;
    },
    onPermissionChanged(privilegeId, isPrivileged) {
      this.$http
        .post("/privileges/role-privilege", {
          roleId: this.roleId,
          privilegeId: privilegeId,
          isPrivileged: isPrivileged,
        })
        .then(response => {
        this.hasAllPermissionsGranted=this.status.filter(privileged=>privileged).length==this.status.length;
          this.$vs.notify({
            color: "success",
            title: this.$t("notificationStatus"),
            text: this.$t("Permission updated!")
          })
          })
          .catch(error=>{
            this.$vs.notify({
              color: "danger",
              title: this.$t("notificationStatus"),
              text: this.$t("Something went wrong. Permission not updated!")
          });
          });
    },
    acceptAlert() {
      this.$http
        .delete("/role/" + this.roleId, {
          roleStatus: this.roleStatus
        })
        .then(response => {});
      this.$vs.notify({
        color: "success",
        title: this.$t("notificationStatus"),
        text: this.$t("deleteSuccess")
      });
      this.getRoles();
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
        .get("/role", {
          params: { page: this.currentPage, limit: this.limit }
        })
        .then(function(response) {
          thisIns.privileges = response.data;
          thisIns.total = thisIns.privileges[0].totalPages;
          thisIns.$store.dispatch("user/populateUser", response.data);
          if (thisIns.updateStatus == true) {
            for (let i = 0; i < thisIns.privileges.length; i++) {
              // if (thisIns.privileges[i].privilegeId == 1)
              //   thisIns.status[i] = true;
              // else 
                thisIns.status[i] = false;
            }
          }
        });
    },

     fetchAllPrivileges() {
        var params = {limit: this.perPage, page: this.currentPage}
        this.$store.dispatch('PrivilegeModule/fetchPrivileges', params).then(() => {
        this.allResultTypes = this.$store.getters["PrivilegeModule/getPrivileges"];
          this.totalPage = this.allResultTypes[0].totalPage;
        this.isLoading = false;

        });
    },

  },
created() {
    this.fetchAllPrivileges();
  },

  computed: {
    getPrivileges(){
        return this.$store.getters["PrivilegeModule/getPrivileges"];
      },
        getPrivilege(){
        return this.$store.getters["PrivilegeModule/getPrivilege"];
      },
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
