import express from 'express';
import dotenv from 'dotenv';
import initWebRoute from './route/webRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'

// Lấy đường dẫn của tệp hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200,
    credentials: true 
}));


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

initWebRoute(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
