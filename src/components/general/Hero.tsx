import { Component } from 'solid-js';
import Woman2 from '../../assets/images/first-banner.png'

const Hero: Component = () => {
  return (
    <div class="w-full h-screen bg-gray-200 flex" style={{ "background-image": `url(${Woman2})`,"background-size":"cover"}}>
    </div>
  );
};

export default Hero;
