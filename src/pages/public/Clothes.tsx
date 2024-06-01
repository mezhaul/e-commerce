import { Component } from "solid-js";
import LadiesImg from "../../assets/images/Ladies_Clothes_Category.jpg"
import MenImg from "../../assets/images/Ladies_Clothes_Category.jpg"
import ChildrenImg from "../../assets/images/Kids_Clothing_Category.jpg"
import ToddlersImg from "../../assets/images/Ladies_Clothes_Category.jpg"


const Clothes:Component = () => {
    return (
        <div class="w-full md:w-11/12 m-auto px-2 md:px-0 pt-16 lg:pt-20 flex flex-wrap py-10 mb:pb-10">
            <div class="flex w-full gap-3">
                <a href="/ladies" class="w-full md:w-1/2 bg-gray-300 h-96" style={{"background-image":`url(${LadiesImg})`,"background-size":"cover"}}></a>
                <a href="/men" class="w-full md:w-1/2 bg-gray-300 h-96" style={{"background-image":`url(${MenImg})`,"background-size":"cover"}}></a>
            </div>
            <div class="flex w-full gap-3 mt-3">
                <a href="/kids" class="w-full md:w-1/2 bg-gray-300 h-96" style={{"background-image":`url(${ChildrenImg})`,"background-size":"cover"}}></a>
                <a  href="/toddlers" class="w-full md:w-1/2 bg-gray-300 h-96" style={{"background-image":`url(${ToddlersImg})`,"background-size":"cover"}}></a>
            </div>
        </div>
    );
};

export default Clothes;