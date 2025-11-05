import multer from 'multer';

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
    const allowed = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Unsupported file type'));
}

export const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter });