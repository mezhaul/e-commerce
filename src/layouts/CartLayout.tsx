import { Component, For } from "solid-js";
import { useCartContext } from "../context/CartContext";
import { IoTrashBin } from "solid-icons/io";
import { useNavigate } from "@solidjs/router";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "solid-icons/ai";

const CartLayout:Component = () => {
    const { cart, removeFromCart, updateCart } = useCartContext();
    const navigate = useNavigate();

    const procceedToCheckout = () => {
        navigate('/checkout');
    }

    const getTotal = () => {
        const cartTotal = cart().map((i) => {
            let productPrice = Number(i.price);
            let productQty = i.quantity;
            let total = (productPrice * productQty).toFixed(2); 
            return total;
        });
        return cartTotal;
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

    return (
        <div class="w-11/12 m-auto pt-20 flex gap-5">
            <div class="w-full relative md:w-2/3 m-auto p-5 h-[87vh] bg-customColor border border-black rounded-sm">
                <div class="w-full flex justify-between">
                    <h1 class="text-2xl font-semibold">Cart Items</h1>
                    <button class="bg-sky-500 border border-sky-600 hover:bg-sky-600 text-sm h-8 px-5 text-white rounded-sm">
                        Continue Shopping
                    </button>
                </div>
                <div class="w-full bg-black text-white py-2 flex mt-3">
                    <div class="w-1/5 px-2">
                        Image
                    </div>
                    <div class="w-1/5 px-2">
                        Description
                    </div>
                    <div class="w-1/5 px-8">
                        QTY
                    </div>
                    <div class="w-1/5 px-2">
                        Total
                    </div>
                    <div class="w-1/5 px-2">
                        Action
                    </div>
                </div>
                <div class="w-full flex flex-col gap-3 mt-2 h-[50vh] overflow-y-auto">
                    <For each={cart()}>{
                        (i) => <div  class="w-full flex items-center bg-white border border-black">
                            <div class="w-1/5 px-2">
                                <img src={i.images[0]} alt={i.name} class="w-14"/>
                            </div>
                            <div class="w-1/5 text-sm">
                                <h4 class="font-semibold">
                                    {i.name} 
                                </h4>
                                {i.size} {i.color}
                            </div>
                            <div class="w-1/5 px-2 flex">
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
                            <div class="w-1/5 px-2">R {(Number(i.price) * i.quantity).toFixed(2)}</div>
                            <div class="w-1/5 px-2">
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
                <div class="w-full absolute bottom-5 left-0 px-5">
                    <div class="w-full flex justify-end items-center">
                        <div class="w-1/5 bg-white h-10 flex  border-l border-b border-t border-black rounded-l-sm">
                            <h3 class="py-1 px-3 border-l my-auto">
                                Total
                            </h3>
                        </div>
                        <div class="w-1/5 bg-white h-10 flex border-b border-t border-black">
                            <h3 class="my-auto">
                                R {getTotal()}
                            </h3>
                        </div>
                        <div class="w-1/5">
                            <button
                                onClick={procceedToCheckout} 
                                class="bg-black h-10 px-5 text-white w-full border border-black"
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