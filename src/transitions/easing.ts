import { Easing } from 'remotion';

/**
 * Cinematic easing presets.
 */
export const EASING = {
    /** Smooth, gentle entrance */
    subtleEntry: Easing.out(Easing.cubic),

    /** Dramatic, attention-grabbing reveal */
    dramaticReveal: Easing.bezier(0.16, 1, 0.3, 1),

    /** Gentle floating motion */
    gentleFloat: Easing.inOut(Easing.sin),

    /** Sharp snap-in with slight overshoot */
    snapIn: Easing.out(Easing.back(1.7)),

    /** Very smooth deceleration */
    decelerate: Easing.out(Easing.quad),

    /** Smooth acceleration then deceleration */
    smooth: Easing.inOut(Easing.cubic),
} as const;
