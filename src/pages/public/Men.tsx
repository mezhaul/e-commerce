import { Component, For, createEffect, createSignal } from "solid-js"
import ProductsLayout from "../../layouts/ProductsLayout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import LoadingScreen from "../../components/general/LoadingScreen";


const Men:Component = () => {
    const [listOfMenProducts,setListOfMenProducts] = createSignal<any[]>([]);
    const [loading, setLoading] = createSignal(false);

    createEffect(() => {
        getListOfMenProducts()
    });

    const getListOfMenProducts = async () => {
        const q = query(collection(db, "products"), where("category", "==", "men"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const doc_id = {"id":doc.id}
            const doc_data = doc.data()
            const new_data = Object.assign(doc_id,doc_data);
            setListOfMenProducts((prv) => ({...prv,new_data}));
            console.log(new_data);
        });
        setLoading(true);
    }

    console.log(listOfMenProducts());

    return (
        <div class="w-full md:w-11/12 m-auto px-2 md:px-0 pt-16 lg:pt-20 flex gap-5 py-10 mb:pb-10">
            {loading() 
                ? (
                    <div class="w-full flex flex-wrap">
                        {listOfMenProducts().length > 0 
                            ? (
                                <For each={listOfMenProducts()}>
                                    {(d) => 
                                        <a href={`/product/${d.id}`} class="w-1/2 lg:w-1/6">
                                            <div class="w-full hover:shadow bg-white border border-gray-300">
                                                <div class="w-full bg-gray-200 h-56">
                                                    <img src={d.images[0]} alt={d.title} class="h-52 m-auto"/>
                                                </div>
                                                <div class="px-2 pb-2 border-t border-gray-200">
                                                    <h3 class="text-center text-md pt-2 pb-1 font-semibold">
                                                        {d.name}
                                                    </h3>
                                                    <p class="text-sm text-center font-medium">
                                                        {d.summary}
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    }
                                </For>
                            )
                            : (
                                <div class="w-full h-full flex">
                                    <div class="m-auto">
                                        This store currently has no products
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
                : <LoadingScreen />
            }
        </div>
    )
}

export default Men;