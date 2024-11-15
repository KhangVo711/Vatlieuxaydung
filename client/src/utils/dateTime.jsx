// Thêm hàm formatDateTime để định dạng lại thời gian
export function formatDateTime(isoString) {
    const date = new Date(isoString);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh' // Đổi theo múi giờ Việt Nam
    };
    return date.toLocaleString('en-GB', options).replace(',', '');
}
