// File ContactForm.js
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!formData.message.trim()) errors.message = 'Vui lòng nhập nội dung';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // Thay console.log bằng logic gửi dữ liệu thực tế (ví dụ: API call)
      console.log('Form data submitted:', formData);
      setIsSubmitted(true);
      setFormErrors({});
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
          Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Họ và tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full py-1.5 px-3 border rounded-md shadow-sm  focus:outline-pink-400 focus:ring-pink-500 ${
            formErrors.name ? 'border-red-500' : ''
          }`}
        />
        {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full py-1.5 px-3 rounded-md border border-gray-300 shadow-sm focus:outline-pink-400 focus:ring-pink-500 ${
            formErrors.email ? 'border-red-500' : ''
          }`}
        />
        {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Số điện thoại <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md py-1.5 px-3 border border-gray-300 shadow-sm focus:outline-pink-400 focus:ring-pink-500 ${
            formErrors.phone ? 'border-red-500' : ''
          }`}
        />
        {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Chủ đề
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md py-1.5 px-3 border border-gray-300 shadow-sm focus:outline-pink-400 focus:ring-pink-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Nội dung <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={`mt-1 block w-full rounded-md py-1.5 px-3 border border-gray-300 shadow-sm focus:outline-pink-400 focus:ring-pink-500 ${
            formErrors.message ? 'border-red-500' : ''
          }`}
        ></textarea>
        {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors"
        >
          Gửi Tin Nhắn
        </button>
      </div>
    </form>
  );
};

export default ContactForm;