$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
$node = "C:\Program Files\nodejs\node.exe"
Set-Location "D:\Claude Test Project Website"

# Kill any existing server on port 3000
$proc = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($proc) { Stop-Process -Id $proc -Force -ErrorAction SilentlyContinue }

# Start server
$server = Start-Process -FilePath $node -ArgumentList "serve.mjs" -WorkingDirectory "D:\Claude Test Project Website" -PassThru -NoNewWindow
Write-Host "Server started (PID $($server.Id))"
Start-Sleep -Seconds 3

# Take screenshot
& $node "screenshot.mjs" "http://localhost:3000" $args[0]

# Stop server
Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
Write-Host "Server stopped."
