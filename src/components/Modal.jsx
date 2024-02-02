// Modal.jsx
import React, { useEffect, useState } from 'react';

const Modal = ({ onClose, selectedProductId, productData }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const selectedProduct = productData.find((product) => product.item_id === selectedProductId);

        if (selectedProduct) {
            setProduct(selectedProduct);
        } else {
            console.error('Product not found for ID:', selectedProductId);
        }
    }, [selectedProductId, productData]);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center modal-overlay bg-black bg-opacity-50">
            <div className="modal-content bg-white p-8 rounded-lg">
                {product && (
                    <>
                        <img
                            src={product.source}
                            alt={product.name}
                            className="max-w-full max-h-80 object-contain mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-4">desc :</h2>
                        <p className='text-1xl font-light mb-4'>{product.description}</p>
                    </>
                )}
                <button
                    onClick={onClose}
                    className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
