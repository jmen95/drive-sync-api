const { google } = require('googleapis');
const mime = require('mime-types');
const fs = require('fs');
const googleAuth = require('./google-auth');

const drive = google.drive({ version: 'v3', auth: googleAuth.oauth2Client() });

function uploadFiles(filePath, fileName) {
	return new Promise((resolve, reject) => {
		try {
			const folderId = '1YV1FJVI6R8ewh5b6Xiws8GHF-tf4VzeI';
			const fileMetadata = {
				name: fileName,
				parents: [folderId],
			};
			const media = {
				mimeType: mime.lookup(filePath),
				body: fs.createReadStream(filePath),
			};

			drive.files.create(
				{
					resource: fileMetadata,
					media: media,
					fields: 'id',
				},
				function (err, file) {
					if (err) {
						// Handle error
						console.error(err);
						reject(err);
					} else {
						console.log('File Id: ', file.id);
						resolve({ success: true });
					}
				}
			);
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = {
	drive,
	uploadFiles,
};
