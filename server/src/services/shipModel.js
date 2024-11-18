import connectDB from "../configs/connectDB.js";

const getShip = async () => {
    const [rows, fields] = await connectDB.execute(
        `SELECT * FROM donvivanchuyen WHERE madvvc = 'EX-9712'`);
    return rows[0];
}

export default { getShip };