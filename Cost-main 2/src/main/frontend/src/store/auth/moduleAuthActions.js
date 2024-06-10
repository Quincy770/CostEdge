/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions

==========================================================================================*/


import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
import axios from 'axios'
import Vue from 'vue'
 import store from '@/store/store'


export default {
    data() {
        return {
            indicator: "",
            userId:"",
            notVerified:true
        }
    },
    loginAttempt({ dispatch }, payload) {

        const newPayload = {
            userDetails: payload.userDetails,
            notify: payload.notify,
            closeAnimation: payload.closeAnimation
        }


        dispatch('login', newPayload)

    },
    login({ commit, state, dispatch }, payload) {

        if (state.isUserLoggedIn()) {
            // Close animation if passed as payload
            if (payload.closeAnimation) payload.closeAnimation()

            payload.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });

            return false
        }


        axios.post('/auth/login', {
            "email": payload.userDetails.email,
            "password": payload.userDetails.password
        })
            .then((result) => {
                if (result.data.accessToken != null && result.data.userId != '') {
                    localStorage.setItem('accessToken', result.data.accessToken);
                    localStorage.setItem('userId', result.data.userId);
                  localStorage.setItem('userStatus', result.data.userStatus);
                  localStorage.setItem('companyId',result.data.companyId)
                    state.userId=result.data.userId;
                    state.accessToken=result.data.accessToken;
                    localStorage.setItem('userType',result.data.userType);
                    if(result.data.userStatus=="Active"){
                        if(localStorage.getItem('userType') == 'Logistics' || localStorage.getItem('userType') == 'Finance')
                          router.push('/pages/order/viewOrders');
                      else if (localStorage.getItem('userType') == "CustomerSeller") {
                         router.push("/pages/customer/view-customer-inventory");
                        }
                       else if (localStorage.getItem('userType') == "Admin") {
                          router.push("/pages/orders/shop");
                        }
                       else if (localStorage.getItem('userType') == "Customer") {
                          router.push("/pages/orders/shop");
                        }
                       else if (localStorage.getItem('userType') == "CustomerAdmin") {
                          router.push("/pages/my-inventory");
                        }

                        else
                            router.push('/');
                    }
                    else{
                        payload.notify({
                        time: 2500,
                        title: 'Login Failed',
                        text: "Verify your email first",
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'

                    });
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('userType');
                    localStorage.removeItem('userStatus');
                    router.push('/pages/login');
                    }
                }

                // Close animation if passed as payload
                if (payload.closeAnimation) payload.closeAnimation()

            }, (err) => {
                // Close animation if passed as payload
                if (payload.closeAnimation) payload.closeAnimation()
                if(err=="Error: Network Error" || err=="Error: Request failed with status code 404"){
                    payload.notify({
                        time: 2500,
                        title: 'Login Failed',
                        text: "Check your connection",
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    });
                }

            else{
                payload.notify({
                    time: 2500,
                    title: 'Login Failed',
                    text: "Incorrect Password or Email",
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                });
            }
            })
    },


    /*  registerUser({ dispatch }, payload) {

         // create user using firebase
         firebase.auth().createUserWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
             .then(() => {
                 payload.notify({
                     title: 'Account Created',
                     text: 'You are successfully registered!',
                     iconPack: 'feather',
                     icon: 'icon-check',
                     color: 'success'
                 });

                 const newPayload = {
                     userDetails: payload.userDetails,
                     notify: payload.notify,
                     updateUsername: true
                 }
                 dispatch('login', newPayload)
             }, (error) => {
                 payload.notify({
                     title: 'Error',
                     text: error.message,
                     iconPack: 'feather',
                     icon: 'icon-alert-circle',
                     color: 'danger'
                 });
             })
     }, */
    updateUsername({ commit }, payload) {
        payload.user.updateProfile({
            displayName: payload.username
        }).then(() => {

            // If username update is success
            // update in localstorage
            let newUserData = Object.assign({}, payload.user.providerData[0])
            newUserData.displayName = payload.username
            commit('UPDATE_AUTHENTICATED_USER', newUserData)

            // If reload is required to get fresh data after update
            // Reload current page
            if (payload.isReloadRequired) {
                router.push(router.currentRoute.query.to || '/')
            }
        }).catch((err) => {
            payload.notify({
                time: 8800,
                title: 'Error',
                text: err.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
            });
        })
    },
    updateAuthenticatedUser({ commit }, payload) {
        commit('UPDATE_AUTHENTICATED_USER', payload)
    },
    updated() {
        if(this.indicator!=""){
        router.push('/');
        }
        // if(this.notVerified==true){

        //     router.push('/pages/login');
        // }
    }

}
