import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// API: Generate Step-by-Step Mathematical Solution
app.post("/api/generate-solution", async (req, res) => {
  try {
    const { questionId, questionText, chapter, topic, officialAnswer, options } = req.body;

    if (!questionText) {
      return res.status(400).json({ error: "questionText is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is not configured in environment.",
        fallback: true,
      });
    }

    const prompt = `You are an elite Professor of Mathematics and GATE (Graduate Aptitude Test in Engineering) Examination Topper mentor.
Provide an exceptionally clear, mathematically rigorous, and step-by-step solution for the following GATE Mathematics problem.

Question ID: ${questionId || "N/A"}
Chapter: ${chapter || "Engineering Mathematics"}
Topic: ${topic || "Mathematics"}
Official Answer Key: ${officialAnswer || "Unknown"}
${options ? `Options:\n${options}` : ""}

Problem Statement:
${questionText}

Please structure your response with:
1. **Core Concept & Governing Theorem**: Clearly state the definitions, formulas, or theorems applied (e.g., Cauchy-Riemann equations, Cayley-Hamilton, Bayes theorem, L'Hôpital, Gauss Divergence, etc.).
2. **Step-by-Step Derivation / Calculation**: Write each algebraic and calculus transformation explicitly with clear intermediate steps.
3. **Verification with Official Key**: Confirm why the final answer matches ${officialAnswer || "the deduced result"}.
4. **Alternative Shortcut / GATE Exam Tip**: Any quick trick, dimensional analysis, or property that saves time in the 3-hour GATE examination.
5. **Common Traps / Pitfalls**: Where students typically make calculation or conceptual mistakes.

Format using clean Markdown with readable math notations.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });

    const solution = response.text || "No solution generated.";
    res.json({
      success: true,
      questionId,
      solution,
    });
  } catch (error: any) {
    console.error("Error generating solution:", error);
    res.status(500).json({
      error: error.message || "Failed to generate solution",
    });
  }
});

// API: Ask Doubt / Concept Explanation
app.post("/api/ask-doubt", async (req, res) => {
  try {
    const { questionContext, userQuery } = req.body;
    if (!userQuery) {
      return res.status(400).json({ error: "userQuery is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const prompt = `You are a friendly GATE Mathematics mentor.
A student is asking a doubt regarding this mathematical problem and solution:
---
${questionContext || "General GATE Engineering Mathematics query"}
---

Student's Question/Doubt:
${userQuery}

Provide a direct, encouraging, and crystal clear mathematical clarification with worked examples if relevant. Keep it sharp and easy to digest.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
      },
    });

    res.json({
      success: true,
      reply: response.text || "I could not generate an explanation at this moment.",
    });
  } catch (error: any) {
    console.error("Error answering doubt:", error);
    res.status(500).json({ error: error.message || "Failed to answer doubt" });
  }
});

// Vite middleware / Static serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GATE Math Solutions server running on http://0.0.0.0:${PORT}`);
  });
}

start();
