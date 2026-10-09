param(
    [string]$GitHubCli,
    [string]$AuthDirectory,
    [string]$Repository = 'WRISTER-AI/athlete-lab',
    [switch]$DryRun
)

# Credentials remain outside the repository. Pass custom paths on another computer.
$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path $PSScriptRoot -Parent
$workspaceRoot = Split-Path $repoRoot -Parent
if (-not $GitHubCli) {
    $GitHubCli = Join-Path $workspaceRoot 'work/github-cli/2.102.0/bin/gh.exe'
}
if (-not $AuthDirectory) {
    $AuthDirectory = Join-Path $workspaceRoot 'work/github-auth'
}
if (-not (Test-Path -LiteralPath $GitHubCli)) { throw 'GitHub CLI is missing. Supply -GitHubCli with its installed path.' }

# Pass authentication to Git only in this process, without invoking the Windows
# credential helper that fails in this workspace. Never print or persist tokens.
$environmentNames = @(
    'GH_CONFIG_DIR', 'GIT_CONFIG_COUNT', 'GIT_CONFIG_KEY_0', 'GIT_CONFIG_VALUE_0',
    'GIT_TERMINAL_PROMPT'
)
$previousEnvironment = @{}
foreach ($name in $environmentNames) {
    $previousEnvironment[$name] = [Environment]::GetEnvironmentVariable($name, 'Process')
}

Push-Location $repoRoot
try {
    $remote = & git remote get-url origin
    if ($LASTEXITCODE -ne 0 -or $remote -notin @("https://github.com/$Repository.git", "https://github.com/$Repository")) {
        throw 'The origin address does not match the verified repository. Check ownership and access before changing it.'
    }
    $branch = & git branch --show-current
    if ($LASTEXITCODE -ne 0 -or $branch -ne 'master') { throw 'Check out the reviewed master branch before syncing.' }
    $changes = & git status --porcelain
    if ($LASTEXITCODE -ne 0 -or $changes) { throw 'Save and commit the intended changes before syncing.' }

    $env:GH_CONFIG_DIR = $AuthDirectory
    $canPush = & $GitHubCli api "repos/$Repository" --jq '.permissions.push'
    if ($LASTEXITCODE -ne 0 -or $canPush -ne 'true') { throw 'The signed-in GitHub account does not have verified write access.' }
    $githubToken = & $GitHubCli auth token --hostname github.com
    if ($LASTEXITCODE -ne 0 -or -not $githubToken) { throw 'Sign in to GitHub CLI before syncing.' }
    $env:GIT_CONFIG_COUNT = '1'
    $env:GIT_CONFIG_KEY_0 = 'http.https://github.com/.extraheader'
    $env:GIT_CONFIG_VALUE_0 = 'Authorization: Basic ' + [Convert]::ToBase64String(
        [Text.Encoding]::UTF8.GetBytes('x-access-token:' + $githubToken.Trim())
    )
    $githubToken = $null
    $env:GIT_TERMINAL_PROMPT = '0'

    & git -c credential.helper= fetch origin master
    if ($LASTEXITCODE -ne 0) { throw 'GitHub fetch failed; nothing was pushed.' }
    & git merge-base --is-ancestor origin/master HEAD
    if ($LASTEXITCODE -ne 0) { throw 'GitHub has changes that must be reconciled first. This command never force-pushes.' }

    if ($DryRun) {
        & git -c credential.helper= push --dry-run origin master:refs/heads/master
        if ($LASTEXITCODE -ne 0) { throw 'GitHub push check failed.' }
        Write-Output 'GitHub sync check passed. No remote changes were made.'
    } else {
        & git -c credential.helper= push origin master:refs/heads/master
        if ($LASTEXITCODE -ne 0) { throw 'GitHub push failed.' }
        $remoteHead = & git -c credential.helper= ls-remote origin refs/heads/master
        if ($LASTEXITCODE -ne 0) { throw 'Could not verify the saved GitHub version.' }
        $localHead = & git rev-parse HEAD
        if ($LASTEXITCODE -ne 0 -or ($remoteHead -split '\s+')[0] -ne $localHead) {
            throw 'GitHub does not match the local commit. Investigate before reporting success.'
        }
        Write-Output "GitHub verified at $localHead"
    }
} finally {
    $githubToken = $null
    foreach ($name in $environmentNames) {
        [Environment]::SetEnvironmentVariable($name, $previousEnvironment[$name], 'Process')
    }
    Pop-Location
}
