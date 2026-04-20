#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

function parseArgs(argv) {
  const args = { mode: "auto", target: process.cwd(), help: false, buildGlobal: false };
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
    } else if (a === "--build-global") {
      args.buildGlobal = true;
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
      "  gstack-antigravity [--mode auto|copy|link] [--target <project-root>]",
      "",
      "Options:",
      "  --mode    Install mode. Default: auto (links engine, copies rules)",
      "  --target  Project root. Default: current working directory",
      "",
      "Notes:",
      "  - Standard-compliant: Engine is stored in ~/.gemini/antigravity/skills/gstack",
      "  - Isolated: Rules and workflows are copied to .agents/ for project stability.",
      "  - Performance: Shared engine avoids redundant browser binary builds."
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

function getGlobalSkillPath() {
  const home = os.homedir();
  // Standard Antigravity App Data Directory
  return path.join(home, ".gemini", "antigravity", "skills", "gstack");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
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

  const globalSkillPath = getGlobalSkillPath();
  const targetRoot = path.resolve(args.target || process.cwd());
  
  // 1. Sync Engine to Global Store
  console.log(`\n📦 Syncing Global Engine to: ${globalSkillPath}`);
  ensureDir(path.dirname(globalSkillPath));
  
  // Only update if source is newer or doesn't exist
  // For simplicity in this port, we'll sync if versions differ or it's a re-install
  if (packageRoot !== globalSkillPath) {
     // Check if we should copy or link the global store
     // If we are in a dev clone, we might link. If npx, we copy.
     if (!fs.existsSync(globalSkillPath)) {
        fs.cpSync(srcSkills, globalSkillPath, { recursive: true });
        console.log("  New engine installed globally.");
     } else {
        // Simple update: copy over (excluding node_modules/dist to avoid conflicts)
        fs.cpSync(srcSkills, globalSkillPath, { recursive: true });
        console.log("  Global engine updated.");
     }

     // --- New: Browser Setup for Global Engine ---
     console.log(`\n🔍 Checking Browser Engine in: ${globalSkillPath}`);
     const isWindows = os.platform() === 'win32';
     const browseBin = path.join(globalSkillPath, "browse", "dist", isWindows ? "browse.exe" : "browse");
     
     if (!fs.existsSync(browseBin)) {
       console.log("  Browser binary missing. Building engine (this may take a few seconds)...");
       try {
         let pkgManager = "npm";
         try {
           execSync("bun --version", { stdio: "ignore" });
           pkgManager = "bun";
         } catch (e) {}
         
         console.log(`  Using ${pkgManager} to build shared engine...`);
         execSync(`${pkgManager} install && ${pkgManager} run build`, { 
           cwd: globalSkillPath, 
           stdio: "inherit" 
         });
       } catch (err) {
         console.warn(`  Warning: Engine build failed: ${err.message}`);
         console.log("  (You may need to run 'bun install && bun run build' manually in the engine directory)");
       }
     } else {
       console.log("  ✅ Shared browsing engine detected.");
     }

     // Ensure Playwright Chromium
     console.log("  Ensuring Playwright Chromium is ready...");
     try {
       // We use npx to ensure the browser binary is present
       execSync("npx playwright install chromium", { 
         stdio: "inherit", 
         cwd: globalSkillPath 
       });
       console.log("  ✅ Browser environment ready.");
     } catch (err) {
       console.warn(`  Warning: Playwright setup failed: ${err.message}`);
     }
  }

  // 2. Initialize Local Workspace
  if (targetRoot === packageRoot && !process.env.npm_config_global) {
    console.log("  Running in source directory. Skipping local initialization.");
    return;
  }

  const targetAgentsRoot = path.join(targetRoot, ".agents");
  const targetSkillsRoot = path.join(targetRoot, ".agents", "skills");
  const targetSkill = path.join(targetSkillsRoot, "gstack");
  const targetWorkflows = path.join(targetAgentsRoot, "workflows");
  const targetRules = path.join(targetAgentsRoot, "rules");

  console.log(`\n🚀 Initializing Workspace: ${targetRoot}`);
  ensureDir(targetSkillsRoot);
  
  rmIfExists(targetSkill);
  rmIfExists(targetWorkflows);
  rmIfExists(targetRules);

  const mode = args.mode === "auto" ? "link" : args.mode;

  if (mode === "link") {
    console.log("  Linking shared engine (standard-compliant)...");
    try {
      fs.symlinkSync(globalSkillPath, targetSkill, "junction");
    } catch (err) {
      console.warn(`  Warning: Symlink failed, falling back to copy: ${err.message}`);
      fs.cpSync(globalSkillPath, targetSkill, { recursive: true });
    }
    
    // Workflows and Rules are ALWAYS COPIED for isolation and stability
    console.log("  Copying private rules and workflows (isolated)...");
    fs.cpSync(srcWorkflows, targetWorkflows, { recursive: true });
    fs.cpSync(srcRules, targetRules, { recursive: true });
  } else {
    console.log("  Copying all files (legacy mode)...");
    fs.cpSync(srcSkills, targetSkill, { recursive: true });
    fs.cpSync(srcWorkflows, targetWorkflows, { recursive: true });
    fs.cpSync(srcRules, targetRules, { recursive: true });
  }

  // 3. Update .gitignore
  const gitignorePath = path.join(targetRoot, ".gitignore");
  try {
    let content = "";
    if (fs.existsSync(gitignorePath)) {
      content = fs.readFileSync(gitignorePath, "utf-8");
    }
    if (!content.match(/^\.gstack\/?$/m)) {
      const separator = content === "" || content.endsWith("\n") ? "" : "\n";
      fs.appendFileSync(gitignorePath, `${separator}.gstack/\n`);
      console.log(`  Updated ${gitignorePath} to ignore .gstack/`);
    }
  } catch (err) {
    console.warn(`  Warning: Could not update ${gitignorePath}: ${err.message}`);
  }

  console.log("\n✅ gStack-Antigravity is ready to use!");
  console.log("----------------------------------------------");
  console.log(`  Engine (Shared) : ${globalSkillPath}`);
  console.log(`  Router (Local) : ${targetAgentsRoot}`);
  console.log(`  Data   (Local) : .gstack/`);
  console.log("\n🚀 Next Step:");
  console.log("  1. Open Antigravity in this project.");
  console.log("  2. You can now use /office-hours, /qa, /review, etc.");
  console.log("\n  Tip: If you encounter issues, run /gstack-setup in chat.");
  console.log("----------------------------------------------\n");
}

try {
  main();
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
}
