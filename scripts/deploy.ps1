$ErrorActionPreference = 'Stop'

$repoDir = $PSScriptRoot
$deployDir = Join-Path $PSScriptRoot '..\dental-gh-pages'

Write-Output 'Building production bundle...'
npm run build

Write-Output 'Preparing gh-pages worktree...'
git worktree remove --force $deployDir 2>$null
git worktree prune
git worktree add --orphan gh-pages $deployDir

Get-ChildItem -LiteralPath $deployDir | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -LiteralPath (Join-Path $repoDir 'dist\*') -Destination $deployDir -Recurse -Force

Set-Location -LiteralPath $deployDir
git add -A
git commit -m 'Deploy to GitHub Pages'
git push --force origin gh-pages

Set-Location -LiteralPath $repoDir
git worktree remove --force $deployDir
Write-Output 'Deployed to gh-pages. Live at https://gwankhede.github.io/Dental/'
