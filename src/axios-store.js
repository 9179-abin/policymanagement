import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://policy-management-app.firebaseio.com/'
});

export default instance;