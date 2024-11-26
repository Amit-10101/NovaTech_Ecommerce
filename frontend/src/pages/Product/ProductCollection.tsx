import React, {useState, useEffect} from 'react';
import {useFilterProductQuery} from '../../api/productApi.ts';
import ProductCard from '../../components/ProductCard.tsx';
import Loading from '../../components/Loading.tsx';
import Filter from "../../components/Filter.tsx";

const ProductCollection: React.FC = () => {
    const [filterQuery, setFilterQuery] = useState('');
    const {data: products, isLoading, refetch} = useFilterProductQuery(filterQuery);
    const rating = {count: 101, stars: 5};

    useEffect(() => {
        refetch();
    }, [filterQuery, refetch]);

    if (isLoading || products === undefined) return <Loading/>;

    console.log(filterQuery);

    return (
        <>
            <h1 className="w-full text-4xl font-bold flex justify-center items-center bg-black text-white py-24 bg-[url('/bg.svg')] bg-center bg-no-repeat bg-cover">
                Our Products
            </h1>
            <div className="w-full flex gap-10 px-12 pt-14 pb-24 min-h-[78vh] bg-palette-lightGray">
                <div className="w-[21%] flex flex-col">
                    <Filter setFilterQuery={setFilterQuery}/>
                </div>

                <div
                    className="w-3/4 h-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.length !== 0 ? (
                        products.map(
                            ({
                                 product_id,
                                 product_name,
                                 image_url,
                                 price,
                                 category_id,
                                 category_name,
                             }) => (
                                <ProductCard
                                    key={product_id}
                                    productId={product_id}
                                    productName={product_name}
                                    imageUrl={image_url}
                                    price={price}
                                    categoryId={category_id}
                                    categoryName={category_name}
                                    rating={rating}
                                />
                            )
                        )
                    ) : (
                        <h1
                            className={
                                'h-full min-h-[50vh] w-full flex justify-center items-center'
                            }
                        >
                            No Products Found
                        </h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductCollection;
