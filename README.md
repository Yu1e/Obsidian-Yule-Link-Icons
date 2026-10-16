# Yule Link Icons

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

- **Sticky preview** — always visible at the top, shows all three link types
- **Collapsible sections** — each link type in its own block with distinct background
- **Color-coded blocks** — purple for internal, teal for external, amber for files
- **Clean design** — no emoji in UI labels, structured with typography and spacing

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