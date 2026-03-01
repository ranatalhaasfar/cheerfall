$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
Set-Location "D:\Claude Test Project Website"
Write-Host "Installing puppeteer..."
& "C:\Program Files\nodejs\npm.cmd" install puppeteer
Write-Host "Done."
