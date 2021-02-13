require('dotenv').config();

module.exports = {
	port: process.env.PORT || 3000,
	nodeEnv: process.env.NODE_ENV || 'development',
	googleOauthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
	googleOauthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
	googleOauthRedirectUrl: process.env.GOOGLE_OAUTH_REDIRECT_URL,
	googleOauthRefreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
	googleOauthAccessToken: process.env.GOOGLE_OAUTH_ACCESS_TOKEN,
	googleOauthTokenExpire: process.env.GOOGLE_OAUTH_TOKEN_EXPIRE,
};
