import express from "express";
import user from '../controllers/userControllder.js'
import staff from '../controllers/staffController.js'
import product from '../controllers/productsController.js'
import invoice from '../controllers/invoiceController.js'
import ship from '../controllers/shipController.js'
import promo from '../controllers/promoController.js'
import cart from '../controllers/cartController.js'
import rating from "../controllers/ratingController.js";
import branch from "../controllers/branchController.js";
import statistic from "../controllers/statisticController.js";
import repo from '../controllers/repoController.js'
import uploadMiddleware from '../../middleware/upload.js'
import auth from '../../middleware/jwt.js'
const router = express.Router()
const initWebRoute = (app) => {

    router.post('/loginAdmin', user.loginAdmin)

    router.post('/login', user.getUser)
    router.post('/updateInf/:id', user.updateInf)
    router.get('/getInf/:id', user.getInf)
    router.post('/register/:id', user.insertUser)
    router.post('/changePassword/:id', user.changePassword)
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
    router.get('/getProduct5', product.getProduct5)
    router.get('/getProduct12', product.getProduct12)
    router.post('/editProduct', auth.authMiddleware, uploadMiddleware, product.editProduct)
    router.post('/deleteProduct', auth.authMiddleware, product.deleteProduct)
    router.post('/detailProduct', product.detailProduct)
    router.get('/recommendations', product.getRecommendations);
    router.get('/productImages/:masp', product.getProductImages)

    router.post('/addInvoice', invoice.insertInvoice)
    router.post('/addInvoiceDetail', invoice.insertDetailInvoice)
    router.get('/getInvoice', invoice.showInvoice)
    router.get('/getInvoice/:mapn', invoice.showDetailInvoice)

    router.post('/createCart', cart.insertCart)
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


    // router.get('/getRepoMonthCurrent', repo.getRepoMonthCurrent)
    router.get('/getRepoSumAllMonth', repo.getRepoSumAllMonth)

    router.post('/submitReview', rating.createRatingStore)
    router.get('/getReview', rating.getRatingStore)

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

    return app.use('/', router)
}
export default initWebRoute