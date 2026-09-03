# 🛠 Гайд по созданию плагинов (DLC) для TesseraDesk

Добро пожаловать в экосистему плагинов TesseraDesk! Эта инструкция поможет вам создать, собрать и установить собственное расширение (DLC) для нашей утилиты.

## 📁 Структура плагина
Любой плагин для TesseraDesk состоит из папки, внутри которой должны быть минимум два файла:
1. `manifest.json` — метаданные плагина.
2. `index.js` — скомпилированный код плагина (обычно React-компонент в формате UMD или ES-модуля).
3. `style.css` (опционально) — стили плагина.

Пример структуры:
```
TesseraDesk/
└── plugins/
    └── my-awesome-plugin/
        ├── manifest.json
        ├── index.js
        └── style.css
```

---

## 📝 manifest.json
Этот файл рассказывает приложению о вашем плагине. Пример содержания:
```json
{
  "id": "com.myname.awesomeplugin",
  "name": "Awesome Plugin",
  "version": "1.0.0",
  "description": "Мой первый крутой плагин для TesseraDesk!",
  "author": "MyName",
  "main": "index.js",
  "icon": "Box"
}
```
* **icon**: Имя иконки из библиотеки `lucide-react` (например, `Box`, `Calculator`, `PenTool`).

---

## ⚛️ Разработка компонента (React)
Ваш плагин должен экспортировать React компонент по умолчанию (`export default`). 
TesseraDesk передаст в ваш компонент объект `context`, через который вы можете взаимодействовать с ядром:

```tsx
// Пример компонента (MyPlugin.tsx)
import React from 'react';

export default function MyAwesomePlugin({ context }) {
  return (
    <div className="tool-container">
      <div className="tool-header">
        <span className="tool-title">Мой Супер Плагин</span>
      </div>
      <div className="tool-content">
        <p>Привет, мир! Текущая тема: {context.theme}</p>
        <button className="settings-button" onClick={() => context.writeTextToClipboard("Привет из плагина!")}>
          Скопировать текст
        </button>
      </div>
    </div>
  );
}
```

### Доступные методы `context`:
- `context.theme`: текущая тема (`"dark"`, `"light"` и т.д.)
- `context.language`: текущий язык (`"ru"`, `"en"`)
- `context.writeTextToClipboard(text)`: скопировать текст
- `context.readTextFromClipboard()`: прочитать текст

---

## 🎨 Дизайн и CSS-переменные
Пожалуйста, используйте встроенные CSS-переменные TesseraDesk, чтобы ваш плагин выглядел органично при любой теме:
- `var(--text-color)` — основной цвет текста.
- `var(--glass-bg)` — полупрозрачный фон блоков.
- `var(--glass-border)` — цвет рамок панелей.
- `var(--accent-color)` — акцентный цвет (для кнопок и чекбоксов).

---

## 📦 Сборка плагина (с помощью Vite)
Поскольку TesseraDesk загружает уже скомпилированные файлы, проще всего собирать плагин через Vite в режиме библиотеки (Library Mode).

1. Создайте пустой проект React.
2. В файле `vite.config.ts` укажите:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.tsx', // Ваш главный файл
      name: 'MyAwesomePlugin',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      // Исключаем React из сборки, так как он уже есть в ядре
      external: ['react', 'react-dom'],
    }
  }
})
```
3. Выполните `npm run build`. Ваш файл появится в папке `dist/index.js`.
4. Перенесите `index.js`, `style.css` (если есть) и `manifest.json` в папку `%APPDATA%\TesseraDesk\plugins\Ваш_Плагин\`.

## ⚠️ Безопасность
Помните, что плагины от сторонних разработчиков при первом запуске вызовут у пользователя **Красное окно предупреждения** о потенциальной опасности. Если вы хотите, чтобы ваш плагин вошел в официальный доверенный каталог (без окна предупреждения), свяжитесь с разработчиком (Yarik) для получения официальной подписи!
