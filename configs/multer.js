import multer from "multer";
import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tempcsvfile')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'text/csv'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export const uploadtempfile = multer({ storage, fileFilter }).single('file');

export const deletetempfile = async (filePath) => {
    filePath = path.join(fs.realpathSync('.'), '.', filePath);
    fs.unlinkSync(filePath, err => { return err });
};