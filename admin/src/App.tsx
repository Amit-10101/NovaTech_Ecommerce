import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login.tsx";
import Error404 from "./pages/Error/Error404.tsx";
import Products from "./pages/Products/Products.tsx";
import AddProduct from "./pages/Products/AddProduct.tsx";
import EditProduct from "./pages/Products/EditProduct.tsx";
import Sidebar from "./components/SideBar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store.ts";
import {useGetAdminFromTokenMutation} from "./apis/adminApi.ts";
import {logout, setAdmin} from "./features/adminSlice.ts";

const App:React.FC = () => {
    const dispatch = useDispatch();
    const {admin, token, isAuthenticated} = useSelector((state: RootState) => state.admin);
    const [getAdminFromToken] = useGetAdminFromTokenMutation();

    useEffect(() => {
        const requestHandler = async (token: string) => {
            const response = await getAdminFromToken(token);
            if (response.error) {
                throw new Error('Unauthorized');
            }
            return response.data;
        };

        if (token && !admin) {
            requestHandler(token).then((response) => {
                if (response.valid) {
                    console.log(response);
                    dispatch(setAdmin(response.user));
                } else {
                    dispatch(logout());
                }
            }).catch((e) => {
                console.log("Error while fetching user details from token: ", e.message);
                dispatch(logout());
            });
        }
    }, [token, admin, dispatch, getAdminFromToken]);

    return (
        <div className="flex">
            {isAuthenticated && <Sidebar/>}
            <div className={`flex-1 bg-gray-100 ${isAuthenticated && "ml-64"} overflow-auto`}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard" element={<Products/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/product/add" element={<AddProduct/>}/>
                    <Route path="/product/edit/:productId" element={<EditProduct/>}/>
                    <Route path="/*" element={<Error404/>}/>
                </Routes>
            </div>
        </div>
    );
};
export default App;
