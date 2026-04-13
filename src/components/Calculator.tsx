import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { useWindowSize } from '../hooks/useWindowSize';
import { Settings2 } from 'lucide-react';
import { t, type Lang } from '../i18n/texts';
import { useSettings } from '../contexts/SettingsContext';

export default function Calculator() {
  const { isXs, isSm, width } = useWindowSize();
  const { language } = useSettings();
  const [display, setDisplay] = useState('0');
  const [isScientific, setIsScientific] = useState(() => localStorage.getItem('calc-mode') === 'sci');

  useEffect(() => {
    localStorage.setItem('calc-mode', isScientific ? 'sci' : 'std');
  }, [isScientific]);

  const appendNum = (num: string) => {
    setDisplay(prev => prev === '0' || prev === 'Error' ? num : prev + num);
  };

  const calculate = () => {
    try {
      if (!display.trim()) return;
      
      let expr = display;
      expr = expr.replace(/√/g, 'sqrt');
      expr = expr.replace(/π/g, 'pi');
      expr = expr.replace(/h/g, '(6.62607015e-34)');
      expr = expr.replace(/c/g, '(299792458)');

      const result = String(evaluate(expr));
      setDisplay(result);
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => setDisplay('0');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Игнорируем хоткеи если фокус в инпуте
      if (document.activeElement?.tagName === 'INPUT') return;

      const validKeys = ['0','1','2','3','4','5','6','7','8','9','/','*','-','+','.','(',')','^'];
      if (validKeys.includes(e.key)) {
        appendNum(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clear();
      } else if (e.key === 'Backspace') {
        setDisplay(prev => prev.length > 1 && prev !== 'Error' ? prev.slice(0, -1) : '0');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fontSize = Math.max(1.2, Math.min(2, width * 0.06)) + 'rem';

  if (isXs) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '8px' }}>
        <div style={{ fontSize: fontSize, fontWeight: 700, fontFamily: 'monospace', color: 'var(--accent)', textAlign: 'right', width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {display}
        </div>
      </div>
    );
  }

  return (
    <div className="panel" style={{ width: '100%', height: '100%', margin: '0 auto', gap: isSm ? '6px' : '15px', padding: isSm ? '4px' : undefined, display: 'flex', flexDirection: 'column' }}>
      {!isSm && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{t(language as Lang, 'calc')}</h2>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button 
              className={`btn ${isScientific ? 'btn-primary' : ''}`}
              title={t(language as Lang, 'scientificMode')}
              onClick={() => setIsScientific(!isScientific)}
              style={{ padding: '6px' }}
            >
              <Settings2 size={16} />
            </button>
          </div>
        </div>
      )}

      <div style={{ 
        background: 'var(--bg-card)', 
        padding: isSm ? '8px' : '15px', 
        borderRadius: '8px', 
        textAlign: 'right',
        fontSize: fontSize,
        marginBottom: isSm ? '4px' : '10px',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap'
      }}>
        {display}
      </div>

      <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
        {/* Scientific panel */}
        {isScientific && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isSm ? '4px' : '8px', flex: 1 }}>
            {[
              { label: '(', val: '(' }, { label: ')', val: ')' },
              { label: 'x²', val: '^2' }, { label: 'x³', val: '^3' },
              { label: '√', val: '√(' }, { label: '^', val: '^' },
              { label: 'π', val: 'π' }, { label: 'e', val: 'e' },
              { label: 'sin', val: 'sin(' }, { label: 'cos', val: 'cos(' },
              { label: 'h', val: 'h' }, // Постоянная планка
              { label: 'c', val: 'c' } // Скорость света
            ].map(btn => (
              <button 
                key={btn.label} 
                className="btn" 
                style={{ padding: '0', fontSize: '0.9em', background: 'var(--bg-card)', width: '100%', height: '100%' }} 
                onClick={() => appendNum(btn.val)}
                title={btn.label === 'h' ? 'Постоянная Планка' : btn.label === 'c' ? 'Скорость света' : undefined}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* Numpad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: isSm ? '4px' : '8px', flex: isScientific ? 2 : 1 }}>
          {['C', '(', ')', '←'].map(btn => (
            <button key={btn} className={`btn ${btn === 'C' || btn === '←' ? 'btn-primary' : ''}`} style={{ padding: '0', width: '100%', height: '100%', fontSize: '1.2em' }} onClick={() => {
              if (btn === 'C') clear();
              else if (btn === '←') setDisplay(prev => prev.length > 1 && prev !== 'Error' ? prev.slice(0, -1) : '0');
              else appendNum(btn);
            }}>{btn}</button>
          ))}
          {['7', '8', '9', '/'].map(btn => <button key={btn} className="btn" style={{ padding: '0', width: '100%', height: '100%', fontSize: '1.2em' }} onClick={() => appendNum(btn)}>{btn}</button>)}
          {['4', '5', '6', '*'].map(btn => <button key={btn} className="btn" style={{ padding: '0', width: '100%', height: '100%', fontSize: '1.2em' }} onClick={() => appendNum(btn)}>{btn}</button>)}
          {['1', '2', '3', '-'].map(btn => <button key={btn} className="btn" style={{ padding: '0', width: '100%', height: '100%', fontSize: '1.2em' }} onClick={() => appendNum(btn)}>{btn}</button>)}
          {['0', '.', '=', '+'].map(btn => (
            <button key={btn} className={`btn ${btn === '=' ? 'btn-primary' : ''}`} style={{ padding: '0', width: '100%', height: '100%', fontSize: '1.2em' }} onClick={() => {
               if (btn === '=') calculate();
               else appendNum(btn);
            }}>{btn}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
