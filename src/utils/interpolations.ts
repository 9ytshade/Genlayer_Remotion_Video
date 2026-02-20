import { interpolate, Easing } from 'remotion';

/**
 * Attempt-safe interpolate: clamps input to [0,1] range automatically.
 */
export const smoothIn = (
    frame: number,
    start: number,
    duration: number
): number =>
    interpolate(frame, [start, start + duration], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

export const smoothOut = (
    frame: number,
    start: number,
    duration: number
): number =>
    interpolate(frame, [start, start + duration], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.in(Easing.cubic),
    });

export const smoothInOut = (
    frame: number,
    enterStart: number,
    enterDuration: number,
    exitStart: number,
    exitDuration: number
): number => {
    const enter = smoothIn(frame, enterStart, enterDuration);
    const exit = smoothOut(frame, exitStart, exitDuration);
    return Math.min(enter, exit);
};

export const slideUp = (
    frame: number,
    start: number,
    duration: number,
    distance: number = 40
): number =>
    interpolate(frame, [start, start + duration], [distance, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

export const scaleIn = (
    frame: number,
    start: number,
    duration: number,
    from: number = 0.9
): number =>
    interpolate(frame, [start, start + duration], [from, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

/** 
 * Staggered delay calculator for sequential element appearance.
 */
export const stagger = (index: number, delayPerItem: number = 5): number =>
    index * delayPerItem;

/**
 * Seeded pseudo-random number generator for deterministic renders.
 */
export const seededRandom = (seed: number): number => {
    const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
};

/**
 * Generate array of values from seeded random.
 */
export const seededRandomArray = (
    count: number,
    seed: number = 42
): number[] => {
    return Array.from({ length: count }, (_, i) => seededRandom(seed + i));
};
