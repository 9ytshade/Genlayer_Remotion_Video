import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
} from 'remotion';
import { MaskedTextReveal } from '../animations/MaskedTextReveal';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { LAYOUT, SPACING } from '../brand/tokens';

interface ComparisonSide {
    label: string;
    points: string[];
    color?: string;
}

interface ComparisonSceneProps {
    heading?: string;
    left: ComparisonSide;
    right: ComparisonSide;
}

/**
 * Split-screen comparison: old/problem vs new/solution.
 * Animates left side first, then right side. Divider line in center.
 */
export const ComparisonScene: React.FC<ComparisonSceneProps> = ({
    heading,
    left,
    right,
}) => {
    const frame = useCurrentFrame();

    const leftColor = left.color || COLORS.textMuted;
    const rightColor = right.color || COLORS.accentPrimary;

    // Divider
    const dividerHeight = interpolate(frame, [20, 50], [0, 700], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Side animations
    const leftOpacity = interpolate(frame, [15, 35], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const rightOpacity = interpolate(frame, [40, 60], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const renderSide = (
        side: ComparisonSide,
        opacity: number,
        color: string,
        baseDelay: number
    ) => (
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: SPACING.xl,
                opacity,
            }}
        >
            <div
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.h3,
                    fontWeight: FONTS.weights.bold,
                    color,
                    marginBottom: SPACING.lg,
                    letterSpacing: 1,
                }}
            >
                {side.label}
            </div>
            {side.points.map((point, i) => {
                const pointOpacity = interpolate(
                    frame,
                    [baseDelay + i * 8, baseDelay + i * 8 + 15],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );
                const pointX = interpolate(
                    frame,
                    [baseDelay + i * 8, baseDelay + i * 8 + 15],
                    [15, 0],
                    {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                        easing: Easing.out(Easing.cubic),
                    }
                );

                return (
                    <div
                        key={i}
                        style={{
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.body,
                            color: COLORS.textSecondary,
                            lineHeight: FONTS.lineHeights.relaxed,
                            opacity: pointOpacity,
                            transform: `translateX(${pointX}px)`,
                            marginBottom: SPACING.sm,
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: SPACING.sm,
                        }}
                    >
                        <span
                            style={{
                                color,
                                fontSize: FONTS.sizes.caption,
                                marginTop: 3,
                            }}
                        >
                            ●
                        </span>
                        {point}
                    </div>
                );
            })}
        </div>
    );

    return (
        <AbsoluteFill
            style={{
                padding: LAYOUT.contentPadding,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            {/* Heading */}
            {heading && (
                <div style={{ marginBottom: SPACING.xl, textAlign: 'center' }}>
                    <MaskedTextReveal
                        text={heading}
                        startFrame={0}
                        duration={18}
                        fontSize={FONTS.sizes.h2}
                        fontWeight={FONTS.weights.bold}
                        style={{ textAlign: 'center' }}
                    />
                </div>
            )}

            {/* Comparison */}
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {renderSide(left, leftOpacity, leftColor, 25)}

                {/* Divider */}
                <div
                    style={{
                        width: 2,
                        background: `linear-gradient(180deg, transparent, ${COLORS.accentPrimary}40, transparent)`,
                        height: dividerHeight,
                        alignSelf: 'center',
                        flexShrink: 0,
                    }}
                />

                {renderSide(right, rightOpacity, rightColor, 50)}
            </div>
        </AbsoluteFill>
    );
};
