import React, { useState } from 'react';
import axios from 'axios';

const generateContactId = () => `FO${Date.now()}${Math.floor(Math.random() * 10)}`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    contactid: generateContactId(),
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setIsLoading(true); 
      try {
        const response = await axios.post('http://localhost:5001/send-contact', {
          malienhe: formData.contactid,
          hoten: formData.name,
          email: formData.email,
          sodienthoai: formData.phone,
          chude: formData.subject,
          noidung: formData.message,
        },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      withCredentials: true
      });

        setIsSubmitted(true);
        setFormErrors({});
        setFormData({
          contactid: generateContactId(), 
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setIsSubmitted(false), 5000); 
      } catch (error) {
        // Xử lý lỗi từ server
        console.error('Error submitting form:', error);
        if (error.response) {
          setFormErrors({ submit: error.response.data.message || 'Có lỗi xảy ra khi gửi dữ liệu.' });
        } else {
          setFormErrors({ submit: 'Không thể kết nối đến server.' });
        }
      } finally {
        setIsLoading(false); 
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
          Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
        </div>
      )}
      {formErrors.submit && (
        <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-lg text-center">
          {formErrors.submit}
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
          disabled={isLoading} 
          className={`mt-1 block w-full py-1.5 px-3 border rounded-md shadow-sm focus:outline-pink-400 focus:ring-pink-500 ${
            formErrors.name ? 'border-red-500' : ''
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          disabled={isLoading}
          className={`mt-1 block w-full py-1.5 px-3 rounded-md border border-gray-300 shadow-sm focus:outline-pink-400 focus:ring-pink-500 ${
            formErrors.email ? 'border-red-500' : ''
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          disabled={isLoading}
          className={`mt-1 block w-full rounded-md py-1.5 px-3 border border-gray-300 shadow-sm focus:outline-pink-400 focus:ring-pink-500 ${
            formErrors.phone ? 'border-red-500' : ''
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
          disabled={isLoading}
          className={`mt-1 block w-full rounded-md py-1.5 px-3 border border-gray-300 shadow-sm focus:outline-pink-400 focus:ring-pink-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
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
          disabled={isLoading}
          className={`mt-1 block w-full rounded-md py-1.5 px-3 border border-gray-300 shadow-sm focus:outline-pink-400 focus:ring-pink-500 ${
            formErrors.message ? 'border-red-500' : ''
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        ></textarea>
        {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-md text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
            isLoading
              ? 'bg-pink-300 cursor-not-allowed'
              : 'bg-pink-500 hover:bg-pink-700'
          }`}
        >
          {isLoading ? 'Đang gửi...' : 'Gửi'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;