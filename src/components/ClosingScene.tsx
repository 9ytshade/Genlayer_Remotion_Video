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
import { SPACING } from '../brand/tokens';
import { TypewriterText } from '../animations/TypewriterText';
import { SocialPill } from './SocialPill';

interface ClosingSceneProps {
    tagline?: string;
    showMochi?: boolean;
    mochiImage?: string;
    logoPath?: string;
    theme?: 'light' | 'dark';
    poweredByLogoPath?: string;
    accentColor?: string;
    socialLinks?: { label: string; url: string }[];
}

/**
 * End card: Logo + tagline + social links + Mochi.
 * Maximum energy, particle field acceleration effect.
 */
export const ClosingScene: React.FC<ClosingSceneProps> = ({
    tagline = 'Trust Infrastructure for the AI Age',
    showMochi = true,
    mochiImage = 'assets/mochi/mochi.png',
    logoPath = 'assets/logos/GenLayer_Logo_White_Cropped.png',
    theme = 'dark',
    poweredByLogoPath,
    accentColor,
    socialLinks = [
        { label: 'Website', url: 'genlayer.com' },
        { label: 'Discord', url: 'discord.gg/genlayer' },
        { label: 'Twitter', url: '@GenLayer' },
        { label: 'Docs', url: 'docs.genlayer.com' },
    ],
}) => {
    const frame = useCurrentFrame();

    // Logo entrance
    const logoOpacity = interpolate(frame, [10, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const logoScale = interpolate(frame, [10, 30], [0.9, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Tagline
    const taglineOpacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const taglineY = interpolate(frame, [30, 50], [20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Social links
    const linksOpacity = interpolate(frame, [60, 80], [0, 0.7], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Mochi
    const mochiOpacity = interpolate(frame, [40, 60], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const mochiFloat = Math.sin(frame * 0.04) * 6;

    // Decorative glow
    const glowPulse = Math.sin(frame * 0.05) * 0.2 + 0.8;

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Central glow */}
            <div
                style={{
                    position: 'absolute',
                    width: 600,
                    height: 300,
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse, ${accentColor || COLORS.accentPrimary}15 0%, transparent 70%)`,
                    opacity: glowPulse,
                }}
            />

            {/* Logo */}
            <div
                style={{
                    opacity: logoOpacity,
                    transform: `scale(${logoScale})`,
                    marginBottom: SPACING.lg,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Img
                    src={staticFile(logoPath)}
                    style={{ height: 180, objectFit: 'contain' }}
                />
                {poweredByLogoPath && (
                    <div style={{ marginTop: SPACING.md, display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
                        <span style={{ fontFamily: FONTS.primary, fontSize: 18, fontWeight: FONTS.weights.bold, color: theme === 'light' ? '#333' : COLORS.textMuted }}>Powered by</span>
                        <Img src={staticFile(poweredByLogoPath)} style={{ height: 48, objectFit: 'contain' }} />
                    </div>
                )}
            </div>

            {/* Tagline */}
            <div
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.h3,
                    fontWeight: FONTS.weights.black, // Bolder for high impact
                    color: theme === 'light' ? '#000' : COLORS.textSecondary,
                    opacity: taglineOpacity,
                    transform: `translateY(${taglineY}px)`,
                    textAlign: 'center',
                    letterSpacing: 2,
                    marginBottom: SPACING.xxl,
                }}
            >
                                    <TypewriterText
                        text={tagline}
                        startFrame={60}
                        framesPerChar={1}
                        style={{
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.h3,
                            fontWeight: FONTS.weights.black,
                            color: theme === 'light' ? '#000' : COLORS.textSecondary,
                            textAlign: 'center',
                            letterSpacing: 2,
                            marginBottom: SPACING.xxl,
                        }}
                    />
            </div>

            {/* Mochi */}
            {showMochi && (
                <div
                    style={{
                        opacity: mochiOpacity,
                        transform: `translateY(${mochiFloat}px)`,
                        marginBottom: SPACING.xl,
                    }}
                >
                    <Img
                        src={staticFile(mochiImage)}
                        style={{
                            width: 160,
                            height: 160,
                            objectFit: 'contain',
                            filter: `drop-shadow(0 0 15px ${COLORS.accentPrimaryGlow})`,
                        }}
                    />
                </div>
            )}

            {/* Social links (Two Rows) */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: SPACING.lg,
                    opacity: linksOpacity,
                }}
            >
                {/* Row 1: GenLayer */}
                <div style={{ display: 'flex', gap: SPACING.xl }}>
                    <SocialPill label="genlayer.com" color="#3B82F6" theme={theme} typewriter />
                    <SocialPill label="@GenLayer" color="#1DA1F2" theme={theme} typewriter />
                    <SocialPill label="discord.gg/genlayer" color="#5865F2" theme={theme} typewriter />
                </div>
            </div>
        </AbsoluteFill>
    );
};
