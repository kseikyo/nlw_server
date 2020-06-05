import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (request, file, callback) => {
    const hash = crypto.randomBytes(6).toString('hex');

    const fileName = `${hash}-${file.originalname}`;

    callback(null, fileName);
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.jfif') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
    limits:{
        fileSize: 1024 * 1024
    }
});

export default {
  upload
};