import os

path = r'd:\Yarik\Antigravity projects\flowdesk\src\components\Settings.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%' }}>"""

replacement = """            </div>
            
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '20px' }}>
              <h3 style={{ marginTop: 0, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🏆 {language === 'ru' ? 'Зал славы тестировщиков' : 'Testers Hall of Fame'}
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)' }}>
                <li>Yarik (Introx) - Creator & Lead Tester</li>
                <li>Antigravity - AI Assistant</li>
                {/* Add more friends here later! */}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                className="action-btn outline" 
                style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1em' }}
                onClick={() => {
                  if (window.electronAPI) {
                    window.electronAPI.openExternal('https://github.com/Introx19/TesseraDesk/issues');
                  }
                }}
              >
                🐛 {language === 'ru' ? 'Сообщить об ошибке' : 'Report a Bug'}
              </button>
              
              <button 
                className="action-btn active" 
                style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1em', background: 'linear-gradient(45deg, #ff6b6b, #ff8e53)', border: 'none', color: '#fff' }}
                onClick={() => {
                  modal.alert('🍵 Спасибо что нажали на эту кнопку но функционала у нее пока что нет сорри. ₍^. .^₎Ⳋ');
                }}
              >
                ☕ {language === 'ru' ? 'Поддержать автора' : 'Donate'}
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: '100%' }}>"""

content = content.replace(target, replacement)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added About buttons and Hall of Fame")
