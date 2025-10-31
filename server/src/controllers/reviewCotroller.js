import express from "express";
import reviewsModel from "../services/reviewsModel.js";


  // Lấy tất cả đánh giá cho một sản phẩm
const getReviewsByProductId = async (req, res) => {
    const { masp } = req.params;
    try {
      const reviews = await reviewsModel.getReview(masp);
        res.status(200).json(reviews );
        console.log(reviews);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy đánh giá", error });
    }
};

// Thêm đánh giá mới cho một sản phẩm
const addReview = async (req, res) => {
      const { masp, tenkh, sosao, noidung } = req.body;   
      console.log(req.body);
        try {
            const result = await reviewsModel.addReview(masp, tenkh, sosao, noidung);
            res.status(201).json({ message: "Đánh giá đã được thêm", reviewId: result.insertId });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi thêm đánh giá", error });
        }
}


export default { getReviewsByProductId, addReview };