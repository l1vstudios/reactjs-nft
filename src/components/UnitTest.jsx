import React, { useEffect, useState } from 'react';

export const UnitTest = () => {
    const [productData, setProductData] = useState([]);

    const fetchData = () => {
        return fetch("http://localhost:8000/products")
            .then((response) => response.json())
            .then((data) => setProductData(data['data']));
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <ul>
                {productData.map((product) => (
                    <li key={product.id}>
                        {product.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
