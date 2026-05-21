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
                        durationInFrames: s(18),
                        component: (
                            <StatCounterScene
                                heading="The Reliability Gap"
                                accentColor={COLORS.accentSecondary}
                                stats={[
                                    {
                                        value: '90%',
                                        label: 'Single Model Accuracy',
                                        sublabel: 'Acceptable for drafting emails, but completely disqualifying for decentralized financial consensus.',
                                        color: COLORS.textMuted,
                                    },
                                    {
                                        value: '0%',
                                        label: 'Deterministic Guarantees',
                                        sublabel: 'Large Language Models inherently hallucinate, making them fundamentally incompatible with legacy blockchains.',
                                        color: COLORS.accentSecondary,
                                    },
                                    {
                                        value: '$1.8T+',
                                        label: 'Capital at Risk',
                                        sublabel: 'The massive crypto economy simply cannot trust its security to a single, centralized AI API key.',
                                        color: COLORS.accentTertiary,
                                    },
                                ]}
                                bodyText="AI is naturally probabilistic. Legacy blockchains demand absolute determinism. GenLayer bridges this fundamental chasm."
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
                        durationInFrames: s(22),
                        component: (
                            <StatCounterScene
                                heading="Multiplying Trust"
                                accentColor={COLORS.accentPrimary}
                                stats={[
                                    {
                                        value: '90%',
                                        label: '1 Validator',
                                        sublabel: 'A single point of failure highly susceptible to hallucinations, API outages, or adversarial manipulation.',
                                        color: COLORS.textMuted,
                                    },
                                    {
                                        value: '99.9%',
                                        label: '3 Validators',
                                        sublabel: 'Decentralized redundancy begins to rapidly isolate and override rogue AI outputs.',
                                        color: COLORS.accentSecondary,
                                    },
                                    {
                                        value: '99.999%',
                                        label: '5+ Validators',
                                        sublabel: 'Absolute mathematical certainty achieved natively via the Equivalence Principle.',
                                        color: COLORS.accentPrimary,
                                    },
                                ]}
                                bodyText="GenLayer bakes LLM redundancy directly into the protocol consensus—not as a fragile off-chain afterthought."
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
