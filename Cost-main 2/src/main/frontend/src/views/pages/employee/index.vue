<template>
  <vx-card :title="$t('All Employees')">
    <div id="knowledge-base-page">
      <!-- JUMBOTRON -->
      <div class="knowledge-base-jumbotron">
        <div
          class="knowledge-base-jumbotron-content lg:p-8 md:p-24 sm:p-16 py-8 rounded-lg mb-base"
        >
          <div class="vx-row">
            <div class="w-2/5">
              <vs-input
                :placeholder="$t('Seach Employee Hint')"
                v-model="searchKey"
                icon-pack="feather"
                icon="icon-search"
                size="large"
                class="w-full no-icon-border mt-6"
                @keyup="fetchEmployees()"
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
                    <span @click="perPage=15 ,fetchEmployees()">15</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=25,fetchEmployees()">25</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=50,fetchEmployees()">50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    <span @click="perPage=75,fetchEmployees()">75</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="w-1/5 mt-8">
              <vs-button
              v-if="isGranted('Add Employee')"
                class="small text-base"
                icon-pack="feather"
                icon="icon-plus"
                type="gradient"
                color="success"
                @click.prevent="add"
              >{{$t('Add Employee')}}</vs-button>
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
  :data="employees"
>
  <template slot="thead">
    <vs-th sort-key="number">#</vs-th>
    <vs-th sort-key="firstName">{{$t('firstName')}}</vs-th>
    <vs-th sort-key="middleName">{{$t('middleName')}}</vs-th>
    <vs-th sort-key="lastName">{{$t('lastName')}}</vs-th>
    <vs-th sort-key="email">{{$t('email')}}</vs-th>
    <vs-th sort-key="phoneNumber">{{$t('Phone')}}</vs-th>
    <vs-th sort-key="position">{{$t('position')}}</vs-th>

    <vs-th>{{$t('actions')}}</vs-th>
  </template>
  <template slot-scope="{data}">
    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
      <vs-td class="w-10">{{(indextr+1)+(limit*(currentPage-1))}}</vs-td>
      <vs-td class="pr-4 w-1/6" :data="data[indextr].firstName">{{data[indextr].firstName}}</vs-td>
      <vs-td class="pr-4 w-1/6" :data="data[indextr].middleName">{{data[indextr].middleName}}</vs-td>
      <vs-td class="pr-4 w-1/6" :data="data[indextr].lastName">{{data[indextr].lastName}}</vs-td>
      <vs-td class="pr-4 w-1/6" :data="data[indextr].email">{{data[indextr].email}}</vs-td>
      <vs-td class="pr-4 w-1/6" :data="data[indextr].phoneNumber">{{data[indextr].phoneNumber}}</vs-td>
      <vs-td class="pr-4 w-1/6" :data="data[indextr].position">{{data[indextr].position}}</vs-td>
      <vs-td class="p-0" :data="data[indextr].id">
        <span v-if="isGranted('editEmployee')" @click="updateEmployee(data[indextr].employeeId)">
          <vs-avatar color="lightGreen" icon-pack="feather" icon="icon-edit" />
        </span>
        
        <span v-if="isGranted('deleteEmployee')"
          @click=" openConfirm(data[indextr].employeeId)">
          <vs-avatar color="danger" icon-pack="feather" icon="icon-delete" />
        </span>
      </vs-td>
    </vs-tr>
  </template>
</vs-table>
<p v-if="increament!=0">.</p>
</vx-card>
<vs-pagination class="m-4" :total="total" v-model="currentPage" @change="fetchEmployees"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      employees: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      searchKey: "",
      perPage: 20,
      totalPage: 0,
      preventTableClickAction: false,
      employeeId: "",
    };
  },


  methods: {

fetchEmployees(){
  const thisIns = this;
  this.isLoading=true
  this.$http
    .get("/employee",{
      params: {
        page: thisIns.currentPage,
        limit: thisIns.limit,
        searchKey: thisIns.searchKey }
    })
    .then(function(response) {
      thisIns.isLoading=false
      thisIns.employees = response.data;
      thisIns.total = response.data[0].totalPage;
    }).catch(error => {
        thisIns.isLoading=false
    });
},

openConfirm(employeeId) {
  this.employeeId = employeeId;
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
  thisIns.$http
    .delete("/employee/"+thisIns.employeeId)
    .then(function(response) {
        thisIns.$vs.notify({
        color: "success",
        title: "Status",
        text: "Employee Deleted!"
      });
      thisIns.fetchEmployees();
    }).catch(error => {
    });

},

add: function() {
  this.$router.push({ name: "addEmployee" });
},
updateEmployee: function(id) {
  this.$router.push({ path: "/pages/edit-employee/" + id });
}
},
created() {
this.fetchEmployees();
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
