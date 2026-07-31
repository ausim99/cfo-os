; CFO OS server installer.
; Installs the standalone server exe, registers it to auto-start at logon
; (windowless, via Scheduled Task -- same pattern as install-service.ps1),
; and drops ready-to-share desktop shortcuts: one for this PC (localhost),
; one for other devices on the same network (LAN IP), so distributing
; local-network access is just copying a .url file to someone's desktop.
;
; Build: run this file with Inno Setup's compiler (ISCC.exe), or open it in
; the Inno Setup IDE and press Compile. The server exe must already be built
; via PyInstaller first (see ..\server_entry.py and the PyInstaller command
; in docs/deploy notes) -- this script expects it at ..\dist\CFOOSServer.exe.

#define MyAppName "CFO OS"
#define MyAppVersion "1.0"
#define MyAppPublisher "Akij Resource"
#define MyAppExeName "CFOOSServer.exe"
#define MyTaskName "CFO OS Server"

[Setup]
AppId={{8F2B6C1A-4E3D-4A2F-9C3B-1D6E7A8B9C0D}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\CFO OS
DefaultGroupName=CFO OS
DisableProgramGroupPage=yes
OutputDir=output
OutputBaseFilename=CFOOS-Setup
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
ArchitecturesInstallIn64BitMode=x64compatible

[Files]
Source: "..\dist\CFOOSServer.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\.env.example"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\.env.example"; DestDir: "{app}"; DestName: ".env"; Flags: onlyifdoesntexist
Source: "..\README.md"; DestDir: "{app}"; Flags: ignoreversion

[Code]
var
  LanIP: String;

function DetectLanIP(): String;
var
  ResultCode: Integer;
  TempFile: String;
  Output: AnsiString;
  Lines: TStringList;
begin
  Result := 'localhost';
  TempFile := ExpandConstant('{tmp}\lanip.txt');
  if Exec(ExpandConstant('{sys}\WindowsPowerShell\v1.0\powershell.exe'),
     '-NoProfile -Command "(Get-NetIPConfiguration | Where-Object {$_.IPv4DefaultGateway -ne $null -and $_.NetAdapter.Status -eq ''Up''}).IPv4Address.IPAddress | Select-Object -First 1 | Out-File -Encoding ascii ''' + TempFile + '''"',
     '', SW_HIDE, ewWaitUntilTerminated, ResultCode) then
  begin
    if LoadStringFromFile(TempFile, Output) then
    begin
      Lines := TStringList.Create;
      try
        Lines.Text := Output;
        if (Lines.Count > 0) and (Trim(Lines[0]) <> '') then
          Result := Trim(Lines[0]);
      finally
        Lines.Free;
      end;
    end;
  end;
end;

procedure WriteUrlShortcut(const FileName, Url: String);
var
  Lines: TStringList;
begin
  Lines := TStringList.Create;
  try
    Lines.Add('[InternetShortcut]');
    Lines.Add('URL=' + Url);
    Lines.SaveToFile(FileName);
  finally
    Lines.Free;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
var
  ResultCode: Integer;
  EnvPath: String;
begin
  if CurStep = ssPostInstall then
  begin
    EnvPath := ExpandConstant('{app}\.env');

    { Register + start the background task at system startup (not per-user
      logon) so the server runs regardless of which account is logged into
      this PC, and runs as SYSTEM so it doesn't depend on a specific user
      staying logged in. Mirrors install-service.ps1's approach otherwise. }
    Exec(ExpandConstant('{sys}\schtasks.exe'),
      '/Create /F /SC ONSTART /RU SYSTEM /TN "{#MyTaskName}" /TR "\"' + ExpandConstant('{app}\{#MyAppExeName}') + '\"" /RL HIGHEST',
      '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
    Exec(ExpandConstant('{sys}\schtasks.exe'), '/Run /TN "{#MyTaskName}"',
      '', SW_HIDE, ewWaitUntilTerminated, ResultCode);

    { Desktop shortcuts on the shared (all-users) desktop, since this runs
      as a background service for whoever uses this PC, not just the
      installing admin. No credentials in either, just a URL. }
    WriteUrlShortcut(ExpandConstant('{commondesktop}\CFO OS (This PC).url'), 'http://localhost:8000');
    LanIP := DetectLanIP();
    WriteUrlShortcut(ExpandConstant('{commondesktop}\CFO OS Dashboard (Network).url'), 'http://' + LanIP + ':8000');
  end;
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
var
  ResultCode: Integer;
begin
  if CurUninstallStep = usUninstall then
  begin
    Exec(ExpandConstant('{sys}\schtasks.exe'), '/End /TN "{#MyTaskName}"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
    Exec(ExpandConstant('{sys}\schtasks.exe'), '/Delete /F /TN "{#MyTaskName}"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;
end;

[UninstallDelete]
Type: files; Name: "{commondesktop}\CFO OS (This PC).url"
Type: files; Name: "{commondesktop}\CFO OS Dashboard (Network).url"

[Messages]
FinishedLabel=Setup has installed CFO OS and started it in the background.%n%nEdit "{app}\.env" with your real MSSQL/AI/SMTP credentials, then log off and back on (or restart the "{#MyTaskName}" scheduled task) for them to take effect.%n%nTwo shortcuts were placed on your desktop: one for this PC, and one labeled "(Network)" you can copy to other people's desktops so they can reach the dashboard over your local network -- it contains no credentials, just a web address.
