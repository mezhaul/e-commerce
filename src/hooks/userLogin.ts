import { AuthForm } from "../types/Forms";
import { login} from '../api/auth'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import cookie from "cookiejs";

const useLogin = () => {
    const userLogin = async (loginForm: AuthForm) => {
        const { user } = await login(loginForm);
        console.log('user',user.uid);
        const docRef = doc(db, "users", `${user.uid}`);
        console.log('docRef',docRef);
        const docSnap = await getDoc(docRef);
        console.log('docSnap',docSnap);
        const data = docSnap.data();
        console.log('data',data);
        
        if (Object.keys(data!).length > 0) {
            cookie.set("email", user.email!);
            cookie.set("name", data?.name);
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            }
        return user;

    }

    return {
        userLogin
    }
}

export default useLogin;