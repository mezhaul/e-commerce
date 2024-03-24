import { Component, For, createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuthContext } from "../../context/AuthContext"

const Orders:Component = () => {
    const {isAuth} = useAuthContext();
    const [orderData,setOrderData] = createSignal<any[]>([]);

    const handleOrderAddress = () => {
        const value = 5;
        alert('remove favourite');
        setOrderData((prv) => ({...prv,value}))
    }

    const navigate = useNavigate();
    
    createEffect(() => {
        if (!isAuth()) {
            navigate('/');
        }
    });

    return (
        <>
            <h1 class="text-xl font-semibold">
                Orders
            </h1>
            {orderData().length > 0
                ?
                    <>
                        <div class="w-full bg-white flex mt-3">
                            <div class="w-1/5 border-r border-gray-300 py-2 text-center">
                                Order No
                            </div>
                            <div class="w-1/5 border-r border-gray-300 py-2 text-center">
                                Order Date
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
                        <For each={orderData()}>{
                            (o) => <div class="w-ful flex">
                                <div>
                                    {o.id}
                                </div>
                                <div>
                                    <button onClick={handleOrderAddress}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        }</For>{}
                    </>
                :
                    <div class="w-full h-[70vh] flex">
                        <div class="m-auto">
                            You currently have no orders at the moment
                        </div>
                    </div>
            }
        </>
    )
}

export default Orders;
