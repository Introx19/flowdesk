import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { t, type Lang } from '../i18n/texts';
import { 
  Timer as TimerIcon, Hourglass, Pin, Calculator as CalculatorIcon, List, 
  StickyNote, FlaskConical, LineChart, BookOpen, FunctionSquare, Scale, 
  Globe, Terminal, MousePointerClick, Coins, LayoutGrid, Palette, Scissors, Keyboard, Sparkles, RefreshCcw
} from 'lucide-react';
import { useWindowSize } from '../hooks/useWindowSize';

interface LibraryProps {
  onOpenTool: (toolId: string) => void;
  openPaint: () => void;
  takeScreenshot: () => void;
}

export default function Library({ onOpenTool, openPaint, takeScreenshot }: LibraryProps) {
  const { language, activeTools, pinnedTools, pinnedOrder, updateSettings } = useSettings();
  const { isSm } = useWindowSize();

  const allTools = [
    { id: 'calc', icon: CalculatorIcon, name: t(language as Lang, 'calc') },
    { id: 'notes', icon: StickyNote, name: t(language as Lang, 'notes') },
    { id: 'tasks', icon: List, name: t(language as Lang, 'tasks') },
    { id: 'stopwatch', icon: TimerIcon, name: t(language as Lang, 'stopwatch') },
    { id: 'minitimer', icon: Hourglass, name: t(language as Lang, 'minitimer') },
    { id: 'reminders', icon: Pin, name: t(language as Lang, 'reminders') },
    { id: 'periodicTable', icon: FlaskConical, name: t(language as Lang, 'periodicTable') },
    { id: 'desmos', icon: LineChart, name: t(language as Lang, 'desmos') },
    { id: 'formulas', icon: BookOpen, name: t(language as Lang, 'formulas') },
    { id: 'integrals', icon: FunctionSquare, name: t(language as Lang, 'integrals') },
    { id: 'converter', icon: Scale, name: t(language as Lang, 'converter') },
    { id: 'worldClock', icon: Globe, name: t(language as Lang, 'dlc_worldClock_name' as any) || 'World Clock' },
    { id: 'devTools', icon: Terminal, name: t(language as Lang, 'dlc_devTools_name' as any) || 'Dev Tools' },
    { id: 'autoclicker', icon: MousePointerClick, name: t(language as Lang, 'autoclicker') },
    { id: 'numismatics', icon: Coins, name: t(language as Lang, 'numismatics_title' as any) || 'Numismatics' },
    { id: 'humanTyper', icon: Keyboard, name: 'Human Typer' },
    { id: 'superHumanizer', icon: Sparkles, name: 'Super Humanizer' },
    { id: 'paint', icon: Palette, name: t(language as Lang, 'paint'), customAction: openPaint },
    { id: 'screenshot', icon: Scissors, name: t(language as Lang, 'screenshot'), customAction: takeScreenshot },
  ];

  // Only show tools that are active/installed
  const availableTools = allTools.filter(t => (activeTools as any)[t.id]);

  const togglePin = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isNowPinned = !pinnedTools[id];
    let newOrder = [...pinnedOrder];
    
    if (isNowPinned && !newOrder.includes(id)) {
      newOrder.push(id);
    } else if (!isNowPinned) {
      newOrder = newOrder.filter(item => item !== id);
    }

    updateSettings({
      pinnedTools: {
        ...pinnedTools,
        [id]: isNowPinned
      },
      pinnedOrder: newOrder
    });
  };

  const resetToCore = () => {
    const corePinned = {
      stopwatch: true,
      minitimer: true,
      reminders: true,
      calc: true,
      tasks: true,
      notes: true,
      screenshot: true,
      paint: true
    };
    const coreOrder = ['stopwatch', 'minitimer', 'reminders', 'calc', 'tasks', 'notes', 'screenshot', 'paint'];
    
    updateSettings({
      pinnedTools: corePinned,
      pinnedOrder: coreOrder
    });
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'transparent',
      color: 'var(--text-main)',
    }}>
      {!isSm && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px 0 25px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center'
          }}>
            <LayoutGrid size={16} style={{ marginRight: '8px' }} />
            {language === 'ru' ? 'Библиотека' : 'Library'}
          </h2>
          <button 
            onClick={resetToCore}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '8px',
              color: 'var(--text-main)',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            title={language === 'ru' ? 'Сбросить к базовым плагинам' : 'Reset to core plugins'}
          >
            <RefreshCcw size={14} />
            {language === 'ru' ? 'Сброс' : 'Reset'}
          </button>
        </div>
      )}
      
      <div className="custom-scrollbar" style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '20px',
        alignContent: 'start'
      }}>
        {availableTools.map(tool => {
          const isPinned = pinnedTools[tool.id];
          return (
            <div 
              key={tool.id}
              onClick={() => tool.customAction ? tool.customAction() : onOpenTool(tool.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 10px',
                borderRadius: '16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
              }}
              title={language === 'ru' ? 'Нажмите чтобы открыть. ПКМ чтобы закрепить.' : 'Click to open. Right click to pin.'}
              onContextMenu={(e) => {
                e.preventDefault();
                togglePin(e, tool.id);
              }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', tool.id);
                e.dataTransfer.effectAllowed = 'copyMove';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)'
              }}>
                <tool.icon size={24} />
              </div>
              <div style={{
                fontSize: '0.85em',
                fontWeight: 500,
                textAlign: 'center',
                color: 'var(--text-main)',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {tool.name}
              </div>
              
              <button
                onClick={(e) => togglePin(e, tool.id)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  background: isPinned ? 'var(--accent)' : 'rgba(0,0,0,0.2)',
                  color: isPinned ? '#000' : 'var(--text-muted)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  opacity: isPinned ? 1 : 0.5,
                  transition: 'all 0.2s'
                }}
                title={isPinned ? (language === 'ru' ? 'Открепить' : 'Unpin') : (language === 'ru' ? 'Закрепить на панели' : 'Pin to sidebar')}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = isPinned ? '1' : '0.5'}
              >
                <Pin size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
