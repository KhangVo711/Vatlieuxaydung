import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Feedback() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Thêm các state cho modal gửi mail
  const [selectedEmail, setSelectedEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/get-contact");
        setContacts(response.data.order);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchContacts();
    const intervalId = setInterval(fetchContacts, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSendMail = async () => {
    try {
      await axios.post("http://localhost:5001/send-mail", {
        email: selectedEmail,
        subject,
        message,
      });
      alert("Gửi mail thành công!");
      setShowModal(false);
      setSubject("");
      setMessage("");
    } catch (err) {
      alert("Gửi mail thất bại!");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="h-fit flex flex-col items-center gap-y-3 p-6">
      <h1 className="text-2xl font-bold mb-2 uppercase">Danh sách liên hệ</h1>

      <div className="w-full max-w-7xl shadow-md sm:rounded-lg">
        <div className="overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-pink-100">
              <tr>
                <th className="px-3 py-2">Mã liên hệ</th>
                <th className="px-3 py-2">Tên</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">SĐT</th>
                <th className="px-3 py-2">Chủ đề</th>
                <th className="px-3 py-2">Nội dung</th>
                <th className="px-3 py-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-3 py-2">{item.malienhe}</td>
                  <td className="px-3 py-2">{item.hoten}</td>
                  <td className="px-3 py-2">{item.email}</td>
                  <td className="px-3 py-2">{item.sodienthoai}</td>
                  <td className="px-3 py-2">{item.chude}</td>
                  <td className="px-3 py-2">{item.noidung}</td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => {
                        setSelectedEmail(item.email);
                        setShowModal(true);
                      }}
                      className="bg-pink-500 text-white text-sm px-2 py-1.5 rounded hover:bg-pink-600"
                    >
                      Phản hồi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal gửi mail */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 transition-opacity">
    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all scale-100 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
        <span>Gửi phản hồi</span>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Người nhận
        </label>
        <input
          type="email"
          value={selectedEmail}
          disabled
          className="w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none cursor-not-allowed"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Chủ đề
        </label>
        <input
          type="text"
          placeholder="Nhập chủ đề phản hồi..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Nội dung
        </label>
        <textarea
          placeholder="Nhập nội dung phản hồi chi tiết..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 resize-none focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
      </div>

      <div className="flex justify-center space-x-3">
        {/* <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Hủy
        </button> */}
        <button
          onClick={handleSendMail}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transform transition"
        >
          Gửi phản hồi
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
