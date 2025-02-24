import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Input, Button } from "@material-tailwind/react";

export default function LoginStaff() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        manv: '',
        
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
            const response = await axios.post(`http://localhost:5001/loginStaff`, formData, {
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
                setTimeout(() => { navigate('/staff'); }, 2000);
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
                    Đăng nhập vào tài khoản nhân viên
                </Typography>
                {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

                <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
                    <div className="mb-6">
                        <label htmlFor="manv">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Mã nhân viên
                            </Typography>
                        </label>
                        <Input
                            id="manv"
                            color="gray"
                            size="lg"
                            type="manv"
                            name="manv"
                            placeholder="NVKS3411"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                            value={formData.manv}
                            onChange={handleChange}
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
