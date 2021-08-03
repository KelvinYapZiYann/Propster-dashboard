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
    return axios.get(`${url}/billing-records?page=${pageId}`, config)
      .then(response => {
        return response.data;
      });
  } else {
    return axios.get(`${url}/billing-records`, config)
      .then(response => {
        return response.data;
      });
  }
  
}

// function getReceivingBillingRecords(pageId) {
//   const config = {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   };

//   if (pageId && typeof pageId == "number") {
//     return axios.get(`${url}/receiving-bill-payments?page=${pageId}`, config)
//       .then(response => {
//         return response.data;
//       });
//   } else {
//     return axios.get(`${url}/receiving-bill-payments`, config)
//       .then(response => {
//         return response.data;
//       });
//   }
  
// }

// function getSendingBillingRecords(pageId) {
//   const config = {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   };

//   if (pageId && typeof pageId == "number") {
//     return axios.get(`${url}/sending-bill-payments?page=${pageId}`, config)
//       .then(response => {
//         return response.data;
//       });
//   } else {
//     return axios.get(`${url}/sending-bill-payments`, config)
//       .then(response => {
//         return response.data;
//       });
//   }
  
// }

function getById(Id) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.get(`${url}/billing-records/${Id}`, config)
    .then(response => {
      return response.data;
    });
}

function create(param) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    params: param
  };

  return axios.get(`${url}/billing-records/create`, config)
    .then(response => {
      return response.data;
    });
}

function update(payload) {
  const billingRecordId = payload.billingRecordId;
  const model = payload.model;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.post(`${url}/billing-records/${billingRecordId}/update`, model, config)
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

  return axios.delete(`${url}/billing-records/${Id}`, config)
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

  return axios.post(`${url}/billing-records/`, model, config)
      .then(response => {
        return response.data;
      });
}

function getBillingPayments(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/billing-records/${params}/billing-payment-records`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/billing-records/${params.id}/billing-payment-records?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/billing-records/${params.id}/billing-payment-records`, config)
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
  getBillingPayments
};

