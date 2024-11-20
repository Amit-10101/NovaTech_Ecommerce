import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {QuantityChangerProps} from "../utils/types.ts";

const QuantityChanger: React.FC<QuantityChangerProps> = ({quantity, increaseQuantity, decreaseQuantity, disabled}) => {
    return (
        <div
            className={`flex items-center gap-2 border-2 rounded-lg w-fit overflow-hidden ${disabled ? "border-gray-400" : "border-palette-darkBlue"}`}
        >
            <button
                onClick={disabled ? undefined : decreaseQuantity}
                className={`${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-palette-darkBlue hover:bg-palette-darkBlue/95"} transition-ease-md px-4 py-2 text-white w-full h-full`}
            >
                <FontAwesomeIcon icon={faMinus}/>
            </button>

            <span
                className="text-xl font-medium px-2 mx-2 min-w-[3rem] text-center text-palette-darkBlue"
            >
                {quantity}
            </span>

            <button
                onClick={disabled ? undefined : increaseQuantity}
                className={`${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-palette-darkBlue hover:bg-palette-darkBlue/95"} px-4 py-2 text-white w-full h-full `}
            >
                <FontAwesomeIcon icon={faPlus}/>
            </button>
        </div>
    );
};
export default QuantityChanger;
