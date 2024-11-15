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
        phone: '',
        password: '',
    });
    // console.log(formData);
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

        <section className="grid text-center h-screen items-center p-8">
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-2 uppercase">
                    Đăng nhập
                </Typography>
                <Typography className="mb-12 text-gray-600 font-normal text-[18px]">
                    Đăng nhập vào tài khoản quản lý
                </Typography>
                {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

                <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
                    <div className="mb-6">
                        <label htmlFor="email">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Email
                            </Typography>
                        </label>
                        <Input
                            id="email"
                            color="gray"
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="name@mail.com"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phone">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Số điện thoại
                            </Typography>
                        </label>
                        <Input
                            id="phone"
                            color="gray"
                            size="lg"
                            type="text"
                            name="phone"
                            placeholder="098722235"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="password">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Mật khẩu
                            </Typography>
                        </label>
                        <Input
                            size="lg"
                            placeholder="********"
                            labelProps={{
                                className: "hidden",
                            }}
                            name='password'
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            value={formData.password}
                            onChange={handleChange}
                            type={passwordShown ? "text" : "password"}
                            icon={
                                <i className="absolute top-1/2 right-0" onClick={togglePasswordVisiblity}>
                                    {passwordShown ? (
                                        <EyeIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    )}
                                </i>
                            }
                        />
                    </div>
                    <Button type='submit' color="gray" size="lg" className="mt-6 bg-gray-900 py-3.5 hover:bg-gray-800" fullWidth>
                        Đăng nhập
                    </Button>


                </form>
            </div>
        </section>
        </>
    );
}
