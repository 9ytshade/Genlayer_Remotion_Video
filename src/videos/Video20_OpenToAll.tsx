import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
} from 'remotion';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { IconGridScene } from '../components/IconGridScene';
import { StatCounterScene } from '../components/StatCounterScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

/** Full-screen cinematic text statement — used for the final video */
const CinematicStatement: React.FC<{ lines: string[]; accentLine?: number }> = ({
    lines,
    accentLine = 0,
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
                const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.cubic),
                });
                const translateY = interpolate(frame, [delay, delay + 20], [30, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.out(Easing.cubic),
                });
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
                        }}
                    >
                        {line}
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};

export const Video20_OpenToAll: React.FC = () => {
    const energy = useEnergyFactor(s(120));

    return (
        <Layout neuralIntensity={energy} particleIntensity={energy}>
            <SceneSequence
                scenes={[
                    {
                        id: 'title',
                        durationInFrames: s(5),
                        component: (
                            <TitleScene
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
                        durationInFrames: s(18),
                        component: (
                            <IconGridScene
                                heading="The Vision - Universal Brain"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '💎', label: 'Ethereum DeFi', sublabel: 'Protocol uses GenLayer for AI risk scores', color: COLORS.accentSecondary },
                                    { emoji: '🎮', label: 'Solana Gaming', sublabel: 'NPC dialogue powered by GenLayer intelligence', color: COLORS.accentTertiary },
                                    { emoji: '🌐', label: 'Any Chain', sublabel: 'GenLayer exports intelligence everywhere', color: COLORS.accentPrimary },
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
                                    { value: '20+', label: 'Videos Released', sublabel: 'Telling the GenLayer story', color: COLORS.accentSecondary },
                                    { value: '∞', label: 'Chains Supported', sublabel: 'Universal intelligence layer', color: COLORS.accentPrimary },
                                    { value: '#1', label: 'Intelligent Blockchain', sublabel: 'The first and the best', color: COLORS.accentTertiary },
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
        </Layout>
    );
};
