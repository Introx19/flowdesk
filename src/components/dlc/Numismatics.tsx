import { useState, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Coins, Settings2, ChevronDown } from 'lucide-react';
import { translations } from '../../i18n/texts';
import InfoButton from '../InfoButton';

type Lang = 'en' | 'ru';
const t = (lang: Lang, key: keyof typeof translations['en']) => translations[lang][key] || translations['en'][key];

const CURRENCIES = [
  { id: 'sun', name: 'Sun', defaultMultiplier: 32768, color: '#A020F0' },
  { id: 'crown', name: 'Crown', defaultMultiplier: 512, color: '#FFD700' },
  { id: 'cog', name: 'Cog', defaultMultiplier: 64, color: '#DAA520' },
  { id: 'sprocket', name: 'Sprocket', defaultMultiplier: 16, color: '#B0C4DE' },
  { id: 'bevel', name: 'Bevel', defaultMultiplier: 8, color: '#D3D3D3' },
  { id: 'spur', name: 'Spur', defaultMultiplier: 1, color: '#CD7F32' }
];

interface CustomPreset {
  id: string;
  name: string;
  multipliers: Record<string, number>;
}

export default function Numismatics() {
  const { language } = useSettings();
  const [credits, setCredits] = useState<number>(0);
  
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>(() => {
    const saved = localStorage.getItem('numismatics-custom-presets');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    // Migrate old format if exists
    const oldSaved = localStorage.getItem('numismatics-custom');
    if (oldSaved) {
      try {
        const oldMults = JSON.parse(oldSaved);
        return [{ id: 'custom-1', name: 'Custom 1', multipliers: oldMults }];
      } catch (e) {}
    }
    return [{ id: 'custom-1', name: 'Custom 1', multipliers: { sun: 32768, crown: 512, cog: 64, sprocket: 16, bevel: 8, spur: 1 } }];
  });

  const [activePresetId, setActivePresetId] = useState<string>('classic');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('numismatics-custom-presets', JSON.stringify(customPresets));
  }, [customPresets]);

  const activeCustomPreset = customPresets.find(p => p.id === activePresetId);

  const getMultiplier = (id: string) => {
    if (activePresetId === 'classic' || !activeCustomPreset) {
      return CURRENCIES.find(c => c.id === id)?.defaultMultiplier || 1;
    }
    return activeCustomPreset.multipliers[id] || 1;
  };

  const handleInputChange = (id: string, value: string) => {
    const cleanValue = value.replace(/,/g, '');
    if (cleanValue.trim() === '') {
      setCredits(0);
      return;
    }
    const num = parseFloat(cleanValue);
    if (isNaN(num)) return;
    
    setCredits(num * getMultiplier(id));
  };

  const formatValue = (creditsAmount: number, multiplier: number) => {
    if (creditsAmount === 0) return '';
    const val = creditsAmount / multiplier;
    const str = Number.isInteger(val) ? val.toString() : val.toFixed(4).replace(/\.?0+$/, '');
    const parts = str.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
  };

  return (
    <div className="tool-container">
      <div className="tool-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Coins size={20} />
        <span className="tool-title">{t(language as Lang, 'numismatics_title' as any) || 'Numismatics'}</span>
        <InfoButton text={t(language as Lang, 'dlc_numismatics_desc' as any) || 'Numismatics tool'} />
      </div>
      <style>{`
        .numismatics-input::-webkit-outer-spin-button,
        .numismatics-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .numismatics-input {
          -moz-appearance: textfield;
        }
      `}</style>
      
      <div className="tool-content" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            {language === 'ru' 
              ? 'Конвертер валют Create Numismatics.' 
              : 'Create Numismatics converter.'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  minWidth: '120px'
                }}
              >
                <span style={{ flex: 1, textAlign: 'left' }}>{activePresetId === 'classic' ? 'Classic' : activeCustomPreset?.name || 'Unknown'}</span>
                <ChevronDown size={14} style={{ opacity: 0.6 }} />
              </div>
              
              {isDropdownOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 98 }} onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(false); }} />
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '4px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    zIndex: 99,
                    minWidth: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}>
                    <div 
                      onClick={() => { setActivePresetId('classic'); setIsDropdownOpen(false); }}
                      style={{ padding: '6px 10px', cursor: 'pointer', borderRadius: '4px', background: activePresetId === 'classic' ? 'var(--accent)' : 'transparent', color: activePresetId === 'classic' ? '#000' : 'var(--text-main)', textAlign: 'left' }}
                    >
                      Classic
                    </div>
                    {customPresets.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => { setActivePresetId(p.id); setIsDropdownOpen(false); }}
                        style={{ padding: '6px 10px', cursor: 'pointer', borderRadius: '4px', background: activePresetId === p.id ? 'var(--accent)' : 'transparent', color: activePresetId === p.id ? '#000' : 'var(--text-main)', textAlign: 'left' }}
                      >
                        {p.name}
                      </div>
                    ))}
                    <div style={{ height: '1px', background: 'var(--glass-border)', margin: '4px 0' }}></div>
                    <div 
                      onClick={() => {
                        const id = 'custom-' + Date.now();
                        setCustomPresets([...customPresets, { id, name: `Custom ${customPresets.length + 1}`, multipliers: { sun: 32768, crown: 512, cog: 64, sprocket: 16, bevel: 8, spur: 1 } }]);
                        setActivePresetId(id);
                        setIsDropdownOpen(false);
                      }}
                      style={{ padding: '6px 10px', cursor: 'pointer', borderRadius: '4px', color: 'var(--accent)', fontWeight: 'bold', textAlign: 'left' }}
                    >
                      + {language === 'ru' ? 'Создать' : 'Add New'}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {activePresetId !== 'classic' && (
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  className="icon-btn"
                  style={{ padding: '6px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-muted)' }}
                  onClick={() => {
                    const newName = prompt(language === 'ru' ? 'Введите название пресета:' : 'Enter preset name:', activeCustomPreset?.name);
                    if (newName) {
                      setCustomPresets(prev => prev.map(p => p.id === activePresetId ? { ...p, name: newName } : p));
                    }
                  }}
                  title={language === 'ru' ? 'Переименовать' : 'Rename'}
                >
                  <Settings2 size={14} />
                </button>
                <button
                  className="icon-btn"
                  style={{ padding: '6px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#ef4444' }}
                  onClick={() => {
                    if (confirm(language === 'ru' ? 'Удалить этот пресет?' : 'Delete this preset?')) {
                      setCustomPresets(prev => prev.filter(p => p.id !== activePresetId));
                      setActivePresetId('classic');
                    }
                  }}
                  title={language === 'ru' ? 'Удалить' : 'Delete'}
                >
                  <span style={{ fontSize: '14px', lineHeight: '14px' }}>×</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {CURRENCIES.map(curr => (
          <div key={curr.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'var(--bg-card)', 
            padding: '12px 16px', 
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            gap: '15px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '50%', 
              background: curr.color, 
              flexShrink: 0, 
              boxShadow: `0 0 10px ${curr.color}80` 
            }} />
            <div style={{ flex: 1, fontWeight: 500, fontSize: '1.1em', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{t(language as Lang, `numismatics_${curr.id}` as any) || curr.name}</span>
              {activePresetId !== 'classic' && curr.id !== 'spur' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7em', color: 'var(--text-muted)' }}>
                  <span>=</span>
                  <input 
                    type="number"
                    className="numismatics-input"
                    value={activeCustomPreset?.multipliers?.[curr.id] || ''}
                    onChange={e => {
                       const val = parseInt(e.target.value);
                       if (!isNaN(val)) {
                         setCustomPresets(prev => prev.map(p => {
                           if (p.id === activePresetId) {
                             return { ...p, multipliers: { ...p.multipliers, [curr.id]: Math.max(1, val) } };
                           }
                           return p;
                         }));
                       }
                    }}
                    style={{ width: '65px', padding: '4px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', textAlign: 'center', fontFamily: 'monospace' }}
                  />
                  <span>Spur</span>
                </div>
              )}
            </div>
            <input
              type="text"
              className="numismatics-input"
              value={formatValue(credits, getMultiplier(curr.id))}
              onChange={(e) => handleInputChange(curr.id, e.target.value)}
              placeholder="0"
              style={{ 
                width: '120px', 
                textAlign: 'right', 
                padding: '10px 12px', 
                borderRadius: '8px', 
                border: '1px solid var(--border-color)', 
                background: 'var(--bg-color)', 
                color: 'var(--text-color)',
                outline: 'none',
                fontFamily: 'monospace',
                fontSize: '1.1em',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-glow)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
