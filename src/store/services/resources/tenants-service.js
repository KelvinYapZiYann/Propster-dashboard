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
    return axios.get(`${url}/tenants?page=${pageId}`, config)
      .then(response => {
        return response.data;
      });
  } else {
    return axios.get(`${url}/tenants`, config)
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
  const tenantId = payload.tenantId;
  const model = payload.model;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return axios.post(`${url}/tenants/${tenantId}/update`, model, config)
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


function getTenureContracts(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/tenants/${params}/tenure-contracts`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/tenants/${params.id}/tenure-contracts?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/tenants/${params.id}/tenure-contracts`, config)
        .then(response => {
          return response.data;
        });
    }
  }
}

function getBillingRecords(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/tenants/${params}/billing-records`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/tenants/${params.id}/billing-records?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/tenants/${params.id}/billing-records`, config)
        .then(response => {
          return response.data;
        });
    }
  }
}

function getBillingPayments(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/tenants/${params}/billing-payment-records`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/tenants/${params.id}/billing-payment-records?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/tenants/${params.id}/billing-payment-records`, config)
        .then(response => {
          return response.data;
        });
    }
  }
}

function getPaymentRecords(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/tenants/${params}/payment-records`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/tenants/${params.id}/payment-records?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/tenants/${params.id}/payment-records`, config)
        .then(response => {
          return response.data;
        });
    }
  }
}

// function getReceivingPaymentRecords(params) {
//   const config = {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   };

//   if (params && (typeof params == "number" || typeof params == "string")) {
//     return axios.get(`${url}/tenants/${params}/receiving-payment-records`, config)
//       .then(response => {
//         return response.data;
//       });
//   } else if (typeof params == "object") {
//     if (params.pageId) {
//       return axios.get(`${url}/tenants/${params.id}/receiving-payment-records?page=${params.pageId}`, config)
//         .then(response => {
//           return response.data;
//         });
//     } else {
//       return axios.get(`${url}/tenants/${params.id}/receiving-payment-records`, config)
//         .then(response => {
//           return response.data;
//         });
//     }
//   }
// }

// function getSendingPaymentRecords(params) {
//   const config = {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   };

//   if (params && (typeof params == "number" || typeof params == "string")) {
//     return axios.get(`${url}/tenants/${params}/sending-payment-records`, config)
//       .then(response => {
//         return response.data;
//       });
//   } else if (typeof params == "object") {
//     if (params.pageId) {
//       return axios.get(`${url}/tenants/${params.id}/sending-payment-records?page=${params.pageId}`, config)
//         .then(response => {
//           return response.data;
//         });
//     } else {
//       return axios.get(`${url}/tenants/${params.id}/sending-payment-records`, config)
//         .then(response => {
//           return response.data;
//         });
//     }
//   }
// }

function getAssets(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/tenants/${params}/assets`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/tenants/${params.id}/assets?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/tenants/${params.id}/assets`, config)
        .then(response => {
          return response.data;
        });
    }
  }
  
}

// function getReceivingPayments(Id) {
//   const config = {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   };

//   return axios.get(`${url}/tenants/${Id}/receiving-payment-records`, config)
//     .then(response => {
//       return response.data;
//     });
// }

// function getSendingPayments(Id) {
//   const config = {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   };

//   return axios.get(`${url}/tenants/${Id}/sending-payment-records`, config)
//     .then(response => {
//       return response.data;
//     });
// }

export default {
  get,
  create,
  getById,
  update,
  store,
  remove,
  getAssets,
  getTenureContracts,
  getBillingRecords,
  getBillingPayments,
  getPaymentRecords
//   getReceivingPaymentRecords,
//   getSendingPaymentRecords
};

