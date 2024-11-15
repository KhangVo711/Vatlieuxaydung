import express from "express";
import user from '../controllers/userControllder.js'
import product from '../controllers/productsController.js'
import uploadMiddleware from '../../middleware/upload.js'
const router = express.Router()
const initWebRoute = (app) => {

    router.post('/loginAdmin', user.loginAdmin)
    
    router.post('/login', user.getUser)
    router.post('/updateInf/:id', user.updateInf)
    router.get('/getInf/:id', user.getInf)
    router.post('/register/:id', user.insertUser)
    router.post('/changePassword/:id', user.changePassword)

    router.post('/addCategory', product.insertCategory)
    router.get('/getCategory', product.getCategory)
    router.get('/getCategory/:maloai', product.getOneCategory)
    router.post('/editCategory', product.editCategory)
    router.post('/deleteCategory', product.deleteCategory)

    router.post('/addProducer', product.insertNSX)
    router.get('/getProducer', product.getAllNSX)
    router.get('/getProducer/:mansx', product.getNSX)
    router.post('/editProducer', product.editNSX)
    router.post('/deleteProducer', product.deleteNSX)

    router.post('/addProduct', uploadMiddleware, product.insertProducts)
    router.get('/getProduct', product.getAllProduct)
    router.post('/editProduct', uploadMiddleware, product.editProduct)
    router.post('/deleteProduct', product.deleteProduct)

    return app.use('/', router)
}
export default initWebRoute