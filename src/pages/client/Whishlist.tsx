import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Component, For, createEffect, createSignal } from "solid-js";
import { db } from "../../firebase/config";
import cookie from "cookiejs";
import LoadingScreen from "../../components/general/LoadingScreen";
import { IoCartOutline, IoTrashBin } from "solid-icons/io";
import { useNavigate } from "@solidjs/router";
import { useAuthContext } from "../../context/AuthContext";

const Whishlist:Component = () => {
    const {isAuth} = useAuthContext();
    const [favouriteData, setFavouriteData] = createSignal<any[]>([]);
    const [ loading, setLoadin] = createSignal(false);
    const userId = cookie.get('userId');
    const navigate = useNavigate();
    
    createEffect(() => {
        if (!isAuth()) {
            navigate('/login');
        }
    });

    createEffect(() => {
        getAllUserWhistlistItems(userId);
    }); 

    const getAllUserWhistlistItems = async (e: any) => {
        const q = query(collection(db, "whishlist"), where("user_id", "==", `${e}`));

        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            const doc_id = {"id": doc.id}
            const doc_data = doc.data();
            const new_data = Object.assign(doc_id,doc_data);
            setFavouriteData((prv) => [...prv,new_data]);
        });
        setLoadin(true);
    }

    const deleteItem = async (e: string) => {
        await deleteDoc(doc(db, "whishlist", `${e}`));
        const newData = favouriteData().filter((i) => i.id !== e);
        console.log(newData);
        setFavouriteData(newData);
    }

    return (
        <>
            <h1 class="text-xl font-semibold">
                Wishlist
            </h1>
            <>
                {loading()
                    ?
                        <>
                        
                            {favouriteData().length > 0
                                ?
                                <>
                                    <div class="w-full bg-black text-white py-2 flex mt-3">
                                        <div class="w-1/5 px-2">
                                            Image
                                        </div>
                                        <div class="w-1/5 px-2">
                                            Description
                                        </div>
                                        <div class="w-1/5 px-2">
                                            QTY
                                        </div>
                                        <div class="w-1/5 px-2">
                                            Price
                                        </div>
                                        <div class="w-1/5 px-2">
                                            Action
                                        </div>
                                    </div>
                                    <div class={`${favouriteData().length > 6 ? "overflow-y-scroll" : null } w-full flex flex-col gap-2 py-2 h-[63vh]`}>
                                        <For each={favouriteData()}>{
                                            (f) => 
                                                <div class="flex bg-white items-center">
                                                    <div class="w-1/5 px-2 py-1">
                                                        <img src={f.image} alt="whishlist item" class="h-16"/>
                                                    </div>
                                                    <div class="w-1/5 px-2 py-1">
                                                            {f.name}
                                                    </div>
                                                    <div class="w-1/5 px-2 py-1">

                                                    </div>
                                                    <div class="w-1/5 px-2 py-1">
                                                            {f.price}
                                                    </div>
                                                    <div class="w-1/5 px-2 py-1 flex gap-5 text-xl text-gray-600">
                                                        <button
                                                            class="hover:text-red-600"
                                                            onClick={() => deleteItem(f.id)}
                                                        >
                                                            <IoTrashBin />
                                                        </button>
                                                        <button
                                                            class="hover:text-green-700"
                                                        >
                                                            <IoCartOutline />
                                                        </button>
                                                    </div>
                                                </div>
                                        }</For>   
                                    </div>
                                </>
                                :
                                    <div class="w-full h-[70vh] flex">
                                        <div class="m-auto">
                                            No items in your wishlist at the current moment
                                        </div>
                                    </div>
                            }
                        </>
                    :
                        <LoadingScreen />
                }
            </>
        </>
    )
}

export default Whishlist;
