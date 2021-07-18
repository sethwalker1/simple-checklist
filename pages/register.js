import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import authContext from '../context/auth/authContext'
import ActiveLink from "../components/ActiveLink"

const Register = (props) => {
    const router = useRouter()

    const AuthContext = useContext(authContext)
    
    const { register, isAuthenticated } = AuthContext

    useEffect(() => {
        if (!router.isReady || !isAuthenticated) return
        router.push('/')
        // eslint-disable-next-line
    }, [router.isReady, isAuthenticated])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
 
    const { name, email, password } = user

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        register({
            name,
            email,
            password
        })
    }

    const toLogin = () => {
        window.location.href="/login"
    }

    return (
        <div className="register-container">
            <div className="forms-container">
                <form onSubmit={onSubmit} className="register-form">
                <h2 className="title">Register</h2>
                    <div className="input-field">
                        <i className="fa fa-user prefix grey-text"></i>
                        <input placeholder="Your Name" name="name" onChange={onChange} value={name} type="text" required />
                    </div>
                    <div className="input-field">
                        <i className="fa fa-envelope prefix grey-text"></i>
                        <input placeholder="Your Email" type="email" name="email" onChange={onChange} value={email} required />
                    </div>
                    <div className="input-field">
                        <i className="fa fa-lock prefix grey-text"></i>
                        <input placeholder="Your Password" type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <button type="submit" className="login-button">Register</button>
                </form>
                <div className="panels-container">
                    <div className="panels left-panel" style={{ "zIndex": -1 }}>
                    </div>
                    <div className="panels right-panel">
                        <div className="content">
                            <h3>Already a member?</h3>
                            <p>Login to access your to-do list and finish your chores!</p>
                            <button className="login-button transparent" onClick={toLogin}>Login</button>
                        </div>
                        <img className="custom-img" src="/alt.svg" alt="login" layout="fill" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
