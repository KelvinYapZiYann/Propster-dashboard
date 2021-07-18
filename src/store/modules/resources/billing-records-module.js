import service from '@/store/services/resources/billing-records-service';
import errorHandlingService from '@/store/services/error-handling-service';

const state = {
  models: [],
  data: {},
  model: {},
  selector: {},

  // assetModels: [],
  // assetData: {},
};

const mutations = {
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
  SET_RECEIVING_BILLING_RECORDS_RESOURCES: (state, response) => {
    let data = response.data;
    state.receivingBillingRecordsModels = [];
    data.forEach(function (item, index) {
      let fields = item.fields;
      let obj = {};
      for (let key in fields) {
        obj[key] = fields[key];
      }

      state.receivingBillingRecordsModels.push(obj);
      obj.id = item.id;
    })
    state.receivingBillingRecordsData = {
      'canAdd': response.meta.canAdd,
      'currentPage': response.meta.current_page,
      'from': response.meta.from,
      'to': response.meta.to,
      'total': response.meta.total,
      'perPage': response.meta.per_page,
      'links': response.meta.links,
    }
  },
  SET_SENDING_BILLING_RECORDS_RESOURCES: (state, response) => {
    let data = response.data;
    state.sendingBillingRecordsModels = [];
    data.forEach(function (item, index) {
      let fields = item.fields;
      let obj = {};
      for (let key in fields) {
        obj[key] = fields[key];
      }

      state.sendingBillingRecordsModels.push(obj);
      obj.id = item.id;
    })
    state.receivingBillingRecordsData = {
      'canAdd': response.meta.canAdd,
      'currentPage': response.meta.current_page,
      'from': response.meta.from,
      'to': response.meta.to,
      'total': response.meta.total,
      'perPage': response.meta.per_page,
      'links': response.meta.links,
    }
  }
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
  getReceivingBillingRecords({commit, dispatch}, params) {
    return service.getReceivingBillingRecords(params)
      .then((response) => {
        commit('SET_RECEIVING_BILLING_RECORDS_RESOURCES', response);
      })
      .catch((e) => {
        try {
          errorHandlingService.verifyErrorFromServer(e);
        } catch(e1) {
          throw e1;
        }
      });
  },
  getSendingBillingRecords({commit, dispatch}, params) {
    return service.getSendingBillingRecords(params)
      .then((response) => {
        commit('SET_SENDING_BILLING_RECORDS_RESOURCES', response);
      })
      .catch((e) => {
        try {
          errorHandlingService.verifyErrorFromServer(e);
        } catch(e1) {
          throw e1;
        }
      });
  },
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
  create({commit, dispatch}) {
    return service.create()
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
  update({commit, dispatch}, payload) {
    return service.update(payload)
      .then((response) => {})
      .catch((e) => {
        try {
          errorHandlingService.verifyErrorFromServer(e);
        } catch(e1) {
          throw e1;
        }
      });
  },
  store({commit, dispatch}, payload) {
    return service.store(payload)
      .then((response) => {})
      .catch((e) => {
        try {
          errorHandlingService.verifyErrorFromServer(e);
        } catch(e1) {
          throw e1;
        }
      });
  },
  remove({commit, dispatch}, Id) {
    return service.remove(Id)
      .then((response) => {})
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
  models: state => state.models,
  model: state => state.model,
  data: state => state.data,
  selector: state => state.selector,
  receivingBillingRecordsModels: state => state.receivingBillingRecordsModels,
  receivingBillingRecordsData: state => state.receivingBillingRecordsData,
  sendingBillingRecordsModels: state => state.sendingBillingRecordsModels,
  sendingBillingRecordsData: state => state.sendingBillingRecordsData,
};

const users = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default users;
