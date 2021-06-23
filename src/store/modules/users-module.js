import service from '@/store/services/users-service';

const state = {
  model: {},
  selector: {}
};

const mutations = {
  SET_RESOURCE: (state, response) => {
    let item = response.data;
    let fields = item.fields;
    for (let key in fields) {
      state.model[key] = fields[key];
    }

    state.data = {
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
      .then((response) => { commit('SET_RESOURCE', response); });
  },
  update({commit, dispatch}, params) {
    return service.update(params)
      .then((user) => {
        commit('SET_RESOURCE', user);
        return true;
      });
  }
};

const getters = {
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
