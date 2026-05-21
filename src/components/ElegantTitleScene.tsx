import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    Img,
    staticFile,
    interpolate,
    Easing,
} from 'remotion';
import { ElegantTextReveal } from '../animations/ElegantTextReveal';
import { TypewriterText } from '../animations/TypewriterText';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { LAYOUT, SPACING } from '../brand/tokens';

interface ElegantTitleSceneProps {
    title: string;
    subtitle?: string;
    showLogo?: boolean;
    logoPath?: string;
    coBrandLogoPath?: string;
    logoHeight?: number;
    coBrandLogoHeight?: number;
    episodeNumber?: number;
    accentColor?: string;
    useTypewriter?: boolean;
    typewriterFramesPerChar?: number;
    typewriterStartFrame?: number;
    titleFontWeight?: number;
}

/**
 * Elegant opening title card scene.
 * Logo gentle fade → Title blurred elegant reveal → Subtitle fade
 */
export const ElegantTitleScene: React.FC<ElegantTitleSceneProps> = ({
    title,
    subtitle,
    showLogo = true,
    logoPath = 'assets/logos/GenLayer_Logo_White_Cropped.png',
    coBrandLogoPath,
    logoHeight = 80,
    coBrandLogoHeight = 80,
    episodeNumber,
    accentColor = COLORS.accentPrimary,
    useTypewriter = true,
    typewriterFramesPerChar = 1,
    typewriterStartFrame = 40,
    titleFontWeight = FONTS.weights.black,
}) => {
    const frame = useCurrentFrame();

    // Elegant Logo animation (slower, softer)
    const logoOpacity = interpolate(frame, [15, 45], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const logoY = interpolate(frame, [15, 45], [10, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Elegant Subtitle animation
    const subtitleOpacity = interpolate(frame, [80, 110], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.cubic),
    });

    // Episode number
    const episodeOpacity = interpolate(frame, [5, 30], [0, 0.5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Elegant glowing line
    const lineWidth = interpolate(frame, [60, 90], [0, 250], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.cubic),
    });
    
    const lineOpacity = interpolate(frame, [60, 90], [0, 0.8], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: LAYOUT.contentPadding,
            }}
        >
            {/* Episode number */}
            {episodeNumber && (
                <div
                    style={{
                        position: 'absolute',
                        top: LAYOUT.safeZone.top,
                        left: LAYOUT.safeZone.left,
                        fontFamily: FONTS.primary,
                        fontSize: FONTS.sizes.label,
                        fontWeight: FONTS.weights.medium,
                        color: accentColor,
                        opacity: episodeOpacity,
                        letterSpacing: 6,
                        textTransform: 'uppercase',
                        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))',
                    }}
                >
                    Episode {String(episodeNumber).padStart(2, '0')}
                </div>
            )}

            {/* Logo */}
            {showLogo && (
                <div
                    style={{
                        marginBottom: SPACING.xl,
                        opacity: logoOpacity,
                        transform: `translateY(${logoY}px)`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: SPACING.xl,
                    }}
                >
                    <Img
                        src={staticFile(logoPath)}
                        style={{ height: logoHeight, objectFit: 'contain' }}
                    />
                    {coBrandLogoPath && (
                        <>
                            <div style={{ color: '#FFF', fontSize: 32, fontWeight: '100', opacity: 0.5 }}>✕</div>
                            <Img
                                src={staticFile(coBrandLogoPath)}
                                style={{ height: coBrandLogoHeight, objectFit: 'contain' }}
                            />
                        </>
                    )}
                </div>
            )}

            {/* Title */}
            {useTypewriter ? (
                <TypewriterText
                    text={title}
                    startFrame={typewriterStartFrame}
                    framesPerChar={typewriterFramesPerChar}
                    style={{
                        fontSize: FONTS.sizes.display,
                        fontFamily: FONTS.primary,
                        fontWeight: titleFontWeight,
                        color: COLORS.textPrimary,
                        textAlign: 'center',
                        maxWidth: 1400,
                    }}
                />
            ) : (
                <ElegantTextReveal
                    text={title}
                    startFrame={40}
                    duration={40}
                    fontSize={FONTS.sizes.display}
                    fontWeight={titleFontWeight}
                    color={COLORS.textPrimary}
                    letterSpacingStart={-2}
                    letterSpacingEnd={2}
                    style={{ textAlign: 'center', maxWidth: 1400 }}
                />
            )}

            {/* Decorative soft glowing line */}
            <div
                style={{
                    width: lineWidth,
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                    opacity: lineOpacity,
                    boxShadow: `0 0 10px ${accentColor}`,
                    marginTop: SPACING.lg,
                    marginBottom: SPACING.lg,
                }}
            />

            {/* Subtitle */}
            {subtitle && (
                <div
                    style={{
                        fontFamily: FONTS.primary,
                        fontSize: FONTS.sizes.h4,
                        fontWeight: FONTS.weights.light,
                        color: COLORS.textMuted,
                        opacity: subtitleOpacity,
                        textAlign: 'center',
                        maxWidth: 900,
                        lineHeight: FONTS.lineHeights.relaxed,
                        letterSpacing: 1,
                    }}
                >
                    {subtitle}
                </div>
            )}
        </AbsoluteFill>
    );
};
