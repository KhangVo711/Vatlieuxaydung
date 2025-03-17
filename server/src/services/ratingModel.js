import connectDB from "../configs/connectDB.js";

const createRatingStore = async (name, rating, comment, date) => {
    await connectDB.execute("INSERT INTO `danhgiacuahang` VALUES (?, ?, ?, ?)", [name, rating, comment, date]);
}

const getRatingStore = async () => {
    const [rows, field] = await connectDB.execute("SELECT * FROM danhgiacuahang");
    return rows;
}

export default {
    createRatingStore,
    getRatingStore
}