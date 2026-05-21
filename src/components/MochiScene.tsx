import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    Img,
    staticFile,
    interpolate,
    Easing,
} from 'remotion';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { LAYOUT, SPACING } from '../brand/tokens';
import { TypewriterText } from '../animations/TypewriterText';

interface MochiSceneProps {
    message: string;
    position?: 'left' | 'right' | 'center';
    mochiImage?: string;
    showBubble?: boolean;
    theme?: 'light' | 'dark';
}

/**
 * Mochi mascot integration scene.
 * Mochi slides in from edge with subtle bounce. Optional speech bubble.
 */
export const MochiScene: React.FC<MochiSceneProps> = ({
    message,
    position = 'right',
    mochiImage = 'assets/mochi/mochi.png',
    showBubble = true,
    theme = 'dark',
}) => {
    const frame = useCurrentFrame();

    // Mochi entrance
    const enterFrom = position === 'left' ? -300 : position === 'right' ? 300 : 0;
    const mochiX = interpolate(frame, [5, 30], [enterFrom, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.back(1.3)),
    });

    const mochiOpacity = interpolate(frame, [5, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Subtle floating
    const floatY = Math.sin(frame * 0.04) * 8;

    // Speech bubble
    const bubbleOpacity = interpolate(frame, [30, 45], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const bubbleScale = interpolate(frame, [30, 45], [0.9, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.back(1.5)),
    });

    const isCenter = position === 'center';

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: isCenter ? 'center' : 'flex-end',
                flexDirection: isCenter ? 'column' : 'row',
                padding: LAYOUT.contentPadding,
                gap: SPACING.xxl,
            }}
        >
            {/* Text/Bubble area */}
            {showBubble && (
                <div
                    style={{
                        flex: isCenter ? undefined : 1,
                        display: 'flex',
                        justifyContent: position === 'right' ? 'flex-end' : 'flex-start',
                        alignItems: 'center',
                        opacity: bubbleOpacity,
                        transform: `scale(${bubbleScale})`,
                        order: position === 'left' ? 2 : 0,
                    }}
                >
                    <div
                        style={{
                            background: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(20, 20, 25, 0.95)',
                            border: `1px solid ${COLORS.accentPrimary}40`,
                            borderRadius: '24px 24px 4px 24px', // Chat bubble shape
                            padding: 0,
                            maxWidth: 700,
                            boxShadow: theme === 'light' ? `0 10px 40px ${COLORS.accentPrimary}30` : `0 10px 40px ${COLORS.accentPrimaryGlow}`,
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                        }}
                    >
                        {/* Bubble Header */}
                        <div
                            style={{
                                padding: `${SPACING.sm}px ${SPACING.lg}px`,
                                borderBottom: `1px solid ${COLORS.accentPrimary}20`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: SPACING.sm,
                            }}
                        >
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.accentSecondary }} />
                            <span
                                style={{
                                    fontFamily: FONTS.primary,
                                    fontSize: FONTS.sizes.small,
                                    fontWeight: FONTS.weights.bold,
                                    color: COLORS.accentSecondary,
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                }}
                            >
                                MOCHI AI
                            </span>
                        </div>

                        {/* Bubble Body */}
                        <div
                            style={{
                                padding: `${SPACING.lg}px ${SPACING.xl}px`,
                                fontFamily: FONTS.primary,
                                fontSize: FONTS.sizes.h4,
                                fontWeight: FONTS.weights.medium,
                                color: theme === 'light' ? '#000' : COLORS.textPrimary,
                                lineHeight: FONTS.lineHeights.relaxed,
                            }}
                        >
                            <TypewriterText
                                text={message}
                                startFrame={40}
                                framesPerChar={1}
                                style={{
                                    fontFamily: FONTS.primary,
                                    fontSize: FONTS.sizes.h4,
                                    fontWeight: FONTS.weights.medium,
                                    color: theme === 'light' ? '#000' : COLORS.textPrimary,
                                    lineHeight: FONTS.lineHeights.relaxed,
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Mochi */}
            <div
                style={{
                    opacity: mochiOpacity,
                    transform: `translateX(${mochiX}px) translateY(${floatY}px)`,
                    flexShrink: 0,
                    order: position === 'left' ? 0 : 2,
                }}
            >
                <Img
                    src={staticFile(mochiImage)}
                    style={{
                        width: 280,
                        height: 280,
                        objectFit: 'contain',
                        filter: `drop-shadow(0 0 20px ${COLORS.accentPrimaryGlow})`,
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
