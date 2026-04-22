// turbo-all
---
description: Sync local gstack-origin with the upstream garrytan/gstack repository.
---

# /gstack-upgrade: Sync to Latest gStack Origin

Load identity: [persona-gstack-gstack-upgrade.md](/.agents/rules/persona-gstack-gstack-upgrade.md)

## Phase 0: Preconditions
1. Confirm you are in the repo root and `gstack-origin/` exists.
2. Confirm `git` is installed and repository is clean enough to merge upstream changes.

## Phase 1: Upstream Setup (one-time)
1. Check for upstream remote:
```bash
git remote get-url gstack-upstream
```
2. If missing, add it:
```bash
git remote add gstack-upstream https://github.com/garrytan/gstack.git
```
3. Fetch latest upstream refs:
```bash
git fetch gstack-upstream
```

## Phase 2: Update gstack-origin from Upstream
1. Preferred (script):
```bash
./scripts/sync-gstack-origin.sh
```
2. Windows PowerShell option:
```powershell
./scripts/sync-gstack-origin.ps1
```
3. Manual fallback:
```bash
git subtree pull --prefix gstack-origin gstack-upstream main --squash
```

## Phase 3: Post-Update Sync
1. Verify expected files changed inside `gstack-origin/`.
2. Re-run any local setup/build steps that depend on browse binaries:
```bash
cd gstack-origin/browse && ./setup
```
3. Ensure wrapper references still point to `gstack-origin` (not `gstack-source`).
4. Reload skill discovery cache:
```bash
gemini skills reload
```

## Phase 4: Report
1. Summarize updated upstream commit/version and changed skill areas.
2. List any merge conflicts resolved manually.
3. Provide next action if additional migration is required.

