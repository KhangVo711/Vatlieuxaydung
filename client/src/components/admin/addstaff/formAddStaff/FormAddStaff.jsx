import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react';
import Select from 'react-select';
import { Context } from '../../../Context.jsx';
import Cookies from 'js-cookie';

export default function FormAddStaff({ formRef }) {
 
  const { setLoadStaff } = useContext(Context);
  const [selectedPosition, setSelectedPosition] = useState(null); 

const staffA = [
    {value: 'Nhân viên', label: 'Nhân viên'}, 
    {value: 'Quản lý', label: 'Quản lý'}, 
    {value: 'Kế toán', label: 'Kế toán'},
    {value: 'Bảo vệ', label: 'Bảo vệ'}];

  const [formData, setFormData] = useState({
    manv: '',
    tennv: '',
    sdtnv: '',
    emailnv: '',
    diachinv: '',
    chucvunv: '',
    tongluong: 0,
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
  console.log(formData);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`http://localhost:5001/addStaff`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('admin')}`,
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            setColorMsg('text-green-600');
            setMessage(response.data.message);
            handleSuccess();
            setFormData({
                manv: '',
                tennv: '',
                sdtnv: '',
                emailnv: '',
                diachinv: '',
                chucvunv: '',
                tongluong: 0,
                })
            setLoadStaff(true);
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
    <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>
      <form onSubmit={handleSubmit} ref={formRef} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16 ">
        <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Thêm nhân viên</h2>
        {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}

        <div className="mb-3 flex">
          <div className="w-1/3 mr-1">
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã nhân viên</label>
            <input type="text" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder='NVKS001'
              name='manv'
              value={formData.manv}
              onChange={handleChange}
            />
          </div>
          <div className="w-2/3 ml-1">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên nhân viên</label>
            <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder='Nguyễn Văn A'
              name='tennv'
              value={formData.tennv}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 flex">
          <div className="w-1/3 mr-1">
            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
            <input type="text" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder='089785211'
              name='sdtnv'
              value={formData.sdtnv}
              onChange={handleChange}
            />
          </div>
          <div className="w-2/3 ml-1">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder='staff@gmail.com'
              name='emailnv'
              value={formData.emailnv}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 flex">
          <div className="w-full mr-1">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
            <input type="text" id="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder='Ninh Kiều, Cần Thơ'
              name='diachinv'
              value={formData.diachinv}
              onChange={handleChange}
            />
          </div>

        </div>
        <div className='mb-3 flex justify-between'>
  <div className="w-full relative mr-2">
  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chức vụ</label>

  <Select
    options={staffA}
    value={staffA.find(option => option.value === selectedPosition?.value)}
    onChange={(selectedOption) => {
      setSelectedPosition(selectedOption);
      setFormData({
        ...formData,
        chucvunv: selectedOption.value,
      });
    }}
    placeholder="Chọn chức vụ"
    className='w-full text-sm rounded-lg'
  />
  </div>
 
</div>
        
        <div className='flex items-center justify-center w-full'>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thêm</button>
        </div>
      </form>
    </div>
  )
}