import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useOnClickOutside } from '../../utils/utils';

export default function Avatar() {
    const infoRef = useRef();
    const [showInfo, setShowInfo] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth) || {};

    // logout
    const handleLogOut = () => {
        dispatch(logout());
    };

    // click-outside
    useOnClickOutside(infoRef, () => {
        setShowInfo(false);
    });

    return (
        <div className="relative">
            <span
                role="none"
                className="flex items-center cursor-pointer"
                onClick={() => {
                    setShowInfo(!showInfo);
                }}
            >
                <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                    onClick={handleLogOut}
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 mr-2">
                        Logout
                    </span>
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
                >
                    <img src={user?.avatar} alt="" />
                </button>
                <p className="ml-2">{user?.name}</p>
            </span>
        </div>
    );
}
