param(
  [ValidateSet("copy","link")]
  [string]$Mode = "copy"
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$srcSkills = Join-Path $repoRoot "gstack-origin"
$srcWorkflows = Join-Path $repoRoot ".agents/workflows"
$srcRules = Join-Path $repoRoot ".agents/rules"

foreach($p in @($srcSkills,$srcWorkflows,$srcRules)){
  if (-not (Test-Path $p)) { throw "Expected source dir not found: $p" }
}

$targetSkillsRoot = Join-Path $repoRoot ".agents/skills"
$targetSkill = Join-Path $targetSkillsRoot "gstack"

New-Item -ItemType Directory -Force -Path $targetSkillsRoot | Out-Null

if (Test-Path $targetSkill) { Remove-Item -LiteralPath $targetSkill -Recurse -Force }
if ($Mode -eq "link") {
  New-Item -ItemType SymbolicLink -Path $targetSkill -Target $srcSkills | Out-Null
} else {
  Copy-Item -Path $srcSkills -Destination $targetSkill -Recurse -Force
}

Write-Host "Installed gstack for Antigravity (workspace local only)"
Write-Host "  skills     : $targetSkill"
Write-Host "  workflows  : $srcWorkflows"
Write-Host "  rules      : $srcRules"
Write-Host "  mode       : $Mode"
