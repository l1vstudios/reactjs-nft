import React, { useState, useEffect } from 'react';

const SaleComponent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set isVisible to true when the component mounts
        setIsVisible(true);

        // Clean up the effect by setting isVisible to false when the component is unmounted
        return () => setIsVisible(false);
    }, []);

    // Render the component only if isVisible is true
    return isVisible && (
        <div className='max-w-sm rounded overflow-hidden shadow-lg mx-auto '>

            <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-2xl bg-gray-400"></div>

            <div className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2 rotate-6 space-y-6 rounded-2xl bg-gray-100 p-6 transition duration-300 hover:rotate-0">
                <div className="flex justify-end">
                    <div className="h-4 w-4 rounded-full bg-gray-900"></div>
                </div>

                <header className="text-center text-xl font-extrabold text-gray-600">2024</header>

                <div>
                    <p className="text-center text-5xl font-extrabold text-gray-900">NFT Gratis</p>
                    <p className="text-center text-4xl font-extrabold text-[#FE5401]">2 Jam Lagi</p>
                </div>

                <footer className="mb-10 flex justify-center">
                    <button className="flex items-baseline gap-2 rounded-lg bg-[#FE5401] px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]">
                        <span>Mau</span>
                        <i className="fas fa-hand-peace text-xl"></i>
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SaleComponent;
