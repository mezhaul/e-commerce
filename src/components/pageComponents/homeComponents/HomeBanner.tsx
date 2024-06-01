import { Component } from "solid-js";
import BannerBottom from '../../../assets/images/Bottom_Banner.jpg'


const HomeBanner: Component = () => {
    return (
        <div class='w-full flex flex-wrap'>
            <img src={BannerBottom} alt="Bottom banner" />
        </div>
    )
}

export default HomeBanner;