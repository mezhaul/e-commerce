import { Component } from "solid-js";
import LadiesImg from "../../assets/images/Ladies-clothing-new.jpg"
import MenImg from "../../assets/images/Men-clothing-new.jpg"
import ChildrenImg from "../../assets/images/Kids-clothing-new.jpg"
import ToddlersImg from "../../assets/images/Toddler-Clothing-new.jpg"


const Clothes:Component = () => {
    return (
        <div class="w-full md:w-11/12 m-auto px-2 md:px-0 pt-16 lg:pt-20 flex flex-wrap py-10 mb:pb-10">
            <div class="flex w-full md:gap-3 flex-wrap md:flex-nowrap">
                <a href="/ladies" class="w-full md:w-1/2 bg-gray-300 h-56 md:h-96" style={{"background-image":`url(${LadiesImg})`,"background-size":"cover"}}></a>
                <a href="/men" class="w-full md:w-1/2 bg-gray-300 h-56 md:h-96 mt-3 md:mt-0" style={{"background-image":`url(${MenImg})`,"background-size":"cover"}}></a>
            </div>
            <div class="flex w-full md:gap-3 flex-wrap md:flex-nowrap md:mt-3">
                <a href="/kids" class="w-full md:w-1/2 bg-gray-300 h-56 md:h-96 mt-3 md:mt-0" style={{"background-image":`url(${ChildrenImg})`,"background-size":"cover"}}></a>
                <a  href="/toddlers" class="w-full md:w-1/2 bg-gray-300 h-56 md:h-96 mt-3 md:mt-0" style={{"background-image":`url(${ToddlersImg})`,"background-size":"cover"}}></a>
            </div>
        </div>
    );
};

export default Clothes;