import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { DOMMatrix, ImageData, Path2D } = require('canvas');
global.DOMMatrix = DOMMatrix;
global.ImageData = ImageData;
global.Path2D = Path2D;
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

export async function extractTextFromBuffer(buffer, mimetype) {
    if (mimetype === 'application/pdf') {
        const data = await pdfParse(buffer);
        return data.text || ' ';
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const result = await mammoth.extractRawText({ buffer });
        return result.value || ' ';
    } else if (mimetype === 'text/plain') {
        return buffer.toString('utf8') || ' ';
    } else {
        throw new Error('Unsupported file type');
    }
}