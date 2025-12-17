
# HIRESYNC.INTEL — AI Resume Intelligence Engine

HireSync is a next-generation career intelligence tool that utilizes the **Google Gemini 3 Pro** model to synchronize professional credentials with high-stakes job specifications. It provides quantum-grade semantic alignment, ATS decryption, and automated outreach strategies.

## ✨ Features

- **Neural Compatibility Scoring**: Reverse-engineered ATS scoring using advanced semantic vector analysis.
- **Deep Skill Schema Mapping**: Identifies "Synchronized Nodes" (matched skills) and "Deficit Nodes" (missing critical gaps).
- **Operational Verdict**: A high-impact executive summary and hireability status based on JD alignment.
- **Outreach Intelligence**: 
  - **Direct Hook (Email)**: Tailored cold email templates with subject line patterns.
  - **Network Sync (LinkedIn)**: Personalized connection requests and follow-up sequences.
- **Privacy-First Parsing**: Client-side PDF and DOCX extraction using `PDF.js` and `Mammoth.js`.
- **Recruiter Strategy**: Tactical "Human Selection" nuances to bypass algorithmic noise.

## 🛠️ Technology Stack

- **Frontend**: React (v19)
- **Styling**: Tailwind CSS
- **AI Engine**: @google/genai (Gemini 3 Pro Preview)
- **File Processing**: PDF.js (PDF) & Mammoth.js (DOCX)
- **Icons**: Font Awesome 6
- **Typography**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- A modern web browser.
- A **Google Gemini API Key** (obtained from [Google AI Studio](https://aistudio.google.com/)).

### Environment Setup

The application expects the Gemini API key to be available in the execution context via an environment variable. Ensure your environment is configured with:

```env
API_KEY=your_gemini_api_key_here
```

*Note: In the provided deployment context, this key is automatically injected.*

### Local Development

1.  Treat the project root as the source directory.
2.  Serve the `index.html` file using a local development server (e.g., Live Server, Vite, or a simple python server).
3.  The app uses ES Modules directly via `esm.sh` imports, so no heavy `npm install` is strictly required for basic serving.

## 📖 Usage Guide

1.  **Select Designation**: Enter the target job title you are aiming for.
2.  **Seniority Tier**: Choose your experience level (Fresher to Senior).
3.  **Identity Document**: Upload your resume (PDF, DOCX, or TXT).
4.  **Job Metadata**: Paste the full job description text into the metadata buffer.
5.  **Execute Link**: Click the analysis button to trigger the neural matching process.
6.  **Analyze & Sync**: Review your score, gaps, and use the cloned outreach templates to apply.

## 🛡️ Privacy & Security

HireSync processes resume text locally in the browser before sending the text content to the Google Gemini API. No documents are stored on external servers other than the volatile processing within the Generative AI session.

## ⚖️ License

© 2025 HIRESYNC INTEL SYSTEMS. Developed for high-performance career optimization.
