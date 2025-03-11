import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, CreditCard, HelpCircle, Truck, Phone } from "lucide-react";

const PreFooter = ({ selectedProduct }) => {
  // selectedProduct có thể có dạng:
  // { gia: 132000, km: null, maloai: "TP378676", mansx: "DC456782", masp: "TD47237523", soluongsp: 0, tenkm: null, tenloai: "Thực phẩm chức năng", tennsx: "DHC", tensp: "Viên uống trắng da", ttct: "Hoàn toàn phù hợp cho mọi đối tượng" }
  console.log('prefooter', selectedProduct);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedProduct && selectedProduct.maloai) {
      fetchRecommendedProducts(selectedProduct.maloai);
    }
  }, [selectedProduct]);

  // Hàm lấy dữ liệu sản phẩm đề xuất sử dụng fetch
  const fetchRecommendedProducts = async (maloai) => {
    try {
      setIsLoading(true); // Bắt đầu loading
      const params = new URLSearchParams();
      params.append('maloai', maloai);

      const response = await fetch(`http://localhost:5001/recommendations?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Recommended Products:', data);
      setRecommendedProducts(data); // Cập nhật state với dữ liệu trả về
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendedProducts([]); // Nếu lỗi, đặt mảng rỗng
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  console.log('recommendedProducts', recommendedProducts);

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      title: "Vận chuyển miễn phí",
      description: "Miễn phí giao hàng cho đơn hàng trên 2.000.000đ",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-500" />,
      title: "Thanh toán an toàn",
      description: "Nhiều phương thức thanh toán bảo mật",
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-blue-500" />,
      title: "Hỗ trợ 24/7",
      description: "Luôn sẵn sàng hỗ trợ bạn mọi lúc",
    },
    {
      icon: <Phone className="w-8 h-8 text-blue-500" />,
      title: "Đặt hàng qua điện thoại",
      description: "Gọi ngay: 1900 1234 567",
    },
  ];

  // Format giá tiền thành VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="bg-gray-50 py-12 mt-16">
      {/* Thông tin và lợi ích */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sản phẩm tương tự */}
      <div className="container mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold mb-2">Sản phẩm tương tự</h2>
        <p className="text-gray-600 mb-6">
          Dựa trên {selectedProduct?.tensp || "sản phẩm bạn đang xem"}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : recommendedProducts.length === 0 ? (
          <p className="text-gray-500">Không có sản phẩm tương tự nào.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={`http://localhost:5001/uploads/${product.masp}/${product.hinhanh}`}
                    alt={product.tensp}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">{product.tennsx}</div>
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  <p className="text-blue-600 font-semibold mt-1">
                    {formatPrice(product.gia)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreFooter;