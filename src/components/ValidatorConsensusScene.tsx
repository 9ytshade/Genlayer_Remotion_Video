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
import { stagger } from '../utils/interpolations';

const VALIDATORS = [
    { label: 'Validator A', emoji: '🖥️' },
    { label: 'Validator B', emoji: '💻' },
    { label: 'Validator C', emoji: '🖥️' },
    { label: 'Validator D', emoji: '💻' },
    { label: 'Validator E', emoji: '🖥️' },
];

/** Single validator node */
const ValidatorNode: React.FC<{
    emoji: string;
    label: string;
    voteFrame: number;
    nodeFrame: number;
    accentColor: string;
}> = ({ emoji, label, voteFrame, nodeFrame, accentColor }) => {
    const frame = useCurrentFrame();

    const nodeOpacity = interpolate(frame, [nodeFrame, nodeFrame + 12], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const nodeScale = interpolate(frame, [nodeFrame, nodeFrame + 12], [0.6, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)),
    });

    const hasVoted = frame >= voteFrame;
    const voteOpacity = interpolate(frame, [voteFrame, voteFrame + 10], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2)),
    });
    const voteScale = interpolate(frame, [voteFrame, voteFrame + 10], [0.3, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2)),
    });

    // Glow pulse after voting
    const glowPulse = hasVoted
        ? interpolate(frame, [voteFrame + 10, voteFrame + 30, voteFrame + 50], [0.5, 1, 0.5], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin),
          })
        : 0;

    return (
        <div
            style={{
                opacity: nodeOpacity,
                transform: `scale(${nodeScale})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: SPACING.sm,
                position: 'relative',
            }}
        >
            {/* Vote checkmark bubble */}
            {hasVoted && (
                <div
                    style={{
                        position: 'absolute',
                        top: -20,
                        right: -12,
                        opacity: voteOpacity,
                        transform: `scale(${voteScale})`,
                        background: COLORS.accentTertiary,
                        borderRadius: '50%',
                        width: 38,
                        height: 38,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        boxShadow: `0 0 ${16 * glowPulse}px ${COLORS.accentTertiary}`,
                        zIndex: 10,
                    }}
                >
                    ✓
                </div>
            )}

            {/* Node circle */}
            <div
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: hasVoted
                        ? `radial-gradient(circle, ${accentColor}40, ${accentColor}15)`
                        : `${COLORS.textMuted}15`,
                    border: `3px solid ${hasVoted ? accentColor : COLORS.textMuted}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40,
                    boxShadow: hasVoted ? `0 0 ${30 * glowPulse}px ${accentColor}50` : 'none',
                    transition: 'all 0.3s',
                }}
            >
                {emoji}
            </div>

            {/* Label */}
            <div
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.caption,
                    fontWeight: FONTS.weights.medium,
                    color: hasVoted ? COLORS.textSecondary : COLORS.textMuted,
                    textAlign: 'center',
                }}
            >
                {label}
            </div>
        </div>
    );
};

/** Validator Consensus — animated nodes reaching agreement */
export const ValidatorConsensusScene: React.FC = () => {
    const frame = useCurrentFrame();

    // All validators voted by frame ~90
    const allVotedFrame = 20 + VALIDATORS.length * 12 + 15;
    const stampOpacity = interpolate(frame, [allVotedFrame, allVotedFrame + 18], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)),
    });
    const stampScale = interpolate(frame, [allVotedFrame, allVotedFrame + 18], [1.4, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)),
    });
    const stampGlow = interpolate(frame, [allVotedFrame + 18, allVotedFrame + 40, allVotedFrame + 62], [0.5, 1, 0.5], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin),
    });

    // Connecting lines opacity — shows after all nodes appear
    const linesOpacity = interpolate(frame, [55, 70], [0, 0.4], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '70px 100px',
                gap: SPACING.xl,
                justifyContent: 'flex-start',
            }}
        >
            {/* Heading */}
            <MaskedTextReveal
                text="Anchoring Truth On-Chain"
                startFrame={3}
                duration={16}
                fontSize={FONTS.sizes.h2}
                fontWeight={FONTS.weights.bold}
            />

            {/* Sub-label */}
            {(() => {
                const subOpacity = interpolate(frame, [18, 28], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                });
                return (
                    <div style={{
                        opacity: subOpacity,
                        fontFamily: FONTS.primary,
                        fontSize: FONTS.sizes.body,
                        color: COLORS.textMuted,
                        marginTop: -SPACING.md,
                    }}>
                        When multiple validators agree on a fact, it becomes{' '}
                        <span style={{ color: COLORS.accentPrimary, fontWeight: FONTS.weights.bold }}>immutable</span>.
                    </div>
                );
            })()}

            {/* Validator row */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flex: 1,
                    position: 'relative',
                    paddingTop: SPACING.xl,
                }}
            >
                {/* Connecting lines (SVG) */}
                <svg
                    style={{
                        position: 'absolute',
                        top: 80,
                        left: '10%',
                        width: '80%',
                        height: 4,
                        opacity: linesOpacity,
                    }}
                    viewBox="0 0 1000 4"
                    preserveAspectRatio="none"
                >
                    <line
                        x1="0" y1="2" x2="1000" y2="2"
                        stroke={COLORS.accentPrimary}
                        strokeWidth="3"
                        strokeDasharray="12 8"
                    />
                </svg>

                {VALIDATORS.map((v, i) => (
                    <ValidatorNode
                        key={i}
                        emoji={v.emoji}
                        label={v.label}
                        nodeFrame={stagger(i, 10) + 20}
                        voteFrame={stagger(i, 12) + 55}
                        accentColor={COLORS.accentPrimary}
                    />
                ))}
            </div>

            {/* TRUTH ANCHORED stamp */}
            <div
                style={{
                    opacity: stampOpacity,
                    transform: `scale(${stampScale})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: SPACING.lg,
                    background: `linear-gradient(135deg, ${COLORS.accentPrimary}20, ${COLORS.accentTertiary}12)`,
                    border: `2px solid ${COLORS.accentPrimary}`,
                    borderRadius: 20,
                    padding: `${SPACING.lg}px ${SPACING.xxl}px`,
                    boxShadow: `0 0 ${40 * stampGlow}px ${COLORS.accentPrimary}50`,
                    alignSelf: 'stretch',
                }}
            >
                <div style={{ fontSize: 48 }}>⛓️</div>
                <div>
                    <div
                        style={{
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.h3,
                            fontWeight: 900,
                            color: COLORS.accentPrimary,
                            letterSpacing: 3,
                            textTransform: 'uppercase',
                            textShadow: `0 0 ${20 * stampGlow}px ${COLORS.accentPrimary}`,
                        }}
                    >
                        Truth Anchored
                    </div>
                    <div
                        style={{
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.body,
                            color: COLORS.textSecondary,
                            marginTop: 4,
                        }}
                    >
                        5/5 validators agreed · Consensus reached · Immutable on-chain
                    </div>
                </div>
                <div style={{ fontSize: 48 }}>✅</div>
            </div>
        </AbsoluteFill>
    );
};
