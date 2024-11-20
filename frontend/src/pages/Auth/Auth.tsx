import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../../components/Login.tsx";
import Signup from "../../components/Signup.tsx";
import Error404 from "../Error/Error404.tsx";

const Auth: React.FC = () => {
    return (
        <div className="bg-palette-darkBlue/[0.97] bg-[url('/auth-bg.svg')] bg-center bg-no-repeat bg-cover text-white h-full min-h-[90vh] px-20 py-16 flex items-center ">
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>

                <Route path="*" element={<Error404/>}/>
            </Routes>
        </div>
    );
};

export default Auth;
