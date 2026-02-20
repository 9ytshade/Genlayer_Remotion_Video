export const COMP = {
    fps: 30,
    width: 1920,
    height: 1080,
    durationInFrames: 30 * 60 * 2, // Max 2 mins
    transitionDuration: 45, // 1.5s transition (slower)
    defaultSceneDuration: 180, // 6s defaults
} as const;

export const SPACING = {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 64,
    xxxl: 96,
    section: 120,
} as const;

export const LAYOUT = {
    contentPadding: 120,
    contentMaxWidth: 1680,
    centerX: 960,
    centerY: 540,
    safeZone: {
        top: 80,
        bottom: 80,
        left: 120,
        right: 120,
    },
} as const;

// Seconds to frames helper
export const s = (seconds: number): number => Math.round(seconds * COMP.fps);

// Scene timing helper
export const scene = (startSec: number, durationSec: number) => ({
    from: s(startSec),
    durationInFrames: s(durationSec),
});
