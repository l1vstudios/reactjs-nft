import React, { useEffect, useState } from 'react';

const CardComponent = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-wrap justify-center mt-4">
            {loading ? (
                <p>Loading...</p>
            ) : productData.length > 0 ? (
                productData.map((product) => (
                    <div key={product.id} className="max-w-sm rounded overflow-hidden shadow-lg mx-2 my-4 mt-4">
                        <img
                            className="w-full"
                            src={product.source}
                            alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-4">
                            <ul>
                                <li>
                                    <strong>Nama Produk:</strong> {product.name}
                                </li>
                                <li>
                                    <strong>Harga Rp.:</strong> {product.price}
                                </li>
                                <li>
                                    <strong>Deskripsi:</strong> {product.description}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <strong className='mt-4'>MAAF NFT TIDAK TERSEDIA SAAT INI</strong>
            )}
        </div>
    );
};

export default CardComponent;
