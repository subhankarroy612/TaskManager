import AuthContext from "@/authContextProvider/AuthContext"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

export default function PrivateRoutes({ children }) {

    const router = useRouter()
    const { isAuth } = useContext(AuthContext)
    useEffect(() => {
        if (!isAuth && router.pathname !== '/auth/signup') {
            router.push('/auth/signup')
        } else if (isAuth) {
            router.push('/')
        }
    }, [])

    return children

}