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
const [discountList, setDiscountList] = useState([]);
const [showDiscountModal, setShowDiscountModal] = useState(false);

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
    paymentMethod: "cod",
    discountAmount: 0,
    discountCode: "",
    percent: 0,
  });
  const [distance, setDistance] = useState(null);
  const [feeShip, setFeeShip] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [messageQuantity, setMessageQuantity] = useState([]);

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

const checkInventory = async () => {
  try {
    const res = await axios.post("http://localhost:5001/check-before-order", {
      cartItems: cartItems.map(item => ({
        masp: item.masp,
        mabienthe: item.mabienthe || null,
        quantity: item.soluong
      }))
    });

    return res.data;

  } catch (err) {
    if (err.response?.data?.errors) {
      return {
        success: false,
        errors: err.response.data.errors
      };
    }
    return { success: false, errors: ["Không thể kết nối server"] };
  }
};


  // Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

  const check = await checkInventory();
  console.log("Inventory check:", check);

 if (!check.success) {
  setMessageQuantity(check.errors); 
  return;
}
    setIsProcessing(true);

    const orderId = generateOrderId();
    const totalAmount = total - discountAmount + feeShip;
    const makhachhang = isData?.id ?? null;
    const maformid = (makhachhang === null) ? formData.maform : null;

    const orderData = {
      madh: orderId,
      makh: makhachhang,
      ngaydat: getCurrentDate(),
      magiamgia: formData.discountCode || null,
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

  const fetchDiscountList = async () => {
  try {
    const res = await axios.get("http://localhost:5001/getUserDiscounts", {
      params: { userId: isData?.id || null }
    });
    if (res.status === 200) setDiscountList(res.data.discounts);
  } catch (err) {
    console.error("Lỗi lấy mã giảm giá:", err);
  }
};

// Hàm áp dụng mã giảm giá
// Hàm áp dụng mã giảm giá
const handleApplyDiscount = async () => {
  if (!formData.discountCode) {
    return setMessage("Vui lòng nhập mã giảm giá!");
  }

  try {
    const res = await axios.post("http://localhost:5001/checkDiscount", {
      code: formData.discountCode,
      total: total,
      userId: isData?.id || null
    });

    if (res.data.valid) {
      // Giảm giá chỉ áp dụng trên tổng hàng, không ảnh hưởng phí ship
      const discountAmount = res.data.discountAmount;
      setFormData(prev => ({
        ...prev,
        discountAmount, // lưu lại để tính tổng cuối
        percent: res.data.percent
      }));
      setMessage(`Giảm ${res.data.percent}% (${formatCurrency(discountAmount)})`);
    } else {
      setMessage(res.data.message || "Mã không hợp lệ hoặc đã hết lượt sử dụng.");
      setFormData(prev => ({ ...prev, discountAmount: 0 }));
    }
  } catch (err) {
    console.error(err);
    setMessage("Lỗi kiểm tra mã giảm giá!");
  }
};

const discountAmount = formData.discountAmount || 0;

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
              {["Họ và tên", "Email", "Số điện thoại", "Địa chỉ"].map((field, idx) => (
                <div key={idx} className='w-full flex justify-center items-center mb-4'>
                  <div className='w-1/3 flex flex-col justify-center'>
                    <label className="block text-sm mb-1 font-medium text-gray-700">
                      {field === "Họ và tên" ? "Họ và tên" :
                        field === "Email" ? "Email" :
                          field === "Số điện thoại" ? "Số điện thoại" : "Địa chỉ"}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
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
            <div className="p-4 bg-gray-50 border-t">
  {!isData?.id && (
    <p className="text-sm text-pink-500 mb-3">
      🎁 <span className="font-medium">Đăng ký tài khoản lần đầu tiên</span> sẽ nhận được nhiều <span className="font-bold">mã giảm giá hấp dẫn!</span>
    </p>
  )}

  <label className="block text-sm font-medium text-gray-700 mb-2">
    Mã giảm giá:
  </label>
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Nhập mã giảm giá"
      value={formData.discountCode || ""}
      onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
    />
    <button
      type="button"
      onClick={handleApplyDiscount}
      className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500"
    >
      Áp dụng
    </button>
    <button
    type="button"
    onClick={() => {
      fetchDiscountList(); // gọi API lấy danh sách
      setShowDiscountModal(true);
    }}
    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
  >
    Xem mã
  </button>
  </div>
  {message && <p className="text-sm mt-2 text-red-500">{message}</p>}
</div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Tổng thanh toán ({cartItems.length} sản phẩm):</p>
              <p className="text-lg font-bold text-red-500">{formatCurrency(total - discountAmount + (feeShip || 0))}</p>
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
      {/* Modal xem mã giảm giá */}
{showDiscountModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[9999]">
    <div className="bg-white w-96 rounded-lg p-5 shadow-lg">
      <h2 className="text-lg font-bold mb-4 text-center">🎁 Mã giảm giá của bạn</h2>

      {discountList.length > 0 ? (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {discountList.map((code, index) => (
            <div
              key={index}
              onClick={() => {
                setFormData({ ...formData, discountCode: code.magiamgia });
                setShowDiscountModal(false);
                handleApplyDiscount();
              }}
              className="border rounded-lg p-3 cursor-pointer hover:bg-pink-50 transition"
            >
              <p className="font-semibold text-pink-600">{code.magiamgia}</p>
              <p className="text-sm text-gray-600">
                Giảm {code.phantramgiam}% cho đơn từ {formatCurrency(code.dieukien)}
              </p>
              <p className="text-xs text-gray-400 mt-1">Còn lại: {code.soluongconlai}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center text-gray-500">Không có mã giảm giá nào</p>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowDiscountModal(false)}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
)}
{messageQuantity && messageQuantity.length > 0 && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
    <div className="bg-white w-96 rounded-lg p-6 shadow-xl">
      <h2 className="text-lg font-bold text-red-600 mb-3 text-center">
        ⚠️ Không đủ số lượng
      </h2>

      <ul className="space-y-2 text-sm text-gray-700 max-h-60 overflow-y-auto">
        {messageQuantity.map((msg, i) => (
          <li key={i} className="p-2 bg-red-50 border border-red-200 rounded">
            {msg}
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setMessageQuantity([])}
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
