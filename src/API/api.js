import axios from 'axios';
const API_URL = 'http://localhost:3001/apiv1/';

const getTags = async () => {
    try {
        return await axios.get(`${API_URL}/tags`).then(res => res.data.results);
    } catch (e) {
            console.log(e.message);
            throw new Error(e.message);
    }

};

const getAds = async (tag, price, name, type) => {
    try {
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
    }catch (e) {
        console.log(e.message);
        throw new Error(e.message);
    }

};

const getOneAd = async (idAD) => {
    try {
        return await axios.get(`${API_URL}/anuncios/${idAD}`).then(res => res.data.result);
    }catch (e) {
        console.log(e.message);
        throw new Error(e.message);
    }
};

const newAd = async (ad) => {
    try {
        await axios.post(`${API_URL}/anuncios/`, ad).then(() => {
            return 'Anuncio guardado correctamente'
        });
    }catch (e) {
        console.log(e.message);
        throw new Error(e.message);
    }
};

const updateAd = async (idAD, ad) => {
    try {
        await axios.put(`${API_URL}/anuncios/${idAD}`, ad).then(() => {
            return 'Anuncio actualizado correctamente';
        });
    }catch (e) {
        console.log(e.message);
        throw new Error(e.message);
    }
};

export {
    getTags,
    getAds,
    getOneAd,
    newAd,
    updateAd,
};