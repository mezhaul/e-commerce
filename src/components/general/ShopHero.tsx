import { Component } from "solid-js";

interface ShopHeroProps {
    image: string
}

const ShopHero:Component<ShopHeroProps> = ({image}) => {
    return (
        <div class="w-full h-96 bg-gray-200" style={{"background-image":`url(${image})`,"background-size":"cover"}}>

        </div>
    )
}

export default ShopHero;