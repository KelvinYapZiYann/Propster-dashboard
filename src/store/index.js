import Vue from 'vue';
import Vuex from 'vuex';

import auth from "./modules/auth";
import alerts from "./modules/alerts-module";
import users from "./modules/users-module";
import reset from "./modules/reset";
import asset from "./modules/resources/assets-module"
import tenant from "./modules/resources/tenants-module"
import tenureContract from "./modules/resources/tenure-contracts-module"
import assetExpenses from "./modules/resources/asset-expenses-module"
import paymentRecords from "./modules/resources/payment-records-module"
import selectRole from "./modules/select-role-module"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    alerts,
    users,
    reset,
    asset,
    tenant,
    assetExpenses,
    paymentRecords,
    tenureContract,
    selectRole
  }
});
