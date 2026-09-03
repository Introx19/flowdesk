import InfoButton from '../InfoButton';
import React, { useState, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Keyboard, Type, Settings, Play, Square, AlertCircle, Pause } from 'lucide-react';

const HumanTyper: React.FC = () => {
  const { language, updateSettings, humanTyperSpeed, humanTyperErrors, humanTyperThinkPct, humanTyperStartHotkey, humanTyperStopHotkey } = useSettings();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [localText, setLocalText] = useState('');

  useEffect(() => {
    if (window.electronAPI && window.electronAPI.onHumanTyperState) {
      window.electronAPI.onHumanTyperState((state: boolean) => {
        setIsActive(state);
        if (!state) setIsPaused(false);
      });
      if (window.electronAPI.onHumanTyperPaused) {
        window.electronAPI.onHumanTyperPaused((pausedState: boolean) => {
          setIsPaused(pausedState);
        });
      }
    }
  }, []);

  const handleStart = () => {
    if (window.electronAPI) {
      window.electronAPI.startHumanTyping(localText, {
        speed: humanTyperSpeed,
        errors: humanTyperErrors,
        thinkPct: humanTyperThinkPct,
        thinkMin: 350,
        thinkMax: 1400
      });
    }
  };

  const handleStop = () => {
    if (window.electronAPI) {
      window.electronAPI.stopHumanTyping();
    }
  };

  return (
    <div className="tool-window autoclicker-window">
      <div className="tool-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Keyboard size={20} className="tool-icon" />
          <h2>Human Typer</h2>
          <InfoButton text={language === 'ru' ? 'Human Typer имитирует реальную печать текста человеком с опечатками, паузами и исправлениями.' : 'Simulates authentic human typing with typos, backspace corrections, and natural thinking pauses.'} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`icon-btn ${showSettings ? 'active' : ''}`}
            onClick={() => setShowSettings(!showSettings)}
            title="Настройки печати"
          >
            <Settings size={18} />
          </button>
          
        </div>
      </div>

      <div className="tool-content" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {showSettings ? (
          <div className="settings-section" style={{ marginTop: 0 }}>
            <h3>Настройки Имитации</h3>
            
            <div className="setting-item">
              <div className="setting-info">
                <span>Базовая задержка (мс)</span>
                <span className="setting-desc">Время между нажатиями (чем меньше, тем быстрее)</span>
              </div>
              <input 
                type="number" 
                value={humanTyperSpeed} 
                onChange={(e) => updateSettings({ humanTyperSpeed: Number(e.target.value) })}
                style={{ width: '80px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', color: 'var(--text-color)', outline: 'none' }}
                min={10} max={500}
              />
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <span>Шанс опечаток (%)</span>
                <span className="setting-desc">Вероятность сделать опечатку в слове и затем исправить её</span>
              </div>
              <input 
                type="number" 
                value={humanTyperErrors} 
                onChange={(e) => updateSettings({ humanTyperErrors: Number(e.target.value) })}
                style={{ width: '80px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', color: 'var(--text-color)', outline: 'none' }}
                min={0} max={100}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <span>Паузы на обдумывание (%)</span>
                <span className="setting-desc">Шанс зависнуть между словами, "подумывая" над текстом</span>
              </div>
              <input 
                type="number" 
                value={humanTyperThinkPct} 
                onChange={(e) => updateSettings({ humanTyperThinkPct: Number(e.target.value) })}
                style={{ width: '80px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', color: 'var(--text-color)', outline: 'none' }}
                min={0} max={100}
              />
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <span>Отправка новой строки</span>
                <span className="setting-desc">Как печатать Enter</span>
              </div>
              <select 
                value={useSettings().humanTyperEnterMode} 
                onChange={(e) => updateSettings({ humanTyperEnterMode: e.target.value as any })}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', color: 'var(--text-color)', outline: 'none', cursor: 'pointer' }}
              >
                <option value="enter" style={{ background: '#1e1e24' }}>Просто Enter</option>
                <option value="shift+enter" style={{ background: '#1e1e24' }}>Shift + Enter (для мессенджеров)</option>
              </select>
            </div>

            <h4 style={{ margin: '10px 0 5px 0', opacity: 0.8, fontSize: '0.9em' }}>Глобальные Хоткеи</h4>
            
            <div className="setting-item">
              <span>Хоткей Старта</span>
              <input 
                type="text" 
                className="custom-hotkey-input"
                value={humanTyperStartHotkey} 
                readOnly
                onKeyDown={(e) => {
                  e.preventDefault();
                  const keys = [];
                  if (e.ctrlKey) keys.push('CommandOrControl');
                  if (e.altKey) keys.push('Alt');
                  if (e.shiftKey) keys.push('Shift');
                  if (e.metaKey && !e.ctrlKey) keys.push('CommandOrControl');
                  if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return;
                  if ((e.key === 'Backspace' || e.key === 'Delete') && keys.length === 0) {
                    updateSettings({ humanTyperStartHotkey: '' });
                    return;
                  }
                  const pressedKey = e.key.length === 1 ? e.key.toUpperCase() : e.key;
                  keys.push(pressedKey);
                  updateSettings({ humanTyperStartHotkey: keys.join('+') });
                }}
                style={{ width: '120px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', color: 'var(--text-color)', outline: 'none', cursor: 'pointer' }}
                placeholder="Нажми кнопку..."
              />
            </div>
            
            <div className="setting-item">
              <span>Хоткей Паузы</span>
              <input 
                type="text" 
                className="custom-hotkey-input"
                value={useSettings().humanTyperPauseHotkey} 
                readOnly
                onKeyDown={(e) => {
                  e.preventDefault();
                  const keys = [];
                  if (e.ctrlKey) keys.push('CommandOrControl');
                  if (e.altKey) keys.push('Alt');
                  if (e.shiftKey) keys.push('Shift');
                  if (e.metaKey && !e.ctrlKey) keys.push('CommandOrControl');
                  if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return;
                  if ((e.key === 'Backspace' || e.key === 'Delete') && keys.length === 0) {
                    updateSettings({ humanTyperPauseHotkey: '' });
                    return;
                  }
                  const pressedKey = e.key.length === 1 ? e.key.toUpperCase() : e.key;
                  keys.push(pressedKey);
                  updateSettings({ humanTyperPauseHotkey: keys.join('+') });
                }}
                style={{ width: '120px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', color: 'var(--text-color)', outline: 'none', cursor: 'pointer' }}
                placeholder="Нажми кнопку..."
              />
            </div>

            <div className="setting-item">
              <span>Хоткей Остановки</span>
              <input 
                type="text" 
                className="custom-hotkey-input"
                value={humanTyperStopHotkey} 
                readOnly
                onKeyDown={(e) => {
                  e.preventDefault();
                  const keys = [];
                  if (e.ctrlKey) keys.push('CommandOrControl');
                  if (e.altKey) keys.push('Alt');
                  if (e.shiftKey) keys.push('Shift');
                  if (e.metaKey && !e.ctrlKey) keys.push('CommandOrControl');
                  if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return;
                  if ((e.key === 'Backspace' || e.key === 'Delete') && keys.length === 0) {
                    updateSettings({ humanTyperStopHotkey: '' });
                    return;
                  }
                  const pressedKey = e.key.length === 1 ? e.key.toUpperCase() : e.key;
                  keys.push(pressedKey);
                  updateSettings({ humanTyperStopHotkey: keys.join('+') });
                }}
                style={{ width: '120px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', color: 'var(--text-color)', outline: 'none', cursor: 'pointer' }}
                placeholder="Нажми кнопку..."
              />
            </div>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              background: 'rgba(0,0,0,0.2)',
              padding: '15px',
              borderRadius: '12px'
            }}>
              <label style={{ fontSize: '0.9em', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Type size={16} /> Текст для ввода:
              </label>
              <textarea 
                className="custom-scrollbar"
                style={{ minHeight: '120px', resize: 'vertical', width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px', color: 'var(--text-color)', outline: 'none' }}
                placeholder="Вставьте сюда текст для печати, или просто скопируйте его и нажмите глобальный хоткей (по умолчанию F10) вне приложения."
                value={localText}
                onChange={e => setLocalText(e.target.value)}
              />
            </div>

            {isActive ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="timer-btn stop" onClick={handleStop} style={{ padding: '15px', flex: 1 }}>
                  <Square size={20} />
                  Остановить
                </button>
                <button 
                  className={`timer-btn ${isPaused ? 'start' : 'pause'}`} 
                  onClick={isPaused ? () => window.electronAPI.resumeHumanTyping() : () => window.electronAPI.pauseHumanTyping()} 
                  style={{ padding: '15px', flex: 1, background: isPaused ? 'var(--accent)' : '#ffb020', color: '#1a1a24' }}
                >
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  {isPaused ? 'Возобновить' : 'Пауза'}
                </button>
              </div>
            ) : (
              <button 
                className="timer-btn start" 
                onClick={handleStart} 
                style={{ padding: '15px' }}
                disabled={!localText.trim()}
              >
                <Play size={20} />
                Напечатать текст
              </button>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6, fontSize: '0.85em', marginTop: '10px', justifyContent: 'center' }}>
              <AlertCircle size={14} />
              <span>После нажатия Старт у вас будет 400мс, чтобы сфокусироваться на нужном окне.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HumanTyper;
