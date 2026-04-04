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
import { SignalWave } from '../animations/SignalWave';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { SPACING } from '../brand/tokens';

interface ConceptRevealProps {
    term: string;
    subtitle?: string;
    accentColor?: string;
    signalFrame?: number;
    pills?: string[];
    logoSrc?: string;
    logoCount?: number;
}

/**
 * Full-screen key concept moment with signal wave activation.
 * Centered term with dramatic glow, signal wave sweep, and subtitle.
 */
export const ConceptReveal: React.FC<ConceptRevealProps> = ({
    term,
    subtitle,
    accentColor = COLORS.accentPrimary,
    signalFrame = 15,
    pills,
    logoSrc,
    logoCount = 0,
}) => {
    const frame = useCurrentFrame();

    // Glow expansion
    const glowSize = interpolate(frame, [10, 60], [0, 120], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const glowOpacity = interpolate(frame, [10, 30, 80], [0, 0.4, 0.2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Subtitle
    const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const subtitleY = interpolate(frame, [50, 70], [20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Horizontal decorative lines
    const lineWidth = interpolate(frame, [25, 50], [0, 300], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const shouldShowLogos = !!logoSrc && logoCount > 0;

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
                    width: glowSize * 6,
                    height: glowSize * 3,
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse, ${accentColor}30 0%, transparent 70%)`,
                    opacity: glowOpacity,
                }}
            />

            {/* Signal wave */}
            <SignalWave triggerFrame={signalFrame} color={accentColor} />

            {/* Orbiting logos */}
            {shouldShowLogos &&
                Array.from({ length: logoCount }).map((_, i) => {
                    const appearStart = 20 + i * 5;
                    const appearEnd = appearStart + 15;

                    const logoOpacity = interpolate(
                        frame,
                        [appearStart, appearEnd],
                        [0, 1],
                        {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                            easing: Easing.out(Easing.cubic),
                        }
                    );

                    const orbitProgress = (frame + i * 15) * 0.03;
                    const radiusX = 260;
                    const radiusY = 140;

                    const x = Math.cos(orbitProgress) * radiusX;
                    const y = Math.sin(orbitProgress * 1.3) * radiusY;

                    const floatY = Math.sin((frame + i * 10) * 0.06) * 10;

                    const rotation = interpolate(
                        frame,
                        [0, 200],
                        [0, 360],
                        {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'extend',
                        }
                    );

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: 72,
                                height: 72,
                                marginTop: -36,
                                marginLeft: -36,
                                transform: `translate(${x}px, ${y + floatY}px) rotate(${rotation}deg)`,
                                opacity: logoOpacity,
                                pointerEvents: 'none',
                                filter: `drop-shadow(0 0 20px ${accentColor}80)`,
                            }}
                        >
                            <Img
                                src={staticFile(logoSrc)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                    );
                })}

            {/* Main term */}
            <MaskedTextReveal
                text={term}
                startFrame={8}
                duration={22}
                fontSize={FONTS.sizes.display + 8}
                fontWeight={FONTS.weights.black}
                color={accentColor}
                style={{ textAlign: 'center' }}
            />

            {/* Decorative lines */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING.md,
                    marginTop: SPACING.lg,
                    marginBottom: SPACING.lg,
                }}
            >
                <div
                    style={{
                        width: lineWidth,
                        height: 1,
                        background: `linear-gradient(90deg, transparent, ${accentColor}60)`,
                    }}
                />
                <div
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: accentColor,
                        opacity: interpolate(frame, [30, 45], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        }),
                        boxShadow: `0 0 12px ${accentColor}`,
                    }}
                />
                <div
                    style={{
                        width: lineWidth,
                        height: 1,
                        background: `linear-gradient(90deg, ${accentColor}60, transparent)`,
                    }}
                />
            </div>

            {/* Subtitle or Pills */}
            {(subtitle || pills) && (
                <div
                    style={{
                        marginTop: SPACING.lg,
                        opacity: subtitleOpacity,
                        transform: `translateY(${subtitleY}px)`,
                    }}
                >
                    {pills ? (
                        <div style={{ display: 'flex', gap: SPACING.md, justifyContent: 'center' }}>
                            {pills.map((pill, i) => (
                                <div
                                    key={i}
                                    style={{
                                        backgroundColor: accentColor, // Use accent color background
                                        color: COLORS.bgPrimary, // Contrast text
                                        padding: `${SPACING.sm}px ${SPACING.lg}px`,
                                        borderRadius: 999, // Pill shape
                                        fontSize: FONTS.sizes.h3,
                                        fontWeight: FONTS.weights.bold,
                                        boxShadow: `0 0 20px ${accentColor}`,
                                    }}
                                >
                                    {pill}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                fontFamily: FONTS.primary,
                                fontSize: FONTS.sizes.h3,
                                fontWeight: FONTS.weights.regular,
                                color: COLORS.textSecondary,
                                textAlign: 'center',
                                maxWidth: 1000,
                                lineHeight: FONTS.lineHeights.relaxed,
                            }}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
            )}
        </AbsoluteFill>
    );
};
