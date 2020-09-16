import { config } from '../config/config';
import app from './express';
import mongoose from 'mongoose';

import Template from './../template';

app
	.get('/', ((req, res) => res
			.status(200)
			.send(Template())
	))
	.listen(config.port, (e) => {
		if (e) console.log(e);
		console.info('Server started on port %s.', config.port);
	});

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});
mongoose.connection.on('error', () => {
	throw new Error('Unable to connect to database');
});
