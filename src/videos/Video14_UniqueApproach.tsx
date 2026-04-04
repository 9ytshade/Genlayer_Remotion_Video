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
                        durationInFrames: s(15),
                        component: (
                            <IconGridScene
                                heading="The Centralization Trap"
                                columns={3}
                                accentColor={COLORS.textMuted}
                                items={[
                                    { emoji: '🎭', label: 'Just Wrappers', sublabel: 'Most \"AI crypto\" wraps OpenAI APIs', color: COLORS.textMuted },
                                    { emoji: '💥', label: 'Single Point of Failure', sublabel: 'If OpenAI goes down, your dApp breaks', color: COLORS.accentSecondary },
                                    { emoji: '🚫', label: 'Not Truly Decentralized', sublabel: 'Corporate servers control the intelligence', color: COLORS.textMuted },
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
                        durationInFrames: s(15),
                        component: (
                            <IconGridScene
                                heading="The Open Future"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '🖥️', label: 'Local Models', sublabel: 'Validators run open-source models on their own hardware', color: COLORS.accentTertiary },
                                    { emoji: '🔓', label: 'No Permission Needed', sublabel: 'Intelligence that can\'t be turned off', color: COLORS.accentPrimary },
                                    { emoji: '♾️', label: 'Unstoppable', sublabel: 'As permanent as the blockchain itself', color: COLORS.accentSecondary },
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
