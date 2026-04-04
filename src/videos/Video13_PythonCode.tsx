import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { LanguageWarsScene } from '../components/LanguageWarsScene';
import { IconGridScene } from '../components/IconGridScene';
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
                        durationInFrames: s(18),
                        component: <LanguageWarsScene />,
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
                            <IconGridScene
                                heading="Supercharged Development"
                                columns={3}
                                accentColor={COLORS.accentTertiary}
                                items={[
                                    { emoji: '🐍', label: 'Python Native', sublabel: 'Import standard libraries. Use familiar syntax.', color: COLORS.accentTertiary },
                                    { emoji: '🤖', label: 'AI Prompts in Code', sublabel: 'Mix `if x > 10` with `if sentiment is positive`', color: COLORS.accentPrimary },
                                    { emoji: '🌐', label: 'Web Access Built-in', sublabel: 'Call any URL directly from your contract', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'simulator',
                        durationInFrames: s(15),
                        component: (
                            <IconGridScene
                                heading="GenLayer Simulator"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '🧪', label: 'Test Locally', sublabel: 'Run contracts before deploying to network', color: COLORS.accentPrimary },
                                    { emoji: '🎭', label: 'Mock AI Responses', sublabel: 'Simulate LLM outputs deterministically', color: COLORS.accentTertiary },
                                    { emoji: '🔄', label: 'Code → Simulate → Deploy', sublabel: 'Rapid iteration cycle with instant feedback', color: COLORS.accentSecondary },
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
