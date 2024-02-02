import React, { useState, useEffect } from 'react';
import SliderComponent from './SliderComponent';
import CardComponent from './CardComponent';
import SaleComponent from './SaleComponent';
import Card2 from './Card2';

const Home = () => {
    const [showPromoModal, setShowPromoModal] = useState(true);

    useEffect(() => {
        // Set a timeout to hide the modal after 4 seconds
        const timeoutId = setTimeout(() => {
            setShowPromoModal(false);
        }, 4000);

        // Clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className="">
            <SliderComponent />




            {/* Conditionally render CardComponent or SaleComponent based on showPromoModal */}
            {showPromoModal && <SaleComponent />}
        </div>
    );
};

export default Home;
