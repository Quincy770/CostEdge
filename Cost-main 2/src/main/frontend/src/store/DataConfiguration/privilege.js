import axios from "axios";
import router from "@/router.js";
export  default {
	namespaced: true,
//--------------------------------------------------------
//Define here all state variables
//--------------------------------------------------------
    state:{
            privileges: [],
            privilege: [],
        },
//--------------------------------------------------------
//Mutate changes to the state through mutations
//--------------------------------------------------------
    mutations: {
            setPrivileges: (state, privileges) => (state.privileges = privileges),
            setPrivilege: (state, privilege) => (state.privilege = privilege),
            pushPrivilege: (state, privilege) => state.privileges.push(privilege),
            removeLab: (state, id) =>(state.privileges = state.privileges.filter(privilege => privilege.privilegeId !== id))
        },

//--------------------------------------------------------
//Fetch data from API and commit to mutations
//--------------------------------------------------------
    actions: {
        fetchPrivileges({ commit }, params) {

            return axios.get("/privileges", { params: { page: params.currentPage, limit: params.limit } }).then(
            response => {
                commit("setPrivileges", response.data);
                return Promise.resolve();
            },
            error => {
                commit("setPrivileges", []);
                return Promise.reject();
            }
            );
        },

        fetchPrivilege({ commit, state }, id) {

            var privilege = state.privileges.find((item)=>item.privilegeId==id);
            if(privilege){
                commit("setPrivilege", privilege);
                return;
            }
            return axios.get("/privileges" + `/${id}`).then(
            response => {
                commit("setPrivilege", response.data);
                return Promise.resolve();
            },
            error => {
                commit("setPrivilege", []);
                return Promise.reject();
            }
            );
        },

        searchPrivilege({ commit },params) {
            return axios.post('/privileges/search',
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
                commit("setPrivileges", response.data);
                return Promise.resolve();
            },
            error => {
                commit("setPrivileges", []);
                return Promise.reject();
            }
            );
        },

        addPrivilege({ commit },privilege) {
            return axios.post('/privileges', privilege).then(

            () => {
                router.push({name: "viewPrivileges"})
                return Promise.resolve();
            },
            error => {
                return Promise.reject();
            }
            );
        },

        editPrivilege({ commit }, privilege) {
            return axios.put('/privileges' + `/${privilege.privilegeId}`, privilege).then(
            () => {
                router.push({name: "viewPrivileges"})
                return Promise.resolve();
            },
            error => {
                return Promise.reject();
            }
            );
        },

        deletePrivilege({ commit, state }, id) {
            return axios.delete('/privileges' + `/${id}`).then(
            () => {
                state.privileges = state.privileges.filter(privilege => privilege.privilegeId !== id)
                return Promise.resolve();
            },
            error => {
                return Promise.reject();
            }
            );
        },
        },

//--------------------------------------------------------
//Fetch data from state through getters
//--------------------------------------------------------
    getters: {
        getPrivileges: state => {
            return state.privileges;
        },
        getPrivilege: state => {
            return state.privilege;
        }
        },
}
