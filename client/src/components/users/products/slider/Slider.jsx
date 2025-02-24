import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";



// Image data array
const images= [
  {
    src: 'https://topprint.vn/wp-content/uploads/2021/07/banner-my-pham-dep-9.jpg',
  },
  {
    src: 'https://hali.vn/wp-content/uploads/2020/07/thiet-ke-banner-my-pham34-e1594687755631.jpg',
  },
  {
    src: 'https://cdn.brvn.vn/editor_news/2020/07/20676_Cocoonmyphamthuanchay_2_1595824804.jpeg',
  },
];

// Content data array
const contents= [
  { 
    title: 'Sản phẩm chăm sóc da cao cấp', 
    content: 'Khám phá bộ sưu tập mỹ phẩm thiên nhiên giúp nuôi dưỡng làn da khỏe đẹp, rạng rỡ. Sản phẩm được chọn lọc kỹ lưỡng, an toàn và phù hợp cho mọi loại da. Tận hưởng trải nghiệm chăm sóc da chuyên sâu với công thức dịu nhẹ nhưng hiệu quả. Để vẻ đẹp tự nhiên của bạn tỏa sáng, hãy bắt đầu hành trình chăm sóc da hoàn hảo ngay hôm nay.',
    link: '#' 
  },
  { 
    title: 'Sản phẩm được yêu thích nhất', 
    content: 'Khám phá dòng kem dưỡng ẩm cao cấp giúp làn da mềm mại, căng mịn và tràn đầy sức sống. Với chiết xuất thiên nhiên và công thức độc quyền, sản phẩm giúp dưỡng ẩm sâu và bảo vệ da suốt cả ngày. Cảm nhận sự thay đổi rõ rệt chỉ sau vài lần sử dụng. Hãy để làn da bạn luôn rạng rỡ và cuốn hút. Sản phẩm phù hợp với mọi loại da, an toàn và không gây kích ứng.',
    link: '#' 
  },
  { 
    title: 'Bộ sưu tập chăm sóc tóc thiên nhiên', 
    content: 'Trải nghiệm dòng sản phẩm dưỡng tóc chiết xuất từ thiên nhiên, giúp nuôi dưỡng và phục hồi mái tóc một cách tối ưu. Từ tinh chất bưởi, dưa leo và các thành phần hữu cơ, sản phẩm giúp cấp ẩm, giảm gãy rụng và kích thích mọc tóc hiệu quả. Không chỉ mang lại mái tóc mềm mượt và chắc khỏe, mà còn an toàn, lành tính cho da đầu. Cảm nhận sự suôn mượt và sức sống rạng ngời sau mỗi lần sử dụng. Hãy để mái tóc bạn được yêu thương và chăm sóc trọn vẹn mỗi ngày.',
    link: '#' 
  },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Ref for animation targets
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  // Function to show the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Animation for content change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -60 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      );
    }
  }, [currentIndex]);
  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, },
        { opacity: 1, duration: 1.5, ease: "linear" }
      );
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full mx-auto ">
      <div
        className="relative h-[560px] w-full group"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <img
    src={images[currentIndex].src}
    alt={`Slider Image ${currentIndex + 1}`}

    className="transition-all w-full h-full object-cover duration-500 ease-in-out cursor-pointer"
  />
  <div className="absolute inset-0 bg-black opacity-40 pointer-events-none "></div>
        <div className="absolute top-1/4 text-white w-1/2 pl-36">
          <h2 ref={titleRef} className="uppercase text-4xl drop-shadow-2xl mb-4 font-semibold">
            {contents[currentIndex].title}
          </h2>
          <p ref={contentRef} className="text-justify text-md mb-7 drop-shadow-2xl">
            {contents[currentIndex].content}
          </p>
          <div ref={buttonRef}  >
          <Link to={contents[currentIndex].link}
           className="bg-gray-50 shadow-lg text-black rounded-sm px-3 py-2 text-sm font-semibold transition ease-in-out duration-300 hover:bg-gray-300">
              Xem ngay
  
          </Link>
          </div>
        </div>
      </div>
      <button
        className="absolute outline-none transition ease-in-out duration-200 left-0 top-1/2 transform rounded-xl py-3 hover:bg-gray-50 mx-1 -mt-[10px] -translate-y-1/2 text-white px-1.5 group"
        onClick={prevSlide}
      >
        <ChevronLeftIcon className="text-gray-200 w-8 h-8 transition ease-in-out duration-200 group-hover:text-black" />
      </button>
      <button
        className="absolute outline-none transition ease-in-out duration-200 right-0 top-1/2 transform rounded-xl py-3 hover:bg-gray-50 mx-1 -mt-[10px] -translate-y-1/2 text-white px-1.5 group"
        onClick={nextSlide}
      >
        <ChevronRightIcon className="text-gray-200 w-8 h-8 transition ease-in-out duration-200 group-hover:text-black" />
      </button>
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-black rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}
