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
    return axios.get(`${url}/tenure-contracts?page=${pageId}`, config)
      .then(response => {
        return response.data;
      });
  } else {
    return axios.get(`${url}/tenure-contracts`, config)
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

  return axios.get(`${url}/tenure-contracts/${Id}`, config)
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

  return axios.get(`${url}/tenure-contracts/create`, config)
    .then(response => {
      return response.data;
    });
}

function update(payload) {
  const tenureContractId = payload.tenureContractId;
  const model = payload.model;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.post(`${url}/tenure-contracts/${tenureContractId}/update`, model, config)
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

  return axios.delete(`${url}/tenure-contracts/${Id}`, config)
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

  return axios.post(`${url}/tenure-contracts/`, model, config)
      .then(response => {
        return response.data;
      });
}

function getBillingRecords(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/tenure-contracts/${params}/billing-records`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/tenure-contracts/${params.id}/billing-records?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/tenure-contracts/${params.id}/billing-records`, config)
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
  getBillingRecords
};

