import service from '@/store/services/resources/billing-payments-service';
import errorHandlingService from '@/store/services/error-handling-service';

const state = {
  data: {},
  model: {},
  selector: {},
  models: []
};

const mutations = {
  SET_RESOURCE: (state, response) => {
    let item = response.data;
    let fields = item.fields;

    for (let key in fields) {
      state.model[key] = fields[key];
    }

    let selectors = response.meta.selector;
    for (let field in selectors) {
      let options = [];
      let selector = selectors[field];
      for (let key in selector) {
        options.push({
          id: key,
          name: selector[key]
        })
      }
      state.selector[field] = options;
    }
  },
  SET_RESOURCES: (state, response) => {
    let data = response.data;
    state.models = [];
    data.forEach(function (item, index) {
      let fields = item.fields;
      let obj = {};
      for (let key in fields) {
        obj[key] = fields[key];
      }

      state.models.push(obj);
      obj.id = item.id;
    })
    state.data = {
      'canAdd': response.meta.canAdd,
      'currentPage': response.meta.current_page,
      'from': response.meta.from,
      'to': response.meta.to,
      'total': response.meta.total,
      'perPage': response.meta.per_page,
      'links': response.meta.links,
    }
  },
  // SET_RECEIVING_BILLING_PAYMENTS_RESOURCES: (state, response) => {
  //   let data = response.data;
  //   state.receivingBillingPaymentsModels = [];
  //   data.forEach(function (item, index) {
  //     let fields = item.fields;
  //     let obj = {};
  //     for (let key in fields) {
  //       obj[key] = fields[key];
  //     }

  //     state.receivingBillingPaymentsModels.push(obj);
  //     obj.id = item.id;
  //   })
  //   state.receivingBillingPaymentsData = {
  //     'canAdd': response.meta.canAdd,
  //     'currentPage': response.meta.current_page,
  //     'from': response.meta.from,
  //     'to': response.meta.to,
  //     'total': response.meta.total,
  //     'perPage': response.meta.per_page,
  //     'links': response.meta.links,
  //   }
  // },
  // SET_SENDING_BILLING_PAYMENTS_RESOURCES: (state, response) => {
  //   let data = response.data;
  //   state.sendingBillingPaymentsModels = [];
  //   data.forEach(function (item, index) {
  //     let fields = item.fields;
  //     let obj = {};
  //     for (let key in fields) {
  //       obj[key] = fields[key];
  //     }

  //     state.sendingBillingPaymentsModels.push(obj);
  //     obj.id = item.id;
  //   })
  //   state.sendingBillingPaymentsData = {
  //     'canAdd': response.meta.canAdd,
  //     'currentPage': response.meta.current_page,
  //     'from': response.meta.from,
  //     'to': response.meta.to,
  //     'total': response.meta.total,
  //     'perPage': response.meta.per_page,
  //     'links': response.meta.links,
  //   }
  // }
};

const actions = {
  get({commit, dispatch}, params) {
    return service.get(params)
      .then((response) => {
        commit('SET_RESOURCES', response);
      })
      .catch((e) => {
        try {
          errorHandlingService.verifyErrorFromServer(e);
        } catch(e1) {
          throw e1;
        }
      });
  },
  // getReceivingBillingPayments({commit, dispatch}, params) {
  //   return service.getReceivingBillingPayments(params)
  //     .then((response) => {
  //       commit('SET_RECEIVING_BILLING_PAYMENTS_RESOURCES', response);
  //     })
  //     .catch((e) => {
  //       try {
  //         errorHandlingService.verifyErrorFromServer(e);
  //       } catch(e1) {
  //         throw e1;
  //       }
  //     });
  // },
  // getSendingBillingPayments({commit, dispatch}, params) {
  //   return service.getSendingBillingPayments(params)
  //     .then((response) => {
  //       commit('SET_SENDING_BILLING_PAYMENTS_RESOURCES', response);
  //     })
  //     .catch((e) => {
  //       try {
  //         errorHandlingService.verifyErrorFromServer(e);
  //       } catch(e1) {
  //         throw e1;
  //       }
  //     });
  // },
  getById({commit, dispatch}, Id) {
    return service.getById(Id)
      .then((response) => {
        commit('SET_RESOURCE', response);
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
  models: state => state.models,
  model: state => state.model,
  data: state => state.data,
  selector: state => state.selector,
  // receivingBillingPaymentsModels: state => state.receivingBillingPaymentsModels,
  // receivingBillingPaymentsData: state => state.receivingBillingPaymentsData,
  // sendingBillingPaymentsModels: state => state.sendingBillingPaymentsModels,
  // sendingBillingPaymentsData: state => state.sendingBillingPaymentsData,
};

const users = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default users;
