import { s } from '../brand/tokens';

/**
 * Standard timing constants in frames.
 */
export const TIMING = {
    // Scene transitions
    transitionDuration: s(0.5),
    sceneGap: s(0.25),

    // Text animation
    textRevealDuration: s(0.6),
    textStaggerDelay: s(0.15),
    titleHold: s(3),

    // Effect durations
    signalWaveDuration: s(1.2),
    conceptRevealDuration: s(0.8),
    glowPulsePeriod: s(3),

    // Scene templates
    titleSceneDuration: s(5),
    contentSceneDuration: s(12),
    conceptSceneDuration: s(8),
    comparisonSceneDuration: s(12),
    statSceneDuration: s(6),
    mochiSceneDuration: s(6),
    closingSceneDuration: s(5),
} as const;

/**
 * Creates a timeline of scenes with automatic start frame calculation.
 */
export const buildTimeline = (
    durations: number[]
): { startFrame: number; durationInFrames: number }[] => {
    let currentFrame = 0;
    return durations.map((duration) => {
        const entry = { startFrame: currentFrame, durationInFrames: duration };
        currentFrame += duration;
        return entry;
    });
};
