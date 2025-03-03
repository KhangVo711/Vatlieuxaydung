import express from "express";
import repoModel from "../services/repoModel.js";

const getRepoMonthCurrent = async (req, res) => {
    try {
        const repo = await repoModel.getRepoMonthCurrent();
        res.status(200).send({ repo: repo });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy dữ liệu" });
    }
}
const getRepoSumAllMonth = async (req, res) => {
    try {
        const repo = await repoModel.getRepoSumAllMonth();
        res.status(200).send({ repo: repo });
    }
    catch (error) {
        res.status(500).send({ message: "Đã xảy ra lỗi khi lấy dữ liệu" });
    }
}

export default { getRepoMonthCurrent, getRepoSumAllMonth };