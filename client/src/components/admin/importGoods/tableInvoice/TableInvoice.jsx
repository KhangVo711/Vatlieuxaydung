import {formatDateTime} from '../../../../utils/dateTime.jsx';
import { formatCurrency } from '../../../../utils/currency.jsx';
export default function TableInvoice({dataInvoice}) {
    return (
        <div className="flex flex-wrap px-5">
            {dataInvoice.map((invoice, index) => (
            <div key={index} className="max-w-xs mx-auto mb-6 2xl:w-1/5 w-1/3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className=" pb-3">
                    <div className="bg-gray-300 w-full p-1.5">
                    <h2 className="text-center font-bold">Mã phiếu: {invoice.mapn} </h2>
                    </div>
                    <h2 className="text-center mt-1 font-semibold">{formatDateTime(invoice.ngaylap)}</h2>
                    <div className="p-4">
                    <h2>Tên phiếu nhập: {invoice.tenpn}</h2>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Tên quản lý: </p>
                    <div className="text-right">
                    <h2>Tổng giá</h2>
                    <p>{formatCurrency(invoice.tong_gia_theo_mapn)}</p>
                    </div>
                    </div>
                    <div className="flex justify-center">
                    <button className="px-2 py-1.5 bg-gray-800 rounded-sm text-white">Xem chi tiết</button>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}