import { useState, useMemo, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';

export default function TableRepo({ repo, months, onFilterChange }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('');
useEffect(() => {
  setCurrentPage(0);
}, [search, selectedMonth, repo]);
const handlePageChange = (page) => {
  if (page < 0) return;
  if (page > pageCount - 1) return;
  setCurrentPage(page);
};
  const itemsPerPage = 6;

  // Khi chọn tháng: chỉ gửi lên cha, không lọc frontend
  const handleMonthChange = (selectedOption) => {
    const value = selectedOption?.value || '';
    setSelectedMonth(value);
    onFilterChange((prev) => ({ ...prev, month: value }));
  };

  // Khi chọn sản phẩm: gửi từ khóa tìm kiếm lên cha
  const handleSearchChange = (selectedOption) => {
    setSearch(selectedOption);
    onFilterChange((prev) => ({ ...prev, search: selectedOption?.value || '' }));
  };

  // Lọc frontend chỉ theo tìm kiếm (không theo tháng)
  const filteredRepo = useMemo(() => {
    return repo.filter((item) => {
      if (search) {
        const q = (search.value || search).toString().toLowerCase();
        const match = (item.tensp || '').toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [repo, search]);

  // Phân trang
  const offset = currentPage * itemsPerPage;
  const currentRepo = filteredRepo.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredRepo.length / itemsPerPage);

  const getPageNumbers = () => {
    const maxDisplay = 3;
    let startPage = Math.max(0, currentPage - 1);
    let endPage = Math.min(pageCount, startPage + maxDisplay);
    if (endPage - startPage < maxDisplay && startPage > 0) {
      startPage = Math.max(0, endPage - maxDisplay);
    }
    const pages = [];
    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }
    return pages;
  };
  const pageNumbers = getPageNumbers();

  // Tổng cộng
  const totals = useMemo(() => {
    return filteredRepo.reduce(
      (acc, item) => ({
        import: acc.import + Number(item.total_import || 0),
        export: acc.export + Number(item.total_export || 0),
        importValue: acc.importValue + Number(item.import_value || 0),
        revenue: acc.revenue + Number(item.revenue_value || 0),
        profit: acc.profit + Number(item.profit_value || 0),
      }),
      { import: 0, export: 0, importValue: 0, revenue: 0, profit: 0 }
    );
  }, [filteredRepo]);

  // Xuất Excel
  const exportToExcel = () => {
    const dataToExport = filteredRepo.map((r) => ({
      masp: r.masp,
      tensp: r.tensp,
      mabienthe: r.mabienthe || '',
      chitietbienthe: r.chitietbienthe || '',
      total_import: r.total_import || 0,
      total_export: r.total_export || 0,
      import_value: r.import_value || 0,
      revenue_value: r.revenue_value || 0,
      profit_value: r.profit_value || 0,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kho');
    XLSX.writeFile(wb, 'BaoCaoKho.xlsx');
  };

  return (
    <>
      {/* --- Bộ lọc --- */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        {/* Lọc sản phẩm (chỉ theo tên, không hiện biến thể) */}
        <div className="w-1/3">
          <Select
            placeholder="Tìm sản phẩm..."
            options={Array.from(
              new Set(repo.map((r) => r.tensp))
            ).map((name) => ({
              value: name,
              label: name,
            }))}
            onChange={handleSearchChange}
            isClearable
          />
        </div>

        {/* Dropdown tháng (tự động lấy từ prop `months`) */}
        <div className="w-1/5">
          <Select
            placeholder="Chọn tháng..."
            options={(months || []).map((m) => ({ value: m, label: m }))}
            value={selectedMonth ? { value: selectedMonth, label: selectedMonth } : null}
            onChange={handleMonthChange}
            isClearable
          />
        </div>

        <button
          onClick={exportToExcel}
          className="ml-auto bg-pink-400 text-white px-3 py-1 rounded hover:bg-pink-500 transition-colors duration-200"
        >
          Xuất Excel
        </button>
      </div>

      {/* --- Bảng dữ liệu --- */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-pink-100">
            <tr>
              <th className="px-3 py-3">Mã SP</th>
              <th className="px-20 py-3">Tên sản phẩm</th>
              <th className="px-20 py-3">Biến thể</th>
              <th className="px-10 text-center py-3">SL nhập</th>
              <th className="px-10 text-center py-3">SL xuất</th>
              <th className="px-10 text-center py-3">Giá trị nhập</th>
              <th className="px-10 text-center py-3">Giá trị doanh thu</th>
              <th className="px-10 text-center py-3">Tiền lời</th>
            </tr>
          </thead>
          <tbody>
            {currentRepo.map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-3 py-3">{item.masp}</td>
                <td className="px-20 py-3">{item.tensp}</td>
                <td className="px-20 py-3">{item.chitietbienthe || '—'}</td>
                <td className="text-center">{Number(item.total_import ?? 0)}</td>
                <td className="text-center">{Number(item.total_export ?? 0)}</td>
                <td className="text-center">
                  {Number(item.import_value ?? 0).toLocaleString()}
                </td>
                <td className="text-center">
                  {Number(item.revenue_value ?? 0).toLocaleString()}
                </td>
                <td className="text-center font-semibold text-green-700">
                  {Number(item.profit_value ?? 0).toLocaleString()}
                </td>
              </tr>
            ))}

            {/* --- Dòng tổng cộng --- */}
            <tr className="bg-gray-100 font-bold border-t">
              <td colSpan={3} className="text-right pr-3">
                Tổng cộng:
              </td>
              <td className="text-center">{totals.import}</td>
              <td className="text-center">{totals.export}</td>
              <td className="text-center">{totals.importValue.toLocaleString()}</td>
              <td className="text-center">{totals.revenue.toLocaleString()}</td>
              <td className="text-center text-green-700">
                {totals.profit.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Phân trang tùy chỉnh */}
<div className="flex justify-center mt-4 space-x-2 fixed bottom-5 left-[45%] p-2 rounded-md select-none">

  {/* Trang đầu */}
  <button
    onClick={() => handlePageChange(0)}
    disabled={currentPage === 0}
    className={`px-3 py-1 rounded-md font-medium border transition-all duration-200
      ${currentPage === 0
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white text-gray-800 hover:bg-gray-200 cursor-pointer'
      }`}
  >
    Trang đầu
  </button>

  {/* Trước */}
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 0}
    className={`px-3 py-1 rounded-md font-medium border transition-all duration-200
      ${currentPage === 0
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white text-gray-800 hover:bg-gray-200 cursor-pointer'
      }`}
  >
    ← Trước
  </button>

  {/* Số trang */}
  {pageNumbers.map((page) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`mx-1 px-3 py-1 rounded-md border transition-all duration-200
        ${currentPage === page
          ? 'bg-gray-800 text-white font-bold'
          : 'bg-white text-gray-800 hover:bg-gray-200'
        }`}
    >
      {page + 1}
    </button>
  ))}

  {/* Sau */}
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === pageCount - 1}
    className={`px-3 py-1 rounded-md font-medium border transition-all duration-200
      ${currentPage === pageCount - 1
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white text-gray-800 hover:bg-gray-200 cursor-pointer'
      }`}
  >
    Sau →
  </button>

  {/* Trang cuối */}
  <button
    onClick={() => handlePageChange(pageCount - 1)}
    disabled={currentPage === pageCount - 1}
    className={`px-3 py-1 rounded-md font-medium border transition-all duration-200
      ${currentPage === pageCount - 1
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white text-gray-800 hover:bg-gray-200 cursor-pointer'
      }`}
  >
    Trang cuối
  </button>
</div>
    </>
  );
}

/* ===== PropTypes ===== */
TableRepo.propTypes = {
  repo: PropTypes.arrayOf(PropTypes.object),
  months: PropTypes.arrayOf(PropTypes.string),
  onFilterChange: PropTypes.func.isRequired,
};

TableRepo.defaultProps = {
  repo: [],
  months: [],
  onFilterChange: () => {},
};
