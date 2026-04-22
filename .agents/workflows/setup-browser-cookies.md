// turbo-all
---
description: Import real browser cookies from Chrome/Arc/Edge for authenticated scraping.
---

# /setup-browser-cookies: Import Browser Cookies

Load identity: [persona-gstack-setup-browser-cookies.md](/.agents/rules/persona-gstack-setup-browser-cookies.md)

## Phase 1: Picker Setup
1. Verify `browse` binary readiness.
2. Open the Cookie Picker UI using `$B cookie-import-browser`.
3. Provide instructions to the user to select domains.

## Phase 2: Import & Verify
1. Wait for user confirmation of domain selection.
2. Run `$B cookies` to verify imported counts.
3. Display the summary of active cookie domains.

