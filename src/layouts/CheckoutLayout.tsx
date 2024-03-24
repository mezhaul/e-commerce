import { Component, For, createEffect, createSignal } from "solid-js"
import { useCartContext } from "../context/CartContext";
import cookie from "cookiejs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { IoLocate } from "solid-icons/io";
import RequestOptions from '../types/requestOptions';

const CheckoutLayout:Component = () => {
    const {cart} = useCartContext();
    const [locationList,setLocationList] = createSignal<any[]>([]);
    const userId = cookie.get('userId');
    const [checkOutData,setCheckOutData] = createSignal({
      location: '',
      recipientName: '',
      primaryContact: '',
      alternativeContact: '',
      instructions: '',
    });
    const [checkOutDataError,setCheckOutDataError] = createSignal({
        location: '',
        recipientName: '',
        primaryContact: '',
        alternativeContact: '',
        instructions: '',
      });

    createEffect(() => {
        getUserAddressList(userId);
    });

    const getUserAddressList = async (e: any) => {
        const q = query(collection(db, "addresses"), where("user_id", "==", `${e}`));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const doc_id = {"id": doc.id}
            const doc_data = doc.data();
            const new_data = Object.assign(doc_id,doc_data);
            setLocationList((prv) => ([...prv,new_data]));
        });
    }

    const handleCheckoutData = (e: any) => {
        const { name, value } = e.currentTarget; 
        setCheckOutData((prv) => ({...prv,[name]:value}));
    }

    const handleCheckoutDataError = (e: any) => {
        const { name } = e.currentTarget;
        setCheckOutDataError((prv) => ({...prv,[name]:e}));
    }

    const getCartTotal = () => {
        const Total = cart().map((i) => {
            const price = Number(i.price);
            const qty = i.quantity;
            const total = Number((price * qty).toFixed(2)); 
            return total;
        });
        return Total
    }

    const handleSubmit = () => {
        const {
            location,
            recipientName,
            primaryContact,
            alternativeContact,
            instructions
        } = checkOutData();
        if(location === '' || recipientName === '' || primaryContact === ''){
            if(location === ''){
                setCheckOutDataError((prv) => ({...prv,location:'Location is a manditory field!'}));
            }
            if(recipientName === ''){
                setCheckOutDataError((prv) => ({...prv,recipientName:'Recipient name is a manditory field!'}));
            }
            if(primaryContact === ''){
                setCheckOutDataError((prv) => ({...prv,recipientName:'Recipient name is a manditory field!'}));
            }
            return
        }
        const checkOutDetails = JSON.stringify({
            location,
            recipientName,
            primaryContact,
            alternativeContact,
            instructions
        })
        cookie.set('checkout_details',checkOutDetails);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer sk_live_0ebea035L1R2p1Ye6394ff8bac78");
        myHeaders.append("Cookie", "_cfuvid=1aMoFz97R9EMjGyNE0eD4Sv_mAu6vhyZ5FPAOtiWq1E-1711210951779-0.0.1.1-604800000");

        const raw = JSON.stringify({
            "amount": getCartTotal(),
            "currency": "ZAR"
        });

        const requestOptions:RequestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/payment", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const data = JSON.parse(result);
            window.open(data.redirectUrl, '_blank');
        })
        .catch((error) => console.error(error));
    }

    return (   
        <div class="w-11/12 m-auto pt-20 flex gap-5">
            <div class="w-full lg:w-2/3 m-auto p-5 md:h-[87vh] bg-customColor border border-black rounded-sm">
                <h1 class="text-2xl pb-3">Checkout</h1>
                <div class="w-full flex md:gap-5 flex-wrap md:flex-nowrap">
                    <div class="w-full md:w-1/2 flex flex-col gap-1">
                        <div>
                            <h3 class="text-lg">Cart Summary:</h3>
                        </div>
                        <div>
                            <For each={cart()}>{
                                (i) => <div class="w-full border rounded-sm flex py-1 bg-white items-center border-black">
                                    <div class="w-1/3 flex justify-center h-12">
                                        <img src={i.images[0]} alt={i.name} class="h-12"/>
                                    </div>
                                    <div class="w-1/3 flex justify-center">
                                        {i.name}
                                    </div>
                                    <div class="w-1/3 flex justify-center">
                                        R {(Number(i.price) * i.quantity).toFixed(2)}
                                    </div>
                                </div>
                            }</For>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 flex flex-col gap-1 relative md:h-[77vh]">
                        <div>
                            <h3 class="text-lg">Location:</h3>
                        </div>
                        {locationList().length > 0 
                            ?
                                <select
                                    name="location"
                                    oninput={(e) => handleCheckoutData(e)}
                                    onChange={(e) => handleCheckoutDataError(e)}
                                    class="w-full max-w-[450px] h-10 border border-black outline-none px-1"
                                >
                                    <option value="select">Select</option>
                                </select>
                            :
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        name="location"
                                        onChange={(e) => handleCheckoutData(e)}
                                        oninput={(e) => handleCheckoutDataError(e)}
                                        placeholder={checkOutDataError().location ? checkOutDataError().location :"Enter location"}
                                        class="border border-black  w-full max-w-[450px] h-10 text-sm px-8"
                                    />
                                    <IoLocate class="absolute top-3 left-3" />
                                </div>
                        }
                        <div>
                            <label>Recipient's Name</label>
                        </div>
                        <input 
                            type="text" 
                            name="recipientName"
                            onChange={(e) => handleCheckoutData(e)}
                            onInput={(e) => handleCheckoutDataError(e)}
                            placeholder="Enter name"
                            class="w-full max-w-[450px] h-10 border border-black px-2"
                        />
                        <div>
                            <label>Contact number</label>
                        </div>
                        <input 
                            type="text" 
                            name="primaryContact"
                            onChange={(e) => handleCheckoutData(e)}
                            onInput={(e) => handleCheckoutDataError(e)}
                            placeholder="Primary number"
                            class="w-full max-w-[450px] h-10 border border-black px-2"
                        />
                        <div>
                            <label>Alternative number</label>
                        </div>
                        <input 
                            type="text" 
                            name="alternativeContact"
                            onChange={(e) => handleCheckoutData(e)}
                            onInput={(e) => handleCheckoutDataError(e)}
                            placeholder="Contact number"
                            class="w-full max-w-[450px] h-10 border border-black px-2"
                        />
                        <div>
                            <label>Add Instructions</label>
                        </div>
                        <textarea 
                            name="instruction" 
                            cols="30" 
                            rows="4"
                            onChange={(e) => handleCheckoutData(e)}
                            onInput={(e) => handleCheckoutDataError(e)}
                            placeholder="Enter instructions"
                            class="border border-black resize-none rounded-sm p-2"
                        ></textarea>
                        <button
                            onclick={handleSubmit} 
                            class="bg-black mt-5 md:absolute md:bottom-5 h-10 text-white px-5 w-full max-w-[450px]"
                        >
                            Proceed to payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default CheckoutLayout;