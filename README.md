# 🤖 Terminal LangChain Agent (Node.js + OpenRouter)

A powerful, autonomous, terminal-based AI Agent built with **Node.js** and the **LangChain** framework. Powered by the **OpenRouter API**, this CLI tool gives you instant, streaming access to hundreds of open-source and proprietary LLMs (like Claude 3.5 Sonnet, GPT-4o, Llama 3, and Mistral) directly inside your native shell. 

No more web UI context-switching. Just raw, agentic terminal productivity. 🚀

---

## ✨ Features

- **Agentic Reasoning:** Powered by LangChain architecture to handle multi-turn conversations and logical task execution.
- **Multi-Model Freedom:** Access 400+ models via OpenRouter's unified endpoint. Easily swap models on the fly.
- **Terminal Optimized:** Fast, token-streamed responses right in your command line window.
- **Developer First:** Built specifically to help with code generation, rapid debugging, shell command explanations, and technical workflows.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** LangChain (`@langchain/core` / `@langchain/openai` or community packages)
- **API Endpoint:** OpenRouter API

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) (v18 or higher) installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com[your-github-username]/openrouter-langchain-cli.git
cd [your-repo-name]
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory of your project and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### 4. Run the Agent Locally
```bash
npm start
```
*(Tip: Update this command depending on your script execution style, e.g., `node index.js` or if you set up an executable binary symlink using `npm link`)*

---

## ⚙️ Configuration & Usage

To change the active model, open your configuration or update your main execution file to pass your preferred model string from OpenRouter (e.g., `anthropic/claude-3.5-sonnet` or `meta-llama/llama-3-70b-instruct`).

```bash
# Example if you support flags (Optional feature addition):
npm start -- --model claude
```

---

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


---

## ⭐ Show Your Support

If this tool speeds up your workflow or helps your development game, please consider giving this repository a **Star**! It helps the project grow.
