import { useContext, useEffect, useState } from 'react';
import CartItem from './cartItem/CartItem';
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Context } from '../../Context';
import { formatCurrency } from '../../../utils/currency';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import DeliveryMap from './deliveryMap/DeliveryMap';


export default function Cart() {
    const navigate = useNavigate()

    const handleChange = (e) => {
        setMessage('');
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const { isData, loadDelivery, setLoadDelivery } = useContext(Context);

    const generateOrderId = () => `OD${Date.now()}${Math.floor(Math.random() * 10)}`;
    const generateFormId = () => `FO${Date.now()}${Math.floor(Math.random() * 10)}`;
    const getCurrentDate = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    };

    const [delivery, setDelivery] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/getDelivery`);
                if (response.status === 200) {
                    setDelivery(response.data.delivery);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setLoadDelivery(false);

    }, [loadDelivery]);
    useEffect(() => {
        if (delivery.length > 0 && !selectedDelivery) {
            handleDeliveryChange(delivery[0]);
        }
    }, [delivery]);
    const handleDeliveryChange = (option) => {
        setSelectedDelivery(option);
    };
    const [formData, setFormData] = useState({
        maform: generateFormId(),
        fullname: '',
        email: '',
        phone: '',
        address: '',
    });

    const { cartItems, setCartItems } = useContext(Context);
    const listCX = cartItems.map((cartItem) => (
        <CartItem key={cartItem.masp} cartItem={cartItem} />
    ));
    const total = cartItems.reduce((acc, item) => {
        const price = item.km ? item.gia * (1 - item.km / 100) : item.gia;
        return acc + price * item.soluong;
      }, 0);

    const [ship, setShip] = useState([]);
    const [distance, setDistance] = useState(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    if (isSuccess === true) {
        setTimeout(() => {
            setIsSuccess(false);
            setCartItems([]);
            if (isData && isData.id) {
                navigate('/ordered')
            }
            else {
                navigate('/products')
            }
        }, 3500);
    }
    useEffect(() => {
        axios.get('http://localhost:5001/getShip')
            .then((response) => {
                setShip(response.data.ship);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true); // Bắt đầu xử lý đơn hàng

        const orderId = generateOrderId(); // Tạo mã đơn hàng duy nhất
        const totalAmount = total + feeShip
        const makhachhang = isData?.id ?? null;
        const maformid = (makhachhang === null)
            ? formData.maform
            : null;
        const orderData = {
            madh: orderId,
            makh: makhachhang,
            ngaydat: getCurrentDate(),
            trangthai: "Chờ xác nhận",
            tonggia: totalAmount,
            madvvc: selectedDelivery.madvvc,
            maform: maformid,
            quangduong: distance
        };
 
        try {
            if (!isData?.id) {
                if(formData.fullname === '' || formData.email === '' || formData.phone === '' || formData.address === '') {
                    setIsProcessing(false);
                    setMessage('Vui lòng nhập đầy đủ thông tin');
                    return;
                }


                const formODResponse = await axios.post('http://localhost:5001/insertFormOD', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    withCredentials: true
                });
                if (formODResponse.status === 200) {
                    const cartResponse = await axios.post('http://localhost:5001/createCart', orderData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        withCredentials: true
                    });

                    if (cartResponse.status === 200) {
                        const orderDetails = cartItems.map(item => ({
                            madh: orderId,
                            masp: item.masp,
                            dongia: item.km ? item.gia * (1 - item.km/100) : item.gia,
                            km: item.km ? item.km : '0',
                            soluongsanpham: item.soluong
                        }));

                        const detailResponse = await axios.post('http://localhost:5001/createCartDetail', orderDetails, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            withCredentials: true
                        });

                        if (detailResponse.status === 200) {
                            // setMessage(detailResponse.data.message);

                            // Giữ trạng thái đang xử lý trong 3 giây, sau đó chuyển thành công
                            setTimeout(() => {
                                setIsProcessing(false); // Dừng xử lý đơn hàng
                                setIsSuccess(true); // Đặt hàng thành công

                            }, 3000);
                        } else {
                            setIsProcessing(false); // Dừng xử lý nếu lỗi
                        }
                    } else {
                        setIsProcessing(false); // Dừng xử lý nếu lỗi
                    }
                } 
            }
            else {
                const cartResponse = await axios.post('http://localhost:5001/createCart', orderData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    withCredentials: true
                });

                if (cartResponse.status === 200) {
                    const orderDetails = cartItems.map(item => ({
                        madh: orderId,
                        masp: item.masp,
                        dongia: item.km ? item.gia * (1 - item.km/100) : item.gia,
                        km: item.km ? item.km : 0,
                        soluongsanpham: item.soluong
                    }));

                    const detailResponse = await axios.post('http://localhost:5001/createCartDetail', orderDetails, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        withCredentials: true
                    });

                    if (detailResponse.status === 200) {
                        // setMessage(detailResponse.data.message);

                        // Giữ trạng thái đang xử lý trong 3 giây, sau đó chuyển thành công
                        setTimeout(() => {
                            setIsProcessing(false); // Dừng xử lý đơn hàng
                            setIsSuccess(true); // Đặt hàng thành công

                        }, 3000);
                    } else {
                        setIsProcessing(false); // Dừng xử lý nếu lỗi
                    }
                } else {
                    setIsProcessing(false); // Dừng xử lý nếu lỗi
                }
            }



        } catch (error) {
            console.error("There was an error submitting the form!", error);
            setIsProcessing(false); // Dừng xử lý nếu lỗi
        }
    };
    useEffect(() => {
        if (isProcessing || isSuccess) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isProcessing, isSuccess]);

    const [feeShip, setFeeShip] = useState(0);

    return (
        <>
            {cartItems && cartItems.length > 0 ? (
                <div className="max-w-5xl mx-auto mt-10 bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h1 className="text-xl font-bold">Giỏ Hàng</h1>
                    </div>
                    <div className="p-4 border-b bg-gray-100">
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                            <p className="col-span-4 sm:col-span-3 pl-5 text-center">Sản phẩm</p>
                            <p className="hidden sm:block col-span-1 text-center">Đơn giá</p>
                            <p className="hidden sm:block col-span-2 text-center">Khuyến mãi</p>
                            <p className="hidden sm:block col-span-3 text-center">Số lượng</p>
                            <p className="hidden sm:block col-span-1 text-center">Thành tiền</p>
                            <p className="hidden sm:block col-span-2 text-center">Thao tác</p>
                        </div>
                    </div>
                    {listCX}
                    {cartItems.length > 0 && !isData?.id ? (
                        <div className='w-full flex flex-col items-center justify-center'>
                            <h2 className="text-xl font-semibold mb-2 uppercase mt-5">Thông tin đặt hàng</h2>
                            {message && <p className="text-red-500 text-sm">{message}</p>}
                            <div className='w-full flex justify-center items-center'>
                                <div className='w-1/3 flex flex-col justify-center'>
                                    <label htmlFor='fullname_inf' className="block text-sm mb-1 font-medium text-gray-700">Họ và tên</label>
                                    <input
                                        type="text"
                                        id="fullname_inf"
                                        name='fullname'
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        placeholder='Họ và tên'
                                        value={formData.fullname}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <div className='w-1/3 flex flex-col justify-center'>
                                    <label htmlFor='email_inf' className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="text"
                                        id='email_inf'
                                        name='email'
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        placeholder='Email'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />


                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <div className='w-1/3 flex flex-col justify-center'>
                                    <label htmlFor='phone_inf' className="block text-sm mb-1 font-medium text-gray-700">Số điện thoại</label>
                                    <input
                                        type="text"
                                        id='phone_inf'
                                        name='phone'
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        placeholder='Số điện thoại'
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />

                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center mb-10'>
                                <div className='w-1/3 flex flex-col justify-center'>
                                    <label htmlFor='address_inf' className={`block text-sm mb-1 font-medium text-gray-700`}>Địa chỉ</label>
                                    <input
                                        type="text"
                                        id='address_inf'
                                        name='address'
                                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        placeholder='Địa chỉ'
                                        value={formData.address}
                                        onChange={handleChange}
                                    />


                                </div>
                            </div>
                        </div>
                    ) :
                        null
                    }

                
                    <div className="p-4 bg-gray-50 border-t">
                        <p className="text-sm text-gray-800 font-medium">Chọn đơn vị vận chuyển:</p>
                        <div className='w-full flex justify-center items-center'>
                        <RadioGroup
                            value={selectedDelivery?.madvvc }
                            onValueChange={(value) => {
                                const ship = delivery.find((d) => d.madvvc === value);
                                handleDeliveryChange(ship);
                            }}
                            className="space-y-3 w-1/2 "
                        >
                            {delivery.map((ship) => (
                                <div
                                    key={ship.madvvc}
                                    className={`flex items-center gap-3 px-3 rounded-2xl border ${selectedDelivery?.madvvc === ship.madvvc ? 'border-pink-500 bg-pink-50' : 'border-gray-300'}`}
                                >
                                    <RadioGroupItem value={ship.madvvc} id={ship.madvvc} className="h-0.5 w-0.5" />
                                    <label htmlFor={ship.madvvc} className="text-sm w-full h-full flex justify-between py-3 text-gray-800 cursor-pointer">
                                        <span className="font-semibold">{ship.tendvvc}</span> - <span className="font-semibold">{ship.songayvanchuyen}</span> - <span className="font-semibold mr-2.5">Phí vận chuyển: {formatCurrency(ship.phivanchuyen)}/km</span>
                                    </label>
                                </div>
                            ))}
                        </RadioGroup>
                        </div>
                    </div>
                    

                    <DeliveryMap setDistanceCart ={setDistance} selectedDelivery = {selectedDelivery} setFeeShip = {setFeeShip} formData ={formData}/>

                    <div className="p-4 border-t">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">Tổng thanh toán ({cartItems.length} sản phẩm):</p>
                            <p className="text-lg font-bold text-red-500">{formatCurrency(total +(feeShip || 0))}</p>
                        </div>
                        <form onSubmit={handleSubmit} className='w-full flex items-center justify-center'>
                            <button className=" mt-4 bg-pink-400 text-white py-2 px-8 rounded-md hover:bg-pink-500 text-md">
                                Đặt hàng
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="max-w-6xl mx-auto mt-10 bg-white rounded-lg p-6 flex justify-center items-center flex-col shadow">
                    <h1 className="text-xl font-bold">Bạn chưa mặt hàng nào trong giỏ hàng!</h1>
                    <Link to='/products' className="text-white mt-6 bg-pink-400 px-6 py-2 rounded-sm transition duration-150 hover:bg-pink-500">Mua ngay</Link>
                </div>
            )}
            {isProcessing && (
                <div className='fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-[9999]'>
                    <div className='flex justify-center items-center h-full'>
                        <div className='bg-white p-6 rounded-md flex items-center flex-col'>
                            <div className='p-1 mb-5 rounded-full w-12 h-12 border flex items-center justify-center border-gray-600'>
                                <EllipsisHorizontalIcon className="h-6 w-6 text-gray-600" />

                            </div>
                            <h1 className='text-lg font-bold'>Đang xử lý đơn hàng...</h1>
                        </div>
                    </div>
                </div>
            )}
            {isSuccess && (
                <div className='fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-[9999]'>
                    <div className='flex justify-center items-center h-full'>
                        <div className='bg-white p-6 rounded-md flex items-center flex-col'>
                            <div className='p-1 mb-5 rounded-full w-12 h-12 border flex items-center justify-center border-green-500'>
                                <CheckIcon className="h-5 w-5 text-green-500" />
                            </div>
                            <h1 className='text-xl font-bold'>{message}</h1>
                            <h1 className='text-lg font-bold mt-2'>Mã đơn hàng</h1>
                            <p className='mt-2'>{generateOrderId()}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
