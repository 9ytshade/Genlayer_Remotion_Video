import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
} from 'remotion';
import { MaskedTextReveal } from '../animations/MaskedTextReveal';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { SPACING } from '../brand/tokens';

/** Pulsing animated arrow between the two panels */
const BridgeArrow: React.FC<{ startFrame: number }> = ({ startFrame }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Pulse glow
    const glow = interpolate(
        frame,
        [startFrame + 15, startFrame + 35, startFrame + 55],
        [0.4, 1, 0.4],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin) }
    );
    // Slide animation for the arrow dots
    const dotOffset = interpolate(
        frame,
        [startFrame + 15, startFrame + 55],
        [0, 40],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    ) % 40;

    return (
        <div
            style={{
                opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: SPACING.md,
                flexShrink: 0,
                width: 120,
            }}
        >
            {/* Label */}
            <div
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.caption,
                    fontWeight: FONTS.weights.bold,
                    color: COLORS.accentPrimary,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    textAlign: 'center',
                    lineHeight: 1.3,
                }}
            >
                The Gap
            </div>

            {/* Animated dashed line */}
            <div style={{ position: 'relative', width: 80, height: 6, overflow: 'hidden', borderRadius: 3 }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: -dotOffset,
                        height: '100%',
                        width: 200,
                        background: `repeating-linear-gradient(
                            90deg,
                            ${COLORS.accentPrimary} 0px,
                            ${COLORS.accentPrimary} 12px,
                            transparent 12px,
                            transparent 20px
                        )`,
                        opacity: glow,
                        boxShadow: `0 0 ${12 * glow}px ${COLORS.accentPrimary}`,
                    }}
                />
            </div>

            {/* Arrow head */}
            <div
                style={{
                    width: 0,
                    height: 0,
                    borderTop: '12px solid transparent',
                    borderBottom: '12px solid transparent',
                    borderLeft: `20px solid ${COLORS.accentPrimary}`,
                    filter: `drop-shadow(0 0 ${8 * glow}px ${COLORS.accentPrimary})`,
                    opacity: glow,
                }}
            />

            <div
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.caption,
                    fontWeight: FONTS.weights.regular,
                    color: COLORS.textMuted,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    textAlign: 'center',
                    lineHeight: 1.3,
                }}
            >
                Bridge?
            </div>
        </div>
    );
};

