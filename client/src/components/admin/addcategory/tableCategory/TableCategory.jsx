import {  PencilSquareIcon, TrashIcon} from '@heroicons/react/24/solid';

export default function TableCategory({product, handleEditProductClick}) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-4 py-3">
                        Mã loại
                    </th>
                    <th scope="col" className="px-40 py-3">
                        Loại
                    </th>
                   
                    <th scope="col" className="px-1 py-3 ">
                        Hành động
                    </th>
                </tr>
            </thead>
            <tbody>
                {product.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th  scope="row" className="px-4 py-4">
                            {item.code}
                        </th>
                        <td className="px-40 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                        </td>
                        
                      
                        <td className="px-1 py-4 flex">
                            {/* <a href="#" className="transition duration-200 ease-out "><EyeIcon className="h-5 w-5 text-gray-500 dark:text-white hover:text-gray-400" /></a> */}
                            <button onClick={handleEditProductClick} className="transition duration-200 ease-out mx-2"><PencilSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-500 hover:text-blue-400"/></button>
                            <a href="#" className="transition duration-200 ease-out "><TrashIcon className="h-5 w-5 text-red-600 dark:text-red-500 hover:text-red-400" /></a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>

    )
}