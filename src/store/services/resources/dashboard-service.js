import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;

function getGeneralDetail() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return axios.get(`${url}/dashboard-info/general-detail`, config)
        .then(response => {
            return response.data;
        });
}

function getRentalDetail() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return axios.get(`${url}/dashboard-info/rental-allocation`, config)
        .then(response => {
            return response.data;
        });
}

function getOverdueTenantList() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return axios.get(`${url}/dashboard-info/overdue-tenant-list`, config)
        .then(response => {
            return response.data;
        });
}

function getAssetVacancy() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return axios.get(`${url}/dashboard-info/asset-vacancy`, config)
        .then(response => {
            return response.data;
        });
}

function getCashflow() {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return axios.get(`${url}/dashboard-info/cash-flow`, config)
        .then(response => {
            return response.data;
        });
}

export default {
    getGeneralDetail,
    getRentalDetail,
    getOverdueTenantList,
    getAssetVacancy,
    getCashflow,
};