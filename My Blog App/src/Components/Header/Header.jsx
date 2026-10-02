import { useState } from 'react'
import Container from '../Container/Container'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'
import LoadingAnimation from '../LoadingAnimation'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../../Appwrite/Auth_service'
import { logout } from '../../Store/AuthSlice'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const logoutHandler = async () => {
        if (isLoggingOut) return

        setIsLoggingOut(true)

        try {
            await authService.logout()
        } finally {
            dispatch(logout())
            navigate('/login', { replace: true })
            window.setTimeout(() => setIsLoggingOut(false), 500)
        }
    }

    const navItems = [
        { name: 'Home', URL: '/', active: true },
        { name: 'Login', URL: '/login', active: !authStatus },
        { name: 'Signup', URL: '/signup', active: !authStatus },
        { name: 'All Posts', URL: '/all-posts', active: authStatus },
        { name: 'Add Post', URL: '/add-post', active: authStatus },
    ]

    return (
        <>
            <header className='py-3 shadow bg-gray-500'>
                <Container>
                    <nav className='flex'>
                        <div className='mr-4'>
                            <Link to='/'><Logo width='70px' /></Link>
                        </div>

                        <ul className='flex ml-auto'>
                            {navItems.map((item) => item.active && (
                                <li key={item.name}>
                                    <button
                                        type='button'
                                        onClick={() => navigate(item.URL)}
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                            {authStatus && (
                                <li>
                                    <LogoutBtn onLogout={logoutHandler} isLoggingOut={isLoggingOut} />
                                </li>
                            )}
                        </ul>
                    </nav>
                </Container>
            </header>
            {isLoggingOut && <LoadingAnimation className='fixed inset-0 z-100 bg-black/70' />}
        </>
    )
}

export default Header