// // import React from 'react';
// //
// // const Carousel: React.FC = () => {
// //     return (
// //         <div>Carousel</div>
// //     );
// // };
// // export default Carousel;
// import React, {useState, useEffect} from 'react';
// import {homeHeroImages} from '../constants/data';
//
// const Carousel: React.FC = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % homeHeroImages.length);
//         }, 3000); // Change image every 3 seconds
//
//         return () => clearInterval(interval);
//     }, []);
//
//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + homeHeroImages.length) % homeHeroImages.length);
//     };
//
//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % homeHeroImages.length);
//     };
//
//     return (
//         <div className="relative w-full h-[40rem] overflow-hidden">
//             <div className="absolute inset-0 flex items-center justify-between z-10">
//                 <button onClick={prevSlide} className="p-6 bg-neutral-600 shadow bg-opacity-90 text-white">
//                     &#10094;
//                 </button>
//                 <button onClick={nextSlide} className="p-6 bg-neutral-600 shadow bg-opacity-90 text-white">
//                     &#10095;
//                 </button>
//             </div>
//             <div className="h-full flex transition-transform duration-500"
//                  style={{transform: `translateX(-${currentIndex * 100}%)`}}>
//                 {homeHeroImages.map((image, index) => (
//                     <img key={index} src={image} alt={`Slide ${index}`}
//                          className="w-full h-full object-cover object-center flex-shrink-0"/>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Carousel;
import React, {useState, useEffect} from 'react';
import {homeHeroImages} from '../constants/data';
import {useNavigate} from "react-router-dom";

const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const navigate = useNavigate();

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex === 0 ? homeHeroImages.length - 1 : prevIndex - 1));
    // };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % homeHeroImages.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[40rem] overflow-hidden">

            <div className="h-full flex transition-transform duration-500"
                 style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                {homeHeroImages.map((slide, index) => (
                    <div key={index} className="w-full h-full relative flex-shrink-0 z-99">
                        <img src={slide.image} alt={`Slide ${index}`}
                             className="w-full h-full object-cover object-center"
                        />

                        <div
                            className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4 z-30">

                            <h2 className="text-7xl font-bold text-white mb-4">{slide.title}</h2>
                            <p className="text-lg text-white mb-4">{slide.description}</p>
                            <button
                                onClick={() => navigate(slide.navigation)}
                                className="px-6 py-3 mt-4 bg-palette-red text-white hover:bg-palette-darkRed transition-ease-md cursor-pointer rounded-lg z-99">
                                {slide.buttonText}
                            </button>

                            {/*<div className="absolute inset-0 flex items-center justify-between z-30">*/}
                            {/*    <button onClick={prevSlide}*/}
                            {/*            className="p-6 bg-neutral-600 shadow bg-opacity-90 text-white">*/}
                            {/*        &#10094;*/}
                            {/*    </button>*/}
                            {/*    <button onClick={nextSlide}*/}
                            {/*            className="p-6 bg-neutral-600 shadow bg-opacity-90 text-white">*/}
                            {/*        &#10095;*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
