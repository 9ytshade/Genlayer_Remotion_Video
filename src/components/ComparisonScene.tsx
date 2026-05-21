import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
    Img,
    staticFile,
} from 'remotion';
import { MaskedTextReveal } from '../animations/MaskedTextReveal';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { LAYOUT, SPACING } from '../brand/tokens';

interface ComparisonSide {
    label: string;
    points: string[];
    color?: string;
    icon?: string; // Icon for the points (optional)
    headerIcon?: string; // Icon for the header (optional)
    headerLogoPath?: string; // Logo image for the header (optional)
}

interface ComparisonSceneProps {
    heading?: string;
    left: ComparisonSide;
    right: ComparisonSide;
    theme?: 'light' | 'dark';
}

const ComparisonCard: React.FC<{
    side: ComparisonSide;
    color: string;
    isRight: boolean;
    startFrame: number;
    pointDelay: number;
    theme?: 'light' | 'dark';
}> = ({ side, color, isRight, startFrame, pointDelay, theme = 'dark' }) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const translateX = interpolate(frame, [startFrame, startFrame + 18], [isRight ? 60 : -60, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const glowPulse = isRight
        ? interpolate(frame, [startFrame + 20, startFrame + 50, startFrame + 80], [0.4, 1, 0.4], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin),
          })
        : 0;

    const bulletIcon = isRight ? '✓' : '✕';
    const bulletColor = isRight ? color : `${COLORS.textMuted}80`;

    return (
        <div
            style={{
                flex: 1,
                opacity,
                transform: `translateX(${translateX}px)`,
                display: 'flex',
                flexDirection: 'column',
                border: `2px solid ${color}${isRight ? '' : '50'}`,
                borderRadius: 20,
                overflow: 'hidden',
                background: isRight
                    ? `linear-gradient(135deg, ${color}15, ${color}05)`
                    : (theme === 'light' ? 'linear-gradient(135deg, #F9FAFB, #F3F4F6)' : 'linear-gradient(135deg, #0d0d0d, #111118)'),
                boxShadow: isRight ? `0 0 ${35 * glowPulse}px ${color}40` : 'none',
            }}
        >
            {/* Card header bar */}
            <div
                style={{
                    padding: `${SPACING.lg}px ${SPACING.xl}px`,
                    background: isRight ? `${color}25` : `${COLORS.textMuted}12`,
                    borderBottom: `1px solid ${color}${isRight ? '50' : '25'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING.md,
                }}
            >
                <div
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: isRight ? color : `${COLORS.textMuted}60`,
                        boxShadow: isRight ? `0 0 8px ${color}` : 'none',
                    }}
                />
                <div
                    style={{
                        fontFamily: FONTS.primary,
                        fontSize: FONTS.sizes.h4,
                        fontWeight: FONTS.weights.bold,
                        color: isRight ? color : (theme === 'light' ? '#777' : COLORS.textMuted),
                        letterSpacing: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', // Center visuals
                        gap: SPACING.sm,
                        width: '100%',
                    }}
                >
                    {side.headerLogoPath ? (
                        <Img 
                            src={staticFile(side.headerLogoPath)} 
                            style={{ 
                                height: 70, 
                                width: 'auto',
                                opacity: 1,
                                objectFit: 'contain'
                            }} 
                        />
                    ) : (
                        <>
                            {side.headerIcon && <span style={{ fontSize: 60 }}>{side.headerIcon}</span>}
                            {side.label && <span>{side.label}</span>}
                        </>
                    )}
                </div>
            </div>

            {/* Points */}
            <div style={{ padding: `${SPACING.xl}px`, display: 'flex', flexDirection: 'column', gap: SPACING.md, flex: 1, justifyContent: 'center' }}>
                {side.points.map((point, i) => {
                    const pd = pointDelay + i * 8;
                    const pOpacity = interpolate(frame, [pd, pd + 12], [0, 1], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                    });
                    const pX = interpolate(frame, [pd, pd + 12], [isRight ? 16 : -16, 0], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
                    });

                    return (
                        <div
                            key={i}
                            style={{
                                opacity: pOpacity,
                                transform: `translateX(${pX}px)`,
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: SPACING.md,
                                padding: `${SPACING.sm}px ${SPACING.md}px`,
                                borderRadius: 10,
                                background: isRight ? `${color}08` : 'transparent',
                                border: isRight ? `1px solid ${color}20` : '1px solid transparent',
                            }}
                        >
                            <span
                                style={{
                                    color: bulletColor,
                                    fontFamily: FONTS.primary,
                                    fontSize: FONTS.sizes.body,
                                    fontWeight: FONTS.weights.bold,
                                    flexShrink: 0,
                                    lineHeight: 1.6,
                                }}
                            >
                                {bulletIcon}
                            </span>
                            <div
                                style={{
                                    fontFamily: FONTS.primary,
                                    fontSize: FONTS.sizes.body,
                                    color: isRight ? (theme === 'light' ? '#000' : COLORS.textPrimary) : (theme === 'light' ? '#444' : COLORS.textMuted),
                                    lineHeight: 1.5,
                                }}
                            >
                                {point}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const ComparisonScene: React.FC<ComparisonSceneProps> = ({ heading, left, right, theme = 'dark' }) => {
    const frame = useCurrentFrame();
    const leftColor = left.color || COLORS.textMuted;
    const rightColor = right.color || COLORS.accentPrimary;

    // VS badge
    const vsOpacity = interpolate(frame, [28, 40], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)),
    });
    const vsScale = interpolate(frame, [28, 40], [0.5, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)),
    });

    return (
        <AbsoluteFill
            style={{
                padding: LAYOUT.contentPadding,
                paddingTop: 80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: SPACING.xl,
            }}
        >
            {heading && (
                <div style={{ textAlign: 'center' }}>
                    <MaskedTextReveal
                        text={heading}
                        startFrame={0}
                        duration={18}
                        fontSize={FONTS.sizes.h2}
                        fontWeight={FONTS.weights.bold}
                        color={theme === 'light' ? '#000' : COLORS.textPrimary}
                        style={{ textAlign: 'center' }}
                    />
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, flex: 1 }}>
                <ComparisonCard side={left} color={leftColor} isRight={false} startFrame={10} pointDelay={28} theme={theme} />

                {/* VS Center Badge */}
                <div
                    style={{
                        opacity: vsOpacity,
                        transform: `scale(${vsScale})`,
                        flexShrink: 0,
                        width: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${leftColor}30, ${rightColor}30)`,
                            border: `2px solid ${rightColor}60`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: FONTS.primary,
                            fontSize: 22,
                            fontWeight: 900,
                            color: theme === 'light' ? '#000' : COLORS.textPrimary,
                            letterSpacing: -1,
                        }}
                    >
                        VS
                    </div>
                </div>

                <ComparisonCard side={right} color={rightColor} isRight startFrame={22} pointDelay={45} theme={theme} />
            </div>
        </AbsoluteFill>
    );
};
