import multer from 'multer';
import fs from 'fs';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync('./public/uploads', { recursive: true });
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
})

const upload = multer({ storage: storage });

export default upload;