import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function FormEditStaff({ formRefEdit, selectedStaff, setSelectedStaff, setLoadStaff }) {

  const staffE = [
    {value: 'Nhân viên', label: 'Nhân viên'}, 
    {value: 'Quản lý', label: 'Quản lý'}, 
    {value: 'Kế toán', label: 'Kế toán'},
    {value: 'Bảo vệ', label: 'Bảo vệ'}];

  const [colorMessage, setColorMessage] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`http://localhost:5001/editStaff`, selectedStaff, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('admin')}`,
                'Accept': 'application/json'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            setMessage(response.data.message);
            setLoadStaff(true);
            setColorMessage('text-green-500');
            setTimeout(() => {
                setMessage('');
            }, 1500);
            handleSuccess();
        }
        if (response.status === 400) {
            setMessage(response.data.message);
            setColorMessage('text-red-500');
            handleError();

        }
    } catch (error) {
        handleError();
        setMessage(error.response ? error.response.data.message : 'An error occurred');
        setColorMessage('text-red-500');
    }
}
const handleSuccess = () => {
    toast.success("Sửa thành công!", {
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

      <form onSubmit={handleSubmitEdit} ref={formRefEdit} className=" w-1/3 mx-auto bg-gray-100 shadow-lg border flex rounded py-5 px-8 mt-16 ">

       
        <div className='mx-auto'>
          <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Sửa nhân viên</h2>
          {message && <p className={`${colorMessage} text-center text-sm`}>{message}</p>}

          <div className="mb-3 flex">
            <div className="w-1/3 mr-1">
              <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã nhân viên</label>
              <p id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{selectedStaff.manv}</p>
            </div>
            <div className="w-2/3 ml-1">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên nhân viên</label>
              <input type="text" id="name" name='tennv' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder='Tên nhân viên'
                value={selectedStaff.tennv}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, tennv: e.target.value })}
              />
            </div>
          </div>
          <div className="mb-3 flex">
            <div className="w-1/3 mr-1">
              <label htmlFor="sdt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
              <input type="text" id="sdt" name='tennv' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder='Số điện thoại'
                value={selectedStaff.sdtnv}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, sdtnv: e.target.value })}
              />
            </div>
            <div className="w-2/3 ml-1">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="text" id="name" name='tennv' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder='Tên nhân viên'
                value={selectedStaff.emailnv}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, emailnv: e.target.value })}
              />
            </div>
          </div>
       
          <div className='mb-3'>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
            <input type="text" id="name" name='tennv' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder='Tên nhân viên'
                value={selectedStaff.diachinv}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, diachinv: e.target.value })}
              />
          </div>
          <div className='mb-3 flex justify-between'>
            {/* Dropdown Chức vụ */}
            <div className="w-1/2 relative mr-1">
              <label htmlFor="producer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chức vụ</label>
              <Select
                options={staffE}
                value={staffE.find(option => option.value === selectedStaff.chucvunv)} // Khớp giá trị đã chọn với options
                onChange={(selectedOption) => {
                  setSelectedStaff({ ...selectedStaff, chucvunv: selectedOption.value }); // Cập nhật `mansx` trong state
                }}
                placeholder="Chọn nhà sản xuất"
                className="w-full text-sm rounded shadow"
              />
            </div>
          <div className='mb-3'>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tổng lương</label>
            <input type="text" id="name" name='tennv' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder='Tên nhân viên'
                value={selectedStaff.tongluong}
                onChange={(e) => setSelectedStaff({ ...selectedStaff, tongluong: e.target.value })}
              />
          </div>
            
          

          
          </div>
          
       
          <div className='flex items-center justify-center w-full'>
            <button type="submit" className="text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 transition duration-150 ease-in-out">Đồng ý</button>
          </div>
        </div>
      </form>

    </div>
  )
}