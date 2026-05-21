import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS } from '../brand/colors';

interface BokehBackgroundProps {
    intensity?: number;
    accentColor?: string;
    secondaryColor?: string;
}

/**
 * Elegant cinematic Bokeh background
 * Creates slow-moving, out-of-focus glowing orbs.
 */
export const BokehBackground: React.FC<BokehBackgroundProps> = ({
    intensity = 1,
    accentColor = COLORS.accentPrimary,
    secondaryColor = COLORS.accentSecondary,
}) => {
    const frame = useCurrentFrame();

    // Create a deterministic set of bokeh orbs
    const orbs = React.useMemo(() => {
        return Array.from({ length: 12 }).map((_, i) => {
            const size = 100 + Math.random() * 400;
            const xOffset = Math.random() * 100;
            const yOffset = Math.random() * 100;
            const speed = 0.5 + Math.random() * 1.5;
            const delay = Math.random() * 300;
            const isAccent = Math.random() > 0.5;
            return { id: i, size, xOffset, yOffset, speed, delay, isAccent };
        });
    }, []);

    return (
        <AbsoluteFill style={{ overflow: 'hidden' }}>
            {orbs.map((orb) => {
                // Calculate slow drift
                const time = frame * orb.speed * intensity;
                const xPos = interpolate(
                    Math.sin(time / 200 + orb.delay),
                    [-1, 1],
                    [-20, 120]
                );
                const yPos = interpolate(
                    Math.cos(time / 250 + orb.delay),
                    [-1, 1],
                    [-20, 120]
                );

                // Pulsing opacity
                const opacity = interpolate(
                    Math.sin(time / 100 + orb.delay),
                    [-1, 1],
                    [0.1, 0.4]
                );

                return (
                    <div
                        key={orb.id}
                        style={{
                            position: 'absolute',
                            left: `${xPos}%`,
                            top: `${yPos}%`,
                            width: orb.size,
                            height: orb.size,
                            borderRadius: '50%',
                            backgroundColor: orb.isAccent ? accentColor : secondaryColor,
                            filter: 'blur(80px)',
                            opacity,
                            transform: 'translate(-50%, -50%)',
                            willChange: 'transform, opacity',
                            mixBlendMode: 'screen',
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
