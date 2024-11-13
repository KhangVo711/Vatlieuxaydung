import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function FormEditProducer({formRefEdit, nameCategory, setNameCategory, email, setEmail, address, setAddress}) {
    return(
        <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>
        <form ref={formRefEdit} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16 ">
        <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Sửa nhà sản xuất</h2>

            <div className="mb-5 flex">
                <div className="w-1/3 mr-1">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã nhà sản xuất</label>
                    <p id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">MC-001</p>
                </div>
                <div className="w-2/3 ml-1">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên nhà sản xuất</label>
                    <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={nameCategory} onChange={(e) => setNameCategory(e.target.value)} />
                </div>
            </div>
            <div className='mb-3'>
                <div className="w-36 relative">
                    <select className="block appearance-none text-sm w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-1.5 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option>Loại sản phẩm</option>
                        <option>Nước sơn</option>
                        <option>Keo dán</option>
                        <option>Gạch</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center text-gray-700">
                        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="text" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                <input type="text" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
         

            <div className='flex items-center justify-center w-full'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đồng ý</button>
            </div>
        </form>
    </div>
    )
}