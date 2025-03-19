import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export default function LoginAdmin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        // phone: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [colorMsg, setColorMsg] = useState('');

    const handleChange = (e) => {
        setMessage('');
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5001/loginAdmin`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setColorMsg('text-green-500');
                setMessage(response.data.message);
                handleSuccess();
                setTimeout(() => { navigate('/admin'); }, 2000);
            }
            if (response.status === 400) {
                setColorMsg('text-red-500');
                setMessage(response.data.message);
            }
        } catch (error) {
            setColorMsg('text-red-500');
            setMessage(error.response ? error.response.data.message : 'An error occurred');
            handleError();
        }
    };

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    const handleSuccess = () => {
        toast.success("Đăng nhập thành công!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const handleError = () => {
        toast.error("Có lỗi xảy ra!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
        <ToastContainer />

        <section className="min-h-screen flex items-center justify-center bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
            <Typography 
                variant="h3" 
                color="blue-gray" 
                className="mb-2 uppercase tracking-wide font-bold"
            >
                Đăng nhập
            </Typography>
            <Typography 
                className="text-gray-600 font-normal text-lg opacity-80"
            >
                Đăng nhập vào tài khoản quản lý
            </Typography>
            {message && (
                <p className={`${colorMsg} text-center text-sm mt-2 bg-opacity-10 p-2 rounded`}>
                    {message}
                </p>
            )}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-6">
                <div>
                    <label htmlFor="email">
                        <Typography
                            variant="small"
                            className="mb-2 block font-medium text-gray-700"
                        >
                            Email
                        </Typography>
                    </label>
                    <Input
                        id="email"
                        color="pink"
                        size="lg"
                        type="email"
                        name="email"
                        placeholder="name@mail.com"
                        className="w-full border bg-gray-50 border-pink-300 rounded-lg transition-all duration-200"
                        labelProps={{ className: "hidden" }}
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password">
                        <Typography
                            variant="small"
                            className="mb-2 block font-medium text-gray-700"
                        >
                            Mật khẩu
                        </Typography>
                    </label>
                    <Input
                        size="lg"
                        placeholder="********"
                        labelProps={{ className: "hidden" }}
                        name="password"
                        className="w-full bg-gray-50 border border-pink-300 rounded-lg transition-all duration-200 pr-8"
                        value={formData.password}
                        onChange={handleChange}
                        type={passwordShown ? "text" : "password"}
                        icon={
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-1 top-5"
                                onClick={togglePasswordVisiblity}
                            >
                                {passwordShown ? (
                                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        }
                    />
                </div>
            </div>

            <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-400 hover:to-pink-400 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
                Đăng nhập
            </Button>
        </form>

        {/* Optional: Thêm link quên mật khẩu */}
        <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Quên mật khẩu?
            </a>
        </div>
    </div>
</section>
        </>
    );
}
