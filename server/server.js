import express from 'express';
import 'dotenv/config';
import userConfig from './config/userConfig.js';
import {router} from './routers/userRouter.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);


app.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
});