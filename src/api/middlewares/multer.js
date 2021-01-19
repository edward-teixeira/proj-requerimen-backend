const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { uploadPath } = require('../../config/vars');

exports.storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, uploadPath.toString());
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).replace('.', '');
    const fileName = `${uuidv4()}-${Date.now()}.${ext.toLowerCase()}`;
    cb(null, fileName);
  },
});

exports.fileMaxLimit = (2 * 1024 * 1024); // 2MB

exports.checkExt = (_req, file, cb) => {
  const allowedFileTypes = new RegExp('pdf', 'i');
  const ext = path.extname(file.originalname);
  const isFileValid = allowedFileTypes.test(ext) && allowedFileTypes.test(file.mimetype);

  if (isFileValid) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error(`Allowed Types: ${allowedFileTypes} only`));
  }
};
