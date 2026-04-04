import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { ComparisonScene } from '../components/ComparisonScene';
import { StatCounterScene } from '../components/StatCounterScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video12_Reliability: React.FC = () => {
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
                                title="AI Reliability for Blockchain"
                                subtitle="Trusting the Black Box"
                                episodeNumber={12}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(12),
                        component: (
                            <StatCounterScene
                                heading="The Reliability Gap"
                                accentColor={COLORS.accentSecondary}
                                stats={[
                                    {
                                        value: '90%',
                                        label: 'Single AI Node Reliability',
                                        sublabel: 'One model. One point of failure. Good enough for chatbots, not for money.',
                                        color: COLORS.accentSecondary,
                                    },
                                ]}
                                bodyText="AI is probabilistic. Blockchains are deterministic. How do we marry these two worlds?"
                            />
                        ),
                    },
                    {
                        id: 'solution-reveal',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Consensus is Key"
                                subtitle="Redundancy creates reliability."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'mechanics',
                        durationInFrames: s(15),
                        component: (
                            <StatCounterScene
                                heading="Multiplying Trust"
                                accentColor={COLORS.accentPrimary}
                                stats={[
                                    {
                                        value: '90%',
                                        label: '1 validator',
                                        sublabel: 'Single point of failure',
                                        color: COLORS.textMuted,
                                    },
                                    {
                                        value: '99.999%',
                                        label: '5 validators',
                                        sublabel: 'Enforced at the protocol level',
                                        color: COLORS.accentPrimary,
                                    },
                                ]}
                                bodyText="GenLayer enforces this redundancy at the protocol level — not as an afterthought."
                            />
                        ),
                    },
                    {
                        id: 'comparison',
                        durationInFrames: s(15),
                        component: (
                            <ComparisonScene
                                heading="Centralized vs Decentralized AI"
                                left={{
                                    label: 'Centralized AI API',
                                    points: [
                                        'Single point of failure',
                                        'Opaque model changes',
                                        'Can be censored/shut down',
                                        'No verification',
                                    ],
                                }}
                                right={{
                                    label: 'GenLayer Consensus',
                                    points: [
                                        'Distributed points of failure',
                                        'Transparent execution',
                                        'Unstoppable & uncensorable',
                                        'Cryptographic verification',
                                    ],
                                    color: COLORS.accentPrimary,
                                }}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="We make AI reliable enough to handle millions of dollars."
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
        </Layout>
    );
};
