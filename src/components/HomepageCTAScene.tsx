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

interface HomepageCTASceneProps {
    theme?: 'light' | 'dark';
    accentColor?: string;
}

/**
 * Final CTA scene with Homepage mockup and social pills.
 */
export const HomepageCTAScene: React.FC<HomepageCTASceneProps> = ({
    theme = 'dark',
    accentColor = '#00E5FF', // Electric Cyan
}) => {
    const frame = useCurrentFrame();

    // Homepage mockup entrance
    const homepageOpacity = interpolate(frame, [10, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const homepageScale = interpolate(frame, [10, 30], [0.85, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.back(1.2)),
    });

    const homepageY = interpolate(frame, [10, 30], [50, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    // Pills entrance
    const pillsOpacity = interpolate(frame, [35, 55], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const pillsY = interpolate(frame, [35, 55], [20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: SPACING.xxl,
                background: theme === 'light' ? '#FFF' : COLORS.bgPrimary,
            }}
        >
            {/* Background Glow */}
            <div
                style={{
                    position: 'absolute',
                    width: 1200,
                    height: 600,
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse, ${accentColor}15 0%, transparent 70%)`,
                    opacity: interpolate(frame, [0, 60], [0, 0.8], { extrapolateLeft: 'clamp' }),
                }}
            />

            {/* Homepage Mockup */}
            <div
                style={{
                    width: '85%',
                    height: '65%',
                    opacity: homepageOpacity,
                    transform: `scale(${homepageScale}) translateY(${homepageY}px)`,
                    boxShadow: `0 30px 100px ${accentColor}25`,
                    borderRadius: 24,
                    overflow: 'hidden',
                    border: `1px solid ${accentColor}40`,
                    background: '#111',
                    marginBottom: SPACING.xxl,
                    zIndex: 1,
                }}
            >
                <Img
                    src={staticFile('assets/internet_court/HOMEPAGE.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                    }}
                />
            </div>

            {/* CTA Pills */}
            <div
                style={{
                    display: 'flex',
                    gap: SPACING.xl,
                    opacity: pillsOpacity,
                    transform: `translateY(${pillsY}px)`,
                    zIndex: 2,
                }}
            >
                <SocialPill label="internetcourt.com" color="#00E5FF" theme={theme} />
            </div>

            {/* Powered by branding */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 40,
                    opacity: interpolate(frame, [60, 80], [0, 0.6], { extrapolateLeft: 'clamp' }),
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                }}
            >
                <span style={{ fontFamily: FONTS.primary, fontSize: 18, fontWeight: FONTS.weights.bold, color: theme === 'light' ? '#333' : COLORS.textMuted }}>Powered by</span>
                <Img
                    src={staticFile('assets/logos/GenLayer_Logo_Black_Cropped.png')}
                    style={{ height: 50, filter: theme === 'light' ? 'none' : 'invert(1)' }}
                />
            </div>
        </AbsoluteFill>
    );
};
