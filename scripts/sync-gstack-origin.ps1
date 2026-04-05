param(
  [string]$UpstreamRemote = "gstack-upstream",
  [string]$UpstreamUrl = "https://github.com/garrytan/gstack.git",
  [string]$UpstreamBranch = "main",
  [string]$Prefix = "gstack-origin"
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "git is not installed."
}

$insideRepo = git rev-parse --is-inside-work-tree 2>$null
if ($insideRepo -ne "true") {
  throw "Run this script inside a git repository."
}

if (-not (Test-Path $Prefix)) {
  throw "Expected directory '$Prefix' not found."
}

# Avoid probing with `git remote get-url` directly because in some
# PowerShell setups stderr can be promoted to a terminating error.
$remotes = @(git remote)
if (-not ($remotes -contains $UpstreamRemote)) {
  Write-Host "Adding remote '$UpstreamRemote' -> $UpstreamUrl"
  git remote add $UpstreamRemote $UpstreamUrl
}

Write-Host "Fetching $UpstreamRemote..."
git fetch $UpstreamRemote

Write-Host "Updating subtree '$Prefix' from $UpstreamRemote/$UpstreamBranch..."
git subtree pull --prefix $Prefix $UpstreamRemote $UpstreamBranch --squash

Write-Host "Done. Review changes, then commit and push to your origin."
