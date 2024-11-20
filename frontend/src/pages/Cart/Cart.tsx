import React, {useCallback, useEffect, useState} from 'react';
import {useGetCartByUserIdQuery} from "../../api/cartApi.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import CartItem from "../../components/CartItem.tsx";
import Loading from "../../components/Loading.tsx";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DeliveryDetailsModal from "../../components/DeliveryDetailsModal.tsx";

const Cart: React.FC = () => {
    const {user} = useSelector((state: RootState) => state.user);
    const [userId, setUserId] = useState<string | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (user?.user_id) {
            setUserId(user.user_id.toString());
        }
    }, [user]);

    const {data: items, refetch} = useGetCartByUserIdQuery(userId ?? '', {
        skip: !userId,
    });
    console.log(items);

    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId, refetch]);


    const updateTotalPrice = useCallback((price: number) => {
        setTotalPrice(prevTotal => prevTotal + price);
    }, []);

    useEffect(() => {
        if (items) {
            setTotalPrice(0);
            items.forEach(({price, quantity}) => {
                console.log(price);
                updateTotalPrice(Number.parseFloat(price) * quantity);
            });
        }
    }, [items, updateTotalPrice]);

    if (!items) {
        return <Loading/>;
    }

    const handleCheckout = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            {/*<h1 className="w-full text-4xl font-bold mb-8 flex justify-center items-center bg-black text-white py-24">*/}
            {/*    My Cart*/}
            {/*</h1>*/}
            <h1 className="w-full text-4xl font-bold flex justify-center items-center bg-black text-white py-24 bg-[url('/bg.svg')] bg-center bg-no-repeat bg-cover">
                My Cart
            </h1>
            <div className="flex flex-col gap-4 px-12 py-6 min-h-[85vh]">
                {items.length === 0 ? (
                    <h1 className={"h-full min-h-[50vh] w-full flex justify-center items-center"}>
                        No products in Cart. Add some products to cart for purchase.
                    </h1>
                ) : (
                    <>
                        {items.map(({cart_id, product_id, quantity, user_id}, ind: number) => (
                            <CartItem key={ind} cartId={cart_id} productId={product_id} quantity={quantity}
                                      userId={user_id} refetchCartItems={refetch}/>
                        ))}
                        <div className="mt-8 flex justify-between p-4">
                            <span className="text-3xl font-bold">
                                Total Price: <span className="text-red-500">₹ {totalPrice}</span>
                            </span>

                            <button
                                onClick={handleCheckout}
                                className="px-8 py-4 rounded-lg bg-palette-darkBlue hover:bg-palette-darkestBlue ease-in-out transition duration-300 text-white flex items-center gap-4">
                                <FontAwesomeIcon icon={faCartShopping}/>
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>

            {isModalOpen && <DeliveryDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>}
        </>
    );
};
export default Cart;
