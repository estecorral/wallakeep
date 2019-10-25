import axios from 'axios';
const API_URL = 'http://localhost:3001/apiv1/';

const getTags = async () => {
    return await axios.get(`${API_URL}/tags`).then(res => res.data.results);
};

const getAds = async (tag, price, name, type) => {
    let venta = '';
    if(type) {
        venta = false;
        if (type === 'sell') {
            venta = true;
        }
    }
    if((tag === 'all' || !tag)  && !name) {
        return await axios.get(`${API_URL}/anuncios?price=${price}&venta=${venta}`).then(res => res.data.results);
    } else if ((tag === 'all' || !tag)  && name) {
        return await axios.get(`${API_URL}/anuncios?price=${price}&venta=${venta}&name=${name}`).then(res => res.data.results);
    } else if (tag !== 'all' && name) {
        return await axios.get(`${API_URL}/anuncios?tag=${tag}&price=${price}&venta=${venta}&name=${name}`).then(res => res.data.results);
    } else if (tag !== 'all' && !name) {
        return await axios.get(`${API_URL}/anuncios?tag=${tag}&price=${price}&venta=${venta}`).then(res => res.data.results);
    }
    return await axios.get(`${API_URL}/anuncios?tag=${tag}`).then(res => res.data.results);
};

const getOneAd = async (idAD) => {
    return await axios.get(`${API_URL}/anuncios/${idAD}`).then(res => res.data.result);
};

export {
    getTags,
    getAds,
    getOneAd,
};