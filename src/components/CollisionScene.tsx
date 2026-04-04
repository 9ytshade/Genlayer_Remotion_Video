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
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { SPACING } from '../brand/tokens';

interface SideCardProps {
    emoji: string;
    title: string;
    subtitle: string;
    tags: string[];
    color: string;
    startFrame: number;
    fromLeft: boolean;
}

const SideCard: React.FC<SideCardProps> = ({
    emoji, title, subtitle, tags, color, startFrame, fromLeft,
}) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const translateX = interpolate(frame, [startFrame, startFrame + 20], [fromLeft ? -70 : 70, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const glowPulse = interpolate(
        frame,
        [startFrame + 20, startFrame + 50, startFrame + 80],
        [0.4, 1, 0.4],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin) }
    );

    return (
        <div
            style={{
                flex: 1,
                opacity,
                transform: `translateX(${translateX}px)`,
                background: `linear-gradient(135deg, ${color}18, ${color}06)`,
                border: `2px solid ${color}`,
                borderRadius: 24,
                padding: `${SPACING.xl}px`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: SPACING.lg,
                textAlign: 'center',
                boxShadow: `0 0 ${35 * glowPulse}px ${color}40`,
            }}
        >
            {/* Big emoji */}
            <div style={{ fontSize: 80, lineHeight: 1, filter: `drop-shadow(0 0 ${16 * glowPulse}px ${color})` }}>
                {emoji}
            </div>

            {/* Title */}
            <div>
                <div style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.h3,
                    fontWeight: FONTS.weights.bold,
                    color: COLORS.textPrimary,
                }}>
                    {title}
                </div>
                <div style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.body,
                    color: COLORS.textMuted,
                    marginTop: SPACING.sm,
                    lineHeight: 1.4,
                }}>
                    {subtitle}
                </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: SPACING.sm, justifyContent: 'center' }}>
                {tags.map((tag, i) => (
                    <div
                        key={i}
                        style={{
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.caption,
                            fontWeight: FONTS.weights.medium,
                            color: color,
                            background: `${color}18`,
                            border: `1px solid ${color}40`,
                            borderRadius: 99,
                            padding: `6px 18px`,
                            letterSpacing: 1,
                        }}
                    >
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

/** Collision center — animated ⚡ + ⚡ = GenLayer */
const CollisionCenter: React.FC<{ startFrame: number }> = ({ startFrame }) => {
    const frame = useCurrentFrame();
    // Phase 1: show the +
    const plusOpacity = interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    // Phase 2: show = GenLayer label
    const equalsOpacity = interpolate(frame, [startFrame + 20, startFrame + 35], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const equalsScale = interpolate(frame, [startFrame + 20, startFrame + 35], [0.5, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)),
    });

    // Glow pulse on "= GenLayer"
    const glowPulse = interpolate(
        frame,
        [startFrame + 35, startFrame + 60, startFrame + 85],
        [0.5, 1, 0.5],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin) }
    );

    // Sparks rotation
    const rotation = interpolate(frame, [startFrame, startFrame + 120], [0, 360], {
        extrapolateLeft: 'clamp', extrapolateRight: 'extend',
    });

    return (
        <div
            style={{
                flexShrink: 0,
                width: 160,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: SPACING.md,
            }}
        >
            {/* Plus sign */}
            <div style={{
                opacity: plusOpacity,
                fontFamily: FONTS.primary,
                fontSize: 56,
                fontWeight: 900,
                color: COLORS.textMuted,
                lineHeight: 1,
            }}>
                +
            </div>

            {/* = GenLayer badge */}
            <div
                style={{
                    opacity: equalsOpacity,
                    transform: `scale(${equalsScale})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                }}
            >
                <div style={{
                    fontFamily: FONTS.primary,
                    fontSize: 32,
                    fontWeight: 900,
                    color: COLORS.textMuted,
                }}>
                    =
                </div>

                {/* Spinning spark ring */}
                <div style={{ position: 'relative', width: 80, height: 80 }}>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: `3px solid ${COLORS.accentPrimary}60`,
                        boxShadow: `0 0 ${20 * glowPulse}px ${COLORS.accentPrimary}`,
                    }} />
                    <div style={{
                        position: 'absolute',
                        inset: -6,
                        borderRadius: '50%',
                        border: `2px dashed ${COLORS.accentPrimary}40`,
                        transform: `rotate(${rotation}deg)`,
                    }} />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        filter: `drop-shadow(0 0 ${10 * glowPulse}px ${COLORS.accentPrimary})`,
                    }}>
                        <Img
                            src={staticFile('assets/logos/GenLayer_Logo_White_Cropped.png')}
                            style={{ width: 56, height: 56, objectFit: 'contain' }}
                        />
                    </div>
                </div>

                <div style={{
                    fontFamily: FONTS.primary,
                    fontSize: 20,
                    fontWeight: FONTS.weights.bold,
                    color: COLORS.accentPrimary,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    textShadow: `0 0 ${14 * glowPulse}px ${COLORS.accentPrimary}`,
                }}>
                    GenLayer
                </div>
            </div>
        </div>
    );
};

/** Two Revolutions Collide — AI + Crypto collision visual */
export const CollisionScene: React.FC = () => {
    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '70px 80px',
                gap: SPACING.xl,
            }}
        >
            {/* Heading */}
            <MaskedTextReveal
                text="Two Revolutions Collide"
                startFrame={3}
                duration={16}
                fontSize={FONTS.sizes.h2}
                fontWeight={FONTS.weights.bold}
            />

            {/* Main collision layout */}
            <div
                style={{
                    display: 'flex',
                    gap: SPACING.xl,
                    flex: 1,
                    alignItems: 'center',
                }}
            >
                {/* Left — AI Revolution */}
                <SideCard
                    emoji="🧠"
                    title="AI Revolution"
                    subtitle="The revolution of intelligence. Powerful but needs trust."
                    tags={['LLMs', 'Agents', 'Reasoning', 'Autonomy']}
                    color={COLORS.accentSecondary}
                    startFrame={12}
                    fromLeft
                />

                {/* Center collision */}
                <CollisionCenter startFrame={35} />

                {/* Right — Crypto Revolution */}
                <SideCard
                    emoji="🔗"
                    title="Crypto Revolution"
                    subtitle="The revolution of trust. Trustless but needs intelligence."
                    tags={['Consensus', 'Immutable', 'Permissionless', 'Open']}
                    color={COLORS.accentPrimary}
                    startFrame={22}
                    fromLeft={false}
                />
            </div>
        </AbsoluteFill>
    );
};
