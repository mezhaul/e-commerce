import { Component, For, createEffect, createSignal } from "solid-js"
// import ProductMenu from "../components/pageComponents/producst/ProductMenu"
import { useParams } from "@solidjs/router"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase/config"
import LoadingScreen from "../components/general/LoadingScreen"

const ProductsLayout: Component = () => {
    const [productsList,setProductsList] = createSignal<any[]>([]);
    const [loading, setLoading] = createSignal(false);
    const {id} = useParams();
    createEffect(() => {
        getListOfProducts(id);
    });

    const getListOfProducts = async (e: string) => {
        const q = query(collection(db, "products"), where("store_id", "==", `${e}`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc:any) => {
            let doc_id = {"id": doc.id}
            let doc_data = doc.data();
            let new_data = Object.assign(doc_id,doc_data);
            setProductsList((prv) => [...prv,new_data]);
        });
        setLoading(true);
    };

    return (
        <div class="w-full md:w-11/12 m-auto px-2 md:px-0 pt-16 lg:pt-20 flex gap-5 py-10 mb:pb-10">
            {loading() 
                ?
                    <div class="w-full flex flex-wrap gap-[9.5px]">
                    
                        {productsList().length > 0 
                            ?
                                <For each={productsList()}>{
                                    (d) => 
                                        <a href={`/product/${d.id}`} class="w-1/2 lg:w-1/6 max-w-56">
                                            <div class="w-full hover:shadow bg-white border border-gray-300">
                                                <div class="w-full h-72 overflow-hidden bg-gray-200">
                                                    <img src={d.images[0]} alt={d.title} class=" m-auto"/>
                                                </div>
                                                <div class="px-2 pb-2 border-t border-gray-200">
                                                    <h3 class="text-center text-md pt-2 pb-1 font-semibold line-clamp-1">
                                                        {d.name}
                                                    </h3>
                                                    <p class="text-sm text-center font-medium line-clamp-1">
                                                        {d.summary}
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                }</For>
                            :
                                <div class="w-full h-screen flex">
                                    <div class="m-auto">
                                        This store currently has no products
                                    </div>
                                </div>
                        }
                    </div>
                :
                    <LoadingScreen />
            }
        </div>
    )
}

export default ProductsLayout;