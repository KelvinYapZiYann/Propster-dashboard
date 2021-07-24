import service from '@/store/services/resources/dashboard-service';
import errorHandlingService from '@/store/services/error-handling-service';

const state = {
    general: {},
    rental: {},
    overdueTenantList: []
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
        response.forEach(function (item, index) {
            let fields = item.fields;
            let obj = {};
            for (let key in fields) {
                obj[key] = fields[key];
            }
            state.overdueTenantList.push(obj);
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
            commit('SET_OVERDUE_TENANT_LIST', response.data);
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
    overdueTenantList: state => state.overdueTenantList,
};

const store = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default store;
