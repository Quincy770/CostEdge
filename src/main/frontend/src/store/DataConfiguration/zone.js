import axios from "axios";
import router from "@/router.js";

export default {
    namespaced: true,

    //--------------------------------------------------------
    //Define here all state variables
    //--------------------------------------------------------
    state: {
        zones: [],
        zone: [],
        totalRows: 0,
    },


    //--------------------------------------------------------
    //Mutate changes to the state through mutations
    //--------------------------------------------------------
    mutations: {
        setZones: (state, zones) => (state.zones = zones),
        setZone: (state, zone) => (state.zone = zone),
        pushZone: (state, zone) => state.zones.push(zone),
        removeZone: (state, id) => (state.zones = state.zones.filter(zone => zone.zoneId !== id)),
        setTotalRows: (state, totalRows) => (state.totalRows = totalRows),
    },

    //--------------------------------------------------------
    //Fetch data from API and commit to mutations
    //--------------------------------------------------------
    actions: {
        fetchZones({ commit }, params) {
            return axios.get(DATA_CONFIGURATION_URL+"/zone", { params: params }).then(
                response => {
                    commit("setZones", response.data);
                    commit("setTotalRows", response.data[0].totalPage);
                    
                    return Promise.resolve();
                },
                error => {
                    commit("setZones", []);
                    return Promise.reject();
                }
            );
        },

        fetchZone({ commit, state }, id) {

            var zone = state.zones.find((item) => item.zoneId==id);
            if (zone) {
                commit("setZone", zone);
                return;
            }
            return axios.get(DATA_CONFIGURATION_URL+"/zone" + `/${id}`).then(
                response => {
                    commit("setZone", response.data);
                    return Promise.resolve();
                },
                error => {
                    commit("setZone", []);
                    return Promise.reject();
                }
            );
        },

        addZone({ commit }, zone) {
            return axios.post(DATA_CONFIGURATION_URL+'/zone', zone).then(
                (response) => {
                    //router.push({ path: "/pages/view-zones" })
                    return response;//Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        },

        editZone({ commit }, zone) {
            return axios.put(DATA_CONFIGURATION_URL+'/zone' + `/${zone.zoneId}`, zone).then(
                (response) => {
                    //  router.push({ path: "/pages/view-zones" })
                    return response; //Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        },

        deleteZone({ commit, state }, id) {
            return axios.delete(DATA_CONFIGURATION_URL+'/zone' + `/${id}`).then(
                () => {
                    state.zones = state.zones.filter(zone => zone.zoneId !== id)
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
        getZones: state => {
            return state.zones;
        },
        getZone: state => {
            return state.zone;
        },
        getTotalRows: state => {
            return state.totalRows;
        }
    },

}
