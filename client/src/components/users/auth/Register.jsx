import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import {Button } from "@material-tailwind/react";

export default function Register() {

    const [customerID, setCustomerID] = useState('');

    // Hàm tạo mã ngẫu nhiên với cả chữ cái và số
    const generateCustomerID = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = 'KH';
        for (let i = 0; i < 8; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCustomerID(id);
    };
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        password: '',
        repassword: '',
    });
    // console.log(formData);
    const [message, setMessage] = useState('');
    const [colorMsg, setColorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepassword, setShowRepassword] = useState(false);
    const handleChange = (e) => {
        setMessage('');
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5001/register/${customerID}`, formData, {
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
                setTimeout(() => { navigate('/login'); }, 2000);
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

    const [changeRegister, setChangeRegister] = useState(false);
    const onClickChangeRegister = () => {
        setMessage('');
        setChangeRegister(!changeRegister);
        setFormData({
            fullname: '',
            email: '',
            phone: '',
            password: '',
            repassword: '',
        });
    }

    const handleSuccess = () => {
        toast.success("Đăng kí thành công!", {
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
        toast.error("Lỗi đăng kí tài khoản!", {
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
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-6 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="w-full">
                        <img src="https://png.pngtree.com/png-vector/20220812/ourmid/pngtree-butterfly-logo-template-infinity-template-logotype-vector-png-image_38578402.png" alt="LOGO" className="h-16 w-auto mx-auto" />
                    </div>
                    <ToastContainer />
                    <div className="mt-2 flex flex-col items-center">
                        <h1 className="text-3xl xl:text-4xl font-bold uppercase tracking-wider">Đăng kí</h1>
                        <div className="w-full flex-1 mt-4">
                            <div className="flex flex-col items-center">
                                <button onClick={onClickChangeRegister} type="button" className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                {!changeRegister ?
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"
                                            />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"
                                            />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"
                                            />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"
                                            />
                                        </svg>
                                    </div>
                                    : ""}
                                    {!changeRegister ? <span className="ml-4">Đăng kí với Email</span> : <span className="my-1">Đăng kí với Số điện thoại</span>}
                                </button>
                            </div>

                            <div className="my-2 border-b text-center">
                                {!changeRegister ? <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Hoặc đăng kí với số điện thoại
                                </div> : <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Hoặc đăng kí với email
                                </div>}
                            </div>
                            {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}
                            <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                                <input
                                    className="transition ease-in-out duration-300 w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text"
                                    placeholder="Họ và tên"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                />
                                {!changeRegister ? <input
                                    className="mt-5 transition ease-in-out duration-300 w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                /> : <input
                                    className="mt-5 transition ease-in-out duration-300 w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />}
                                <div className="relative">
                                    <input
                                        className="transition ease-in-out duration-300 w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mật khẩu"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowPassword(!showPassword);
                                        }}
                                        className="absolute right-3 top-1/2 text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        className="transition ease-in-out duration-300 w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type={showRepassword ? "text" : "password"}
                                        placeholder="Nhập lại mật khẩu"
                                        name="repassword"
                                        value={formData.repassword}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowRepassword(!showRepassword);
                                        }}
                                        className="absolute right-3 top-1/2 text-gray-500 focus:outline-none"
                                    >
                                        {showRepassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>

                                </div>
                                <Button type="submit" onClick={generateCustomerID} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">Đăng kí</span>
                                </Button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    Đồng ý một số điều khoản của cửa hàng{" "}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>{" "}
                                    và {" "}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>
                            </form>
                        </div>
                        <p className="mt-4 text-xs text-gray-600 text-center">Bạn đã có tài khoản</p>
                        <Link className="text-sm text-indigo-600 border-b border-indigo-300" to="/login">Login</Link>

                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    {/* m-12 xl:m-16  */}
                    <div
                        className="w-full bg-cover bg-center bg-no-repeat rounded-r-lg"
                        style={{
                            backgroundImage:
                                "url('https://cdn.pixabay.com/photo/2018/04/09/17/43/site-3304815_1280.jpg')",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}