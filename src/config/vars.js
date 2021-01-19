const path = require('path');
const fs = require('fs/promises');
// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

// Creates static folder in case it's absent
(async () => {
  const staticDirPath = path.join(process.cwd(), process.env.UPLOAD_PATH);
  const dirExists = (await fs.stat(staticDirPath)).isDirectory();
  if (!dirExists) {
    await fs.mkdir(staticDirPath, { recursive: true });
  }
})();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  uploadPath: path.join(process.cwd(), process.env.UPLOAD_PATH),
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
};
