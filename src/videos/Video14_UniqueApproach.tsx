import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { ComparisonScene } from '../components/ComparisonScene';
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
                            <ContentSection
                                heading="The Centralization Trap"
                                bodyLines={[
                                    'Most "AI crypto" projects are just wrappers around OpenAI or centralized servers.',
                                    'If OpenAI goes down or changes its policy, your "decentralized" app breaks.',
                                    'This is not true decentralization. represent a single point of failure.',
                                ]}
                                highlights={[
                                    { word: 'wrappers', color: COLORS.accentSecondary },
                                    { word: 'single point of failure', color: COLORS.textMuted },
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
                            <ContentSection
                                heading="The Open Future"
                                bodyLines={[
                                    'GenLayer validators run open-source models locally.',
                                    'They don\'t ask permission to think.',
                                    'This ensures that the intelligence powering your contracts is as unstoppable as the blockchain itself.',
                                ]}
                                highlights={[
                                    { word: 'run open-source models locally', color: COLORS.accentTertiary },
                                    { word: 'unstoppable', color: COLORS.accentPrimary },
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
