import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video05_OptimisticDemocracy: React.FC = () => {
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
                                title="Optimistic Democracy"
                                subtitle="Consensus for the AI Age"
                                episodeNumber={5}
                            />
                        ),
                    },
                    {
                        id: 'problem',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="The Subjectivity Problem"
                                bodyLines={[
                                    'Traditional blockchains require every node to get the EXACT same result (1 + 1 = 2).',
                                    'But AI is subjective. Summarize a news article? Every model might phrase it differently.',
                                    'How do we reach consensus when answers are different but "correct"?',
                                ]}
                                highlights={[
                                    { word: 'subjective', color: COLORS.accentSecondary },
                                    { word: 'consensus', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Optimistic Democracy"
                                subtitle="A new consensus mechanism designed specifically for non-deterministic, subjective AI tasks."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'how-it-works',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="How It Works"
                                bodyLines={[
                                    '1. A leader proposes a result for an Intelligent Contract execution.',
                                    '2. A small committee of validators checks it using the Equivalence Principle.',
                                    '3. If they agree it\'s "good enough," it passes. If not, they appeal.',
                                ]}
                                highlights={[
                                    { word: 'Equivalence Principle', color: COLORS.accentTertiary },
                                    { word: 'appeal', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'appeals',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="The Appeals Process"
                                bodyLines={[
                                    'If a validator disagrees with the outcome, they can raise a dispute.',
                                    'The system then recruits a larger jury of validators to review the case.',
                                    'This ensures that even if one AI makes a mistake, the network corrects it.',
                                ]}
                                bulletPoints={[
                                    'Layer 1: Small Committee (Fast)',
                                    'Layer 2: Larger Jury (More Secure)',
                                    'Layer 3: Network-wide Vote (Ultimate Truth)',
                                ]}
                                highlights={[
                                    { word: 'dispute', color: COLORS.accentPrimary },
                                    { word: 'network corrects it', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="It's like a decentralized jury duty. We don't need everyone to agree on the exact words, just the meaning."
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
