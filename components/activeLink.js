import { useRouter } from 'next/router'

function ActiveLink({ className, children, href }) {
    const router = useRouter()
    const style = {
        marginRight: 10,
        color: router.asPath === href ? 'red' : 'black',
    }

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a className={className} href={href} onClick={handleClick} style={style}>
            {children}
        </a>
    )
}

export default ActiveLink