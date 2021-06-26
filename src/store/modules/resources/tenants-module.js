import service from '@/store/services/resources/tenants-service';

const state = {
  models: [],
  data: {},
  model: {},
  selector: {},
  assetModels: [],
  assetData: {},

  tenureContractModels: [],
  tenureContractData: {},
  receivingPaymentRecordModels: [],
  receivingPaymentRecordData: {},
  sendingPaymentRecordModels: [],
  sendingPaymentRecordData: {}


  // assetExpenseModels: [],
  // assetExpenseData: {},
  // tenureContractData: {},
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
  SET_ASSET_RESOURCES: (state, response) => {
    let data = response.data;
    state.assetModels = [];
    data.forEach(function (item, index) {
      let fields = item.fields;
      let obj = {};
      for (let key in fields) {
        obj[key] = fields[key];
      }

      state.assetModels.push(obj);
      obj.id = item.id;
    })
    state.assetData = {
      'canAdd': response.meta.canAdd,
      'currentPage': response.meta.current_page,
      'from': response.meta.from,
      'to': response.meta.to,
      'total': response.meta.total,
      'perPage': response.meta.per_page,
      'links': response.meta.links,
    }
  },
  SET_TENURE_CONTRACT_RESOURCES: (state, response) => {
    let data = response.data;
    state.tenureContractModels = [];
    data.forEach(function (item, index) {
      let fields = item.fields;
      let obj = {};
      for (let key in fields) {
        obj[key] = fields[key];
      }

      state.tenureContractModels.push(obj);
      obj.id = item.id;
    })
    state.tenureContractData = {
      'canAdd': response.meta.canAdd,
      'currentPage': response.meta.current_page,
      'from': response.meta.from,
      'to': response.meta.to,
      'total': response.meta.total,
      'perPage': response.meta.per_page,
      'links': response.meta.links,
      // 'meta': response.meta
    }
  },
  SET_RECEIVING_PAYMENT_RECORD_RESOURCES: (state, response) => {
    let data = response.data;
    state.receivingPaymentRecordModels = [];
    data.forEach(function (item, index) {
      let fields = item.fields;
      let obj = {};
      for (let key in fields) {
        obj[key] = fields[key];
      }

      state.receivingPaymentRecordModels.push(obj);
      obj.id = item.id;
    })
    state.receivingPaymentRecordData = {
      'canAdd': response.meta.canAdd,
      'currentPage': response.meta.current_page,
      'from': response.meta.from,
      'to': response.meta.to,
      'total': response.meta.total,
      'perPage': response.meta.per_page,
      'links': response.meta.links,
    }
  },
  SET_SENDING_PAYMENT_RECORD_RESOURCES: (state, response) => {
    let data = response.data;
    state.sendingPaymentRecordModels = [];
    data.forEach(function (item, index) {
      let fields = item.fields;
      let obj = {};
      for (let key in fields) {
        obj[key] = fields[key];
      }

      state.sendingPaymentRecordModels.push(obj);
      obj.id = item.id;
    })
    state.sendingPaymentRecordData = {
      'canAdd': response.meta.canAdd,
      'currentPage': response.meta.current_page,
      'from': response.meta.from,
      'to': response.meta.to,
      'total': response.meta.total,
      'perPage': response.meta.per_page,
      'links': response.meta.links,
    }
  },
  // SET_ASSET_EXPENSE_RESOURCES: (state, response) => {
  //   let data = response.data;
  //   state.assetExpenseModels = [];
  //   data.forEach(function (item, index) {
  //     let fields = item.fields;
  //     let obj = {};
  //     for (let key in fields) {
  //       obj[key] = fields[key];
  //     }
  //
  //     state.assetExpenseModels.push(obj);
  //     obj.id = item.id;
  //   })
  //   state.assetExpenseData = {
  //     'canAdd': response.meta.canAdd,
  //   }
  // },
};

const actions = {
  get({commit, dispatch}, params) {
    return service.get(params)
      .then((response) => {
        commit('SET_RESOURCES', response);
      });
  },
  getById({commit, dispatch}, Id) {
    return service.getById(Id)
      .then((response) => {
        commit('SET_RESOURCE', response);
      });
  },
  create({commit, dispatch}) {
    return service.create()
      .then((response) => {
        commit('SET_RESOURCE', response);
      });
  },
  update({commit, dispatch}, payload) {
    return service.update(payload)
      .then((response) => {});
  },
  store({commit, dispatch}, payload) {
    return service.store(payload)
      .then((response) => {});
  },
  remove({commit, dispatch}, Id) {
    return service.remove(Id)
      .then((response) => {});
  },

  getAssets({commit, dispatch}, params) {
    return  service.getAssets(params)
      .then((response) => {
        commit('SET_ASSET_RESOURCES', response);
      });
  },

  getTenureContracts({commit, dispatch}, params) {
    return  service.getTenureContracts(params)
      .then((response) => {
        commit('SET_TENURE_CONTRACT_RESOURCES', response);
      });
  },

  getReceivingPaymentRecords({commit, dispatch}, params) {
    return  service.getReceivingPaymentRecords(params)
      .then((response) => {
        commit('SET_RECEIVING_PAYMENT_RECORD_RESOURCES', response);
      });
  },

  getSendingPaymentRecords({commit, dispatch}, params) {
    return  service.getSendingPaymentRecords(params)
      .then((response) => {
        commit('SET_SENDING_PAYMENT_RECORD_RESOURCES', response);
      });
  },

  // getReceivingPayments({commit, dispatch}, Id) {
  //   return  service.getAssetExpenses(Id)
  //     .then((response2) => {
  //       commit('SET_TENURE_CONTRACT_RESOURCES', response2);
  //     });
  // },
  // getSendingPayments({commit, dispatch}, Id) {
  //   return  service.getAssetExpenses(Id)
  //     .then((response2) => {
  //       commit('SET_TENURE_CONTRACT_RESOURCES', response2);
  //     });
  // },

};

const getters = {
  models: state => state.models,
  model: state => state.model,
  data: state => state.data,
  selector: state => state.selector,
  assetModels: state => state.assetModels,
  assetData: state => state.assetData,
  tenureContractModels: state => state.tenureContractModels,
  tenureContractData: state => state.tenureContractData,
  receivingPaymentRecordModels: state => state.receivingPaymentRecordModels,
  receivingPaymentRecordData: state => state.receivingPaymentRecordData,
  sendingPaymentRecordModels: state => state.sendingPaymentRecordModels,
  sendingPaymentRecordData: state => state.sendingPaymentRecordData,
  // assetExpenseModels: state => state.assetExpenseModels,
  // assetExpenseData: state => state.assetExpenseData,
};

const users = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default users;
