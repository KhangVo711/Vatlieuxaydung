import express from "express";
import user from '../controllers/userControllder.js'
const router = express.Router()
const initWebRoute = (app) => {
    
    router.post('/login', user.getUser)
    router.post('/updateInf/:id', user.updateInf)
    router.get('/getInf/:id', user.getInf)
    router.post('/register/:id', user.insertUser)
    router.post('/changePassword/:id', user.changePassword)

    return app.use('/', router)
}
export default initWebRoute