import { Component } from "solid-js";
import Woman from '../../../assets/images/man-7506912_1280.jpg'


const HomeBanner: Component = () => {
    return (
        <div class='w-full flex flex-wrap'>
            <div class='w-full sm:w-1/2 h-[90vh] overflow-hidden'>
                <img src={Woman} alt=""/>
            </div>
            <div class="w-full sm:w-1/2 bg-customColor2">

            </div>
        </div>
    )
}

export default HomeBanner;