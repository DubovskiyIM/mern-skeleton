import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
import template from './../template';
import { config } from './config';
import devBundle from './devBundle';

const app = express();

devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();
let port = process.env.PORT || 3000;
const url = process.env.MONGODB_URI || config.secret;

app
	.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
	.get('/', (req, res) => {
		res.status(200).send(template());
	})
	.listen(port, function onStart(err) {
		if (err) {
			console.log(err);
		}
		console.info('Server started on port %s.', port);
	});

MongoClient.connect(
	url,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, db) => {
		console.log('Connected successfully to mongodb server');
		db.close();
	});
