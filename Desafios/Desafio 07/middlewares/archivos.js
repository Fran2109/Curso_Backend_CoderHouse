import multer, { diskStorage } from 'multer';

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        if(req.params.id) {
            cb(null, `${req.params.id}.jpg`)
        } else {
            cb(null, `${Date.now()}.jpg`)
        }
    }
})

const upload = multer({ storage })

const middlewareDeUnArchivo = upload.single('file')

export default { middlewareDeUnArchivo };