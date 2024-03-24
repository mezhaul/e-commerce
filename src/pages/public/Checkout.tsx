import { Component, createEffect } from "solid-js";
import CheckoutLayout from "../../layouts/CheckoutLayout";
import { useNavigate } from "@solidjs/router";
import { useCartContext } from "../../context/CartContext";

const Checkout:Component = () => {
    const { cart } = useCartContext();
    const navigate = useNavigate();
    
    createEffect(() => {
        // Check if the cart is empty
        if (cart().length === 0) {
            // Redirect to another page, e.g., home page
            navigate('/');
        }
    });

    return (
        <>
            <CheckoutLayout />
        </>
    )
}

export default Checkout;