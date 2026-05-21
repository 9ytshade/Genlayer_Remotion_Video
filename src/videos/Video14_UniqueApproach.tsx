import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { ComparisonScene } from '../components/ComparisonScene';
import { IconGridScene } from '../components/IconGridScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video14_UniqueApproach: React.FC = () => {
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
                                title="GenLayer's Unique Approach to AI"
                                subtitle="Decentralization vs Centralization"
                                episodeNumber={14}
                            />
                        ),
                    },
                    {
                        id: 'problem',
                        durationInFrames: s(20),
                        component: (
                            <IconGridScene
                                heading="The Centralization Trap"
                                columns={3}
                                accentColor={COLORS.textMuted}
                                items={[
                                    { emoji: '🎭', label: 'Just API Wrappers', sublabel: 'Most "AI crypto" projects simply wrap centralized Web2 APIs beneath the surface', color: COLORS.textMuted },
                                    { emoji: '💥', label: 'Single Point of Failure', sublabel: 'If the centralized API provider goes down, your entire decentralized application breaks', color: COLORS.accentSecondary },
                                    { emoji: '🚫', label: 'Not Truly Decentralized', sublabel: 'Corporate servers still execute the intelligence, defeating the purpose of a blockchain', color: COLORS.textMuted },
                                    { emoji: '🕵️', label: 'Zero Privacy Guarantees', sublabel: 'Data sent to centralized AI providers can be harvested, stored, and utilized without transparency', color: '#ff8a65' },
                                    { emoji: '🔒', label: 'Censorship Vulnerabilities', sublabel: 'Central authorities can unilaterally alter model behavior or block specific smart contracts', color: COLORS.textMuted },
                                    { emoji: '💸', label: 'Arbitrary Gatekeeping', sublabel: 'Projects remain dependent on unpredictable pricing shifts and sudden rate limits', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Sovereign AI"
                                subtitle="AI that runs on the network, not on a corporate server."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'comparison',
                        durationInFrames: s(15),
                        component: (
                            <ComparisonScene
                                heading="Dependent vs Sovereign"
                                left={{
                                    label: 'Other AI Projects',
                                    points: [
                                        'Rely on API keys',
                                        'Closed source models',
                                        'Censorable by big tech',
                                        'Fragile infrastructure',
                                    ],
                                }}
                                right={{
                                    label: 'GenLayer',
                                    points: [
                                        'Network-owned intelligence',
                                        'Open source models (Llama, etc)',
                                        'Uncensorable & permanent',
                                        'Robust consensus',
                                    ],
                                    color: COLORS.accentPrimary,
                                }}
                            />
                        ),
                    },
                    {
                        id: 'vision',
                        durationInFrames: s(20),
                        component: (
                            <IconGridScene
                                heading="The Open Future"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '🖥️', label: 'Local Models', sublabel: 'Validators run open-source models (like LLaMA) directly on their own hardware', color: COLORS.accentTertiary },
                                    { emoji: '🧩', label: 'Decentralized Consensus', sublabel: 'Equivalence Principle enables network agreement on non-deterministic outputs', color: COLORS.accentSecondary },
                                    { emoji: '🔓', label: 'No Permission Needed', sublabel: 'Open-access intelligence that cannot be de-platformed or restricted by central entities', color: COLORS.accentPrimary },
                                    { emoji: '🛡️', label: 'Censorship Resistant', sublabel: 'No corporate gatekeepers dictating network capabilities or filtering transactions', color: '#ff8a65' },
                                    { emoji: '⚖️', label: 'Cryptoeconomic Truth', sublabel: 'Built-in staking mechanisms penalize dishonest actors and secure data integrity', color: COLORS.accentTertiary },
                                    { emoji: '♾️', label: 'Unstoppable Protocol', sublabel: 'AI execution logic is natively integrated, as permanent as the blockchain itself', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="We are building a brain for the blockchain that no one can turn off."
                                position="right"
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
