import express from "express";

const router = express.Router()
const initWebRoute = (app) => {
    
    return app.use('/', router)
}
export default initWebRoute