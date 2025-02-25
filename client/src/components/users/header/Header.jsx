import React, { useState, useContext, useEffect, useRef } from 'react'
import Cookie from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../Context.jsx';
import { ArrowRightEndOnRectangleIcon, UserIcon, Cog6ToothIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/solid";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  FaceSmileIcon,
  Bars3Icon,
  ChartPieIcon,
  SparklesIcon,
  TagIcon,
  HeartIcon,
  FireIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import axios from 'axios';


const products = [
  { name: 'Chăm sóc da mặt', description: 'Sản phẩm chăm sóc da mặt giúp làn da khỏe mạnh và rạng rỡ', href: '#', icon: FaceSmileIcon },
  { name: 'Chăm sóc cơ thể', description: 'Sản phẩm chăm sóc cơ thể giúp nuôi dưỡng và bảo vệ làn da', href: '#', icon: ChartPieIcon },
  { name: 'Trang điểm', description: 'Sản phẩm trang điểm chất lượng cao giúp bạn thêm xinh đẹp', href: '#', icon: SparklesIcon },
  { name: 'Phụ kiện', description: 'Phụ kiện thời trang giúp bạn hoàn thiện phong cách', href: '#', icon: TagIcon },
  { name: 'Thực phẩm chức năng', description: 'Thực phẩm bổ sung giúp hỗ trợ sức khỏe và tăng cường thể chất', href: '#', icon: HeartIcon },
  { name: 'Bán chạy', description: 'Những sản phẩm bán chạy nhất, được khách hàng yêu thích', href: '#', icon: FireIcon },
]
const callsToAction = [
  { name: 'Xem chi tiết', href: '#', icon: PlayCircleIcon },
  { name: 'Liên hệ mua hàng', href: '#', icon: PhoneIcon },
]

export default function Header() {
  const location = useLocation()
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isData, setIsData } = useContext(Context);
  const {cartItems} = useContext(Context);
  console.log(isData);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false)
    setModalUpdate(false)
    setMessage('');

  };

  useEffect(() => {
    if (modalIsOpen) {
        document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
        document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Cleanup when component unmounts
    return () => {
        document.body.style.overflow = 'auto';
    };
}, [modalIsOpen]);

  Modal.setAppElement('#root');

  const [modalUpdate, setModalUpdate] = useState(false);
  const [message, setMessage] = useState('');
  const [colorMsg, setColorMsg] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
  });
  useEffect(() => {
    if (isData) {
      const fullnames = () => {
        if (isData.fullname) {
          return isData.fullname;
        }
        else {
          return '';
        }
      }
      const phones = () => {
        if (isData.phone) {
          return isData.phone;
        }
        else {
          return '';
        }
      }
      const emails = () => {
        if (isData.email) {
          return isData.email;
        }
        else {
          return '';
        }
      }
      const addresss = () => {
        if (isData.address) {
          return isData.address;
        }
        else {
          return '';
        }
      }
      setFormData({
        fullname: `${fullnames()}`,
        email: `${emails()}`,
        phone: `${phones()}`,
        address: `${addresss()}`,
      });
    }
  }, [isData]);
  console.log(formData);
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
    if (formData.fullname === isData.fullname && formData.email === isData.email && formData.phone === isData.phone && formData.address === isData.address) {
      setModalUpdate(false);
      return
    }
    if (!formData.fullname || !formData.email || !formData.phone || !formData.address) {
      handleError();
      setMessage("Vui lòng điền đầy đủ thông tin!");
      setColorMsg('text-red-500');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5001/updateInf/${isData.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });
      if (response.status === 200) {
        axios.get(`http://localhost:5001/getInf/${isData.id}`)
          .then((response) => {
            setIsData({
              fullname: response.data.infomation.tenkh,
              id: response.data.infomation.makh,
              email: response.data.infomation.email,
              phone: response.data.infomation.sdt,
              address: response.data.infomation.diachi,
            });
          });
        setMessage(response.data.message);
        setColorMsg('text-green-500');
        handleSuccess();
        setModalUpdate(false);
        setTimeout(() => { setMessage(""); }, 1500);
      }
    } catch (error) {
      setColorMsg('text-red-500');
      setMessage(error.response ? error.response.data.message : 'An error occurred');
      handleError();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getInf/${isData.id}`);
        if (response.status === 200) {
          setIsData({
            fullname: response.data.infomation.tenkh,
            id: response.data.infomation.makh,
            email: response.data.infomation.email,
            phone: response.data.infomation.sdt,
            address: response.data.infomation.diachi,
          }
          );
          if(!response.data.infomation.email || !response.data.infomation.sdt || !response.data.infomation.diachi){
            setModalIsOpen(true)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, [isData.id]);
  const handleSuccess = () => {
    toast.success("Cập nhật thành công!", {
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
    toast.error("Lỗi cập nhật!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const navigate = useNavigate();
  const logout = () => {
    setIsData({});
    Cookie.remove('jwt');
    navigate('/login');
  };

  const [modalChangePass, setModalChangePass] = useState(false);

  const openChangePass = () => setModalChangePass(true);
  const closeChangePass = () => {
    setModalChangePass(false)
    setMessage('');
  };
  const [formChangePass, setFormChangePass] = useState({
    password: '',
    newpassword: '',
    renewpassword: ''
  });
  const handleChangePass = (e) => {
    setMessage('');
    const { name, value } = e.target;
    setFormChangePass({
      ...formChangePass,
      [name]: value
    });
  };

  const handleSubmitChangePass = async (e) => {
    try{
      e.preventDefault();
      const response = await axios.post(`http://localhost:5001/changePassword/${isData.id}`, formChangePass, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });
      if (response.status === 200) {
        setMessage(response.data.message);
        setColorMsg('text-green-500');
        handleSuccess();
        setTimeout(
          () => { 
            setModalChangePass(false), 
            setMessage(''), setFormChangePass(
              {
                password: '',
                newpassword: '',
                renewpassword: ''
              }
            )
          }, 1500);
    }
    if (response.status === 400) {
      setColorMsg('text-red-500');
      setMessage(response.data.message);
    }
  }
    catch (error) {
      setColorMsg('text-red-500');
      setMessage(error.response ? error.response.data.message : 'An error occurred');
      handleError();
    }
  }

  const { setSearchQuery } = useContext(Context);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };


  return (
    <header className="bg-pink-200 sticky top-0 z-10 shadow-md">
      <ToastContainer />
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src="https://png.pngtree.com/png-vector/20220812/ourmid/pngtree-butterfly-logo-template-infinity-template-logotype-vector-png-image_38578402.png" alt="LOGO" className="h-16 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden items-center lg:flex xl:gap-x-12 lg:gap-x-7">
          <Link to="/products" className="text-sm flex flex-col items-center font-semibold leading-6 xl:text-md text-gray-900">
            Sản phẩm
            {location.pathname === '/products' ? <hr className='bg-black h-0.5 w-1/2' /> : ''}
          </Link>
          <Popover className="relative">
            <PopoverButton className="flex outline-none items-center gap-x-1 text-sm xl:text-md font-semibold leading-6 text-gray-900">
              Loại sản phẩm
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-pink-100 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-pink-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-pink-50 group-hover:bg-pink-100">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-500" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-xs text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-pink-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <a href="#" className="text-sm font-semibold leading-6 xl:text-md text-gray-900">
            Đang giảm
          </a>
          <a href="#" className="text-sm font-semibold leading-6 xl:text-md text-gray-900">
            Liên hệ
          </a>

          <div className="flex items-center border border-gray-300 rounded-full p-2 xl:w-80 lg:w-64 bg-white shadow-sm">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="ml-2 outline-none w-full text-sm"
              onChange={handleSearch}
            />
            <div className="w-0.5 h-5 bg-gray-300 mr-2"></div>
            <MicrophoneIcon className="h-5 w-5 text-gray-700" />
          </div>
          <Link to='cart' id='cart-icon' className="text-sm font-semibold leading-6  relative">
            <ShoppingCartIcon className={`h-7 w-7 ${location.pathname === '/cart' ? 'text-gray-900' : 'text-gray-500'} hover:text-gray-900 transition duration-150 `} />
            <span className="absolute -top-0.5 -right-1 bg-red-500 text-white rounded-full text-xs w-3.5 h-3.5 flex items-center justify-center">
                    {cartItems.length}
                </span>
          </Link>
          {isData && isData.id ? (
          <Link to='ordered' className="text-sm font-semibold leading-6 relative">
          <ArchiveBoxIcon className={`h-7 w-7 ${location.pathname === '/ordered' ? 'text-gray-900' : 'text-gray-500'} hover:text-gray-900 transition duration-150 `} />
          </Link>
          ) : null}
        </PopoverGroup>

        {isData && (isData.phone || isData.email) ? (
          <>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end relative">
              <img
                onClick={toggleDropdown}
                src="https://cdn.pixabay.com/photo/2024/10/15/02/12/cat-9121108_640.jpg"
                alt="ATV"
                className="w-12 h-12 rounded-full shadow-lg cursor-pointer ml-4"
              />
            </div>
            {dropDownOpen && (
              <div
                ref={dropdownRef}
                className="hidden lg:block absolute bg-gray-50 border border-t-1 shadow-xl top-16 text-gray-700 rounded-b-lg w-48 h-[120px] right-2 lg:right-[calc(100% - 500px)] 2xl:right-52"
              >
                <button onClick={openModal} className="block px-4 py-2 hover:bg-gray-200 w-full">
                  <p className='text-left'>Tài khoản</p>
                </button>

                <button onClick={openChangePass} className="block px-4 py-2 hover:bg-gray-200 w-full">
                  <p className='text-left'>Đổi mật khẩu</p>
                </button>
                <div onClick={logout} className="block px-4 py-2 rounded-b-lg hover:bg-gray-200">
                  Đăng xuất
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className="text-sm xl:text-md font-semibold leading-6 text-gray-900 border rounded-2xl border-gray-400 opacity-80 hover:opacity-100  hover:border hover:rounded-2xl hover:border-black px-2 py-1 transition duration-300 ease-in-out">
              Đăng nhập
            </Link>
          </div>
        )}
      </nav>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={{
          base: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition ease-in-out duration-300 z-50",
          afterOpen: "opacity-100",
          beforeClose: "opacity-0",
        }}
        className={{
          base: "bg-white w-96 p-6 rounded-lg shadow-lg transform transition ease-in-out duration-300",
          afterOpen: "opacity-100 scale-100",
          beforeClose: "opacity-0 scale-75",
        }}
        closeTimeoutMS={350}
      >
        <div className="text-center">
          <img
            src="https://cdn.pixabay.com/photo/2024/10/15/02/12/cat-9121108_640.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

          <h2 className="text-xl font-semibold mb-2">Thông tin tài khoản</h2>
          <p className="text-gray-500 mb-4">Mã khách hàng: <span className='text-gray-700'>{isData.id}</span></p>

        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor='fullname_inf' className="block text-sm mb-1 font-medium text-gray-700">Họ và tên</label>
            {modalUpdate ? (
              <input
                type="text"
                id="fullname_inf"
                name='fullname'
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='Họ và tên'
                value={formData.fullname}
                onChange={handleChange}
              />
            ) : (
              <p
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {isData.fullname}
              </p>
            )}

          </div>
          <div>
            <label htmlFor='email_inf' className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            {modalUpdate ? (
              <input
                type="text"
                id='email_inf'
                name='email'
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <p
                className={`w-full p-2 border ${!isData.email ? 'border-red-500 text-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                {!isData.email ? 'Chưa cập nhật' : isData.email}
              </p>
            )}

          </div>
          <div>
            <label htmlFor='phone_inf' className="block text-sm mb-1 font-medium text-gray-700">Số điện thoại</label>
            {modalUpdate ? (
              <input
                type="text"
                id='phone_inf'
                name='phone'
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='Số điện thoại'
                value={formData.phone}
                onChange={handleChange}
              />) : (
              <p
                className={`w-full p-2 border ${!isData.phone ? 'border-red-500 text-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                {!isData.phone ? 'Chưa cập nhật' : isData.phone}
              </p>
            )}

          </div>
          <div>
            <label htmlFor='address_inf' className={`block text-sm mb-1 font-medium text-gray-700`}>Địa chỉ</label>
            {modalUpdate ? (
              <input
                type="text"
                id='address_inf'
                name='address'
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='Địa chỉ'
                value={formData.address}
                onChange={handleChange}
              />
            ) : (
              <p
                className={`w-full p-2 border ${!isData.address ? 'border-red-500 text-red-400' : 'border-gray-300'} border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                {!isData.address ? 'Chưa cập nhật' : isData.address}
              </p>
            )}

          </div>
          {modalUpdate ? (
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Lưu
            </button>) : (
            <div

              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setModalUpdate(true)}
            >
              <p className='text-center'>Cập nhật</p>
            </div>)}

        </form>
      </Modal>
      <Modal
        isOpen={modalChangePass}
        onRequestClose={closeChangePass}
        overlayClassName={{
          base: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition ease-in-out duration-300 z-50",
          afterOpen: "opacity-100",
          beforeClose: "opacity-0",
        }}
        className={{
          base: "bg-white w-96 p-6 rounded-lg shadow-lg transform transition ease-in-out duration-300",
          afterOpen: "opacity-100 scale-100",
          beforeClose: "opacity-0 scale-75",
        }}
        closeTimeoutMS={350}
      >
        <div className="text-center">
          <img
            src="https://cdn.pixabay.com/photo/2024/10/15/02/12/cat-9121108_640.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}
          <h2 className="text-xl font-semibold mb-2">Đổi mật khẩu</h2>
          <p className="text-gray-500 mb-4">Mã khách hàng: <span className='text-gray-700'>{isData.id}</span></p>
        </div>
        <form onSubmit={handleSubmitChangePass} className="space-y-4">
          <div>
            <label htmlFor='password' className="block text-sm mb-1 font-medium text-gray-700">Mật khẩu cũ</label>
            <input
              type="text"
              id="password"
              name='password'
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='Mật khẩu cũ'
              value={formChangePass.password}
              onChange={handleChangePass}
            />
          </div>
          <div>
            <label htmlFor='newpassword' className="block text-sm mb-1 font-medium text-gray-700">Mật khẩu mới</label>
            <input
              type="text"
              id='newpassword'
              name='newpassword'
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='Mật khẩu mới'
              value={formChangePass.newpassword}
              onChange={handleChangePass}
            />
          </div>
          <div>
            <label htmlFor='renewpassword' className="block text-sm mb-1 font-medium text-gray-700">Nhập lại mật khẩu mới</label>
            <input
              type="text"
              id='renewpassword'
              name='renewpassword'
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='Nhập lại mật khẩu mới'
              value={formChangePass.renewpassword}
              onChange={handleChangePass}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Đồng ý
          </button>
        </form>
      </Modal>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img src="https://png.pngtree.com/png-vector/20220726/ourmid/pngtree-construction-logo-png-image_6066962.png" alt="LOGO" className="h-16 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6 cursor-pointer" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="flex items-center border border-gray-300 rounded-full p-1.5 w-full bg-white shadow-sm mb-8">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="ml-2 outline-none w-full"
                  />
                  <div className="w-0.5 h-5 bg-gray-300 mr-2"></div>
                  <MicrophoneIcon className="h-5 w-5 mr-0.5 text-gray-600" />
                </div>
                {isData && (isData.phone || isData.email) && (

                  <div onClick={openModal} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    <p className='flex justify-between'>Tài khoản
                      <UserIcon className="h-5 w-5 text-gray-700" />
                    </p>
                  </div>
                )}
                <Link
                  to="/products"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Sản phẩm
                </Link>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Loại sản phẩm
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Đang giảm
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <p className='flex justify-between'>Liên hệ<DevicePhoneMobileIcon className="h-5 w-5 text-gray-700" /></p>
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <p className='flex justify-between'>Giỏ hàng<ShoppingCartIcon className="h-5 w-5 text-gray-700" /></p>
                </a>
              </div>

              {isData && (isData.phone || isData.email) ? (
                <>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <p className='flex justify-between'>Cài đặt<Cog6ToothIcon className="h-5 w-5 text-gray-700" /></p>
                  </a>
                  <div onClick={logout}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <p className='flex justify-between'>Đăng suất<ArrowRightEndOnRectangleIcon className="h-5 w-5 text-gray-700" /></p>
                  </div>
                </>
              ) : (
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>

    </header >
  )
}