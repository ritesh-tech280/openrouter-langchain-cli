import "dotenv/config";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { visitPage, webSearch } from "./tools/index.js";

// ── Validate required env vars ──────────────────────────────────────
const required = ["OPENROUTER_API_KEY", "TAVILY_API_KEY"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`\n❌ Missing environment variables: ${missing.join(", ")}`);
  console.error("   Copy .env.example to .env and fill in your keys.\n");
  process.exit(1);
}

// ── Configurable model (env var or default) ─────────────────────────
const model = process.env.MODEL || "openai/gpt-oss-20b";

// ── Create the agent ────────────────────────────────────────────────
const agent = createAgent({
  model: new ChatOpenAI({
    model,
    streaming: true,
    apiKey: process.env.OPENROUTER_API_KEY,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  }),
  tools: [webSearch, visitPage],
  systemPrompt:
    "You are a helpful assistant. Answer clearly and keep replies short. you also have visit_page for urls , web_search for general search",
});

// ── REPL with conversation memory ───────────────────────────────────
const rl = readline.createInterface({ input, output });
const history = [];

console.log(`\n🤖 Chat Agent (model: ${model})`);
console.log("   Type 'exit' to quit.\n");

while (true) {
  const question = await rl.question("You: ");

  if (question.trim().toLowerCase() === "exit") break;
  if (!question.trim()) continue;

  history.push({ role: "human", content: question });

  try {
    const result = await agent.stream(
      { messages: history },
      { streamMode: "messages" },
    );

    let fullResponse = "";
    process.stdout.write("Agent: ");
    for await (const [token] of result) {
      if (token.type !== "ai" || typeof token.content !== "string") continue;
      process.stdout.write(token.content);
      fullResponse += token.content;
    }
    console.log("\n");

    history.push({ role: "assistant", content: fullResponse });
  } catch (err) {
    console.error(`\n⚠️  Error: ${err.message}\n`);
    // Remove the failed question from history so the conversation stays clean
    history.pop();
  }
}

rl.close();
