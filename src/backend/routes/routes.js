import { Router } from 'express';
import apiController from '../controllers/apiController.js'
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, '../../public/images');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
            });
const upload = multer({ storage: storage,
                        fileFilter: (req, file, cb) => {
                            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                            cb(null, true);
                            } else {
                            cb(new Error('Invalid file type'));
                            }
                        }
    });

router.get('/events', apiController.getEvents);
router.post('/events', upload.single('file'),apiController.postEvents);

export default router;