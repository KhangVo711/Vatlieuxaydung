import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export default function Calendar() {
  const MONTH_NAMES = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const DAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [shiftDate, setShiftDate] = useState('');
  const [shiftType, setShiftType] = useState(null);
  const [luongmoca, setLuongmoca] = useState('');
  const [thuong, setThuong] = useState('');
  const [chiphaphatsinh, setChiphaphatsinh] = useState('');
  const [editLuongmoca, setEditLuongmoca] = useState('');
  const [editThuong, setEditThuong] = useState('');
  const [editChiphaphatsinh, setEditChiphaphatsinh] = useState('');
  const [openShiftModal, setOpenShiftModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [currentShift, setCurrentShift] = useState(null);
  const [viewShifts, setViewShifts] = useState([]);
  const [viewShiftType, setViewShiftType] = useState('');
  const [viewMode, setViewMode] = useState('month');
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);
    return weekStart;
  });

  useEffect(() => {
    if (viewMode === 'month') {
      getNoOfDays();
    }
    fetchStaffList();
    fetchShifts();
  }, [month, year, viewMode]);

  useEffect(() => {
    if (openShiftModal || openEditModal || openViewModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [openShiftModal, openEditModal, openViewModal]);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:5001/getStaff');
      const staff = response.data.staff.map(s => ({
        value: s.manv,
        label: s.tennv,
      }));
      setStaffList(staff);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhân viên:', error);
    }
  };

  const fetchShifts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/shifts');
      setShifts(response.data.shifts);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách ca làm:', error);
    }
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const showShiftModal = (date) => {
    setOpenShiftModal(true);
    setShiftDate(new Date(year, month, date).toDateString());
    setShiftType(null);
    setSelectedStaff([]);
    setLuongmoca('');
    setThuong('');
    setChiphaphatsinh('');
  };

  const addShift = async () => {
    if (!selectedStaff.length || !shiftType) {
      toast.error("Vui lòng chọn nhân viên và ca làm việc!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const token = Cookies.get('admin');
    let giovao, giora;
    const shiftDateObj = new Date(shiftDate);

    if (shiftType.value === 'Sáng') {
      giovao = new Date(shiftDateObj);
      giovao.setHours(6, 0, 0, 0);
      giora = new Date(shiftDateObj);
      giora.setHours(12, 0, 0, 0);
    } else if (shiftType.value === 'Chiều') {
      giovao = new Date(shiftDateObj);
      giovao.setHours(12, 0, 0, 0);
      giora = new Date(shiftDateObj);
      giora.setHours(17, 0, 0, 0);
    } else if (shiftType.value === 'Tối') {
      giovao = new Date(shiftDateObj);
      giovao.setHours(17, 0, 0, 0);
      giora = new Date(shiftDateObj);
      giora.setHours(22, 0, 0, 0);
    }

    const formatDateTimeForMySQL = (date) => {
      const offset = 7 * 60;
      const localDate = new Date(date.getTime() + offset * 60 * 1000);
      return localDate.toISOString().slice(0, 19).replace('T', ' ');
    };

    const shiftData = {
      maca: `CA_${uuidv4().slice(0, 8)}`,
      tenca: `Ca ${shiftType.value}`,
      luongmoca: parseFloat(luongmoca) || 0,
      thuong: parseFloat(thuong) || 0,
      chiphaphatsinh: parseFloat(chiphaphatsinh) || 0,
      giovao: formatDateTimeForMySQL(giovao),
      giora: formatDateTimeForMySQL(giora),
      ngaynghi: null,
      staff: selectedStaff.map(s => s.value),
    };

    try {
      const response = await axios.post('http://localhost:5001/addShift', shiftData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        await fetchShifts();
        handleSuccess();
      }
    } catch (error) {
      console.error('Lỗi khi thêm ca làm:', error);
      handleError();
    }

    setSelectedStaff([]);
    setShiftDate('');
    setShiftType(null);
    setLuongmoca('');
    setThuong('');
    setChiphaphatsinh('');
    setOpenShiftModal(false);
  };

  const showEditModal = (shift) => {
    setCurrentShift(shift);
    setShiftDate(new Date(shift.giovao).toDateString());
    setShiftType({ value: shift.tenca.split(' ')[1], label: shift.tenca.split(' ')[1] });
    setSelectedStaff(staffList.filter(s => shift.staff_names.includes(s.label)));
    setEditLuongmoca(shift.luongmoica);
    setEditThuong(shift.thuong);
    setEditChiphaphatsinh(shift.chiphiphatsinh);
    setOpenEditModal(true);
  };

  const updateShift = async () => {
    if (!selectedStaff.length) {
      toast.error("Vui lòng chọn ít nhất một nhân viên!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const token = Cookies.get('admin');
    const shiftData = {
      maca: currentShift.maca,
      staff: selectedStaff.map(s => s.value),
      luongmoca: editLuongmoca,
      thuong: editThuong || 0,
      chiphaphatsinh: editChiphaphatsinh || 0,
    };

    try {
      const response = await axios.post('http://localhost:5001/updateShiftStaff', shiftData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        await fetchShifts();
        handleSuccess();
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật ca làm:', error);
      handleError();
    }

    setOpenEditModal(false);
    setCurrentShift(null);
    setSelectedStaff([]);
    setEditLuongmoca('');
    setEditThuong('');
    setEditChiphaphatsinh('');
  };

  const removeStaffFromShift = async (manv, maca) => {
    const token = Cookies.get('admin');
    try {
      const response = await axios.post('http://localhost:5001/removeStaffFromShift', { manv, maca }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setViewShifts(prevShifts =>
          prevShifts.map(shift => {
            if (shift.maca === maca) {
              const index = shift.staff_ids.indexOf(manv);
              if (index !== -1) {
                return {
                  ...shift,
                  staff_ids: shift.staff_ids.filter(id => id !== manv),
                  staff_names: shift.staff_names.filter((_, i) => i !== index),
                };
              }
            }
            return shift;
          }).filter(shift => shift.staff_ids.length > 0)
        );
        await fetchShifts();
        handleSuccess();
      }
    } catch (error) {
      console.error('Lỗi khi xóa nhân viên khỏi ca làm:', error);
      handleError();
    }
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
    const blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  function formatDateTimeVN(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d)) return "";
  return new Intl.DateTimeFormat('vi-VN', {
    // day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  }).format(d); 
}

  const isSameDate = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const getShiftType = (giovao) => {
    const hour = new Date(giovao).getHours();
    if (hour >= 6 && hour < 12) return 'Sáng';
    if (hour >= 12 && hour < 17) return 'Chiều';
    if (hour >= 17 && hour < 22) return 'Tối';
    return '';
  };

  const showViewModal = (date, type) => {
    const calendarDate = new Date(year, month, date);
    const filteredShifts = shifts.filter(shift => {
      const shiftDate = new Date(shift.giovaoca);
      const shiftType = getShiftType(shift.giovaoca);
      return isSameDate(shiftDate, calendarDate) && shiftType === type;
    });
    setViewShifts(filteredShifts);
    setViewShiftType(type);
    setOpenViewModal(true);
  };

  const shiftTypeOptions = [
    { value: 'Sáng', label: 'Sáng (6:00 AM - 12:00 PM)' },
    { value: 'Chiều', label: 'Chiều (12:00 PM - 5:00 PM)' },
    { value: 'Tối', label: 'Tối (5:00 PM - 10:00 PM)' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#d1d5db',
      backgroundColor: '#f9fafb',
      padding: '0.5px',
      borderRadius: '0.2rem',
      '&:hover': {
        borderColor: '#f472b6',
      },
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f472b6' : state.isFocused ? '#fce7f3' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: '#fce7f3',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#374151',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
  };

  const handleSuccess = () => {
    toast.success("Thành công!", {
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

  const showWeeklyView = () => {
    setViewMode('week');
  };

  const navigateWeek = (direction) => {
    const newWeek = new Date(selectedWeek);
    newWeek.setDate(selectedWeek.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(newWeek);
  };

  const getShiftsForDateAndType = (date, type) => {
    return shifts.filter(shift => {
      const shiftDate = new Date(shift.giovaoca);
      const shiftType = getShiftType(shift.giovaoca);
      return isSameDate(shiftDate, date) && shiftType === type;
    });
  };

  const renderWeeklyView = () => {
    if (!selectedWeek) return null;
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(selectedWeek);
      day.setDate(selectedWeek.getDate() + i);
      return day;
    });

    return (
      <div className="container mx-auto py-2 w-11/12">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex items-center justify-between py-2 px-6">
            <div>
              <span className="text-lg font-bold text-gray-800">Tuần từ {weekDays[0].toLocaleDateString('vi-VN')} đến {weekDays[6].toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1.5 px-3 rounded-md"
                onClick={() => navigateWeek('prev')}
              >
                Tuần trước
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1.5 px-3 rounded-md"
                onClick={() => navigateWeek('next')}
              >
                Tuần sau
              </button>
              <button
                className="bg-pink-500 hover:bg-pink-400 text-white font-semibold py-1.5 px-3 rounded-md"
                onClick={() => setViewMode('month')}
              >
                Xem tháng
              </button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-50">Ca</th>
                  {weekDays.map((day, index) => (
                    <th key={index} className="border p-2 bg-pink-100 text-center">
                      {DAYS[day.getDay()]}<br />
                      {day.toLocaleDateString('vi-VN')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['Sáng', 'Chiều', 'Tối'].map((shiftType) => (
                  <tr key={shiftType}>
                    <td className="border p-2 text-center font-bold bg-pink-100">{shiftType}</td>
                    {weekDays.map((day, index) => (
                      <td key={index} className="border p-2">
                        {getShiftsForDateAndType(day, shiftType).map((shift, i) => (
                          <div key={i} className="mb-2">
                            <p className="text-sm text-center font-semibold">
                              {new Date(shift.giovaoca).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(shift.gioraca).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {shift.staff_names.map((name, j) => (
                              <p key={j} className="text-xs text-center font-bold mt-1 text-gray-600">{name}</p>
                            ))}
                            
                              <p className="text-xs font-semibold mt-1 text-gray-600"><span className='font-bold'>Giờ vào:</span> {formatDateTimeVN(shift.checkin)}</p>
                              <p className="text-xs font-semibold mt-1 text-gray-600"><span className='font-bold mr-2'>Giờ ra:</span> {formatDateTimeVN(shift.checkout)}</p>
                              <p className="text-xs font-semibold mt-1 text-gray-600"><span className='font-bold'>Tổng giờ làm:</span> {Math.ceil(shift.giolam * 10) / 10} giờ</p>
                            <button
                              onClick={() => showEditModal(shift)}
                              className="text-pink-500 text-xs hover:underline"
                            >
                              Chỉnh sửa
                            </button>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="antialiased sans-serif border-l h-screen bg-gray-50">
        {viewMode === 'month' ? (
          <div className="container mx-auto py-2 w-11/12">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex items-center justify-between py-2 px-6">
                <div>
                  <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
                  <span className="ml-1 text-lg text-gray-600 font-normal">năm {year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="border rounded-lg px-1" style={{ paddingTop: '2px' }}>
                    <button
                      type="button"
                      className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center ${month === 0 ? 'cursor-not-allowed opacity-25' : ''}`}
                      disabled={month === 0}
                      onClick={() => setMonth(month - 1)}
                    >
                      <svg className="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="border-r inline-flex h-6"></div>
                    <button
                      type="button"
                      className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 ${month === 11 ? 'cursor-not-allowed opacity-25' : ''}`}
                      disabled={month === 11}
                      onClick={() => setMonth(month + 1)}
                    >
                      <svg className="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <button
                    className="bg-pink-500 hover:bg-pink-400 text-white font-semibold py-1.5 px-3 rounded-md"
                    onClick={showWeeklyView}
                  >
                    Xem tuần
                  </button>
                </div>
              </div>

              <div className="-mx-1 -mb-1">
                <div className="flex flex-wrap" style={{ marginBottom: '-40px' }}>
                  {DAYS.map((day) => (
                    <div key={day} style={{ width: '14.26%' }} className="px-2 py-2">
                      <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                        {day}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap border-t border-l">
                  {blankDays.map((_, i) => (
                    <div
                      key={`blank-${i}`}
                      style={{ width: '14.28%', height: '150px' }}
                      className="text-center border-r border-b px-4 pt-2"
                    ></div>
                  ))}
                  {noOfDays.map((date) => (
                    <div
                      key={date}
                      style={{ width: '14.28%', height: '150px' }}
                      className="px-4 pt-2 border-r border-b relative"
                    >
                      <div
                        onClick={() => showShiftModal(date)}
                        className={`inline-flex w-6 h-6 items-center justify-center select-none text-center leading-none rounded-full transition ease-in-out duration-100 ${
                          isToday(date) ? 'bg-pink-500 text-white' : 'text-gray-700'
                        }`}
                      >
                        {date}
                      </div>
                      <div>
                        <button type='button' onClick={() => showShiftModal(date)} className="absolute top-3 font-bold bg-pink-200 px-1 right-2 text-xs rounded-sm py-0.5 text-gray-500 hover:bg-pink-300 transition duration-100 ease-in-out">
                          Xếp ca
                        </button>
                      </div>
                      <div className="mt-2 flex flex-col space-y-1">
                        {['Sáng', 'Chiều', 'Tối'].map((type) => {
                          const shift = getShiftsForDateAndType(new Date(year, month, date), type);
                          return (
                            <div key={type} className="flex items-center space-x-2">
                              <button
                                onClick={() => showViewModal(date, type)}
                                className={`text-xs w-10 py-1 rounded text-center ${
                                  type === 'Sáng' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                                  type === 'Chiều' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                                  'bg-purple-100 text-purple-800 hover:bg-purple-200'
                                }`}
                              >
                                {type}
                              </button>
                              {shift.length > 0 && (
                                <div className="text-xs select-none text-gray-600 truncate">
                                  {shift[0].staff_names.join(', ')}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-600 text-center py-2">
                <span className="font-semibold text-red-600">Lưu ý:</span> Nhấn vào thêm ca để thêm ca làm việc. Nhấn vào ca để xem chi tiết.
              </p>
            </div>
      
          </div>
        ) : (
          renderWeeklyView()
        )}

        {openShiftModal && (
          <div className="fixed h-screen inset-0 z-20 flex items-center justify-center bg-black bg-opacity-10">
            <div className="p-4 max-w-xl ml-96 w-full mx-4 relative">
              <div
                className="absolute right-2.5 top-2.5 w-7 h-7 rounded-full bg-red-400 text-gray-50 hover:scale-110 hover:bg-red-500 transition duration-150 ease-in-out inline-flex items-center justify-center cursor-pointer transform translate-x-2 -translate-y-2"
                onClick={() => setOpenShiftModal(false)}
              >
                <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                </svg>
              </div>

              <div className="shadow w-full rounded-sm overflow-hidden block p-8 max-h-[80vh] overflow-y-auto bg-gray-100">
                <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Thêm ca làm việc</h2>
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Chọn nhân viên</label>
                  <Select
                    options={staffList}
                    value={selectedStaff}
                    onChange={setSelectedStaff}
                    placeholder="Chọn nhân viên"
                    className="w-full"
                    isMulti
                    styles={customStyles}
                  />
                </div>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
                  type="hidden"
                  value={shiftDate}
                  readOnly
                />
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Chọn ca</label>
                  <Select
                    options={shiftTypeOptions}
                    value={shiftType}
                    onChange={setShiftType}
                    placeholder="Chọn ca"
                    className="w-full"
                    styles={customStyles}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Lương (VNĐ)</label>
                  <input
                    className="bg-gray-50 appearance-none border-2 border-gray-200 rounded-sm w-full pt-2 pb-1.5 px-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-500"
                    type="text"
                    value={luongmoca}
                    onChange={(e) => setLuongmoca(e.target.value)}
                    placeholder="Nhập lương"
                  />
                </div>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full pt-2 pb-1.5 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
                  type="hidden"
                  value={thuong}
                  onChange={(e) => setThuong(e.target.value)}
                  placeholder="Nhập thưởng"
                />
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full pt-2 pb-1.5 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
                  type="hidden"
                  value={chiphaphatsinh}
                  onChange={(e) => setChiphaphatsinh(e.target.value)}
                  placeholder="Nhập chi phí phát sinh"
                />
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-1.5 px-2 border border-gray-300 rounded-md shadow-sm mr-2 transition duration-150 ease-in-out"
                    onClick={() => setOpenShiftModal(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="bg-pink-500 hover:bg-pink-400 text-white font-semibold py-1.5 px-2 border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                    onClick={addShift}
                  >
                    Lưu ca làm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {openEditModal && (
          <div className="fixed h-screen inset-0 z-20 flex items-center justify-center bg-black bg-opacity-10">
            <div className="p-4 max-w-xl ml-96 w-full mx-4 relative">
              <div
                className="absolute right-2.5 top-2.5 w-7 h-7 rounded-full bg-red-400 text-gray-50 hover:bg-red-500 hover:scale-110 transition duration-150 ease-in-out inline-flex items-center justify-center cursor-pointer transform translate-x-2 -translate-y-2"
                onClick={() => setOpenEditModal(false)}
              >
                <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                </svg>
              </div>

              <div className="shadow w-full rounded-lg bg-gray-100 overflow-hidden block p-8 max-h-[80vh] overflow-y-auto">
                <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Chỉnh sửa ca làm việc</h2>
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Chọn nhân viên</label>
                  <Select
                    options={staffList}
                    value={selectedStaff}
                    onChange={setSelectedStaff}
                    placeholder="Chọn nhân viên"
                    className="w-full"
                    isMulti
                    styles={customStyles}
                  />
                </div>
                <input
                  className="bg-gray-50 appearance-none border-2 border-gray-100 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
                  type="hidden"
                  value={shiftDate}
                  readOnly
                />
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Ca</label>
                  <p className="bg-gray-100 appearance-none border border-gray-300 rounded-sm w-full pt-2 pb-1.5 px-4 text-gray-700 leading-tight">
                    {shiftType ? shiftType.value : ''}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Lương (VNĐ)</label>
                  <input
                    className="bg-gray-50 appearance-none border border-gray-300 rounded-sm w-full pt-2 pb-1.5 px-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-500"
                    type="text"
                    value={editLuongmoca}
                    onChange={(e) => setEditLuongmoca(e.target.value)}
                    placeholder="Nhập lương"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Thưởng (VNĐ)</label>
                  <input
                    className="bg-gray-50 appearance-none border border-gray-300 rounded-sm w-full pt-2 pb-1.5 px-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-500"
                    type="text"
                    value={editThuong}
                    onChange={(e) => setEditThuong(e.target.value)}
                    placeholder="Nhập thưởng"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Chi phí phát sinh (VNĐ)</label>
                  <input
                    className="bg-gray-50 appearance-none border border-gray-300 rounded-sm w-full pt-2 pb-1.5 px-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-500"
                    type="text"
                    value={editChiphaphatsinh}
                    onChange={(e) => setEditChiphaphatsinh(e.target.value)}
                    placeholder="Nhập chi phí phát sinh"
                  />
                </div>
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-1.5 px-3 border border-gray-300 rounded-md shadow-sm mr-2 transition duration-150 ease-in-out"
                    onClick={() => setOpenEditModal(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="bg-pink-500 hover:bg-pink-400 text-white font-semibold py-1.5 px-3 border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                    onClick={updateShift}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {openViewModal && (
          <div className="fixed h-screen inset-0 z-20 flex items-center justify-center bg-black bg-opacity-10">
            <div className="p-4 max-w-xl ml-96 w-full mx-4 relative">
              <div
                className="absolute right-2.5 top-2.5 w-7 h-7 rounded-full bg-red-400 text-gray-50 hover:bg-red-500 hover:scale-110 transition duration-150 ease-in-out inline-flex items-center justify-center cursor-pointer transform translate-x-2 -translate-y-2"
                onClick={() => setOpenViewModal(false)}
              >
                <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                </svg>
              </div>

              <div className="shadow w-full rounded-lg bg-white overflow-hidden block p-8 max-h-[80vh] overflow-y-auto">
                <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Danh sách nhân viên ca {viewShiftType}</h2>
                {viewShifts.length > 0 ? (
                  viewShifts.map((shift, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {new Date(shift.giovaoca).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(shift.gioraca).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <button
                          onClick={() => {
                            setOpenViewModal(false);
                            showEditModal(shift);
                          }}
                          className="text-pink-500 text-xs hover:underline"
                        >
                          Chỉnh sửa
                        </button>
                      </div>
                      {shift.staff_names.map((staffName, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center px-2 py-1 rounded-lg mt-1 overflow-hidden border border-pink-200 bg-pink-100"
                        >
                          <p className="text-sm truncate leading-tight">{staffName}</p>
                          <button
                            onClick={() => {
                              removeStaffFromShift(shift.staff_ids[index], shift.maca);
                            }}
                            className="text-red-500 text-xs hover:underline"
                          >
                            Xóa
                          </button>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Không có nhân viên nào trong ca này.</p>
                )}
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold py-1.5 px-3 border border-gray-300 rounded-md shadow-sm transition duration-150 ease-in-out"
                    onClick={() => setOpenViewModal(false)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}