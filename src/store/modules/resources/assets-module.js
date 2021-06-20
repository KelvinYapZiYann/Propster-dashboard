import service from '@/store/services/resources/assets-service';

const state = {
  models: [],
  data: {},
  model: {},
  selector: {},
  assetExpenseModels: [],
  assetExpenseData: {},
  tenantModels: [],
  tenantData: {},
  tenureContractModels: [],
  tenureContractData: {},
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
    }
  },
  SET_RESOURCE: (state, response) => {
    let item = response.data;
    let fields = item.fields;

    for (let key in fields) {
      state.model[key] = fields[key];
    }

    state.data = {
      'title': item.fields['Asset Nickname'],
      'category': "Asset Details",
      'id': item.id
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
  SET_ASSET_EXPENSE_RESOURCES: (state, response) => {
    let data = response.data;
    state.assetExpenseModels = [];
    data.forEach(function (item, index) {
      let fields = item.fields;
      let obj = {};
      for (let key in fields) {
        obj[key] = fields[key];
      }

      state.assetExpenseModels.push(obj);
      obj.id = item.id;
    })
    state.assetExpenseData = {
      'canAdd': response.meta.canAdd,
    }
  },
  SET_TENANT_RESOURCES: (state, response) => {
    let data = response.data;
    state.tenantModels = [];
    data.forEach(function (item, index) {
      let fields = item.fields;
      let obj = {};
      for (let key in fields) {
        obj[key] = fields[key];
      }

      state.tenantModels.push(obj);
      obj.id = item.id;
    })
    state.tenantData = {
      'canAdd': response.meta.canAdd,
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
    }
  },
};

const actions = {
  get({commit, dispatch}, params) {
    return service.get()
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
  getAssetExpenses({commit, dispatch}, Id) {
    return  service.getAssetExpenses(Id)
      .then((response2) => {
        commit('SET_ASSET_EXPENSE_RESOURCES', response2);
      });
  },
  getTenants({commit, dispatch}, Id) {
    return  service.getTenants(Id)
      .then((response) => {
        commit('SET_TENANT_RESOURCES', response);
      });
  },
  getTenureContracts({commit, dispatch}, Id) {
    return  service.getAssetExpenses(Id)
      .then((response2) => {
        commit('SET_TENURE_CONTRACT_RESOURCES', response2);
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
  }
};

const getters = {
  models: state => state.models,
  model: state => state.model,
  data: state => state.data,
  selector: state => state.selector,
  assetExpenseModels: state => state.assetExpenseModels,
  assetExpenseData: state => state.assetExpenseData,
  tenantModels: state => state.tenantModels,
  tenantData: state => state.tenantData,
  tenureContractModels: state => state.assetExpenseModels,
  tenureContractData: state => state.assetExpenseData,
};

const users = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default users;
