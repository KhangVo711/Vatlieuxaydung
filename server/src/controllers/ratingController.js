import express from "express";
import ratingModel from "../services/ratingModel.js";

const createRatingStore = async (req, res) => {
    const { name, rating, comment, date } = req.body;
    try {
        await ratingModel.createRatingStore(name, rating, comment, date);
        res.status(200).send("Gửi đánh giá thành công");
    } catch (error) {
        res.status(500).send("Lỗi server");
    }
}

const getRatingStore = async (req, res) => {
    try {
        const rate = await ratingModel.getRatingStore();
        res.status(200).send(rate);
    } catch (error) {
        res.status(500).send("Lỗi server");
    }
}

export default {
    createRatingStore,
    getRatingStore
}