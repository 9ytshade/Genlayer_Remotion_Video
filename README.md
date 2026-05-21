# GenLayer Remotion Video System

A production-grade, cinematic Remotion-based video platform for GenLayer — the intelligent blockchain with AI-powered smart contracts, GenVM, and Optimistic Democracy. **All 20+ episodes completed and ready to render.**

## 🎬 Project Status

✅ **Complete:** 20 episodic videos fully composed and production-ready  
✅ **Enhanced:** Typewriter animations, dynamic scene sequencing, brand consistency  
✅ **Scalable:** Reusable component library & handover guide for new projects  
✅ **Documented:** Comprehensive architecture guide (`VIDEO_GENERATION_HANDOVER.md`)

## 📺 Episodes Included

**Core Technology Series (Videos 1–15)**
- Episode 1: What is GenLayer?
- Episode 2: Why GenLayer Exists
- Episode 3: Intelligent Contracts
- Episode 4: GenVM
- Episode 5: Optimistic Democracy
- Episode 6: Equivalence Principle
- Episode 7: Intelligent Oracles
- Episode 8: Safe AI
- Episode 9: Use Cases
- Episode 10: Decentralized Identity
- Episode 11: Autonomous DAOs
- Episode 12: Reliability
- Episode 13: Python Code
- Episode 14: Unique Approach
- Episode 15: Future of AI

**Advanced Topics (Videos 16–20)**
- Episode 16: Trust Infrastructure for the AI Age
- Episode 17: 10 Reasons to Choose GenLayer
- Episode 18: Roadmap to Mainnet (Asimov, Bradbury, Clarke testnets)
- Episode 19: GenLayer Partnerships & Ecosystem
- Episode 20: Opening GenLayer to All Blockchains

**Special**
- Special 01: Internet Court — The Neural Legal System

## 🏗️ Architecture

### Tech Stack
- **Remotion** 4.x — React-based video rendering
- **React** 18 — Component-driven UI
- **TypeScript** — Type-safe development
- **Node.js** 18+ — Runtime environment
- **FFmpeg** — Video encoding & output

### Project Structure
```
src/
├── videos/              # 20+ episode compositions
├── components/          # Reusable scene components
├── animations/          # TypewriterText, energy effects
├── transitions/         # Scene sequencing & timing
├── brand/              # Design system (colors, fonts, tokens)
└── assets/             # Logos, images, static files
```

## 🎨 Features

### Reusable Components
- **ElegantTitleScene** — Title card with typewriter reveal
- **ConceptReveal** — Fullscreen term reveal w/ glow effect
- **IconGridScene** — Logo/item grids (3–6 columns)
- **TimelineScene** — Roadmap & timeline visualization
- **StatCounterScene** — Statistics display
- **MochiScene** — Mascot character & dialogue
- **ClosingScene** — End card with social links
- **ElegantSceneSequence** — Automatic scene timing & transitions

### Animations
- **TypewriterText** — Character-by-character reveal with cursor
- **Signal Wave** — Sci-fi background effect
- **Energy Factor** — Dynamic intensity scaling
- **Smooth Transitions** — Eased scene fades & movements

### Brand System
- **Unified Colors** — Accent primary (lime green), secondary (cyan), tertiary (pink)
- **Consistent Typography** — Inter font w/ semantic sizing (label, body, H1–H4, display)
- **Spacing & Layout** — Standardized tokens (`s()` for frames, `SPACING`, `LAYOUT`)

