import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { FONTS } from '../brand/fonts';
import { COLORS } from '../brand/colors';

interface MaskedTextRevealProps {
    text: string;
    startFrame?: number;
    duration?: number;
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    direction?: 'up' | 'down';
    style?: React.CSSProperties;
}

export const MaskedTextReveal: React.FC<MaskedTextRevealProps> = ({
    text,
    startFrame = 0,
    duration = 20,
    fontSize = FONTS.sizes.h1,
    fontWeight = FONTS.weights.bold,
    color = COLORS.textPrimary,
    direction = 'up',
    style,
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

    const translateY = direction === 'up'
        ? interpolate(progress, [0, 1], [fontSize * 1.2, 0])
        : interpolate(progress, [0, 1], [-fontSize * 1.2, 0]);

    const clipProgress = interpolate(progress, [0, 1], [0, 100]);

    return (
        <div
            style={{
                overflow: 'hidden',
                position: 'relative',
                ...style,
            }}
        >
            <div
                style={{
                    fontFamily: FONTS.primary,
                    fontSize,
                    fontWeight,
                    color,
                    lineHeight: FONTS.lineHeights.tight,
                    transform: `translateY(${translateY}px)`,
                    opacity: interpolate(progress, [0, 0.3, 1], [0, 1, 1]),
                    clipPath: `inset(0 0 ${100 - clipProgress}% 0)`,
                    willChange: 'transform, opacity, clip-path',
                }}
            >
                {text}
            </div>
        </div>
    );
};
