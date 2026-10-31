# Yule Link Icons

> ⚠️ **Written entirely by Claude or another AI model** (Claude is Anthropic's AI assistant). No human has reviewed the code line by line. Use at your own risk.
> ⚠️ **Написано полностью Клодом или другой ИИ-моделью** (Клод — ИИ-ассистент Anthropic). Построчной проверки кода человеком не было. Используйте на свой риск.

<details>
<summary><b>🇬🇧 English</b></summary>

A unified icon system for all link types in Obsidian: internal vault links, external web links, and local file links (`file:///`).

## Features

### Three link types — three icon sets

| Link type | Syntax | Default icon |
|---|---|---|
| **Internal** | `[[note]]` | SVG Obsidian stone |
| **External** | `[text](https://...)` | SVG Globe |
| **Local file** | `[text](file:///...)` | Customizable symbol |

### Icon options

- **SVG icons** — built-in Obsidian stone and globe, color-adjustable
- **Color emoji** — pick from a preset grid or type your own
- **Monochrome symbols** — Unicode characters with custom color via color picker

Multiple characters can be used as a single icon (e.g. `★→` or `📄✨`).

### Local file icons

Two modes:
- **Single icon** for all files — with optional per-directory rules
- **Per extension** — different icons for `.pdf`, `.docx`, `.mp3`, etc.

#### Per-directory rules

When using single icon mode, you can override the icon based on keywords in the file path:

| Rule | Path | Result |
|---|---|---|
| `work` → 💼 | `file:///C:/work/report.pdf` | 💼 |
| `music` → 🎵 | `file:///D:/music/song.mp3` | 🎵 |

Rules are checked top-to-bottom; first match wins.

#### Custom extensions

Add file extensions not in the default list (e.g. `.sketch`, `.blend`, `.fig`).

### Color control

For each link type independently:
- **Icon color** — color picker with presets (for SVG and B/W symbols)
- **Link color** — either inherit from theme/other plugins, or override with a custom color

### Positioning

Fine-tune icon placement for each link type:
- **Horizontal offset** — shift left or right (-15 to +15 px)
- **Gap** — distance between icon and link text (0 to 15 px)

### Custom symbol library

Save your favorite symbols for quick access across all icon pickers.

## Settings UI

- **Preview** — stays at the top of the settings and shows all three link types
- **Collapsible sections** — each link type in its own block with distinct background
- **Color-coded blocks** — purple for internal, teal for external, amber for files
- **Interface** — no emoji in UI labels, structure set by typography and spacing

## Installation

### Manual

1. Download `main.js` and `manifest.json`
2. Create folder `.obsidian/plugins/yule-link-icons/`
3. Place both files inside
4. Restart Obsidian
5. Enable the plugin in Settings → Community plugins

### Important

Disable any CSS snippets that add icons to links (e.g. globe icons, Obsidian stone via `::before`). This plugin replaces all of that functionality.

## Compatibility

- Works in **Live Preview** and **Reading View**
- Compatible with themes (tested with Underwater)
- Respects other plugins' link coloring when set to "Default" color mode
- Tested with Obsidian 1.4+

## Known limitations

- When cursor is on a link in Live Preview, CM6 shows raw markdown — icons appear via regex matching in that state
- Link color override may not beat plugins that use inline styles (e.g. Link Colorer) — use "Default" mode and let those plugins handle color

## License

MIT

</details>

<details>
<summary><b>🇷🇺 Русский</b></summary>

Единая система значков для всех типов ссылок в Obsidian: внутренних ссылок хранилища, внешних веб-ссылок и ссылок на локальные файлы (`file:///`).

## Возможности

### Три типа ссылок — три набора значков

| Тип ссылки | Синтаксис | Значок по умолчанию |
|---|---|---|
| **Внутренняя** | `[[note]]` | SVG-камень Obsidian |
| **Внешняя** | `[text](https://...)` | SVG-глобус |
| **Локальный файл** | `[text](file:///...)` | Настраиваемый символ |

### Варианты значков

- **SVG-значки** — встроенные камень Obsidian и глобус, цвет настраивается
- **Цветные эмодзи** — выбор из готовой сетки или ввод своего
- **Одноцветные символы** — символы Unicode с произвольным цветом через палитру

В качестве одного значка можно использовать несколько символов (например, `★→` или `📄✨`).

### Значки для локальных файлов

Два режима:
- **Один значок** для всех файлов — с необязательными правилами по папкам
- **По расширению** — разные значки для `.pdf`, `.docx`, `.mp3` и т. д.

#### Правила по папкам

В режиме одного значка можно переопределить значок по ключевым словам в пути к файлу:

| Правило | Путь | Результат |
|---|---|---|
| `work` → 💼 | `file:///C:/work/report.pdf` | 💼 |
| `music` → 🎵 | `file:///D:/music/song.mp3` | 🎵 |

Правила проверяются сверху вниз; срабатывает первое совпадение.

#### Свои расширения

Можно добавить расширения, которых нет в списке по умолчанию (например, `.sketch`, `.blend`, `.fig`).

### Управление цветом

Для каждого типа ссылок отдельно:
- **Цвет значка** — палитра с готовыми цветами (для SVG и одноцветных символов)
- **Цвет ссылки** — либо наследуется от темы или других плагинов, либо переопределяется своим цветом

### Положение

Точная настройка положения значка для каждого типа ссылок:
- **Горизонтальное смещение** — сдвиг влево или вправо (от -15 до +15 px)
- **Отступ** — расстояние между значком и текстом ссылки (от 0 до 15 px)

### Библиотека своих символов

Сохраняйте любимые символы для быстрого доступа во всех выборщиках значков.

## Интерфейс настроек

- **Предпросмотр** — остаётся вверху настроек, показывает все три типа ссылок
- **Сворачиваемые разделы** — каждый тип ссылок в отдельном блоке с собственным фоном
- **Блоки с цветовой маркировкой** — фиолетовый для внутренних, бирюзовый для внешних, янтарный для файлов
- **Интерфейс** — без эмодзи в подписях, структура задаётся типографикой и отступами

## Установка

### Вручную

1. Скачайте `main.js` и `manifest.json`
2. Создайте папку `.obsidian/plugins/yule-link-icons/`
3. Поместите оба файла внутрь
4. Перезапустите Obsidian
5. Включите плагин в Настройки → Сторонние плагины

### Важно

Отключите CSS-сниппеты, которые добавляют значки к ссылкам (например, значки глобуса или камня Obsidian через `::before`). Этот плагин заменяет всю эту функциональность.

## Совместимость

- Работает в режимах **Live Preview** и **Reading View**
- Совместим с темами (проверено на теме Underwater)
- Учитывает цвета ссылок других плагинов, если выбран режим цвета «Default»
- Проверено на Obsidian 1.4 и новее

## Известные ограничения

- Когда курсор стоит на ссылке в Live Preview, CM6 показывает исходный markdown; в этом состоянии значки появляются через сопоставление по регулярному выражению
- Переопределение цвета ссылки может не перебить плагины, которые используют встроенные стили (например, Link Colorer); в этом случае выберите режим «Default» и доверьте цвет этим плагинам

## Лицензия

MIT

</details>
