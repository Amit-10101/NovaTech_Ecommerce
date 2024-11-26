import React from "react";
import {CustomCheckboxProps} from "../utils/types.ts";

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({value, label, onChange}) => {
    return (
        <label className="relative flex pl-9 mb-1.5 items-center cursor-pointer text-lg select-none">
            <input type="checkbox" value={value} className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
                   onChange={onChange}/>
            <span
                className="absolute top-0 left-0 h-6 w-6 bg-gray-300 rounded transition-colors duration-300 peer-checked:bg-palette-red peer-checked:shadow peer-checked:shadow-red-300"></span>
            <span
                className="absolute top-[0.125rem] left-[0.5rem] w-1.5 h-3.5 border-white border-r-2 border-b-2 transform rotate-45 scale-0 peer-checked:scale-100 transition-transform duration-200"></span>
            <span className="text-base">{label}</span>
        </label>
    );
};

export default CustomCheckbox;
