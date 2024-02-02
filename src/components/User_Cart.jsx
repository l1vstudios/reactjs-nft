import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const User_Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [currentProductId, setCurrentProductId] = useState(null);
    const history = useHistory();

    const handleDeleteClick = (productId) => {
        setCurrentProductId(productId);
        handleDelete(productId);
    };




    const handlePlaceOrderClick = async () => {
        try {
            if (cartItems.length === 0) {
                console.error('Your cart is empty.');
                return;
            }

            const userDetails = JSON.parse(localStorage.getItem('user_info'));

            if (!userDetails || !userDetails.token) {
                console.error('User details or token not found');
                return;
            }

            console.log('Token from localStorage:', userDetails.token);

            // Fetch user details from http://localhost:8000/user using the token
            const userToken = userDetails.token;
            const userResponse = await fetch('http://localhost:8000/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();

                const generateRandomOrderId = () => {
                    const length = 8;
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let result = '';
                    for (let i = 0; i < length; i++) {
                        result += characters.charAt(Math.floor(Math.random() * characters.length));
                    }
                    return result;
                };

                const orderItems = cartItems.map(item => {
                    return {
                        id: item.product_id,
                        name: item.product_name,
                        price: item.price,
                        quantity: item.quantity,
                        brand: 'NFT COLLECTION',
                        category: 'Product Digital',
                        merchant_name: 'webeyedev',
                    };
                });

                const payload = {
                    payment_type: 'bank_transfer',
                    transaction_details: {
                        order_id: generateRandomOrderId(),
                        gross_amount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
                    },
                    usage_limit: 1,
                    item_details: orderItems,
                    customer_required: true,
                    customer_details: {
                        first_name: userDetails.username,
                        email: userData.user.email,
                        phone: '+62181000000000',
                        notes: 'Thank you for your purchase. Please follow the instructions to pay.',
                        customer_details_required_fields: ['first_name', 'phone', 'email'],
                    },
                };

                // Make the payment request
                const response = await fetch('http://localhost:8000/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userDetails.token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Payment response:', responseData);

                    if (responseData.payment_url) {
                        window.open(responseData.payment_url, '_blank');
                    } else {
                        console.error('Payment URL not found in the response');
                    }
                } else {
                    console.error('Error making payment request:', response.status);
                    const errorResponse = await response.json();
                    console.error('Error details:', errorResponse);
                }
            } else {
                console.error('Error fetching user details:', userResponse.status);
            }
        } catch (error) {
            console.error('Error making payment request:', error.message);
        }
    };




    const handleDelete = async (productId) => {
        try {
            const userDetails = JSON.parse(localStorage.getItem('user_info'));

            if (!userDetails || !userDetails.token) {
                console.error('User details or token not found');
                return;
            }

            const response = await axios.delete(`http://localhost:8000/cart-items/${productId}`, {
                headers: {
                    Authorization: `Bearer ${userDetails.token}`,
                },
            });

            console.log(response.data);

            // Reload the page after successful deletion
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem('user_info');
        if (userFromLocalStorage) {
            const user = JSON.parse(userFromLocalStorage);

            const token = user?.token;

            if (!token) {
                console.error('Token not found');
                history.push('/login'); // kalo user ga login ini disuruh login
                return;
            }

            axios.get('http://localhost:8000/cart-items', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setCartItems(response.data.data);
                    setCartItemCount(response.data.data.length);
                    setLoading(false);
                    console.log(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching cart items:', error);
                    setLoading(false);
                });
        }
    }, [history]);



    return (
        <div>
            <Navbar cartItemCount={cartItemCount} />

            <div className="min-w-screen bg-neutral-100 flex items-center p-3 lg:p-5 overflow-hidden relative" style={{ fontSize: '20px', marginTop: '150px' }}>
                <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-5 lg:p-3 text-gray-800">
                    {loading ? (
                        <p>Loading cart items...</p>
                    ) : (
                        <div>
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="md:flex mb-5">
                                        <div className="w-full md:w-1/2 px-3">
                                            <div className="relative">
                                                <img src={item.source} className="w-45 h-40 object-cover rounded" alt={item.name} />
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <div className="mb-5">
                                                <h1 className="text-xl mb-3">Item : {item.product_name}</h1>
                                                <p className="text-xs">Quantity : {item.quantity}</p>
                                            </div>
                                            <div className="flex items-center"> {/* Added a flex container */}
                                                <div className="inline-block align-bottom mr-5">
                                                    <span className="text-xs leading-none align-baseline">Rp.</span>
                                                    <span className="font-bold text-base leading-none align-baseline">{item.price}</span>
                                                </div>
                                                <div className="inline-block align-bottom">
                                                    <button
                                                        className="mr-3 bg-violet-500 opacity-85 hover:opacity-100 text-neutral-50 hover:text-gray-900 rounded-full px-4 py-1 text-sm"
                                                        onClick={handlePlaceOrderClick}
                                                    >
                                                        <i className="mdi mdi-cart -ml-1 mr-1"></i> Place Order
                                                    </button>
                                                </div>
                                                <div className="inline-block align-bottom">
                                                    <button
                                                        className="bg-red-500 opacity-85 hover:opacity-100 text-neutral-50 hover:text-gray-900 rounded-full px-4 py-1 text-sm"
                                                        onClick={() => handleDeleteClick(item.product_id)}
                                                    >
                                                        <i className="mdi mdi-delete"></i> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-end justify-end fixed bottom-0 right-0 mb-2 mr-2 z-10">
                <div>
                    <a title="Buy me a beer" href="https://www.buymeacoffee.com/scottwindon" target="_blank" className="block w-12 h-12 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-105 hover:rotate-12">
                        <img className="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg" alt="" />
                    </a>
                </div>
            </div>

            <Footer />
        </div >
    );
};


export default User_Cart;
