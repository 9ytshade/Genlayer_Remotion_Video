import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
    random,
} from 'remotion';
import { MaskedTextReveal } from '../animations/MaskedTextReveal';
import { TypewriterText } from '../animations/TypewriterText';
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
    theme?: 'light' | 'dark';
    durationInFrames?: number;
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
    theme = 'dark',
    durationInFrames,
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
            <div style={{ textAlign: 'center', width: '100%' }}>
                <MaskedTextReveal
                    text={heading}
                    startFrame={5}
                    duration={20}
                    fontSize={FONTS.sizes.h2}
                    fontWeight={FONTS.weights.bold}
                    color={theme === 'light' ? '#000' : COLORS.textPrimary}
                    style={{ textAlign: 'center' }}
                />
            </div>

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
                    const delay = stagger(i, 24) + 20;
                    
                    const exitDuration = 15;
                    const exitStagger = 6;
                    // Start exiting items in reverse order 25 frames before the end
                    const exitDelay = durationInFrames ? durationInFrames - 25 - exitStagger * (stats.length - 1 - i) : Infinity;

                    // Randomize directions for entry and exit
                    const entryAngle = random(`stat-enter-${heading}-${i}`) * Math.PI * 2;
                    const exitAngle = random(`stat-exit-${heading}-${i}`) * Math.PI * 2;
                    
                    const startX = Math.cos(entryAngle) * 300;
                    const startY = Math.sin(entryAngle) * 300;
                    const endX = Math.cos(exitAngle) * 300;
                    const endY = Math.sin(exitAngle) * 300;

                    const entryOpacity = interpolate(
                        frame,
                        [delay, delay + 18],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
                    );
                    const exitOpacity = interpolate(
                        frame,
                        [exitDelay, exitDelay + exitDuration],
                        [1, 0],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) }
                    );
                    const opacity = Math.min(entryOpacity, exitOpacity);

                    const entryScale = interpolate(
                        frame,
                        [delay, delay + 18],
                        [0.6, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.2)) }
                    );
                    const exitScale = interpolate(
                        frame,
                        [exitDelay, exitDelay + exitDuration],
                        [1, 0.6],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) }
                    );
                    const scale = frame > exitDelay ? exitScale : entryScale;

                    const translateYEntry = interpolate(frame, [delay, delay + 18], [startY, 0], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)
                    });
                    const translateYExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [0, endY], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)
                    });
                    const translateY = frame > exitDelay ? translateYExit : translateYEntry;

                    const translateXEntry = interpolate(frame, [delay, delay + 18], [startX, 0], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)
                    });
                    const translateXExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [0, endX], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)
                    });
                    const translateX = frame > exitDelay ? translateXExit : translateXEntry;

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
                                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
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
                            <TypewriterText
                                text={stat.label}
                                startFrame={delay + 10}
                                framesPerChar={1}
                                style={{
                                    fontFamily: FONTS.primary,
                                    fontSize: FONTS.sizes.h3,
                                    fontWeight: FONTS.weights.bold,
                                    color: theme === 'light' ? '#222' : COLORS.textPrimary,
                                }}
                            />
                            {/* Sublabel */}
                            {stat.sublabel && (
                                <TypewriterText
                                    text={stat.sublabel}
                                    startFrame={delay + 20}
                                    framesPerChar={0.8}
                                    style={{
                                        fontFamily: FONTS.primary,
                                        fontSize: FONTS.sizes.body,
                                        fontWeight: FONTS.weights.regular,
                                        color: theme === 'light' ? '#444' : COLORS.textSecondary,
                                        lineHeight: 1.5,
                                        minHeight: 50, // Reserve space to avoid layout jumps
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Optional body text */}
            {bodyText && (() => {
                const bodyOpacityEntry = interpolate(frame, [60, 80], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.cubic),
                });
                const bodyOpacityExit = durationInFrames ? interpolate(frame, [durationInFrames - 30, durationInFrames - 15], [1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.inOut(Easing.cubic),
                }) : 1;
                const bodyOpacity = Math.min(bodyOpacityEntry, bodyOpacityExit);

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
