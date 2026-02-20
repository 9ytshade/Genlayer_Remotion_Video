import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { SPACING } from '../brand/tokens';
import { SocialPill } from './SocialPill';

interface ThumbnailProps {
    title?: string;
    subtitle?: string;
    episodeNumber?: number;
    showMochi?: boolean;
}

/**
 * Enhanced Cover Art / Thumbnail Generator
 * Layout:
 * - Top: GenLayer Logo (No BG)
 * - Left: PFP + Handle (@9ytshade)
 * - Center: Title + Topic
 * - Right: Mochi
 * - Bottom: Social CTAs
 */
export const Thumbnail: React.FC<ThumbnailProps> = ({
    title = 'What is GenLayer?',
    subtitle,
    episodeNumber,
    showMochi = true,
}) => {
    console.log('Rendering Thumbnail:', title);
    return (
        <AbsoluteFill
            style={{
                backgroundColor: COLORS.bgPrimary,
                overflow: 'hidden',
                fontFamily: FONTS.primary,
            }}
        >
            {/* 1. Background Gradient */}
            <AbsoluteFill
                style={{
                    background: `linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)`,
                }}
            />
            {/* Glows */}
            <div
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '60%',
                    height: '60%',
                    background: `radial-gradient(circle, ${COLORS.accentPrimary}40 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                    opacity: 0.8,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-10%',
                    width: '60%',
                    height: '60%',
                    background: `radial-gradient(circle, ${COLORS.accentSecondary}40 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                    opacity: 0.6,
                }}
            />

            {/* 2. Top Bar: GenLayer Logo */}
            <div
                style={{
                    position: 'absolute',
                    top: SPACING.xl,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Img
                    src={staticFile('assets/logos/Genlayer-noBG.png')}
                    style={{ height: 160, objectFit: 'contain' }}
                />
            </div>

            {/* 3. Main Content Grid */}
            <div
                style={{
                    position: 'absolute',
                    top: 280, // Moved down from 150 to avoid logo overlap
                    bottom: 150,
                    left: SPACING.xl,
                    right: SPACING.xl,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {/* Left: PFP + Handle */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: SPACING.md,
                    }}
                >
                    <div
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            border: `6px solid ${COLORS.accentPrimary}`,
                            overflow: 'hidden',
                            boxShadow: `0 0 40px ${COLORS.accentPrimaryGlow}`,
                        }}
                    >
                        <Img
                            src={staticFile('assets/pfp/9ytshade.png')}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    <div
                        style={{
                            background: 'rgba(0,0,0,0.6)',
                            padding: `${SPACING.xs}px ${SPACING.lg}px`,
                            borderRadius: 20,
                            border: `1px solid ${COLORS.accentPrimary}40`,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 32,
                                fontWeight: FONTS.weights.bold,
                                color: COLORS.textPrimary,
                            }}
                        >
                            @9ytshade
                        </span>
                    </div>
                </div>

                {/* Center: Title */}
                <div
                    style={{
                        flex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: SPACING.md,
                        zIndex: 10,
                    }}
                >
                    {episodeNumber && (
                        <div
                            style={{
                                fontSize: 32,
                                color: COLORS.accentSecondary,
                                fontWeight: FONTS.weights.bold,
                                textTransform: 'uppercase',
                                letterSpacing: 4,
                                marginBottom: SPACING.sm,
                            }}
                        >
                            Episode {String(episodeNumber).padStart(2, '0')}
                        </div>
                    )}
                    <h1
                        style={{
                            margin: 0,
                            fontSize: 120,
                            fontWeight: FONTS.weights.black,
                            color: COLORS.textPrimary,
                            lineHeight: 0.95,
                            textShadow: '0 10px 40px rgba(0,0,0,0.8)',
                            background: `linear-gradient(to bottom right, #fff, ${COLORS.textSecondary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <div
                            style={{
                                fontSize: 36, // Reduced from 48
                                color: COLORS.textSecondary,
                                fontWeight: FONTS.weights.medium,
                                marginTop: SPACING.md,
                                maxWidth: '80%',
                            }}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>

                {/* Right: Mochi */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {showMochi && (
                        <Img
                            src={staticFile('assets/mochi/mochi.png')}
                            style={{
                                width: 450,
                                height: 450,
                                objectFit: 'contain',
                                filter: `drop-shadow(0 0 50px ${COLORS.accentSecondaryGlow})`,
                                transform: 'rotate(-10deg)',
                            }}
                        />
                    )}
                </div>
            </div>

            {/* 4. Bottom Bar: Socials */}
            <div
                style={{
                    position: 'absolute',
                    bottom: SPACING.xl,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: SPACING.xxl,
                    alignItems: 'center',
                }}
            >
                <SocialPill label="genlayer.com" color="#3B82F6" />
                <SocialPill label="@GenLayer" color="#1DA1F2" />
                <SocialPill label="discord.gg/genlayer" color="#5865F2" />
            </div>
        </AbsoluteFill>
    );
};
