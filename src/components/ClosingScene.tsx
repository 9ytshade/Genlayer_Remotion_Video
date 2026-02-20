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
import { SocialPill } from './SocialPill';

interface ClosingSceneProps {
    tagline?: string;
    showMochi?: boolean;
    mochiImage?: string;
    logoPath?: string;
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
                    background: `radial-gradient(ellipse, ${COLORS.accentPrimary}15 0%, transparent 70%)`,
                    opacity: glowPulse,
                }}
            />

            {/* Logo */}
            <div
                style={{
                    opacity: logoOpacity,
                    transform: `scale(${logoScale})`,
                    marginBottom: SPACING.lg,
                }}
            >
                <Img
                    src={staticFile(logoPath)}
                    style={{ height: 60, objectFit: 'contain' }}
                />
            </div>

            {/* Tagline */}
            <div
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.h3,
                    fontWeight: FONTS.weights.medium,
                    color: COLORS.textSecondary,
                    opacity: taglineOpacity,
                    transform: `translateY(${taglineY}px)`,
                    textAlign: 'center',
                    letterSpacing: 2,
                    marginBottom: SPACING.xxl,
                }}
            >
                {tagline}
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

            {/* Social links */}
            <div
                style={{
                    display: 'flex',
                    gap: SPACING.xl,
                    opacity: linksOpacity,
                }}
            >
                <SocialPill label="genlayer.com" color="#3B82F6" />
                <SocialPill label="@GenLayer" color="#1DA1F2" />
                <SocialPill label="discord.gg/genlayer" color="#5865F2" />
            </div>
        </AbsoluteFill>
    );
};
