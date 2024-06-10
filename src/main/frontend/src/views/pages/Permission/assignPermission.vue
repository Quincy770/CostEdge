<template>
  <vx-card :title="$t('allPrivileges')+' | '+ getRole.roleName">
    <!-- <div id="knowledge-base-page">
    <vx-card :title="$t('allPrivileges')+' | '+getRole.roleName">
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
        :max-items="perPage"
        :data="permissions"
      >
        <template slot="thead">
          <vs-th sort-key="number">#</vs-th>
          <vs-th sort-key="privilegeName">{{$t('privilegeName')}}</vs-th>
          <vs-th sort-key="privilegeUrl">{{$t('privilegeUrl')}}</vs-th>
          <vs-th sort-key="method">{{$t('method')}}</vs-th>
          <vs-th v-if="isGranted('setRolePermission')" sort-key="actions">{{$t('allowAll')}}
            <ul style="margin-left: 15px" class="switch-container">
                <li>
                  <span v-if="isGranted('setRolePermission')">
                    <vs-switch color="success" @click="allowAllPermissions()" v-model="assignAllPermissions" />
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
                  <span v-if="isGranted('setRolePermission')">
                    <vs-switch @click="pushOrRemovePermissionId(data[indextr].permissionStatus, data[indextr].privilegeId)" color="success" v-model="data[indextr].permissionStatus" />
                  </span>
                </li>
              </ul>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
    <vs-pagination class="m-4" :total="totalPage" v-model="currentPage" @change="getRoles"></vs-pagination>
  </vx-card>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      permissionStatuses: [],
      assignedPermissionIds: [],
      roleId: this.$route.params.roleId,
      assignAllPermissions: false,
      permissions: [],
      limit: 15,
      total: 0,
      currentPage: 1,
      perPage: 20,
    };
  },
  methods: {

    fetchAllPrivileges() {
        var params = {limit: this.perPage, page: this.currentPage}
        this.$store.dispatch('PrivilegeModule/fetchPrivileges', params).then(() => {
        this.isLoading = false;
        this.fetchAssignedPermissions();
        this.populatePermission();

        });
    },

    fetchAssignedPermissions(){

          this.$store.dispatch('ManageRolePermissionsModule/fetchAssignedPermissions', this.roleId).then(response => {
          this.totalPage = 1;
          this.isLoading = false;
          this.populateAssignedPermissionIds();
          this.populatePermission();
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

    populatePermission(){
          this.permissions = this.getPrivileges;
          var permissions=[], permissionObject={};    
          for(let k=0; k< this.permissions.length; k++){
              permissionObject =  {
                          "privilegeId": this.permissions[k].privilegeId,
                          "privilegeName": this.permissions[k].privilegeName,
                          "privilegeDescription": this.permissions[k].privilegeDescription,
                          "privilegeUrl": this.permissions[k].privilegeUrl,                          
                          "method": this.permissions[k].method,
                          "createdBy": this.permissions[k].createdBy,
                          "privileged": this.permissions[k].privileged,
                          "totalPage": this.permissions[k].totalPage,
                          "permissionStatus": (this.getAssignedPermissions.filter(assignedPermission=>assignedPermission.privilegeId  ==this.permissions[k].privilegeId)).length>0 && this.getAssignedPermissions!=undefined ? true:false
                        }
              permissions.push(permissionObject);
        }
        this.permissions = permissions;
        if(this.permissions.filter(permission=>permission.permissionStatus==false).length==0)
            this.assignAllPermissions = true;
    },
    
    pushOrRemovePermissionId(permissionStatus, privilegeId) {
        this.assignAllPermissions = false;
        var obj={};
        if(!permissionStatus){
            this.assignedPermissionIds.push(privilegeId)
        }
        else{
           this.assignedPermissionIds = this.assignedPermissionIds.filter(assignedPermission=>assignedPermission != privilegeId)
        }
        this.assignPermission();

    },

    assignPermission(){
        var rolePermissionObj = {roleId: this.roleId, privilegeIds: this.assignedPermissionIds, "isPrivileged":false, createdBy: localStorage.getItem('userId')}
        this.$store.dispatch('ManageRolePermissionsModule/assignPermission', rolePermissionObj).then(response => {
            
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    allowAllPermissions(){
      this.assignedPermissionIds = [];
      for(let j=0; j<this.permissions.length; j++){
        if(!this.assignAllPermissions){
            this.assignedPermissionIds.push(this.permissions[j].privilegeId);
            this.permissions[j].permissionStatus = true;
        }

        else{
            this.assignedPermissionIds = [];
            this.permissions[j].permissionStatus = false;
        }
      }
      this.assignPermission();

    },
    populateAssignedPermissionIds(){
      for(let i=0; i<this.getAssignedPermissions.length; i++){
          this.assignedPermissionIds.push(this.getAssignedPermissions[i].privilegeId)
      }
    },

    fetchRole(){
      this.$store.dispatch('RoleModule/fetchRole', this.roleId).then(() => {
    })
    }


  },
  created() {
    this.fetchAllPrivileges();    
    this.fetchRole();
  },

  computed: {
    getPrivileges(){
        return this.$store.getters["PrivilegeModule/getPrivileges"];
      },

    getPrivilege(){
      return this.$store.getters["PrivilegeModule/getPrivilege"];
    },

    getAssignedPermissions(){
      return this.$store.getters["ManageRolePermissionsModule/getAssignedPermissions"];
    },

    getRole(){
     return this.$store.getters["RoleModule/getRole"];
   }
  }
};
</script>

<style lang="scss" scoped>

</style>
