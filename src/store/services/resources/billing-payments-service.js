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

export default {
    // getReceivingBillingPayments,
    // getSendingBillingPayments,
    get,
    getById
};

