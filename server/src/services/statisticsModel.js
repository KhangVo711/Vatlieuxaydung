import connectDB from "../configs/connectDB.js";

const getTotalProductsSold = async () => {
  const [rows] = await connectDB.execute(`
    SELECT 
      COALESCE(SUM(ctdh.soluongsanpham), 0) AS total_products_sold
    FROM chitietdonhang ctdh
    INNER JOIN donhang dh ON ctdh.madh = dh.madh
    WHERE dh.trangthai IN ('Đã xác nhận', 'Đang giao hàng', 'Đã giao hàng')
  `);
  return rows[0].total_products_sold || 0;
};

const getReTract = async () => {
    const [rows] = await connectDB.execute(`
        SELECT 
    dh.madh,
    kh.tenkh,
    SUM(ctdh.soluongsanpham) AS soluongsp,
    dh.tonggia,
    dh.ngaydat
FROM donhang dh
INNER JOIN khachhang kh ON dh.makh = kh.makh
INNER JOIN chitietdonhang ctdh ON dh.madh = ctdh.madh
WHERE dh.trangthai IN ('Đã xác nhận', 'Đang giao hàng', 'Đã giao hàng')
GROUP BY dh.madh, kh.tenkh, dh.tonggia, dh.ngaydat
ORDER BY dh.ngaydat DESC
LIMIT 4;
    `);
    return rows;
};
const getDailyRevenue = async () => {
    const today = new Date();

    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startDate = startOfWeek.toISOString().slice(0, 10);
    const endDate = endOfWeek.toISOString().slice(0, 10);

    const [rows] = await connectDB.execute(`
        SELECT 
            DAYNAME(ngaydat) AS day_of_week,
            SUM(tonggia) AS total_revenue
        FROM donhang
        WHERE DATE(ngaydat) BETWEEN ? AND ?
          AND trangthai IN ('Đã xác nhận', 'Đang giao hàng', 'Đã giao hàng')
        GROUP BY DAYNAME(ngaydat), DAYOFWEEK(ngaydat)
        ORDER BY DAYOFWEEK(ngaydat)
    `, [startDate, endDate]);

    const dayMapping = {
        Monday: 'Thứ Hai',
        Tuesday: 'Thứ Ba',
        Wednesday: 'Thứ Tư',
        Thursday: 'Thứ Năm',
        Friday: 'Thứ Sáu',
        Saturday: 'Thứ Bảy',
        Sunday: 'Chủ Nhật'
    };

    const orderedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return orderedDays.map(day => {
        const row = rows.find(r => r.day_of_week === day) || { total_revenue: 0 };
        return {
            day_of_week: dayMapping[day],
            total_revenue: Number(row.total_revenue)
        };
    });
};


const getDailyProductSales = async () => {
    const today = new Date();

    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startDate = startOfWeek.toISOString().slice(0, 10);
    const endDate = endOfWeek.toISOString().slice(0, 10);

    const [rows] = await connectDB.execute(`
        SELECT 
            DAYNAME(dh.ngaydat) AS day_of_week,
            SUM(ctdh.soluongsanpham) AS total_products_sold
        FROM donhang dh
        INNER JOIN chitietdonhang ctdh 
            ON dh.madh = ctdh.madh
        WHERE DATE(dh.ngaydat) BETWEEN ? AND ?
          AND dh.trangthai IN ('Đã xác nhận', 'Đang giao hàng', 'Đã giao hàng')
        GROUP BY DAYNAME(dh.ngaydat), DAYOFWEEK(dh.ngaydat)
        ORDER BY DAYOFWEEK(dh.ngaydat)
    `, [startDate, endDate]);

    const dayMapping = {
        Monday: 'Thứ Hai',
        Tuesday: 'Thứ Ba',
        Wednesday: 'Thứ Tư',
        Thursday: 'Thứ Năm',
        Friday: 'Thứ Sáu',
        Saturday: 'Thứ Bảy',
        Sunday: 'Chủ Nhật'
    };

    const orderedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return orderedDays.map(day => {
        const row = rows.find(r => r.day_of_week === day) || { total_products_sold: 0 };
        return {
            day_of_week: dayMapping[day],
            total_products_sold: Number(row.total_products_sold)
        };
    });
};



const getTotalReviews = async () => {
    const [rows] = await connectDB.execute(`
        SELECT 
            COUNT(*) AS total_reviews
        FROM 
            binhluan
    `);
    return rows[0].total_reviews || 0; // Trả về 0 nếu không có dữ liệu
};

const getMonthlyRevenue = async () => {
    const [rows] = await connectDB.execute(`
        SELECT 
            MONTH(ngaydat) AS month,
            SUM(tonggia + 0) AS total_revenue
        FROM donhang
        WHERE trangthai IN ('Đã xác nhận', 'Đang giao hàng', 'Đã giao hàng') 
            AND YEAR(ngaydat) = YEAR(CURDATE())
        GROUP BY MONTH(ngaydat)
        ORDER BY MONTH(ngaydat)
    `);

    const months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    return months.map((label, index) => {
        const row = rows.find(r => r.month === index + 1);
        return {
            month: label,
            total_revenue: row ? Number(row.total_revenue) : 0
        };
    });
};



const getRevenueByYear = async () => {
    const [rows] = await connectDB.execute(`
        SELECT 
            YEAR(ngaydat) AS year,
            SUM(tonggia + 0) AS total_revenue
        FROM donhang
        WHERE trangthai IN ('Đã xác nhận', 'Đang giao hàng', 'Đã giao hàng')
        GROUP BY YEAR(ngaydat)
        ORDER BY YEAR(ngaydat)
    `);

    return rows.map(r => ({
        year: r.year,
        total_revenue: Number(r.total_revenue)
    }));
};


export default { getReTract, getDailyRevenue, getDailyProductSales, getTotalProductsSold, getTotalReviews, getMonthlyRevenue, 
    getRevenueByYear   };