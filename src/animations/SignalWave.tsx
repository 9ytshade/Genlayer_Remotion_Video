import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS } from '../brand/colors';
import { COMP } from '../brand/tokens';
import { fullScreen } from '../utils/types';

interface SignalWaveProps {
    triggerFrame: number;
    duration?: number;
    color?: string;
    thickness?: number;
}

export const SignalWave: React.FC<SignalWaveProps> = ({
    triggerFrame,
    duration = 36,
    color = COLORS.signalWave,
    thickness = 2,
}) => {
    const frame = useCurrentFrame();

    if (frame < triggerFrame || frame > triggerFrame + duration) {
        return null;
    }

    const progress = interpolate(
        frame,
        [triggerFrame, triggerFrame + duration],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
        }
    );

    const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.8, 0]);

    // Signal wave sweep position
    const sweepX = progress * COMP.width * 1.2 - COMP.width * 0.1;

    // Generate sine wave path
    const points: string[] = [];
    const waveHeight = 60;
    const segments = 200;
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = t * COMP.width;
        const distFromSweep = Math.abs(x - sweepX);
        const envelope = Math.max(
            0,
            1 - distFromSweep / (COMP.width * 0.15)
        );
        const y =
            COMP.height / 2 +
            Math.sin(t * 30 + frame * 0.3) * waveHeight * envelope;
        points.push(`${x},${y}`);
    }

    return (
        <div style={{ ...fullScreen, pointerEvents: 'none' }}>
            <svg
                width={COMP.width}
                height={COMP.height}
                viewBox={`0 0 ${COMP.width} ${COMP.height}`}
                style={fullScreen}
            >
                <defs>
                    <filter id="signal-glow">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Glow layer */}
                <polyline
                    points={points.join(' ')}
                    fill="none"
                    stroke={color}
                    strokeWidth={thickness * 4}
                    opacity={opacity * 0.3}
                    filter="url(#signal-glow)"
                />

                {/* Core line */}
                <polyline
                    points={points.join(' ')}
                    fill="none"
                    stroke={color}
                    strokeWidth={thickness}
                    opacity={opacity}
                />

                {/* Sweep glow */}
                <rect
                    x={sweepX - 60}
                    y={0}
                    width={120}
                    height={COMP.height}
                    fill={`url(#sweep-gradient-${triggerFrame})`}
                    opacity={opacity * 0.15}
                />
                <defs>
                    <linearGradient
                        id={`sweep-gradient-${triggerFrame}`}
                        x1="0"
                        x2="1"
                        y1="0"
                        y2="0"
                    >
                        <stop offset="0%" stopColor={color} stopOpacity="0" />
                        <stop offset="50%" stopColor={color} stopOpacity="1" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
