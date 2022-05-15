import axiosInstance from '../axiosInstance'
import TokenStorage from '../../utils/tokenUtils'
import tokenUtils from "../../utils/tokenUtils";
class UserRepository {

    async registerUser(username, password, email, first_name, last_name){
        return await axiosInstance.post('/ainfo/register/', {username, password, email, first_name, last_name}).then(resp => resp.data)

    }

    async registerSuperUser(username, password, email, first_name, last_name, superUserKey){
        return await axiosInstance.post('/ainfo/create_super_user/', {username, email, first_name, last_name, password, superUserKey}).then(resp => resp.data)

    }


    async getUserInfo(){
        let userInfo = await axiosInstance.get('/ainfo/user_info/').then(resp => resp.data)
        TokenStorage.storeUserId(userInfo.id)
        if (userInfo.is_staff === true){
            TokenStorage.makeStaff()
        }
        return userInfo
    }

    async loginUser(payload){

        let loginData = await axiosInstance.post('/ainfo/login/', {
                "username":payload.username ,
                "password":payload.password
            }
        ).then(resp => resp.data)
        TokenStorage.storeToken(loginData.access)
        TokenStorage.storeRefreshToken(loginData.refresh)
        return loginData.access&&loginData.refresh
    }

    async refreshToken(refresh){
        return await axiosInstance.post('/ainfo/login/refresh/', {refresh}).then(resp => resp.data)
    }

    logout() {
        tokenUtils.clear();
        window.location='/login'
    }
}

const userRepository = new UserRepository()
export default userRepository