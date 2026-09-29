# 🤖 Terminal LangChain Agent (Node.js + OpenRouter)

A powerful, autonomous, terminal-based AI Agent built with **Node.js** and the **LangChain** framework. Powered by the **OpenRouter API**, this CLI tool gives you instant, streaming access to hundreds of open-source and proprietary LLMs (like Claude 3.5 Sonnet, GPT-4o, Llama 3, and Mistral) directly inside your native shell. 

No more web UI context-switching. Just raw, agentic terminal productivity. 🚀

---

## ✨ Features

- **Agentic Reasoning:** Powered by LangChain architecture to handle multi-turn conversations and logical task execution.
- **Conversation Memory:** Remembers the full conversation context across turns.
- **Multi-Model Freedom:** Access 400+ models via OpenRouter's unified endpoint. Easily swap models via env var.
- **Terminal Optimized:** Fast, token-streamed responses right in your command line window.
- **Web Tools:** Built-in web search and page extraction powered by Tavily.
- **Notion Workflow:** A LangGraph-powered pipeline that researches a topic and saves study notes to Notion.
- **Developer First:** Built specifically to help with code generation, rapid debugging, shell command explanations, and technical workflows.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** LangChain / LangGraph
- **API Endpoint:** OpenRouter API
- **Web Search:** Tavily API
- **Note Storage:** Notion API

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) (v18 or higher) installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/SHAROZ221/openrouter-langchain-cli.git
cd openrouter-langchain-cli
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Copy the example env file and fill in your API keys:

```bash
cp .env.example .env
```

| Variable | Required For | Get It From |
|---|---|---|
| `OPENROUTER_API_KEY` | Chat Agent + Notes | [openrouter.ai/keys](https://openrouter.ai/keys) |
| `TAVILY_API_KEY` | Web Search | [app.tavily.com](https://app.tavily.com) |
| `NOTION_API_KEY` | Notes Workflow | [notion.so/my-integrations](https://www.notion.so/my-integrations) |
| `NOTION_PAGE_ID` | Notes Workflow | Your Notion page URL |
| `MODEL` | Optional | [openrouter.ai/models](https://openrouter.ai/models) |

### 4. Run the Chat Agent
```bash
npm start
```

### 5. Run the Notes Workflow
```bash
npm run notes
```

---

## ⚙️ Configuration

### Switching Models

Set the `MODEL` environment variable in your `.env` file:

```env
# Examples:
MODEL=anthropic/claude-3.5-sonnet
MODEL=meta-llama/llama-3-70b-instruct
MODEL=google/gemini-pro-1.5
```

If not set, defaults to `openai/gpt-oss-20b`.

---

## 📁 Project Structure

```
openrouter-langchain-cli/
├── src/
│   ├── index.js              # Chat agent entry point
│   ├── tools/
│   │   └── index.js          # Web search & page extraction tools
│   └── workflows/
│       └── index.js          # LangGraph Notion notes workflow
├── .env.example              # Environment variable template
├── .gitignore
├── package.json
└── README.md
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

## ⭐ Show Your Support

If this tool speeds up your workflow or helps your development game, please consider giving this repository a **Star**! It helps the project grow.
