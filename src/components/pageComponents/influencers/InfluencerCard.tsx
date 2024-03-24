import { Component } from "solid-js";

interface InfluencerCardProps {
    image: string,
    username: string
}

const InfluencerCard: Component<InfluencerCardProps> = ({image,username}) => {

    return (
        <div class="w-1/5">
            <div class="w-full h-72 overflow-hidden">
                <img src={image} alt={username} class="w-full"/>
            </div>
            <p>{username}</p>
        </div>
    )
}

export default InfluencerCard;
