<template>
  <vx-card :title="$t('allRoles')">
    <div id="knowledge-base-page">
      <!-- JUMBOTRON -->
      <div class="knowledge-base-jumbotron">
        <div
          class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base"
        >
          <div class="vx-row">
            
            <div class="w-1/2 ml-12 mt-6">
              
            </div>
            <div class="w-1/6 mt-8">
              <vs-button
                class="small text-base"
                icon-pack="feather"
                icon="icon-list"
                type="gradient"
                color="success"
                @click.prevent="list"
              >{{$t('allRoles')}}</vs-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vx-card id="internal-card" no-shadow card-border>
      <!-- KNOWLEDGE BASE CARDS  -->
      <vs-table
        class="stripe"
        hoverFlat
        :data="item"
      >
        <template>
          <vs-tr>
            <vs-td
              class="pr-4 w-1/4">{{$t('roleName')}}</vs-td>
            <vs-td class="p-0">{{item.roleName}}</vs-td>
          </vs-tr>
          <vs-tr>
            <vs-td
              class="pr-4 w-1/4">{{$t('roleFullName')}}</vs-td>
            <vs-td class="p-0">{{item.roleFullName}}</vs-td>
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
      dot: "",
      roles: [],
      selected: [],
      selected: [],
      limit: 15,
      total: 0,
      searchRoleName: "",
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
      role: "",
      confirm: "",
      increament: 0,
      decreament: 0,
      responseGeted: false,
      currentItemView: "item-grid-view",
      knowledgeBaseSearchQuery: "",
      item: {},
      perPage: 20,
      currentPage: 1,
      role:this.$route.params.id
    };
  },
  methods: {
    list: function() {
      this.$router.push({ path: "/pages/view-roles" });
    },
    search: function(searchKey) {
      this.$http
        .post(
          "/roles/search",
          {
            searchKey: searchKey
          },
          { params: { page: this.currentPage, limit: this.limit } }
        )
        .then(response => {
          this.roles = response.data;
          this.total = thisIns.roles[0].totalPages;
          thisIns.$store.dispatch("user/populateUser", response.data);
        });
    },
    openConfirm(status, role, color) {
      this.status[0] = true;
      if (status == true) {
        this.roleStatus = "Disabled";
        this.confirm = "Do You Want to Disable?";
      } else {
        this.roleStatus = "Active";
        this.confirm = "Do You Want to Enable";
      }
      this.id = role;
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
        .delete("/roles/" + this.id, {
          roleStatus: this.roleStatus
        })
        .then(response => {});
      this.$vs.notify({
        color: "success",
        title: "Status",
        text: "Result Type Status Changed"
      });
    }
  },
  created() {
    const thisIns = this;
    this.$http
      .get("/roles/"+this.id, {
        params: { page: this.currentPage, limit: this.limit }
      })
      .then(function(response) {
        thisIns.item = response.data;
        //alert(JSON.stringify(response.data));
        this.responseGeted = true;
      })
      .catch(error => {
    //alert("err")
        this.responseGeted = true;
      });
  },
  updated() {
    
  },
  computed: {
   
  }
};
</script>

<style lang="scss" scoped>
.knowledge-base-jumbotron-content {
  background-image: url("../../../assets/images/pages/knowledge-base-cover.jpg");
  background-size: cover;
}
@import "@/assets/scss/vuesax/pages/switch.scss";
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
