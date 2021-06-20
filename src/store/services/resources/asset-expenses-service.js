import axios from 'axios';

// const url = process.env.VUE_APP_API_BASE_URL;
const url = 'http://propster-nova.hs/api/dashboard';
function get() {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/asset-expenses`, config)
    .then(response => {
      return response.data;
    });
}

function getById(Id) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/asset-expenses/${Id}`, config)
    .then(response => {
      return response.data;
    });
}

function update(payload) {
  const modelId = payload.modelId;
  const model = payload.model;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.put(`${url}/asset-expenses/${modelId}`, model, config)
    .then(response => {
      return response.data;
    });
}

function remove(Id) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
alert(`${url}/asset-expenses/${Id}`);
  return axios.delete(`${url}/asset-expenses/${Id}`, config)
    .then(response => {
      return response.data;
    });
}

function store(payload) {
  const model = payload.model;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.post(`${url}/asset-expenses/`, model, config)
    .then(response => {
      return response.data;
    });
}


export default {
  get,
  getById,
  update,
  store,
  remove
};

