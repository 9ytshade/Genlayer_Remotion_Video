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

export const Video15_FutureOfAI: React.FC = () => {
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
                                title="The Future of AI and Crypto"
                                subtitle="Convergence is Inevitable"
                                episodeNumber={15}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(12),
                        component: (
                            <ContentSection
                                heading="Two Revolutions"
                                bodyLines={[
                                    'AI is the revolution of intelligence. Crypto is the revolution of trust.',
                                    'Separately, they are powerful. Together, they are unstoppable.',
                                    'GenLayer is the bridge that connects these two worlds.',
                                ]}
                                highlights={[
                                    { word: 'revolution of intelligence', color: COLORS.accentSecondary },
                                    { word: 'revolution of trust', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
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
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="An Economy for Agents"
                                bodyLines={[
                                    'In the future, most internet traffic will be AI agents interacting with other agents.',
                                    'They need a neutral ground to transact. They can\'t use bank accounts.',
                                    'They need a trustless infrastructure to settle agreements.',
                                ]}
                                highlights={[
                                    { word: 'AI agents', color: COLORS.accentSecondary },
                                    { word: 'neutral ground', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'infrastructure',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="The Substrate for AI"
                                bodyLines={[
                                    'GenLayer provides the legal system and the bank for this new AI economy.',
                                    'Intelligent Contracts serve as the binding agreements between autonomous agents.',
                                    'This enables a machine-to-machine economy worth trillions.',
                                ]}
                                highlights={[
                                    { word: 'legal system', color: COLORS.accentPrimary },
                                    { word: 'bank', color: COLORS.accentTertiary },
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
        </Layout>
    );
};
