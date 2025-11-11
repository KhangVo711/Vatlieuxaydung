import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";
import { Context } from "../../Context.jsx";

export default function HeaderUser() {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChangePass, setModalChangePass] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [formChangePass, setFormChangePass] = useState({
    oldPassword: "",
    newPassword: "",
    renewPassword: "",
  });
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [colorMsg, setColorMsg] = useState("");

  // Context
  const { isDataAdmin, isDataStaff } = useContext(Context);


  // Xác định loại người dùng
  const isAdmin = Boolean(isDataAdmin);
  const isStaff = Boolean(isDataStaff);
  const userData = isAdmin ? isDataAdmin : isDataStaff;
  const token = Cookies.get(isAdmin ? "admin" : "staff");
  const id = isAdmin ? userData.maql : userData.manv;

  // Lấy dữ liệu thông tin tài khoản
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = `http://localhost:5001/${isAdmin ? "admin" : "staff"}/get/${id}`;
        const res = await axios.get(url, {
           'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const data = res.data;

        setFormData({
  name: isAdmin ? data.tenql : data.tennv,
  email: isAdmin ? data.email : data.emailnv,
  phone: isAdmin ? data.sdt : data.sdtnv,
  address: isAdmin ? data.diachi : data.diachinv,
  position: isAdmin ? "Quản lý" : data.chucvunv,
  tongluong: isAdmin ? "" : data.tongluong,
  anhdaidien: data.anhdaidien,
});
      } catch (err) {
        console.error(err);
      }
    };
    if (id && token) fetchUser();
  }, [id, token, isAdmin]);



  const toggleDropdown = () => setDropDownOpen(!dropDownOpen);
  const closeModal = () => {
    setModalIsOpen(false);
    setModalUpdate(false);
  };
  const closeChangePass = () => {
    setModalChangePass(false);
    setFormChangePass({ oldPassword: "", newPassword: "", renewPassword: "" });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChangePass = (e) =>
    setFormChangePass({ ...formChangePass, [e.target.name]: e.target.value });

  // Cập nhật thông tin
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isChanged =
      formData.name !== (isAdmin ? isDataAdmin.tenql : isDataStaff.tennv) ||
      formData.phone !== (isAdmin ? isDataAdmin.sdt : isDataStaff.sdtnv) ||
      formData.address !== (isAdmin ? isDataAdmin.diachi : isDataStaff.diachinv);

    if (!isChanged) {
      setMessage("Không có thay đổi nào để cập nhật!");
      setColorMsg("text-yellow-600");
      setModalUpdate(false);
      return;
    }

    try {
      const url = `http://localhost:5001/${isAdmin ? "admin" : "staff"}/update/${id}`;
      await axios.post(
        url,
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setMessage("Cập nhật thành công!");
      setColorMsg("text-green-600");
      setTimeout(() => {
        setMessage("");
        setModalUpdate(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setMessage("Lỗi khi cập nhật!");
      setColorMsg("text-red-600");
    }
  };

  // Đổi mật khẩu
  const handleSubmitChangePass = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, renewPassword } = formChangePass;

    if (newPassword !== renewPassword) {
      setMessage("Mật khẩu mới không khớp!");
      setColorMsg("text-red-600");
      return;
    }

    try {
      const url = `http://localhost:5001/${isAdmin ? "admin" : "staff"}/change-password/${id}`;
      await axios.post(
        url,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      setMessage("Đổi mật khẩu thành công!");
      setColorMsg("text-green-600");
      setFormChangePass({ oldPassword: "", newPassword: "", renewPassword: "" });
    } catch (err) {
      console.error(err);
      setMessage("Lỗi khi đổi mật khẩu!");
      setColorMsg("text-red-600");
    }
  };

  if (!isAdmin && !isStaff) return null;

  const handleAvatarChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("role", isAdmin ? "admin" : "staff");

  try {
    const res = await axios.post(
      `http://localhost:5001/upload-avatar/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFormData((prev) => ({
      ...prev,
      anhdaidien: res.data.anhdaidien,
    }));

    setMessage("Cập nhật ảnh đại diện thành công!");
    setColorMsg("text-green-600");

    setTimeout(() => {
      setMessage("");
    }, 700);
  } catch (err) {
    console.error(err);
    setMessage("Lỗi khi cập nhật ảnh!");
    setColorMsg("text-red-600");
  }
};

  return (
    <div className="sticky top-0 z-40 w-full">
      <div className="w-full h-16 px-3 bg-gray-50 border-b flex items-center justify-end">
        <div className="flex items-center relative mr-5">
          <img
            onClick={toggleDropdown}
            src={
      formData.anhdaidien
        ? `http://localhost:5001${formData.anhdaidien}`
        : "https://cdn.pixabay.com/photo/2024/10/15/02/12/cat-9121108_640.jpg"
    }
            className="w-12 h-12 rounded-full cursor-pointer ml-4"
          />
          {dropDownOpen && (
            <div className="absolute right-0 top-14 bg-white border rounded-lg shadow-lg w-48">
              <a onClick={() => setModalIsOpen(true)} className="block px-4 py-2 hover:bg-gray-100">
                Tài khoản
              </a>
              <a
                onClick={() => setModalChangePass(true)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Đổi mật khẩu
              </a>
              {/* <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => Cookies.remove(isAdmin ? "admin" : "staff")}
              >
                Đăng xuất
              </a> */}
            </div>
          )}
        </div>
      </div>

      {/* Modal tài khoản */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        className="bg-white w-96 p-6 rounded-lg shadow-lg"
      >
        <div className="text-center flex flex-col items-center">
          <div className="relative group">
  <img
    onClick={() => document.getElementById("avatarInput").click()}
    src={
      formData.anhdaidien
        ? `http://localhost:5001${formData.anhdaidien}`
        : "https://cdn.pixabay.com/photo/2024/10/15/02/12/cat-9121108_640.jpg"
    }
    className="w-20 h-20 rounded-full cursor-pointer border-1 border-gray-300 transition-transform duration-200 group-hover:scale-105 group-hover:opacity-70"
    alt="Avatar"
  />
  
  {/* Overlay icon hiện khi hover */}
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
       onClick={() => document.getElementById('avatarInput').click()}>
    <svg xmlns="http://www.w3.org/2000/svg" 
         className="h-6 w-6 text-white bg-black bg-opacity-50 p-1 rounded-full" 
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            d="M3 7h4l2-3h6l2 3h4a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1zm9 3a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  </div>

  <input
    type="file"
    id="avatarInput"
    accept="image/*"
    className="hidden"
    onChange={handleAvatarChange}
  />
</div>

          {message && <p className={`${colorMsg} text-center text-sm`}>{message}</p>}
          <h2 className="text-xl font-semibold mb-2">Thông tin tài khoản</h2>
          <p className="text-gray-500 mb-4">
            {isAdmin ? "Mã quản lý" : "Mã nhân viên"}:{" "}
            <span className="text-gray-700">{id}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isAdmin ? "Tên quản lý" : "Tên nhân viên"}
            </label>
            {modalUpdate ? (
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded-md"
                value={formData.name}
                onChange={handleChange}
              />
            ) : (
              <p className="w-full p-2 border rounded-md">{formData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              value={formData.email}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            {modalUpdate ? (
              <input
                type="text"
                name="phone"
                className="w-full p-2 border rounded-md"
                value={formData.phone}
                onChange={handleChange}
              />
            ) : (
              <p className="w-full p-2 border rounded-md">{formData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            {modalUpdate ? (
              <input
                type="text"
                name="address"
                className="w-full p-2 border rounded-md"
                value={formData.address}
                onChange={handleChange}
              />
            ) : (
              <p className="w-full p-2 border rounded-md">{formData.address}</p>
            )}
          </div>
          {!isAdmin && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Tổng lương</label>
            {modalUpdate ? (
              <input
                type="text"
                name="tongluong"
                className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                value={formData.tongluong}
                readOnly
              />
            ) : (
              <p className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed">{formData.tongluong}</p>
            )}
          </div>
          )}

          {modalUpdate ? (
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
              Lưu thay đổi
            </button>
          ) : (
            <div
              onClick={() => setModalUpdate(true)}
              className="w-full py-2 mt-4 bg-pink-500 text-white text-center rounded-md hover:bg-pink-600 cursor-pointer"
            >
              Cập nhật
            </div>
          )}
        </form>
      </Modal>

      {/* Modal đổi mật khẩu */}
      <Modal
        isOpen={modalChangePass}
        onRequestClose={closeChangePass}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        className="bg-white w-96 p-6 rounded-lg shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Đổi mật khẩu</h2>
          <p className="text-gray-500 mb-4">
            {isAdmin ? "Mã quản lý" : "Mã nhân viên"}:{" "}
            <span className="text-gray-700">{id}</span>
          </p>
        </div>

        <form onSubmit={handleSubmitChangePass} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu cũ</label>
            <input
              type="password"
              name="oldPassword"
              className="w-full p-2 border rounded-md"
              value={formChangePass.oldPassword}
              onChange={handleChangePass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              className="w-full p-2 border rounded-md"
              value={formChangePass.newPassword}
              onChange={handleChangePass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              name="renewPassword"
              className="w-full p-2 border rounded-md"
              value={formChangePass.renewPassword}
              onChange={handleChangePass}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Đồng ý
          </button>
        </form>
      </Modal>
    </div>
  );
}
