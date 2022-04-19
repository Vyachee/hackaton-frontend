import axios from "axios";

const baseUrl = `http://192.168.144.13/api`
const getPath = (route) => `${baseUrl}/${route}`

export let user = "null"

export class ApiHelper {
    saveToken = (token) => {
        localStorage.setItem('token', token)
    }
    removeToken = () => {
        localStorage.removeItem('token')
    }
    register = async ( dick: { firstname: string; repeat_password: string; address: string; INN: string; middlename: string; fullName: string; telephone: string; login: string; lastname: string; OGRN: string; user_role_id: number; password: string; email: string } ) => {
        const result = await axios.post(getPath('register'), dick)
        const token = result.data.api_token
        if(token) {
            this.saveToken(token)
        }
        return result
    }
    login = async (dick : {login, password}) => {
        const result = await axios.post(getPath('login'), dick)
        const token = result.data.api_token
        if(token) {
            this.saveToken(token)
        }
        return result
    }
    validateField = async (field, value) => {
        const validate = {}
        validate[field] = value
        let response
        try {
            response = await axios.post(getPath('validate'), validate)
        }   catch ( e ) {
            response = e.response
        }
        console.log(response)
        return response
    }
    getUserInfo = async (token) => {
        return await axios.get(getPath('userInfo'), {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }


}
