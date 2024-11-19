import { Link } from "react-router-dom";

export default function Banner() {
    return (
        <div
        className="relative h-[350px] sm:h-[380px] md:h-[480px] lg:h-[600px] overflow-hidden !bg-[url('http://econaur.com/wp-content/uploads/2021/05/Building-Materials.jpg')] bg-cover bg-center bg-no-repeat">
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center flex-col px-4 sm:px-6 md:px-12 text-center text-white">
              <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold">Vật liệu xây dựng</h1>
              <h3 className="mb-8 w-full sm:w-2/3 md:w-1/2 text-base sm:text-lg md:text-xl font-bold">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.
              </h3>
              <Link to="/products"
                type="button"
                className="inline-block border-2 rounded-sm border-neutral-50 px-4 sm:px-6 pb-2 sm:pb-3 pt-2 sm:pt-3 text-xs sm:text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600">
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}