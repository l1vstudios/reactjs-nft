import React, { useEffect } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/solid';

const Navbar = ({ cartItemCount, showCartNotification }) => {

    const loggedInUser = JSON.parse(localStorage.getItem('user_info'));

    useEffect(() => {
        // Logika untuk menampilkan notifikasi pada Navbar
        if (showCartNotification) {
            console.log('Show notification in Navbar');
            // Tambahkan logika notifikasi atau efek visual di sini
        }
    }, [showCartNotification]);

    const handleLogout = async () => {
        try {
            // Get the user token from localStorage
            const userToken = loggedInUser?.token;

            if (!userToken) {
                console.error('User token not found');
                return;
            }

            // Make a request to the logout endpoint with the user's token
            const response = await fetch('http://localhost:8000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.ok) {
                // Clear user information from localStorage
                localStorage.removeItem('user_info');
                console.log('Logged out successfully');
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
        window.location.href = '/login';
    };

    return (
        <div>


            <header className="header fixed top-0 w-full bg-black text-white shadow-md flex items-center justify-center px-8 py-2 z-10">

                <nav className="nav font-semibold text-lg">
                    <p className="bg-black text-white text-center" style={{ fontSize: '20px', marginTop: '5px' }}>
                        User Login : {loggedInUser && loggedInUser.name}
                    </p>
                    <ul className="flex items-center">
                        <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                            <a href="/products">Home</a>
                        </li>
                        <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                            <a href="">Collection</a>
                        </li>
                        <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                            <a href="/cart">
                                <span className="flex items-center text-white relative">
                                    <span className="mr-2" aria-label="Cart icon">
                                        <ShoppingCartIcon className="w-6 h-6 text-white" />
                                    </span>

                                    {cartItemCount > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                                            {cartItemCount}
                                        </span>
                                    )}

                                    {showCartNotification && (
                                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </span>
                            </a>
                        </li>
                        <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer" onClick={handleLogout}>
                            <a href="#">Logout</a>
                        </li>

                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
