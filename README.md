# 🚀 SmartRead: AI-Powered Document Summarizer

![GitHub last commit](https://img.shields.io/github/last-commit/YOUR_USERNAME/smartread)
![GitHub repo size](https://img.shields.io/github/repo-size/YOUR_USERNAME/smartread)
![Language Count](https://img.shields.io/github/languages/count/YOUR_USERNAME/smartread)

## 🌟 Overview

**SmartRead** is a full-stack web application designed to simplify information consumption by summarizing complex documents and text using Large Language Models (LLMs). This project was developed by Ran Johanan as a personal portfolio piece, demonstrating proficiency in both modern frontend development (React) and robust backend architecture (Node.js/Express).

## ✨ Features

* **File Ingestion:** Supports uploading and processing of common document formats: **PDF**, **DOCX**, and **TXT**.
* **AI Summarization:** Utilizes the **Gemini API** for high-quality, contextual, and multi-language summarization.
* **Multi-Language Support:** Summarizes content into various target languages (e.g., Hebrew, English, Japanese).
* **RTL/LTR Handling:** Advanced prompting ensures accurate and grammatically coherent summarization even when the source text contains mixed Right-to-Left (Hebrew) and Left-to-Right (English) languages.
* **Client-Side Experience:** Clean, responsive UI built with React for instant feedback and a smooth user experience.
* **Error Handling:** Robust server-side logic handles file format errors, text length limitations (200K chars), and API service availability.

## 🛠️ Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Backend Runtime** | Node.js | Server environment for high-performance operations. |
| **Web Framework** | Express.js | Routing, middleware, and API endpoint management. |
| **AI/LLM** | **Gemini API** (`@google/genai`) | Core summarization engine. |
| **Text Extraction** | `pdf-parse`, `mammoth` | Library dependencies for text extraction from documents. |
| **Frontend** | React (Standalone Script) | Interactive UI and State Management. |
| **Deployment** | (To be added: GitHub Pages / Vercel / Netlify) | Hosting for live demo. |

## ⚙️ Setup and Installation

Follow these steps to set up and run the SmartRead project locally.

### Prerequisites

* Node.js (v18+) and npm
* A **Gemini API Key** (Obtained from Google AI Studio)

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone YOUR_GITHUB_REPO_LINK_HERE
    cd smartread
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the root directory and add your API key:
    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    PORT=3000
    ```

4.  **Run the Server:**
    Start the application in development mode (using nodemon for automatic restarts):
    ```bash
    npm run dev
    ```

5.  **Access the Application:**
    Open your browser and navigate to: `http://localhost:3000`

## 👤 Author

**Ran Johanan**
