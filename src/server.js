import express from 'express';
import router from './routes/ingest.routes.js';
import { env } from './config/env.js';
import { log } from './utils/logger.js';

const app = express();
app.use(express.json({ limit: '5mb' }));

app.use('/', router);

app.use(express.static('frontend-cdn'));

app.listen(env.port, () => {
    log(`Server listening on http://localhost:${env.port}`);
});

//For errors check - put on the catch section:
// console.error('OpenAI call failed:', {name: error?.name,status: error?.status || error?.response?.status,message: error?.message,data: error?.response?.data || error?.error || null,});const status = error?.status || error?.response?.status || 500;if (status === 401) return res.status(401).json({ error: 'Invalid or missing OpenAI API key' });if (status === 429) return res.status(429).json({ error: 'Rate limited, try again later' });if (status === 404 || status === 400 || status === 403) {return res.status(status).json({ error: 'OpenAI request failed', details: error?.message });}return res.status(500).json({ error: 'Failed to summarize text' });