import { Component } from "solid-js"
import cookie from "cookiejs"

const Success: Component = () => {
    const purchaserDetails = cookie.get('checkout_details');
    if(purchaserDetails){
        console.log(JSON.parse(purchaserDetails as any))
    } 
    return (
        <div class="w-full h-screen flex">
            <div class="w-11/12 lg:w-1/2 m-auto h-96 bg-customColor border border-black rounded-sm">
                {purchaserDetails}
            </div>
        </div>
    )
}

export default Success;