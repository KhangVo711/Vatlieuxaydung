import React, { useContext } from 'react';
import { formatCurrency } from '../../../../utils/currency';
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { Context } from '../.../../../../Context';

export default function CartItem({ cartItem }) {
  const { decreaseQuantity,increaseQuantity,removeItem } = useContext(Context);
  console.log(cartItem);
  return (
    <div className="grid grid-cols-4 sm:grid-cols-12 items-center p-4 border-b gap-4">
      {/* Hình ảnh và tên sản phẩm */}
      <div className="col-span-4 sm:col-span-3 pl-5 flex items-center gap-4">
        <img
          src={`http://localhost:5001/uploads/${cartItem.masp}/${cartItem.hinhanh}`}
          alt={cartItem.tensp}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <h2 className="text-sm font-medium text-gray-700">{cartItem.tensp} {cartItem.mabienthe && cartItem.thuoctinh ? <span className='font-bold'>({cartItem.thuoctinh })</span> : null}</h2>
      </div>
     
      {/* Đơn giá */}
      <p className="hidden sm:block col-span-1 text-right text-gray-800 font-bold">
        {formatCurrency(cartItem.gia)}
      </p>
 {/* Khuyến mãi */}
 <p className="hidden sm:block col-span-2 text-center font-bold">
        {cartItem?.km ? cartItem.km : 0}%
      </p>

      {/* Số lượng */}
      <div className="hidden sm:flex col-span-3 justify-center items-center gap-2">
        <button onClick={()=>decreaseQuantity(cartItem.masp)} className="px-2 py-1 text-gray-600 hover:text-gray-500"><MinusCircleIcon className="h-6 w-6 " />
        </button>
        <p className="w-12 text-center outline-none">{cartItem.soluong}</p>
        <button onClick={()=>increaseQuantity(cartItem.masp)} className="px-2 py-1 text-gray-600 hover:text-gray-500"><PlusCircleIcon className="h-6 w-6" /></button>
      </div>

      {/* Thành tiền */}
      <p className="hidden sm:block col-span-1 gap-4 text-right text-red-500 font-bold">
        {cartItem?.km ? formatCurrency(cartItem.gia * cartItem.soluong * (1 - cartItem.km / 100)) : formatCurrency(cartItem.gia * cartItem.soluong)}
      </p>

      {/* Thao tác */}
      <div className="col-span-2 sm:col-span-2 text-center flex justify-center flex-col">
        {/* <button className="text-sm text-gray-500 hover:underline">
          Khuyến mãi
        </button> */}
        <button onClick={()=>removeItem(cartItem.masp)} className="text-sm text-red-600 hover:underline">
          Xóa
        </button>
      </div>
    </div>
  );
}
