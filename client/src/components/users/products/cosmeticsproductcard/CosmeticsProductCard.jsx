import React, { useState, useEffect } from 'react';

export default function CosmeticsProductCard() {
  const products = [
    {
      id: 1,
      title: "Kem chống nắng",
      subtitle: "Bảo vệ da khỏi tia UV",
      bgColor: "bg-black/10",
      imageUrl: "http://img.websosanh.vn/v2/users/review/images/top-3-loai-kem-chong-nang-skin/yb02w5f987n86.jpg",
    },
    {
      id: 2,
      title: "Thực phẩm chức năng",
      subtitle: "Chăm sóc sức khỏe hàng ngày",
      bgColor: "bg-black/10",
      imageUrl: "https://media.hasaki.vn/wysiwyg/HaNguyen1/vien-uong-dhc-bo-sung-vitamin-c-1.jpg",
    },
    {
      id: 3,
      title: "Bộ cọ trang điểm",
      subtitle: "Chất lượng cao cấp",
      bgColor: "bg-black/10",
      imageUrl: "https://media.hcdn.vn/wysiwyg/HaNguyen/co-danh-nen-vacosi-foundation-brush-1.jpg",
    },
    {
      id: 4,
      title: "Son siêu lì",
      subtitle: "Màu sắc tươi sáng",
      bgColor: "bg-black/10",
      imageUrl: "https://dep.com.vn/wp-content/uploads/2018/11/43002345_708298966203974_1534028840902814832_n-1.jpg",
    },
    {
      id: 5,
      title: "Sữa rửa mặt trị mụn",
      subtitle: "Dành cho da dầu mụn",
      bgColor: "bg-black/10",
      imageUrl: "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/review_sua_rua_mat_hatomugi_1_eb3c4579e7.jpg",
    },
    {
      id: 6,
      title: "Sữa tắm dưỡng ẩm",
      subtitle: "Dành cho da khô",
      bgColor: "bg-black/20",
      imageUrl: "https://tesori.vn/wp-content/uploads/2022/09/t4.jpg",
    },

  ];

  // Create an extended array of products for infinite scrolling
  const extendedProducts = [...products, ...products.slice(0, 3)];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const visibleItems = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < products.length) {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, products.length]);

  useEffect(() => {
    if (currentIndex === products.length) {
      // When we reach the end, we need to reset to the beginning without animation
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(0);
        
        // Re-enable transitions after a brief delay
        const resetTimeout = setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
        
        return () => clearTimeout(resetTimeout);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, products.length]);

  return (
    <div className="w-full overflow-hidden p-6 mt-10">
      <div 
        className={`flex ${isTransitioning ? 'transition-none' : 'transition-transform duration-500 ease-in-out'}`}
        style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
      >
        {extendedProducts.map((product, index) => (
          <div 
            key={`${product.id}-${index}`}
            className="relative rounded-lg overflow-hidden shadow-md flex-shrink-0 group" 
            style={{ width: `calc(${100 / visibleItems}% - 20px)`, marginRight: '20px' }}
          >
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-60 object-cover transition-transform duration-300"
            />
            <div className={`absolute inset-0 opacity-70 ${product.bgColor}`}></div>
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-6">
              <h3 className="text-white text-2xl uppercase tracking-wider font-semibold mb-1 drop-shadow-2xl">{product.title}</h3>
              <p className="text-white text-sm font-medium drop-shadow-2xl">{product.subtitle}</p>
            </div> */}
          </div>
        ))}
      </div>
      
      {/* <div className="flex justify-center mt-4">
        {Array.from({ length: products.length }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
}