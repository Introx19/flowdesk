import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { Globe } from 'lucide-react';

export default function Onboarding() {
  const { language, updateSettings } = useSettings();
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [langPicked, setLangPicked] = useState(false);

  useEffect(() => {
    // Show tutorial on first launch unless it's been triggered manually
    if (!localStorage.getItem('flowdesk-tutorial-seen')) {
        setIsVisible(true);
    }
    
    // Listen for manual trigger from settings
    const trigger = () => {
      setStep(0);
      setLangPicked(true);
      setIsVisible(true);
    };
    window.addEventListener('trigger-onboarding', trigger);
    return () => window.removeEventListener('trigger-onboarding', trigger);
  }, []);

  if (!isVisible) return null;

  const close = () => {
    localStorage.setItem('flowdesk-tutorial-seen', 'true');
    setIsVisible(false);
  };

  const stepsRu = [
    { title: 'Добро пожаловать в FlowDesk', text: 'Универсальный инструмент для учебы и фокуса (Hub версии 1.0). Давайте изучим функционал!' },
    { title: 'Секреты интерфейса', text: '✔ Нажмите Правой Кнопкой Мыши (ПКМ) по иконке капли 💧, чтобы мгновенно изменить прозрачность приложения.\n✔ Вкладка "Доп. контент" (в Настройках) скрывает множество новых DLC.' },
    { title: 'Максимум пользы', text: '✔ Вкладка "Доп. контент" (в Настройках) скрывает Таблицу Менделеева, Шпаргалки формул, Графики и Решатель Интегралов.\n✔ Все DLC можно вытаскивать как отдельные Плавающие Окна (клик средней кнопкой мыши по боковому меню).' },
    { title: 'Управление окнами', text: '✔ Любое открытое окно (таймер, калькулятор) можно закрыть повторным нажатием той же горячей клавиши, которой вы его открыли.' }
  ];

  const stepsEn = [
    { title: 'Welcome to FlowDesk', text: 'Universal learning & focus hub (Version 1.0). Let\'s explore the features!' },
    { title: 'UI Secrets', text: '✔ Right Click (RMB) on the droplet icon 💧 to instantly adjust app opacity.\n✔ "DLC Tools" tab in Settings unlocks many new features.' },
    { title: 'Max Utility', text: '✔ "DLC Tools" tab in Settings unlocks Periodic Table, Formulas, Graphs, and Integrals solver.\n✔ You can detach all DLCs as Floating Windows!' },
    { title: 'Window Management', text: '✔ Any opened window can be closed by pressing the same global shortcut you used to open it.' }
  ];

  const steps = language === 'ru' ? stepsRu : stepsEn;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'var(--bg-main)', width: '380px', padding: '25px', borderRadius: '16px',
        border: '1px solid var(--glass-border)', textAlign: 'center', boxShadow: '0 0 50px rgba(0,0,0,0.5)'
      }}>
        {!langPicked ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Globe size={48} style={{ margin: '0 auto', color: 'var(--accent)' }} />
            <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Select Language<br/><span style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>Выберите язык</span></h2>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className={`panel ${language === 'en' ? 'active' : ''}`}
                style={{ flex: 1, padding: '20px', cursor: 'pointer', border: language === 'en' ? '2px solid var(--accent)' : '1px solid var(--glass-border)' }}
                onClick={() => updateSettings({ language: 'en' })}
              >
                <div style={{ fontSize: '2em', marginBottom: '10px' }}>🇬🇧</div>
                <div style={{ fontWeight: 'bold' }}>English</div>
              </button>
              
              <button 
                className={`panel ${language === 'ru' ? 'active' : ''}`}
                style={{ flex: 1, padding: '20px', cursor: 'pointer', border: language === 'ru' ? '2px solid var(--accent)' : '1px solid var(--glass-border)' }}
                onClick={() => updateSettings({ language: 'ru' })}
              >
                <div style={{ fontSize: '2em', marginBottom: '10px' }}>🇷🇺</div>
                <div style={{ fontWeight: 'bold' }}>Русский</div>
              </button>
            </div>
            
            <button className="btn btn-primary" style={{ padding: '12px', marginTop: '10px' }} onClick={() => setLangPicked(true)}>
              {language === 'ru' ? 'Продолжить' : 'Continue'}
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ marginTop: 0, color: 'var(--accent)', fontSize: '1.2em' }}>{steps[step].title}</h3>
            <div style={{ color: 'var(--text-main)', fontSize: '0.95em', minHeight: '80px', textAlign: 'left', whiteSpace: 'pre-line' }}>{steps[step].text}</div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '15px' }}>
              {steps.map((_, i) => (
                 <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === step ? 'var(--accent)' : 'var(--glass-border)' }}></div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="action-btn outline" onClick={close} style={{ padding: '4px 12px', fontSize: '0.9em' }}>
                {language === 'ru' ? 'Пропустить' : 'Skip'}
              </button>
              {step < steps.length - 1 ? (
                <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                  {language === 'ru' ? 'Далее' : 'Next'}
                </button>
              ) : (
                 <button className="btn btn-primary" onClick={close}>
                  {language === 'ru' ? 'Начать работу!' : 'Get Started!'}
                 </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
