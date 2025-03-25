import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../Context.jsx';
import Cookies from 'js-cookie';

export default function FormAddInvoice({ formAddRef }) {
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

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const { isDataAdmin, isDataStaff } = useContext(Context);

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
const token = Cookies.get('admin') || Cookies.get('staff');

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
            setMessage("Có sản phẩm bị trùng. Vui lòng kiểm tra lại.");
            return;
        }
        const invoiceId = generateInvoiceId()
        const maql = isDataAdmin.maql || null
        const manv = isDataStaff.manv || null
        const formInvoice = {
            mapn: invoiceId,
            maql: maql,
            manv: manv,
            ngaylap: getCurrentDate(),
            tenpn: nameInvoice,
        };
        try {
            const response = await axios.post('http://localhost:5001/addInvoice', formInvoice, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
                        'Authorization': `Bearer ${token}`,
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

      // Tùy chỉnh giao diện react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#d1d5db',
      backgroundColor: '#f9fafb',
      padding: '0.5px',
      borderRadius: '0.2rem',
      '&:hover': {
        borderColor: '#f472b6',
      },
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f472b6' : state.isFocused ? '#fce7f3' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: '#fce7f3',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#374151',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
  };
    return (
        <div className="w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 overflow-y-auto flex items-center">
            <form
                ref={formAddRef}
                onSubmit={handleSubmit}
                className="mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16 max-w-7xl overflow-y-auto max-h-[80vh]"
            >
                <h2 className="uppercase font-bold mb-2 tracking-wider text-lg text-center">
                    Phiếu nhập kho
                </h2>
                {message && <p className={`${colorMsg} text-center text-sm mb-3`}>{message}</p>}

                {/* Input Tên phiếu nhập */}
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Tên phiếu nhập
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="tenpn"
                        className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 pl-2.5 py-2"
                        placeholder="Tên phiếu nhập"
                    />
                </div>

                {/* Danh sách sản phẩm */}
                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: `repeat(${invoice.length >= 3 ? '2' : '1'}, 1fr)`, // Luôn có 2 cột
                        gap: '1rem',
                    }}
                >
                    {chunkArray(invoice, 3).map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                            {group.map((inv, index) => (
                                <div key={groupIndex} className="space-y-4 max-h-[200px] ">
                                    <div className="flex justify-between items-center mb-2">
                                        <Select
                                            options={options}
                                            onChange={(selectedOption) =>
                                                handleInputChange(groupIndex * 3 + index, 'masp', selectedOption.value)
                                            }
                                            placeholder="Chọn sản phẩm"
                                            className="w-11/12 text-sm rounded-lg"
                                            styles={customStyles}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleSubProduct(groupIndex * 3 + index)}
                                            className="text-red-500 hover:text-red-400 transition duration-150 ease-in-out"
                                        >
                                            <MinusCircleIcon className="h-7 w-7" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label
                                                htmlFor={`soluong-${groupIndex}-${index}`}
                                                className="block mb-1 text-sm font-medium text-gray-900"
                                            >
                                                Số lượng
                                            </label>
                                            <input
                                                type="text"
                                                id={`soluong-${groupIndex}-${index}`}
                                                value={inv.soluong}
                                                onChange={(e) =>
                                                    handleInputChange(groupIndex * 3 + index, 'soluong', e.target.value)
                                                }
                                                className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 pl-2.5 py-2"
                                                placeholder="100"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor={`dongia-${groupIndex}-${index}`}
                                                className="block mb-1 text-sm font-medium text-gray-900"
                                            >
                                                Đơn giá
                                            </label>
                                            <input
                                                type="text"
                                                id={`dongia-${groupIndex}-${index}`}
                                                value={inv.dongia}
                                                onChange={(e) =>
                                                    handleInputChange(groupIndex * 3 + index, 'dongia', e.target.value)
                                                }
                                                className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 pl-2.5 py-2"
                                                placeholder="25000"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>


                {/* Nút thêm sản phẩm */}
                <div className="mt-4 flex justify-center">
                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className="text-pink-500 hover:text-pink-600 transition duration-150 ease-in-out"
                    >
                        <PlusCircleIcon className="h-8 w-8" />
                    </button>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 text-white bg-pink-500 hover:bg-pink-600 rounded shadow focus:outline-none focus:ring-4 focus:ring-pink-300"
                    >
                        Thêm
                    </button>
                </div>
            </form>
        </div>
    );

}
