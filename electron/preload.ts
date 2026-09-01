import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  setAlwaysOnTop: (flag: boolean) => ipcRenderer.send('set-always-on-top', flag),
  windowClose: () => ipcRenderer.send('window-close'),
  windowMinimize: () => ipcRenderer.send('window-minimize'),
  ensureMinimumSize: (w: number, h: number) => ipcRenderer.send('ensure-minimum-size', w, h),
  windowMaximize: () => ipcRenderer.send('window-maximize'),
  windowToggleMaximize: () => ipcRenderer.send('window-toggle-maximize'),
  windowHide: () => ipcRenderer.send('window-hide'),
  windowShow: () => ipcRenderer.send('window-show'),
  expandForPicker: () => ipcRenderer.sendSync('expand-for-picker'),
  restoreFromPicker: () => ipcRenderer.sendSync('restore-from-picker'),
  openPaint: (filePath?: string) => ipcRenderer.send('open-paint', filePath),
  openPaintWithImage: (dataUrl: string) => ipcRenderer.send('open-paint-with-image', dataUrl),
  requestScreenshotData: () => ipcRenderer.send('request-screenshot-data'),
  requestNotificationData: () => ipcRenderer.send('request-notification-data'),
  takeScreenshot: (multiMode?: boolean, fastMode?: boolean, delay?: number, saveToDisk?: boolean, customFolder?: string | null) => ipcRenderer.send('take-screenshot', multiMode, fastMode, delay, saveToDisk, customFolder),
  setCompactMode: (isCompact: boolean, height?: number) => ipcRenderer.send('set-compact-mode', isCompact, height),
  openToolWindow: (tool: string) => ipcRenderer.send('open-tool-window', tool),
  showScreenshotMenu: (dataUrl: string, strings?: Record<string, string>) => ipcRenderer.send('show-screenshot-menu', dataUrl, strings),
  sendCroppedScreenshot: (dataUrl: string, multiMode: boolean) => ipcRenderer.send('cropped-screenshot', dataUrl, multiMode),
  onScreenshotData: (callback: (dataUrl: string) => void) => {
    ipcRenderer.on('load-screenshot-data', (_event, data) => callback(data))
  },
  onAddScreenshotLayer: (callback: (dataUrl: string) => void) => {
    ipcRenderer.on('add-screenshot-layer', (_event, data) => callback(data))
  },
  closePreviewWindow: () => ipcRenderer.send('close-preview-window'),
  selectFile: (filters: any[]) => ipcRenderer.invoke('select-file', filters),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  updateShortcuts: (shortcuts: any, multiScreenshot: boolean, fastScreenshot?: boolean, delay?: number) => ipcRenderer.send('update-shortcuts', shortcuts, multiScreenshot, fastScreenshot, delay),
  showNotification: (title: string, body: string, image?: string) => ipcRenderer.send('show-notification', title, body, image),
  onFastScreenshotDone: (callback: (dataUrl: string) => void) => {
    ipcRenderer.removeAllListeners('fast-screenshot-done');
    ipcRenderer.on('fast-screenshot-done', (_event, dataUrl) => callback(dataUrl));
  },
  onNotificationData: (callback: (data: any) => void) => {
    ipcRenderer.removeAllListeners('notification-data');
    ipcRenderer.on('notification-data', (_event, data) => callback(data));
  },
  setStartupMode: (runOnStartup: boolean) => ipcRenderer.send('set-startup-mode', runOnStartup),
  setMiniMode: (isMini: boolean) => ipcRenderer.send('set-mini-mode', isMini),
  checkUpdates: () => ipcRenderer.invoke('check-updates'),
  onUpdateAvailable: (callback: (info: any) => void) => {
    const listener = (_event: any, info: any) => callback(info);
    ipcRenderer.on('update-available', listener);
    return () => ipcRenderer.removeListener('update-available', listener);
  },
  onDownloadProgress: (callback: (progress: any) => void) => {
    const listener = (_event: any, progress: any) => callback(progress);
    ipcRenderer.on('download-progress', listener);
    return () => ipcRenderer.removeListener('download-progress', listener);
  },
  onUpdateDownloaded: (callback: (info: any) => void) => {
    const listener = (_event: any, info: any) => callback(info);
    ipcRenderer.on('update-downloaded', listener);
    return () => ipcRenderer.removeListener('update-downloaded', listener);
  },
  onUpdateError: (callback: (error: string) => void) => {
    const listener = (_event: any, error: string) => callback(error);
    ipcRenderer.on('update-error', listener);
    return () => ipcRenderer.removeListener('update-error', listener);
  },
  openExternal: (url: string) => ipcRenderer.send('open-external', url),
  downloadUpdate: () => ipcRenderer.send('download-update'),
  installUpdate: () => ipcRenderer.send('install-update'),
  onToggleGlobalShortcuts: (callback: () => void) => ipcRenderer.on('toggle-global-shortcuts', () => callback()),
  resizeWindow: (width: number, height: number) => ipcRenderer.send('resize-window', width, height),
  forceResizeWindow: (width: number, height: number) => ipcRenderer.send('force-resize-window', width, height),
  killPort: (port: number) => ipcRenderer.invoke('kill-port', port),
  setAutoclickerConfig: (hotkey: string, interval: number, intervalUnit: 'ms'|'s'|'m', button: 'left'|'right'|'middle', randomizeMs: number) => {
    ipcRenderer.send('set-autoclicker-config', hotkey, interval, intervalUnit, button, randomizeMs)
  },
  onAutoclickerStateChanged: (callback: (isActive: boolean) => void) => {
    ipcRenderer.removeAllListeners('autoclicker-state-changed');
    ipcRenderer.on('autoclicker-state-changed', (_event, isActive) => callback(isActive));
  },
  onWindowMaximized: (callback: (isMaximized: boolean) => void) => {
    ipcRenderer.removeAllListeners('window-maximized');
    ipcRenderer.on('window-maximized', (_event, isMaximized) => callback(isMaximized));
  },
  setHumanTyperConfig: (startHotkey: string, stopHotkey: string, config: any) => {
    ipcRenderer.send('set-human-typer-config', startHotkey, stopHotkey, config);
  },
  startHumanTyping: (text: string, config: any) => {
    ipcRenderer.send('start-human-typing', text, config);
  },
  stopHumanTyping: () => ipcRenderer.send('stop-human-typing'),
  onHumanTyperState: (callback: (isActive: boolean) => void) => {
    ipcRenderer.removeAllListeners('human-typer-state');
    ipcRenderer.on('human-typer-state', (_event, isActive) => callback(isActive));
  },
  updateAiKey: (key: string) => ipcRenderer.send('update-ai-key', key),
  analyzeText: (data: any) => ipcRenderer.invoke('analyze-text', data),
  humanizeText: (data: any) => ipcRenderer.invoke('humanize-text', data)
})
