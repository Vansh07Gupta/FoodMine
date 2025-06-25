import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public', 'food'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const sanitized = base.replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueName = Date.now() + '-' + sanitized + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  const filename = req.file.filename;
  res.json({ imageUrl: `food/${filename}` });
});

export default router;
