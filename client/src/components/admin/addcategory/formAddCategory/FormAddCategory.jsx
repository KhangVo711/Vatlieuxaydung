import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react';
import { Context } from '../../../Context.jsx';

export default function FormAddCategory({ formRef }) {
    const { setLoadCategory } = useContext(Context);

    const [formData, setFormData] = useState({
        maloai: '',
        tenloai: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5001/addCategory`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setColorMsg('text-green-600');
                setMessage(response.data.message);
                handleSuccess();
                setFormData({maloai: '',
                    tenloai: '',})
                setLoadCategory(true);
                setTimeout(() => {
                    setMessage('');
                }, 1500);
            }
            if (response.status === 400) {
                setColorMsg('text-red-600');
                setMessage(response.data.message);
            }
        } catch (error) {
            setColorMsg('text-red-600');
            setMessage(error.response ? error.response.data.message : 'An error occurred');
            handleError();
        }
    };
    const handleSuccess = () => {
        toast.success("Thêm thành công!", {
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
            <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>

                <form ref={formRef} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16" onSubmit={handleSubmit}>
                    <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Thêm loại</h2>
                    {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

                    <div className="mb-3">
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã loại</label>
                        <input type="text" id="code" name='maloai'
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder='LS-001'
                            value={formData.maloai}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên loại</label>
                        <input type="text" id="name" name='tenloai'
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder='Nhựa'
                            value={formData.tenloai}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex items-center justify-center w-full'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thêm</button>
                    </div>
                </form>
            </div>
        </>
    )
}