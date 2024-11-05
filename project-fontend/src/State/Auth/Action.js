import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"



const token = localStorage.getItem("jwt")
const registerRequest = () => ({type:REGISTER_REQUEST})
const registerSuccess = (user) => ({type:REGISTER_SUCCESS, payload:user})
const registerFailure = (error) => ({type:REGISTER_FAILURE, payload:error})


export const register = (userData) => async (dispatch)=> {
    dispatch(registerRequest())
    try {
        const reponse = await axios.post(`${API_BASE_URL}/api/Users`,userData)
        const user = reponse.data
       
        const datareg = {
            email: userData.email,
            password: userData.password
           }
        console.log("user", user)
        dispatch(registerSuccess(dispatch(login(datareg))))
    }catch (error) {
        dispatch(registerFailure(error.message))

    }
}




const loginRequest = () => ({type:LOGIN_REQUEST})
const loginSuccess = (user) => ({type:LOGIN_SUCCESS, payload:user})
const loginFailure = (error) => ({type:LOGIN_FAILURE, payload:error})

export const login = (userData) => async (dispatch)=> {
    dispatch(loginRequest())
    try {
        const reponse = await axios.post(`${API_BASE_URL}/api/Authorize/GenerateToken`,userData)
        const jwt = reponse.data
        if(jwt) {
            localStorage.setItem("jwt", jwt)
        }
        dispatch(loginSuccess(jwt))
    }catch (error) {

        dispatch(loginFailure(error.message))

    }
}


const getUserRequest = () => ({type:GET_USER_REQUEST})
const getUserSuccess = (user) => ({type:GET_USER_SUCCESS, payload:user})
const getUserFailure = (error) => ({type:GET_USER_FAILURE, payload:error})

export const getUser = (jwt) => async (dispatch)=> {
    dispatch(getUserRequest())
    try {
        const reponse = await axios.get(`${API_BASE_URL}/api/Users/1`,{
                headers: {
                    "Authorization":`Bearer ${jwt}`
                }
        })
        const user = reponse.data
        console.log("user", user)
        dispatch(getUserSuccess(user))
    }catch (error) {
        localStorage.clear("jwt")
        dispatch(getUserFailure(error.message))
        
    }
}



export const logout = () => (dispatch) => {
    dispatch({type:LOGOUT, payload:null})
}