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

  return axios.get(`${url}/tenants`, config)
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

  return axios.get(`${url}/tenants/${Id}`, config)
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

  return axios.get(`${url}/tenants/create`, config)
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

  return axios.put(`${url}/tenants/${modelId}`, model, config)
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

  return axios.delete(`${url}/tenants/${Id}`, config)
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

  return axios.post(`${url}/tenants/`, model, config)
      .then(response => {
        return response.data;
      });
}


function getTenureContracts(Id) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/tenants/${Id}/tenure-contracts`, config)
    .then(response => {
      return response.data;
    });
}

function getAssets(Id) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/tenants/${Id}/assets`, config)
    .then(response => {
      return response.data;
    });
}

function getReceivingPayments(Id) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/tenants/${Id}/receiving-payment-records`, config)
    .then(response => {
      return response.data;
    });
}

function getSendingPayments(Id) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/tenants/${Id}/sending-payment-records`, config)
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
  getTenureContracts,
  getAssets,
  getReceivingPayments,
  getSendingPayments
};

