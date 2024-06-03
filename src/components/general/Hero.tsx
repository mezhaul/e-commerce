import { Component } from 'solid-js';
import BannerTop1 from '../../assets/images/man-banner.png'

const Hero: Component = () => {
  return (
    <div class="w-full flex pt-14 md:pt-0 h-[69vh] md:h-auto ">
      <img src={BannerTop1} alt="Top banner 1" />
    </div>
  );
};

export default Hero;
