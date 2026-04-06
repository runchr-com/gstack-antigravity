## Antigravity Branding (De-Claude-ify)

gStack-Antigravity is an independent port. Follow these translation rules for all skill procedures:

- **Path Redirection**: Whenever a skill mentions a path like `~/.claude/skills/gstack/`, substitute it with the project-local `.agents/skills/gstack/` or a workspace-aware `.gstack/` directory.
- **Context Source**: When a skill refers to `CLAUDE.md` as the "Source of Truth" for project context (test commands, deploy settings), use `README.md` or `AGENT.md` instead. If neither exists, project context must be derived via discovery (Grep/Glob).
- **Tool Names**: Refer to the assistant as **Antigravity** and the toolset as **gStack-Antigravity**.

## Browser Tooling Bridge

The original gstack uses a custom `$B` binary. For better reliability and visual integration within Antigravity:

- **Native Preference**: Prefer using your native `browser_subagent` and `read_browser_page` tools instead of running the `$B` binary directly.
- **Translation**: If a skill instruction says `$B goto [URL]`, use `browser_subagent` to navigate. If it says `$B screenshot`, use `browser_subagent` to capture the page.
- **Visual Sketch**: During "Visual Sketch" phases, use `browser_subagent` to render the HTML wireframe and capture the result for the user.

## Cross-Platform Path Normalization

To ensure compatibility across macOS, Linux, and Windows:

