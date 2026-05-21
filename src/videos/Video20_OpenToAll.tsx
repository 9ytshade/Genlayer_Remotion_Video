import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
} from 'remotion';
import { ElegantLayout } from '../components/ElegantLayout';
import { ElegantTitleScene } from '../components/ElegantTitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { IconGridScene } from '../components/IconGridScene';
import { StatCounterScene } from '../components/StatCounterScene';
import { ClosingScene } from '../components/ClosingScene';
import { ElegantSceneSequence } from '../transitions/ElegantTransitionEngine';
import { TypewriterText } from '../animations/TypewriterText';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

/** Full-screen cinematic text statement — used for the final video */
const CinematicStatement: React.FC<{
    lines: string[];
    accentLine?: number;
    durationInFrames?: number;
    framesPerChar?: number;
}> = ({
    lines,
    accentLine = 0,
    durationInFrames,
    framesPerChar = 1.5,
}) => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '80px 120px',
                gap: 32,
                textAlign: 'center',
            }}
        >
            {lines.map((line, i) => {
                const delay = i * 18;

                const exitDuration = 15;
                const exitStagger = 6;
                const exitDelay = durationInFrames ? durationInFrames - 20 - exitStagger * (lines.length - 1 - i) : Infinity;

                const opacityEntry = interpolate(frame, [delay, delay + 20], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.cubic),
                });
                const opacityExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.inOut(Easing.cubic),
                });
                const opacity = Math.min(opacityEntry, opacityExit);

                const translateYEntry = interpolate(frame, [delay, delay + 20], [30, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.cubic),
                });
                const translateYExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [0, -30], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.inOut(Easing.cubic),
                });
                const translateY = frame > exitDelay ? translateYExit : translateYEntry;
                const isAccent = i === accentLine;

                return (
                    <div
                        key={i}
                        style={{
                            opacity,
                            transform: `translateY(${translateY}px)`,
                            fontFamily: FONTS.primary,
                            fontSize: isAccent ? 72 : 48,
                            fontWeight: isAccent ? 900 : FONTS.weights.regular,
                            color: isAccent ? COLORS.accentPrimary : COLORS.textSecondary,
                            lineHeight: 1.2,
                            textShadow: isAccent
                                ? `0 0 60px ${COLORS.accentPrimary}60, 0 0 120px ${COLORS.accentPrimary}30`
                                : 'none',
                            marginBottom: 6,
                        }}
                    >
                        <TypewriterText
                            text={line}
                            startFrame={delay}
                            framesPerChar={framesPerChar}
                            style={{ display: 'inline-block' }}
                            hideCursorAfterDone={true}
                        />
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};

export const Video20_OpenToAll: React.FC = () => {
    const energy = useEnergyFactor(s(120));

    return (
        <ElegantLayout intensity={energy}>
            <ElegantSceneSequence
                scenes={[
                    {
                        id: 'title',
                        durationInFrames: s(5),
                        component: (
                            <ElegantTitleScene
                                title="Opening GenLayer to All Blockchains"
                                subtitle="Universal Intelligence"
                                episodeNumber={20}
                            />
                        ),
                    },
                    {
                        id: 'cinematic-1',
                        durationInFrames: s(12),
                        component: (
                            <CinematicStatement
                                lines={[
                                    'GenLayer isn\'t just another L1.',
                                    'It\'s an intelligence service',
                                    'for the entire crypto ecosystem.',
                                ]}
                                accentLine={1}
                                framesPerChar={1}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Cross-Chain Intelligence"
                                subtitle="Your Ethereum dApp can call a GenLayer contract to get an AI answer."
                                accentColor={COLORS.accentTertiary}
                            />
                        ),
                    },
                    {
                        id: 'vision',
                        durationInFrames: s(24),
                        component: (
                            <IconGridScene
                                heading="The Vision - Universal Brain"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '💎', label: 'Ethereum DeFi', sublabel: 'Protocol uses GenLayer for AI risk scores', color: COLORS.accentSecondary },
                                    { emoji: '🎮', label: 'Solana Gaming', sublabel: 'NPC dialogue powered by GenLayer intelligence', color: COLORS.accentTertiary },
                                    { emoji: '🌐', label: 'Any Chain', sublabel: 'GenLayer exports intelligence everywhere', color: COLORS.accentPrimary },
                                    { emoji: '🧠', label: 'Code + Common Sense', sublabel: 'Execute programmatic logic with subjective reasoning', color: COLORS.accentTertiary },
                                    { emoji: '📄', label: 'Unstructured Data', sublabel: 'Interpret natural language and images directly on-chain', color: COLORS.accentPrimary },
                                    { emoji: '🌍', label: 'Native Web Access', sublabel: 'Fetch real-time internet data without oracles', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'stats',
                        durationInFrames: s(15),
                        component: (
                            <StatCounterScene
                                heading="The Scale of What We're Building"
                                accentColor={COLORS.accentPrimary}
                                stats={[
                                    { value: '$100B+', label: 'Liquidity Unlocked', sublabel: 'Accessing massive cross-chain DeFi capital natively with AI', color: COLORS.accentSecondary },
                                    { value: '∞', label: 'Cross-Chain Reach', sublabel: 'Seamlessly exporting intelligent logic to ANY external network', color: COLORS.accentPrimary },
                                    { value: '< 1s', label: 'Sub-Second Finality', sublabel: 'Instantly executing AI-driven outcomes via Optimistic Democracy', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'cinematic-2',
                        durationInFrames: s(15),
                        component: (
                            <CinematicStatement
                                lines={[
                                    'We are building the trust infrastructure',
                                    'for the AI age.',
                                    'Join the revolution.',
                                ]}
                                accentLine={2}
                                framesPerChar={1}
                            />
                        ),
                    },
                    {
                        id: 'closing',
                        durationInFrames: s(15),
                        component: <ClosingScene tagline="The Intelligent Future is Here" />,
                    },
                ]}
            />
        </ElegantLayout>
    );
};
