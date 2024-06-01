import { Component } from 'solid-js';
import BannerTop1 from '../../assets/images/Top_Banner_1.jpg'

const Hero: Component = () => {
  return (
    <div class="w-full bg-gray-200 flex pt-14 md:pt-0">
      <img src={BannerTop1} alt="Top banner 1" />
    </div>
  );
};

export default Hero;
