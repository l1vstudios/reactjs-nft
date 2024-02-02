import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Card3 = () => {
    const location = useLocation();
    const token = location.state?.token;
    const [cartItems, setCartItems] = useState([]);
    const [quantityToAdd, setQuantityToAdd] = useState(1);
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [showCartNotification, setShowCartNotification] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem('user_info');
        if (userFromLocalStorage) {
            setLoggedInUser(JSON.parse(userFromLocalStorage));
            console.log('Token on Products Page:', token);
        }

        fetchData();
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userFromLocalStorage = localStorage.getItem('user_info');
                console.log('User Info from localStorage:', userFromLocalStorage);

                if (userFromLocalStorage) {
                    const parsedUser = JSON.parse(userFromLocalStorage);
                    setLoggedInUser(parsedUser);

                    if (parsedUser.token) {
                        console.log('Logged-in User Token:', parsedUser.token);

                        const response = await axios.get('http://localhost:8000/cart-items', {
                            headers: {
                                Authorization: `Bearer ${parsedUser.token}`,
                            },
                        });

                        setCartItems(response.data.data);
                        setCartItemCount(response.data.data.length);
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [history]);

    const fetchData = () => {
        return fetch("http://localhost:8000/products")
            .then((response) => response.json())
            .then((data) => {
                setProductData(data['data']);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    const openDetailModal = (productId) => {
        setSelectedProductId(productId);
        setIsDetailModalVisible(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalVisible(false);
    };

    const openQuantityModal = (productId) => {
        setSelectedProductId(productId);
        setIsQuantityModalVisible(true);
    };

    const closeQuantityModal = () => {
        setIsQuantityModalVisible(false);
    };

    const addToCart = async (productId) => {
        try {
            const userFromLocalStorage = localStorage.getItem('user_info');
            if (userFromLocalStorage) {
                const user = JSON.parse(userFromLocalStorage);
                const token = user?.token;
                if (token) {
                    const productResponse = await axios.get(`http://localhost:8000/get-product-info/${productId}`);
                    const productInfo = productResponse.data.data;

                    const payload = {
                        user_id: loggedInUser.id,
                        product_id: productId,
                        quantity: quantityToAdd,
                        source: productInfo.source
                    };

                    const headers = new Headers({
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    });

                    fetch('http://localhost:8000/add-to-cart', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(payload),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Success Added To Cart:', data);
                            setCartItemCount(cartItemCount + quantityToAdd);
                            setShowCartNotification(true);
                            setTimeout(() => {
                                setShowCartNotification(false);
                            }, 3000);
                            // showAlert('Success Added To Cart', 'green');
                        })
                        .catch(error => {
                            console.error('Error adding to cart:', error);
                            // showAlert('Error adding to cart', 'red');
                        });
                } else {
                    console.error('Token not found in user info');
                }
            } else {
                console.error('User info not found in localStorage');
            }
        } catch (error) {
            console.error('Error adding to cart:', error.message);
            showAlert('Error adding to cart', 'red');
        }
    };

    const handleQuantityChange = (event) => {
        setQuantityToAdd(parseInt(event.target.value));
    };

    const showAlert = (message) => {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'fixed top-10 right-0 mt-4 mb-4 mr-4 px-4 py-2 bg-violet-500 text-white rounded flex items-center';
        alertDiv.innerHTML = `<div class="mr-2"></div>${message}`;
        document.body.appendChild(alertDiv);
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    };

    return (
        <div>
            <Navbar cartItemCount={cartItemCount} showCartNotification={showCartNotification} />

            <h1 className='text-center mt-16' style={{ fontSize: '50px', marginTop: '150px' }}>NFT Collections</h1>

            <h2 className='text-center' style={{ fontSize: '30px' }}>Bring Your Bag And Choose Your Favorite NFT'S</h2>
            <div className="flex flex-wrap justify-center mt-4">
                {loading ? (
                    <p>Loading...</p>
                ) : productData.length > 0 ? (
                    productData.map((product) => (
                        <div key={product.item_id} className="max-w-sm rounded overflow-hidden shadow-lg mx-2 my-4 mt-4">
                            <div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
                                <div className="prod-img">
                                    <img src={product.source} alt={product.name} className="w-full object-cover object-center" />
                                </div>
                                <div className="prod-title mt-4">
                                    <p className="text-2xl uppercase text-gray-900 font-bold">{product.name}</p>
                                    <p className=" text-sm text-gray-400">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-center text-gray-900 mt-4">
                                    <p className="font-bold text-xl">
                                        Rp.{product.price.toLocaleString('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <button
                                        onClick={() => openDetailModal(product.item_id)}
                                        className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        onClick={() => openQuantityModal(product.item_id)}
                                        className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <strong className='mt-4'>MAAF NFT TIDAK TERSEDIA SAAT INI</strong>
                )}
            </div>

            {isDetailModalVisible && (
                <Modal
                    onClose={() => closeDetailModal()}
                    selectedProductId={selectedProductId}
                    productData={productData}
                />
            )}

            {isQuantityModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Add Quantity</h2>
                        <input
                            type="number"
                            min="1"
                            value={quantityToAdd}
                            onChange={handleQuantityChange}
                            className="border rounded px-2 py-1 mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => closeQuantityModal()}
                                className="px-4 py-2 bg-gray-300 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    addToCart(selectedProductId);
                                    closeQuantityModal();
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Card3;
