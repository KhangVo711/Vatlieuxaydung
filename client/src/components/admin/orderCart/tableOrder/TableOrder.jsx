import React, {useState, useEffect, useContext} from 'react'
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import {formatCurrency} from '../../../../utils/currency.jsx';
import {formatDateTime} from '../../../../utils/dateTime.jsx';
import axios from 'axios'
import { Context } from '../../../Context.jsx';

export default function TableOrder({handleEditClick, handleViewClick}) {

    const { loadStatus, setLoadStatus } = useContext(Context);
    console.log(loadStatus);
    const [dataOrder, setDataOrder] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5001/getOrder')
            .then((response) => {
                setDataOrder(response.data.order);
                setLoadStatus(false);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    }, [loadStatus]);

    return (
        <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Mã đơn hàng
              </th>
              <th scope="col" className="px-8 py-3">
                Mã khách hàng
              </th>
              <th scope="col" className="px-4 py-3">
                Đơn vị vận chuyển
              </th>
              <th scope="col" className="px-4 py-3">
                Thời gian đặt
              </th>

              <th scope="col" className="px-4 py-3 text-right">
                Tổng giá
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Trạng thái
              </th>
              <th scope="col" className="text-center px-6 py-3 ">
                Hành động
              </th>
              
            </tr>
          </thead>
          <tbody>
            {dataOrder.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-4 py-4" >
                  {item.madh}
                </th>
                <td className="px-8 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.makh}
                </td>
                <td className="px-4 py-3 font-medium whitespace-nowrap dark:text-white">
                  {item.tendvvc}
                </td>
                <td className="px-4 py-3">
                  {formatDateTime(item.ngaydat)}
                </td>
            
                <td className="px-4 py-3 text-right">
                  {formatCurrency(item.tonggia)}
                </td>
                <td className="px-4 py-3 text-right">
                  {item.trangthai}
                </td>
            
                <td className="items-center justify-center px-6 py-4 flex">
                  <button onClick={() => handleViewClick(item)} className="transition duration-200 ease-out "><EyeIcon className="h-5 w-5 text-gray-500 dark:text-white hover:text-gray-400" /></button>
                  <button onClick={()=>handleEditClick(item)} className="transition duration-200 ease-out mx-2"><PencilSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-500 hover:text-blue-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    )
}