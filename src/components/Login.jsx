import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
const Login = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [alert, setAlert] = useState(null);
    const [token, setToken] = useState(''); // Tambahkan state untuk menyimpan token
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!captchaValue) {
            setAlert({
                type: 'error',
                message: 'Please solve the captcha puzzle.',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({
                    type: 'success',
                    message: 'Login successful',
                });

                // Log the token to the console
                console.log('Login Token:', data.token);

                setTimeout(() => {
                    // Save user information including the token to localStorage
                    localStorage.setItem('user_info', JSON.stringify({
                        id: data.user.id,
                        name: data.user.name,
                        username: data.user.username,
                        token: data.token, // Include the token here
                    }));

                    // Redirect to /products after 3 seconds
                    history.push('/products', { token: data.token });
                }, 3000);
            } else {
                setAlert({
                    type: 'error',
                    message: `Login failed: ${data.error}`,
                });
            }
        } catch (error) {
            setAlert({
                type: 'error',
                message: `Error during login: ${error.message}`,
            });
        }
    };
    return (
        <div>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg?w=740&t=st=1704889873~exp=1704890473~hmac=2a6665d2febb0499b01d3d743ecf23da14fb039645b915b663c5aa4d0f0a947d" alt="Placeholder Image" className="object-cover w-full h-full" />
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    {alert && (
                        <div className={`bg-${alert.type}-200 border-${alert.type}-500 mb-4 p-4 border rounded-md`}>
                            {alert.message} <br />
                            Please Wait.....
                        </div>
                    )}


                    <h1 className="text-2xl font-semibold mb-4"> Login NFT Market's</h1>
                    <p className='text font-semibold mb-4'>Bring Your Bag And Choose Your NFT'S</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600">Username</label>
                            <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                            <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
                        </div>

                        {/* Add ReCAPTCHA component */}
                        <div className="mb-4">
                            <ReCAPTCHA
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"  // Test site key for localhost
                                onChange={handleCaptchaChange}
                            />
                        </div>

                        <button type="submit" className="bg-red-400 hover:bg-red-500 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    </form>
                    <div className="mt-6 text-blue-500 text-center">
                        <Link to="/regis" className="hover:underline">Sign up Here</Link>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Login;