## 📋 Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **FFmpeg** (for rendering)
  - Windows: `choco install ffmpeg` or download from [ffmpeg.org](https://ffmpeg.org)
  - macOS: `brew install ffmpeg`
  - Linux: `apt-get install ffmpeg`

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development (Preview)
```bash
npm start
# Opens http://localhost:3000 with live preview
```

### Rendering

**Single Video (Preview)**
```bash
npx remotion render Video16 --codec=h264 --output renders/Video16_preview.mp4 --frames=150
```

**Full Video (Production)**
```bash
npx remotion render Video16 --codec=h264 --output renders/Video16.mp4 --crf=18
```

**All Videos**
```bash
npm run render:all
# Renders all videos using scripts/render-all.mjs
```

**Thumbnails**
```bash
npm run render:thumbnails
# Generates PNG thumbnails for all videos
```

## 📚 Documentation

### Main Guide
**[VIDEO_GENERATION_HANDOVER.md](./VIDEO_GENERATION_HANDOVER.md)** — Comprehensive handover document covering:
- Complete technology stack & setup
- Project structure & organization
- Brand system details
- Component library & props
- Step-by-step workflow
- Rendering procedures
- Troubleshooting guide
- How to create videos for new projects/topics
- Advanced patterns & best practices

### Available Scripts
| Command | Description |
|---------|-------------|
| `npm start` | Launch dev server with live preview |
| `npm run render:all` | Render all 20+ videos |
| `npm run render:thumbnails` | Generate PNG thumbnails |
| `npm run build` | Bundle for production |
| `npm run lint` | Run ESLint checks |
| `npm run type-check` | TypeScript validation |

## 🎯 Key Customization Points

### Brand Updates
- **Colors:** `src/brand/colors.ts`
- **Fonts:** `src/brand/fonts.ts`
- **Spacing/Tokens:** `src/brand/tokens.ts`

### Add New Episodes
1. Create file: `src/videos/VideoNN_Title.tsx`
2. Add metadata: `src/videos/videoConfig.ts`
3. Register component: `src/Root.tsx`

### Custom Assets
- **Logos:** `src/assets/logos/`
- **Images:** `src/assets/images/`
- Import & reference in components

## 🔧 Common Tasks

### Add Typewriter Animation
```typescript
<TypewriterText
    text="Your text"
    startFrame={50}
    framesPerChar={1}
/>
```

### Change Accent Color
```typescript
<ConceptReveal
    term="Your Term"
    accentColor={COLORS.accentSecondary}
/>
```

### Add Icon Grid
```typescript
<IconGridScene
    heading="Your Heading"
    columns={6}
    items={[
        { logoUrl: 'url/to/logo.svg', label: 'Name' },
        // ...
    ]}
/>
```

### Continue Timeline Numbering
```typescript
<TimelineScene
    steps={[...]}
    startIndex={3}  // Start from 4, 5, 6...
/>
```

## 🐛 Troubleshooting

**Dev Server Won't Start**
```bash
npm install
npm start
# Check http://localhost:3000
```

**Video Renders Black/Blank**
- Verify all component imports in `Root.tsx`
- Check console errors in dev server
- Ensure `staticFile()` paths are correct

**Missing Logos/Images**
- Place files in `public/assets/` or `src/assets/`
- Use `staticFile()` for public files
- Use ES6 imports for src files

**Slow Rendering**
- Reduce `--crf` to 24–28 (faster, lower quality)
- Decrease video resolution
- Render in stages or batches

## 📝 Recent Enhancements

- ✅ Typewriter text animation added to key scenes (Episodes 16, 18, 20)
- ✅ Dynamic font sizing & weight for emphasis
- ✅ Partner logos imported & integrated (Episodes 19)
- ✅ Timeline numbering offset support (Episode 18)
- ✅ Cinematic statement scenes with per-line typing (Episode 20)
- ✅ Comprehensive handover guide for template reuse

## 💡 Creating Videos for Other Projects

Use **[VIDEO_GENERATION_HANDOVER.md](./VIDEO_GENERATION_HANDOVER.md)** as a template:

1. Copy this repo as a starting point
2. Update `src/brand/` for your brand identity
3. Follow the step-by-step guide in the handover document
4. Compose episodes using reusable components
5. Render & deploy

All procedures, component patterns, and best practices are documented for seamless adaptation to new topics/projects.

## 📄 License

MIT

## 📧 Support

For detailed architecture, component props, workflow procedures, and troubleshooting:
→ See **[VIDEO_GENERATION_HANDOVER.md](./VIDEO_GENERATION_HANDOVER.md)**
