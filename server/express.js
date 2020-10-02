import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import MainRouter from '../client/MainRouter';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from './../client/theme';

import UserRoutes from './routes/user.routes';
import AuthRoutes from './routes/auth.routes';

import Template from '../template';

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
			res.status(401).json({ 'error': `${err.name}: ${err.message}` });
		} else if (err) {
			res.status(400).json({ 'error': `${err.name}: ${err.message}` });
			console.log(err);
		}
	});

app.get('*', (req, res) => {
	const sheets = new ServerStyleSheets();
	const context = {};
	const markup = ReactDOMServer.renderToString(
		sheets.collect(
			<StaticRouter location={req.url} context={context}>
				<ThemeProvider theme={theme}>
					<MainRouter/>
				</ThemeProvider>
			</StaticRouter>
		));

	if (context.url) {
		return res.redirect(303, context.url);
	}
	const css = sheets.toString();
	res.status(200).send(Template({
		markup: markup,
		css: css
	}));
});

export default app;
