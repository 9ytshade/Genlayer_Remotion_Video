# Video Generation Handover & Architecture Guide

**Purpose:** This document provides comprehensive instructions, procedures, and architectural patterns to create episodic video series (like GenLayer's 20+ video suite) for any project, topic, or concept using Remotion + React.

**Last Updated:** May 2026  
**Technology Stack:** Remotion, React 18, TypeScript, Node.js  
**Video Format:** 1920×1080 @ 30fps, ~120 frames per episode (4 seconds)

---

## 1. Technology Stack & Core Dependencies

### Primary Framework
- **Remotion** - React-based video rendering engine
  - `@remotion/core` - Core video composition
  - `@remotion/bundler` - Build & bundling
  - `@remotion/google-fonts` - Typography (Inter, font weights)
  - `@remotion/cli` - CLI for dev server & rendering
  
### Build & Runtime
- **React 18** - Component-based UI
- **TypeScript** - Type-safe code
- **Vite** - Development server (via Remotion's bundler)
- **FFmpeg** - Video encoding (installed separately)

### Install Dependencies
```bash
npm install remotion @remotion/cli @remotion/bundler @remotion/google-fonts
npm install react react-dom
npm install typescript --save-dev
```

### FFmpeg Setup
- **Windows:** Download from [ffmpeg.org](https://ffmpeg.org) or use `choco install ffmpeg`
- **macOS:** `brew install ffmpeg`
- **Linux:** `apt-get install ffmpeg`

---

## 2. Project Structure

```
genlayer-remotion/
├── src/
│   ├── index.ts                           # Entry point
│   ├── Root.tsx                           # Root composition & video registry
│   ├── videos/
│   │   ├── Video01_WhatIsGenLayer.tsx
│   │   ├── Video02_WhyGenLayerExists.tsx
│   │   ├── Video16_TrustInAI.tsx          # Example: Intelligent Contracts + Trust Infrastructure
│   │   ├── Video18_Roadmap.tsx            # Example: Timeline + Roadmap scenes
│   │   ├── Video19_Partnerships.tsx       # Example: Icon grid + partner logos
│   │   ├── Video20_OpenToAll.tsx          # Example: Cinematic statements + typewriter
│   │   └── videoConfig.ts                 # Centralized video metadata
│   ├── components/
│   │   ├── ElegantLayout.tsx              # Root layout wrapper
│   │   ├── ElegantSceneSequence.tsx       # NOT IN FOLDER—see transitions/
│   │   ├── ElegantTitleScene.tsx          # Opening title card
│   │   ├── ConceptReveal.tsx              # Fullscreen term reveal w/ glow
│   │   ├── IconGridScene.tsx              # Grid of logos/items (6 col × 3+ rows)
│   │   ├── TimelineScene.tsx              # Roadmap/timeline visualization
│   │   ├── StatCounterScene.tsx           # Statistics/metrics display
│   │   ├── MochiScene.tsx                 # Mascot bubble dialogue
│   │   ├── ClosingScene.tsx               # End card
│   │   ├── TitleScene.tsx                 # Alternative title card
│   │   ├── SocialPill.tsx                 # Social media label
│   │   └── Thumbnail.tsx                  # Thumbnail generator
│   ├── transitions/
│   │   └── ElegantTransitionEngine.tsx    # ElegantSceneSequence wrapper
│   ├── animations/
│   │   ├── TypewriterText.tsx             # Character-by-character text reveal
│   │   ├── EnergyBuild.ts                 # useEnergyFactor hook for intensity
│   │   └── SignalWave.tsx                 # Animated wave pattern
│   ├── brand/
│   │   ├── colors.ts                      # COLORS object (accentPrimary, etc.)
│   │   ├── fonts.ts                       # FONTS object (sizes, weights)
│   │   └── tokens.ts                      # s(seconds), spacing, layout constants
│   └── assets/
│       ├── logos/
│       │   ├── GenLayer_Logo_White_Cropped.png
│       │   ├── marb-markets.svg
│       │   ├── health-protocol.svg
│       │   └── comput3.svg
│       └── images/
├── build/                                  # Output directory for builds
├── renders/                                # Output directory for renders
├── scripts/
│   ├── render-all.mjs                     # Render all videos
│   ├── render-thumbnails.mjs              # Generate thumbnails
│   └── render-specific.mjs                # Render single video
├── public/
│   └── assets/                            # Static files (logos, images)
├── package.json
├── tsconfig.json
├── remotion.config.ts                     # Remotion config (optional)
└── VIDEO_GENERATION_HANDOVER.md           # This file
```

---

## 3. Brand System

All visual consistency comes from three central files.

### 3.1 Colors (`src/brand/colors.ts`)

```typescript
export const COLORS = {
    // Primary
    textPrimary: '#FFFFFF',
    textSecondary: '#E8E8E8',
    textMuted: '#999999',
    
    // Accents
    accentPrimary: '#00FF00',    // Bright lime green (main CTA)
    accentSecondary: '#00CCFF', // Cyan blue
    accentTertiary: '#FF6B9D',  // Pink/magenta
    
    // Background
    backgroundDark: '#0A0E14',
    backgroundDarker: '#050809',
    
    // Effects
    glowColor: '#00FF0080',      // Semi-transparent accent for glows
};
```

**Usage:** Import and apply to any component text, backgrounds, shadows.

### 3.2 Fonts (`src/brand/fonts.ts`)

```typescript
export const FONTS = {
    primary: 'Inter',  // Default font family
    weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900,
    },
    sizes: {
        label: 12,
        body: 16,
        h4: 24,
        h3: 32,
        h2: 48,
        h1: 64,
        display: 80,
    },
    lineHeights: {
        tight: 1.1,
        normal: 1.4,
        relaxed: 1.6,
    },
};
```

**Usage:** Use `FONTS.primary`, `FONTS.sizes.h2`, `FONTS.weights.black` in styles.

### 3.3 Tokens (`src/brand/tokens.ts`)

```typescript
export const s = (seconds: number): number => Math.round(seconds * 30);  // Frames helper
export const SPACING = { xs: 8, sm: 16, md: 24, lg: 32, xl: 48, ... };  // Spacing scale
export const LAYOUT = { contentPadding: 120, centerX: 960, centerY: 540, ... };  // Layout
```

**Usage:** `s(12)` for 12 seconds → 360 frames; `SPACING.xl` for 48px gaps.

---

## 4. Core Components & Patterns

### 4.1 ElegantLayout (Root Wrapper)

Wraps all video compositions. Provides:
- Background gradients
- Particle effects (optional)
- Energy intensity animations

```typescript
<ElegantLayout intensity={energyFactor}>
    {scenes}
</ElegantLayout>
```

### 4.2 ElegantSceneSequence (Scene Manager)

Manages frame timing, transitions between scenes, and auto-composition length.

```typescript
<ElegantSceneSequence scenes={[
    { id: 'title', durationInFrames: s(5), component: <TitleScene /> },
    { id: 'concept', durationInFrames: s(8), component: <ConceptReveal /> },
    // ...
]} />
```

**Key:** Scene IDs and durations determine total video length.

### 4.3 Reusable Scene Components

#### **ElegantTitleScene / TitleScene**
Opening title card with logo, episode number, typewriter title reveal.

```typescript
<ElegantTitleScene
    title="Episode Title"
    subtitle="Subtitle"
    episodeNumber={16}
/>
```

**Props:**
- `titleFontSize`, `titleFontWeight` - Control text size/weight
- `typewriterFramesPerChar` - Speed (default 1.5)

#### **ConceptReveal**
Fullscreen term reveal with glow effect and optional signal wave.

```typescript
<ConceptReveal
    term="Intelligent Contracts"
    subtitle="AI logic executed on-chain"
    accentColor={COLORS.accentPrimary}
    termFontSize={120}
    termFontWeight={FONTS.weights.black}
    typewriterFramesPerChar={1}
/>
```

#### **IconGridScene**
Grid display of logos + labels (typically 3–6 columns).

```typescript
<IconGridScene
    heading="Partners"
    columns={6}
    accentColor={COLORS.accentPrimary}
    items={[
        { logoUrl: 'url/to/logo.svg', label: 'Partner Name', sublabel: 'Optional' },
        // ...
    ]}
/>
```

#### **TimelineScene**
Roadmap/timeline with numbered nodes and descriptions.

```typescript
<TimelineScene
    heading="Roadmap"
    steps={[
        { title: 'Phase 1', description: '...' },
        { title: 'Phase 2', description: '...' },
    ]}
    startIndex={3}  // Continue numbering from previous slides
/>
```

#### **StatCounterScene**
Statistics display (value + label + sublabel).

```typescript
<StatCounterScene
    heading="The Scale"
    stats={[
        { value: '$100B+', label: 'Liquidity', sublabel: 'Unlocked' },
        // ...
    ]}
/>
```

#### **MochiScene**
Mascot character with dialogue bubble (uses TypewriterText).

```typescript
<MochiScene
    message="It takes a village to build AI."
    position="left"
/>
```

#### **ClosingScene**
End card with tagline and social media links.

```typescript
<ClosingScene tagline="The Future is Here" />
```

---

## 5. Animation System

### 5.1 TypewriterText Component

Character-by-character reveal with blinking cursor.

```typescript
<TypewriterText
    text="Your text here"
    startFrame={50}           // When to begin typing
    framesPerChar={1}         // Frames per character (lower = faster)
    hideCursorAfterDone={true}
/>
```

**Pattern:** Use in titles, section headers, cinematic statements.

### 5.2 useEnergyFactor Hook

Provides dynamic intensity for animations/particles based on video progress.

```typescript
const energy = useEnergyFactor(s(120));  // Total video duration
// Use `energy` in opacity, scale, or particle intensity calculations
```

### 5.3 Signal Wave & Glow Effects

Pre-built in ConceptReveal for sci-fi aesthetic. Available as `<SignalWave />`.

---

## 6. Workflow & Procedures

### 6.1 Creating a New Video Episode

**Step 1: Define Episode Metadata**
- Add entry to `src/videos/videoConfig.ts`:
```typescript
{
    id: 'Video21',
    title: 'Your Title',
    description: 'Your description',
    durationInFrames: s(120),
    episode: 21,
}
```

**Step 2: Create Video File**
- File: `src/videos/Video21_YourTitle.tsx`
- Template:
```typescript
import React from 'react';
import { ElegantLayout } from '../components/ElegantLayout';
import { ElegantSceneSequence } from '../transitions/ElegantTransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video21_YourTitle: React.FC = () => {
    const energy = useEnergyFactor(s(120));

    return (
        <ElegantLayout intensity={energy}>
            <ElegantSceneSequence
                scenes={[
                    {
                        id: 'title',
                        durationInFrames: s(5),
                        component: (
                            <ElegantTitleScene
                                title="Your Title"
                                subtitle="Subtitle"
                                episodeNumber={21}
                            />
                        ),
                    },
                    // Add more scenes...
                ]}
            />
        </ElegantLayout>
    );
};
```

**Step 3: Register in Root**
- Open `src/Root.tsx`
- Import: `import { Video21_YourTitle } from './videos/Video21_YourTitle';`
- Add to `VIDEO_COMPONENTS`: `Video21: Video21_YourTitle,`

**Step 4: Plan Scenes**
- Break narrative into 5–10 scenes
- Allocate frames: title (5s), concepts (8–12s), grid/stats (15–20s), closing (10–15s)
- Total: ~120 frames = 4 seconds @ 30fps (or scale up)

**Step 5: Compose Scenes**
- Pick reusable components (TitleScene, ConceptReveal, IconGridScene, etc.)
- Customize colors, text, images, animations
- Use `s()` for timing, `COLORS.*` for consistency

---

### 6.2 Common Customizations

#### Add Typewriter Animation
- Wrap text in `<TypewriterText startFrame={50} framesPerChar={1} />`
- Adjust `startFrame` based on scene offset
- Lower `framesPerChar` = faster typing

#### Change Colors
- Pass `accentColor={COLORS.accentSecondary}` to components
- Or update `COLORS` object for global change

#### Add/Update Logo
- Save SVG/PNG to `src/assets/logos/`
- Import: `import logo from '../assets/logos/mylogo.svg';`
- Use in IconGridScene: `{ logoUrl: logo, label: 'Name' }`

#### Adjust Fonts
- Update `FONTS.sizes.display`, `FONTS.weights.black` in `src/brand/fonts.ts`
- Or pass `termFontSize={140}` to ConceptReveal

#### Add Multiple Icon Grid Slides
- Create separate scene for each grid
- Use different `columns` (3, 4, 6) for variety
- Alternate `accentColor` for visual rhythm

#### Timeline with Continued Numbering
- Use `startIndex={3}` prop on second TimelineScene
- Automatically offset node labels (4, 5, 6, ...)

---

### 6.3 Rendering Videos

#### Dev Server
```bash
npm start
# Opens http://localhost:3000 with live preview
```

#### Single Video Preview
```bash
npx remotion render Video16 --codec=h264 --output renders/Video16_preview.mp4 --frames=150
```

#### Full Render (High Quality)
```bash
npx remotion render Video16 --codec=h264 --output renders/Video16_final.mp4 --crf=18
```

#### Render All Episodes
```bash
npm run render:all
# Runs scripts/render-all.mjs
```

#### Generate Thumbnails
```bash
npm run render:thumbnails
# Generates PNG thumbnails for all videos
```

---

## 7. Video Composition Structure (Typical Pattern)

Most episodes follow this structure:

```
Video (120 frames = 4 sec)
├── Scene 1: Title Card (5 sec)
│   └── ElegantTitleScene → typewriter reveal of title
├── Scene 2: Concept Intro (8–10 sec)
│   └── ConceptReveal → fullscreen term + glow
├── Scene 3: Visual Content (15–25 sec)
│   └── IconGridScene | TimelineScene | StatCounterScene
├── Scene 4: Secondary Content (10–20 sec)
│   └── Another grid, timeline, or cinematic statement
├── Scene 5: Dialogue/Character (10–15 sec)
│   └── MochiScene → mascot + typewriter message
└── Scene 6: Closing (10–15 sec)
    └── ClosingScene → end card + social links
```

**Flexibility:** Adjust scene count/duration per topic. Some episodes have 8–10 scenes, others 4–5.

---

## 8. Deployment & Rendering Best Practices

### 8.1 Rendering Strategy
1. **Preview:** Render first 150 frames (5 sec) to check visuals
2. **Full Render:** Render entire video at target quality
3. **Optimization:** Use `--crf=20` (quality) or `--crf=28` (fast)

### 8.2 Output Settings
```typescript
// In remotion.config.ts or render command
{
    codec: 'h264',      // H.264 video codec
    crf: 18,            // Quality (lower = better, 18–23 typical)
    fps: 30,            // Frame rate
    width: 1920,        // Resolution
    height: 1080,
}
```

### 8.3 File Organization
- **Source:** `src/videos/`
- **Renders:** `renders/` (git-ignored)
- **Assets:** `src/assets/logos/` and `src/assets/images/`
- **Thumbnails:** `renders/thumbnails/`

---

## 9. Troubleshooting

### Issue: ReferenceError - `steps` undefined
**Cause:** Component prop missing or destructuring error  
**Solution:** Add default value: `const { steps = [] } = props;`

### Issue: TypewriterText not visible
**Cause:** `startFrame` is absolute global frame, not scene-local  
**Solution:** Use scene-local frame (e.g., frame 0–150 within scene) or calculate offset from scene start

### Issue: Inline style linter warnings
**Cause:** ESLint enforces no inline styles  
**Solution:** Move styles to CSS file or use styled-components (optional)

### Issue: Video renders black/blank
**Cause:** ElegantLayout or scene component rendering issue  
**Solution:** Check imports, props, and console errors in dev server

### Issue: Missing logo/image
**Cause:** Incorrect path in `staticFile()` or import  
**Solution:** Verify file exists in `public/assets/` or use absolute import from `src/assets/`

### Issue: Slow render time
**Cause:** High quality (`crf=18`), large resolution, long video  
**Solution:** Reduce `crf` (e.g., 24–28), decrease resolution, or render in stages

---

## 10. Step-by-Step: Create a Video for a New Topic

### Example: "How AI is Changing Finance"

**Step 1: Plan Content**
- Concept: AI decision-making in DeFi, risk assessment, automation
- Scenes: Title → What is AI Finance? → Benefits (grid) → Use Cases (timeline) → Future (cinematic) → Closing
- Duration: 120 frames (4 sec)

**Step 2: Create Video File**
```typescript
// src/videos/Video21_AIFinance.tsx
import { Video21_AIFinance } from './videos/Video21_AIFinance';
// ... register in Root.tsx
```

**Step 3: Define Scenes**
```typescript
scenes: [
    {
        id: 'title',
        durationInFrames: s(5),
        component: (
            <ElegantTitleScene
                title="AI & Finance"
                subtitle="Intelligent Markets"
                episodeNumber={21}
            />
        ),
    },
    {
        id: 'concept',
        durationInFrames: s(10),
        component: (
            <ConceptReveal
                term="Algorithmic Risk"
                subtitle="AI evaluates market conditions in real-time"
                accentColor={COLORS.accentTertiary}
                typewriterFramesPerChar={1}
            />
        ),
    },
    {
        id: 'benefits',
        durationInFrames: s(20),
        component: (
            <IconGridScene
                heading="Key Benefits"
                columns={3}
                items={[
                    { emoji: '⚡', label: 'Speed', sublabel: 'Instant decisions' },
                    { emoji: '🎯', label: 'Precision', sublabel: 'Data-driven' },
                    { emoji: '🔒', label: 'Safety', sublabel: 'Risk mitigation' },
                ]}
            />
        ),
    },
    // ... more scenes
]
```

**Step 4: Customize Brand**
- Use `accentColor={COLORS.accentSecondary}` for finance theme
- Adjust font sizes for emphasis

**Step 5: Test & Render**
```bash
npm start
# Preview in http://localhost:3000
# Render when satisfied:
npx remotion render Video21 --codec=h264 --output renders/Video21_AIFinance.mp4
```

---

## 11. Advanced Patterns

### 11.1 Multi-Grid Splitting
When you have 30+ items, split across multiple scenes:
```typescript
// Scene 1: Items 1–12
<IconGridScene columns={6} items={items.slice(0, 12)} />
// Scene 2: Items 13–24
<IconGridScene columns={6} items={items.slice(12, 24)} />
// Scene 3: Items 25+
<IconGridScene columns={6} items={items.slice(24)} />
```

### 11.2 Cinematic Statements
Full-screen text with per-line typewriter and emphasis:
```typescript
<CinematicStatement
    lines={[
        'Line 1 regular',
        'Line 2 ACCENT (yellow)',
        'Line 3 regular',
    ]}
    accentLine={1}
    framesPerChar={1}
/>
```

### 11.3 Custom Animations
Use Remotion's `interpolate()` for easing:
```typescript
const opacity = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.out(Easing.cubic),
});
```

---

## 12. Resources & Key Files to Modify

### For New Videos:
1. `src/videos/videoConfig.ts` — Add metadata
2. `src/videos/VideoNN_Title.tsx` — Create episode file
3. `src/Root.tsx` — Register component

### For Brand Updates:
1. `src/brand/colors.ts` — Update `COLORS`
2. `src/brand/fonts.ts` — Update `FONTS`
3. `src/brand/tokens.ts` — Update spacing/layout

### For New Assets:
1. `src/assets/logos/` — Add logo files
2. Update component references with import or `staticFile()`

### For Component Changes:
1. `src/components/*.tsx` — Modify any reusable component
2. All videos using that component auto-update

---

## 13. Quick Reference: Common Props

### ElegantTitleScene
```typescript
{
    title: string;
    subtitle?: string;
    episodeNumber?: number;
    titleFontSize?: number;
    titleFontWeight?: number;
    typewriterFramesPerChar?: number;
}
```

### ConceptReveal
```typescript
{
    term: string;
    subtitle?: string;
    accentColor?: string;
    termFontSize?: number;
    termFontWeight?: number;
    typewriterFramesPerChar?: number;
    typewriterStartFrame?: number;
}
```

### IconGridScene
```typescript
{
    heading: string;
    columns: number;          // 3, 4, 6
    accentColor: string;
    items: Array<{
        logoUrl: string;
        label: string;
        sublabel?: string;
        emoji?: string;
        color?: string;
    }>;
}
```

### TimelineScene
```typescript
{
    heading: string;
    steps: Array<{ title: string; description: string }>;
    startIndex?: number;      // Offset numbering
    accentColor?: string;
}
```

---

## 14. Next Steps for New Projects

1. **Fork/Clone** this repo as a template
2. **Update Brand** (`colors.ts`, `fonts.ts`) for your project
3. **Create Episode Files** in `src/videos/`
4. **Plan Content** (scenes, timing, visuals)
5. **Compose Scenes** using reusable components
6. **Test** in dev server (`npm start`)
7. **Render** full videos with high quality
8. **Deploy** to video platform

---

## 15. Maintenance & Scaling

### Adding Components:
- Create in `src/components/`
- Export and import in video files
- Document props in this file

### Updating Brand:
- Edit `src/brand/*.ts` files
- Changes apply globally to all videos

### Managing Videos:
- Keep `videoConfig.ts` updated
- Use consistent naming: `VideoNN_TitleCase.tsx`
- Maintain `Root.tsx` component registry

### Performance:
- Use `s()` helper consistently
- Avoid heavy animations in multiple scenes
- Pre-optimize logo/image files
- Render in batches if >100 videos

---

## 16. Support & Debugging

**Common Commands:**
```bash
npm start                 # Dev server
npm run render:all       # Render all videos
npm run render:thumbnails # Generate thumbnails
npm run lint             # Check code
npm run type-check       # TypeScript validation
```

**Logs & Errors:**
- Dev console: `http://localhost:3000/` → DevTools
- Build errors: Check `tsconfig.json` and imports
- Render errors: Check FFmpeg installation, codec support

---

## 17. Final Checklist for Handoff

- ✅ Technology stack documented
- ✅ Project structure explained
- ✅ Brand system (colors, fonts, tokens) documented
- ✅ Reusable components catalogued with props
- ✅ Workflow & step-by-step procedures provided
- ✅ Rendering instructions included
- ✅ Troubleshooting guide added
- ✅ Quick reference for common tasks
- ✅ Advanced patterns explained
- ✅ Example: How to create a new video from scratch
- ✅ File organization & best practices
- ✅ Maintenance & scaling strategies

**Ready to generate videos for any topic or project with this guide!**
