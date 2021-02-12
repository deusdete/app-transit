import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-transit.herokuapp.com/api/v1'
});

export default api;