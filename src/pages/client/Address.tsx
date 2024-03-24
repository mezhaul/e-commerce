import { Component, For, createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuthContext } from "../../context/AuthContext";
import { IoLocate } from "solid-icons/io";

const Address:Component = () => {
    const {isAuth} = useAuthContext();
    const [address,setAddress] = createSignal<string>();
    const [addresses,setAddresses] = createSignal<any[]>([]);
    const navigate = useNavigate();
    
    createEffect(() => {
        if (!isAuth()) {
            navigate('/');
        }
    });

    const handleAddress = (e: any) => {
        const {value} = e.currentTarget;
        setAddress(value);
    }

    const handleAddressError = (e:any) => {
        const {name}  = e.currentTarget;
        console.log(name);
    }

    const addAddress = () => {
        setAddresses(prv => [...prv,address()]);
    }

    return (
        <>
            <h1 class="text-xl font-semibold">
                Address
            </h1>
            <div class="w-full flex mt-3">
                <div class="relative w-full h-9 items-center flex">
                    <input
                        type="text"
                        name="address"
                        class="w-full max-w-[450px] h-9 border border-black px-8 rounded-l-sm"
                        placeholder="Enter address"
                        onChange={handleAddress}
                        onInput={handleAddressError}
                    />
                    <IoLocate class="absolute top-3 left-3" />
                    <button
                        onClick={addAddress}
                        class="w-24 text-sm bg-black text-white h-9 rounded-r-sm"
                    >
                        Add
                    </button>
                </div>
            </div>
            {addresses().length > 0
                ?
                <>
                    <div class="w-full flex bg-white mt-5">
                        <div class="w-3/4 border-r border-gray-300 px-5 py-2">
                            Address
                        </div>
                        <div class="w-1/4 py-2 px-5">
                            Action
                        </div>
                    </div>
                    <For each={addresses()}>{
                        (a) => <div class="w-full flex">
                            <div class="w-3/4">
                                {a}
                            </div>
                            <div class="w-1/4">

                            </div>
                        </div>
                    }</For>
                </>
                :
                <div class="w-full h-[60vh] flex">
                    <div class="m-auto">
                        No addresses listed at moment
                    </div>
                </div>
            }
        </>
    )
}

export default Address;
