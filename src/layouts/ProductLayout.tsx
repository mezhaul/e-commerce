import { useParams } from "@solidjs/router";
import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
import { Component, For, createEffect, createSignal, onMount } from "solid-js";
import { db } from "../firebase/config";
import { BsHeart, BsShare } from "solid-icons/bs";
import cookie from "cookiejs";
import { useCartContext } from "../context/CartContext";
import LoadingScreen from "../components/general/LoadingScreen";
import { AiOutlineMinus, AiOutlinePlus } from "solid-icons/ai";
import { IoHeartOutline, IoStar, IoStarOutline } from 'solid-icons/io'

const ProductLayout:Component = () => {
    const [loading, setLoading] = createSignal(false);
    const [scrollFunc, setScrollFunc] = createSignal(false);
    const {addToCart} = useCartContext();
    const [productData, setProductData] = createSignal<any>();
    const [selectedData,setSelectedData] = createSignal({
        color: '',
        size: '',
        quantity: 1,
    });
    const [selectedDataError,setSelectedDataError] = createSignal({
        color: '',
        size: '',
        quantity: 1,
    });
    const {id} = useParams();
    const userId = cookie.get('userId');

    createEffect(() => {
        getProductData(id)
    });

    const getProductData = async (e: any) => {
        const docRef = doc(db, "products", `${e}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let doc_id = {"id":docSnap.id}
            let doc_data = docSnap.data();
            let new_data = Object.assign(doc_id,doc_data);
            setProductData(new_data);
        } else {
            console.log("No such document!");
        }
        setLoading(true);
    }

    const addToWishlist = async () => {
        alert('please select size and colour')
        const docRef = await addDoc(collection(db, "whishlist"), {
            user_id: userId,
            product_id: productData().id,
            name: productData().name,
            image: productData().images[0],
            summary: productData().summary,
            price: productData().price,
            created_at: Timestamp.now()
        });
        if(docRef.id){
            alert('Product was added to your wish list');
        } else {
            alert('Your product was not added to your wish list');
        }
    }

    const addToShoppingCart = () => {
        let {
            color,
            size
        } = selectedData();
        if(color === '' || size === ''){
            if(color === ''){
                setSelectedDataError((prv) => ({...prv,color:'Please select a colour'}));
            }
            if(size === ''){
                setSelectedDataError((prv) => ({...prv,size:'Please select a size'}));
            }
            return;
        }
        const newDataObj = Object.assign(productData(),selectedData());
        addToCart(newDataObj);
    }

    const selectColor = (e: string) => {
        setSelectedData((prv) => ({...prv,color:e}));
        setSelectedDataError((prv) => ({...prv,color:''}));
    }

    const selectSize = (e: string) => {
        setSelectedData((prv) => ({...prv,size:e}));
        setSelectedDataError((prv) => ({...prv,size:''}));
    }

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if(scrollY > 248){
            setScrollFunc(true);
        } else {
            setScrollFunc(false);
        }
      };

      onMount(() => {
        window.addEventListener('scroll', handleScroll);

        // Optionally clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
      });

    return (
        <>
            {loading()
                ?
                    <div class="w-full md:px-0 md:w-11/12 m-auto pt-14 md:pt-20 flex md:gap-5 flex-wrap md:flex-nowrap py-10 relative">
                        <div class="w-full md:w-1/3 bg-gray-200 flex relative">
                            <img src={productData()?.images[0]} alt={productData()?.title} class="w-full m-auto" />
                            <IoHeartOutline class="absolute bottom-5 left-5 text-3xl text-gray-500"/>
                            <IoStarOutline class="absolute bottom-5 right-5 text-3xl text-gray-500"/>
                        </div>
                        <div class="w-full px-5 md:px-0 md:w-1/3 flex flex-col gap-2 pb-56 pt-4">
                            <h1 class="text-2xl font-bold">{productData()?.name}</h1>
                            <h3 class="text-lg font-medium">
                                {productData()?.summary}
                            </h3>
                            {/* <p class="bg-yellow-300">
                                {productData()?.details}
                            </p> */}
                            <div class="flex gap-4 items-center">
                                <span class="bg-green-600 text-white text-sm px-3 pb-1 rounded-full">
                                    Gender
                                </span>
                                {productData()?.gender}
                            </div>
                            <div class="w-full border-b border-gray-300 flex justify-between">
                                <p>
                                    Colours
                                </p>
                                <p class="text-red-500">
                                    {selectedDataError().color !== '' ? selectedDataError().color : null}
                                </p>
                            </div>
                            <div class="flex gap-2 flex-wrap ">
                                <For each={productData()?.colors}>{
                                    (c) => <div>
                                        <button
                                            onclick={() => selectColor(c)}
                                            class="h-6 w-6 rounded-full"
                                            style={{"background-color": `${c}`}}
                                        >
                                        </button>
                                    </div>
                                }</For>
                            </div>
                            <div class="w-full border-b border-gray-300 flex justify-between">
                                <p>
                                    Sizes
                                </p>
                                <p class="text-red-500">
                                    {selectedDataError().size !== '' ? selectedDataError().size : null}
                                </p>
                            </div>
                            <div class="flex gap-2 flex-wrap ">
                                <For each={productData()?.sizes}>{
                                    (s) => <div>
                                        <button
                                            onClick={() => selectSize(s)}
                                            class={`${selectedData().size === s ? "bg-sky-600 text-white" : null} py-1 border border-gray-300 w-16`}
                                        >
                                            {s}
                                        </button>
                                    </div>
                                }</For>
                            </div>
                            <div class="flex gap-4 items-center ">
                                <span class="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                                    Stock Available
                                </span>
                                {productData()?.stock}
                            </div>
                        </div>
                        <div class={`fixed md:relative bg-white md:bg-gray-100 bottom-0 md:block w-full md:w-1/3 px-5 md:px-0 ${scrollFunc() ? 'h-60 border-t' : 'h-0'} ease-in-out duration-500 overflow-hidden md:h-auto`}>
                            {/* <div>
                                <h3 class="text-2xl pb-3 flex justify-between font-bold">
                                    Summary
                                </h3>
                            </div> */}
                            <div class="text-xl flex justify-between pt-5">
                                <p>
                                    Price
                                </p>
                                <h3>
                                    R {(Number(productData()?.price) * selectedData().quantity).toFixed(2)}
                                </h3>
                            </div>
                            <div class="pb-3">
                                <h3 class="text-lg text-center pb-2">
                                    Quantity
                                </h3>
                                <div class="w-full h-10 border border-gray-300 rounded-sm flex">
                                    <button
                                        onClick={() => setSelectedData((prv) => ({...prv,quantity: selectedData().quantity !== 1 ? selectedData().quantity - 1 : selectedData().quantity}))}
                                        class="w-1/4 border-r h-10 border-gray-300 bg-gray-200 hover:bg-gray-300 duration-300"
                                    >
                                        <AiOutlineMinus class="m-auto" />
                                    </button>
                                    <div class="w-2/4 border-r flex h-10 border-gray-300">
                                        <p class="m-auto">{selectedData().quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedData((prv) => ({...prv,quantity: selectedData().quantity + 1}))}
                                        class="w-1/4 h-10 flex bg-gray-200 hover:bg-gray-300 duration-300"
                                    >
                                        <AiOutlinePlus class="m-auto" />
                                    </button>
                                </div>
                            </div>
                            <div class="flex items-center gap-5">
                                <button
                                    onClick={addToShoppingCart}
                                    class="w-full bg-black h-10 text-white px-10 rounded-sm"
                                >
                                    Add to Cart
                                </button>
                                <button onClick={addToWishlist} class="hidden md:block">
                                    <BsHeart />
                                </button>
                                <button class="hidden md:block">
                                    <BsShare />
                                </button>
                            </div>
                            <div class="flex justify-between items-center border-b border-gray-300">
                                <h3 class="pt-5 pb-2 text-xl">
                                    Product Reviews
                                </h3>
                                <div class="flex gap-2 text-xl text-yellow-500">
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <LoadingScreen />
            }
        </>
    )
}

export default ProductLayout;
