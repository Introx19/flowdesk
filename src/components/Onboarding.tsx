import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { Globe, ArrowLeft } from 'lucide-react';

export default function Onboarding() {
  const { language, updateSettings } = useSettings();
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [langPicked, setLangPicked] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('tesseradesk-tutorial-seen')) {
        setIsVisible(true);
    }
    
    const trigger = () => {
      setStep(0);
      setLangPicked(true);
      setIsVisible(true);
    };
    window.addEventListener('trigger-onboarding', trigger);
    return () => window.removeEventListener('trigger-onboarding', trigger);
  }, []);

  const stepsRu = [
    { 
      target: null, 
      title: 'Добро пожаловать в TesseraDesk v1.8.4', 
      text: 'Универсальный модульный хаб для учёбы, работы, науки и автоматизации.\n\nПройдите этот короткий интерактивный гид, чтобы узнать обо всех фишках и возможностях программы!' 
    },
    { 
      target: 'nav-library', 
      title: 'Библиотека дополнений (DLC)', 
      text: '✔ Каталог всех расширений: Таблица Менделеева, Графики функций, AI Super Humanizer, Human Typer, Автокликер, Dev Tools и др.\n✔ Перетаскивайте (Drag & Drop) любые иконки на таскбар для настройки панели под себя!\n✔ Кнопка «Сброс» вернёт стандартный вид в один клик.' 
    },
    { 
      target: 'nav-stopwatch', 
      title: 'Секундомер', 
      text: '✔ Высокоточный секундомер с фиксацией кругов и сплитов.\n✔ Возможность выгрузки и просмотра истории результатов.\n✔ Открепляется в отдельное компактное плавающее окно для тренировок или тайминга.' 
    },
    { 
      target: 'nav-minitimer', 
      title: 'Мини-таймер & Pomodoro', 
      text: '✔ Быстрый таймер обратного отсчёта для любых задач.\n✔ Встроенный режим Pomodoro (25 мин фокуса / 5 мин отдыха) со звуковыми оповещениями.\n✔ Идеален для глубокой концентрации и тайм-менеджмента.' 
    },
    { 
      target: 'nav-reminders', 
      title: 'Напоминания и Будильники', 
      text: '✔ Создавайте важные напоминания на точное время или день.\n✔ Всплывающие системные тост-уведомления даже при свернутом приложении.\n✔ Звуковые сигналы гарантируют, что вы не пропустите событие.' 
    },
    { 
      target: 'nav-calc', 
      title: 'Калькулятор', 
      text: '✔ Стандартный и продвинутый инженерный режим с тригонометрией (RAD/DEG).\n✔ Сохранение полной истории вычислений.\n✔ Удобное управление с клавиатуры и моментальный расчёт формул.' 
    },
    { 
      target: 'nav-tasks', 
      title: 'Менеджер задач', 
      text: '✔ Интерактивный to-do список с приоритетами (высокий, средний, низкий).\n✔ Фильтрация по статусу выполнения.\n✔ Все задачи сохраняются автоматически и всегда под рукой.' 
    },
    { 
      target: 'nav-notes', 
      title: 'Умный блокнот', 
      text: '✔ Форматирование текста: жирный, курсив, зачёркнутый, списки, чекбоксы и маркеры цвета.\n✔ Вставка картинок прямо из буфера обмена (Ctrl+V) или перетаскиванием!\n✔ Автосохранение при каждом вводе.' 
    },
    { 
      target: 'nav-screenshot', 
      title: 'Умные скриншоты', 
      text: '✔ Мгновенный захват экрана, выделение любой области или всего монитора.\n✔ Режим быстрого снимка прямо в буфер обмена.\n✔ Всплывающее окно предпросмотра с таймером и быстрыми действиями.' 
    },
    { 
      target: 'nav-paint', 
      title: 'Графический редактор', 
      text: '✔ Полноценная рисовалка: кисти, маркеры, аэрозоль, геометрические фигуры и текст.\n✔ Послойное редактирование (Layers) и стрелки для разметки скриншотов.\n✔ Быстрое копирование готового арта в буфер или сохранение в PNG.' 
    },
    { 
      target: 'nav-dnd', 
      title: 'Режим «Не беспокоить»', 
      text: '✔ Один клик — и все звуковые эффекты таймеров и уведомлений глушатся.\n✔ Полезно на уроках, парах, звонках или во время важных презентаций.' 
    },
    { 
      target: 'nav-opacity', 
      title: 'Прозрачность интерфейса', 
      text: '✔ ЛКМ — мгновенно включает режим прозрачности для работы поверх других окон.\n✔ ПКМ — открывает плавный ползунок регулировки прозрачности (20%–100%).' 
    },
    { 
      target: 'nav-settings', 
      title: 'Настройки и Персонализация', 
      text: '✔ Выбор тем (Тёмная, Светлая, Мягкая) и кастомного акцентного цвета.\n✔ Настройка глобальных горячих клавиш.\n✔ Управление модулями DLC, проверка обновлений и Зал славы тестировщиков!' 
    },
    { 
      target: null, 
      title: 'Всё готово к работе!', 
      text: '✔ Открепление окон: нажмите на булавку или кликните СКМ по кнопке инструмента, чтобы открыть его в отдельном окне!\n✔ Подсказки: в каждом окне есть значок «i» с подробным описанием.\n✔ Мини-режим: сверните приложение в компактный квадратик 54×54 кнопкой вверху таскбара.' 
    }
  ];

  const stepsEn = [
    { 
      target: null, 
      title: 'Welcome to TesseraDesk v1.8.4', 
      text: 'Your modular desktop powerhouse for productivity, scientific research, and AI automation.\n\nTake this quick interactive tour to discover all pro features and hidden gems!' 
    },
    { 
      target: 'nav-library', 
      title: 'DLC Library & Drag & Drop', 
      text: '✔ Complete catalog of all tools: Periodic Table, 2D Graphs, AI Super Humanizer, Human Typer, AutoClicker, Dev Tools, and more.\n✔ Drag & drop any icon directly onto the sidebar to organize your custom dock!\n✔ The Reset button restores the default layout in one click.' 
    },
    { 
      target: 'nav-stopwatch', 
      title: 'Stopwatch', 
      text: '✔ High-precision stopwatch with lap times and split logging.\n✔ Exportable history and clean lap tracking.\n✔ Detachable into a compact floating timer widget for workouts and time trials.' 
    },
    { 
      target: 'nav-minitimer', 
      title: 'Mini Timer & Pomodoro', 
      text: '✔ Quick countdown timer with customizable presets.\n✔ Integrated Pomodoro mode (25m focus / 5m break) with custom audio chimes.\n✔ Perfect for deep focus and structured productivity sessions.' 
    },
    { 
      target: 'nav-reminders', 
      title: 'Reminders & Alarms', 
      text: '✔ Schedule important reminders for exact dates and times.\n✔ Custom system toast notifications appear even when the app is minimized.\n✔ Audio alerts ensure you never miss a deadline.' 
    },
    { 
      target: 'nav-calc', 
      title: 'Calculator', 
      text: '✔ Standard & Scientific modes with full trigonometry support (RAD/DEG).\n✔ Persistent calculation history with one-click reuse.\n✔ Full keyboard navigation and instant formula evaluation.' 
    },
    { 
      target: 'nav-tasks', 
      title: 'Task Manager', 
      text: '✔ Interactive to-do lists with priority tags (High, Medium, Low).\n✔ Filter by completed/active tasks.\n✔ Auto-saved locally so your agenda is always ready.' 
    },
    { 
      target: 'nav-notes', 
      title: 'Smart Notepad', 
      text: '✔ Rich text formatting: Bold, Italic, Strikethrough, Lists, Checkboxes & Color Highlighters.\n✔ Paste images directly from clipboard (Ctrl+V) or drag & drop files!\n✔ Real-time auto-saving with instant recovery.' 
    },
    { 
      target: 'nav-screenshot', 
      title: 'Smart Screenshots', 
      text: '✔ Instant screen capture with custom area crop or full screen.\n✔ Fast screenshot mode directly to clipboard.\n✔ Interactive preview popup with delay timer and quick save actions.' 
    },
    { 
      target: 'nav-paint', 
      title: 'Graphic Editor', 
      text: '✔ Full creative canvas: Brushes, markers, spray, shapes, and text tool.\n✔ Multi-layer support and step annotations for marking up screenshots.\n✔ Instant copy to clipboard or high-res PNG export.' 
    },
    { 
      target: 'nav-dnd', 
      title: 'Do Not Disturb', 
      text: '✔ One-click mute for all timer beeps and reminder chimes.\n✔ Essential during lectures, study sessions, calls, or presentations.' 
    },
    { 
      target: 'nav-opacity', 
      title: 'UI Opacity', 
      text: '✔ Left Click — instantly toggle see-through background mode.\n✔ Right Click — open smooth opacity slider (20%–100%) to match your desktop.' 
    },
    { 
      target: 'nav-settings', 
      title: 'Settings & Customization', 
      text: '✔ Theme presets (Dark, Light, Soft) and custom accent color picker.\n✔ Global system-wide hotkey configuration.\n✔ DLC management, auto-update checker, and Testers Hall of Fame!' 
    },
    { 
      target: null, 
      title: 'You\'re Ready to Roll!', 
      text: '✔ Floating Windows: Click the pin icon or middle-click any sidebar button to detach it into an independent window!\n✔ Info Badges: Click the glowing ‘i’ badge inside any tool for quick tips.\n✔ Mini Mode: Collapse into a 54×54 mini-square widget anytime using the top chevron button.' 
    }
  ];

  const steps = language === 'ru' ? stepsRu : stepsEn;
  const currentStepInfo = steps[step];

  useEffect(() => {
    document.querySelectorAll('.onboarding-highlight').forEach(el => el.classList.remove('onboarding-highlight'));
    if (langPicked && currentStepInfo?.target) {
      // Small delay to allow react rendering 
      setTimeout(() => {
        const el = document.getElementById(currentStepInfo.target!);
        if (el) {
          el.classList.add('onboarding-highlight');
          setTargetRect(el.getBoundingClientRect());
        } else {
          // If element doesn't exist (e.g. disabled tool), skip to next
          if (step < steps.length - 1) {
             setStep(s => s + 1);
          }
          setTargetRect(null);
        }
      }, 50);
    } else {
      setTargetRect(null);
    }
  }, [step, langPicked, currentStepInfo]);

  if (!isVisible) return null;

  const close = () => {
    document.querySelectorAll('.onboarding-highlight').forEach(el => el.classList.remove('onboarding-highlight'));
    localStorage.setItem('tesseradesk-tutorial-seen', 'true');
    setIsVisible(false);
  };

  const hasHole = langPicked && !!targetRect;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 9999, 
      background: hasHole ? 'transparent' : 'rgba(0,0,0,0.85)',
      pointerEvents: 'auto', overflow: 'hidden',
      display: hasHole ? 'block' : 'flex', 
      alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s'
    }}>
      {hasHole && (
        <div style={{
          position: 'absolute',
          top: targetRect.top - 5, left: targetRect.left - 5,
          width: targetRect.width + 10, height: targetRect.height + 10,
          border: '2px solid var(--accent)', borderRadius: '8px',
          boxShadow: '0 0 15px var(--accent-glow), 0 0 0 9999px rgba(0,0,0,0.85)',
          pointerEvents: 'none', transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }} />
      )}
      {!langPicked ? (
        <div style={{
          background: 'var(--bg-main)', width: '380px', padding: '25px', borderRadius: '16px',
          border: '1px solid var(--glass-border)', textAlign: 'center', boxShadow: '0 0 50px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Globe size={48} style={{ margin: '0 auto', color: 'var(--accent)' }} />
            <h2 style={{ margin: 0, color: 'var(--text-main)' }}>Select Language<br/><span style={{ fontSize: '0.8em', color: '#aaaaaa' }}>Выберите язык</span></h2>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className={`panel ${language === 'en' ? 'active' : ''}`}
                style={{ flex: 1, padding: '20px', cursor: 'pointer', border: language === 'en' ? '2px solid var(--accent)' : '1px solid var(--glass-border)', color: 'var(--text-main)' }}
                onClick={() => updateSettings({ language: 'en' })}
              >
                <div style={{ fontSize: '2em', marginBottom: '10px' }}>🇬🇧</div>
                <div style={{ fontWeight: 'bold' }}>English</div>
              </button>
              
              <button 
                className={`panel ${language === 'ru' ? 'active' : ''}`}
                style={{ flex: 1, padding: '20px', cursor: 'pointer', border: language === 'ru' ? '2px solid var(--accent)' : '1px solid var(--glass-border)', color: 'var(--text-main)' }}
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
        </div>
      ) : (
        <div style={{
          position: targetRect ? 'absolute' : 'relative',
          top: targetRect ? Math.min(Math.max(20, targetRect.top - 20), window.innerHeight - 340) : 'auto',
          left: targetRect ? targetRect.right + 20 : 'auto',
          background: 'var(--bg-main)', width: '380px', padding: '22px', borderRadius: '14px',
          border: '1px solid var(--accent)', textAlign: 'left', 
          boxShadow: '0 12px 48px rgba(0,0,0,0.7), 0 0 0 1px var(--accent-glow)',
          transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}>
          {targetRect && (
            <div style={{ position: 'absolute', left: '-25px', top: Math.max(15, targetRect.top - Math.min(Math.max(20, targetRect.top - 20), window.innerHeight - 340) + 6), color: 'var(--accent)' }}>
              <ArrowLeft size={30} fill="currentColor" />
            </div>
          )}
          <h3 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--accent)', fontSize: '1.18em', fontWeight: 600 }}>{currentStepInfo?.title}</h3>
          <div style={{ 
            color: 'var(--text-main)', 
            fontSize: '0.92em', 
            lineHeight: 1.55, 
            marginBottom: '22px', 
            whiteSpace: 'pre-line' 
          }}>
            {currentStepInfo?.text}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginBottom: '18px', marginTop: 'auto' }}>
            {steps.map((_, i) => (
               <div 
                 key={i} 
                 style={{ 
                   width: i === step ? '18px' : '6px', 
                   height: '6px', 
                   borderRadius: '3px', 
                   background: i === step ? 'var(--accent)' : 'var(--glass-border)',
                   boxShadow: i === step ? '0 0 8px var(--accent-glow)' : 'none',
                   transition: 'all 0.25s ease' 
                 }}
               />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="action-btn outline" onClick={close} style={{ padding: '6px 14px', fontSize: '0.88em' }}>
              {language === 'ru' ? 'Пропустить' : 'Skip'}
            </button>
            {step < steps.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setStep(step + 1)} style={{ padding: '6px 18px', fontSize: '0.9em' }}>
                {language === 'ru' ? 'Далее' : 'Next'}
              </button>
            ) : (
               <button className="btn btn-primary" onClick={close} style={{ padding: '6px 18px', fontSize: '0.9em' }}>
                {language === 'ru' ? 'Начать работу!' : 'Get Started!'}
               </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
