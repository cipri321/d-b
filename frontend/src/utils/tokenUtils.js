
import userRepository from "../http/repositories/userRepository";


class TokenStorage {

    static  LOCAL_STORAGE_TOKEN = 'token';
    static  USER_ID = 'userId';
    static  LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token';
    static  IS_STAFF = 'staff'

    isAuthenticated() {
        return this.getToken() !== null;
    }

    isStaff() {
        return localStorage.getItem(TokenStorage.IS_STAFF)
    }

    getAuthentication() {
        const token = this.getToken();
        if(token) {
            return {
                'Authorization': 'Bearer ' + this.getToken()
            };
        }
        else{
            return null;
        }
    }

    getNewToken() {
        return new Promise((resolve, reject) => {
            userRepository.refreshToken(this.getRefreshToken())
                .then(response => {
                    this.storeToken(response.access);
                    resolve(response.access);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    storeToken(token) {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
    }

    storeUserId(userId) {
        localStorage.setItem(TokenStorage.USER_ID, userId);
    }

    storeRefreshToken(refreshToken) {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
    }

    makeStaff(){
        localStorage.setItem(TokenStorage.IS_STAFF, true)
    }

    clear() {
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(TokenStorage.USER_ID);
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
        localStorage.removeItem(TokenStorage.USER)
        localStorage.removeItem(TokenStorage.IS_STAFF)
    }

    getRefreshToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    getToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    }

    getUserId() {
        return localStorage.getItem(TokenStorage.USER_ID);
    }

    getUser(){
        return localStorage.getItem(TokenStorage.USER)
    }
}

const instance = new TokenStorage();
export default instance;
