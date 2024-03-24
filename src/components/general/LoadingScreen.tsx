import { Component } from "solid-js";

const LoadingScreen:Component = () => {
    return (
        <div class="w-full h-screen cursor-wait flex fixed overflow-hidden top-0 left-0 bg-black bg-opacity-50 z-50">
            <div class="m-auto loader"></div>
        </div>
    )
} 

export default LoadingScreen;