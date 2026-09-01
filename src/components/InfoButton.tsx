import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface InfoButtonProps {
  text: string;
  align?: 'left' | 'right' | 'auto';
}

export default function InfoButton({ text, align = 'auto' }: InfoButtonProps) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<'left' | 'right'>('left');
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (show && btnRef.current) {
      if (align === 'left' || align === 'right') {
        setPosition(align);
      } else {
        const rect = btnRef.current.getBoundingClientRect();
        // If button is in the right 40% of the screen, open to the left, otherwise open to the right
        if (rect.right > window.innerWidth * 0.6) {
          setPosition('right');
        } else {
          setPosition('left');
        }
      }
    }
  }, [show, align]);

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '6px', flexShrink: 0 }}>
      <button 
        ref={btnRef}
        type="button"
        className="icon-btn info-btn-highlight" 
        onClick={(e) => { e.stopPropagation(); setShow(!show); }}
        style={{ 
          width: '20px',
          height: '20px',
          padding: 0,
          opacity: show ? 1 : 0.85, 
          color: 'var(--accent)', 
          background: 'transparent',
          border: 'none',
          filter: show ? 'drop-shadow(0 0 6px var(--accent))' : 'drop-shadow(0 0 3px var(--accent-glow))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        title="Информация"
      >
        <Info size={16} strokeWidth={2} />
      </button>

      {show && (
        <>
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }} 
            onClick={(e) => { e.stopPropagation(); setShow(false); }} 
          />
          <div 
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: position === 'left' ? 0 : 'auto',
              right: position === 'right' ? 0 : 'auto',
              background: 'var(--bg-card, #1a1a24)',
              border: '1px solid var(--glass-border, rgba(255,255,255,0.12))',
              padding: '8px 12px',
              borderRadius: '8px',
              zIndex: 9999,
              width: 'max-content',
              maxWidth: '220px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              fontSize: '11.5px',
              color: 'var(--text-main, #e0e0e0)',
              whiteSpace: 'normal',
              lineHeight: 1.45,
              fontWeight: 400,
              textAlign: 'left',
              cursor: 'default',
              animation: 'tooltipFade 0.15s ease-out'
            }} 
            onClick={e => e.stopPropagation()}
          >
            {text}
          </div>
        </>
      )}

      <style>{`
        @keyframes tooltipFade {
          from { opacity: 0; transform: translateY(-3px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