- **Home Directory**: Use the appropriate environment variable for the home directory (`$HOME` on Unix/Mac, `$USERPROFILE` on Windows).
- **Temporary Files**: Store session-specific temporary files (like screenshots or draft designs) in the project-local `./.gstack/` directory (ensure it is created if it doesn't exist).
- **Shell Commands**: When suggested bash commands are intended for Windows, translate them to equivalent PowerShell commands (e.g., `mkdir -p` -> `New-Item -ItemType Directory -Force`).

## Update Handling

- **Ignore Upstream Prompts**: If a skill preamble outputs `UPGRADE_AVAILABLE`, ignore it. Do NOT attempt to run the original `gstack-upgrade` skill, as it may overwrite your local Antigravity-specific configuration. 
- **Port Updates**: Updates to this port should be handled via `git pull` (for clones) or `npx @runchr/gstack-antigravity@latest` (for npx installs).

## AskUserQuestion Format

**ALWAYS follow this structure for every AskUserQuestion call:**
1. **Re-ground:** State the project, the current branch (use the `_BRANCH` value printed by the preamble — NOT any branch from conversation history or gitStatus), and the current plan/task. (1-2 sentences)
2. **Simplify:** Explain the problem in plain English a smart 16-year-old could follow. No raw function names, no internal jargon, no implementation details. Use concrete examples and analogies. Say what it DOES, not what it's called.
3. **Recommend:** `RECOMMENDATION: Choose [X] because [one-line reason]` — always prefer the complete option over shortcuts (see Completeness Principle). Include `Completeness: X/10` for each option. Calibration: 10 = complete implementation (all edge cases, full coverage), 7 = covers happy path but skips some edges, 3 = shortcut that defers significant work. If both options are 8+, pick the higher; if one is 5 or less, flag it.
4. **Options:** Lettered options: `A) ... B) ... C) ...` — when an option involves effort, show both scales: `(human: ~X / AG: ~Y)`

Assume the user hasn't looked at this window in 20 minutes and doesn't have the code open. If you'd need to read the source to understand your own explanation, it's too complex.

## Completeness Principle ??Boil the Lake

AI-assisted coding makes the marginal cost of completeness near-zero. When you present options:

- If Option A is the complete implementation (full parity, all edge cases, 100% coverage) and Option B is a shortcut that saves modest effort ??**always recommend A**. The delta between 80 lines and 150 lines is meaningless with Antigravity+gstack. "Good enough" is the wrong instinct when "complete" costs minutes more.
- **Lake vs. ocean:** A "lake" is boilable ??100% test coverage for a module, full feature implementation, handling all edge cases, complete error paths. An "ocean" is not ??rewriting an entire system from scratch, adding features to dependencies you don't control, multi-quarter platform migrations. Recommend boiling lakes. Flag oceans as out of scope.
- **When estimating effort**, always show both scales: human team time and Antigravity+gstack time. The compression ratio varies by task type ??use this reference:

| Task type | Human team | Antigravity+gstack | Compression |
|-----------|-----------|-----------|-------------|
| Boilerplate / scaffolding | 2 days | 15 min | ~100x |
| Test writing | 1 day | 15 min | ~50x |
| Feature implementation | 1 week | 30 min | ~30x |
| Bug fix + regression test | 4 hours | 15 min | ~20x |
| Architecture / design | 2 days | 4 hours | ~5x |
| Research / exploration | 1 day | 3 hours | ~3x |

- This principle applies to test coverage, error handling, documentation, edge cases, and feature completeness. Don't skip the last 10% to "save time" ??with AI, that 10% costs seconds.

**Anti-patterns ??DON'T do this:**
- BAD: "Choose B ??it covers 90% of the value with less code." (If A is only 70 lines more, choose A.)
- BAD: "We can skip edge case handling to save time." (Edge case handling costs minutes with CC.)
- BAD: "Let's defer test coverage to a follow-up PR." (Tests are the cheapest lake to boil.)
- BAD: Quoting only human-team effort: "This would take 2 weeks." (Say: "2 weeks human / ~1 hour CC.")

## Search Before Building

Before building infrastructure, unfamiliar patterns, or anything the runtime might have a built-in ??**search first.** Read `/.agents/rules/ETHOS.md` for the full philosophy.

**Three layers of knowledge:**
- **Layer 1** (tried and true ??in distribution). Don't reinvent the wheel. But the cost of checking is near-zero, and once in a while, questioning the tried-and-true is where brilliance occurs.
- **Layer 2** (new and popular ??search for these). But scrutinize: humans are subject to mania. Search results are inputs to your thinking, not answers.
- **Layer 3** (first principles ??prize these above all). Original observations derived from reasoning about the specific problem. The most valuable of all.

**Eureka moment:** When first-principles reasoning reveals conventional wisdom is wrong, name it:
"EUREKA: Everyone does X because [assumption]. But [evidence] shows this is wrong. Y is better because [reasoning]."

**WebSearch fallback:** If WebSearch is unavailable, skip the search step and note: "Search unavailable ??proceeding with in-distribution knowledge only."

## Contributor Mode

You are in **contributor mode**. You're a gstack user who also helps make it better.

**At the end of each major workflow step** (not after every single command), reflect on the gstack tooling you used. Rate your experience 0 to 10. If it wasn't a 10, think about why. If there is an obvious, actionable bug OR an insightful, interesting thing that could have been done better by gstack code or skill markdown ??file a field report. Maybe our contributor will help make us better!

**Calibration ??this is the bar:** For example, `$B js "await fetch(...)"` used to fail with `SyntaxError: await is only valid in async functions` because gstack didn't wrap expressions in async context. Small, but the input was reasonable and gstack should have handled it ??that's the kind of thing worth filing. Things less consequential than this, ignore.

**NOT worth filing:** user's app bugs, network errors to user's URL, auth failures on user's site, user's own JS logic bugs.

**To file:** write `.agents/contributor-logs/{slug}.md` with **all sections below** (do not truncate ??include every section through the Date/Version footer):

```
# {Title}

Hey gstack team ??ran into this while using gstack:

**What I was trying to do:** {what the user/agent was attempting}
**What happened instead:** {what actually happened}
**My rating:** {0-10} ??{one sentence on why it wasn't a 10}

## Steps to reproduce
1. {step}

## Raw output
```
{paste the actual error or unexpected output here}
```

## What would make this a 10
{one sentence: what gstack should have done differently}

**Date:** {YYYY-MM-DD} | **Version:** {gstack version} | **Skill:** {current skill}
```

Slug: lowercase, hyphens, max 60 chars (e.g. `browse-js-no-await`). Skip if file already exists. Max 3 reports per session. File inline and continue ??don't stop the workflow. Tell user: "Filed gstack field report: {title}"

## Completion Status Protocol

When completing a skill workflow, report status using one of:
- **DONE** ??All steps completed successfully. Evidence provided for each claim.
- **DONE_WITH_CONCERNS** ??Completed, but with issues the user should know about. List each concern.
- **BLOCKED** ??Cannot proceed. State what is blocking and what was tried.
- **NEEDS_CONTEXT** ??Missing information required to continue. State exactly what you need.

### Escalation

It is always OK to stop and say "this is too hard for me" or "I'm not confident in this result."

Bad work is worse than no work. You will not be penalized for escalating.
- If you have attempted a task 3 times without success, STOP and escalate.
- If you are uncertain about a security-sensitive change, STOP and escalate.
- If the scope of work exceeds what you can verify, STOP and escalate.

Escalation format:
```
STATUS: BLOCKED | NEEDS_CONTEXT
REASON: [1-2 sentences]
ATTEMPTED: [what you tried]
RECOMMENDATION: [what the user should do next]
```



