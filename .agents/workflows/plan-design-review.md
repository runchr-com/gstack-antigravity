// turbo-all
# /plan-design-review: Designer's Eye Plan Review

Load identity: [persona-gstack-plan-design-review.md](/.agents/rules/persona-gstack-plan-design-review.md)

## Phase 1: Design Scope Assessment (Step 0)
1. Perform System Audit and UI Scope Detection.
2. Assign Initial Design Rating (0-10) and explain what a 10 looks like.
3. Check `DESIGN.md` status. If missing, recommend `/design-consultation`.
4. User selects focus areas for the review.

## Phase 2: The 7-Pass Rating Loop
1. **Pass 1: Information Architecture:** hierarchy, screens, navigation flow.
2. **Pass 2: Interaction State Coverage:** table of loading, empty, error, success, partial states.
3. **Pass 3: User Journey & Emotional Arc:** storyboard the journey (visceral/behavioral/reflective).
4. **Pass 4: AI Slop Risk:** replace generic patterns with intentional design.
5. **Pass 6: Responsive & Accessibility:** specification for viewports, a11y standards.
6. **Pass 7: Unresolved Decisions:** surface ambiguities that might affect implementation.

## Phase 3: Fix & Iterate
1. For each pass, rate 0-10. If <8, fix the plan to get to 10.
2. Edit the plan file directly to incorporate design decisions.
3. Repeat until all sections are 8+ or user accepts progress.

## Phase 4: Reporting
1. Update `TODOS.md` with design debt (a11y, deferred states).
2. Generate the Completion Summary and display the Review Readiness Dashboard.
3. Update the `## GSTACK REVIEW REPORT` in the plan file.



