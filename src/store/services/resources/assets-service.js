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
    return axios.get(`${url}/assets?page=${pageId}`, config)
      .then(response => {
        return response.data;
      });
  } else {
    return axios.get(`${url}/assets`, config)
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

  return axios.get(`${url}/assets/${Id}`, config)
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

  return axios.get(`${url}/assets/create`, config)
    .then(response => {
      return response.data;
    });
}

function update(payload) {
  const assetId = payload.assetId;
  const model = payload.model;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.post(`${url}/assets/${assetId}/update`, model, config)
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

  return axios.delete(`${url}/assets/${Id}`, config)
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

  return axios.post(`${url}/assets`, model, config)
      .then(response => {
        return response.data;
      });
}


function getAssetExpenses(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/assets/${params}/asset-expenses`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/assets/${params.id}/asset-expenses?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/assets/${params.id}/asset-expenses`, config)
        .then(response => {
          return response.data;
        });
    }
  }

  
}

function getTenants(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/assets/${params}/tenants`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/assets/${params.id}/tenants?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/assets/${params.id}/tenants`, config)
        .then(response => {
          return response.data;
        });
    }
  }
}


export default {
  get,
  create,
  getById,
  update,
  store,
  remove,
  getAssetExpenses,
  getTenants,
};

