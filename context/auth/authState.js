import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
import { LOGIN_USER, REGISTER_USER, LOGOUT } from  '../types'

const AuthState = (props) => {
    let token = localStorage.getItem('token')
    const initialState = {
        token,
        isAuthenticated: !token || token === 'null' ? false : true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    // Register User:
    const register = async formData => {
        try {
            const res = await axios.post('/api/auth/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.data.error) {
                alert(res.data.error)
                throw new Error(res.data.error)
            }

            dispatch({
                type: REGISTER_USER,
                payload: res.data
            })

        } catch (error) {
            console.warn(error.message)
        }
    }

    // Login User:
    const login = async formData => {
        try {
            const res = await axios.post('/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.data.error) {
                alert(res.data.error)
                throw new Error(res.data.error)
            }

            dispatch({
                type: LOGIN_USER,
                payload: res.data
            })

        } catch (error) {
            console.warn(error.message)
        }
    }

    // Logout:
    const logout = () => {
        dispatch({ type: LOGOUT })
    }

    return (
        <AuthContext.Provider value = {{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            register,
            login,
            logout
        }}>{props.children}</AuthContext.Provider>
    )
}

export default AuthState