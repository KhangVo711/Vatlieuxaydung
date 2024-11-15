export default function ViewProducer({formRefView, selectedProducer}) {
    return(
        <div className="w-full absolute h-screen bg-black bg-opacity-10 top-0 right-1/2 translate-x-1/2 flex items-center">
                    <div ref={formRefView} className="w-5/12 mx-auto bg-gray-100 shadow-lg border rounded py-5 px-8 mt-16 ">
        <h2 className='mb-4 uppercase font-bold tracking-wider text-lg text-center'>Thông tin nhà sản xuất</h2>

                        <div className="mb-3 flex">
                            <div className="w-1/3 mr-1">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Mã nhà sản xuất
                                </label>
                                <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    {selectedProducer.mansx}
                                </p>
                            </div>
                            <div className="w-2/3 ml-1">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Tên nhà sản xuất
                                </label>
                                <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    {selectedProducer.tennsx}
                                </p>
                            </div>
                        </div>
                      
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                {selectedProducer.email}
                            </p>
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Địa chỉ
                            </label>
                            <p className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                {selectedProducer.diachi}
                            </p>
                        </div>
                    </div>
                </div>
    )
}