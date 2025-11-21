import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react';
import { Context } from '../../../Context.jsx';
import Cookies from 'js-cookie';

export default function FormAddBranch({ formRef }) {
    const { setLoadBranch, isDataAdmin } = useContext(Context); 

    const currentDate = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        id: '',
        tencuahang: '',
        diachi: '',
        kinhdo: '',
        vido: '',
        giohoatdong: '',
        created_at: currentDate, 
        maql: isDataAdmin.maql
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('admin') || Cookies.get('staff');
        try {
            const response = await axios.post(`http://localhost:5001/addBranch`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                withCredentials: true
            });
            if (response.status === 200) {
                setColorMsg('text-green-600');
                setMessage(response.data.message);
                handleSuccess();
                setFormData({
                    id: '',
                    tencuahang: '',
                    diachi: '',
                    kinhdo: '',
                    vido: '',
                    giohoatdong: '',
                    created_at: currentDate,
                });
                setLoadBranch(true); 
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
                    <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Thêm cửa hàng</h2>
                    {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

                    <div className="mb-3">
                        <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã cửa hàng</label>
                        <input type="text" id="id" name="id"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="CH001"
                            value={formData.id}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tencuahang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên cửa hàng</label>
                        <input type="text" id="tencuahang" name="tencuahang"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Chi nhánh Hà Nội"
                            value={formData.tencuahang}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="diachi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                        <input type="text" id="diachi" name="diachi"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="123 Đường Láng, Hà Nội"
                            value={formData.diachi}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="kinhdo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kinh độ</label>
                        <input type="text" id="kinhdo" name="kinhdo"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="105.8412"
                            value={formData.kinhdo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="vido" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vĩ độ</label>
                        <input type="text" id="vido" name="vido"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="21.0285"
                            value={formData.vido}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="giohoatdong" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giờ hoạt động</label>
                        <input type="text" id="giohoatdong" name="giohoatdong"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="08:00 - 22:00"
                            value={formData.giohoatdong}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="created_at" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày tạo</label>
                        <input type="date" id="created_at" name="created_at"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:shadow-sm-light"
                            value={formData.created_at}
                            readOnly 
                        />
                    </div>

                    <div className='flex items-center justify-center w-full'>
                        <button type="submit" className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 transition duration-150 ease-in-out">Thêm</button>
                    </div>
                </form>
            </div>
        </>
    );
}