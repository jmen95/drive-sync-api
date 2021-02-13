const { google } = require('googleapis');
const config = require('../config');

// Generate a url that asks permissions for Gmail scopes
const GOOGLE_SCOPES = [
	'https://www.googleapis.com/auth/drive.file',
	'https://www.googleapis.com/auth/userinfo.profile',
];

function getOauth2Client() {
	return new google.auth.OAuth2(
		config.googleOauthClientId,
		config.googleOauthClientSecret,
		config.googleOauthRedirectUrl
	);
}

const getToken = async (code) => {
	const { tokens } = await getOauth2Client().getToken(code);
	return tokens;
};

const getUrl = () => {
	return getOauth2Client().generateAuthUrl({
		access_type: 'offline',
		scope: GOOGLE_SCOPES,
	});
};

const oauth2Client = () => {
	const oauth2ClientObj = getOauth2Client();
	oauth2ClientObj.setCredentials({
		refresh_token: config.googleOauthRefreshToken,
		access_token: config.googleOauthAccessToken,
		expiry_date: config.googleOauthTokenExpire,
	});
	return oauth2ClientObj;
};

module.exports = {
	getOauth2Client,
	getToken,
	getUrl,
	oauth2Client,
};
