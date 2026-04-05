#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { mode: "copy", target: process.cwd(), help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "-h" || a === "--help") {
      args.help = true;
    } else if (a === "--mode") {
      args.mode = argv[i + 1] || "";
      i += 1;
    } else if (a === "--target") {
      args.target = argv[i + 1] || "";
      i += 1;
    }
  }
  return args;
}

function printHelp() {
  console.log(
    [
      "gstack-antigravity installer",
      "",
      "Usage:",
      "  gstack-antigravity [--mode copy|link] [--target <project-root>]",
      "",
      "Options:",
      "  --mode    Install mode. Default: copy",
      "  --target  Project root. Default: current working directory",
      "",
      "Notes:",
      "  - For npx/git installs, use --mode copy (recommended).",
      "  - This installer writes .agents/skills/gstack, .agents/workflows, .agents/rules."
    ].join("\n")
  );
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function rmIfExists(p) {
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const mode = args.mode;
  if (mode !== "copy" && mode !== "link") {
    throw new Error("Invalid --mode. Use copy or link.");
  }

  const packageRoot = path.resolve(__dirname, "..");
  const srcSkills = path.join(packageRoot, "gstack-origin");
  const srcWorkflows = path.join(packageRoot, ".agents", "workflows");
  const srcRules = path.join(packageRoot, ".agents", "rules");

  for (const p of [srcSkills, srcWorkflows, srcRules]) {
    if (!fs.existsSync(p)) {
      throw new Error(`Expected source directory not found: ${p}`);
    }
  }

  const targetRoot = path.resolve(args.target || process.cwd());
  const targetAgentsRoot = path.join(targetRoot, ".agents");
  const targetSkillsRoot = path.join(targetRoot, ".agents", "skills");
  const targetSkill = path.join(targetSkillsRoot, "gstack");
  const targetWorkflows = path.join(targetAgentsRoot, "workflows");
  const targetRules = path.join(targetAgentsRoot, "rules");

  ensureDir(targetSkillsRoot);
  rmIfExists(targetSkill);
  rmIfExists(targetWorkflows);
  rmIfExists(targetRules);

  if (mode === "link") {
    // In npx temp execution contexts symlinks can be fragile. Keep explicit warning.
    console.warn("WARN: --mode link may break in npx temporary contexts. Prefer copy.");
    fs.symlinkSync(srcSkills, targetSkill, "junction");
    fs.symlinkSync(srcWorkflows, targetWorkflows, "junction");
    fs.symlinkSync(srcRules, targetRules, "junction");
  } else {
    fs.cpSync(srcSkills, targetSkill, { recursive: true });
    fs.cpSync(srcWorkflows, targetWorkflows, { recursive: true });
    fs.cpSync(srcRules, targetRules, { recursive: true });
  }

  console.log("Installed gstack for Antigravity (workspace local only)");
  console.log(`  target    : ${targetRoot}`);
  console.log(`  skills    : ${targetSkill}`);
  console.log(`  workflows : ${targetWorkflows}`);
  console.log(`  rules     : ${targetRules}`);
  console.log(`  mode      : ${mode}`);
}

try {
  main();
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
}
