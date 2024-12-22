import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', formData);
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <img src="/Logo.svg" alt="logo" className="w-20 h-20 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-centertext-[#4B5563]">Tạo tài khoản</h2>
                <p className="text-lg mb-5 text-left text-[#4B5563]">Vui lòng đăng ký để đặt lịch</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
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
                        Tạo tài khoản
                    </button>
                </form>

                <p className="text-base mt-4 text-left text-[#4B5563]">Đã có tài khoản? <a href="/login" className="text-[#5F6FFF] underline">Đăng nhập</a></p>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Register;
