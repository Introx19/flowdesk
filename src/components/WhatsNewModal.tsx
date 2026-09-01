import { X, Sparkles } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const CURRENT_VERSION = '1.8.4';

export default function WhatsNewModal({ onClose }: { onClose: () => void }) {
  const { language } = useSettings();
  
  const items = language === 'ru' ? [
    { icon: '⚡', title: 'Починен Автокликер и Human Typer', desc: 'Автокликер и эмулятор печати Human Typer теперь работают идеально на уровне системы с глобальными хоткеями.' },
    { icon: '📚', title: 'Библиотека в компактном режиме', desc: 'При клике на библиотеку в компактном режиме открывается удобное окно для быстрого запуска любого DLC.' },
    { icon: '📦', title: 'Установщик с выбором папки', desc: 'При первичной установке доступен выбор папки и ярлыков, а обновления происходят тихо и быстро в фоне.' },
    { icon: '🪟', title: 'Вертикальные кнопки мини-режима', desc: 'Кнопки выхода из компактного режима выстроены вертикально и легко нажимаются.' },
    { icon: '🤖', title: 'Super Humanizer v1.0.0', desc: 'AI-студия для очеловечивания текста, обход AI-детекторов, режим маскировки (F9) и соглашение EULA.' },
  ] : [
    { icon: '⚡', title: 'AutoClicker & Human Typer Fixed', desc: 'AutoClicker and Human Typer keystroke simulator now work seamlessly via global hotkeys.' },
    { icon: '📚', title: 'Library in Compact Mode', desc: 'Clicking the library icon in compact mode now opens a standalone window to easily launch any tool.' },
    { icon: '📦', title: 'Custom Installer Directory', desc: 'Initial installer allows custom installation path & shortcuts, while updates remain fast and silent in the background.' },
    { icon: '🪟', title: 'Vertical Compact Mode Controls', desc: 'Controls at the bottom of the compact sidebar are arranged vertically for effortless clicking.' },
    { icon: '🤖', title: 'Super Humanizer v1.0.0', desc: 'AI ghostwriting studio, AI detector bypass, Stealth Mode (F9), and EULA disclaimer.' },
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

