import { useContext, useEffect, useState } from 'react';
import CartItem from './cartItem/CartItem';
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Context } from '../../Context';
import { formatCurrency } from '../../../utils/currency';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import DeliveryMap from './deliveryMap/DeliveryMap';

export default function Cart() {
  const navigate = useNavigate();
  const { isData, loadDelivery, setLoadDelivery, cartItems, setCartItems } = useContext(Context);

  const generateOrderId = () => `${Date.now()}${Math.floor(Math.random() * 10)}`;
  const generateFormId = () => `FO${Date.now()}${Math.floor(Math.random() * 10)}`;
  const getCurrentDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  // State
  const [delivery, setDelivery] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [formData, setFormData] = useState({
    maform: generateFormId(),
    fullname: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: "cod"
  });
  const [distance, setDistance] = useState(null);
  const [feeShip, setFeeShip] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  // Effect: Lấy đơn vị vận chuyển
  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getDelivery`);
        if (response.status === 200) setDelivery(response.data.delivery);
      } catch (error) {
        console.error('Error fetching delivery:', error);
      }
    };
    fetchDelivery();
    setLoadDelivery(false);
  }, [loadDelivery]);

  useEffect(() => {
    if (delivery.length > 0 && !selectedDelivery) {
      setSelectedDelivery(delivery[0]);
    }
  }, [delivery]);

  // Form change
  const handleChange = (e) => {
    setMessage('');
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Tổng giỏ hàng
  const total = cartItems.reduce((acc, item) => {
    const price = item.km ? item.gia * (1 - item.km / 100) : item.gia;
    return acc + price * item.soluong;
  }, 0);

  // Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    const orderId = generateOrderId();
    const totalAmount = total + feeShip;
    const makhachhang = isData?.id ?? null;
    const maformid = (makhachhang === null) ? formData.maform : null;

    const orderData = {
      madh: orderId,
      makh: makhachhang,
      ngaydat: getCurrentDate(),
      trangthai: "Chờ xác nhận",
      tonggia: totalAmount,
      madvvc: selectedDelivery.madvvc,
      maform: maformid,
      quangduong: distance,
      hinhthucthanhtoan: formData.paymentMethod,
    };

    try {
      // form nếu chưa login
      if (!isData?.id) {
        if (!formData.fullname || !formData.email || !formData.phone || !formData.address) {
          setIsProcessing(false);
          setMessage('Vui lòng nhập đầy đủ thông tin');
          return;
        }
        await axios.post('http://localhost:5001/insertFormOD', formData);
      }

      // COD
      if (formData.paymentMethod === "cod") {
        await createOrder(orderId, orderData, "Chưa thanh toán");
        setTimeout(() => {
          setIsProcessing(false);
          setIsSuccess(true);
        }, 2000);
      }

      // PayOS
      if (formData.paymentMethod === "qr") {
        const response = await axios.post('http://localhost:5001/orders/create-payos-order', {
          orderId: parseInt(orderId),
          amount: totalAmount,
          description: `DH#${orderId}`
        });

        if (response.data && response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl;
        }

        // Lưu đơn hàng trạng thái chờ thanh toán
        await createOrder(orderId, orderData, "Chờ thanh toán");
        setIsProcessing(false);

      }

    } catch (error) {
      console.error("Submit order error:", error);
      setIsProcessing(false);
    }
  };

  // Lưu đơn hàng + chi tiết
  const createOrder = async (orderId, orderData, paymentStatus) => {
    const cartResponse = await axios.post('http://localhost:5001/createCart', {
      ...orderData,
      madh: orderId,
      trangthaithanhtoan: paymentStatus,
    });

    if (cartResponse.status === 200) {
      const orderDetails = cartItems.map(item => ({
        madh: orderId,
        masp: item.masp,
        mabienthe: item.mabienthe || null,
        dongia: item.km ? item.gia * (1 - item.km / 100) : item.gia,
        km: item.km ? item.km : 0,
        soluongsanpham: item.soluong
      }));
      await axios.post('http://localhost:5001/createCartDetail', orderDetails);
    }
  };

 

  // Reset giỏ hàng khi COD thành công
  useEffect(() => {
    if (isSuccess && formData.paymentMethod === "cod") {
      setTimeout(() => {
        setIsSuccess(false);
        setCartItems([]);
        if (isData?.id) navigate('/ordered');
        else navigate('/products');
      }, 2500);
    }
  }, [isSuccess]);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-lg shadow">
          {/* Header */}
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold">Giỏ Hàng</h1>
          </div>
        <div className="grid grid-cols-4 sm:grid-cols-12 items-center p-4 border-b gap-1">
      {/* Hình ảnh và tên sản phẩm */}
      <div className="col-span-4 sm:col-span-3 pl-5 flex items-center justify-center gap-2">
        <p className=" text-right outline-none font-bold">Sản phẩm</p>
      </div>
     
      {/* Đơn giá */}
      <p className="hidden sm:block col-span-1 text-right text-gray-800 font-bold">
                <p className="text-center outline-none">Giá</p>

      </p>
 {/* Khuyến mãi */}
 <p className="hidden sm:block col-span-2 text-center font-bold">
        <p className="text-center outline-none">Khuyến mãi</p>

      </p>

      {/* Số lượng */}
      <div className="hidden sm:flex col-span-3 justify-center items-center gap-1">
        <p className="text-center outline-none font-bold">Số lượng</p>
      </div>

      {/* Thành tiền */}
      <p className="hidden sm:block col-span-1 gap-1 text-right font-bold">
                <p className="w-24 text-center outline-none font-bold">Thành tiền</p>

      </p>

      {/* Thao tác */}
      <div className="col-span-2 sm:col-span-2 text-center flex justify-center flex-col">
        <p className="text-center outline-none font-bold">Thao tác</p>
      </div>
    </div>
          {/* Items */}
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.masp} cartItem={cartItem} />
          ))}

          {/* Form khách chưa login */}
          {!isData?.id && (
            <div className="w-full flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold mb-2 uppercase mt-5">Thông tin đặt hàng</h2>
              {message && <p className="text-red-500 text-sm">{message}</p>}
              {["fullname", "email", "phone", "address"].map((field, idx) => (
                <div key={idx} className='w-full flex justify-center items-center mb-4'>
                  <div className='w-1/3 flex flex-col justify-center'>
                    <label className="block text-sm mb-1 font-medium text-gray-700">
                      {field === "fullname" ? "Họ và tên" :
                        field === "email" ? "Email" :
                          field === "phone" ? "Số điện thoại" : "Địa chỉ"}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                      placeholder={field}
                    />
                  </div>
                </div>
              ))}

              
            </div>
          )}
          {/* Payment */}
          <div className="p-4 bg-gray-50 border-t">

              <div className="w-full flex justify-center items-center mb-10">
                <div className="w-full flex flex-col justify-center">
                  <label className="block text-sm mb-3 font-semibold text-gray-800">
                    Hình thức thanh toán:
                  </label>
                  <div className="grid justify-center gap-3">
                    {[
                      { val: "cod", label: "Thanh toán khi nhận hàng (COD)" },
                      { val: "qr", label: "Thanh toán qua mã QR (PayOS)" }
                    ].map(opt => (
                      <label key={opt.val}
                        className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition 
                        ${formData.paymentMethod === opt.val
                            ? "border-pink-500 bg-pink-50 ring-2 ring-pink-400"
                            : "border-gray-300 hover:border-pink-400"}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={opt.val}
                          checked={formData.paymentMethod === opt.val}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center border-2 rounded-full border-pink-500">
                            {formData.paymentMethod === opt.val && (
                              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                            )}
                          </div>
                          <span className="text-gray-800 font-medium">{opt.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              </div>
          {/* Shipping */}
          <div className="p-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-800 font-medium">Chọn đơn vị vận chuyển:</p>
            <div className='w-full flex justify-center items-center'>
              <RadioGroup
                value={selectedDelivery?.madvvc}
                onValueChange={(value) => {
                  const ship = delivery.find((d) => d.madvvc === value);
                  setSelectedDelivery(ship);
                }}
                className="space-y-3 w-1/2"
              >
                {delivery.map((ship) => (
                  <div
                    key={ship.madvvc}
                    className={`flex items-center gap-3 px-3 rounded-2xl border ${selectedDelivery?.madvvc === ship.madvvc ? 'border-pink-500 bg-pink-50' : 'border-gray-300'}`}>
                    <RadioGroupItem value={ship.madvvc} id={ship.madvvc} className="h-0.5 w-0.5" />
                    <label htmlFor={ship.madvvc} className="text-sm w-full flex justify-between py-3 text-gray-800 cursor-pointer">
                      <span className="font-semibold">{ship.tendvvc}</span> - 
                      <span className="font-semibold">{ship.songayvanchuyen}</span> - 
                      <span className="font-semibold mr-2.5">Phí: {formatCurrency(ship.phivanchuyen)}/km</span>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <DeliveryMap setDistanceCart={setDistance} selectedDelivery={selectedDelivery} setFeeShip={setFeeShip} formData={formData} />

          {/* Total + submit */}
          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Tổng thanh toán ({cartItems.length} sản phẩm):</p>
              <p className="text-lg font-bold text-red-500">{formatCurrency(total + (feeShip || 0))}</p>
            </div>
            <form onSubmit={handleSubmit} className='w-full flex items-center justify-center'>
              <button className="mt-4 bg-pink-400 text-white py-2 px-8 rounded-md hover:bg-pink-500 text-md">
                Đặt hàng
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto mt-10 bg-white rounded-lg p-6 flex justify-center items-center flex-col shadow">
          <h1 className="text-xl font-bold">Bạn chưa có mặt hàng nào trong giỏ hàng!</h1>
          <Link to='/products' className="text-white mt-6 bg-pink-400 px-6 py-2 rounded-sm hover:bg-pink-500">Mua ngay</Link>
        </div>
      )}

      {/* Processing */}
      {isProcessing && (
        <div className='fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-[9999]'>
          <div className='bg-white p-6 rounded-md flex items-center flex-col'>
            <div className='p-1 mb-5 rounded-full w-12 h-12 border flex items-center justify-center border-gray-600'>
              <EllipsisHorizontalIcon className="h-6 w-6 text-gray-600" />
            </div>
            <h1 className='text-lg font-bold'>Đang xử lý đơn hàng...</h1>
          </div>
        </div>
      )}

      {/* Success */}
      {isSuccess && (
        <div className='fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-[9999]'>
          <div className='bg-white p-6 rounded-md flex items-center flex-col'>
            <div className='p-1 mb-5 rounded-full w-12 h-12 border flex items-center justify-center border-green-500'>
              <CheckIcon className="h-5 w-5 text-green-500" />
            </div>
            <h1 className='text-xl font-bold'>Đặt hàng thành công!</h1>
          </div>
        </div>
      )}
    </>
  );
}
