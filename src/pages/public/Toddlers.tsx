import { Component, For, createEffect, createSignal } from "solid-js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import LoadingScreen from "../../components/general/LoadingScreen";
import NoProducts from "../../components/general/NoProducts";

const Toddlers:Component = () => {
    const [listOfToddlersProducts,setListOfToddlersProducts] = createSignal<any[]>([]);
    const [loading,setLoading] = createSignal(false);

    createEffect(() => {
        getListOfToddlersProducts()
    });

    const getListOfToddlersProducts = async () => {
        const q = query(collection(db, "products"), where("category", "==", "toddlers"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const doc_id = {"id":doc.id}
            const doc_data = doc.data()
            const new_data = Object.assign(doc_id,doc_data);
            setListOfToddlersProducts((prv) => ([...prv,new_data]));
        });
        setLoading(true);
    }

    console.log(listOfToddlersProducts());
    return (
        <div class="w-full md:w-11/12 m-auto px-2 md:px-0 pt-16 lg:pt-20 flex gap-5 py-10 mb:pb-10">
            {loading() 
                ? (
                    <div class="w-full flex flex-wrap gap-[9.5px]">
                        {listOfToddlersProducts().length > 0 
                            ? (
                                <For each={listOfToddlersProducts()}>
                                    {(d) => 
                                        <a href={`/product/${d.id}`} class="w-1/2 lg:w-1/6 max-w-56">
                                            <div class="w-full hover:shadow bg-white border border-gray-300">
                                                <div class="w-full h-72 overflow-hidden bg-gray-200">
                                                    <img src={d.images[0]} alt={d.title} class=" m-auto"/>
                                                </div>
                                                <div class="px-2 pb-2 border-t border-gray-200">
                                                    <h3 class="text-center text-md pt-2 pb-1 font-semibold line-clamp-1">
                                                        {d.name}
                                                    </h3>
                                                </div>
                                            </div>
                                        </a>
                                    }
                                </For>
                            )
                            : (
                                <NoProducts />
                            )
                        }
                    </div>
                )
                : <LoadingScreen />
            }
        </div>
    )
}

export default Toddlers;