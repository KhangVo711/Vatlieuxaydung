import express from "express";
import user from '../controllers/userControllder.js'
import product from '../controllers/productsController.js'
import invoice from '../controllers/invoiceController.js'
import ship from '../controllers/shipController.js'
import cart from '../controllers/cartController.js'
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
    router.get('/getProduct8', product.getProduct8)
    router.get('/getProduct12', product.getProduct12)
    router.post('/editProduct', auth.authMiddleware, uploadMiddleware, product.editProduct)
    router.post('/deleteProduct', auth.authMiddleware, product.deleteProduct)

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

    router.get('/getShip', ship.getShip)
    


    return app.use('/', router)
}
export default initWebRoute