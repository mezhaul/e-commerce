import { IoBag } from "solid-icons/io";
import { Component } from "solid-js";

const NoProducts:Component = () => {
    return (
        <div class="w-full h-screen flex">
            <div class="m-auto flex flex-col text-gray-700">
                <IoBag class="text-4xl m-auto mb-5"/>
                <h3>
                    This store currently has no products
                </h3>
            </div>
        </div>
    )
}

export default NoProducts;