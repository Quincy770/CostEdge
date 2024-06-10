import axios from "axios";
import router from "@/router.js";
import { AlertTriangleIcon } from "vue-feather-icons";

export default {
    namespaced: true,

    //--------------------------------------------------------
    //Define here all state variables
    //--------------------------------------------------------
    state: {
        countries: [],
        country: [],
        totalRows: 0,
    },


    //--------------------------------------------------------
    //Mutate changes to the state through mutations
    //--------------------------------------------------------
    mutations: {
        setCountries: (state, countries) => (state.countries = countries),
        setCountry: (state, country) => (state.country = country),
        pushCountry: (state, country) => state.countries.push(country),
        removeCountry: (state, id) => (state.countries = state.countries.filter(country => country.countryId !== id)),
        setTotalRows: (state, totalRows) => (state.totalRows = totalRows),
    },

    //--------------------------------------------------------
    //Fetch data from API and commit to mutations
    //--------------------------------------------------------
    actions: {
        fetchCountries({ commit }, params) {
            return axios.get(DATA_CONFIGURATION_URL+"/country", { params: params }).then(
                response => {
                    commit("setCountries", response.data);
                    commit("setTotalRows", response.data[0].totalPage);

                    return Promise.resolve();
                },
                error => {
                    commit("setCountries", []);
                    return Promise.reject();
                }
            );
        },

        fetchCountry({ commit, state }, id) {

            var country = state.countries.find((item) => item.countryId==id);
            if (country) {
                commit("setCountry", country);
                return;
            }
            return axios.get(DATA_CONFIGURATION_URL+"/country" + `/${id}`).then(
                response => {
                    commit("setCountry", response.data);
                    return Promise.resolve();
                },
                error => {
                    commit("setCountry", []);
                    return Promise.reject();
                }
            );
        },

        addCountry({ commit }, country) {
            return axios.post(DATA_CONFIGURATION_URL+'/country', country).then(
                (response) => {
                    //router.push({ path: "/pages/view-countries" })
                    return response;//Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        },

        editCountry({ commit }, country) {
            return axios.put(DATA_CONFIGURATION_URL+'/country' + `/${country.countryId}`, country).then(
                (response) => {
                    //  router.push({ path: "/pages/view-countries" })
                    return response; //Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        },

        updateCountryProfilePicture({commit}, formData) {
            var countryId=formData.get('countryId');
            return axios.post(DATA_CONFIGURATION_URL+`/country/country-profile/${countryId}`, formData).then(
                () => {
                    router.push({ path: "/pages/view-countries" })
                    return Promise.resolve();
                },
                error => {
                    return Promise.reject();
                }
            );
        },

        deleteCountry({ commit, state }, id) {
            return axios.delete(DATA_CONFIGURATION_URL+'/country' + `/${id}`).then(
                () => {
                    state.countries = state.countries.filter(country => country.countryId !== id)
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
        getCountries: state => {
            return state.countries;
        },
        getCountry: state => {
            return state.country;
        },
        getTotalRows: state => {
            return state.totalRows;
        }
    },

}
