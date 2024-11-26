import React, {useState} from 'react';
import {useGetAllBrandsQuery, useGetAllCategoriesQuery, useGetAllSubCategoriesQuery} from "../api/productApi.ts";
import Loading from "./Loading.tsx";
import CustomCheckbox from "./CustomCheckbox.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Filter: React.FC<{ setFilterQuery: (arg: string) => void }> = ({setFilterQuery}) => {
    const {data: categories, isLoading: isCategoriesLoading} = useGetAllCategoriesQuery();
    const {data: subCategories, isLoading: isSubCategoriesLoading} = useGetAllSubCategoriesQuery();
    const {data: brands, isLoading: isBrandsLoading} = useGetAllBrandsQuery();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [isCategoriesVisible, setIsCategoriesVisible] = useState<boolean>(false);
    const [isSubCategoriesVisible, setIsSubCategoriesVisible] = useState<boolean>(false);
    const [isBrandsVisible, setIsBrandsVisible] = useState<boolean>(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 199999]);

    if (isCategoriesLoading || isSubCategoriesLoading || isBrandsLoading) {
        return <Loading forContainer/>;
    }

    const handleCheckboxChange = (value: string, setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
        setSelected(prev => prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]);
    };

    const applyFilterHandler = () => {
        const filterParams = {
            categoryIds: selectedCategories,
            subCategoryIds: selectedSubCategories,
            brandIds: selectedBrands,
            minPrice: priceRange[0],
            maxPrice: priceRange[1]
        };

        const constructFilterQuery = (params: any): string => {
            const queryParts: string[] = [];

            if (params.categoryIds.length > 0) {
                queryParts.push(`category_id=${params.categoryIds.join(',')}`);
            }

            if (params.subCategoryIds.length > 0) {
                queryParts.push(`sub_category_id=${params.subCategoryIds.join(',')}`);
            }

            if (params.brandIds.length > 0) {
                queryParts.push(`brand_id=${params.brandIds.join(',')}`);
            }

            queryParts.push(`price_min=${params.minPrice}`);
            queryParts.push(`price_max=${params.maxPrice}`);

            return queryParts.join('&');
        };

        const query = constructFilterQuery(filterParams);
        console.log('Filter Query:', query); // Debugging log
        setFilterQuery(query);
    };

    return (
        <>
            <h3 className="font-bold text-3xl pt-4 pb-6 tracking-wider underline underline-offset-[6px]">
                Filter
            </h3>

            <div className={""}>
                <div className={"mb-4"}>
                    <div className="flex justify-between items-center cursor-pointer"
                         onClick={() => setIsCategoriesVisible(!isCategoriesVisible)}>
                        <h6 className="my-2 font-bold text-lg">Categories</h6>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`transform transition-transform transition-ease-md ${isCategoriesVisible ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </div>
                    <div
                        className={`transition-ease-md overflow-y-auto origin-top ${isCategoriesVisible ? 'max-h-[40vh] scale-y-100' : 'max-h-0 scale-y-0'}`}>
                        {categories?.map((category) => (
                            <CustomCheckbox
                                key={category.category_id}
                                value={category.category_id}
                                label={category.category_name}
                                onChange={() => handleCheckboxChange(category.category_id, setSelectedCategories)}
                            />
                        ))}
                    </div>
                </div>

                <div className={"mb-4"}>
                    <div className="flex justify-between items-center cursor-pointer"
                         onClick={() => setIsSubCategoriesVisible(prev => !prev)}>
                        <h6 className="my-2 font-bold text-lg">Sub Categories</h6>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`transform transition-transform transition-ease-md ${isSubCategoriesVisible ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </div>
                    <div
                        className={`transition-ease-md overflow-y-auto origin-top ${isSubCategoriesVisible ? 'max-h-[40vh] scale-y-100' : 'max-h-0 scale-y-0'}`}>
                        {subCategories?.map((subCategory) => (
                            <CustomCheckbox
                                key={subCategory.sub_category_id}
                                value={subCategory.sub_category_id}
                                label={subCategory.sub_category_name}
                                onChange={() => handleCheckboxChange(subCategory.sub_category_id, setSelectedSubCategories)}
                            />
                        ))}
                    </div>
                </div>

                <div className={"mb-4"}>
                    <div className="flex justify-between items-center cursor-pointer"
                         onClick={() => setIsBrandsVisible(prev => !prev)}>
                        <h6 className="my-2 font-bold text-lg">Brands</h6>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`transform transition-transform transition-ease-md ${isBrandsVisible ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </div>
                    <div
                        className={`transition-ease-md overflow-y-auto origin-top ${isBrandsVisible ? 'max-h-[40vh] scale-y-100' : 'max-h-0 scale-y-0'}`}>
                        {brands?.map((brand) => (
                            <CustomCheckbox
                                key={brand.brand_id}
                                value={brand.brand_id}
                                label={brand.brand_name}
                                onChange={() => handleCheckboxChange(brand.brand_id, setSelectedBrands)}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <h6 className="my-2 font-bold text-lg">Price Range</h6>
                    <div className="flex items-center gap-4">
                        <Slider
                            range
                            min={0}
                            max={199999}
                            value={priceRange}
                            onChange={setPriceRange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                </div>

                <button
                    className={"bg-palette-red hover:bg-palette-darkRed transition-ease-lg text-white w-full mt-6 p-4 font-medium"}
                    onClick={applyFilterHandler}
                >
                    Apply Filter
                </button>
            </div>
        </>
    );
};

export default Filter;
