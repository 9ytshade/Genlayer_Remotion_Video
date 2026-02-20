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

export const Video06_EquivalencePrinciple: React.FC = () => {
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
                                title="The Equivalence Principle"
                                subtitle="Agreeing on the Unagreeable"
                                episodeNumber={6}
                            />
                        ),
                    },
                    {
                        id: 'problem',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="The Equality Trap"
                                bodyLines={[
                                    'In code, "A" must equal "A". But in the real world, things are fuzzier.',
                                    '"It is raining" vs "Rain is falling". Different strings, same meaning.',
                                    'Traditional blockchains reject this. They see different bytes and fail.',
                                ]}
                                highlights={[
                                    { word: 'A" must equal "A', color: COLORS.accentSecondary },
                                    { word: 'fuzzier', color: COLORS.textMuted },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Equivalence Principle"
                                subtitle="Two outputs are valid if they are semantically equivalent, even if not identical."
                                accentColor={COLORS.accentTertiary}
                            />
                        ),
                    },
                    {
                        id: 'comparison',
                        durationInFrames: s(15),
                        component: (
                            <ComparisonScene
                                heading="Equality vs Equivalence"
                                left={{
                                    label: 'Equality (Standard)',
                                    points: [
                                        'Byte-for-byte matching',
                                        'Rigid and brittle',
                                        'Fails with AI outputs',
                                        'Requires determinism',
                                    ],
                                }}
                                right={{
                                    label: 'Equivalence (GenLayer)',
                                    points: [
                                        'Semantic matching',
                                        'Flexible and robust',
                                        'Works with LLM variability',
                                        'Allows subjectivity',
                                    ],
                                    color: COLORS.accentTertiary,
                                }}
                            />
                        ),
                    },
                    {
                        id: 'how-it-works',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Semantic Consensus"
                                bodyLines={[
                                    'GenLayer validators use their own LLMs to judge equivalence.',
                                    'They ask: "Does Result A mean the same thing as Result B?"',
                                    'This allows the network to reach consensus on fuzzy, real-world data.',
                                ]}
                                highlights={[
                                    { word: 'judge equivalence', color: COLORS.accentTertiary },
                                    { word: 'consensus', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="We taught the blockchain to understand meaning, not just compare numbers."
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
