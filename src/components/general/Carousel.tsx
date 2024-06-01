import { Component, For } from "solid-js";
import "solid-slider/slider.css";
import { Slider, SliderButton, SliderProvider } from "solid-slider";
import { RiArrowsArrowLeftSLine, RiArrowsArrowRightSLine } from "solid-icons/ri";

interface CarouselProps {
    shopLinks: any[];
}

const Carousel: Component<CarouselProps> = (props) => {
    const { shopLinks } = props; 

    const options = {
        loop: true,
        breakpoints: {
            "(min-width: 400px)": {
                slides: { perView: 2, spacing: 5 },
            },
            "(min-width: 1000px)": {
                slides: { perView: 5, spacing: 30 },
            },
        },
        slides: { perView: 1 },
    };

    return (
        <div class="w-full py-10 md:py-16 relative">
            <div class="w-10/12 m-auto flex">
                {shopLinks.length > 0 ? (
                    <SliderProvider>
                        <Slider options={options}>
                            <For each={shopLinks}>{(s) => <a href={`/shop/${s.id}`} class="flex justify-center w-full"><img src={s.image} alt={s.name} class="h-32 md:h-auto"/></a>}</For>
                        </Slider>
                        <SliderButton prev class="absolute left-0 md:left-14 h-full top-0">
                            <RiArrowsArrowLeftSLine class="text-7xl" />
                        </SliderButton>
                        <SliderButton next class="absolute right-0 md:right-14 h-full top-0">
                            <RiArrowsArrowRightSLine class="text-7xl" />
                        </SliderButton>
                    </SliderProvider>
                ) : null}
            </div>
        </div>
    );
};

export default Carousel;
