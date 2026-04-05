# gStack-Antigravity

[한국어 README](./README_KO.md)

gStack-Antigravity is a practical, team-friendly Antigravity port of [garrytan/gstack](https://github.com/garrytan/gstack).
It keeps upstream skill procedures in `gstack-origin/`, while using `.agents/workflows` and `.agents/rules` so your team can run repeatable, agent-driven workflows inside one project.

## Why This Repo
Most teams can run one-off prompts. Fewer teams can run consistent, high-quality AI workflows repeatedly.
This repo focuses on that second problem:
- keep upstream gstack behavior accessible (`gstack-origin`)
- keep project-level control in `.agents/*`
- keep onboarding simple for teammates

## How It Works
Runtime layers:
- `gstack-origin/`: upstream source-of-truth skill docs (`SKILL.md`)
- `.agents/workflows/`: command entrypoints and execution phases
- `.agents/rules/`: policy, role routing, shared constraints
- `.agents/skills/gstack/`: locally installed skill payload used by Antigravity

Design intent:
- **Context efficiency**: rules are thin routers, load full detail from `gstack-origin` when needed
- **Behavior parity**: operational procedures still come from upstream skill docs
- **Team consistency**: everyone executes the same workflows/rules in the repo

## Prerequisites
- Antigravity installed
- Git installed
- Access to this repository

Optional but recommended:
- A clean git working tree before sync/update operations
- A browser environment that can run `gstack-origin/browse/setup`

## Quick Start (3 minutes)
1. Clone:
```bash
git clone https://github.com/runchr-com/gstack-antigravity.git
cd gstack-antigravity
```
2. Build browse binary (first time):
```bash
cd gstack-origin/browse
./setup
cd ../..
```
3. Install local skills (recommended):
```bash
npx @runchr/gstack-antigravity
```

Alternative: run directly from this GitHub repo
```bash
npx github:runchr-com/gstack-antigravity
```

Manual script install (for contributors):
```bash
./scripts/install-antigravity-skill.sh copy
# Windows PowerShell:
./scripts/install-antigravity-skill.ps1 -Mode copy
```
4. Open Antigravity in this project and run `/office-hours`.

## Detailed Setup
### Step 1) Verify expected local paths
After install, confirm these exist:
- `.agents/skills/gstack`
- `.agents/workflows`
- `.agents/rules`

PowerShell check:
```powershell
Test-Path .agents/skills/gstack
Test-Path .agents/workflows
Test-Path .agents/rules
```

### Step 2) Choose install mode
Install scripts support two modes:
- `copy` (default): duplicates files into `.agents/skills/gstack`
- `link`: symlink mode for faster iteration while editing this repo

Examples:
```bash
./scripts/install-antigravity-skill.sh copy
./scripts/install-antigravity-skill.sh link
```
```powershell
./scripts/install-antigravity-skill.ps1 -Mode copy
./scripts/install-antigravity-skill.ps1 -Mode link
```

Use `copy` for teammate stability. Use `link` when actively developing this repo.

## First Workflow Test (Recommended)
Run this exact sequence for a smoke test:
1. `/office-hours`
2. Describe one product problem in 2-3 sentences
3. Confirm the assistant asks structured discovery questions
4. `/plan-ceo-review`
5. `/review`

Pass criteria:
- Commands resolve without missing-skill errors
- Workflow phase structure appears (not free-form random output)
- Rules are applied consistently across commands

## Daily Usage Guide
### A. Discovery / Strategy
- `/office-hours`: sharpen problem and user pain
- `/plan-ceo-review`: strategic challenge and scope pressure-test
- `/plan-eng-review`: architecture and implementation rigor

### B. Build / Verify
- implement your code changes
- `/review`: pre-merge code quality and risk checks
- `/qa`: browser-driven QA and bug finding

### C. Release / Post-Release
- `/ship`: release preparation
- `/document-release`: docs sync
- `/retro`: process and outcome reflection

## Recommended Team Operating Pattern
For each feature branch:
1. Plan with `/office-hours` + `/plan-*`
2. Implement
3. Run `/review`
4. Run `/qa`
5. Ship

For weekly cadence:
1. `/retro` to identify recurring gaps
2. tune workflow/rules in `.agents/`
3. commit improvements with clear changelog notes

## Upstream Sync (`gstack-origin`)
Use this when you want latest upstream skill procedures.

- macOS/Linux:
```bash
./scripts/sync-gstack-origin.sh
```
- Windows PowerShell:
```powershell
./scripts/sync-gstack-origin.ps1
```

Manual fallback:
```bash
git fetch gstack-upstream
git subtree pull --prefix gstack-origin gstack-upstream main --squash
```

After sync:
1. re-run local install script
2. run smoke test (`/office-hours`, `/review`)
3. commit updated subtree + any adapter changes in `.agents/*`

## Troubleshooting
### Skills not detected
1. confirm `.agents/skills/gstack` exists
2. re-run install script in `copy` mode
3. restart Antigravity session/app

### Browse-related failures
1. run:
```bash
cd gstack-origin/browse
./setup
```
2. reinstall local skills
3. retry `/qa` or browse-dependent workflow

### Unexpected behavior drift
1. check `gstack-origin` revision changed recently
2. inspect `.agents/rules` router mapping
3. run `/review` smoke test on a small diff to validate baseline

## FAQ
### Do I need `llms.txt` and `llms-full.txt`?
No. They are optional helper context docs.

### Why keep `gstack-origin` if we have `.agents/rules`?
`.agents/rules` is lightweight orchestration. `gstack-origin` holds detailed upstream procedures.

### Should we commit `.agents/skills/gstack`?
For this repository’s workflow, yes. It improves reproducibility for teammates.

## Notes
- This repo is optimized for **local workspace usage**.
- Runtime behavior is driven by `.agents/workflows`, `.agents/rules`, and installed skills in `.agents/skills/gstack`.
