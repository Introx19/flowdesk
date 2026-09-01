# TesseraDesk Auto-Updater Architecture & Rules

**CRITICAL: Do NOT modify the auto-updater flow without explicit user consent. This architecture was specifically designed and stabilized in v1.8.2.**

## 1. Core Architecture
- **No Silent Downloads:** `autoUpdater.autoDownload = false` is strictly enforced in `electron/main.ts`. We do NOT download updates silently in the background.
- **Global Prompting:** When `autoUpdater.checkForUpdatesAndNotify()` finds an update, it emits the `update-available` event. This is caught globally in `src/App.tsx`, which triggers a UI modal asking the user if they want to update *now* or *later*.
- **Explicit Download Trigger:** If the user agrees, `App.tsx` calls `window.electronAPI.downloadUpdate()`, which triggers `autoUpdater.downloadUpdate()` in the main process.

## 2. IPC Listeners (Anti-Leak Pattern)
- In `electron/preload.ts`, do **NOT** use `ipcRenderer.removeAllListeners(...)`. 
- All update-related listeners (`onUpdateAvailable`, `onDownloadProgress`, `onUpdateDownloaded`, `onUpdateError`) are designed to return a cleanup function (e.g., `return () => ipcRenderer.removeListener(...)`). 
- When adding these listeners to a React component (like `Settings.tsx` or `App.tsx`), you **must** call these cleanup functions in the `useEffect` return block.

## 3. Error Handling
- Unsigned Windows applications (without a paid Code Signing Certificate) often face silent blocks from Windows SmartScreen or `electron-updater` itself.
- We handle this by explicitly catching `autoUpdater.on('error', ...)` in `main.ts` and forwarding it via `update-error`.
- `Settings.tsx` renders this error in a dedicated red warning panel under the "About" tab, providing a manual "Download from GitHub" fallback button. Do NOT remove this fallback.

## 4. Releasing a New Version
When creating a new release (e.g., via a Python script or manual upload):
1. Ensure the `package.json` version is bumped.
2. Build using `npm run build:exe` (which runs `vite build` and `electron-builder`).
3. You **MUST** upload all 3 critical files to the GitHub release:
   - `TesseraDesk Setup vX.X.X.exe`
   - `TesseraDesk Setup vX.X.X.exe.blockmap` (required for differential updates)
   - `latest.yml` (required for the updater to detect the version)

### 4.1 CRITICAL: File Naming on GitHub
When uploading the `.exe` file to GitHub via API or manually, **the uploaded filename must EXACTLY MATCH the `path` and `url` specified in `latest.yml`.**
- By default, `electron-builder` replaces spaces with hyphens in `latest.yml` (e.g., `TesseraDesk-Setup-1.8.2.exe`).
- If you upload the file and GitHub saves it with dots (e.g., `TesseraDesk.Setup.1.8.2.exe`), `electron-updater` will request the hyphenated version, receive a 404 Not Found error, and fail silently in the background (causing the UI to freeze on the "Downloading" state).
- **Always verify:** Open `latest.yml` locally, check the `path:` field, and upload the `.exe` forcing that EXACT name using the `?name=` query parameter in the GitHub API.
