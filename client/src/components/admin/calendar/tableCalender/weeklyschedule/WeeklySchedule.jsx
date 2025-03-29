import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Context } from '../../../../Context.jsx';

export default function WeeklySchedule() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [weekDays, setWeekDays] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [staffId, setStaffId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDataStaff } = useContext(Context);

  const convertToVietnamTime = (dateString) => {
    return new Date(dateString);
  };

  const getWeekDates = (weekOffset) => {
    const baseDate = new Date(2025, 2, 24);
    const startOfWeek = new Date(baseDate.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000);
    const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek.getTime() + i * 24 * 60 * 60 * 1000);
      return {
        label: `${dayNames[i]} (${date.toLocaleDateString('vi-VN')})`,
        date,
      };
    });
  };

  const fetchShifts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = Cookies.get('staff');
      const manv = isDataStaff.manv;
      if (!manv) throw new Error('Không tìm thấy mã nhân viên. Vui lòng đăng nhập lại.');
      
      const response = await axios.get(`http://localhost:5001/getStaffByShift/${manv}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      
      console.log('Dữ liệu ca làm việc từ API:', response.data.shifts);
      setShifts(response.data.shifts);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách ca làm:', error);
      setError('Không thể tải lịch làm việc. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Cookies.get('staff') && isDataStaff.manv) {
      setStaffId(isDataStaff.manv);
      fetchShifts();
    } else {
      setError('Vui lòng đăng nhập để xem lịch làm việc.');
      setLoading(false);
    }
  }, [isDataStaff]);

  useEffect(() => {
    const newWeekDays = getWeekDates(currentWeek);
    setWeekDays(newWeekDays);
    if (staffId && shifts.length > 0) {
      setScheduleData(getScheduleData(newWeekDays));
    }
  }, [currentWeek, shifts, staffId]);

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getShiftType = (tenca) => {
    if (tenca.includes('Ca Sáng')) return 'morning';
    if (tenca.includes('Ca Chiều')) return 'afternoon';
    if (tenca.includes('Ca Tối')) return 'evening';
    return '';
  };

  const getScheduleData = (weekDays) => {
    return weekDays.map((day) => {
      const dayShifts = shifts.filter((shift) => {
        if (!shift.giovaoca) return false;
        const shiftDate = convertToVietnamTime(shift.giovaoca);
        return isSameDate(shiftDate, day.date);
      });

      const schedule = { day: day.label, morning: [], afternoon: [], evening: [] };
      dayShifts.forEach((shift) => {
        const type = getShiftType(shift.tenca);
        if (type) {
          schedule[type].push({
            subject: shift.tenca,
            code: shift.maca,
            thuong: shift.thuong ? `Thưởng: ${shift.thuong} VNĐ` : '',
            chiphiphatsinh: shift.chiphiphatsinh ? `Chi phí phát sinh: ${shift.chiphiphatsinh} VNĐ` : '',
            time: `${convertToVietnamTime(shift.giovaoca).toLocaleTimeString('vi-VN')} - ${convertToVietnamTime(shift.gioraca).toLocaleTimeString('vi-VN')}`,
            salary: shift.luongmoica ? `Lương: ${shift.luongmoica} VNĐ` : 'N/A',
          });
        }
      });

      return schedule;
    });
  };

  if (loading) return <div className="text-center p-4">Đang tải lịch làm việc...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container h-3/4 mx-auto p-4">
      <div className="flex justify-between mb-4 mt-4">
        <button onClick={() => setCurrentWeek((prev) => prev - 1)} className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded transition duration-150 ease-in-out">Tuần trước</button>
        <button onClick={() => setCurrentWeek((prev) => prev + 1)} className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded transition duration-150 ease-in-out">Tuần sau</button>
      </div>
      <div className="border rounded-lg h-full overflow-x-auto">
        <table className="w-full h-full text-sm">
          <thead>
            <tr className="bg-pink-50">
              <th className="p-2 border">Ca làm</th>
              {weekDays.map((day, index) => <th key={index} className="p-2 border">{day.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {['morning', 'afternoon', 'evening'].map((session) => (
              <tr key={session}>
                <td className="p-2 text-center border font-bold">{session === 'morning' ? 'Sáng' : session === 'afternoon' ? 'Chiều' : 'Tối'}</td>
                {scheduleData.map((day, index) => (
                  <td key={index} className="p-2 border h-1/3 bg-gray-50/65">
                    {day[session].map((shift, shiftIndex) => (
                      <div key={shiftIndex} className="mb-2 bg-pink-100 flex flex-col p-2 rounded shadow-sm items-center h-3/4">
                        <p className="font-bold uppercase tracking-wider mb-1">{shift.subject}</p>
                        <p className="font-semibold text-xs mb-0.5">({shift.code})</p>
                        <p className="text-xs mb-3">{shift.time}</p>
                        <p className="text-xs text-gray-500">{shift.salary}</p>
                        <p className="text-xs text-gray-500">{shift.thuong}</p>
                        <p className="text-xs text-gray-500">{shift.chiphiphatsinh}</p>
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
  );
}
