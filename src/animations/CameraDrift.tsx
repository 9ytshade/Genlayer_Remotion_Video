import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { fullScreen } from '../utils/types';

interface CameraDriftProps {
    children: React.ReactNode;
    maxDriftX?: number;
    maxDriftY?: number;
    maxScale?: number;
    speed?: number;
}

export const CameraDrift: React.FC<CameraDriftProps> = ({
    children,
    maxDriftX = 15,
    maxDriftY = 10,
    maxScale = 1.02,
    speed = 0.005,
}) => {
    const frame = useCurrentFrame();

    // Slow sinusoidal drift
    const driftX = Math.sin(frame * speed) * maxDriftX;
    const driftY = Math.cos(frame * speed * 0.7) * maxDriftY;
    const scale = interpolate(
        Math.sin(frame * speed * 0.3),
        [-1, 1],
        [1, maxScale]
    );

    return (
        <div
            style={{
                ...fullScreen,
                transform: `translate(${driftX}px, ${driftY}px) scale(${scale})`,
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    );
};
