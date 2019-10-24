import axios from 'axios';
const API_URL = 'http://localhost:3001/apiv1/';

const getTags = async () => {
    return await axios.get(`${API_URL}/tags`).then(res => res.data.results);
};

const getAds = async () => {
    return await axios.get(`${API_URL}/anuncios`).then(res => res.data.results);
};

export {
    getTags,
    getAds,
};