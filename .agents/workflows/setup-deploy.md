// turbo-all
# /setup-deploy: Configure Deployment

Load identity: [persona-gstack-setup-deploy.md](/.agents/rules/persona-gstack-setup-deploy.md)

## Phase 1: Detection
1. Check for existing config in `README.md`.
2. Detect platform (Fly, Render, Vercel, Netlify, etc.) and CI workflows.
3. Infer production URL and project type.

## Phase 2: Configuration
1. Perform platform-specific setup or use the Custom/Manual decision tree.
2. Gather Production URL, Health Checks, and Deploy Status commands via `AskUserQuestion`.

## Phase 3: Persistence & Verification
1. Write/Update the **## Deploy Configuration** section in `README.md`.
2. Verify the configuration by testing health checks and status commands.
3. Display the Deploy Configuration Summary.



