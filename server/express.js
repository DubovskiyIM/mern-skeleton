import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(cookieParser())
	.use(compress())
	.use(helmet())
	.use(cors());

export default app;
