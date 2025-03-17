import { formatDateTime } from '../../../../utils/dateTime.jsx';
import { formatCurrency } from '../../../../utils/currency.jsx';

export default function ViewDetailOrder({ formRefView, selected }) {
  const invoiceData = Array.isArray(selected) && selected.length > 0 ? selected[0] : null;

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
      <div ref={formRefView} className="2xl:w-7/12 w-2/3 mx-auto bg-gray-50 shadow-xl border flex flex-col py-5 px-2 rounded">
        <h1 className='text-center text-xl font-bold text-gray-800 mb-5'>Chi tiết đơn hàng</h1>
        <div className='mb-1'>
          <div className='flex justify-center items-start w-full mb-3 bg-slate-300 px-4 rounded-sm py-2'>
            <div className='w-1/2'>
            <h2 className='text-left'>
                <span className='font-bold text-gray-800 w-16 mr-0.5'>Mã phiếu:</span> {invoiceData.madh}
              </h2>
              <h2><span className='font-bold text-gray-800 mr-0.5'>Mã khách hàng/form:</span> {invoiceData.makh_or_form}</h2>
              <h2><span className='font-bold text-gray-800 mr-0.5'>Tên khách hàng:</span> {invoiceData.tenkh_or_form}</h2>
              <h2><span className='font-bold text-gray-800 mr-0.5'>Số điện thoại:</span> {invoiceData.sdt_or_form}</h2>
              <h2><span className='font-bold text-gray-800 mr-0.5'>Địa chỉ:</span> {invoiceData.diachi_or_form}</h2>


             
            </div>
            <div className='w-1/2 xl:pl-24 pl-10'>
            <h2 className='text-left'>
                <span className='font-bold text-gray-800 '>Đơn vị vận chuyển:</span> {invoiceData.tendvvc}
              </h2>
              <h2>
                <span className='font-bold text-gray-800 mr-0.5'>Ngày giờ lập:</span> {formatDateTime(invoiceData.ngaydat)}
              </h2>
              <h2 className='text-left'>
                <span className='font-bold text-gray-800 '>Trạng thái:</span> {invoiceData.trangthai}
              </h2>
            </div>

          </div>

        </div>

        <table className="w-full text-md leading-5">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-3 px-4 text-left font-bold text-gray-800">Mã sản phẩm</th>
              <th className="py-3 px-4 text-left font-bold text-gray-800">Sản phẩm</th>
              <th className="py-3 px-4 text-center font-bold text-gray-800">Khuyến mãi</th>
              <th className="py-3 px-4 text-center font-bold text-gray-800">Số lượng</th>
              <th className="py-3 px-4 text-right font-bold text-gray-800">Đơn giá</th>
              <th className="py-3 px-4 text-right font-bold text-gray-800">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {selected.map((detail, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                <td className="py-3 px-4 text-left font-medium text-gray-600">{detail.masp}</td>
                <td className="py-3 px-4 text-left font-medium text-gray-600">{detail.tensp}</td>
                <td className="py-3 px-4 text-center font-medium text-gray-600">{detail.km}%</td>
                <td className="py-3 px-4 text-center">{detail.soluongsanpham}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(detail.dongia)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(detail.dongia * detail.soluongsanpham)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className='text-right mt-3 px-4'><span className='font-bold'>Phí vận chuyển:</span> {formatCurrency(invoiceData.phivanchuyen)}</h2>
        <h2 className='text-center mt-3'><span className='font-bold'>Tổng giá:</span> {formatCurrency(invoiceData.tonggia)}</h2>
      </div>
    </div>
  );
}
