import service from '@/store/services/resources/dashboard-service';
import errorHandlingService from '@/store/services/error-handling-service';

const state = {
    general: {},
    rental: {},
    overdueTenantListModels: [],
    overdueTenantListData: {},
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
    }
};

const getters = {
    general: state => state.general,
    rental: state => state.rental,
    overdueTenantListModels: state => state.overdueTenantListModels,
    overdueTenantListData: state => state.overdueTenantListData,
};

const store = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default store;
