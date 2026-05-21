import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
    random,
} from 'remotion';
import { MaskedTextReveal } from '../animations/MaskedTextReveal';
import { TypewriterText } from '../animations/TypewriterText';
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
    theme?: 'light' | 'dark';
    durationInFrames?: number;
    index: number;
    total: number;
}> = ({ emoji, label, voteFrame, nodeFrame, accentColor, theme = 'dark', durationInFrames, index, total }) => {
    const frame = useCurrentFrame();

    const exitDuration = 12;
    const exitStagger = 5;
    const exitDelay = durationInFrames ? durationInFrames - 20 - exitStagger * (total - 1 - index) : Infinity;

    const nodeOpacityEntry = interpolate(frame, [nodeFrame, nodeFrame + 12], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const nodeOpacityExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [1, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic),
    });
    const nodeOpacity = Math.min(nodeOpacityEntry, nodeOpacityExit);

    const nodeScaleEntry = interpolate(frame, [nodeFrame, nodeFrame + 12], [0.6, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)),
    });
    const nodeScaleExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [1, 0.6], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.back(1.5)),
    });
    const nodeScale = frame > exitDelay ? nodeScaleExit : nodeScaleEntry;

    // Randomize entry and exit angles
    const entryAngle = random(`val-enter-${index}`) * Math.PI * 2;
    const exitAngle = random(`val-exit-${index}`) * Math.PI * 2;
    
    const startX = Math.cos(entryAngle) * 300;
    const startY = Math.sin(entryAngle) * 300;
    const endX = Math.cos(exitAngle) * 300;
    const endY = Math.sin(exitAngle) * 300;

    const translateYEntry = interpolate(frame, [nodeFrame, nodeFrame + 12], [startY, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)
    });
    const translateYExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [0, endY], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)
    });
    const translateY = frame > exitDelay ? translateYExit : translateYEntry;

    const translateXEntry = interpolate(frame, [nodeFrame, nodeFrame + 12], [startX, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)
    });
    const translateXExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [0, endX], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)
    });
    const translateX = frame > exitDelay ? translateXExit : translateXEntry;

    const hasVoted = frame >= voteFrame && frame < exitDelay;
    const voteOpacityEntry = interpolate(frame, [voteFrame, voteFrame + 10], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2)),
    });
    const voteOpacityExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [1, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic),
    });
    const voteOpacity = Math.min(voteOpacityEntry, voteOpacityExit);

    const voteScaleEntry = interpolate(frame, [voteFrame, voteFrame + 10], [0.3, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(2)),
    });
    const voteScaleExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [1, 0.3], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.back(2)),
    });
    const voteScale = frame > exitDelay ? voteScaleExit : voteScaleEntry;

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
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${nodeScale})`,
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
                        : `${theme === 'light' ? '#E5E7EB' : COLORS.textMuted}15`,
                    border: `3px solid ${hasVoted ? accentColor : (theme === 'light' ? '#E5E7EB' : COLORS.textMuted)}50`,
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
            <TypewriterText
                text={label}
                startFrame={nodeFrame + 5}
                framesPerChar={1}
                style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.caption,
                    fontWeight: FONTS.weights.medium,
                    color: hasVoted ? (theme === 'light' ? '#333' : COLORS.textSecondary) : (theme === 'light' ? '#777' : COLORS.textMuted),
                    textAlign: 'center',
                }}
            />
        </div>
    );
};

export interface ValidatorConsensusSceneProps {
    title?: string;
    fact?: string;
    accentColor?: string;
    secondaryColor?: string;
    theme?: 'light' | 'dark';
    durationInFrames?: number;
}

/** Validator Consensus — animated nodes reaching agreement */
export const ValidatorConsensusScene: React.FC<ValidatorConsensusSceneProps> = ({
    title = "Anchoring Truth On-Chain",
    fact = '"Bitcoin ETF approved by SEC on January 10, 2024"',
    accentColor = COLORS.accentPrimary,
    secondaryColor = COLORS.accentTertiary,
    theme = 'dark',
    durationInFrames,
}) => {
    const frame = useCurrentFrame();

    // All validators voted by frame ~90 (adjusted for increased stagger)
    const allVotedFrame = 20 + VALIDATORS.length * 20 + 25;
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
    const linesOpacityEntry = interpolate(frame, [55, 70], [0, 0.4], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    const linesOpacityExit = durationInFrames ? interpolate(frame, [durationInFrames - 30, durationInFrames - 15], [0.4, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }) : 0.4;
    const linesOpacity = Math.min(linesOpacityEntry, linesOpacityExit);

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
            <div style={{ textAlign: 'center', width: '100%', marginBottom: SPACING.lg }}>
                <MaskedTextReveal
                    text={title}
                    startFrame={3}
                    duration={16}
                    fontSize={FONTS.sizes.h2}
                    fontWeight={FONTS.weights.black} // Consistent with other scenes
                    color={theme === 'light' ? '#000' : COLORS.textPrimary}
                    style={{ textAlign: 'center' }}
                />
            </div>

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
                        color: theme === 'light' ? '#777' : COLORS.textMuted,
                        marginTop: -SPACING.md,
                    }}>
                        When multiple validators agree on a fact, it becomes{' '}
                        <span style={{ color: COLORS.accentPrimary, fontWeight: FONTS.weights.bold }}>immutable</span>.
                    </div>
                );
            })()}

            {/* FACT BEING VERIFIED card */}
            {(() => {
                const factOpacity = interpolate(frame, [30, 44], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
                });
                const factY = interpolate(frame, [30, 44], [20, 0], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
                });
                return (
                    <div style={{
                        opacity: factOpacity,
                        transform: `translateY(${factY}px)`,
                        background: `${COLORS.accentSecondary}12`,
                        border: `1px solid ${COLORS.accentSecondary}40`,
                        borderRadius: 14,
                        padding: `${SPACING.md}px ${SPACING.xl}px`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: SPACING.lg,
                    }}>
                        <div style={{ fontSize: 32, flexShrink: 0 }}>📰</div>
                        <div>
                            <div style={{
                                fontFamily: FONTS.primary,
                                fontSize: FONTS.sizes.caption,
                                fontWeight: FONTS.weights.bold,
                                color: COLORS.accentSecondary,
                                textTransform: 'uppercase',
                                letterSpacing: 2,
                                marginBottom: 4,
                            }}>
                                Fact submitted for verification
                            </div>
                            <div style={{
                                fontFamily: 'monospace',
                                fontSize: FONTS.sizes.body,
                                color: theme === 'light' ? '#000' : COLORS.textPrimary,
                            }}>
                                {fact}
                            </div>
                        </div>
                        <div style={{
                            marginLeft: 'auto',
                            flexShrink: 0,
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.caption,
                            color: theme === 'light' ? '#777' : COLORS.textMuted,
                            background: theme === 'light' ? '#F3F4F6' : `${COLORS.textMuted}15`,
                            padding: '6px 16px',
                            borderRadius: 99,
                        }}>
                            Pending...
                        </div>
                    </div>
                );
            })()}

            {/* Validator row */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    position: 'relative',
                    paddingTop: SPACING.sm,
                }}
            >
                {/* Connecting lines (SVG) */}
                <svg
                    style={{
                        position: 'absolute',
                        top: 56,
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
                        nodeFrame={stagger(i, 20) + 20}
                        voteFrame={stagger(i, 20) + 65}
                        accentColor={COLORS.accentPrimary}
                        theme={theme}
                        durationInFrames={durationInFrames}
                        index={i}
                        total={VALIDATORS.length}
                    />
                ))}
            </div>

            {/* TRUTH ANCHORED stamp */}
            {(() => {
                const stampOpacityExit = durationInFrames ? interpolate(frame, [durationInFrames - 20, durationInFrames - 5], [1, 0], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)
                }) : 1;
                const finalStampOpacity = Math.min(stampOpacity, stampOpacityExit);
                
                return (
                    <div
                        style={{
                            opacity: finalStampOpacity,
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
                            color: theme === 'light' ? '#333' : COLORS.textSecondary,
                            marginTop: 4,
                        }}
                    >
                        5/5 validators agreed · Consensus reached · Immutable on-chain
                    </div>
                </div>
                <div style={{ fontSize: 48 }}>✅</div>
            </div>
            );
            })()}
        </AbsoluteFill>
    );
};
