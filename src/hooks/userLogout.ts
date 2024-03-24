import cookie from "cookiejs";
import { logout } from "../api/auth";
import { useNavigate } from "@solidjs/router";
import { useAuthContext } from "../context/AuthContext";


const useLogout = () => {
    const navigate = useNavigate()
    const { setIsAuth } = useAuthContext()

    const logoutUser = async () => {
        try {
            await logout();
            cookie.clear()   
            setIsAuth(false); 
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return {
        logoutUser
    }
}

export default useLogout;