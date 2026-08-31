$ErrorActionPreference = "Stop"

$phpDir = "C:\php"
$zipPath = "$env:TEMP\php-8.3.33-Win32-vs16-x64.zip"
$downloadUrl = "https://windows.php.net/downloads/releases/php-8.3.33-Win32-vs16-x64.zip"

Write-Host "1. Creating directory $phpDir..." -ForegroundColor Cyan
if (-not (Test-Path $phpDir)) {
    New-Item -ItemType Directory -Path $phpDir -Force | Out-Null
}

Write-Host "2. Downloading PHP 8.3.33 from $downloadUrl..." -ForegroundColor Cyan
Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath -UseBasicParsing

Write-Host "3. Extracting to $phpDir..." -ForegroundColor Cyan
Expand-Archive -Path $zipPath -DestinationPath $phpDir -Force
Remove-Item $zipPath -Force

Write-Host "4. Configuring php.ini..." -ForegroundColor Cyan
$iniDev = Join-Path $phpDir "php.ini-development"
$iniFile = Join-Path $phpDir "php.ini"

if (Test-Path $iniDev) {
    Copy-Item $iniDev $iniFile -Force
    $iniContent = Get-Content $iniFile -Raw

    # Enable extension_dir
    $iniContent = $iniContent -replace ';extension_dir = "ext"', 'extension_dir = "ext"'
    $iniContent = $iniContent -replace '; extension_dir = "ext"', 'extension_dir = "ext"'

    # Enable required extensions
    $extensions = @("curl", "fileinfo", "mbstring", "openssl", "pdo_mysql")
    foreach ($ext in $extensions) {
        $iniContent = $iniContent -replace ";extension=$ext", "extension=$ext"
    }

    Set-Content -Path $iniFile -Value $iniContent
}

Write-Host "5. Adding $phpDir to User PATH environment variable..." -ForegroundColor Cyan
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$phpDir*") {
    $newUserPath = "$phpDir;$userPath"
    [Environment]::SetEnvironmentVariable("Path", $newUserPath, "User")
    Write-Host "Added $phpDir to User PATH." -ForegroundColor Green
} else {
    Write-Host "$phpDir is already in User PATH." -ForegroundColor Yellow
}

# Update current process PATH
$env:Path = "$phpDir;" + $env:Path

Write-Host "6. Verifying PHP installation..." -ForegroundColor Cyan
& "$phpDir\php.exe" -v
Write-Host "Installed extensions:" -ForegroundColor Cyan
& "$phpDir\php.exe" -m

Write-Host "`nPHP 8.3 installation successfully completed!" -ForegroundColor Green
