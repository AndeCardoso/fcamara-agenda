import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create ({
    baseURL:"http://localhost:8181"
});

// api.defaults.headers.authorization = Cookies.get('token');

export default api;