import Vue from 'vue';
import Vuex from 'vuex';

import auth from "./modules/auth";
import alerts from "./modules/alerts-module";
import users from "./modules/users-module";
import reset from "./modules/reset";
import dashboard from "./modules/resources/dashboard-modules"
import asset from "./modules/resources/assets-module"
import tenant from "./modules/resources/tenants-module"
import tenureContract from "./modules/resources/tenure-contracts-module"
import assetExpenses from "./modules/resources/asset-expenses-module"
import billingRecords from "./modules/resources/billing-records-module"
import billingPayments from "./modules/resources/billing-payments-module"
import paymentRecords from "./modules/resources/payment-records-module"
import selectRole from "./modules/select-role-module"
import createProfile from "./modules/create-profile-module"
import todoList from "./modules/resources/todo-list-module"
import mobileLayout from "./modules/mobile-layout-module"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    alerts,
    users,
    reset,
    dashboard,
    asset,
    tenant,
    assetExpenses,
    billingRecords,
    billingPayments,
    paymentRecords,
    tenureContract,
    selectRole,
    createProfile,
    todoList,
    mobileLayout,
  }
});
