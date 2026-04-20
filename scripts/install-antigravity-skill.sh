#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-copy}"   # copy | link

if [[ "$MODE" != "copy" && "$MODE" != "link" ]]; then
  echo "Usage: $0 [copy|link]" >&2
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_SKILLS="$REPO_ROOT/gstack-origin"
SRC_WORKFLOWS="$REPO_ROOT/.agents/workflows"
SRC_RULES="$REPO_ROOT/.agents/rules"

for p in "$SRC_SKILLS" "$SRC_WORKFLOWS" "$SRC_RULES"; do
  if [[ ! -d "$p" ]]; then
    echo "ERROR: expected source dir not found: $p" >&2
    exit 1
  fi
done

TARGET_SKILLS_ROOT="$REPO_ROOT/.agents/skills"
TARGET_SKILL="$TARGET_SKILLS_ROOT/gstack"
mkdir -p "$TARGET_SKILLS_ROOT"

if [[ -e "$TARGET_SKILL" || -L "$TARGET_SKILL" ]]; then
  rm -rf "$TARGET_SKILL"
fi

if [[ "$MODE" == "link" ]]; then
  ln -s "$SRC_SKILLS" "$TARGET_SKILL"
else
  cp -R "$SRC_SKILLS" "$TARGET_SKILL"
fi

echo "Installed gstack for Antigravity (workspace local only)"
echo "  skills     : $TARGET_SKILL"
echo "  workflows  : $SRC_WORKFLOWS"
echo "  rules      : $SRC_RULES"
echo "  mode       : $MODE"
