import React from 'react';
import Hero from "../../components/Hero.tsx";

// import React from 'react';

const FeaturedProducts = () => {
    const featuredProducts = [
        {
            title: 'PlayStation 5',
            image: 'https://example.com/ps5.jpg',
            description: 'Black and White version of the PS5 coming out on sale.',
            link: '/shop/ps5',
        },
        {
            title: "Women's Collections",
            image: 'https://example.com/women-fashion.jpg',
            description: 'Featured woman collections that give you another vibe.',
            link: '/shop/women',
        },
        {
            title: 'Speakers',
            image: 'https://example.com/speakers.jpg',
            description: 'Amazon wireless speakers',
            link: '/shop/speakers',
        },
        {
            title: 'Perfume',
            image: 'https://example.com/perfume.jpg',
            description: 'GUCCI INTENSE OUD EDP',
            link: '/shop/perfume',
        },
    ];

    return (
        <div className="container mx-auto  bg-palette-lightGray p-8 py-20 min-h-screen">
            {/* Featured Section */}
            <h2 className="text-red-500 font-bold text-lg">Featured</h2>
            <h1 className="text-3xl font-bold mt-2">New Arrival</h1>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 gap-6 mt-8">
                {/* PlayStation 5 Card */}
                <div className="bg-black text-white rounded-lg flex flex-col overflow-hidden">
                    <img
                        src="/ps.png"
                        alt="PlayStation 5"
                        className="object-contain mx-auto w-[80%] flex-grow"
                    />
                    <div className="p-8 px-8 border-t border-slate-700">
                        <h3 className="text-lg font-bold">PlayStation 5</h3>
                        <p className="text-sm mt-2">
                            Black and White version of the PS5 coming out on sale.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Shop Now
                        </button>
                    </div>
                </div>

                {/* Women's Collections Card */}
                <div className={"flex flex-col gap-4"}>
                    <div className="relative h-full bg-gray-100 border shadow text-white rounded-lg overflow-hidden">
                        <img
                            src="/led.jpg"
                            alt="Women's Collections"
                            className="w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-30 text-white p-4 px-10">
                            <div></div>
                            <h3 className="text-lg font-bold">LED's Collections</h3>
                            <p className="text-sm mt-2">
                                Featured LED collections that give you another vibe.
                            </p>
                            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                Shop Now
                            </button>
                        </div>
                    </div>

                    {/* Speakers Card */}
                    <div className={"grid grid-cols-2 gap-4 h-full"}>
                        <div className="relative rounded-lg bg-[#262626] h-full overflow-hidden">
                            <img
                                src="/speaker.png"
                                alt="Perfume"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-30 px-6 w-full p-4 text-white">
                                <h3 className="text-lg font-bold">Speakers</h3>
                                <p className="text-sm mt-2">Bluetooth wireless speakers</p>
                                <button
                                    className="mt-4 px-4 py-2 bg-palette-red hover:bg-palette-darkRed text-white rounded">
                                    Shop Now
                                </button>
                            </div>
                        </div>

                        {/* Perfume Card */}
                        <div className="relative rounded-lg bg-[#262626]  h-full overflow-hidden">
                            <img
                                src="/ac.avif"
                                alt="Perfume"
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-30 px-6 w-full p-4 text-white">
                                <h3 className="text-lg font-bold">AC</h3>
                                <p className="text-sm mt-2">Frost Free ACs</p>
                                <button
                                    className="mt-4 px-4 py-2 bg-palette-red hover:bg-palette-darkRed text-white rounded">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// export default FeaturedProducts;

const Home: React.FC = () => {
    return (
        <div className={"bg-palette-lightGray"}>
            <Hero/>

            <FeaturedProducts/>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 py-10 rounded-md flex flex-col items-center">
                    <img src={"/free-delivery.svg"} alt={"Free and Fast Delivery"} className={"mb-6"}/>
                    <h3 className="text-xl font-bold mb-2">Free and Fast Delivery</h3>
                    <p className="text-gray-500">
                        For orders over $50 within selected regions.
                    </p>
                </div>

                <div className="p-4 py-10 rounded-md flex flex-col items-center">
                    <img src={"/support.svg"} alt={"24/7 Support"} className={"mb-6"}/>
                    <h3 className="text-xl font-bold mb-2">24/7 Customer Service</h3>
                    <p className="text-gray-500">Providing round-the-clock support.</p>
                </div>

                <div className="p-4 py-10 rounded-md flex flex-col items-center">
                    <img src={"/verified.svg"} alt={"Money-Back Guarantee"} className={"mb-6"}/>
                    <h3 className="text-xl font-bold mb-2">Money-Back Guarantee</h3>
                    <p className="text-gray-500">Full refund within 30 days.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
