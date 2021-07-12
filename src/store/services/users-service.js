import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;

function get() {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/users`, config)
    .then(response => {
      return response.data;
    });
}

function update(params) {
  const userId = params.userId;
  const payload = params.data;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.post(`${url}/users/${userId}`, payload, config)
    .then(response => {
      return response.data;
    });
}


export default {
  get,
  update
};

