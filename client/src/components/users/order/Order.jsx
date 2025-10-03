import { useContext, useEffect, useState } from 'react';

import { Context } from '../../Context';
import { formatCurrency } from '../../../utils/currency';
import axios from 'axios';

export default function Order() {
    const { loadStatus, setLoadStatus } = useContext(Context);
    const {isData} = useContext(Context)
    const [dataOrder, setDataOrder] = useState([]);
    console.log(dataOrder)
    useEffect(() => {
        axios.get(`http://localhost:5001/getOrderOfUser/${isData.id}`)
            .then((response) => {
                setDataOrder(response.data.detailOrder);
                setLoadStatus(false);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    }, [loadStatus]);
    return (
        <>
         
                <div className="max-w-6xl mx-auto mt-10 bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h1 className="text-xl font-bold">Đơn đặt hàng của bạn</h1>
                    </div>
                    <div className="p-4 border-b bg-gray-100">
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                            <p className="col-span-4 sm:col-span-2">Mã đơn hàng</p>
                            <p className="hidden sm:block col-span-3">Sản phẩm đặt</p>
                            <p className="hidden sm:block col-span-1 text-center">Vận chuyển</p>
                            <p className="hidden sm:block col-span-2 text-center">Tổng giá</p>
                            <p className="hidden sm:block col-span-2 text-center">Trang thái</p>
                            <p className="hidden sm:block col-span-2 text-center">Thanh toán</p>
                        </div>
                    </div>
                    {dataOrder.map((order, index) => (
                    <div key={index} className="p-4 border-b">
                        <div className="grid grid-cols-4 sm:grid-cols-12 gap-4 text-sm items-center font-medium text-gray-600">
                            <p className="col-span-4 sm:col-span-2">{order.madh}</p>
                            <p className="hidden sm:block col-span-3 text-left">{order.sanpham_chitiet}</p>
                            <p className="hidden sm:block col-span-1 text-center">{order.tendvvc}</p>
                            <p className="hidden sm:block col-span-2 text-center">{formatCurrency(order.tonggia)}</p>
                            <p className="hidden sm:block col-span-2 text-center">{order.trangthai}</p>
                            <p className="hidden sm:block col-span-2 text-center">{order.trangthaithanhtoan}</p>
                        </div>
                    </div>
                    ))}
                </div>
           
           
        </>
    );
}
