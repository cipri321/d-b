import axios from 'axios';
import { Promise } from "es6-promise";
import TokenStorage from "../utils/tokenUtils";

export const backendUrl = 'http://127.0.0.1:8000/';

const instance = axios.create({
    baseURL: backendUrl,
    headers: {'Content-Type' : "application/json"}

});

instance.interceptors.request.use(
    async config => {
        config.headers = {
            ...TokenStorage.getAuthentication(),
            'Accept': 'application/json'

        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

instance.interceptors.response.use( (response) => {
    // Return a successful response back to the calling service
    return response;

}, (error) => {

    // Logout user if token refresh didn't work or user is disabled
    if (error.config.url === '/login/refresh/' || error.response.message === 'Account is disabled.') {
        TokenStorage.clear();
        window.location = "/application/login";
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
    if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
    if (window.location.pathname === '/application/login')
        return new Promise((resolve, reject) => {
            reject(error);
        });
    // Try request again with new token
    return TokenStorage.getNewToken()
        .then((token) => {
            // New request with new token
            const config = error.config;
            config.headers['Authorization'] = `Bearer ${token}`;

            return new Promise((resolve, reject) => {
                axios.request(config).then(response => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            });

        })
        .catch((error) => {
            Promise.reject(error);
        });
});

export default instance;
