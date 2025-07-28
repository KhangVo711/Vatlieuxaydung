import { console } from "inspector";

const criteriaMap = {
  son: ["loaimoi", "loaison", "tongda", "tongmauson"],
  "sữa rửa mặt": ["skinType"],
  kem: ["skinConcern", "texture", "skinType"],
  "kem chống nắng": ["spf", "skinType", "texture"],
  // thêm loại khác nếu cần
};

/**
 * Kiểm tra đã có đủ thông tin để lọc sản phẩm chưa
 * @param {Object} params - Tham số từ Dialogflow
 * @returns {Boolean}
 */
export const hasEnoughCriteria = (params) => {
  const category = params.product?.toLowerCase() || "";
console.log("hasEnoughCriteria", category, params);
  for (const [key, fields] of Object.entries(criteriaMap)) {
    if (category.includes(key)) {
      const filled = fields.filter((f) => !!params[f]).length;

      if (key === "son") return filled >= 3; // với son cần >= 3 thông tin
      if (key === "sữa rửa mặt") return filled >= 1;
      if (key === "kem chống nắng") return filled >= 2;

      return filled >= 1;
    }
  }

  return false;
};
