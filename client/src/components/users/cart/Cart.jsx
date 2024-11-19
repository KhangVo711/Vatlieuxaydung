import { useContext, useEffect, useState } from 'react';
import CartItem from './cartItem/CartItem';
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Context } from '../../Context';
import { formatCurrency } from '../../../utils/currency';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
    
    const generateOrderId = () => `OD${Date.now()}${Math.floor(Math.random() * 10)}`;
    const getCurrentDate = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    };

    const { isData } = useContext(Context);
    console.log(isData.id);
    const { cartItems, setCartItems } = useContext(Context);
    const listCX = cartItems.map((cartItem) => (
        <CartItem key={cartItem.masp} cartItem={cartItem} />
    ));
    const total = cartItems.reduce((acc, item) => acc + item.gia * item.soluong, 0);

    const [ship, setShip] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    if(isSuccess === true){
        setTimeout(() => {
            setIsSuccess(false);
        }, 3500);
    } 
    console.log(ship);
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
        const totalAmount = total + ship.phivanchuyen
        const orderData = {
            madh: orderId,
            makh: isData.id,
            ngaydat: getCurrentDate(),
            trangthai: "Chờ xác nhận",
            tonggia: totalAmount,
            madvvc: ship.madvvc,
        };

        try {
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
                    dongia: item.gia,
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
                    setMessage(detailResponse.data.message);
                
                    // Giữ trạng thái đang xử lý trong 3 giây, sau đó chuyển thành công
                    setTimeout(() => {
                        setIsProcessing(false); // Dừng xử lý đơn hàng
                        setIsSuccess(true); // Đặt hàng thành công
                    setCartItems([]);

                    }, 3000);
                } else {
                    console.error("Failed to submit order details");
                    setIsProcessing(false); // Dừng xử lý nếu lỗi
                }
            } else {
                console.error("Failed to submit cart");
                setIsProcessing(false); // Dừng xử lý nếu lỗi
            }
        } catch (error) {
            console.error("There was an error submitting the form!", error);
            setIsProcessing(false); // Dừng xử lý nếu lỗi
        }
    };

    return (
        <>
            {cartItems && cartItems.length > 0 ? (
                <div className="max-w-5xl mx-auto mt-10 bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h1 className="text-xl font-bold">Giỏ Hàng</h1>
                    </div>
                    <div className="p-4 border-b bg-gray-100">
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                            <p className="col-span-4 sm:col-span-5 pl-5">Sản phẩm</p>
                            <p className="hidden sm:block col-span-1 text-center">Đơn giá</p>
                            <p className="hidden sm:block col-span-3 text-center">Số lượng</p>
                            <p className="hidden sm:block col-span-1 text-center">Thành tiền</p>
                            <p className="hidden sm:block col-span-2 text-center">Thao tác</p>
                        </div>
                    </div>
                    {listCX}
                    <div className="p-4 bg-gray-50 border-t">
                        <div className="flex justify-between items-center my-1">
                            <p className="text-sm text-gray-800">Đơn vị vận chuyển: <span className='font-bold'>{ship.tendvvc}</span></p>
                            <p className="text-sm text-gray-800">Phí vận chuyển: {formatCurrency(ship.phivanchuyen)}</p>
                        </div>
                    </div>
                    <div className="p-4 border-t">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium">Tổng thanh toán ({cartItems.length} sản phẩm):</p>
                            <p className="text-lg font-bold text-red-500">{formatCurrency(total + ship.phivanchuyen)}</p>
                        </div>
                        <form onSubmit={handleSubmit} className='w-full flex items-center justify-center'>
                            <button className=" mt-4 bg-orange-500 text-white py-2 px-8 rounded-md hover:bg-orange-400 text-md">
                                Đặt hàng
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="max-w-6xl mx-auto mt-10 bg-white rounded-lg p-6 flex justify-center items-center flex-col shadow">
                    <h1 className="text-xl font-bold">Bạn chưa mặt hàng nào trong giỏ hàng!</h1>
                    <Link to='/products' className="text-white mt-6 bg-gray-700 px-6 py-2 rounded-sm hover:bg-gray-600">Mua ngay</Link>
                </div>
            )}
            {isProcessing && (
                <div className='h-screen w-screen bg-black bg-opacity-10 absolute top-0 z-50'>
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
                <div className='h-screen w-screen bg-black bg-opacity-10 absolute top-0 z-50'>
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
