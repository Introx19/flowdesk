import { useState, useEffect } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { useSettings } from '../contexts/SettingsContext';
import { t, type Lang } from '../i18n/texts';

export default function Stopwatch() {
  const { isXs, isSm, isMd, width } = useWindowSize();
  const { language } = useSettings();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<{ id: number; time: number }[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => setTime((t) => t + 10), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => { setIsRunning(false); setTime(0); setLaps([]); };
  const addLap = () => setLaps([...laps, { id: Date.now(), time }]);
  const removeLap = (id: number) => setLaps(laps.filter(lap => lap.id !== id));
  const clearLaps = () => setLaps([]);

  const formatTime = (ms: number) => {
    const min = Math.floor(ms / 60000).toString().padStart(2, '0');
    const sec = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const mili = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${min}:${sec}.${mili}`;
  };

  const clockSize = Math.max(1.5, Math.min(3.5, width * 0.1)) + 'rem';

  // ── XS: only the running clock ────────────────────────────────────────────
  if (isXs) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ fontSize: clockSize, fontWeight: 700, fontFamily: 'monospace', color: 'var(--accent)', lineHeight: 1, whiteSpace: 'nowrap' }}>
          {formatTime(time)}
        </div>
      </div>
    );
  }

  // ── SM: clock + start/reset ───────────────────────────────────────────────
  if (isSm) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '8px', overflow: 'hidden' }}>
        <div style={{ fontSize: clockSize, fontWeight: 700, fontFamily: 'monospace', color: 'var(--accent)', lineHeight: 1, whiteSpace: 'nowrap' }}>
          {formatTime(time)}
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.85em' }} onClick={toggleTimer}>{isRunning ? '⏸' : '▶'}</button>
          <button className="btn" style={{ padding: '4px 12px', fontSize: '0.85em' }} onClick={resetTimer}>✕</button>
        </div>
      </div>
    );
  }

  // ── MD: clock + start/lap/reset, no lap list ─────────────────────────────
  if (isMd) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px', gap: '12px', overflow: 'hidden' }}>
        <h2 style={{ fontSize: '0.9em', margin: 0, color: 'var(--text-muted)' }}>{t(language as Lang, 'stopwatch')}</h2>
        <div style={{ fontSize: clockSize, fontWeight: 700, fontFamily: 'monospace', color: 'var(--accent)', lineHeight: 1 }}>
          {formatTime(time)}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ padding: '6px 14px' }} onClick={toggleTimer}>{isRunning ? t(language as Lang, 'pause') : t(language as Lang, 'start')}</button>
          <button className="btn" style={{ padding: '6px 14px' }} onClick={addLap} disabled={!isRunning && time === 0}>{t(language as Lang, 'lapBtn')}</button>
          <button className="btn" style={{ padding: '6px 14px' }} onClick={resetTimer}>{t(language as Lang, 'reset')}</button>
        </div>
        {laps.length > 0 && (
          <div style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>{laps.length} {t(language as Lang, 'lapsCount')}</div>
        )}
      </div>
    );
  }

  // ── FULL: clock + buttons + lap list ─────────────────────────────────────
  return (
    <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2>{t(language as Lang, 'stopwatch')}</h2>
        <div style={{ fontSize: '3.5rem', fontWeight: 600, fontFamily: 'monospace', color: 'var(--accent)' }}>
          {formatTime(time)}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={toggleTimer}>{isRunning ? t(language as Lang, 'pause') : t(language as Lang, 'start')}</button>
          <button className="btn" onClick={addLap} disabled={!isRunning && time === 0}>{t(language as Lang, 'lapBtn')}</button>
          <button className="btn" onClick={resetTimer}>{t(language as Lang, 'reset')}</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', marginTop: '20px', paddingRight: '5px' }}>
        {laps.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>{t(language as Lang, 'lapsLabel')}</span>
            <button className="btn" onClick={clearLaps} style={{ padding: '4px 8px', fontSize: '12px' }}>{t(language as Lang, 'clearAll')}</button>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {laps.slice().reverse().map((lap, index) => (
            <div key={lap.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-card)', padding: '10px', borderRadius: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>#{laps.length - index}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>{formatTime(lap.time)}</span>
              <button className="win-btn close" onClick={() => removeLap(lap.id)} style={{ cursor: 'pointer' }} title={t(language as Lang, 'remove')}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
