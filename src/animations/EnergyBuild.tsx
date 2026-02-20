import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COMP } from '../brand/tokens';

interface EnergyBuildProps {
    children: (energy: number) => React.ReactNode;
    totalFrames?: number;
    curve?: 'linear' | 'exponential' | 'stepped';
}

/**
 * Global energy build system.
 * Provides a 0→1 energy factor that increases over the video duration.
 * This factor modulates visual intensity across all child components:
 * - Particle speed
 * - Neural network pulse rate
 * - Background glow intensity
 * - Accent color saturation
 */
export const EnergyBuild: React.FC<EnergyBuildProps> = ({
    children,
    totalFrames = COMP.durationInFrames,
    curve = 'exponential',
}) => {
    const frame = useCurrentFrame();

    let energy: number;

    switch (curve) {
        case 'linear':
            energy = interpolate(frame, [0, totalFrames], [0.2, 1], {
                extrapolateRight: 'clamp',
            });
            break;
        case 'exponential':
            const linear = interpolate(frame, [0, totalFrames], [0, 1], {
                extrapolateRight: 'clamp',
            });
            energy = 0.2 + 0.8 * (linear * linear);
            break;
        case 'stepped':
            const stepProgress = frame / totalFrames;
            if (stepProgress < 0.25) energy = 0.3;
            else if (stepProgress < 0.5) energy = 0.5;
            else if (stepProgress < 0.75) energy = 0.7;
            else energy = 1.0;
            break;
        default:
            energy = 0.5;
    }

    return <>{children(energy)}</>;
};

/**
 * Hook version for use within existing components.
 */
export const useEnergyFactor = (
    totalFrames: number = COMP.durationInFrames
): number => {
    const frame = useCurrentFrame();
    const linear = interpolate(frame, [0, totalFrames], [0, 1], {
        extrapolateRight: 'clamp',
    });
    return 0.2 + 0.8 * (linear * linear);
};
