import { Component , createSignal} from "solid-js"
import Woman from '../../assets/images/woman-6466907_1920.jpg'
import cookie from "cookiejs";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "@solidjs/router";
import useLogin from "../../hooks/userLogin";
import { VsEye, VsEyeClosed } from 'solid-icons/vs';

const Login:Component = () => {
    const [ loading, setLoading ] = createSignal(false);
    const navigate = useNavigate();
    const [ passwordShow, setPasswordShow ] = createSignal(false); 
    const { userLogin } = useLogin();
    const [data, setData] = createSignal({
        email: '',
        password: ''
    });
    const [dataError, setDataError] = createSignal({
        email: '',
        password: ''
    });
    const {
        setUserId,
        setIsAuth,
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
            email,
            password
        } = data();
        if(email === '' && password === ''){
            if(email === '') {
                setDataError((prv) => ({...prv,'email': 'Email is a required field!'}))
            }
            if(password === '') {
                setDataError((prv) => ({...prv,'password': 'Password is a required field!'}))
            }
            return
        }
        try {
            setLoading(true);
            const data = {
                email,
                password
            }
            const result = await userLogin(data);
            if(result?.uid) {
                cookie.set('auth', 'true' ,2);
                cookie.set('userId', result.uid ,2);
                setUserId(result.uid);
                setIsAuth(true);
                setUserEmail(data.email);
                navigate('/profile')
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }

    const togglePassword = () => {
        setPasswordShow(!passwordShow());
    }

    return (
        <div class="w-full flex h-screen bg-customColor">
            <div class="hidden md:flex w-1/2 h-full bg-gray-100" style={{"background-image":`url(${Woman})`,"background-size":"cover","background-position-y":"-300px;"}}></div>
            <div class="w-full md:w-1/2 h-full flex">
                <div class="w-10/12 max-w-[450px] m-auto gap-3 flex-col">
                    <h1 class="text-2xl text-center underline">
                        Login
                    </h1>
                    <div class="w-full flex flex-col gap-3 py-3">
                        <button class="w-full h-10 bg-black text-white rounded-sm">
                            Google
                        </button>
                        <button class="w-full h-10 bg-blue-500 text-white rounded-sm">
                            Facebook
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="border-b w-1/2 border-gray-300"></div>
                        <div>OR</div>
                        <div class="border-b w-1/2 border-gray-300"></div>
                    </div>
                    <div>
                        <div class="pb-2">
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
                        <div class="w-full relative">
                            <input 
                                type={passwordShow() ? "text" : "password"} 
                                name="password"
                                placeholder={dataError().password ? dataError().password : 'Password'}
                                onInput={enterData}
                                onChange={errorHandling}
                                class="w-full border h-10 rounded-sm border-gray-300 px-2" 
                            />
                            <button
                                onclick={togglePassword} 
                                class={passwordShow() ? "absolute right-3 top-3 text-xl" : "hidden"}
                            >
                                <VsEye />
                            </button>
                            <button 
                                onclick={togglePassword}
                                class={passwordShow() ? "hidden" : "absolute right-3 top-3 text-xl"}
                            >
                                <VsEyeClosed />
                            </button>
                        </div>
                        <button onClick={onSubmit} class="w-full my-5 bg-black text-white h-10 rounded-sm">{loading() ? <div class="loaderSmall m-auto"></div> : 'Login'}</button>
                        <div class="flex justify-between">
                            <p>
                                Register 
                                <a href="/register">
                                <span class="text-sky-500">
                                    Click here
                                </span>
                                </a>
                            </p>
                            <a href="/forgot">
                                <p class="text-sky-500">
                                    Forgot Password
                                </p>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;