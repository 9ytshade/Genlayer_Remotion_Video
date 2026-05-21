import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    Img,
    staticFile,
    interpolate,
    Easing,
} from 'remotion';
import { TypewriterText } from '../animations/TypewriterText';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { LAYOUT, SPACING } from '../brand/tokens';

interface TitleSceneProps {
    title: string;
    subtitle?: string;
    showLogo?: boolean;
    logoPath?: string;
    coBrandLogoPath?: string;
    logoHeight?: number;
    coBrandLogoHeight?: number;
    episodeNumber?: number;
    accentColor?: string;
    theme?: 'light' | 'dark';
}

/**
 * Opening title card scene.
 * Logo reveal → Title masked reveal → Subtitle fade
 * Duration: 5 seconds (150 frames @ 30fps)
 */
export const TitleScene: React.FC<TitleSceneProps> = ({
    title,
    subtitle,
    showLogo = true,
    logoPath = 'assets/logos/GenLayer_Logo_White_Cropped.png',
    coBrandLogoPath,
    logoHeight = 80,
    coBrandLogoHeight = 80,
    episodeNumber,
    accentColor = COLORS.accentPrimary,
    theme = 'dark',
}) => {
    const frame = useCurrentFrame();

    // Logo animation
    const logoOpacity = interpolate(frame, [10, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const logoScale = interpolate(frame, [10, 30], [0.95, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Subtitle animation
    const subtitleOpacity = interpolate(frame, [70, 90], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const subtitleY = interpolate(frame, [70, 90], [15, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Episode number
    const episodeOpacity = interpolate(frame, [5, 20], [0, 0.6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Decorative line
    const lineWidth = interpolate(frame, [50, 75], [0, 200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
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
                        letterSpacing: 4,
                        textTransform: 'uppercase',
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
                        transform: `scale(${logoScale})`,
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
                            <div style={{ color: theme === 'light' ? '#000' : '#FFF', fontSize: 32, fontWeight: 'bold' }}>✕</div>
                            <Img
                                src={staticFile(coBrandLogoPath)}
                                style={{ height: coBrandLogoHeight, objectFit: 'contain' }}
                            />
                        </>
                    )}
                </div>
            )}

            {/* Title */}
            <TypewriterText
                text={title}
                startFrame={35}
                framesPerChar={1}
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.display,
                    fontWeight: FONTS.weights.black,
                    color: theme === 'light' ? '#000000' : COLORS.textPrimary,
                    textAlign: 'center',
                    maxWidth: 1400,
                }}
            />

            {/* Decorative line */}
            <div
                style={{
                    width: lineWidth,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
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
                        fontWeight: FONTS.weights.regular,
                        color: theme === 'light' ? '#444444' : COLORS.textMuted,
                        opacity: subtitleOpacity,
                        transform: `translateY(${subtitleY}px)`,
                        textAlign: 'center',
                        maxWidth: 900,
                        lineHeight: FONTS.lineHeights.relaxed,
                    }}
                >
                    {subtitle}
                </div>
            )}
        </AbsoluteFill>
    );
};
