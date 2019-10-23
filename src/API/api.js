import axios from 'axios';
const API_URL = 'http://localhost:3001/apiv1/';

const getTags = () => {
    return axios.get(`${API_URL}/tags`).then(res => res.data.results);
};

export {
    getTags,
};