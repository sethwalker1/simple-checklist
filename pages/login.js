import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import authContext from '../context/auth/authContext'
import ActiveLink from "../components/ActiveLink"

const Login = (props) => {
    const router = useRouter()

    const AuthContext = useContext(authContext)

    const { login, isAuthenticated } = AuthContext

    useEffect(() => {
        if (router.isReady && isAuthenticated)
            router.push('/')
        // eslint-disable-next-line
    }, [router, isAuthenticated])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
 
    const { email, password } = user

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        login({
            email,
            password
        })
    }

    const toRegister = () => {
        router.push('/register')
    }

    return (
        <div className="login-container">
            <div className="forms-container">
                <form onSubmit={onSubmit} className="login-form">
                    <h2 className="title">Login</h2>
                    <div className="input-field">
                        <i className="fa fa-envelope prefix grey-text"></i>
                        <input placeholder="Your Email" type="email" name="email" onChange={onChange} value={email} required />
                    </div>
                    <div className="input-field">
                        <i className="fa fa-lock prefix grey-text"></i>
                        <input placeholder="Your Password" type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <div className="panels-container">
                <div className="panels left-panel">
                    <div className="content">
                        <h3>New Here ?</h3>
                        <p>Register an account so you can maintain a to-do list of all your chores so you don't forget anything!</p>
                        <ActiveLink href="/register"><button className="login-button transparent">Register</button></ActiveLink>
                    </div>
                    <img className="custom-img" src="/signin.svg" alt="login" layout="fill" />
                </div>
            </div>
        </div>
    )
}

export default Login