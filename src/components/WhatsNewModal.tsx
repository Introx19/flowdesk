import { X, Sparkles } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const CURRENT_VERSION = '1.8.3';

export default function WhatsNewModal({ onClose }: { onClose: () => void }) {
  const { language } = useSettings();
  
  const items = language === 'ru' ? [
    { icon: '🤖', title: 'Super Humanizer', desc: 'Новый DLC — AI-студия для очеловечивания текста и обхода AI-детекторов. Режим маскировки (F9), AI Scan, 6 стилей письма.' },
    { icon: '⌨️', title: 'Human Typer', desc: 'Новый DLC — имитирует живую печать человека с опечатками и паузами. Работает глобально через хоткей даже вне приложения.' },
    { icon: '📚', title: 'Библиотека DLC + Drag & Drop', desc: 'Полный рефакторинг таскбара: три зоны, перетаскивание иконок с индикаторами, кнопка Сброс, защита служебных кнопок.' },
    { icon: '🪟', title: 'Умный ресайз окон', desc: 'Окно больше не блокируется при смене плагина. Каждый инструмент автоматически устанавливает свой минимальный размер.' },
    { icon: '🖼️', title: 'Графический редактор восстановлен', desc: 'Image Editor сломался во время обновления — полностью восстановлен и улучшен.' },
    { icon: '🐛', title: 'Исправления и полировка', desc: 'Починены скриншоты, Import в Заметках, краши Dev Tools. Убраны виндовые select-ы. Умные углы при максимизации окна.' },
  ] : [
    { icon: '🤖', title: 'Super Humanizer', desc: 'New DLC — AI studio for humanizing text & bypassing AI detectors. Stealth mode (F9), AI Scan, 6 writing styles.' },
    { icon: '⌨️', title: 'Human Typer', desc: 'New DLC — simulates real human typing with typos and pauses. Works globally via hotkey even outside the app.' },
    { icon: '📚', title: 'DLC Library + Drag & Drop', desc: 'Full taskbar rewrite: three zones, icon drag-and-drop with indicators, Reset button, protected utility buttons.' },
    { icon: '🪟', title: 'Smart Window Resizing', desc: 'Window no longer locks when switching plugins. Each tool sets its own minimum size without blocking manual resizing.' },
    { icon: '🖼️', title: 'Image Editor Restored', desc: 'The Image Editor broke during the update — fully restored and improved.' },
    { icon: '🐛', title: 'Fixes & Polish', desc: 'Fixed screenshots, Notes Import, DevTools crashes. Removed Windows-native selects. Smart corners on maximize.' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
      backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', zIndex: 10000,
      animation: 'fadeIn 0.4s ease-out'
    }}>
      <div style={{ 
        width: '480px', maxWidth: '95%', maxHeight: '90vh',
        borderRadius: '18px', position: 'relative',
        boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        background: 'var(--bg-main)',
        display: 'flex', flexDirection: 'column'
      }}>
        
        {/* Header gradient */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(255,210,0,0.1) 0%, rgba(255,255,255,0.03) 100%)',
          padding: '20px 24px 16px', 
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <Sparkles size={20} style={{ color: 'var(--accent)' }} />
              <h2 style={{ margin: 0, fontSize: '1.15em', color: 'var(--text-main)' }}>
                {language === 'ru' ? 'Что нового?' : "What's New?"}
              </h2>
            </div>
            <span style={{ fontSize: '0.8em', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
              TESSERA DESK v{CURRENT_VERSION}
            </span>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Items list */}
        <div className="custom-scrollbar" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px 14px' }}>
              <span style={{ fontSize: '1.4em', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88em', marginBottom: '4px', color: 'var(--text-main)' }}>{item.title}</div>
                <div style={{ fontSize: '0.81em', color: 'var(--text-muted)', lineHeight: 1.55 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <button className="action-btn" style={{ width: '100%', padding: '12px', fontSize: '0.95em', fontWeight: 700 }} onClick={onClose}>
            {language === 'ru' ? '🚀 Поехали!' : "🚀 Let's go!"}
          </button>
        </div>

      </div>
    </div>
  );
}

export const checkWhatsNew = () => {
  const lastSeen = localStorage.getItem('lastSeenVersion');
  if (lastSeen !== CURRENT_VERSION) {
    localStorage.setItem('lastSeenVersion', CURRENT_VERSION);
    return true;
  }
  return false;
};

