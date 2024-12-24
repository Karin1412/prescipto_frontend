import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Kiểm tra xem đã đăng nhập chưa khi component được render
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/api/users/login', formData, { withCredentials: true });

        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
        }

        navigate('/');
    } catch (err) {
        setMessage(err.response?.data?.message || 'Đăng nhập thất bại');
    }
};

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <img src="/Logo.svg" alt="logo" className="w-20 h-20 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-left text-[#4B5563]">Đăng nhập</h2>
                <p className="text-lg mb-5 text-left text-[#4B5563]">Vui lòng đăng nhập để đặt lịch</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#5F6FFF] text-white py-2 rounded-lg hover:bg-[#8692ff] transition"
                    >
                        Đăng nhập
                    </button>
                </form>

                <p className="text-base mt-6 text-left text-[#4B5563]">Bạn chưa có tài khoản? <a href="/register" className="text-[#5F6FFF] underline">Đăng ký</a></p>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Login;
