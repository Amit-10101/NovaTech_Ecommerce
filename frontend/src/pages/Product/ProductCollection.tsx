import React from 'react';
import {useGetAllProductsQuery} from "../../api/productApi.ts";
import ProductCard from "../../components/ProductCard.tsx";
// import Filter from "../../components/Filter.tsx";
import Loading from "../../components/Loading.tsx";

const ProductCollection: React.FC = () => {
    const {data: products, isLoading} = useGetAllProductsQuery();
    const rating = {count: 101, stars: 5};

    if (isLoading || products === undefined) return <Loading/>;

    console.log(products);

    return (
        <>
            <h1 className="w-full text-4xl font-bold flex justify-center items-center bg-black text-white py-24 bg-[url('/bg.svg')] bg-center bg-no-repeat bg-cover">
                Our Products
            </h1>
            <div className="w-full h-full px-12 pt-14 pb-24 min-h-[78vh] bg-palette-lightGray">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {
                        products.length !== 0 ? (
                            products.map(({
                                              product_id,
                                              product_name,
                                              image_url,
                                              price,
                                              category_id,
                                              category_name
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
                            ))) : (
                            <h1 className={"h-full min-h-[50vh] w-full flex justify-center items-center"}>
                                No Products Found
                            </h1>
                        )
                    }
                </div>

                <div>
                    {/*<Filter/>*/}
                </div>
            </div>
        </>
    );
};

export default ProductCollection;
