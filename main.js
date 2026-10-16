const { Plugin, PluginSettingTab, Setting } = require('obsidian');
const { ViewPlugin, Decoration, WidgetType } = require('@codemirror/view');

// ═══════════════════════════════════════════════════════════════
// SVG
// ═══════════════════════════════════════════════════════════════

const OBS_PATHS = [
  { d:'M382.3 475.6c-3.1 23.4-26 41.6-48.7 35.3-32.4-8.9-69.9-22.8-103.6-25.4l-51.7-4a34 34 0 0 1-22-10.2l-89-91.7a34 34 0 0 1-6.7-37.7s55-121 57.1-127.3c2-6.3 9.6-61.2 14-90.6 1.2-7.9 5-15 11-20.3L248 8.9a34.1 34.1 0 0 1 49.6 4.3L386 125.6a37 37 0 0 1 7.6 22.4c0 21.3 1.8 65 13.6 93.2 11.5 27.3 32.5 57 43.5 71.5a17.3 17.3 0 0 1 1.3 19.2 1494 1494 0 0 1-44.8 70.6c-15 22.3-21.9 49.9-25 73.1z', w:8 },
  { d:'M165.9 478.3c41.4-84 40.2-144.2 22.6-187-16.2-39.6-46.3-64.5-70-80-.6 2.3-1.3 4.4-2.2 6.5L60.6 342a34 34 0 0 0 6.6 37.7l89.1 91.7a34 34 0 0 0 9.6 7z', w:3 },
  { d:'M278.4 307.8c11.2 1.2 22.2 3.6 32.8 7.6 34 12.7 65 41.2 90.5 96.3 1.8-3.1 3.6-6.2 5.6-9.2a1536 1536 0 0 0 44.8-70.6 17 17 0 0 0-1.3-19.2c-11-14.6-32-44.2-43.5-71.5-11.8-28.2-13.5-72-13.6-93.2 0-8.1-2.6-16-7.6-22.4L297.6 13.2a34 34 0 0 0-1.5-1.7 96 96 0 0 1 2 54 198.3 198.3 0 0 1-17.6 41.3l-7.2 14.2a171 171 0 0 0-19.4 71c-1.2 29.4 4.8 66.4 24.5 115.8z', w:3 },
  { d:'M278.4 307.8c-19.7-49.4-25.8-86.4-24.5-115.9a171 171 0 0 1 19.4-71c2.3-4.8 4.8-9.5 7.2-14.1 7.1-13.9 14-27 17.6-41.4a96 96 0 0 0-2-54A34.1 34.1 0 0 0 248 9l-105.4 94.8a34.1 34.1 0 0 0-10.9 20.3l-12.8 85-.5 2.3c23.8 15.5 54 40.4 70.1 80a147 147 0 0 1 7.8 24.8c28-6.8 55.7-11 82.1-8.3z', w:3 },
  { d:'M333.6 511c22.7 6.2 45.6-12 48.7-35.4a187 187 0 0 1 19.4-63.9c-25.6-55-56.5-83.6-90.4-96.3-36-13.4-75.2-9-115 .7 8.9 40.4 3.6 93.3-30.4 162.2 4 1.8 8.1 3 12.5 3.3 0 0 24.4 2 53.6 4.1 29 2 72.4 17.1 101.6 25.2z', w:3 }
];

const GLOBE_D = 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.3 9.3 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7 7 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.7 6.7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472zM3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 6.7 6.7 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5zm2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z';

function makeSvg(type, color) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', '1em'); svg.setAttribute('height', '1em');
  svg.style.verticalAlign = '-0.15em';
  if (type === 'obsidian') {
    svg.setAttribute('viewBox', '0 0 512 512');
    OBS_PATHS.forEach(p => { const el = document.createElementNS(ns,'path'); el.setAttribute('d',p.d); el.setAttribute('fill','none'); el.setAttribute('stroke',color); el.setAttribute('stroke-width',String(p.w)); el.setAttribute('stroke-linecap','round'); el.setAttribute('stroke-linejoin','round'); svg.appendChild(el); });
  } else {
    svg.setAttribute('viewBox', '0 0 16 16');
    const el = document.createElementNS(ns,'path'); el.setAttribute('d',GLOBE_D); el.setAttribute('fill',color); svg.appendChild(el);
  }
  return svg;
}

// ═══════════════════════════════════════════════════════════════
// Пресеты
// ═══════════════════════════════════════════════════════════════

const FILE_EMOJI = {pdf:'📕',doc:'📘',docx:'📘',txt:'📄',rtf:'📄',odt:'📄',xls:'📊',xlsx:'📊',csv:'📊',ods:'📊',ppt:'📙',pptx:'📙',odp:'📙',png:'🖼️',jpg:'🖼️',jpeg:'🖼️',gif:'🖼️',bmp:'🖼️',svg:'🖼️',webp:'🖼️',mp3:'🎵',wav:'🎵',ogg:'🎵',flac:'🎵',mp4:'🎬',avi:'🎬',mkv:'🎬',mov:'🎬',webm:'🎬',zip:'📦',rar:'📦','7z':'📦',tar:'📦',js:'💻',py:'💻',html:'💻',css:'💻',json:'💻',exe:'⚙️',msi:'⚙️',bat:'⚙️',folder:'📁',default:'📄'};
const FILE_BW = {pdf:'🗎',doc:'🗎',docx:'🗎',txt:'🗏',rtf:'🗏',odt:'🗏',xls:'☰',xlsx:'☰',csv:'☰',ods:'☰',ppt:'🗐',pptx:'🗐',odp:'🗐',png:'🖻',jpg:'🖻',jpeg:'🖻',gif:'🖻',bmp:'🖻',svg:'🖻',webp:'🖻',mp3:'♪',wav:'♪',ogg:'♪',flac:'♪',mp4:'▶',avi:'▶',mkv:'▶',mov:'▶',webm:'▶',zip:'🗃',rar:'🗃','7z':'🗃',tar:'🗃',js:'⟨⟩',py:'⟨⟩',html:'⟨⟩',css:'⟨⟩',json:'⟨⟩',exe:'⚙',msi:'⚙',bat:'⚙',folder:'🗀',default:'🗎'};
const EMOJI_Q = ['📄','📁','📎','🔗','📌','💾','🗂️','📋','📕','📘','📙','📗','🏠','💼','📊','🖼️','🎵','🎬','📦','💻','⚙️','🔖','📝','🎨','📷','💡','🔧','✏️','🌐','💎'];
const BW_Q = ['🗎','🗏','🗐','🗀','🗁','🗃','🖻','☰','♪','♫','▶','⚙','⟨⟩','⌨','⚲','⛓','◆','●','■','▲','★','☆','⚑','⚡','→','⌂','✓','✗','◇','○','□','△'];

