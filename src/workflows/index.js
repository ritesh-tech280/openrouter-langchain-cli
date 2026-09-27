import "dotenv/config";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { tavily } from "@tavily/core";
import { ChatOpenAI } from "@langchain/openai";
import { StateGraph, StateSchema, START, END } from "@langchain/langgraph";
import * as z from "zod";

// ── Validate required env vars ──────────────────────────────────────
const required = [
  "OPENROUTER_API_KEY",
  "TAVILY_API_KEY",
  "NOTION_API_KEY",
  "NOTION_PAGE_ID",
];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`\n❌ Missing environment variables: ${missing.join(", ")}`);
  console.error("   Copy .env.example to .env and fill in your keys.\n");
  process.exit(1);
}

// ── Use OpenRouter (consistent with the rest of the project) ────────
const model = process.env.MODEL || "openai/gpt-oss-20b";

const llm = new ChatOpenAI({
  model,
  temperature: 0,
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

// ── LangGraph State ─────────────────────────────────────────────────
const State = new StateSchema({
  topic: z.string(),
  notes: z.string().default(""),
  notionUrl: z.string().default(""),
});

// ── Nodes ───────────────────────────────────────────────────────────
async function writeNotes(state) {
  try {
    const search = await tvly.search(state.topic, { maxResults: 5 });
    const research = JSON.stringify(search.results ?? []);

    const reply = await llm.invoke(
      `Write in-depth study notes on: ${state.topic}\n\nWeb research:\n${research}\n\nUse markdown with headings and bullet points.`,
    );

    return { notes: reply.content };
  } catch (err) {
    console.error(`\n⚠️  Error generating notes: ${err.message}`);
    return { notes: `Error: Could not generate notes — ${err.message}` };
  }
}

async function saveToNotion(state) {
  if (state.notes.startsWith("Error:")) {
    return { notionUrl: "(skipped — notes generation failed)" };
  }

  try {
    const blocks = [];
    for (let i = 0; i < state.notes.length; i += 2000) {
      blocks.push({
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: state.notes.slice(i, i + 2000) },
            },
          ],
        },
      });
    }

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { page_id: process.env.NOTION_PAGE_ID },
        properties: {
          title: { title: [{ text: { content: state.topic } }] },
        },
        children: blocks,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Notion API ${res.status}: ${errBody}`);
    }

    const page = await res.json();
    return { notionUrl: page.url };
  } catch (err) {
    console.error(`\n⚠️  Error saving to Notion: ${err.message}`);
    return { notionUrl: `(failed — ${err.message})` };
  }
}

// ── Build graph ─────────────────────────────────────────────────────
const graph = new StateGraph(State)
  .addNode("writeNotes", writeNotes)
  .addNode("saveToNotion", saveToNotion)
  .addEdge(START, "writeNotes")
  .addEdge("writeNotes", "saveToNotion")
  .addEdge("saveToNotion", END)
  .compile();

// ── REPL ────────────────────────────────────────────────────────────
const rl = readline.createInterface({ input: stdin, output: stdout });

console.log(`\n📝 Notion Notes Workflow (model: ${model})`);
console.log('   Enter a topic (or "exit")\n');

while (true) {
  const topic = await rl.question("Topic: ");
  if (topic.trim().toLowerCase() === "exit") break;
  if (!topic.trim()) continue;

  try {
    console.log("⏳ Researching and writing notes...\n");
    const result = await graph.invoke({ topic });
    console.log("✅ Notion page:", result.notionUrl, "\n");
  } catch (err) {
    console.error(`\n⚠️  Workflow error: ${err.message}\n`);
  }
}

rl.close();
