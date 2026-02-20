import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    Img,
    staticFile,
    interpolate,
    Easing,
} from 'remotion';
import { MaskedTextReveal } from '../animations/MaskedTextReveal';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { LAYOUT, SPACING } from '../brand/tokens';

interface TitleSceneProps {
    title: string;
    subtitle?: string;
    showLogo?: boolean;
    logoPath?: string;
    episodeNumber?: number;
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
    episodeNumber,
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
                        color: COLORS.accentPrimary,
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
                    }}
                >
                    <Img
                        src={staticFile(logoPath)}
                        style={{ height: 50, objectFit: 'contain' }}
                    />
                </div>
            )}

            {/* Title */}
            <MaskedTextReveal
                text={title}
                startFrame={35}
                duration={25}
                fontSize={FONTS.sizes.display}
                fontWeight={FONTS.weights.black}
                style={{ textAlign: 'center', maxWidth: 1400 }}
            />

            {/* Decorative line */}
            <div
                style={{
                    width: lineWidth,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${COLORS.accentPrimary}, transparent)`,
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
                        color: COLORS.textMuted,
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
