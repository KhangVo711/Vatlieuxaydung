import { Link } from 'react-router-dom';
export default function NotFound() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-xl w-full p-4">
          <div className="relative h-40 leading-[150px] mb-6">
            <h1 className="font-bold text-[186px] bg-clip-text text-transparent bg-cover bg-center" style={{ backgroundImage: 'url("/img/text.jpg")' }}>
              404
            </h1>
          </div>
          <h2 className="font-bold text-2xl">Rất tiếc! Không thể tìm thấy trang này</h2>
          <p className="uppercase font-medium text-sm mb-0">Xin lỗi nhưng trang bạn đang tìm kiếm không tồn tại, đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.</p>
          <Link href="/" className="mt-6 inline-block uppercase bg-blue-500 text-white font-bold py-2 px-10 text-sm rounded-sm hover:opacity-80 transition duration-200">
            Đi tới trang chủ
          </Link>
        </div>
      </div>
    );
  }
  