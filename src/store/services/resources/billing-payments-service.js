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
    return axios.get(`${url}/billing-record-payments?page=${pageId}`, config)
      .then(response => {
        return response.data;
      });
  } else {
    return axios.get(`${url}/billing-record-payments`, config)
      .then(response => {
        return response.data;
      });
  }
  
}

// function getReceivingBillingPayments(pageId) {
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

// function getSendingBillingPayments(pageId) {
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

  return axios.get(`${url}/billing-record-payments/${Id}`, config)
    .then(response => {
      return response.data;
    });
}

function getPaymentRecords(params) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (params && (typeof params == "number" || typeof params == "string")) {
    return axios.get(`${url}/billing-record-payments/${params}/payment-records`, config)
      .then(response => {
        return response.data;
      });
  } else if (typeof params == "object") {
    if (params.pageId) {
      return axios.get(`${url}/billing-record-payments/${params.id}/payment-records?page=${params.pageId}`, config)
        .then(response => {
          return response.data;
        });
    } else {
      return axios.get(`${url}/billing-record-payments/${params.id}/payment-records`, config)
        .then(response => {
          return response.data;
        });
    }
  }
  
}

export default {
    // getReceivingBillingPayments,
    // getSendingBillingPayments,
    get,
    getById,
    getPaymentRecords
};

