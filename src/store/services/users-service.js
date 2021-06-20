import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;

function get() {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`http://propster-nova.hs/api/dashboard/users`, config)
    .then(response => {
      return response.data.data;
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

  return axios.put(`http://propster-nova.hs/api/dashboard/users/${userId}`, payload, config)
    .then(response => {
      return response.data.data;
    });
}


export default {
  get,
  update
};

