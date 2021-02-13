const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const config = require('./utils/config');
const googleAuth = require('./utils/google/google-auth');
const { uploadFiles } = require('./utils/google/drive-config');

const app = express();
const server = http.Server(app);

const PORT = config.port;

app.get('/', (req, res) => {
	res.send('Welcome');
});

function upload() {
	return new Promise(async (resolve, reject) => {
		try {
			const filesPath = path.join(__dirname, './files/');
			const files = await fs.promises.readdir(filesPath);
			const requests = [];
			files.forEach((fileName) => {
				const filePath = filesPath + fileName;
				requests.push(uploadFiles(filePath, fileName));
			});
			const result = await Promise.all(requests);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
}

app.get('/upload', async (req, res) => {
	try {
		const result = await upload();
		res.send(result);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.get('/google/config-oauth2', (req, res) => {
	const url = googleAuth.getUrl();
	res.redirect(url);
});

app.get('/google/callback', async (req, res) => {
	try {
		const { code } = req.query;
		const token = await googleAuth.getToken(code);
		res.send(token);
	} catch (error) {
		res.status(400).send(error);
	}
});

server.listen(PORT, function (err) {
	if (err) {
		console.log('err', err);
	} else {
		console.log('listening on port ' + PORT);
	}
});
