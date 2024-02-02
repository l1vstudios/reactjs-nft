import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Regis = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (alert?.type === 'success') {
            const timer = setTimeout(() => {
                history.push('/login');
            }, 3000); // Redirect after 3 seconds, you can adjust the delay
            return () => clearTimeout(timer);
        }
    }, [alert, history]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({ type: 'success', message: 'Registration successful!' });
                setFormData({ name: '', email: '', username: '', password: '' }); // Clear the form
                console.log('Registration successful:', data);
            } else {
                setAlert({ type: 'error', message: 'Registration failed. Please check your information.' });
                console.error('Registration failed:', data);
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Error during registration. Please try again later.' });
            console.error('Error during registration:', error);
        }
    };

    return (
        <div>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149629585.jpg?w=740&t=st=1704889888~exp=1704890488~hmac=b0039bff2c875e8a8de2f37d5ae69e9c9343e8b6d90381399f45c154b9a99017" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4"> Create Account NFT Market's</h1>
                    <p className='text font-semibold mb-4'>Bring Your Bag And Choose Your NFT'S</p>

                    {alert && (
                        <div className={`alert-${alert.type} mb-4 p-4 border rounded-md ${alert.type === 'success' ? 'bg-green-200 border-green-500' : 'bg-red-200 border-red-500'}`}>
                            {alert.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600">Your Name</label>
                            <input type="text" id="username" name="name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600">Username</label>
                            <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">Your Email</label>
                            <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
                        </div>

                        <button type="submit" className="bg-red-400 hover:bg-red-500 text-white font-semibold rounded-md py-2 px-4 w-full">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Regis;
