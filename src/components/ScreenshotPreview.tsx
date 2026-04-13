import { useState, useEffect } from 'react';
import { X, Minus } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { t, type Lang } from '../i18n/texts';

export default function ScreenshotPreview() {
  const { language } = useSettings();
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onScreenshotData((data) => {
        setDataUrl(data);
      });
    }
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (dataUrl && window.electronAPI) {
      window.electronAPI.showScreenshotMenu(dataUrl, {
        saveAs: t(language as Lang, 'saveAs'),
        copy: t(language as Lang, 'copy'),
        openPaint: t(language as Lang, 'openPaint')
      });
    }
  };

  const closeWindow = () => {
    if (window.electronAPI) {
      window.electronAPI.closePreviewWindow();
    }
  };

  const minimizeWindow = () => {
    if (window.electronAPI) {
      window.electronAPI.windowMinimize();
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="titlebar-drag-region">
        <div className="titlebar-controls" style={{ marginLeft: 'auto' }}>
          <button className="win-btn" onClick={minimizeWindow}>
            <Minus size={14} />
          </button>
          <button className="win-btn close" onClick={closeWindow}>
            <X size={14} />
          </button>
        </div>
      </div>
      <div 
         style={{ flex: 1, padding: '40px 20px 20px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
         onContextMenu={handleContextMenu}
         title={t(language as Lang, 'screenshotPreviewHint')}
      >
        {dataUrl ? (
          <img src={dataUrl} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }} alt="Screenshot" />
        ) : (
          <p>{t(language as Lang, 'screenshotPreviewLoading')}</p>
        )}
      </div>
    </div>
  );
}
