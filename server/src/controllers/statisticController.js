import express from "express";
import statisticsModel from "../services/statisticsModel.js";
import ExcelJS from "exceljs";
// Style cho tiêu đề
const styleTitle = (sheet, title) => {
    sheet.mergeCells("A1:B1");
    const cell = sheet.getCell("A1");
    cell.value = title;
    cell.font = { size: 16, bold: true };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFECECEC" }
    };
    sheet.getRow(1).height = 30;
};

// Style cho header bảng
const styleHeader = (sheet) => {
    const headerRow = sheet.getRow(3);
    headerRow.eachCell(cell => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF4A90E2" }
        };
        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" }
        };
    });
};

// Style cho dữ liệu
const styleDataRows = (sheet, startRow, endRow) => {
    for (let i = startRow; i <= endRow; i++) {
        const row = sheet.getRow(i);
        row.eachCell(cell => {
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" }
            };
            cell.alignment = { horizontal: "center" };
        });
    }
};


const getTotalReviews = async (req, res) => {
    try {
        const totalReviews = await statisticsModel.getTotalReviews();
        res.status(200).send({ total: totalReviews });
    } catch (error) {
        console.error("Error getting total reviews:", error);
        res.status(500).send({ message: "Lỗi khi lấy tổng số đánh giá cửa hàng." });
    }
};

const getTotalProductsSold = async (req, res) => {
    try {
        const totalProductsSold = await statisticsModel.getTotalProductsSold();
        res.status(200).send({ total: totalProductsSold });
    } catch (error) {
        console.error("Error getting total products sold:", error);
        res.status(500).send({ message: "Lỗi khi lấy tổng số sản phẩm đã bán." });
    }
};

const getReTract = async (req, res) => {
    try {
        const orders = await statisticsModel.getReTract();
        res.status(200).send({ orders: orders });
    } catch (error) {
        console.error("Error getting recent transactions:", error);
        res.status(500).send({ message: "Lỗi khi lấy thông tin giao dịch gần đây." });
    }
};

const getDailyRevenue = async (req, res) => {
    try {
        const revenueData = await statisticsModel.getDailyRevenue();
        res.status(200).send({ revenue: revenueData });
    } catch (error) {
        console.error("Error getting daily revenue:", error);
        res.status(500).send({ message: "Lỗi khi lấy thông tin doanh thu theo ngày." });
    }
};

const getDailyProductSales = async (req, res) => {
    try {
        const salesData = await statisticsModel.getDailyProductSales();
        res.status(200).send({ sales: salesData });
    } catch (error) {
        console.error("Error getting daily product sales:", error);
        res.status(500).send({ message: "Lỗi khi lấy thông tin sản phẩm bán được theo ngày." });
    }
};
const getMonthlyRevenue = async (req, res) => {
    try {
        const data = await statisticsModel.getMonthlyRevenue();
        res.status(200).json({ monthlyRevenue: data });
    } catch (error) {
        console.error("Monthly revenue error:", error);
        res.status(500).json({ message: "Lỗi khi lấy doanh thu theo tháng." });
    }
};

const getRevenueByYear = async (req, res) => {
    try {
        const data = await statisticsModel.getRevenueByYear();
        res.status(200).json({ yearlyRevenue: data });
    } catch (error) {
        console.error("Year revenue error:", error);
        res.status(500).json({ message: "Lỗi khi lấy doanh thu theo năm." });
    }
};

const exportDailyRevenue = async (req, res) => {
    try {
        const rows = await statisticsModel.getDailyRevenue();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Doanh_Thu_Ngay");

        styleTitle(sheet, "BÁO CÁO DOANH THU THEO NGÀY");

// Tự xác định dòng header
const headerRowIndex = sheet.lastRow.number + 1;

// Tạo header
sheet.spliceRows(headerRowIndex, 1, ["Ngày", "Doanh thu (VNĐ)"]);

// Style header
const headerRow = sheet.getRow(headerRowIndex);
headerRow.eachCell(cell => {
    cell.font = { bold: true, color: { argb: "00000000" } };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DDDDDDDD" }
    };
});

// Thêm dữ liệu
rows.forEach(r => {
    sheet.addRow([r.day_of_week, r.total_revenue]);
});

// Format cột doanh thu (cột 2)
sheet.getColumn(2).numFmt = '#,##0" VNĐ"';
sheet.getColumn(1).width = 20;
        sheet.getColumn(2).width = 25;
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=doanh_thu_ngay.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi export Excel ngày");
    }
};


const exportMonthlyRevenue = async (req, res) => {
    try {
        const rows = await statisticsModel.getMonthlyRevenue();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Doanh_Thu_Thang");

        // ====== TITLE ======
        styleTitle(sheet, "BÁO CÁO DOANH THU THEO THÁNG");

        // Xác định dòng header
        const headerRowIndex = sheet.lastRow.number + 1;

        // ====== TẠO HEADER ======
        sheet.spliceRows(headerRowIndex, 1, ["Tháng", "Doanh thu (VNĐ)"]);

        // Style Header
        const headerRow = sheet.getRow(headerRowIndex);
        headerRow.eachCell(cell => {
            cell.font = { bold: true, color: { argb: "00000000" } };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "DDDDDDDD" }
            };
        });

        // ====== THÊM DỮ LIỆU ======
        rows.forEach(r => {
            sheet.addRow([r.month, r.total_revenue]);
        });

        // ====== FORMAT CỘT DOANH THU ======
        sheet.getColumn(2).numFmt = '#,##0" VNĐ"';

        // Set width
        sheet.getColumn(1).width = 20;
        sheet.getColumn(2).width = 25;

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=doanh_thu_thang.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi export Excel tháng");
    }
};




const exportYearRevenue = async (req, res) => {
    try {
        const rows = await statisticsModel.getRevenueByYear();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Doanh_Thu_Nam");

        // ====== TITLE ======
        styleTitle(sheet, "BÁO CÁO DOANH THU THEO NĂM");

        // Xác định dòng header
        const headerRowIndex = sheet.lastRow.number + 1;

        // ====== HEADER ======
        sheet.spliceRows(headerRowIndex, 1, ["Năm", "Doanh thu (VNĐ)"]);

        // Style header
        const headerRow = sheet.getRow(headerRowIndex);
        headerRow.eachCell(cell => {
            cell.font = { bold: true, color: { argb: "00000000" } };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "DDDDDDDD" }
            };
        });

        // ====== DỮ LIỆU ======
        rows.forEach(r => {
            sheet.addRow([r.year, r.total_revenue]);
        });

        // ====== FORMAT CỘT DOANH THU ======
        sheet.getColumn(2).numFmt = '#,##0" VNĐ"';
        sheet.getColumn(1).width = 20;
        sheet.getColumn(2).width = 25;

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=doanh_thu_nam.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi export Excel năm");
    }
};




export default {
    getReTract,
    getDailyRevenue,
    getDailyProductSales,
    getTotalProductsSold,
    getTotalReviews,
    getMonthlyRevenue, 
    getRevenueByYear,
    exportDailyRevenue,
    exportMonthlyRevenue,
    exportYearRevenue
};