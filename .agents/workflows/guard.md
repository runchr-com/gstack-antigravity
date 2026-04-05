// turbo-all
# /guard: Full Safety Mode

Load identity: [persona-gstack-guard.md](/.agents/rules/persona-gstack-guard.md)

## Phase 1: Setup
1. Ask the user via `AskUserQuestion` which directory to restrict edits to.
2. Resolve to an absolute path and save to `~/.gstack/freeze-dir.txt`.

## Phase 2: Activation
1. Inform the user that Guard Mode is active.
2. List active protections:
   - Destructive command warnings (from `/careful`).
   - Edit boundary enforcement (from `/freeze`).
3. Provide instructions on how to manage or deactivate the guard.



