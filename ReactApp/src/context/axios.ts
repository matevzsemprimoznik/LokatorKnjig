import Axios from 'axios';

console.log(process.env.REACT_APP_BACKEND_URI)
export const libraryApi = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URI,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
