import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../Context.jsx';
import Cookies from 'js-cookie';

export default function FormAddInvoice({formAddRef}) {
  const { setLoadDataInvoice } = useContext(Context);

    const [product, setProduct] = useState([]);
    const options = product.map((item) => ({
        value: item.masp,
        label: item.tensp,
    }));
    const [message, setMessage] = useState('');
    const [colorMsg, setColorMsg] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getProduct`);
                if (response.status === 200) {
                    setProduct(response.data.product);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);


    const generateInvoiceId = () => `${Date.now()}${Math.floor(Math.random() * 10)}`;
    const getCurrentDate = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    };
    const [invoice, setInvoice] = useState([{ masp: '', soluong: '', dongia: '' }]);



    const { isDataAdmin } = useContext(Context);

    // Hàm xử lý thêm sản phẩm mới
    const handleAddProduct = () => {
        setInvoice([...invoice, { masp: '', soluong: '', dongia: '' }]);
    };
    const handleSubProduct = (index) => {
        const updatedInvoice = invoice.filter((_, i) => i !== index);
        setInvoice(updatedInvoice.length > 0 ? updatedInvoice : [{ masp: '', soluong: '', dongia: '' }]);
    };
    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (index, field, value) => {
        const updatedInvoice = [...invoice];
        updatedInvoice[index][field] = value;
        setInvoice(updatedInvoice);
    };

    // Hàm xử lý submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameInvoice = e.target.tenpn.value;
        if (!nameInvoice.trim()) {
            setColorMsg('text-red-600');
            setMessage("Tên phiếu nhập không được để trống.");
            return;
        }
        if (invoice.some(inv => !inv.masp || !inv.soluong || !inv.dongia)) {
            setColorMsg('text-red-600');
            setMessage("Vui lòng nhập đầy đủ thông tin cho tất cả các sản phẩm.");
            return;
        }
        const maspList = invoice.map(inv => inv.masp);
        const duplicateMasp = maspList.filter((item, index) => maspList.indexOf(item) !== index);
        if (duplicateMasp.length > 0) {
            setColorMsg('text-red-600');
            setMessage("Có mã sản phẩm bị trùng. Vui lòng kiểm tra lại.");
            return;
        }
        const invoiceId = generateInvoiceId()
        const formInvoice = {
            mapn: invoiceId,
            maql: isDataAdmin.maql,
            ngaylap: getCurrentDate(),
            tenpn: nameInvoice,
        };

        try {
            const response = await axios.post('http://localhost:5001/addInvoice', formInvoice, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('admin')}`,
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            if (response.status === 200) {
                const invoiceDetail = invoice.map((invoce_product) => ({
                    mapn: invoiceId,
                    masp: invoce_product.masp,
                    soluong: invoce_product.soluong,
                    dongia: invoce_product.dongia,
                }));

                const detailResponse = await axios.post('http://localhost:5001/addInvoiceDetail', invoiceDetail, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('admin')}`,
                        'Accept': 'application/json',
                    },
                    withCredentials: true,
                });
                if (detailResponse.status === 200) {
                    setColorMsg('text-green-600');
                    setMessage(response.data.message);
                    setInvoice([{ masp: '', soluong: '', dongia: '' }]);
                    e.target.tenpn.value = '';
                    handleSuccess();
              setLoadDataInvoice(true);

                    setTimeout(() => {
                        setMessage('');
                    }, 1500);
                }
            }
            else {
                setColorMsg('text-red-600');
                setMessage(response.data.message);
                handleError();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
                handleError();
                setColorMsg('text-red-600');
            } else {
                setColorMsg('text-red-600');
                setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
                handleError();

            }
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
        <div className="w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center">
            <form ref={formAddRef}
                onSubmit={handleSubmit}
                className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16"
            >
                <h2 className="uppercase font-bold mb-2 tracking-wider text-lg text-center">
                    Phiếu nhập kho
                </h2>
                {message && <p className={`${colorMsg} text-center text-sm mb-3`}>{message}</p>}

                {/* Input Tên phiếu nhập */}
                <div className="mb-3 flex">
                    <div className="w-full">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Tên phiếu nhập
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="tenpn"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="Tên phiếu nhập"
                        />
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                {invoice.map((inv, index) => (
                    <div key={index} className="mt-4">
                        <div className="w-full relative mb-3">
                            <div className='flex justify-between'>
                                <Select
                                    options={options}
                                    onChange={(selectedOption) => handleInputChange(index, 'masp', selectedOption.value)}
                                    placeholder="Chọn sản phẩm" className='w-11/12 text-sm rounded-lg '
                                />
                                {/* Nút xóa sản phẩm */}
                                <button
                                    type="button"
                                    onClick={() => handleSubProduct(index)}
                                    className="flex items-center"
                                >
                                    <MinusCircleIcon className="h-7 w-7 text-gray-700 hover:text-gray-500 transition ease-in-out duration-200" />
                                </button>
                            </div>
                        </div>
                        <div className="mb-3 flex">
                            <div className="w-1/2">
                                <label
                                    htmlFor={`soluong-${index}`}
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Số lượng
                                </label>
                                <input
                                    type="text"
                                    id={`soluong-${index}`}
                                    value={inv.soluong}
                                    onChange={(e) => handleInputChange(index, 'soluong', e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2"
                                    placeholder="100"
                                />
                            </div>
                            <div className="w-1/2 ml-1">
                                <label
                                    htmlFor={`dongia-${index}`}
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Đơn giá
                                </label>
                                <input
                                    type="text"
                                    id={`dongia-${index}`}
                                    value={inv.dongia}
                                    onChange={(e) => handleInputChange(index, 'dongia', e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2"
                                    placeholder="25000"
                                />
                            </div>
                        </div>

                    </div>
                ))}

                {/* Nút thêm sản phẩm */}
                <button
                    type="button"
                    onClick={handleAddProduct}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                >
                    <PlusCircleIcon className="h-8 w-8 text-gray-700 hover:text-gray-500 transition ease-in-out duration-200" />
                </button>

                <div className="flex items-center justify-center w-full">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2"
                    >
                        Thêm
                    </button>
                </div>
            </form>
        </div>
    );
}
