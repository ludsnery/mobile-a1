import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-mobilea2.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api