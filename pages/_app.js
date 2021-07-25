import '../styles/globals.css'
import '../styles/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../styles/auth.css'
import '../styles/todo.css'
import '../components/ActiveLink'
import AuthState from "../context/auth/authState"
import TodoState from "../context/todo/todoState"

function SafeHydrate({ children }) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}

function MyApp({ Component, pageProps }) {
    return (
        <SafeHydrate>
            <AuthState>
                <TodoState>
                    <Component {...pageProps} />
                </TodoState>
            </AuthState>
        </SafeHydrate>
    )
}

export default MyApp
