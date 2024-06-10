import axios from "axios";
import router from "@/router.js";

export default {
    namespaced: true,

    //--------------------------------------------------------
    //Define here all state variables
    //--------------------------------------------------------
    state: {
        regions: [],
        region: [],
        totalRows: 0,
    },


    //--------------------------------------------------------
    //Mutate changes to the state through mutations
    //--------------------------------------------------------
    mutations: {
        setRegions: (state, regions) => (state.regions = regions),
        setRegion: (state, region) => (state.region = region),
        pushRegion: (state, region) => state.regions.push(region),
        removeRegion: (state, id) => (state.regions = state.regions.filter(region => region.regionId !== id)),
        setTotalRows: (state, totalRows) => (state.totalRows = totalRows),
    },

    //--------------------------------------------------------
    //Fetch data from API and commit to mutations
    //--------------------------------------------------------
    actions: {
        fetchRegions({ commit }, params) {
            return axios.get(DATA_CONFIGURATION_URL+"/region", { params: params }).then(
                response => {
                    commit("setRegions", response.data);
                    commit("setTotalRows", response.data[0].totalPage);

                    return Promise.resolve();
                },
                error => {
                    commit("setRegions", []);
                    return Promise.reject();
                }
            );
        },

        fetchRegion({ commit, state }, id) {

            var region = state.regions.find((item) => item.regionId==id);
            if (region) {
                commit("setRegion", region);
                return;
            }
            return axios.get(DATA_CONFIGURATION_URL+"/region" + `/${id}`).then(
                response => {
                    commit("setRegion", response.data);
                    return Promise.resolve();
                },
                error => {
                    commit("setRegion", []);
                    return Promise.reject();
                }
            );
        },

        addRegion({ commit }, region) {
            return axios.post(DATA_CONFIGURATION_URL+'/region', region).then(
                (response) => {
                    //router.push({ path: "/pages/view-regions" })
                    return response;//Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        },

        editRegion({ commit }, region) {
            return axios.put(DATA_CONFIGURATION_URL+'/region' + `/${region.regionId}`, region).then(
                (response) => {
                    //  router.push({ path: "/pages/view-regions" })
                    return response; //Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        },

        deleteRegion({ commit, state }, id) {
            return axios.delete(DATA_CONFIGURATION_URL+'/region' + `/${id}`).then(
                () => {
                    state.regions = state.regions.filter(region => region.regionId !== id)
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
        getRegions: state => {
            return state.regions;
        },
        getRegion: state => {
            return state.region;
        },
        getTotalRows: state => {
            return state.totalRows;
        }
    },

}
