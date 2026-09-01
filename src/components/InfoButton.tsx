import { useState } from 'react';
import { Info } from 'lucide-react';

export default function InfoButton({ text }: { text: string }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '5px' }}>
      <button 
        className="icon-btn" 
        onClick={(e) => { e.stopPropagation(); setShow(!show); }}
        style={{ padding: '4px', opacity: 0.7, color: 'var(--accent)', background: 'transparent' }}
        title="Info"
      >
        <Info size={16} />
      </button>
      {show && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 999 }} onClick={(e) => { e.stopPropagation(); setShow(false); }} />
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: 'var(--bg-card)',
            border: '1px solid var(--accent)',
            padding: '10px 15px',
            borderRadius: '8px',
            zIndex: 1000,
            width: 'max-content',
            maxWidth: '300px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            fontSize: '0.85em',
            color: 'var(--text-main)',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.4,
            fontWeight: 'normal',
            textAlign: 'left',
            cursor: 'default'
          }} onClick={e => e.stopPropagation()}>
            {text}
          </div>
        </>
      )}
    </div>
  );
}
