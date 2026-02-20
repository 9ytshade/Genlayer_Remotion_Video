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

export const Video13_PythonCode: React.FC = () => {
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
                                title="Code with Python & Natural Language"
                                subtitle="The Best Developer Experience"
                                episodeNumber={13}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(12),
                        component: (
                            <ContentSection
                                heading="Solidity is Hard"
                                bodyLines={[
                                    'Learning Solidity or Rust is a huge barrier for new crypto developers.',
                                    'It also forces you to reinvent the wheel for basic tasks.',
                                    'GenLayer changes this by supporting the world\'s most popular language.',
                                ]}
                                highlights={[
                                    { word: 'huge barrier', color: COLORS.textMuted },
                                    { word: 're-invent the wheel', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Python Native"
                                subtitle="If you know Python, you are already a GenLayer developer."
                                accentColor={COLORS.accentTertiary}
                            />
                        ),
                    },
                    {
                        id: 'features',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Supercharged Development"
                                bodyLines={[
                                    'Import standard libraries. Use familiar syntax.',
                                    'But the real magic is combining code with natural language prompts.',
                                    'Mix deterministic logic (`if x > 10`) with AI logic (`if sentiment is positive`).',
                                ]}
                                highlights={[
                                    { word: 'familiar syntax', color: COLORS.accentPrimary },
                                    { word: 'Mix deterministic logic', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'simulator',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="GenLayer Simulator"
                                bodyLines={[
                                    'Test your Intelligent Contracts locally before deploying.',
                                    'Our simulator mocks the internet and AI responses.',
                                    'Rapid iteration cycle: Code → Simulate → Deploy.',
                                ]}
                                highlights={[
                                    { word: 'Test', color: COLORS.accentPrimary },
                                    { word: 'Simulator', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="Write Python. Invoke AI. Build the future. It's that simple."
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
