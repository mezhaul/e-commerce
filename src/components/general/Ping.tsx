import { Component } from "solid-js"
import { useCartContext } from "../../context/CartContext";

const Ping:Component = () => {
    const {cart} = useCartContext();
    return (
        <span class="absolute -right-2 -bottom-1 flex h-4 w-4">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-red-500">
                <p class="text-xs m-auto text-white">{cart().length}</p>
            </span>
        </span>
    )
}

export default Ping;