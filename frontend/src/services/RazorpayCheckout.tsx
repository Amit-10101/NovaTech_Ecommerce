import React, {useEffect} from 'react';
import {useAddTransactionMutation, useCreateOrderMutation, useVerifyPaymentMutation} from "../api/paymentApi.ts";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWallet} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useInsertOrderMutation} from "../api/orderApi.ts";
import {useRemoveAllCartItemsByUserIdMutation} from "../api/cartApi.ts";

const RazorpayCheckout: React.FC<{
    isDisabled?: boolean,
    otherClasses?: string,
}> = ({isDisabled, otherClasses}) => {
    const {user} = useSelector((state: RootState) => state.user);
    const [createOrder] = useCreateOrderMutation();
    const [insertOrder] = useInsertOrderMutation();
    const [removeAllCartItemsByUserId] = useRemoveAllCartItemsByUserIdMutation();
    const [verifyPayment] = useVerifyPaymentMutation();
    const [addTransaction] = useAddTransactionMutation();
    const navigate = useNavigate();
    // const [orderData, setOrderData] = useState<{ order_id: string, currency: string, amount: number }>({
    //     order_id: '',
    //     amount: 0,
    //     currency: 'INR'
    // });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async () => {
        if (!user) return;

        try {
            const response = await createOrder(user.user_id);
            const {order_id, amount, currency} = response.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_API_KEY,
                amount: amount,
                currency: currency,
                name: "NovaTech",
                description: "Payment for your order",
                image: "/nova.png",
                order_id: order_id,
                handler: (response: {
                    razorpay_order_id: string,
                    razorpay_payment_id: string,
                    razorpay_signature: string
                }) => {
                    // Handle the payment response here
                    console.log(response);
                    // Verify payment on the backend
                    verifyPayment({
                        userId: user.user_id,
                        ...response
                    }).then(async (res) => {
                        console.log(res.data);
                        const {data: r} = await insertOrder({
                            order_id: order_id,
                            user_id: user.user_id,
                            total_amount: amount,
                            shipping_base_address: user.base_address,
                            shipping_city: user.city,
                            shipping_state: user.state,
                        });
                        console.log(r);
                        console.log(order_id);

                        await addTransaction({
                            user_id: user.user_id,
                            order_id: response.razorpay_order_id,
                            payment_id: response.razorpay_payment_id,
                            payment_signature: response.razorpay_signature
                        });

                        await removeAllCartItemsByUserId(user.user_id);

                        navigate(`/order-details/${order_id}`);
                    })
                        .catch(err => console.error(err));
                },
                prefill: {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    contact: user.phone_number,
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#6731d0",
                },
                modal: {
                    ondismiss: () => {
                        console.log("Checkout form closed");
                    },
                    animation: true,
                    width: "100%",
                    height: "100%",
                },
            };

            // @ts-expect-error Razorpay
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment failed", error);
        }
    };

    return (
        <button
            type={"button"}
            disabled={isDisabled}
            onClick={handlePayment}
            className={"flex gap-2 items-center justify-center px-8 py-4 rounded-lg transition duration-300 ease-in-out text-white " + otherClasses + (isDisabled ? " cursor-not-allowed bg-slate-400 " : " cursor-pointer bg-[#3395ff] hover:bg-blue-600 ")}
        >
            <FontAwesomeIcon icon={faWallet}/> Pay with Razorpay
        </button>
    );
};

export default RazorpayCheckout;
