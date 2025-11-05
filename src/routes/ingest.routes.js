import { Router } from 'express';
import { cleanText } from '../utils/cleanText.js';
import { extractTextFromBuffer } from '../utils/extractText.js';
import { upload } from '../middleware/upload.js';
import { ai } from '../services/gemini.js';

const router = Router();


router.post('/ingest/file', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file was submitted.");
        }
        const { buffer, mimetype, originalname } = req.file;
        const rawText = await extractTextFromBuffer(buffer, mimetype);
        const cleaned = cleanText(rawText);
        return res.json({
            ok: true,
            kind: 'file',
            filename: originalname,
            mimetype,
            length: cleaned.length,
            text: cleaned
        });
    } catch (error) {
        if (error.message === 'Unsupported file type') {
            return res.status(415).send(error.message);
        }
        return res.status(500).send("Failed to extract text");
    }
})

router.post('/ingest/text', (req, res) => {
    if (!req.body.text || req.body.text.trim().length === 0) {
        return res.status(400).send("Text is missing or illegal.");
    }
    if (req.body.text.length > 200000) {
        return res.status(413).send("Text is too large.");
    }
    const cleaned = cleanText(req.body.text);
    const textLength = cleaned.length;

    return res.json({
        "ok": true,
        "kind": "text",
        "length": textLength,
        "text": cleaned
    })
})

router.post('/summarize', async (req, res) => {
    try {
        if (!req.body.text || req.body.text.trim().length === 0) {
            return res.status(400).send("Text is missing or illegal.");
        }
        const text = req.body.text;
        const language = req.body.language || 'en';
        if (text.length > 200000) {
            return res.status(413).send("Text is too large.");
        }
        const systemMessage = `You are an expert Content Processor and Translator for digital documents. Your sole function is to read the provided text and produce a professional, structured, and highly readable summary in the TARGET LANGUAGE.

        TARGET LANGUAGE: ${language}

        Your output MUST strictly follow these rules:

        1.  **Structure and Format:** The entire output must be in Markdown format only. Do not add any text before the first heading or after the last bullet point.
        2.  **Language Consistency:** The final output must be ENTIRELY in the TARGET LANGUAGE.
        3.  **RTL/LTR Handling (CRITICAL):** When the source contains mixed Hebrew and English:
        a.  **Keep English Terms:** DO NOT translate common acronyms (e.g., AI, LLM) or proper names. Preserve their original English spelling.
        b.  **Maintain Flow:** Translate the surrounding Hebrew text to maintain perfect grammatical and logical coherence in the output (e.g., ensure English terms are naturally embedded in the Hebrew sentence structure).
        4.  **Content Rules:** The summary must be brief, factual, and strictly based *only* on the input text. Do not  introduce outside information or personal opinions.

        Use the appropriate section titles for the selected language (${language}):
        Hebrew: ## תקציר and ## נקודות עיקריות
        English: ## Summary and ## Key Points
        (and so on for other languages).

        Under "## תקציר" (or equivalent), provide 3–5 comprehensive sentences.
        Under "## נקודות עיקריות" (or equivalent), provide 4–7 concise bullet points (each max 1 line).`;
        const userMessage = `Summarize the following text according to these rules:\nReturn only Markdown, nothing else.\nUse the appropriate section titles for the selected language (${language}):\nHebrew: ## תקציר and ## נקודות עיקריות\nEnglish: ## Summary and ## Key Points\nFrench: ## Résumé and ## Points Principaux\n(and so on for other languages).\nUnder “Summary”, write 3–5 short sentences describing the main ideas.\nUnder “Key Points”, provide 4–7 concise bullet points(each ≤ 1 line).\nDo not add any extra headings, text, or formatting before or after these two sections.\nAvoid links, code blocks, quotes, or decorative symbols.\nStay factual and concise. Do not invent information. Here is the text to summarize: ${text}`;
        const fullUserPrompt = `${systemMessage}\n\n[INSTRUCTIONS]: ${userMessage}`;
        const messages = [
            { role: "user", parts: [{ text: fullUserPrompt }] },
        ];
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: messages,
            config: { temperature: 0.3 }
        });
        const markdown = response.text;
        return res.json({
            "ok": true,
            "kind": "summary",
            "mode": "short",
            "markdown": markdown,
            "meta": {
                "language": language,
                "input_length": text.length
            }
        })
    } catch (error) {
        console.error("Gemini API Call Failed:", error);
        return res.status(500).send("Failed to summarize text");
    }
})

export default router;