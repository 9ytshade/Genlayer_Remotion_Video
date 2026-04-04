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

export interface TimelineStep {
    label: string;
    title: string;
    description: string;
    color?: string;
    status?: 'done' | 'active' | 'upcoming';
}

interface TimelineSceneProps {
    heading: string;
    steps: TimelineStep[];
    accentColor?: string;
}

/**
 * Horizontal animated timeline scene.
 * Steps reveal left to right with connecting line animation.
 */
export const TimelineScene: React.FC<TimelineSceneProps> = ({
    heading,
    steps,
    accentColor = COLORS.accentPrimary,
}) => {
    const frame = useCurrentFrame();

    // Animate the connecting line progress
    const lineProgress = interpolate(frame, [25, 25 + steps.length * 12], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    return (
        <AbsoluteFill
            style={{
                padding: LAYOUT.contentPadding,
                paddingTop: 80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: SPACING.lg,
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

            {/* Timeline container */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {/* Connecting vertical line background */}
                <div
                    style={{
                        position: 'absolute',
                        left: 22,
                        top: 24,
                        width: 4,
                        borderRadius: 2,
                        height: `calc(${steps.length - 1} * 104px)`,
                        background: `${accentColor}20`,
                    }}
                />
                {/* Animated fill line */}
                <div
                    style={{
                        position: 'absolute',
                        left: 22,
                        top: 24,
                        width: 4,
                        borderRadius: 2,
                        height: `calc(${lineProgress} * ${(steps.length - 1) * 104}px)`,
                        background: `linear-gradient(180deg, ${accentColor}, ${accentColor}80)`,
                        boxShadow: `0 0 12px ${accentColor}`,
                        transition: 'height 0.1s',
                    }}
                />

                {steps.map((step, i) => {
                    const delay = stagger(i, 12) + 20;
                    const opacity = interpolate(
                        frame,
                        [delay, delay + 15],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
                    );
                    const translateX = interpolate(
                        frame,
                        [delay, delay + 15],
                        [-30, 0],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
                    );
                    const stepColor = step.color ?? accentColor;
                    const isActive = step.status === 'active';
                    const isDone = step.status === 'done';

                    return (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: SPACING.xl,
                                opacity,
                                transform: `translateX(${translateX}px)`,
                                marginBottom: i < steps.length - 1 ? SPACING.md : 0,
                                minHeight: 80,
                            }}
                        >
                            {/* Node */}
                            <div style={{ position: 'relative', flexShrink: 0, marginTop: 4 }}>
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: '50%',
                                        background: isDone
                                            ? stepColor
                                            : isActive
                                            ? `radial-gradient(circle, ${stepColor}60, ${stepColor}20)`
                                            : `${stepColor}15`,
                                        border: `3px solid ${stepColor}`,
                                        boxShadow: isActive || isDone ? `0 0 20px ${stepColor}80` : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: FONTS.primary,
                                            fontSize: 18,
                                            fontWeight: FONTS.weights.bold,
                                            color: isDone ? COLORS.bgPrimary : stepColor,
                                        }}
                                    >
                                        {isDone ? '✓' : i + 1}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontFamily: FONTS.primary,
                                        fontSize: 14,
                                        fontWeight: FONTS.weights.bold,
                                        color: stepColor,
                                        textTransform: 'uppercase',
                                        letterSpacing: 3,
                                        marginBottom: 4,
                                    }}
                                >
                                    {step.label}
                                </div>
                                <div
                                    style={{
                                        fontFamily: FONTS.primary,
                                        fontSize: FONTS.sizes.h4,
                                        fontWeight: FONTS.weights.bold,
                                        color: COLORS.textPrimary,
                                        marginBottom: SPACING.sm,
                                    }}
                                >
                                    {step.title}
                                </div>
                                <div
                                    style={{
                                        fontFamily: FONTS.primary,
                                        fontSize: FONTS.sizes.body,
                                        fontWeight: FONTS.weights.regular,
                                        color: COLORS.textSecondary,
                                        lineHeight: 1.5,
                                        maxWidth: 800,
                                    }}
                                >
                                    {step.description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
