import service from '@/store/services/resources/dashboard-service';
import errorHandlingService from '@/store/services/error-handling-service';

const state = {
    general: {},
    rental: {},
    overdueTenantListModels: [],
    overdueTenantListData: {},
    assetVacancy: {},
    cashflow: []
};

const mutations = {
    SET_GENERAL_DETAIL: (state, response) => {
        for (let key in response) {
            state.general[key] = response[key];
        }
    },
    SET_RENTAL_DETAIL: (state, response) => {
        for (let key in response) {
            state.rental[key] = response[key];
        }
    },
    SET_OVERDUE_TENANT_LIST: (state, response) => {
        state.overdueTenantListModels = [];
        response.data.forEach(function (item, index) {
            let fields = item.fields;
            let obj = {};
            for (let key in fields) {
                obj[key] = fields[key];
            }
            obj['id'] = item.id;
            state.overdueTenantListModels.push(obj);
        })
        state.overdueTenantListData = {
            'canAdd': response.meta.canAdd,
            // 'currentPage': response.meta.current_page,
            // 'from': response.meta.from,
            // 'to': response.meta.to,
            // 'total': response.meta.total,
            // 'perPage': response.meta.per_page,
            // 'links': response.meta.links,
            // 'meta': response.meta
        }
    },
    SET_ASSET_VACANCY: (state, response) => {
        for (let key in response) {
            state.assetVacancy[key] = response[key];
        }
    },
    SET_CASHFLOW: (state, response) => {
        state.cashflow = [];
        response.forEach(function (item, index) {
            let obj = {};
            for (let key in item) {
                obj[key] = item[key];
            }
            state.cashflow.push(obj);
        })
    },
};

const actions = {
    getGeneralDetail({commit, dispatch}) {
        return service.getGeneralDetail()
        .then((response) => {
            commit('SET_GENERAL_DETAIL', response);
        })
        .catch((e) => {
            try {
                errorHandlingService.verifyErrorFromServer(e);
            } catch(e1) {
                throw e1;
            }
        });
    },
    getRentalDetail({commit, dispatch}) {
        return service.getRentalDetail()
        .then((response) => {
            commit('SET_RENTAL_DETAIL', response);
        })
        .catch((e) => {
            try {
                errorHandlingService.verifyErrorFromServer(e);
            } catch(e1) {
                throw e1;
            }
        });
    },
    getOverdueTenantList({commit, dispatch}) {
        return service.getOverdueTenantList()
        .then((response) => {
            commit('SET_OVERDUE_TENANT_LIST', response);
        })
        .catch((e) => {
            try {
                errorHandlingService.verifyErrorFromServer(e);
            } catch(e1) {
                throw e1;
            }
        });
    },
    getAssetVacancy({commit, dispatch}) {
        return service.getAssetVacancy()
        .then((response) => {
            commit('SET_ASSET_VACANCY', response);
        })
        .catch((e) => {
            try {
                errorHandlingService.verifyErrorFromServer(e);
            } catch(e1) {
                throw e1;
            }
        });
    },
    getCashflow({commit, dispatch}) {
        return service.getCashflow()
        .then((response) => {
            commit('SET_CASHFLOW', response);
        })
        .catch((e) => {
            try {
                errorHandlingService.verifyErrorFromServer(e);
            } catch(e1) {
                throw e1;
            }
        });
    },
};

const getters = {
    general: state => state.general,
    rental: state => state.rental,
    overdueTenantListModels: state => state.overdueTenantListModels,
    overdueTenantListData: state => state.overdueTenantListData,
    assetVacancy: state => state.assetVacancy,
    cashflow: state => state.cashflow,
};

const store = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default store;
