import { Component } from 'solid-js';
import BannerTop1 from '../../assets/images/banner-van.png'

const Hero: Component = () => {
  return (
    <div class="w-full bg-gray-200 flex pt-14 md:pt-0">
      <img src={BannerTop1} alt="Top banner 1" />
    </div>
  );
};

export default Hero;
