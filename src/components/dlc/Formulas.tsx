import { useState, useMemo } from 'react';
import { Search, Copy, CheckCircle2 } from 'lucide-react';
import { useWindowSize } from '../../hooks/useWindowSize';
import formulasData from './formulas.json';
import { useSettings } from '../../contexts/SettingsContext';
import { t, type Lang } from '../../i18n/texts';

interface FormulaItem {
  name: string;
  formula: string;
  description: string;
}

interface FormulaCategory {
  category: string;
  items: FormulaItem[];
}

export default function Formulas() {
  const { isSm } = useWindowSize();
  const { language } = useSettings();
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const langData: FormulaCategory[] = ((formulasData as unknown as Record<string, FormulaCategory[]>)[language]) ?? ((formulasData as unknown as Record<string, FormulaCategory[]>).ru) ?? [];

  const filteredData = useMemo(() => {
    if (!search.trim()) return langData;
    
    const query = search.toLowerCase();
    
    const filtered = langData.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.formula.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      )
    })).filter(cat => cat.items.length > 0);
    
    return filtered;
  }, [search, language]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="panel" style={{ height: '100%', padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      {!isSm && (
        <div style={{ padding: '15px 15px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ margin: 0 }}>{t(language as Lang, 'formulas')}</h2>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ padding: '15px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </div>
          <input 
            type="text" 
            className="input" 
            placeholder={t(language as Lang, 'formulasSearch')} 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '38px', paddingRight: '12px', height: '36px' }}
          />
        </div>
      </div>

      {/* Formulas List */}
      <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 15px 15px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredData.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px', fontSize: '0.9em' }}>
            {t(language as Lang, 'formulasNoResults')}
          </div>
        ) : (
          filteredData.map((cat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.85em', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {cat.category}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                {cat.items.map((item, j) => {
                  const uid = `${i}-${j}`;
                  return (
                    <div key={j} style={{ 
                      background: 'var(--bg-card)', 
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px', 
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      transition: 'border-color 0.2s',
                    }} className="formula-card">
                      <div style={{ fontSize: '0.9em', fontWeight: 500, color: 'var(--text-main)' }}>
                        {item.name}
                      </div>
                      
                      <div style={{ 
                        background: 'rgba(0,0,0,0.2)', 
                        padding: '10px', 
                        borderRadius: '6px', 
                        fontFamily: 'monospace', 
                        fontSize: '1em',
                        color: 'var(--accent)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ overflowX: 'auto', whiteSpace: 'nowrap' }} className="custom-scrollbar">{item.formula}</span>
                        <button 
                          className="win-btn" 
                          onClick={() => copyToClipboard(item.formula, uid)}
                          title={t(language as Lang, 'copy')}
                          style={{ padding: '4px', background: copiedIndex === uid ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: copiedIndex === uid ? '#10b981' : 'inherit' }}
                        >
                          {copiedIndex === uid ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        </button>
                      </div>

                      {item.description && (
                        <div style={{ fontSize: '0.75em', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
