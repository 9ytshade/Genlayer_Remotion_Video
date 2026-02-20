import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
} from 'remotion';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { SPACING } from '../brand/tokens';

interface StatHighlightProps {
    value: string;
    label: string;
    prefix?: string;
    suffix?: string;
    color?: string;
    countUp?: boolean;
    numericValue?: number;
}

/**
 * Animated stat/number display for key metrics.
 * Number counts up with easing, accent glow effect.
 */
export const StatHighlight: React.FC<StatHighlightProps> = ({
    value,
    label,
    prefix = '',
    suffix = '',
    color = COLORS.accentPrimary,
    countUp = true,
    numericValue,
}) => {
    const frame = useCurrentFrame();

    // Count up animation
    const progress = interpolate(frame, [10, 60], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    let displayValue = value;
    if (countUp && numericValue !== undefined) {
        const current = numericValue * progress;
        displayValue = current.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
        });
    }

    // Glow pulse
    const pulse = Math.sin(frame * 0.06) * 0.3 + 0.7;

    // Scale in
    const scale = interpolate(frame, [5, 30], [0.9, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.back(1.5)),
    });

    const opacity = interpolate(frame, [5, 25], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Label
    const labelOpacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const labelY = interpolate(frame, [30, 50], [15, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: 'absolute',
                    width: 400,
                    height: 200,
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse, ${color}20 0%, transparent 70%)`,
                    opacity: pulse,
                }}
            />

            {/* Value */}
            <div
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: 96,
                    fontWeight: FONTS.weights.black,
                    color,
                    opacity,
                    transform: `scale(${scale})`,
                    textShadow: `0 0 ${40 * pulse}px ${color}50`,
                    letterSpacing: -2,
                }}
            >
                {prefix}
                {displayValue}
                {suffix}
            </div>

            {/* Label */}
            <div
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.h4,
                    fontWeight: FONTS.weights.regular,
                    color: COLORS.textSecondary,
                    opacity: labelOpacity,
                    transform: `translateY(${labelY}px)`,
                    marginTop: SPACING.md,
                    textAlign: 'center',
                    maxWidth: 600,
                }}
            >
                {label}
            </div>
        </AbsoluteFill>
    );
};
