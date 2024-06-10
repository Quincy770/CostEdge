import axios from "axios";
import router from "@/router.js";

export  default {
	namespaced: true,

//--------------------------------------------------------
//Define here all state variables
//--------------------------------------------------------
    state:{
            roles: [],
            role:[],
            assignedRoles: []
        },


//--------------------------------------------------------
//Mutate changes to the state through mutations
//--------------------------------------------------------
    mutations: {
            setRoles: (state,roles) => (state.roles = roles),
            setRole: (state,role) => (state.role = role),
            pushRole: (state, role) => state.reles.push(role),
            removeRole: (state, id) =>(state.roles = state.roles.filter(role => role.roleId !== id)),
            setAssignedRoles: (state,assignedRoles) => (state.assignedRoles = assignedRoles),
        },

//--------------------------------------------------------
//Fetch data from API and commit to mutations
//--------------------------------------------------------
    actions: {
      fetchRoles({ commit }, params) {

        return axios.get("/roles", { params: { page: params.currentPage, limit: params.limit } }).then(
        response => {

            commit("setRoles", response.data);
            return Promise.resolve();
        },
        error => {
            commit("setRoles", []);
            return Promise.reject();
        }
        );
    },

    fetchRole({ commit, state }, id) {
        var role = state.roles.find((item)=>item.roleId==id);
        if(role){
            commit("setRole", role);
            return;
        }
        return axios.get("/roles" + `/${id}`).then(
        response => {
            commit("setRole", response.data);
            return Promise.resolve();
        },
        error => {
            commit("setRole", []);
            return Promise.reject();
        }
        );
    },

    searchRole({ commit },params) {
        return axios.post('/roles/search',
        {
            searchKey: params.searchKey
        },
        {
            params: {
                    page: params.currentPage,
                    limit: params.limit
                }
        }

        ).then(
        response => {
            commit("setRoles", response.data);
            return Promise.resolve();
        },
        error => {
            commit("setRoles", []);
            return Promise.reject();
        }
        );
    },
        addRole({ commit },role) {
            alert("")
          return axios.post('/roles', role).then(
          () => {
              router.push({name: "viewRoles"})
              return Promise.resolve();
          },
          error => {
              return Promise.reject();
          }
          );
      },

      checkRole({ commit, state }, roleName) {

        var role = state.roles.find((item)=>item.roleName==roleName);
        if(role){
            commit("setRole", role);
            return;
        }
        return axios.get("/roles/checkname" + `/${roleName}`).then(
        response => {
            commit("setRole", response.data);
            return Promise.resolve();
        },
        error => {
            commit("setRole", []);
            return Promise.reject();
        }
        );
    },

    editRole({ commit }, role) {
      return axios.put('/roles' + `/${role.roleId}`, role).then(
      () => {
          router.push({name: "viewRoles"})
          return Promise.resolve();
      },
      error => {
          return Promise.reject();
      }
      );
  },

  deleteRole({ commit, state }, id) {
      return axios.delete('/roles' + `/${id}`).then(
      () => {
          state.roles = state.roles.filter(role => role.roleId !== id)
          return Promise.resolve();
      },
      error => {
          return Promise.reject();
      }
      );
  },

  fetchAssignedRoles({ commit }, userId) {

    return axios.get("/roles/assigned-roles/"+userId).then(
    response => {
        commit("setAssignedRoles", response.data);
        return Promise.resolve();
    },
    error => {
        commit("setAssignedRoles", []);
        return Promise.reject();
    }
    );
},
},

//--------------------------------------------------------
//Fetch data from state through getters
//--------------------------------------------------------
    getters: {
      getRoles: state => {
        return state.roles;
    },
     getRole: state => {
        return state.role;
    },
    getAssignedRoles: state => {
        return state.assignedRoles;
   },

   },

}
