import axios from "axios";

const baseUrl = `http://192.168.144.13/api`
const getPath = ( route ) => `${ baseUrl }/${ route }`

export let user = "null"

export class ApiHelper {
    saveToken = ( token ) => {
        localStorage.setItem('token', token)
    }
    removeToken = () => {
        localStorage.removeItem('token')
    }
    register = async ( dick: { firstname: string; repeat_password: string; address: string; INN: string; middlename: string; fullName: string; telephone: string; login: string; lastname: string; OGRN: string; user_role_id: number; password: string; email: string } ) => {
        let response
        try {
            response = await axios.post(getPath('register'), dick)
            const token = response.data.api_token
            if ( token ) {
                this.saveToken(token)
            }
        } catch ( e ) {
            response = e.response
        }
        return response
    }
    login = async ( dick: { login, password } ) => {
        let response
        try {
            response = await axios.post(getPath('login'), dick)
            const token = response.data.api_token
            if ( token ) {
                this.saveToken(token)
            }

        } catch ( e ) {
            response = e.response
        }

        return response
    }
    validateField = async ( field, value ) => {
        const validate = {}
        validate[field] = value
        let response
        try {
            response = await axios.post(getPath('validate'), validate)
        } catch ( e ) {
            response = e.response
        }
        return response
    }
    getUserInfo = async ( token ) => {
        return await axios.get(getPath('userInfo'), {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }
    getPaymentMethods = async () => {
        return await axios.get(getPath('paymentMethods'), {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
    }
    getProductionTypes = async () => {
        return await axios.get(getPath('productionType'), {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
    }
    getCurrencies = async () => {
        return await axios.get(getPath('currencies'), {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
    }
    usersRequestsList = async () => {
        let response
        try {
            response = await axios.get(getPath('usersRequestsList'), {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
        } catch ( e ) {
            response = e.response
        }
        return response
    }
    requestsList = async () => {
        let response
        try {
            response = await axios.get(getPath('request'), {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
        } catch ( e ) {
            response = e.response
        }
        return response
    }
    getOneRequest = async ( id ) => {
        let response
        try {
            response = await axios.get(getPath('request/' + id), {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
        } catch ( e ) {
            response = e.response
        }
        return response
    }
    sendOffer = async ( data ) => {
        let response
        try {
            response = await axios.post(getPath('response'),
                data,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
        } catch ( e ) {
            response = e.response
        }
        return response
    }


}
