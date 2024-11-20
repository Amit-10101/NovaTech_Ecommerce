import React from "react";
import ContactForm from "../../components/ContactForm.tsx";

const About: React.FC = () => {
    return (
        <div className="bg-palette-lightGray px-6 py-10 lg:px-20 w-full flex flex-col justify-center">
            {/* Header Section */}
            <div className={"grid grid-cols-2 gap-4 mb-20"}>
                <div className="text-left h-full flex flex-col justify-center px-10 py-6">
                    <h1 className="text-4xl font-bold mb-4">Our Story</h1>
                    <p className="text-gray-600 text-lg">
                        Launched in 2015, Exquisite is South Asia's premier online shopping
                        site, providing affordable luxury in fashion and home goods.
                        Supported by a growing network of customers, we offer exclusive deals
                        and ensure quality products are just a few clicks away.
                    </p>
                    <p className="text-gray-600 text-lg">
                        Exclusive has more than 1 Million products to offer, growing at a very fast.
                        Exclusive offers a diverse assortment in categories ranging from consumer.
                    </p>
                </div>

                {/* Image Section */}
                <div className="flex justify-center mb-10">
                    <img
                        // src="https://via.placeholder.com/800x400" // Replace with actual image link
                        src="https://www.shutterstock.com/image-photo/buyers-couple-shopping-using-cellphone-600nw-2116844222.jpg"
                        alt="Our Story"
                        className="rounded-lg shadow-md"
                    />
                </div>
            </div>

            {/* Stats Section */}
            <div
                className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center text-center mb-20">
                <div
                    className="group border-2 border-palette-mediumGray w-[90%] px-8 py-8 flex flex-col items-center hover:bg-palette-red hover:text-white transition-ease-lg">
                    <img src="/shop.svg" alt="Active sellers"
                         className="mb-6 w-12 h-12 group-hover:hidden transition-ease-lg"/>
                    <img src="/shop-light.svg" alt="Active sellers"
                         className="mb-6 w-12 h-12 hidden group-hover:block transition-ease-lg"/>
                    <h2 className="text-2xl font-bold">10.5k</h2>
                    <p className="">Sellers active on site</p>
                </div>

                <div
                    className="group border-2 border-palette-mediumGray w-[90%] px-8 py-8 flex flex-col items-center hover:bg-palette-red hover:text-white transition-ease-lg">
                    <img src="/currency.svg" alt="Monthly sales"
                         className="mb-6 w-12 h-12 group-hover:hidden transition-ease-lg"/>
                    <img src="/currency-light.svg" alt="Monthly sales"
                         className="mb-6 w-12 h-12 hidden group-hover:block transition-ease-lg"/>
                    <h2 className="text-2xl font-bold">1.2m</h2>
                    <p className="">Monthly Product Sales</p>
                </div>

                <div
                    className="group border-2 border-palette-mediumGray w-[90%] px-8 py-8 flex flex-col items-center hover:bg-palette-red hover:text-white transition-ease-lg">
                    <img src="/bag.svg" alt="Customer reviews"
                         className="mb-6 w-12 h-12 group-hover:hidden transition-ease-lg"/>
                    <img src="/bag-light.svg" alt="Customer reviews"
                         className="mb-6 w-12 h-12 hidden group-hover:block transition-ease-lg"/>
                    <h2 className="text-2xl font-bold">45.5k</h2>
                    <p className="">Customer reviews on site</p>
                </div>

                <div
                    className="group border-2 border-palette-mediumGray w-[90%] px-8 py-8 flex flex-col items-center hover:bg-palette-red hover:text-white transition-ease-lg">
                    <img src="/img.png" alt="Annual revenue"
                         className="mb-6 w-12 h-12 group-hover:invert transition-ease-lg"/>
                    <h2 className="text-2xl font-bold">25k</h2>
                    <p className="">Annual gross sales</p>
                </div>
            </div>

            {/* Team Section */}
            {/*<div className="text-center mb-10">*/}
            {/*    <h2 className="text-3xl font-bold mb-6">Our Team</h2>*/}
            {/*    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
            {/*        <div className="flex flex-col items-center">*/}
            {/*            <img*/}
            {/*                src="https://via.placeholder.com/150" // Replace with actual image*/}
            {/*                alt="Tom Cruise"*/}
            {/*                className="w-32 h-32 rounded-full mb-4"*/}
            {/*            />*/}
            {/*            <h3 className="text-xl font-bold">Tom Cruise</h3>*/}
            {/*            <p className="text-gray-500">Founder & Chairman</p>*/}
            {/*        </div>*/}
            {/*        <div className="flex flex-col items-center">*/}
            {/*            <img*/}
            {/*                src="https://via.placeholder.com/150" // Replace with actual image*/}
            {/*                alt="Emma Watson"*/}
            {/*                className="w-32 h-32 rounded-full mb-4"*/}
            {/*            />*/}
            {/*            <h3 className="text-xl font-bold">Emma Watson</h3>*/}
            {/*            <p className="text-gray-500">Managing Director</p>*/}
            {/*        </div>*/}
            {/*        <div className="flex flex-col items-center">*/}
            {/*            <img*/}
            {/*                src="https://via.placeholder.com/150" // Replace with actual image*/}
            {/*                alt="Will Smith"*/}
            {/*                className="w-32 h-32 rounded-full mb-4"*/}
            {/*            />*/}
            {/*            <h3 className="text-xl font-bold">Will Smith</h3>*/}
            {/*            <p className="text-gray-500">Product Designer</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <ContactForm/>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
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

export default About;
