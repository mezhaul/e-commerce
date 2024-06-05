import { Component, For, createContext, createSignal } from "solid-js";
import { useCartContext } from "../context/CartContext";
import { IoArrowUp, IoChevronDown, IoChevronUp, IoTrashBin } from "solid-icons/io";
import { useNavigate } from "@solidjs/router";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "solid-icons/ai";

const CartLayout:Component = () => {
    const { cart, removeFromCart, updateCart } = useCartContext();
    const navigate = useNavigate();
    const [showTotal, setShowTotal] = createSignal(false);

    const procceedToCheckout = () => {
        navigate('/checkout');
    }

    const getTotal = () => {
        let totalPrice: number = 0;
        cart().map((i) => {
            let productPrice = Number(i.price);
            let productQty = i.quantity;
            let total = (productPrice * productQty).toFixed(2);
            totalPrice = Number(total) + totalPrice
            // return total;
        });
        return totalPrice;
    }

    const handelReduce = (e: string) => {
        const productItem = cart().find((i) => i.id === e);
        const itemQuantity = productItem?.quantity ? productItem.quantity - 1 : 0;
        updateCart(e,itemQuantity);
    }

    const handelIncrease = (e: string) => {
        const productItem = cart().find((i) => i.id === e);
        const itemQuantity = productItem?.quantity ? productItem.quantity + 1 : 0;
        updateCart(e,itemQuantity);
    }

    const openTotal = () => {
        setShowTotal(!showTotal());
    }

    return (
        <div class="md:w-11/12 px-3 m-auto md:pt-20 pt-16 flex gap-5">
            <div class="w-full relative md:w-2/3 m-auto md:p-5 md:h-[87vh]">
                <div class="w-full">
                    <h1 class="text-2xl font-semibold">Cart Items</h1>
                    <button
                        onClick={() => navigate('/shops')}
                        class="text-sm text-gray-700"
                    >
                        Continue Shopping
                    </button>
                </div>
                {/* <div class="w-full bg-black text-white py-2 flex mt-3">
                    <div class="px-2">
                        Image
                    </div>
                    <div class="px-2">
                        Details
                    </div>
                    <div class="px-8">
                        QTY
                    </div>
                    <div class="px-2">
                        Total
                    </div>
                    <div class="px-2">
                        Action
                    </div>
                </div> */}
                <div class="w-full flex flex-col gap-3 mt-2 h-[50vh] overflow-y-auto">
                    <For each={cart()}>{
                        (i) => <div  class="w-full flex text-sm items-center bg-white border shadow">
                            <div class="">
                                <img src={i.images[0]} alt={i.name} class="w-24 h-24"/>
                            </div>
                            <div class="text-sm">
                                <h4 class="">
                                    {i.name}
                                </h4>
                                {/* {i.size} {i.color} */}
                            </div>
                            <div class=" px-2 flex">
                                <button
                                    onclick={() => handelReduce(i.id)}
                                >
                                    <AiOutlineMinusCircle />
                                </button>
                                <div class="w-1/3 text-center">
                                    {i.quantity}
                                </div>
                                <button
                                    onclick={() => handelIncrease(i.id)}
                                >
                                    <AiOutlinePlusCircle />
                                </button>
                            </div>
                            <div class=" px-2">R {(Number(i.price) * i.quantity).toFixed(2)}</div>
                            <div class=" px-2">
                                <button
                                    onclick={() => removeFromCart(i.id)}
                                    class="text-gray-500 hover:text-red-500"
                                >
                                    <IoTrashBin />
                                </button>
                            </div>
                        </div>
                    }</For>
                </div>
                <div class="hidden md:block w-full absolute bottom-5 left-0 px-5">
                    <div class="w-full flex justify-end items-center">
                        <div class="w-1/5 bg-white h-10 flex  border-l border-b border-t rounded-l-sm">
                            <h3 class="py-1 px-3 border-l my-auto">
                                Total
                            </h3>
                        </div>
                        <div class="w-1/5 bg-white h-10 flex border-b border-t ">
                            <h3 class="my-auto">
                                R {getTotal()}
                            </h3>
                        </div>
                        <div class="w-1/5">
                            <button
                                onClick={procceedToCheckout}
                                class="bg-black h-10 px-5 text-white w-full border "
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
                <div class={`w-full fixed bottom-0 ${showTotal() ? 'h-48' : 'h-28'} bg-white border-t left-0 over duration-300 ease-in-out`}>
                    <div class="w-full relative">
                        <button
                            onClick={openTotal}
                            class="h-9 w-9 m-auto -mt-4 flex bg-white rounded-full"
                        >
                            {showTotal()
                                ?
                                    <IoChevronDown class="m-auto text-2xl" />
                                :
                                    <IoChevronUp class="m-auto text-2xl" />
                            }
                        </button>
                        <h1 class="text-xl text-center -mt-1 pb-3">
                            Total
                        </h1>
                        <div class="w-11/12 m-auto flex justify-between">
                            <h1 class="text-xl font-bold">
                                Price
                            </h1>
                            <div>
                                R {getTotal()}
                            </div>
                        </div>
                        <div class="w-11/12 m-auto pt-1">
                            <button
                                onClick={procceedToCheckout}
                                class="bg-black h-10 px-5 text-white w-full border "
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartLayout;
