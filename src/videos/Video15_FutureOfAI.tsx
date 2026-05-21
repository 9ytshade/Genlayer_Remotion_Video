import React from 'react';
import { ElegantLayout } from '../components/ElegantLayout';
import { ElegantTitleScene } from '../components/ElegantTitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { CollisionScene } from '../components/CollisionScene';
import { IconGridScene } from '../components/IconGridScene';
import { StatCounterScene } from '../components/StatCounterScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { ElegantSceneSequence } from '../transitions/ElegantTransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video15_FutureOfAI: React.FC = () => {
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
                                title="The Future of AI and Crypto"
                                subtitle="Convergence is Inevitable"
                                episodeNumber={15}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(16),
                        component: <CollisionScene />,
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="AI Commerce"
                                subtitle="Agents buying, selling, and negotiating on-chain."
                                accentColor={COLORS.accentTertiary}
                            />
                        ),
                    },
                    {
                        id: 'vision',
                        durationInFrames: s(20),
                        component: (
                            <StatCounterScene
                                heading="An Economy for Agents"
                                accentColor={COLORS.accentSecondary}
                                stats={[
                                    {
                                        value: '$2T+',
                                        label: 'AI Agent Economy by 2030',
                                        sublabel: 'A massive shift where internet traffic is dominated by AI agents transacting with each other',
                                        color: COLORS.accentSecondary,
                                    },
                                    {
                                        value: '3x',
                                        label: 'Efficiency Multiplier',
                                        sublabel: 'Removing human bottlenecks from complex data verification and settlement workflows',
                                        color: COLORS.accentPrimary,
                                    },
                                    {
                                        value: '24/7',
                                        label: 'Continuous Operation',
                                        sublabel: 'Agents negotiating, executing, and finalizing agreements autonomously without downtime',
                                        color: COLORS.accentTertiary,
                                    },
                                ]}
                                bodyText="They need a neutral ground to transact. They can't use traditional bank accounts. They need GenLayer."
                            />
                        ),
                    },
                    {
                        id: 'infrastructure',
                        durationInFrames: s(20),
                        component: (
                            <IconGridScene
                                heading="The Substrate for AI"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '⚖️', label: 'Disrupting Legal', sublabel: 'Rendering traditional courts obsolete with instant, impartial AI dispute resolution', color: COLORS.accentPrimary },
                                    { emoji: '🏦', label: 'Replacing Banks', sublabel: 'Trustless, instantaneous value transfer and escrow without legacy financial gatekeepers', color: COLORS.accentTertiary },
                                    { emoji: '🤝', label: 'Autonomous Markets', sublabel: 'Paving the neutral ground for the incoming $2T+ machine-to-machine agent economy', color: COLORS.accentSecondary },
                                    { emoji: '🌐', label: 'Unrestricted Web', sublabel: 'Bypassing centralized oracles by reading live internet data directly into consensus', color: '#64b5f6' },
                                    { emoji: '🧠', label: 'Collective Cognition', sublabel: 'Empowering networks to dynamically parse, reason, and act upon unstructured human language', color: '#81c784' },
                                    { emoji: '🌍', label: 'Borderless Execution', sublabel: 'Eradicating arbitrary geographical and institutional bureaucracy for frictionless global operations', color: '#e57373' },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="Humans built the first economy. AI will build the second. GenLayer supports both."
                                position="left"
                            />
                        ),
                    },
                    {
                        id: 'closing',
                        durationInFrames: s(10),
                        component: <ClosingScene />,
                    },
                ]}
            />
        </ElegantLayout>
    );
};
