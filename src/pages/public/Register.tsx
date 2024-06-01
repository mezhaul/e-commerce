import { Component, createSignal } from "solid-js";
import Woman from '../../assets/images/man-7428290_1280.jpg'
import { useAuthContext } from "../../context/AuthContext";
import cookie from "cookiejs";
import useRegister from "../../hooks/userRegister";
import { useNavigate } from "@solidjs/router";

const Register:Component = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = createSignal(false);
    const { registerUser } = useRegister();
    const [data, setData] = createSignal({
        name: '',
        email: '',
        password: '',
        repassword: ''
    });
    const [dataError, setDataError] = createSignal({
        name: '',
        email: '',
        password: '',
        repassword: ''
    });
    const {
        setIsAuth,
        setUserId,
        setUserEmail,
    } = useAuthContext();
    
    const enterData = (e:any) => {
        const {name, value} = e.target;
        setData((prv) => ({...prv,[name]:value}));
    }

    const errorHandling = (e:any) => {
        const {name} = e.target;
        setDataError((prv) => ({...prv,[name]:''}));
    }

    const onSubmit = async () => {
        const {
            name,
            email,
            password,
            repassword
        } = data();
        if(
            name === '' || 
            email === '' || 
            password === '' || 
            repassword === '' || 
            password !== 
            repassword
        ){
            if(name === '') {
                setDataError((prv) => ({...prv,'name': 'Name is a required fiels!'}))
            }
            if(email === '') {
                setDataError((prv) => ({...prv,'email': 'Email is a required fiels!'}))
            }
            if(password === '') {
                setDataError((prv) => ({...prv,'password': 'Password is a required field!'}))
            }
            if(repassword === '') {
                setDataError((prv) => ({...prv,'repassword': 'Confirm password is a required field!'}))
            }
            if(repassword !== password){
                setDataError((prv) => ({...prv,'repassword': 'Passwords do not match'}))
            }
            return
        }
        try {
            setLoading(true);
            const data = {
                name,
                email,
                password,
            }
            const result = await registerUser(data);
            if(result.uid){
                cookie.set('auth', 'true' ,2);
                cookie.set('userId', result.uid ,2);
                setIsAuth(true);
                setUserId(result.uid);
                setUserEmail(data.email);
                setLoading(false);
                navigate('/profile')
            }
        } catch (error) {
            alert('Email name already exists')
            console.log(error);
        }
        setLoading(false)
    }

    return (
        <div class="w-full flex h-screen bg-white">
            <div class="hidden md:flex w-1/2 h-full bg-gray-100 border-r" style={{"background-image":`url(${Woman})`,"background-size":"cover"}}></div>
            <div class="w-full md:w-1/2 h-full flex">
                <div class="w-10/12 max-w-[450px] m-auto flex-col">
                    <h1 class="text-2xl text-center underline">
                        Register
                    </h1>
                    <div class="py-2">
                        <label>
                            Name
                        </label>
                    </div>
                    <input 
                        type="email" 
                        name="name"
                        placeholder={dataError().name ? dataError().name : 'Name'}
                        onInput={enterData}
                        onChange={errorHandling}
                        class="w-full border h-10 rounded-sm border-gray-300 px-2" 
                    />
                    <div class="py-2">
                        <label>
                            Email
                        </label>
                    </div>
                    <input 
                        type="email" 
                        name="email"
                        placeholder={dataError().email ? dataError().email : 'Email'}
                        onInput={enterData}
                        onChange={errorHandling}
                        class="w-full border h-10 rounded-sm border-gray-300 px-2" 
                    />
                    <div class="py-2">
                        <label>
                            Password
                        </label>
                    </div>
                    <input 
                        type="password" 
                        name="password"
                        placeholder={dataError().password ? dataError().password : 'Password'}
                        onInput={enterData}
                        onChange={errorHandling}
                        class="w-full border h-10 rounded-sm border-gray-300 px-2" 
                    />
                    <div class="py-2">
                        <label>
                            Confirm Password
                        </label>
                    </div>
                    <input 
                        type="password" 
                        name="repassword"
                        placeholder={dataError().repassword ? dataError().repassword : 'Confirm password'}
                        onInput={enterData}
                        onChange={errorHandling}
                        class="w-full border h-10 rounded-sm border-gray-300 px-2" 
                    />
                    <button onClick={onSubmit} class="w-full my-5 bg-black text-white h-10 rounded-sm">{loading() ? <div class="loader m-auto "></div> : 'Register'}</button>
                    <div class="flex justify-between">
                        <p>
                            Already register 
                            <a href="/login">
                            <span class="text-sky-500">
                                Click here
                            </span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Register;