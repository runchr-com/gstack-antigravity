---
description: Native browser automation, QA testing, and dogfooding.
---

// turbo-all

# gStack Workflow

Native browser automation and QA testing using the compiled `browse` binary.

## Phase 1: Environment Setup

Verify the `browse` binary is READY before proceeding.

```bash
_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
B=""
# Check gstack-origin first
[ -n "$_ROOT" ] && [ -x "$_ROOT/gstack-origin/browse/dist/browse" ] && B="$_ROOT/gstack-origin/browse/dist/browse"
# Fallback to locally installed skills
[ -z "$B" ] && [ -n "$_ROOT" ] && [ -x "$_ROOT/.agents/skills/gstack/browse/dist/browse" ] && B="$_ROOT/.agents/skills/gstack/browse/dist/browse"
# Home fallback
[ -z "$B" ] && B=~/.agents/skills/gstack/browse/dist/browse
if [ -x "$B" ]; then
  echo "READY: $B"
else
  echo "NEEDS_SETUP"
fi
```

If `NEEDS_SETUP` is returned, you must build the binary before continuing:
1. Navigate to the browse skill directory (e.g., `gstack-origin/browse/` or `.agents/skills/gstack/browse/`).
2. Run `./setup`.

## Phase 2: Direct Command Interface

Execute a specific browser command on a target URL.

1. **Navigate to the target:**
```bash
$B goto <URL>
```

2. **Execute the command:**
```bash
$B <COMMAND>
```
Example: `$B snapshot -i` or `$B screenshot /tmp/test.png`

## Phase 3: Artifact Visualization

Any work that generates visual output (screenshots, annotated snapshots, responsive layouts) must be displayed immediately.

1. **Detect PNGs:** Look for any `.png` files generated in the `/tmp/` and current directories.
2. **Display Artifact:** Use the `Read` tool to display the image as an Antigravity Artifact.
3. **Report:** provide the absolute path to the screenshot in your response.
