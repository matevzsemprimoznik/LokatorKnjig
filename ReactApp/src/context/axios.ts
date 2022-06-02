import Axios from 'axios';

console.log(process.env.REACT_APP_BACKEND_URI)
const URI = window._env_.REACT_APP_BACKEND_URI != null ? window._env_.REACT_APP_BACKEND_URI : process.env.REACT_APP_BACKEND_URI
export const libraryApi = Axios.create({
    baseURL: URI,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
