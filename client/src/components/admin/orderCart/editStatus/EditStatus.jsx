
import React, { useState, useContext} from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Context } from '../../../Context.jsx';

export default function EditStatus({formRefEdit, selected, setSelected }) {

    const { setLoadStatus } = useContext(Context);

    const [message, setMessage] = useState(''); 
    const [colorMessage, setColorMessage] = useState('');

const status = [
    { valueSTT: 'Chờ xác nhận', labelSTT: 'Chờ xác nhận' },
    { valueSTT: 'Đã xác nhận', labelSTT: 'Đã xác nhận' },
    { valueSTT: 'Đang giao hàng', labelSTT: 'Đang giao hàng' },
    { valueSTT: 'Đã giao hàng', labelSTT: 'Đã giao hàng' },
    { valueSTT: 'Đã hủy', labelSTT: 'Đã hủy' },
]

    const optionsStatus = status.map((stt) => ({
        value: stt.valueSTT,
        label: stt.labelSTT,
      }));
      
      const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            
        const response = await axios.post(`http://localhost:5001/updateStatus`, selected, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true

        });
        if (response.status === 200) {
            setMessage(response.data.message);
            setLoadStatus(true);
            setColorMessage('text-green-500');
            setTimeout(() => {
                setMessage('');
            }, 1500);
            handleSuccess();
        }
        if(response.status === 400){
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

    return(
        <>
        <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>
            <form ref={formRefEdit} onSubmit={handleSubmitEdit} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16 ">
                <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Cập nhật trạng thái</h2>
                {message && <p className={`${colorMessage} text-sm text-center mb-3`}>{message}</p>}

                <div className="mb-3">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã đơn hàng</label>
                    <p id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">{selected.madh}</p>
                </div>
                <div className="w-full mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng thái</label>
              <Select
                options={optionsStatus}
                value={optionsStatus.find(option => option.value === selected.trangthai)} 
                onChange={(selectedStatus) => {
                  setSelected({ ...selected, trangthai: selectedStatus.value }); 
                }}
                placeholder="Trạng thái"
                className="w-full text-sm rounded shadow"
              />
            </div>

                <div className='flex items-center justify-center w-full'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đồng ý</button>
                </div>
            </form>
        </div>
        </>
    )
}