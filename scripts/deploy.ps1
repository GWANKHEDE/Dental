$ErrorActionPreference = 'Stop'

$repoDir = Split-Path -Path $PSScriptRoot -Parent
$projectDir = Split-Path -Path $repoDir -Parent
$deployDir = Join-Path $projectDir 'dental-gh-pages'

function Run-Git {
  param([Parameter(Mandatory)][string[]]$Arguments)
  & git @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "git $($Arguments -join ' ') failed with exit code $LASTEXITCODE"
  }
}

function Clear-Dir {
  param([Parameter(Mandatory)][string]$Path)
  $retries = 4
  while ($true) {
    try {
      Get-ChildItem -LiteralPath $Path | Remove-Item -Recurse -Force
      return
    } catch {
      $retries--
      if ($retries -le 0) {
        throw
      }
      Start-Sleep -Milliseconds 750
    }
  }
}

Write-Output 'Building production bundle...'
npm run build
if ($LASTEXITCODE -ne 0) {
  throw 'Build failed'
}

Write-Output 'Preparing gh-pages worktree...'
# remove leftovers from any earlier deploy attempt
foreach ($candidate in @($deployDir, (Join-Path $repoDir 'dental-gh-pages'))) {
  if (Test-Path -LiteralPath $candidate) {
    try {
      Run-Git @('worktree', 'remove', '--force', $candidate)
    } catch {
      Remove-Item -LiteralPath $candidate -Recurse -Force -ErrorAction SilentlyContinue
    }
  }
}
try {
  Run-Git @('worktree', 'prune')
} catch {
  # nothing to prune on first run
}

Run-Git @('worktree', 'add', '--detach', $deployDir)

Clear-Dir -Path $deployDir
Copy-Item -Path (Join-Path $repoDir 'dist\*') -Destination $deployDir -Recurse -Force

Run-Git @('-C', $deployDir, 'add', '-A')
Run-Git @('-C', $deployDir, 'commit', '-m', 'Deploy to GitHub Pages')
Run-Git @('-C', $deployDir, 'push', '--force', 'origin', 'HEAD:refs/heads/gh-pages')

Run-Git @('worktree', 'remove', '--force', $deployDir)
Write-Output 'Deployed to gh-pages. Live at https://gwankhede.github.io/Dental/'
