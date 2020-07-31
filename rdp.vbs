Dim WshShell
Set WshShell = WScript.CreateObject("WScript.Shell")

set shell = CreateObject("WScript.Shell")
shell.run "mstsc.exe /multimon WshShell.CurrentDirectory & ""dnk.rdp""", 1, true
