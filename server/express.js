import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import UserRoutes from './routes/user.routes';
import AuthRoutes from './routes/auth.routes';

import devBundle from './devBundle';

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

devBundle.compile(app);

app
	.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(cookieParser())
	.use(compress())
	.use(helmet())
	.use(cors())
	.use('/', UserRoutes)
	.use('/', AuthRoutes)
	.use((err, req, res, next) => {
		if (err.name === 'UnauthorizedError') {
			res.status(401).json({ 'error': err.name + ': ' + err.message });
		} else if (err) {
			res.status(400).json({ 'error': err.name + ': ' + err.message });
			console.log(err);
		}
	});

export default app;
