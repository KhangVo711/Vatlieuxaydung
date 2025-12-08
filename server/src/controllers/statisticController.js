import express from "express";
import statisticsModel from "../services/statisticsModel.js";

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
export default {
    getReTract,
    getDailyRevenue,
    getDailyProductSales,
    getTotalProductsSold,
    getTotalReviews,
    getMonthlyRevenue, 
    getRevenueByYear
};