import { collection, getDocs, query, where } from "firebase/firestore";
import { Component, createSignal, createEffect, For } from "solid-js";
import { db } from "../../firebase/config";
import LoadingScreen from "../../components/general/LoadingScreen";
import cookie from "cookiejs"
import { useNavigate } from "@solidjs/router";
import { useAuthContext } from "../../context/AuthContext"

const Notification:Component = () => {
    const {isAuth} = useAuthContext();
    const [loading,setLoading] = createSignal<boolean>(false);
    const [listOfNotifications,setListOfNotifications] = createSignal<any[]>([]);
    const userId = cookie.get('userId');

    const navigate = useNavigate();

    createEffect(() => {
        if (!isAuth()) {
            navigate('/login');
        }
    });

    createEffect(() => {
        getUserListNotifications(userId)
    });

    const getUserListNotifications = async (e: any) => {
        const q = query(collection(db, "notifications"), where("user_id", "==", `${e}`));

        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            const data_id = {"id": doc.id}
            const doc_data = doc.data();
            const new_data = Object.assign(data_id,doc_data);
            setListOfNotifications((prv) => ([...prv,new_data]));
        });
        setLoading(true);
    }

    return (
        <>
            <h1 class="text-xl font-semibold">
                Notification
            </h1>
            {loading()
                ?
                    <>
                        {listOfNotifications().length >0
                            ?
                                <>
                                    <div class="w-full bg-white flex mt-3">
                                        <div class="w-1/5 border-r border-gray-300 py-2 text-center">
                                            Notification
                                        </div>
                                        <div class="w-1/5 border-r border-gray-300 py-2 text-center">
                                            Date
                                        </div>
                                        <div class="w-1/5 border-r border-gray-300 py-2 text-center">
                                            Status
                                        </div>
                                        <div class="w-1/5 border-r border-gray-300 py-2 text-center">
                                            Amount
                                        </div>
                                        <div class="w-1/5 py-2 text-center">
                                            Action
                                        </div>
                                    </div>
                                    <For each={listOfNotifications()}>{
                                        (o) => <div class="w-ful flex">
                                            <div>
                                                {o.id}
                                            </div>
                                            <div>
                                                <button>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    }</For>{}
                                </>
                            :
                                <div class="w-full h-[70vh] flex">
                                    <div class="m-auto text-center">
                                        There are currently no notifications at the moment
                                    </div>
                                </div>
                        }
                    </>
                :
                    <LoadingScreen />
            }
        </>
    )
}

export default Notification;
