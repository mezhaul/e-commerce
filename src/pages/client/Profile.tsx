import { Component, createEffect, createSignal } from "solid-js";
import cookie from "cookiejs";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import LoadingScreen from "../../components/general/LoadingScreen";
import { useNavigate } from "@solidjs/router";
import { useAuthContext } from "../../context/AuthContext"

const Profile:Component = () => {
    const [ loading, setLoading ] = createSignal(false);
    const [ userData, setUserData ] = createSignal({
        name: '', 
        surname: '',
        email: '',
        cellphone: ''
    });
    const {isAuth} = useAuthContext();
    
    const [ userDataError, setUserDataError ] = createSignal({
        name: '', 
        surname: '',
        email: '',
        cellphone: ''
    });

    const navigate = useNavigate();
    
    createEffect(() => {
        if (!isAuth()) {
            navigate('/');
        }
    });

    const userId = cookie.get('userId');

    createEffect(() => {
        getUserData(userId);
    });

    const handleChange = (e: any) => {
        const {name, value} = e.currentTarget;
        setUserData((prv) => ({...prv,[name]:value}));
    }

    const getUserData = async (e:any) => {
        const docRef = doc(db, "users", `${e}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUserData({
                name: docSnap.data()?.name ? docSnap.data()?.name : '',
                surname: docSnap.data().surname ? docSnap.data()?.surname : '',
                email: docSnap.data().email ? docSnap.data()?.email : '',
                cellphone: docSnap.data().cellphone ? docSnap.data()?.cellphone : ''
            });
            setLoading(true);
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
    }

    const handleSubmit = async () => {
        const {
            name,
            surname,
            email,
            cellphone
        } = userData();
        if(name === '' || name.length <3 || email === ''){
            if(name === ''){
                setUserDataError((prv) => ({...prv,name:"Name is a required field!"}));
            } else if (name.length < 3){
                setUserDataError((prv) => ({...prv,name:"Name field can be less than three characters!"}));
            }
            if(email === ''){
                setUserDataError((prv) => ({...prv,email:"Emali is a required field!"}));
            }
            return
        }
        const userRef = doc(db, "users", `${userId}`);
            // Set the "capital" field of the city 'DC'
        try {
            await updateDoc(userRef, {
                name,
                surname,
                email,
                cellphone,
                update_at: Timestamp.now()
            });
        } catch (error) {
            console.log('An error has occured')
        } finally {
            alert('Profile updated successfully');
        }    
    }

    return (
        <>
            <h1 class="text-xl font-semibold">
                Profile
            </h1>
            {loading()
                ?
                    <>
                        <div class="py-2">
                            <label>Name</label>
                        </div>
                        <input 
                            type="text" 
                            name="name"
                            value={userData().name} 
                            placeholder={userDataError().name !== '' ? userDataError().name : 'Enter name'}
                            onChange={(e) => handleChange(e)}
                            class="w-full max-w-[450px] border h-9 border-black px-2"
                        />
                        <div class="py-2">
                            <label>Surname</label>
                        </div>
                        <input 
                            type="text" 
                            name="surname" 
                            value={userData().surname} 
                            placeholder={userDataError().surname !== '' ? userDataError().surname : 'Enter surname'}
                            onChange={(e) => handleChange(e)}
                            class="w-full max-w-[450px] border h-9 border-black px-2"
                        />
                        <div class="py-2">
                            <label>Email</label>
                        </div>
                        <input 
                            type="email" 
                            name="email" 
                            value={userData().email} 
                            placeholder={userDataError().email !== '' ? userDataError().email : 'Enter email'}
                            onChange={(e) => handleChange(e)}
                            class="w-full max-w-[450px] border h-9 border-black px-2"
                        />
                        <div class="py-2">
                            <label>Cellphone</label>
                        </div>
                        <input 
                            type="text" 
                            name="cellphone" 
                            value={userData().cellphone}
                            placeholder={userDataError().cellphone !== '' ? userDataError().cellphone : 'Enter cellphone'}
                            onChange={(e) => handleChange(e)} 
                            class="w-full max-w-[450px] border h-9 border-black px-2"
                        />
                        <br></br>
                        <button
                            onClick={handleSubmit} 
                            class="w-full max-w-[450px] bg-black h-9 mt-5 text-white"
                        >
                            Update
                        </button>
                    </>
                :
                    <LoadingScreen />
            }
        </>
    )
}

export default Profile;