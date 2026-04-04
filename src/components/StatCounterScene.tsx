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

export interface Stat {
    value: string;       // e.g. "99.999%", "$2T", "5x"
    label: string;       // e.g. "Uptime Reliability"
    sublabel?: string;   // e.g. "vs 90% for a single node"
    color?: string;
}

interface StatCounterSceneProps {
    heading: string;
    stats: Stat[];
    bodyText?: string;
    accentColor?: string;
}

/**
 * Big animated stat counter scene.
 * Numbers count/reveal from 0 with scale pop and glow effect.
 */
export const StatCounterScene: React.FC<StatCounterSceneProps> = ({
    heading,
    stats,
    bodyText,
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

            {/* Stats row */}
            <div
                style={{
                    display: 'flex',
                    gap: SPACING.xl,
                    justifyContent: stats.length === 1 ? 'center' : 'flex-start',
                    flexWrap: 'wrap',
                }}
            >
                {stats.map((stat, i) => {
                    const delay = stagger(i, 12) + 20;
                    const opacity = interpolate(
                        frame,
                        [delay, delay + 18],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
                    );
                    const scale = interpolate(
                        frame,
                        [delay, delay + 18],
                        [0.6, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.2)) }
                    );
                    // Glow pulse
                    const glowPulse = interpolate(
                        frame,
                        [delay + 18, delay + 38, delay + 58],
                        [1, 1.3, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin) }
                    );
                    const statColor = stat.color ?? accentColor;

                    return (
                        <div
                            key={i}
                            style={{
                                opacity,
                                transform: `scale(${scale})`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: SPACING.sm,
                                flex: 1,
                                minWidth: 280,
                                background: `linear-gradient(135deg, ${statColor}12, ${statColor}04)`,
                                border: `1px solid ${statColor}35`,
                                borderRadius: 20,
                                padding: `${SPACING.xl}px ${SPACING.xxl}px`,
                            }}
                        >
                            {/* Big stat value */}
                            <div
                                style={{
                                    fontFamily: FONTS.primary,
                                    fontSize: stats.length === 1 ? 140 : 96,
                                    fontWeight: 900,
                                    color: statColor,
                                    lineHeight: 1,
                                    textShadow: `0 0 ${40 * glowPulse}px ${statColor}80, 0 0 ${80 * glowPulse}px ${statColor}40`,
                                    letterSpacing: -2,
                                }}
                            >
                                {stat.value}
                            </div>

                            {/* Label */}
                            <div
                                style={{
                                    fontFamily: FONTS.primary,
                                    fontSize: FONTS.sizes.h3,
                                    fontWeight: FONTS.weights.bold,
                                    color: COLORS.textPrimary,
                                }}
                            >
                                {stat.label}
                            </div>

                            {/* Sublabel */}
                            {stat.sublabel && (
                                <div
                                    style={{
                                        fontFamily: FONTS.primary,
                                        fontSize: FONTS.sizes.body,
                                        fontWeight: FONTS.weights.regular,
                                        color: COLORS.textSecondary,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {stat.sublabel}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Optional body text */}
            {bodyText && (() => {
                const bodyOpacity = interpolate(frame, [60, 80], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.cubic),
                });
                return (
                    <div
                        style={{
                            opacity: bodyOpacity,
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.body,
                            fontWeight: FONTS.weights.regular,
                            color: COLORS.textSecondary,
                            lineHeight: 1.6,
                            maxWidth: 900,
                        }}
                    >
                        {bodyText}
                    </div>
                );
            })()}
        </AbsoluteFill>
    );
};
