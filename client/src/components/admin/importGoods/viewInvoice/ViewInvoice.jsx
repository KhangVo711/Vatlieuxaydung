import { formatDateTime } from '../../../../utils/dateTime.jsx';
import { formatCurrency } from '../../../../utils/currency.jsx';

export default function ViewInvoice({ formRefView, selectDetailInvoice }) {
  const invoiceData = Array.isArray(selectDetailInvoice) && selectDetailInvoice.length > 0 ? selectDetailInvoice[0] : null;

  if (!invoiceData) {
    return (
      <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>
        <div className="2xl:w-1/2 w-3/4 mx-auto bg-gray-200 shadow-lg border flex flex-col py-5 px-6 rounded">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>
      <div ref={formRefView} className="2xl:w-1/2 w-2/3 mx-auto bg-gray-50 shadow-xl border flex flex-col py-5 px-2 rounded">
      <h1 className='text-center text-xl font-bold text-gray-800 mb-5'>Chi tiết phiếu nhập</h1>
        <div className='mb-1'>
          <div className='flex justify-between items-start flex-col w-full mb-3 bg-slate-300 px-4 rounded-sm py-2'>
          <h2><span className='font-bold text-gray-800 mr-3.5'>Tên quản lý:</span> {invoiceData.ten_quan_ly}</h2>

            <h2 className='text-center'>
              <span className='font-bold text-gray-800 w-16 mr-7'>Mã phiếu:</span> {invoiceData.mapn}
            </h2>
            <h2 className='text-center'>
              <span className='font-bold text-gray-800 mr-1'>Ngày giờ lập:</span> {formatDateTime(invoiceData.ngaylap)}
            </h2>
            <h2 className='text-center'>
            <span className='font-bold text-gray-800 mr-7'>Tên phiếu:</span> {invoiceData.tenpn}
          </h2>
          </div>
         
        </div>

        <table className="w-full text-md leading-5">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-3 px-4 text-left font-bold text-gray-800">Sản phẩm</th>
              <th className="py-3 px-4 text-left font-bold text-gray-800">Nhà sản xuất</th>
              <th className="py-3 px-4 text-center font-bold text-gray-800">Số lượng</th>
              <th className="py-3 px-4 text-right font-bold text-gray-800">Đơn giá</th>
              <th className="py-3 px-4 text-right font-bold text-gray-800">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {selectDetailInvoice.map((detail, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td className="py-3 px-4 text-left font-medium text-gray-600">{detail.ten_san_pham}</td>
                <td className="py-3 px-4 text-left font-medium text-gray-600">{detail.tennsx}</td>
                <td className="py-3 px-4 text-center">{detail.soluong}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(detail.dongia)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(detail.thanh_tien)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className='text-center mt-3'><span className='font-bold'>Tổng giá:</span> {formatCurrency(invoiceData.tong_gia)}</h2>
      </div>
    </div>
  );
}
