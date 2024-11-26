// import React from 'react';

import Rating from "./Rating.tsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef} from "react";
import {ProductState} from "../utils/types.ts";

const ProductCard: React.FC<ProductState> = ({
                                                 productId,
                                                 productName: title,
                                                 imageUrl: image,
                                                 price,
                                                 categoryName,
                                                 rating,
                                             }) => {

    const navigate = useNavigate();
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (componentRef.current) {
            componentRef.current.classList.add('opacity-0');
            setTimeout(() => {
                if (componentRef.current) {
                    componentRef.current.classList.add('opacity-100', 'duration-300');
                }
            }, 250); // Short delay to trigger the animation
        }
    }, []);

    return (
        <div
            ref={componentRef}
            className="rounded-md h-[20rem] w-full shadow-lg border cursor-pointer hover:scale-105 ease-in-out duration-300 transition-all bg-white"
            onClick={() => navigate(`/product/${productId}`)}
        >
            {/*<Image url={image} altText={title}/>*/}
            <img src={image} alt={title} className="w-full h-3/5 object-contain border-b object-center"/>
            <div className={"px-4 py-3 w-full"}>
                <h1 className="font-bold truncate w-full">{title}</h1>
                <h4 className={"font-medium text-md my-1"}>₹ {price}</h4>
                <h6 className={"font-light text-gray-600 text-xs my-1"}>{categoryName}</h6>
                <div>
                    <Rating count={rating.count} stars={rating.stars}/>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
