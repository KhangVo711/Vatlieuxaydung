import connectDB from "../configs/connectDB.js";

const getTotalProductsSold = async () => {
  const [rows] = await connectDB.execute(`
    SELECT 
      COALESCE(SUM(ctdh.soluongsanpham), 0) AS total_products_sold
    FROM chitietdonhang ctdh
    INNER JOIN donhang dh ON ctdh.madh = dh.madh
    WHERE dh.trangthai = 'Đã xác nhận'
  `);
  return rows[0].total_products_sold || 0;
};

const getReTract = async () => {
    const [rows] = await connectDB.execute(`
        WITH LatestOrders AS (
            SELECT 
                dh.madh, 
                kh.tenkh, 
                SUM(ctdh.soluongsanpham) AS soluongsp, 
                dh.tonggia, 
                dh.ngaydat,
                ROW_NUMBER() OVER (PARTITION BY kh.makh ORDER BY dh.ngaydat DESC) AS rn
            FROM 
                donhang dh
                INNER JOIN khachhang kh ON dh.makh = kh.makh
                INNER JOIN chitietdonhang ctdh ON dh.madh = ctdh.madh
            WHERE dh.trangthai = 'Đã xác nhận'
            GROUP BY 
                dh.madh, kh.tenkh, dh.tonggia, dh.ngaydat, kh.makh
        )
        SELECT 
            madh, 
            tenkh, 
            soluongsp, 
            tonggia, 
            ngaydat
        FROM 
            LatestOrders
        WHERE 
            rn = 1
        ORDER BY 
            ngaydat DESC
        LIMIT 4
    `);
    return rows;
};

const getDailyRevenue = async () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startDate = startOfWeek.toISOString().split('T')[0];
    const endDate = endOfWeek.toISOString().split('T')[0];

    const [rows] = await connectDB.execute(`
        SELECT 
            DAYNAME(ngaydat) AS day_of_week,
            SUM(tonggia) AS total_revenue
        FROM 
            donhang
        WHERE 
            ngaydat BETWEEN ? AND ?
            AND trangthai = 'Đã xác nhận'
        GROUP BY 
            DAYNAME(ngaydat),
            DAYOFWEEK(ngaydat)
        ORDER BY 
            DAYOFWEEK(ngaydat)
    `, [startDate, endDate]);

    const dayMapping = {
        'Monday': 'Thứ Hai',
        'Tuesday': 'Thứ Ba',
        'Wednesday': 'Thứ Tư',
        'Thursday': 'Thứ Năm',
        'Friday': 'Thứ Sáu',
        'Saturday': 'Thứ Bảy',
        'Sunday': 'Chủ Nhật'
    };

    const orderedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return orderedDays.map(day => {
        const row = rows.find(r => r.day_of_week === day) || { day_of_week: day, total_revenue: 0 };
        return {
            day_of_week: dayMapping[day],
            total_revenue: row.total_revenue
        };
    });
};

const getDailyProductSales = async () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startDate = startOfWeek.toISOString().split('T')[0];
    const endDate = endOfWeek.toISOString().split('T')[0];

    const [rows] = await connectDB.execute(`
        SELECT 
            DAYNAME(dh.ngaydat) AS day_of_week,
            SUM(ctdh.soluongsanpham) AS total_products_sold
        FROM 
            donhang dh
            INNER JOIN chitietdonhang ctdh ON dh.madh = ctdh.madh
        WHERE 
            dh.ngaydat BETWEEN ? AND ?
            AND dh.trangthai = 'Đã xác nhận'
        GROUP BY 
            DAYNAME(dh.ngaydat),
            DAYOFWEEK(dh.ngaydat)
        ORDER BY 
            DAYOFWEEK(dh.ngaydat)
    `, [startDate, endDate]);

    const dayMapping = {
        'Monday': 'Thứ Hai',
        'Tuesday': 'Thứ Ba',
        'Wednesday': 'Thứ Tư',
        'Thursday': 'Thứ Năm',
        'Friday': 'Thứ Sáu',
        'Saturday': 'Thứ Bảy',
        'Sunday': 'Chủ Nhật'
    };

    const orderedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return orderedDays.map(day => {
        const row = rows.find(r => r.day_of_week === day) || { day_of_week: day, total_products_sold: 0 };
        return {
            day_of_week: dayMapping[day],
            total_products_sold: row.total_products_sold
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

export default { getReTract, getDailyRevenue, getDailyProductSales, getTotalProductsSold, getTotalReviews };