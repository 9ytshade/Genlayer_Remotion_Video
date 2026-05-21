import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface ElegantTextRevealProps {
    text: string;
    startFrame?: number;
    duration?: number;
    fontSize?: number;
    fontWeight?: number | string;
    color?: string;
    style?: React.CSSProperties;
    letterSpacingStart?: number;
    letterSpacingEnd?: number;
}

/**
 * Elegant Text Reveal
 * Performs a cinematic blur-in and subtle letter-spacing expansion.
 */
export const ElegantTextReveal: React.FC<ElegantTextRevealProps> = ({
    text,
    startFrame = 0,
    duration = 45,
    fontSize = 64,
    fontWeight = 'bold',
    color = '#FFFFFF',
    style = {},
    letterSpacingStart = 0,
    letterSpacingEnd = 8,
}) => {
    const frame = useCurrentFrame();

    const progress = interpolate(
        frame,
        [startFrame, startFrame + duration],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
        }
    );

    const opacity = progress;
    const blurAmount = interpolate(progress, [0, 1], [20, 0]);
    const letterSpacing = interpolate(progress, [0, 1], [letterSpacingStart, letterSpacingEnd]);

    return (
        <div
            style={{
                fontSize,
                fontWeight,
                color,
                opacity,
                filter: `blur(${blurAmount}px)`,
                letterSpacing: `${letterSpacing}px`,
                textShadow: `0px 4px 12px rgba(0,0,0,0.4)`,
                willChange: 'opacity, filter, letter-spacing',
                ...style,
            }}
        >
            {text}
        </div>
    );
};
