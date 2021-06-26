import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;
const baseEndpoint = 'payment-records';

function get(pageId) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (pageId && typeof pageId == "number") {
    return axios.get(`${url}/${baseEndpoint}?page=${pageId}`, config)
      .then(response => {
        return response.data;
      });
  } else {
    return axios.get(`${url}/${baseEndpoint}`, config)
      .then(response => {
        return response.data;
      });
  }
}

function getById(Id) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/${baseEndpoint}/${Id}`, config)
    .then(response => {
      return response.data;
    });
}

function add(param) {
  console.log(param);
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    params: param
  };

  return axios.get(`${url}/${baseEndpoint}/create`, config)
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

  return axios.put(`${url}/${baseEndpoint}/${modelId}`, model, config)
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

  return axios.delete(`${url}/${baseEndpoint}/${Id}`, config)
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

  return axios.post(`${url}/${baseEndpoint}/`, model, config)
    .then(response => {
      return response.data;
    });
}


export default {
  get,
  getById,
  update,
  store,
  remove,
  add
};

