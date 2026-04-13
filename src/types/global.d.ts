export interface ElectronAPI {
  setAlwaysOnTop: (flag: boolean) => void;
  windowClose: () => void;
  windowMinimize: () => void;
  openPaint: (filePath?: string) => void;
  takeScreenshot: () => void;
  setCompactMode: (isCompact: boolean) => void;
  openToolWindow: (tool: string) => void;
  showScreenshotMenu: (dataUrl: string, strings?: any) => void;
  onScreenshotData: (callback: (dataUrl: string) => void) => void;
  closePreviewWindow: () => void;
  selectFile: (filters: any[]) => Promise<string | null>;
  updateShortcuts: (shortcuts: any) => void;
  showNotification: (title: string, body: string) => void;
  setStartupMode: (runOnStartup: boolean) => void;
  setMiniMode: (isMini: boolean) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
