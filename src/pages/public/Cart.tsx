import { Component, createEffect } from "solid-js";
import CartLayout from "../../layouts/CartLayout";
import { useCartContext } from "../../context/CartContext";
import { useNavigate } from "@solidjs/router";

const Cart: Component = () => {
    const { cart } = useCartContext();
    const navigate = useNavigate();
    
    createEffect(() => {
        if (cart().length === 0) {
            navigate('/');
        }
    });
  
    return (
        <CartLayout />
    )
}

export default Cart;