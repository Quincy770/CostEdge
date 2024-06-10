import axios from "axios";
import router from "@/router.js";

export default {
    namespaced: true,

    //--------------------------------------------------------
    //Define here all state variables
    //--------------------------------------------------------
    state: {
        woredas: [],
        woreda: [],
        totalRows: 0,
    },


    //--------------------------------------------------------
    //Mutate changes to the state through mutations
    //--------------------------------------------------------
    mutations: {
        setWoredas: (state, woredas) => (state.woredas = woredas),
        setWoreda: (state, woreda) => (state.woreda = woreda),
        pushWoreda: (state, woreda) => state.woredas.push(woreda),
        removeWoreda: (state, id) => (state.woredas = state.woredas.filter(woreda => woreda.woredaId !== id)),
        setTotalRows: (state, totalRows) => (state.totalRows = totalRows),
    },

    //--------------------------------------------------------
    //Fetch data from API and commit to mutations
    //--------------------------------------------------------
    actions: {
        fetchWoredas({ commit }, params) {
            return axios.get(DATA_CONFIGURATION_URL+"/woreda", { params: params }).then(
                response => {
                    commit("setWoredas", response.data);
                    commit("setTotalRows", response.data[0].totalPage);

                    return Promise.resolve();
                },
                error => {
                    commit("setWoredas", []);
                    return Promise.reject();
                }
            );
        },

        fetchWoreda({ commit, state }, id) {

            var woreda = state.woredas.find((item) => item.woredaId==id);
            if (woreda) {
                commit("setWoreda", woreda);
                return;
            }
            return axios.get(DATA_CONFIGURATION_URL+"/woreda" + `/${id}`).then(
                response => {
                    commit("setWoreda", response.data);
                    return Promise.resolve();
                },
                error => {
                    commit("setWoreda", []);
                    return Promise.reject();
                }
            );
        },

        addWoreda({ commit }, woreda) {
            return axios.post(DATA_CONFIGURATION_URL+'/woreda', woreda).then(
                (response) => {
                    //router.push({ path: "/pages/view-woredas" })
                    return response;//Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        },

        editWoreda({ commit }, woreda) {
            return axios.put(DATA_CONFIGURATION_URL+'/woreda' + `/${woreda.woredaId}`, woreda).then(
                (response) => {
                    //  router.push({ path: "/pages/view-woredas" })
                    return response; //Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        },

        deleteWoreda({ commit, state }, id) {
            return axios.delete(DATA_CONFIGURATION_URL+'/woreda' + `/${id}`).then(
                () => {
                    state.woredas = state.woredas.filter(woreda => woreda.woredaId !== id)
                    return Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        }
    },


    //--------------------------------------------------------
    //Fetch data from state through getters
    //--------------------------------------------------------
    getters: {
        getWoredas: state => {
            return state.woredas;
        },
        getWoreda: state => {
            return state.woreda;
        },
        getTotalRows: state => {
            return state.totalRows;
        }
    },

}
