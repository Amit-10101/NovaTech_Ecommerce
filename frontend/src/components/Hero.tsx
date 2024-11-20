import React from 'react';
import HeroCarousel from "./Carousel.tsx";

const Hero: React.FC = () => {
    return (
        <div className="w-full h-full">
            {/*<img src={url} alt="Hero Image"/>*/}
            <HeroCarousel/>
        </div>
    );
};
export default Hero;
