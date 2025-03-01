import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../../Context.jsx';
import Cookies from 'js-cookie';
import Select from 'react-select';

export default function FormAddPromo({ formRef }) {
    const { setLoadPromo } = useContext(Context);
    const currentDateTime = new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const [formData, setFormData] = useState({
        makm: '',
        tenkm: '',
        km: '',
        thoigianbatdaukm: currentDateTime,
        thoigianketthuckm: '',
        masp:''
    });
    
    const [product, setProduct] = useState([]);

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
    const handleInputChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            masp: value
        }));
    };
    const options = product.map((item) => ({
        value: item.masp,
        label: item.masp + ' > ' + item.tensp
    }));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getProduct`);
                if (response.status === 200) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get('admin') || Cookies.get('staff');
        const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));

    const startDate = new Date(new Date(formData.thoigianbatdaukm).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    const endDate = new Date(new Date(formData.thoigianketthuckm).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));

    const today = new Date(now.setHours(0, 0, 0, 0));
    const startDay = new Date(startDate.setHours(0, 0, 0, 0));
    const endDay = new Date(endDate.setHours(0, 0, 0, 0));

    if (startDay < today) {
        setColorMsg('text-red-600');
        setMessage('Thời gian bắt đầu khuyến mãi phải từ ngày hiện tại trở đi.');
        return;
    }

    if (endDay < today) {
        setColorMsg('text-red-600');
        setMessage('Thời gian kết thúc khuyến mãi không được nằm ở quá khứ.');
        return;
    }

    if (endDay <= startDay) {
        setColorMsg('text-red-600');
        setMessage('Thời gian kết thúc phải ít nhất 1 ngày sau thời gian bắt đầu.');
        return;
    }

    if (endDay.getTime() === startDay.getTime() && endDate <= startDate) {
        setColorMsg('text-red-600');
        setMessage('Giờ kết thúc phải lớn hơn giờ bắt đầu.');
        return;
    }
        try {
            const response = await axios.post(`http://localhost:5001/addPromo`, formData, {
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
                setFormData({makm: '',
                    tenkm: '', km:'', thoigianbatdaukm: '', thoigianketthuckm: '', masp:''});
                setLoadPromo(true);
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
                    <h2 className='mb-3 uppercase font-bold tracking-wider text-lg text-center'>Thêm khuyến mãi</h2>
                    {message && <p className={`${colorMsg} text-center mb-2 text-sm`}>{message}</p>}

                    <div className="mb-3">
                        <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã khuyến mãi</label>
                        <input type="text" id="code" name='makm'
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder='KM-001'
                            value={formData.makm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu đề khuyến mãi</label>
                        <input type="text" id="name" name='tenkm'
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder='Giảm giá 10%'
                            value={formData.tenkm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Khuyến mãi (%)</label>
                        <input type="text" id="name" name='km'
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder='10'
                            value={formData.km}
                            onChange={handleChange}
                        />
                    </div>
                    <Select
            options={options}
            onChange={(selectedOption) =>
                handleInputChange(selectedOption.value)
            }
            placeholder="Chọn sản phẩm"
            className="w-full text-sm rounded-lg"
        />

<div className="mb-3 mt-3">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian bắt đầu</label>
    <input type="datetime-local" id="name" name='thoigianbatdaukm'
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        placeholder='10/02/2025'
        value={formData.thoigianbatdaukm || currentDateTime}
        onChange={handleChange}
    />
</div>
<div className="mb-3">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian kết thúc</label>
    <input type="datetime-local" id="name" name='thoigianketthuckm'
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        placeholder='15/02/2025'
        value={formData.thoigianketthuckm}
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