import React from 'react';
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {RatingProps} from "../utils/types.ts";

const Rating: React.FC<RatingProps> = ({count, stars, type = 'sm', otherClasses}) => {
    const filled: number = Math.ceil(stars);
    const unfilled: number = 5 - filled;

    const sizeClasses = type === 'md' ? 'text-lg' : 'text-sm';
    const containerClasses = type === 'md' ? 'space-x-0.5' : 'space-x-0.5';

    return (
        <div className={`${containerClasses} ${otherClasses} mx-1 flex items-center`}>
            <span className={`font-semibold ${sizeClasses} me-2`}>{stars}</span>
            {
                Array.from({length: filled}, (_, ind) => (
                    <FontAwesomeIcon key={ind} icon={faStar} className={`text-yellow-400 ${sizeClasses}`}/>
                ))
            }
            {
                Array.from({length: unfilled}, (_, ind) => (
                    <FontAwesomeIcon key={ind} icon={faStar} className={`text-gray-300 ${sizeClasses}`}/>
                ))
            }
            <span className={`ms-2 ${sizeClasses}`}>({count})</span>
        </div>
    );
};

export default Rating;