/** Left panel — anonymous wallet */
const WalletCard: React.FC<{ startFrame: number }> = ({ startFrame }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const translateX = interpolate(frame, [startFrame, startFrame + 20], [-60, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });

    const rows = [
        { label: 'Address', value: '0x7f3a…1b2c', mono: true },
        { label: 'Name', value: '????' },
        { label: 'Social', value: 'None' },
        { label: 'History', value: 'Unknown' },
        { label: 'Reputation', value: '0' },
    ];

    return (
        <div
            style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                flex: 1,
                background: 'linear-gradient(135deg, #111118, #0d0d14)',
                border: `2px solid ${COLORS.textMuted}30`,
                borderRadius: 24,
                padding: `${SPACING.xl}px`,
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING.lg,
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        background: `${COLORS.textMuted}20`,
                        border: `2px dashed ${COLORS.textMuted}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 32,
                        flexShrink: 0,
                    }}
                >
                    ?
                </div>
                <div>
                    <div
                        style={{
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.small,
                            fontWeight: FONTS.weights.bold,
                            color: COLORS.textMuted,
                            letterSpacing: 3,
                            textTransform: 'uppercase',
                        }}
                    >
                        Anonymous
                    </div>
                    <div
                        style={{
                            fontFamily: 'monospace',
                            fontSize: FONTS.sizes.caption,
                            color: `${COLORS.textMuted}80`,
                            marginTop: 4,
                        }}
                    >
                        Wallet Only
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: `${COLORS.textMuted}20` }} />

            {/* Rows */}
            {rows.map((row, i) => {
                const rowDelay = startFrame + 20 + i * 6;
                const rowOpacity = interpolate(frame, [rowDelay, rowDelay + 10], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                });
                return (
                    <div
                        key={i}
                        style={{
                            opacity: rowOpacity,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: FONTS.primary,
                                fontSize: FONTS.sizes.caption,
                                color: COLORS.textMuted,
                                fontWeight: FONTS.weights.regular,
                            }}
                        >
                            {row.label}
                        </div>
                        <div
                            style={{
                                fontFamily: row.mono ? 'monospace' : FONTS.primary,
                                fontSize: row.mono ? 14 : FONTS.sizes.caption,
                                color: row.value === '????' || row.value === 'None' || row.value === 'Unknown' || row.value === '0'
                                    ? `${COLORS.textMuted}60`
                                    : COLORS.textMuted,
                                fontWeight: FONTS.weights.bold,
                            }}
                        >
                            {row.value}
                        </div>
                    </div>
                );
            })}

            {/* Footer label */}
            <div
                style={{
                    marginTop: 'auto',
                    background: `${COLORS.textMuted}15`,
                    borderRadius: 12,
                    padding: `${SPACING.sm}px ${SPACING.md}px`,
                    textAlign: 'center',
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.caption,
                    color: `${COLORS.textMuted}80`,
                    fontWeight: FONTS.weights.medium,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                }}
            >
                Who are you in crypto?
            </div>
        </div>
    );
};

/** Right panel — rich verified identity */
const IdentityCard: React.FC<{ startFrame: number }> = ({ startFrame }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const translateX = interpolate(frame, [startFrame, startFrame + 20], [60, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    // Glow pulse on the card border
    const borderGlow = interpolate(
        frame,
        [startFrame + 20, startFrame + 50, startFrame + 80],
        [0.4, 1, 0.4],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin) }
    );

    const socials = [
        { emoji: '𝕏', handle: '@alex_builds', color: COLORS.textPrimary },
        { emoji: '💻', handle: 'github/alexbuilds', color: COLORS.accentTertiary },
        { emoji: '💼', handle: 'LinkedIn · 4 yrs exp', color: COLORS.accentSecondary },
    ];

    const rows = [
        { label: 'Wallet', value: '0x7f3a…1b2c', mono: true },
        { label: 'Account Age', value: '4 years' },
        { label: 'Reputation', value: '⭐ 847 pts' },
    ];

    return (
        <div
            style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                flex: 1,
                background: `linear-gradient(135deg, ${COLORS.accentPrimary}15, ${COLORS.accentSecondary}08)`,
                border: `2px solid ${COLORS.accentPrimary}`,
                borderRadius: 24,
                padding: `${SPACING.xl}px`,
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING.lg,
                boxShadow: `0 0 ${40 * borderGlow}px ${COLORS.accentPrimary}40, inset 0 0 ${20 * borderGlow}px ${COLORS.accentPrimary}08`,
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${COLORS.accentPrimary}, ${COLORS.accentSecondary})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 36,
                        flexShrink: 0,
                        boxShadow: `0 0 20px ${COLORS.accentPrimary}60`,
                    }}
                >
                    👨‍💻
                </div>
                <div>
                    <div
                        style={{
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.small,
                            fontWeight: FONTS.weights.bold,
                            color: COLORS.textPrimary,
                        }}
                    >
                        Alex.eth
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            marginTop: 4,
                        }}
                    >
                        <div
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                background: COLORS.accentTertiary,
                                boxShadow: `0 0 8px ${COLORS.accentTertiary}`,
                            }}
                        />
                        <div
                            style={{
                                fontFamily: FONTS.primary,
                                fontSize: FONTS.sizes.caption,
                                color: COLORS.accentTertiary,
                                fontWeight: FONTS.weights.medium,
                            }}
                        >
                            Verified Identity
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div
                style={{
                    height: 1,
                    background: `linear-gradient(90deg, ${COLORS.accentPrimary}60, transparent)`,
                }}
            />

            {/* Social handles */}
            {socials.map((s, i) => {
                const delay = startFrame + 20 + i * 8;
                const sOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                });
                return (
                    <div
                        key={i}
                        style={{
                            opacity: sOpacity,
                            display: 'flex',
                            alignItems: 'center',
                            gap: SPACING.md,
                        }}
                    >
                        <div style={{ fontSize: 22, width: 30, textAlign: 'center' }}>{s.emoji}</div>
                        <div
                            style={{
                                fontFamily: FONTS.primary,
                                fontSize: FONTS.sizes.caption,
                                color: s.color,
                                fontWeight: FONTS.weights.medium,
                            }}
                        >
                            {s.handle}
                        </div>
                    </div>
                );
            })}

            {/* Divider */}
            <div style={{ height: 1, background: `${COLORS.accentPrimary}30` }} />

            {/* Stats rows */}
            {rows.map((row, i) => {
                const rowDelay = startFrame + 44 + i * 6;
                const rowOpacity = interpolate(frame, [rowDelay, rowDelay + 10], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                });
                return (
                    <div
                        key={i}
                        style={{
                            opacity: rowOpacity,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: FONTS.primary,
                                fontSize: FONTS.sizes.caption,
                                color: COLORS.textSecondary,
                            }}
                        >
                            {row.label}
                        </div>
                        <div
                            style={{
                                fontFamily: row.mono ? 'monospace' : FONTS.primary,
                                fontSize: row.mono ? 14 : FONTS.sizes.caption,
                                color: COLORS.accentPrimaryLight,
                                fontWeight: FONTS.weights.bold,
                            }}
                        >
                            {row.value}
                        </div>
                    </div>
                );
            })}

            {/* Footer label */}
            <div
                style={{
                    marginTop: 'auto',
                    background: `${COLORS.accentPrimary}20`,
                    borderRadius: 12,
                    padding: `${SPACING.sm}px ${SPACING.md}px`,
                    textAlign: 'center',
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.caption,
                    color: COLORS.accentPrimaryLight,
                    fontWeight: FONTS.weights.medium,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                }}
            >
                Who you really are
            </div>
        </div>
    );
};

/** Full scene: The Identity Gap — two-world split */
export const IdentityGapScene: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '80px 100px',
                gap: SPACING.xl,
            }}
        >
            {/* Scene heading */}
            <MaskedTextReveal
                text="The Identity Gap"
                startFrame={3}
                duration={18}
                fontSize={FONTS.sizes.h2}
                fontWeight={FONTS.weights.bold}
            />

            {/* Two-panel row */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    gap: SPACING.xl,
                    flex: 1,
                    maxHeight: 680,
                }}
            >
                <WalletCard startFrame={15} />
                <BridgeArrow startFrame={40} />
                <IdentityCard startFrame={25} />
            </div>

            {/* Bottom tagline */}
            {(() => {
                const tagOpacity = interpolate(frame, [80, 100], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                });
                return (
                    <div
                        style={{
                            opacity: tagOpacity,
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.body,
                            color: COLORS.textMuted,
                            fontWeight: FONTS.weights.regular,
                            textAlign: 'center',
                        }}
                    >
                        How do we bridge this gap{' '}
                        <span style={{ color: COLORS.accentPrimary, fontWeight: FONTS.weights.bold }}>
                            without giving up privacy?
                        </span>
                    </div>
                );
            })()}
        </AbsoluteFill>
    );
};
