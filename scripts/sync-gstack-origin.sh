#!/usr/bin/env bash
set -euo pipefail

UPSTREAM_REMOTE="${UPSTREAM_REMOTE:-gstack-upstream}"
UPSTREAM_URL="${UPSTREAM_URL:-https://github.com/garrytan/gstack.git}"
UPSTREAM_BRANCH="${UPSTREAM_BRANCH:-main}"
PREFIX="${PREFIX:-gstack-origin}"

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: git is not installed." >&2
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ERROR: run this inside a git repository." >&2
  exit 1
fi

if [ ! -d "$PREFIX" ]; then
  echo "ERROR: expected directory '$PREFIX' not found." >&2
  exit 1
fi

if ! git remote get-url "$UPSTREAM_REMOTE" >/dev/null 2>&1; then
  echo "Adding remote '$UPSTREAM_REMOTE' -> $UPSTREAM_URL"
  git remote add "$UPSTREAM_REMOTE" "$UPSTREAM_URL"
fi

echo "Fetching $UPSTREAM_REMOTE..."
git fetch "$UPSTREAM_REMOTE"

echo "Updating subtree '$PREFIX' from $UPSTREAM_REMOTE/$UPSTREAM_BRANCH..."
git subtree pull --prefix "$PREFIX" "$UPSTREAM_REMOTE" "$UPSTREAM_BRANCH" --squash

echo "Done. Review changes, then commit and push to your origin."