// Цвета блоков
const BLOCK_COLORS = { int: 'rgba(124,58,237,0.06)', ext: 'rgba(108,196,192,0.06)', file: 'rgba(255,183,77,0.06)' };

const DS = {
  int:{show:true,type:'svg',emoji:'💎',bw:'◆',iconColor:'#7c3aed',overrideLink:true,linkColor:'#9d8ec7',offsetX:0,gap:2},
  ext:{show:true,type:'svg',emoji:'🌐',bw:'⊕',iconColor:'#6cc4c0',overrideLink:false,linkColor:'#6cc4c0',offsetX:0,gap:4},
  file:{show:true,mode:'single',style:'bw',singleEmoji:'📄',singleBW:'🗎',iconColor:'#6cc4c0',overrideLink:false,linkColor:'#6cc4c0',iconsEmoji:{...FILE_EMOJI},iconsBW:{...FILE_BW},dirRules:[],customExts:[],offsetX:0,gap:0},
  customSymbols:[]
};

// ═══════════════════════════════════════════════════════════════
// Логика
// ═══════════════════════════════════════════════════════════════

function getFileIcon(url,s){const f=s.file,isE=f.style==='emoji';if(f.mode==='single'){for(const r of(f.dirRules||[]))if(r.keyword&&url.toLowerCase().includes(r.keyword.toLowerCase()))return r.icon||(isE?'📄':'🗎');return isE?(f.singleEmoji||'📄'):(f.singleBW||'🗎');}const icons=isE?(f.iconsEmoji||FILE_EMOJI):(f.iconsBW||FILE_BW);const m=url.match(/\.([a-zA-Z0-9]+)(?:\?|#|$)/);if(m)return icons[m[1].toLowerCase()]||icons.default||(isE?'📄':'🗎');if(url.endsWith('/')||!url.includes('.'))return icons.folder||(isE?'📁':'🗀');return icons.default||(isE?'📄':'🗎');}

function mkIcon(t,s){const span=document.createElement('span');span.className=`yule-icon yule-icon-${t}`;span.setAttribute('aria-hidden','true');span.style.fontStyle='normal';span.style.display='inline-block';const cfg=s[t];span.style.marginLeft=`${cfg.offsetX}px`;span.style.marginRight=`${cfg.gap}px`;if(cfg.type==='svg')span.appendChild(makeSvg(t==='int'?'obsidian':'globe',cfg.iconColor));else if(cfg.type==='emoji')span.textContent=cfg.emoji;else{span.textContent=cfg.bw;span.style.color=cfg.iconColor;}return span;}

function mkFileIcon(url,s){const f=s.file,span=document.createElement('span');span.className='yule-icon yule-icon-file';span.setAttribute('aria-hidden','true');span.style.fontStyle='normal';span.style.marginLeft=`${f.offsetX}px`;span.style.marginRight=`${f.gap}px`;span.textContent=getFileIcon(url,s);if(f.style==='bw')span.style.color=f.iconColor;return span;}

// ═══════════════════════════════════════════════════════════════
// CM6
// ═══════════════════════════════════════════════════════════════

class IEW extends WidgetType{constructor(t,s){super();this.t=t;this.s=s;}toDOM(){return mkIcon(this.t,this.s);}}
class FW extends WidgetType{constructor(u,s){super();this.u=u;this.s=s;}toDOM(){return mkFileIcon(this.u,this.s);}}

function createLP(plugin){
  return ViewPlugin.fromClass(class{
    constructor(v){this.decorations=this.b(v);}
    update(u){if(u.docChanged||u.viewportChanged||u.selectionSet)this.decorations=this.b(u.view);}
    b(view){
      const w=[],s=plugin.settings;
      const usedPositions = new Set(); // Для предотвращения дублирования иконок
      
      for(const{from,to}of view.visibleRanges){
        const t=view.state.doc.sliceString(from,to);
        let m;
        
        // ─── Внутренние ссылки [[...]] ───────────────────────────
        if(s.int.show){
          const re=/\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g;
          while((m=re.exec(t))!==null){
            const pos = from+m.index;
            if(!usedPositions.has(pos)){
              w.push(Decoration.widget({widget:new IEW('int',s),side:-1}).range(pos));
              usedPositions.add(pos);
            }
          }
        }
        
        // ─── Markdown внешние ссылки [text](https://...) ─────────
        if(s.ext.show){
          const re=/\[([^\]]*)\]\((https?:\/\/[^)]+)\)/gi;
          while((m=re.exec(t))!==null){
            const pos = from+m.index;
            if(!usedPositions.has(pos)){
              w.push(Decoration.widget({widget:new IEW('ext',s),side:-1}).range(pos));
              usedPositions.add(pos);
              // Помечаем позицию URL внутри скобок, чтобы не дублировать
              const urlStart = m.index + m[0].indexOf(m[2]);
              for(let i = 0; i < m[2].length; i++){
                usedPositions.add(from + urlStart + i);
              }
            }
          }
        }
        
        // ─── Markdown файловые ссылки [text](file:///...) ────────
        if(s.file.show){
          const re=/\[([^\]]*)\]\((file:\/\/\/[^)]+)\)/gi;
          while((m=re.exec(t))!==null){
            const pos = from+m.index;
            if(!usedPositions.has(pos)){
              w.push(Decoration.widget({widget:new FW(m[2],s),side:-1}).range(pos));
              w.push(Decoration.mark({class:'yule-file-wrap'}).range(pos,pos+m[0].length));
              usedPositions.add(pos);
              // Помечаем позицию URL
              const urlStart = m.index + m[0].indexOf(m[2]);
              for(let i = 0; i < m[2].length; i++){
                usedPositions.add(from + urlStart + i);
              }
            }
          }
        }
        
        // ─── Обычные внешние ссылки (не в markdown формате) ──────
        // https://example.com или http://example.com
        if(s.ext.show){
          const re=/https?:\/\/[^\s\[\](){}|\\^<>"'`]+/gi;
          while((m=re.exec(t))!==null){
            const pos = from+m.index;
            // Проверяем, что эта позиция ещё не использована (не часть markdown ссылки)
            if(!usedPositions.has(pos)){
              // Дополнительная проверка: не находится ли URL внутри markdown синтаксиса
              const before = t.slice(Math.max(0, m.index - 2), m.index);
              if(!before.endsWith('](') && !before.endsWith('](/')){
                w.push(Decoration.widget({widget:new IEW('ext',s),side:-1}).range(pos));
                usedPositions.add(pos);
              }
            }
          }
        }
        
        // ─── Обычные локальные файловые ссылки (не в markdown) ───
        // file:///C:/path/to/file или file:///home/user/file
        if(s.file.show){
          const re=/file:\/\/\/[^\s\[\](){}|\\^<>"'`]+/gi;
          while((m=re.exec(t))!==null){
            const pos = from+m.index;
            if(!usedPositions.has(pos)){
              const before = t.slice(Math.max(0, m.index - 2), m.index);
              if(!before.endsWith('](') && !before.endsWith('](/')){
                w.push(Decoration.widget({widget:new FW(m[0],s),side:-1}).range(pos));
                usedPositions.add(pos);
              }
            }
          }
        }
        
        // ─── Автоссылки <https://...> ────────────────────────────
        if(s.ext.show){
          const re=/<(https?:\/\/[^>]+)>/gi;
          while((m=re.exec(t))!==null){
            const pos = from+m.index;
            if(!usedPositions.has(pos)){
              w.push(Decoration.widget({widget:new IEW('ext',s),side:-1}).range(pos));
              usedPositions.add(pos);
            }
          }
        }
        
        // ─── Автоссылки на файлы <file:///...> ───────────────────
        if(s.file.show){
          const re=/<(file:\/\/\/[^>]+)>/gi;
          while((m=re.exec(t))!==null){
            const pos = from+m.index;
            if(!usedPositions.has(pos)){
              w.push(Decoration.widget({widget:new FW(m[1],s),side:-1}).range(pos));
              usedPositions.add(pos);
            }
          }
        }
      }
      
      try{return Decoration.set(w,true);}catch(e){return Decoration.none;}
    }
  },{decorations:v=>v.decorations});
}

// ═══════════════════════════════════════════════════════════════
// Settings Tab
// ═══════════════════════════════════════════════════════════════

class YuleTab extends PluginSettingTab {
  constructor(app,p){super(app,p);this.p=p;}

  display(){
    const c=this.containerEl; c.empty(); const s=this.p.settings;

    // Заголовок
    c.createEl('h1',{text:'Yule Link Icons'}).style.cssText='margin-bottom:2px;font-size:1.6em;';
    c.createEl('p',{text:'v4.3.0 — Единая система иконок для всех типов ссылок'}).style.cssText='margin:0 0 16px 0;opacity:0.5;font-size:0.85em;';

    // Предпросмотр — закреплённый
    const pvWrap = c.createDiv();
    pvWrap.style.cssText = 'position:sticky;top:0;z-index:100;padding:14px 20px;background:var(--background-primary);border-bottom:2px solid var(--background-modifier-border);margin:0 -20px 20px -20px;';
    const pvLabel = pvWrap.createEl('div',{text:'Предпросмотр'});
    pvLabel.style.cssText = 'font-size:0.75em;text-transform:uppercase;letter-spacing:0.1em;opacity:0.5;margin-bottom:6px;';
    const pv = pvWrap.createDiv();
    pv.style.cssText = 'font-size:1.05em;line-height:2;';
    this.preview(pv);

    // Блок 1: Внутренние
    this.renderBlock(c, 'int', 'Внутренние ссылки', '[[заметка]] — ссылки внутри хранилища', BLOCK_COLORS.int, pv);

    // Блок 2: Внешние
    this.renderBlock(c, 'ext', 'Внешние ссылки', '[текст](https://...), https://... — ссылки в интернет', BLOCK_COLORS.ext, pv);

    // Блок 3: Файлы
    this.renderFileBlock(c, pv);

    // Мои символы
    const symBlock = c.createEl('details');
    symBlock.style.cssText = 'margin:12px 0;border-radius:8px;background:var(--background-secondary);';
    const symSum = symBlock.createEl('summary',{text:'Мои символы'});
    symSum.style.cssText = 'cursor:pointer;font-size:1.15em;font-weight:700;padding:12px 16px;';
    const symDesc = symBlock.createEl('p',{text:'Избранные символы для быстрого доступа во всех списках'});
    symDesc.style.cssText = 'opacity:0.6;margin:0 16px 12px 16px;font-size:0.85em;';
    const symContent = symBlock.createDiv(); symContent.style.padding = '0 16px 16px 16px';
    this.customSymbols(symContent);

    // Сброс
    const resetBlock = c.createDiv();
    resetBlock.style.cssText = 'margin-top:20px;padding:12px 16px;';
    new Setting(resetBlock).setName('Сбросить все настройки к значениям по умолчанию').addButton(b=>b.setButtonText('Сбросить').setWarning().onClick(async()=>{this.p.settings=JSON.parse(JSON.stringify(DS));await this.p.saveSettings();this.display();}));
  }

  // ─── Блок int / ext ───────────────────────────────────────
  renderBlock(c, type, title, desc, bgColor, pv) {
    const block = c.createEl('details');
    block.style.cssText = `margin:8px 0;border-radius:8px;background:${bgColor};border:1px solid var(--background-modifier-border);`;
    
    const sum = block.createEl('summary',{text:title});
    sum.style.cssText = `cursor:pointer;font-size:1.2em;font-weight:700;padding:14px 16px;background:${bgColor};border-radius:8px;`;
    
    const descEl = block.createEl('p',{text:desc});
    descEl.style.cssText = 'opacity:0.5;margin:0 16px 12px 16px;font-size:0.85em;';

    const content = block.createDiv(); content.style.padding = '0 16px 16px 16px';
    this.linkSettings(content, type, pv);
  }

  linkSettings(c, type, pv) {
    const s = this.p.settings, cfg = s[type];

    new Setting(c).setName('Показывать иконку').addToggle(t=>t.setValue(cfg.show).onChange(async v=>{cfg.show=v;await this.p.saveSettings();this.preview(pv);}));

    new Setting(c).setName('Тип иконки').addDropdown(d=>d
      .addOption('svg',type==='int'?'SVG — камень Obsidian':'SVG — глобус')
      .addOption('emoji','Цветные эмодзи').addOption('bw','Ч/Б символы')
      .setValue(cfg.type).onChange(async v=>{cfg.type=v;await this.p.saveSettings();this.display();}));

    if(cfg.type!=='svg'){
      const key=cfg.type==='emoji'?'emoji':'bw';
      this.sub(c,'Выбор символа');
      const row=c.createDiv();row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px;';
      row.createSpan({text:'Текущий:'}).style.fontSize='0.9em';
      const inp=row.createEl('input',{type:'text'});inp.value=cfg[key];inp.style.cssText='width:100px;padding:6px;font-size:1.4em;text-align:center;border-radius:6px;';
      inp.oninput=async e=>{cfg[key]=e.target.value;await this.p.saveSettings();this.preview(pv);};
      this.grid(c,[...new Set([...(s.customSymbols||[]),...(cfg.type==='emoji'?EMOJI_Q:BW_Q)])],async sym=>{cfg[key]=sym;await this.p.saveSettings();this.display();});
    }

    if(cfg.type==='svg'||cfg.type==='bw'){this.sub(c,'Цвет иконки');this.colorPicker(c,cfg.iconColor,async v=>{cfg.iconColor=v;await this.p.saveSettings();this.preview(pv);});}

    this.sub(c,'Цвет ссылки');
    new Setting(c).setName('Управление цветом').addDropdown(d=>d.addOption('default','По умолчанию — тема / другие плагины').addOption('override','Свой цвет — перебить всё').setValue(cfg.overrideLink?'override':'default').onChange(async v=>{cfg.overrideLink=v==='override';await this.p.saveSettings();this.display();}));
    if(cfg.overrideLink)this.colorPicker(c,cfg.linkColor,async v=>{cfg.linkColor=v;await this.p.saveSettings();this.preview(pv);});

    this.sub(c,'Позиционирование');
    new Setting(c).setName('Сдвиг по горизонтали').setDesc('Отрицательные значения сдвигают влево').addSlider(sl=>sl.setLimits(-15,15,1).setValue(cfg.offsetX).setDynamicTooltip().onChange(async v=>{cfg.offsetX=v;await this.p.saveSettings();this.preview(pv);}));
    new Setting(c).setName('Расстояние до текста').addSlider(sl=>sl.setLimits(0,15,1).setValue(cfg.gap).setDynamicTooltip().onChange(async v=>{cfg.gap=v;await this.p.saveSettings();this.preview(pv);}));
  }

  // ─── Блок файлов ──────────────────────────────────────────
  renderFileBlock(c, pv) {
    const s=this.p.settings, f=s.file;
    const block = c.createEl('details');
    block.style.cssText = `margin:8px 0;border-radius:8px;background:${BLOCK_COLORS.file};border:1px solid var(--background-modifier-border);`;
    const sum = block.createEl('summary',{text:'Локальные файлы'});
    sum.style.cssText = `cursor:pointer;font-size:1.2em;font-weight:700;padding:14px 16px;background:${BLOCK_COLORS.file};border-radius:8px;`;
    block.createEl('p',{text:'[текст](file:///...), file:///... — ссылки на файлы на диске'}).style.cssText='opacity:0.5;margin:0 16px 12px 16px;font-size:0.85em;';

    const ct = block.createDiv(); ct.style.padding='0 16px 16px 16px';

    new Setting(ct).setName('Показывать иконку').addToggle(t=>t.setValue(f.show).onChange(async v=>{f.show=v;await this.p.saveSettings();this.preview(pv);}));
    new Setting(ct).setName('Стиль иконок').addDropdown(d=>d.addOption('emoji','Цветные эмодзи').addOption('bw','Ч/Б символы').setValue(f.style).onChange(async v=>{f.style=v;await this.p.saveSettings();this.display();}));
    new Setting(ct).setName('Режим').addDropdown(d=>d.addOption('single','Одна для всех').addOption('perType','По расширению файла').setValue(f.mode).onChange(async v=>{f.mode=v;await this.p.saveSettings();this.display();}));

    if(f.style==='bw'){this.sub(ct,'Цвет иконки');this.colorPicker(ct,f.iconColor,async v=>{f.iconColor=v;await this.p.saveSettings();this.preview(pv);});}

    const isE=f.style==='emoji';
    const allSym=[...new Set([...(s.customSymbols||[]),...(isE?EMOJI_Q:BW_Q)])];

    if(f.mode==='single'){
      this.sub(ct,'Единая иконка');
      const cur=isE?f.singleEmoji:f.singleBW;
      const row=ct.createDiv();row.style.cssText='display:flex;align-items:center;gap:10px;margin-bottom:8px;';
      row.createSpan({text:'Текущая:'}).style.fontSize='0.9em';
      const inp=row.createEl('input',{type:'text'});inp.value=cur;inp.style.cssText='width:100px;padding:6px;font-size:1.4em;text-align:center;border-radius:6px;';
      inp.oninput=async e=>{if(isE)f.singleEmoji=e.target.value;else f.singleBW=e.target.value;await this.p.saveSettings();this.preview(pv);};
      this.grid(ct,allSym,async sym=>{if(isE)f.singleEmoji=sym;else f.singleBW=sym;await this.p.saveSettings();this.display();});

      this.sub(ct,'Правила по каталогам');
      ct.createEl('p',{text:'Если путь содержит ключевое слово — другая иконка. Сверху вниз.'}).style.cssText='opacity:0.5;margin:0 0 8px 0;font-size:0.85em;';
      const rc=ct.createDiv();
      (f.dirRules||[]).forEach((rule,i)=>{
        const r=rc.createDiv();r.style.cssText='display:flex;align-items:center;gap:8px;padding:8px 12px;margin:4px 0;background:var(--background-primary);border-radius:6px;flex-wrap:wrap;';
        r.createSpan({text:`${i+1}. Путь содержит`}).style.fontSize='0.9em';
        const ki=r.createEl('input',{type:'text'});ki.value=rule.keyword;ki.placeholder='слово';ki.style.cssText='width:90px;padding:4px 8px;border-radius:4px;';
        ki.oninput=async e=>{rule.keyword=e.target.value;await this.p.saveSettings();this.preview(pv);};
        r.createSpan({text:'→'});
        const ii=r.createEl('input',{type:'text'});ii.value=rule.icon;ii.style.cssText='width:50px;padding:4px;font-size:1.2em;text-align:center;border-radius:4px;';
        ii.oninput=async e=>{rule.icon=e.target.value;await this.p.saveSettings();this.preview(pv);};
        const pb=r.createEl('button',{text:'...'});pb.style.cssText='cursor:pointer;padding:2px 8px;';
        pb.onclick=()=>this.modal(`правило ${i+1}`,allSym,async sym=>{rule.icon=sym;await this.p.saveSettings();this.display();});
        const ctr=r.createDiv();ctr.style.cssText='display:flex;gap:4px;margin-left:auto;';
        if(i>0){const u=ctr.createEl('button',{text:'↑'});u.style.cssText='cursor:pointer;padding:2px 6px;';u.onclick=async()=>{[f.dirRules[i-1],f.dirRules[i]]=[f.dirRules[i],f.dirRules[i-1]];await this.p.saveSettings();this.display();};}
        if(i<f.dirRules.length-1){const d=ctr.createEl('button',{text:'↓'});d.style.cssText='cursor:pointer;padding:2px 6px;';d.onclick=async()=>{[f.dirRules[i],f.dirRules[i+1]]=[f.dirRules[i+1],f.dirRules[i]];await this.p.saveSettings();this.display();};}
        const del=ctr.createEl('button',{text:'✕'});del.style.cssText='cursor:pointer;padding:2px 6px;color:var(--text-error);';
        del.onclick=async()=>{f.dirRules.splice(i,1);await this.p.saveSettings();this.display();};
      });
      const ab=ct.createEl('button',{text:'+ Добавить правило'});ab.style.cssText='cursor:pointer;padding:6px 14px;margin-top:6px;font-size:0.9em;';
      ab.onclick=async()=>{f.dirRules.push({keyword:'',icon:isE?'📁':'🗀'});await this.p.saveSettings();this.display();};
    } else {
      this.sub(ct,'Иконки по расширениям');
      new Setting(ct).setName('Заполнить стандартными').addButton(b=>b.setButtonText('Заполнить').onClick(async()=>{if(isE)f.iconsEmoji={...FILE_EMOJI};else f.iconsBW={...FILE_BW};await this.p.saveSettings();this.display();}));
      const icons=isE?f.iconsEmoji:f.iconsBW;
      const cats={'Документы':['pdf','doc','docx','txt','rtf','odt'],'Таблицы':['xls','xlsx','csv','ods'],'Презентации':['ppt','pptx','odp'],'Изображения':['png','jpg','jpeg','gif','bmp','svg','webp'],'Аудио':['mp3','wav','ogg','flac'],'Видео':['mp4','avi','mkv','mov','webm'],'Архивы':['zip','rar','7z','tar'],'Код':['js','py','html','css','json'],'Исполняемые':['exe','msi','bat'],'Прочее':['folder','default']};
      for(const[cat,exts]of Object.entries(cats)){
        const det=ct.createEl('details');det.style.cssText='margin:4px 0;padding:6px 10px;background:var(--background-primary);border-radius:6px;';
        det.createEl('summary',{text:cat}).style.cssText='cursor:pointer;font-weight:600;font-size:0.95em;';
        const g=det.createDiv();g.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:6px;margin-top:8px;';
        for(const ext of exts){const lbl=ext==='default'?'По умолчанию':ext==='folder'?'Папка':`.${ext}`;const cell=g.createDiv();cell.style.cssText='display:flex;align-items:center;gap:4px;';cell.createSpan({text:lbl}).style.cssText='min-width:60px;font-size:0.85em;';const inp=cell.createEl('input',{type:'text'});inp.value=icons[ext]||'';inp.style.cssText='width:45px;padding:3px;font-size:1.1em;text-align:center;border-radius:4px;';inp.oninput=async e=>{icons[ext]=e.target.value;await this.p.saveSettings();this.preview(pv);};const pk=cell.createEl('button',{text:'...'});pk.style.cssText='cursor:pointer;padding:1px 5px;font-size:0.85em;';pk.onclick=()=>this.modal(lbl,allSym,async sym=>{icons[ext]=sym;await this.p.saveSettings();this.display();});}
      }
      this.sub(ct,'Свои расширения');
      ct.createEl('p',{text:'Расширения, которых нет в стандартном списке'}).style.cssText='opacity:0.5;margin:0 0 8px 0;font-size:0.85em;';
      const ceC=ct.createDiv();this.renderCustomExts(ceC,icons,allSym,pv);
      const aer=ct.createDiv();aer.style.cssText='display:flex;gap:6px;margin-top:6px;align-items:center;';
      const ei=aer.createEl('input',{type:'text'});ei.placeholder='расширение';ei.style.cssText='width:100px;padding:5px 8px;border-radius:6px;font-size:0.9em;';
      const ii=aer.createEl('input',{type:'text'});ii.placeholder='иконка';ii.style.cssText='width:50px;padding:5px;font-size:1.1em;text-align:center;border-radius:6px;';
      const aeb=aer.createEl('button',{text:'+ Добавить'});aeb.style.cssText='cursor:pointer;padding:5px 12px;font-size:0.9em;';
      aeb.onclick=async()=>{const ext=ei.value.trim().toLowerCase().replace(/^\./,''),icon=ii.value.trim();if(ext&&icon){icons[ext]=icon;if(!f.customExts)f.customExts=[];if(!f.customExts.includes(ext))f.customExts.push(ext);await this.p.saveSettings();this.display();}};
    }

    this.sub(ct,'Цвет ссылки');
    new Setting(ct).setName('Управление цветом').addDropdown(d=>d.addOption('default','По умолчанию').addOption('override','Свой цвет').setValue(f.overrideLink?'override':'default').onChange(async v=>{f.overrideLink=v==='override';await this.p.saveSettings();this.display();}));
    if(f.overrideLink)this.colorPicker(ct,f.linkColor,async v=>{f.linkColor=v;await this.p.saveSettings();this.preview(pv);});

    this.sub(ct,'Позиционирование');
    new Setting(ct).setName('Сдвиг по горизонтали').setDesc('Отрицательные = влево').addSlider(sl=>sl.setLimits(-15,15,1).setValue(f.offsetX).setDynamicTooltip().onChange(async v=>{f.offsetX=v;await this.p.saveSettings();this.preview(pv);}));
    new Setting(ct).setName('Расстояние до текста').addSlider(sl=>sl.setLimits(0,15,1).setValue(f.gap).setDynamicTooltip().onChange(async v=>{f.gap=v;await this.p.saveSettings();this.preview(pv);}));
  }

  renderCustomExts(container,icons,allSym,pv){container.empty();const f=this.p.settings.file,exts=f.customExts||[];if(!exts.length){container.createEl('p',{text:'Нет добавленных'}).style.cssText='opacity:0.4;font-size:0.85em;';return;}
    exts.forEach((ext,i)=>{const row=container.createDiv();row.style.cssText='display:flex;align-items:center;gap:6px;padding:5px 10px;margin:3px 0;background:var(--background-primary);border-radius:6px;';row.createSpan({text:`.${ext}`}).style.cssText='min-width:55px;font-weight:600;font-size:0.9em;';const inp=row.createEl('input',{type:'text'});inp.value=icons[ext]||'';inp.style.cssText='width:45px;padding:3px;font-size:1.1em;text-align:center;border-radius:4px;';inp.oninput=async e=>{icons[ext]=e.target.value;await this.p.saveSettings();this.preview(pv);};const pk=row.createEl('button',{text:'...'});pk.style.cssText='cursor:pointer;padding:1px 5px;';pk.onclick=()=>this.modal(`.${ext}`,allSym,async sym=>{icons[ext]=sym;await this.p.saveSettings();this.display();});const del=row.createEl('button',{text:'✕'});del.style.cssText='cursor:pointer;padding:1px 5px;color:var(--text-error);margin-left:auto;';del.onclick=async()=>{delete icons[ext];f.customExts.splice(i,1);await this.p.saveSettings();this.display();};});}

  // ─── Предпросмотр ─────────────────────────────────────────
  preview(box){box.empty();const s=this.p.settings;
    [
      {type:'int',label:'Заметка',note:'[[Заметка]]'},
      {type:'ext',label:'Google',note:'[Google](https://...)'},
      {type:'ext',label:'https://example.com',note:'обычная ссылка',isPlain:true},
      {type:'file',label:'Документ.pdf',note:'[Документ](file:///...)',url:'file:///C:/docs/report.pdf'},
      {type:'file',label:'file:///C:/folder',note:'обычный путь',url:'file:///C:/folder',isPlain:true}
    ].forEach(({type,label,note,url,isPlain})=>{
      const row=box.createDiv();row.style.margin='2px 0';
      const cfg=type==='file'?s.file:s[type];
      const show=type==='file'?s.file.show:cfg.show;
      if(show){if(type==='file')row.appendChild(mkFileIcon(url||'',s));else row.appendChild(mkIcon(type,s));}
      const lc=type==='file'?(s.file.overrideLink?s.file.linkColor:'var(--text-accent)'):(cfg.overrideLink?cfg.linkColor:'var(--text-accent)');
      row.createSpan({text:label}).style.cssText=`color:${lc};`;
      const noteStyle = isPlain ? 'opacity:0.35;font-size:0.8em;margin-left:8px;color:#6cc4c0;' : 'opacity:0.35;font-size:0.8em;margin-left:8px;';
      row.createSpan({text:` — ${note}`}).style.cssText=noteStyle;
    });}

  customSymbols(c){const s=this.p.settings;
    const ar=c.createDiv();ar.style.cssText='display:flex;gap:8px;margin-bottom:10px;';
    const inp=ar.createEl('input',{type:'text'});inp.placeholder='Введите символ(ы)...';inp.style.cssText='flex:1;padding:7px 10px;font-size:1em;border-radius:6px;';
    const ab=ar.createEl('button',{text:'+ Добавить'});ab.style.cssText='cursor:pointer;padding:7px 14px;font-size:0.9em;';
    ab.onclick=async()=>{const v=inp.value.trim();if(v&&!s.customSymbols.includes(v)){s.customSymbols.unshift(v);await this.p.saveSettings();this.display();}};
    if(s.customSymbols.length>0){const g=c.createDiv();g.style.cssText='display:flex;flex-wrap:wrap;gap:6px;';
      s.customSymbols.forEach((sym,i)=>{const ch=g.createDiv();ch.style.cssText='display:flex;align-items:center;gap:4px;padding:5px 9px;background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:6px;font-size:1.2em;';ch.createSpan({text:sym});const del=ch.createEl('button',{text:'×'});del.style.cssText='cursor:pointer;background:none;border:none;color:var(--text-muted);padding:0 2px;';del.onclick=async()=>{s.customSymbols.splice(i,1);await this.p.saveSettings();this.display();};});
    } else {c.createEl('p',{text:'Пока пусто.'}).style.cssText='margin:0;opacity:0.4;font-size:0.85em;';}}

  // ─── Утилиты ──────────────────────────────────────────────
  sub(c,text){c.createEl('div',{text}).style.cssText='font-size:0.95em;font-weight:600;margin:14px 0 6px 0;opacity:0.8;';}

  colorPicker(c,cur,onChange){const row=c.createDiv();row.style.cssText='display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:4px 0 10px 0;';
    const ci=row.createEl('input',{type:'color'});ci.value=cur;ci.style.cssText='width:44px;height:28px;cursor:pointer;border-radius:4px;padding:0;';
    const hi=row.createEl('input',{type:'text'});hi.value=cur;hi.style.cssText='width:72px;padding:5px 7px;border-radius:4px;font-size:0.9em;';
    const presets=['#6cc4c0','#e57373','#64b5f6','#81c784','#ffb74d','#ba68c8','#f06292','#fff176','#90a4ae','#7c3aed','#9d8ec7','#a48bfa','#ffffff'];
    const sw=row.createDiv();sw.style.cssText='display:flex;gap:2px;';
    presets.forEach(co=>{const b=sw.createEl('button');b.style.cssText=`width:18px;height:18px;background:${co};border:2px solid ${co===cur?'white':'transparent'};border-radius:3px;cursor:pointer;padding:0;`;b.onclick=async()=>{ci.value=co;hi.value=co;await onChange(co);sw.querySelectorAll('button').forEach(x=>x.style.borderColor='transparent');b.style.borderColor='white';};});
    ci.oninput=async e=>{hi.value=e.target.value;await onChange(e.target.value);};
    hi.oninput=async e=>{if(/^#[0-9A-Fa-f]{6}$/.test(e.target.value)){ci.value=e.target.value;await onChange(e.target.value);}};}

  grid(c,syms,onSelect){const g=c.createDiv();g.style.cssText='display:flex;flex-wrap:wrap;gap:3px;padding:8px;background:var(--background-secondary);border-radius:8px;margin:4px 0 12px 0;';
    [...new Set(syms)].forEach(sym=>{const b=g.createEl('button',{text:sym});b.style.cssText='min-width:34px;height:34px;padding:0 5px;font-size:1.15em;cursor:pointer;border:1px solid var(--background-modifier-border);border-radius:5px;background:var(--background-primary);';b.onmouseenter=()=>b.style.background='var(--background-modifier-hover)';b.onmouseleave=()=>b.style.background='var(--background-primary)';b.onclick=()=>onSelect(sym);});}

  modal(title,syms,onSelect){const ov=document.createElement('div');ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;';const md=document.createElement('div');md.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--background-primary);border-radius:12px;padding:20px;z-index:10000;max-width:400px;max-height:75vh;overflow-y:auto;';
    md.createEl('h3',{text:`Выбор: ${title}`}).style.fontSize='1.05em';
    const ir=md.createDiv();ir.style.cssText='display:flex;gap:8px;margin:10px 0;';const ci=ir.createEl('input',{type:'text'});ci.placeholder='Свой символ...';ci.style.cssText='flex:1;padding:7px 10px;font-size:1.1em;';const ub=ir.createEl('button',{text:'OK'});ub.style.cssText='cursor:pointer;padding:7px 14px;';ub.onclick=async()=>{const v=ci.value.trim();if(v){await onSelect(v);ov.remove();md.remove();}};
    const g=md.createDiv();g.style.cssText='display:flex;flex-wrap:wrap;gap:3px;margin-top:10px;';
    [...new Set(syms)].forEach(sym=>{const b=g.createEl('button',{text:sym});b.style.cssText='min-width:38px;height:38px;padding:0 5px;font-size:1.2em;cursor:pointer;border:1px solid var(--background-modifier-border);border-radius:5px;background:var(--background-primary);';b.onclick=async()=>{await onSelect(sym);ov.remove();md.remove();};});
    ov.onclick=()=>{ov.remove();md.remove();};document.body.appendChild(ov);document.body.appendChild(md);}
}

// ═══════════════════════════════════════════════════════════════
// Основной класс
// ═══════════════════════════════════════════════════════════════

module.exports = class YuleLinkIconsPlugin extends Plugin {
  async onload(){await this.loadSettings();this.addSettingTab(new YuleTab(this.app,this));this.injectCSS();this.registerEditorExtension([createLP(this)]);this.registerMarkdownPostProcessor(el=>this.processRendered(el));this.startDom();}
  onunload(){if(this.styleEl)this.styleEl.remove();if(this.observer)this.observer.disconnect();if(this.intervalId)clearInterval(this.intervalId);}

  processSingleLink(a){if(a.hasAttribute('data-yule'))return;const s=this.settings;
    if(a.classList.contains('internal-link')){a.setAttribute('data-yule','int');if(s.int.overrideLink)a.style.setProperty('color',s.int.linkColor,'important');if(s.int.show&&!a.querySelector('.yule-icon'))a.insertBefore(mkIcon('int',s),a.firstChild);return;}
    if(a.classList.contains('external-link')){const href=a.getAttribute('href')||a.getAttribute('data-href')||'';
      if(href.startsWith('file:')||href.startsWith('file%3A')){a.setAttribute('data-yule','file');if(s.file.overrideLink)a.style.setProperty('color',s.file.linkColor,'important');if(s.file.show&&!a.querySelector('.yule-icon'))a.insertBefore(mkFileIcon(href,s),a.firstChild);}
      else{a.setAttribute('data-yule','ext');if(s.ext.overrideLink)a.style.setProperty('color',s.ext.linkColor,'important');if(s.ext.show&&!a.querySelector('.yule-icon'))a.insertBefore(mkIcon('ext',s),a.firstChild);}}
    // Обработка обычных ссылок без специальных классов
    else {
      const href=a.getAttribute('href')||'';
      if(href.startsWith('file:///') || href.startsWith('file:///')){
        a.setAttribute('data-yule','file');
        if(s.file.overrideLink)a.style.setProperty('color',s.file.linkColor,'important');
        if(s.file.show&&!a.querySelector('.yule-icon'))a.insertBefore(mkFileIcon(href,s),a.firstChild);
      } else if(href.startsWith('http://') || href.startsWith('https://')){
        a.setAttribute('data-yule','ext');
        if(s.ext.overrideLink)a.style.setProperty('color',s.ext.linkColor,'important');
        if(s.ext.show&&!a.querySelector('.yule-icon'))a.insertBefore(mkIcon('ext',s),a.firstChild);
      }
    }
  }

  processRendered(el){
    // Обрабатываем все ссылки: internal-link, external-link и обычные <a> теги
    el.querySelectorAll('a:not([data-yule])').forEach(a=>this.processSingleLink(a));
  }

  startDom(){
    const p=()=>{
      // Расширенный селектор для всех типов ссылок
      document.querySelectorAll('a:not([data-yule])').forEach(a=>{
        // Фильтруем только релевантные ссылки
        const href = a.getAttribute('href') || '';
        if(a.classList.contains('internal-link') || 
           a.classList.contains('external-link') ||
           href.startsWith('http://') ||
           href.startsWith('https://') ||
           href.startsWith('file:///')) {
          this.processSingleLink(a);
        }
      });
    };
    this.observer=new MutationObserver(p);
    this.observer.observe(document.body,{childList:true,subtree:true});
    this.intervalId=setInterval(p,300);
    p();
  }

  async loadSettings(){const loaded=await this.loadData();this.settings=this.merge(JSON.parse(JSON.stringify(DS)),loaded||{});}
  merge(t,s){for(const k of Object.keys(s)){if(s[k]&&typeof s[k]==='object'&&!Array.isArray(s[k])&&t[k])this.merge(t[k],s[k]);else t[k]=s[k];}return t;}
  async saveSettings(){await this.saveData(this.settings);this.updateCSS();}
  updateCSS(){if(this.styleEl)this.styleEl.textContent=this.buildCSS();}
  buildCSS(){const s=this.settings,il=s.int.overrideLink?`color:${s.int.linkColor}!important;`:'',el=s.ext.overrideLink?`color:${s.ext.linkColor}!important;`:'',fl=s.file.overrideLink?`color:${s.file.linkColor}!important;`:'';
    return`a.internal-link::before,a.external-link::before,.cm-hmd-internal-link::before,.cm-url::before,.cm-string::before,.cm-formatting-link-string::before,a.internal-link::after,a.external-link::after{content:none!important;display:none!important;background:none!important;background-image:none!important;width:0!important;height:0!important;margin:0!important;padding:0!important;}.external-link{background:none!important;padding:0!important;}.yule-icon{display:inline-block;vertical-align:baseline;font-style:normal!important;line-height:1;}.yule-icon svg{vertical-align:-0.15em;}a.internal-link[data-yule]{${il}text-decoration:underline!important;font-style:normal!important;}.cm-hmd-internal-link,.cm-hmd-internal-link span,.cm-hmd-internal-link .cm-underline{${il}font-style:normal!important;}a.external-link[data-yule="ext"],a[data-yule="ext"]{${el}font-style:normal!important;}a.external-link[data-yule="file"],a[data-yule="file"]{${fl}font-style:normal!important;}.yule-file-wrap,.yule-file-wrap *{font-style:normal!important;}`;}
  injectCSS(){this.styleEl=document.createElement('style');this.styleEl.id='yule-link-icons';this.styleEl.textContent=this.buildCSS();document.head.appendChild(this.styleEl);}
};
