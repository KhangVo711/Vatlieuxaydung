
export default function FormAddCategory({formRef}) {
    return (
        <div className='w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center'>
                    
                    <form ref={formRef} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16 ">
                    <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Thêm loại</h2>

                        <div className="mb-3">
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã loại</label>
                            <input type="text" id="code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên loại</label>
                            <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>

                        <div className='flex items-center justify-center w-full'>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thêm</button>
                        </div>
                    </form>
                </div>
    )
}