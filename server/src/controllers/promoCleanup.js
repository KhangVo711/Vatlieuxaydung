import promoModel from "../services/promoModel.js";
import cron from 'node-cron';

const cleanupExpiredPromos = async () => {
    console.log('Cron job running at:', new Date().toLocaleString());
    try {
        const rows = await promoModel.cleanupExpiredPromos();
        console.log('Rows:', rows); // See what’s actually coming back
        console.log(`${rows.affectedRows || 0} expired promotions removed.`);
    } catch (error) {
        console.error('Error cleaning up expired promotions:', error);
    }
};


// Chạy mỗi phút
cron.schedule('* * * * *', cleanupExpiredPromos);


export default {cleanupExpiredPromos};