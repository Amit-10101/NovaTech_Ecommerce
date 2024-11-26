import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {logout} from "../features/adminSlice.ts";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBox, faHome, faRightFromBracket, faTruckFast, faUser} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col fixed">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">
                Admin Dashboard
            </div>
            <nav className="flex-1 p-4">
                <ul>
                    <li className="mb-4">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex gap-3 items-center py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                        >
                            <FontAwesomeIcon icon={faHome}/> Home
                        </NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `flex gap-3 items-center py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                        >
                            <FontAwesomeIcon icon={faBox}/> Products
                        </NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                `flex gap-3 items-center py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                        >
                            <FontAwesomeIcon icon={faUser}/> Users
                        </NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink
                            to="/orders"
                            className={({ isActive }) =>
                                `flex gap-3 items-center py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                        >
                            <FontAwesomeIcon icon={faTruckFast} /> Orders
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className={"p-4"}>
                <button
                    onClick={() => {
                        dispatch(logout());
                        navigate('/');
                    }}
                    className={"flex items-center gap-2 w-full py-2 px-5 rounded bg-red-300/20 text-red-500 hover:text-red-500 font-medium transition-ease-md"}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
