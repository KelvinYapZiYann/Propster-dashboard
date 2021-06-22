import axios from "axios";
const url = process.env.VUE_APP_API_BASE_URL;

const actions = {
  submit({commit, dispatch}, data) {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    return axios.post(`${url}/select-role`, data, config)
        .then(response => {
          return response.data;
        });
  }
};

const users = {
  namespaced: true,
  actions,
};

export default users;
