import { Component, createEffect } from "solid-js";
import CheckoutLayout from "../../layouts/CheckoutLayout";
import { useNavigate } from "@solidjs/router";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";

const Checkout:Component = () => {
    const { cart } = useCartContext();
    const { isAuth } = useAuthContext();
    const navigate = useNavigate();
    
    createEffect(() => {
        if (cart().length === 0 || !isAuth()) {
            navigate('/login');
        }
    });

    return (
        <>
            <CheckoutLayout />
        </>
    )
}

export default Checkout;