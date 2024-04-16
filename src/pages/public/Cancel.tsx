import { Component } from "solid-js"
import cookie from "cookiejs"
import { IoAlertCircleOutline } from "solid-icons/io";

const Cancel:Component = () => {
    const purchaserDetails = cookie.get('checkout_details');
    if(purchaserDetails){
        console.log(JSON.parse(purchaserDetails as any))
    } 
    return (
        <div class="w-full h-screen flex">
            <div class="w-11/12 lg:w-1/2 m-auto h-96 bg-customColor border border-black rounded-sm">
                <div class="w-full flex py-5">
                    <IoAlertCircleOutline class="text-7xl m-auto text-yellow-600"/>
                </div>  
                <p class="text-center px-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim nesciunt libero accusamus numquam ducimus reiciendis aperiam eligendi molestias labore repellendus.
                </p>
                <div class="flex-col flex gap-5 pt-6">
                    <button class="bg-red-500 w-11/12 text-white m-auto h-10 rounded-sm">
                        Cancel Order
                    </button>
                    <button class="bg-green-500 w-11/12 text-white m-auto h-10 rounded-sm">
                        Retry Transaction
                    </button>
                </div>
                {purchaserDetails}
            </div>
        </div>
    )
}

export default Cancel;