import service from "@/store/services/resources/asset-expenses-service";

const state = {
  models: [],
  data: {},
  model: {},
  selector: {}
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
      'category': "Asset Expenses Details",
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
  }
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
  selector: state => state.selector
};

const users = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default users;
