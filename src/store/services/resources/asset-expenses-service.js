import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;

function get(pageId) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (pageId && typeof pageId == "number") {
    return axios.get(`${url}/asset-expenses?page=${pageId}`, config)
      .then(response => {
        return response.data;
      });
  } else {
    return axios.get(`${url}/asset-expenses`, config)
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

  return axios.get(`${url}/asset-expenses/${Id}`, config)
    .then(response => {
      return response.data;
    });
}

function update(payload) {
  const assetExpenseId = payload.assetExpenseId;
  const model = payload.model;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.post(`${url}/asset-expenses/${assetExpenseId}/update`, model, config)
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

