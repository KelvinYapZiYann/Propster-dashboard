import service from '@/store/services/users-service';

const state = {
  model: {},
};

const mutations = {
  SET_RESOURCE: (state, user) => {
    state.model = {
      email: user.fields['Email'],
      is_business: user.fields['Is Business'],
      phone_number: user.fields['Phone Number'],
      first_name: user.fields['First Name'],
      last_name: user.fields['Last Name'],
      date_of_birth: user.fields['Date Of Birth'],
      id: user.id,
      gender: user.fields['Gender'],
      full_name: user.fields['Full Name'],
      selected_role: user.fields['Selected Role'],
      tier: user.fields['Tier']
    };
  }
};

const actions = {
  get({commit, dispatch}, params) {
    return service.get()
      .then((user) => { commit('SET_RESOURCE', user); });
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
  user: state => state.model,
};

const users = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default users;
