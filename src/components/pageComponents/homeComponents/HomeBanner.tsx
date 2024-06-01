import { Component } from "solid-js";
import Banner from '../../../assets/images/Bottom_Banner.jpg'


const HomeBanner: Component = () => {
    return (
        <div class='w-full flex flex-wrap h-screen'  style={{ "background-image": `url(${Banner})`,"background-size":"cover"}}>
        </div>
    )
}

export default HomeBanner;