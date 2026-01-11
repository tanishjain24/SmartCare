// server.js
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import { spawn, spawnSync } from "child_process";
import fs from "fs";

dotenv.config();

// Ensure Python deps for NLP are installed (Flask, Click, etc.)
function ensureNLPDependencies(pythonCmd, cwd) {
  const importTest = spawnSync(pythonCmd, ["-c", "import flask, click; print('ok')"], {
    cwd,
    env: process.env,
    shell: true,
    stdio: "pipe",
  });

  if (importTest.status === 0) {
    console.log("✅ NLP Python deps already satisfied.");
    return;
  }

  console.log("📦 Installing NLP Python requirements (Flask, Click, etc.)...");
  const reqFiles = [
    "requirements-minimal.txt",
    "requirements-local.txt",
  ].filter((f) => fs.existsSync(`${cwd}/${f}`));

  let installed = false;
  for (const req of reqFiles) {
    const res = spawnSync(
      pythonCmd,
      ["-m", "pip", "install", "-r", req],
      { cwd, env: process.env, shell: true, stdio: "inherit" }
    );
    if (res.status === 0) {
      installed = true;
      break;
    }
  }

  if (!installed) {
    console.warn(
      "⚠️ Failed to install NLP requirements from minimal/local lists. Trying generic install for Flask/Click..."
    );
    const res2 = spawnSync(
      pythonCmd,
      ["-m", "pip", "install", "flask", "click"],
      { cwd, env: process.env, shell: true, stdio: "inherit" }
    );
    if (res2.status !== 0) {
      console.error("❌ Could not install required Python packages for NLP.");
    }
  }
}

// Start Python NLP Flask service when backend boots
function startNLPService() {
  const cwd = process.env.NLP_APP_DIR || "c:/Users/gaura/Desktop/IPD_SmartCare/NLP_Model/nlp_model/web-app";
  const pythonCmd = process.env.PYTHON_PATH || (process.platform === "win32" ? "python" : "python3");
  const args = ["app.py"]; // app.py has its own app.run(...)

  console.log("🔧 Starting NLP Flask service...");
  ensureNLPDependencies(pythonCmd, cwd);
  const nlpEnv = { ...process.env, FLASK_DEBUG: "false", FLASK_USE_RELOADER: "false", PORT: process.env.NLP_PORT || "5080" };
  const nlpProc = spawn(pythonCmd, args, { cwd, env: nlpEnv, shell: false });

  nlpProc.stdout.on("data", (data) => {
    process.stdout.write(`[NLP] ${data}`);
  });
  nlpProc.stderr.on("data", (data) => {
    process.stderr.write(`[NLP:ERR] ${data}`);
  });
  nlpProc.on("close", (code) => {
    console.log(`❌ NLP service exited with code ${code}`);
  });
  nlpProc.on("error", (err) => {
    console.error("Failed to start NLP service:", err);
  });

  // Graceful shutdown: kill NLP process on backend exit
  const shutdown = () => {
    if (!nlpProc.killed) {
      try { nlpProc.kill("SIGINT"); } catch (_) {}
      // Windows fallback to ensure child and its tree are killed
      if (process.platform === "win32") {
        try {
          spawnSync("cmd", ["/c", `taskkill /pid ${nlpProc.pid} /T /F`], { stdio: "ignore" });
        } catch (_) {}
      }
    }
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  process.on("exit", shutdown);
}

// Do not spawn NLP on Vercel (serverless). Use external URL via NLP_SUMMARY_URL.
if (!process.env.VERCEL && process.env.SPAWN_NLP_LOCAL !== "false") {
  startNLPService();
}

// Connect DB
connectDB();

app.get("/", (req, res) => {
  return res.send("Backend is Running");
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});

// Graceful shutdown to exit on Ctrl+C / SIGTERM
const closeAll = (signal) => {
  console.log(`\n🛑 Received ${signal}, shutting down...`);
  try {
    server.close(() => {
      console.log("HTTP server closed.");
      mongoose.connection.close(false).then(() => {
        console.log("MongoDB connection closed.");
        process.exit(0);
      }).catch(() => process.exit(0));
    });
  } catch (e) {
    process.exit(0);
  }
};
process.on("SIGINT", () => closeAll("SIGINT"));
process.on("SIGTERM", () => closeAll("SIGTERM"));
