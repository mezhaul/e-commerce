import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthForm, RegisterForm } from "../types/Forms";
import { auth } from "../firebase/config";

const register = (form: RegisterForm) => {
    return createUserWithEmailAndPassword(auth, form.email, form.password);
}

const login = (loginForm: AuthForm) => {
    return signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
}

const logout = () => {
    return signOut(auth);
}

export { register, login, logout };