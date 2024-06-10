/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
  
Vue.use(Vuex)

import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'
import inventory from './inventory.js'
import company from './company.js'
import user from './user.js'
import invoice from './invoice.js'
import confirm from './confirm'
import locale from './locale'
import RoleModule from './DataConfiguration/role'
import PrivilegeModule from './DataConfiguration/privilege'


export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        auth: moduleAuth,
        eCommerce: moduleECommerce,
        inventory:inventory,
        company:company,
        user:user,
        confirm:confirm,
        invoice:invoice,
        locale,
        RoleModule: RoleModule,
        PrivilegeModule: PrivilegeModule,
    },
    strict: process.env.NODE_ENV !== 'production'
})
