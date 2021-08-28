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
    return axios.get(`${url}/todolists?page=${pageId}`, config)
      .then(response => {
        return response.data;
      });
  } else {
    return axios.get(`${url}/todolists`, config)
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

  return axios.get(`${url}/todolists/${Id}`, config)
    .then(response => {
      return response.data;
    });
}

function create() {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/todolists/create`, config)
    .then(response => {
      return response.data;
    });
}

function update(payload) {
  const todoListId = payload.todoListId;
  const model = payload.model;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.post(`${url}/todolists/${todoListId}/update`, model, config)
    .then(response => {
      return response.data;
    });
}

function remove(id) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.delete(`${url}/todolists/${id}`, config)
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

  return axios.post(`${url}/todolists`, model, config)
      .then(response => {
        return response.data;
      });
}

export default {
  get,
  create,
  getById,
  update,
  store,
  remove,
};

