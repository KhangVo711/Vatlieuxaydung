import express from "express";
import user from '../controllers/userControllder.js'
import staff from '../controllers/staffController.js'
import product from '../controllers/productsController.js'
import invoice from '../controllers/invoiceController.js'
import ship from '../controllers/shipController.js'
import promo from '../controllers/promoController.js'
import cart from '../controllers/cartController.js'
import branch from "../controllers/branchController.js";
import statistic from "../controllers/statisticController.js";
import faceController from '../controllers/faceController.js'
import repo from '../controllers/repoController.js'
import contact from '../controllers/contactController.js'
import uploadMiddleware from '../../middleware/upload.js'
import auth from '../../middleware/jwt.js'
import review from '../controllers/reviewCotroller.js';
import discount from '../controllers/discountController.js';
import sendmail from '../controllers/sendmailController.js'
import uploadAvatarMiddleware from "../../middleware/uploadAvatarMiddleware.js";
const router = express.Router()
const initWebRoute = (app) => {

    router.post('/loginAdmin', user.loginAdmin)
    router.get('/admin/get/:maql', user.getAdminInfo)
    router.post("/admin/update/:maql", user.updateInfoAdmin);
    router.post("/admin/change-password/:maql", user.changePasswordAdmin);

    router.post('/login', user.getUser)
    router.post('/updateInf/:id', auth.authMiddleware, user.updateInf)
    router.get('/getInf/:id', user.getInf)
    router.post('/register/:id', user.insertUser)
    router.post('/changePassword/:id', auth.authMiddleware, user.changePassword)
    router.get('/getAllUsers', user.getAllUsers)

    router.post('/addCategory', auth.authMiddleware, product.insertCategory)
    router.get('/getCategory', product.getCategory)
    router.get('/getCategory/:maloai', product.getOneCategory)
    router.post('/editCategory', auth.authMiddleware, product.editCategory)
    router.post('/deleteCategory', auth.authMiddleware, product.deleteCategory)

    router.post('/addProducer', auth.authMiddleware, product.insertNSX)
    router.get('/getProducer', product.getAllNSX)
    router.get('/getProducer/:mansx', product.getNSX)
    router.post('/editProducer', auth.authMiddleware, product.editNSX)
    router.post('/deleteProducer', auth.authMiddleware, product.deleteNSX)


    router.post('/addProduct', auth.authMiddleware, uploadMiddleware, product.insertProducts)
    router.get('/getProduct', product.getAllProduct)
    router.get('/getProductOfCategory/:maloai', product.getProductOfCategory)
    router.get('/getProduct8', product.getProduct8)
    router.get('/getProduct_Hot8', product.getProduct_Hot8)
    router.get('/getProduct5', product.getProduct5)
    router.get('/getProduct12', product.getProduct12)
    router.post("/check-before-order", product.checkBeforeOrder)
    router.get('/getVariant/:masp', product.getVariant)
    router.post('/editProduct', auth.authMiddleware, uploadMiddleware, product.editProduct)
    router.post('/deleteProduct', auth.authMiddleware, product.deleteProduct)
    router.post('/detailProduct', product.detailProduct)
    router.get('/recommendations', product.getRecommendations);
    router.get('/productImages/:masp', product.getProductImages);
    router.get('/search', product.searchProducts);

    router.post('/addInvoice', invoice.insertInvoice)
    router.post('/addInvoiceDetail', invoice.insertDetailInvoice)
    router.get('/getInvoice', invoice.showInvoice)
    router.get('/getInvoice/:mapn', invoice.showDetailInvoice)

    router.post('/createCart', cart.insertCart)
    router.get('/getUserDiscounts', discount.getUserDiscounts);
    router.post('/checkDiscount', discount.checkDiscount);
    router.post("/payos/webhook", cart.payOSWebhook);
    router.get("/orders/get-order-status/:id", cart.getOrderStatus);
    router.post("/orders/create-payos-order", cart.createPayOSOrder);
    router.get("/orders/payment-cancel", cart.paymentCancel);
    router.post('/createCartDetail', cart.insertDetailCart)
    router.get('/getOrder', cart.getCart)
    router.post('/updateStatus', cart.updateStatus)
    router.get('/getDetailOrder/:madh', cart.detailProductInOrder)
    router.get('/getOrderOfUser/:makh', cart.detailOrderOfUser)
    router.post('/insertFormOD', cart.insertFormOD)


    router.post('/addStaff', staff.addStaff)
    router.post('/loginStaff', staff.loginStaff)
    router.get('/getStaff', staff.getAllStaff)
    router.post('/editStaff', staff.editStaff)
    router.post('/deleteStaff', staff.deleteStaff)
    router.get('/shifts', staff.getAllShifts);
    router.post('/addShift', staff.addShift);
    router.post('/updateShiftStaff', staff.updateShiftStaff);
    router.post('/removeStaffFromShift', staff.removeStaffFromShift);
    router.get('/getStaffByShift/:manv', staff.getShifts);

    router.get('/staff/get/:manv', staff.getStaffByMail)
    router.post("/staff/update/:manv", staff.updateInfoStaff);
    router.post("/staff/change-password/:manv", staff.changePasswordStaff);

    router.post('/addDelivery', auth.authMiddleware, ship.addShip)
    router.get('/getDelivery', ship.getAllShip)
    router.get('/getDelivery/:maloai', ship.getOneShip)
    router.post('/editDelivery', auth.authMiddleware, ship.editShip)
    router.post('/deleteDelivery', auth.authMiddleware, ship.deleteShip)

    router.post('/addPromo', auth.authMiddleware, promo.addPromo)
    // router.get('/getPromo', promo.getAllPromo)
    router.get('/getPromo/:makm', promo.getOnePromo)
    router.post('/editPromo', auth.authMiddleware, promo.editPromo)
    router.post('/deletePromo', auth.authMiddleware, promo.deletePromo)
    router.get('/getPromotions', promo.getActivePromos)


    router.get('/getRepo', repo.getRepo)
    router.get('/getAvailableMonths', repo.getMonths);

    router.get('/getBranch', branch.getBranch);
    router.post('/addBranch', auth.authMiddleware, branch.insertBranch);
    router.post('/detailBranch', branch.detailBranch);
    router.get('/getBranch/:id', branch.getOneBranch);
    router.post('/editBranch', auth.authMiddleware, branch.editBranch);
    router.post('/deleteBranch', auth.authMiddleware, branch.deleteBranch);

    router.get('/getReTract', statistic.getReTract);
    router.get('/getDailyRevenue', statistic.getDailyRevenue);
    router.get('/getDailyProductSales', statistic.getDailyProductSales);
    router.get('/getTotalProductsSold', statistic.getTotalProductsSold);
    router.get('/getTotalReviews', statistic.getTotalReviews);
    router.get("/getMonthlyRevenue", statistic.getMonthlyRevenue);
    router.get("/getRevenueByYear", statistic.getRevenueByYear);
    router.get("/export/daily", statistic.exportDailyRevenue);
    router.get("/export/monthly", statistic.exportMonthlyRevenue);
    router.get("/export/yearly", statistic.exportYearRevenue);

    router.post('/send-contact', contact.insertContact)
    router.get('/get-contact', contact.getContact)

    router.post('/chatbot', product.chatbot);
    router.post('/face_register', faceController.faceRegister);
    router.post('/face_recognize', faceController.faceRecognize);

    router.post('/reviews/add', auth.authMiddleware, review.addReview);
    router.get('/reviews/:masp', review.getReviewsByProductId);
    router.get('/admin/reviews', auth.authMiddleware, review.getReview);
    router.put('/admin/reviews/:id/status', auth.authMiddleware, review.updateStatusReview);
    router.post('/admin/reviews/:id/reply', auth.authMiddleware, review.replyReview);

    router.post("/send-mail", sendmail.sendMail);
    router.post("/upload-avatar/:id", uploadAvatarMiddleware, user.uploadAvatar);

    return app.use('/', router)
}
export default initWebRoute