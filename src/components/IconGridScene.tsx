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
import { stagger } from '../utils/interpolations';

export interface IconGridItem {
    emoji: string;
    label: string;
    sublabel?: string;
    color?: string;
}

interface IconGridSceneProps {
    heading: string;
    items: IconGridItem[];
    columns?: 2 | 3 | 4;
    accentColor?: string;
}

/**
 * Animated emoji/icon grid scene.
 * Items fly in with a stagger from the bottom.
 */
export const IconGridScene: React.FC<IconGridSceneProps> = ({
    heading,
    items,
    columns = 3,
    accentColor = COLORS.accentPrimary,
}) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill
            style={{
                padding: LAYOUT.contentPadding,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: SPACING.xl,
            }}
        >
            {/* Heading */}
            <MaskedTextReveal
                text={heading}
                startFrame={5}
                duration={20}
                fontSize={FONTS.sizes.h2}
                fontWeight={FONTS.weights.bold}
            />

            {/* Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: SPACING.lg,
                }}
            >
                {items.map((item, i) => {
                    const delay = stagger(i, 8) + 20;
                    const opacity = interpolate(
                        frame,
                        [delay, delay + 15],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
                    );
                    const translateY = interpolate(
                        frame,
                        [delay, delay + 15],
                        [40, 0],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
                    );
                    const scale = interpolate(
                        frame,
                        [delay, delay + 15],
                        [0.85, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)) }
                    );
                    const itemColor = item.color ?? accentColor;

                    return (
                        <div
                            key={i}
                            style={{
                                opacity,
                                transform: `translateY(${translateY}px) scale(${scale})`,
                                background: `linear-gradient(135deg, ${itemColor}18, ${itemColor}08)`,
                                border: `1px solid ${itemColor}40`,
                                borderRadius: 16,
                                padding: `${SPACING.lg}px`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: SPACING.sm,
                                textAlign: 'center',
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            {/* Emoji */}
                            <div style={{ fontSize: 52, lineHeight: 1 }}>{item.emoji}</div>

                            {/* Label */}
                            <div
                                style={{
                                    fontFamily: FONTS.primary,
                                    fontSize: FONTS.sizes.body,
                                    fontWeight: FONTS.weights.bold,
                                    color: COLORS.textPrimary,
                                    lineHeight: 1.2,
                                }}
                            >
                                {item.label}
                            </div>

                            {/* Sublabel */}
                            {item.sublabel && (
                                <div
                                    style={{
                                        fontFamily: FONTS.primary,
                                        fontSize: FONTS.sizes.small,
                                        fontWeight: FONTS.weights.regular,
                                        color: COLORS.textSecondary,
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {item.sublabel}
                                </div>
                            )}

                            {/* Accent bar */}
                            <div
                                style={{
                                    width: 36,
                                    height: 3,
                                    borderRadius: 2,
                                    background: itemColor,
                                    boxShadow: `0 0 10px ${itemColor}`,
                                    marginTop: SPACING.xs,
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
