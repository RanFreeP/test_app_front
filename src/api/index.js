import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use((config) => {
    config.headers['Accept'] = '*/*';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type';
    config.headers['Access-Control-Allow-Credentials'] = 'true';
   if(sessionStorage.getItem('token'))
       config.headers['Authorization'] = JSON.parse(sessionStorage.getItem('token'));
   return config;
});

instance.interceptors.response.use(
    response => { return response; },
    error => {
        if (error.response.status === 401) {
            sessionStorage.removeItem('token');
            window.location.reload();
        }

        return Promise.reject(error);
    }
)

export default instance;