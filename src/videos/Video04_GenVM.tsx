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

export const Video04_GenVM: React.FC = () => {
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
                                title="GenVM: The Execution Engine"
                                subtitle="Where AI Meets Blockchain"
                                episodeNumber={4}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="The Heart of GenLayer"
                                bodyLines={[
                                    'Every computer needs an operating system. Every blockchain needs a Virtual Machine.',
                                    'Ethereum has the EVM. Solana has the SVM. But they are designed for simple math, not AI.',
                                    'GenLayer introduces GenVM — the first execution environment built for Intelligent Contracts.',
                                ]}
                                highlights={[
                                    { word: 'GenVM', color: COLORS.accentPrimary },
                                    { word: 'Intelligent Contracts', color: COLORS.accentSecondary },
                                ]}
                                imagePath="assets/mochi/Mochi-Python.png"
                                imagePosition="right"
                                durationInFrames={s(15)}
                            />
                        ),
                    },
                    {
                        id: 'concept-reveal',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="GenVM"
                                subtitle="A Python-based environment that connects smart contracts to the internet and LLMs."
                                accentColor={COLORS.accentPrimary}
                                logoSrc="assets/logos/python.png"
                                logoCount={5}
                            />
                        ),
                    },
                    {
                        id: 'comparison',
                        durationInFrames: s(15),
                        component: (
                            <ComparisonScene
                                heading="EVM vs GenVM"
                                left={{
                                    label: 'Traditional EVM',
                                    points: [
                                        'Solidity language (complex)',
                                        'Isolated from the internet',
                                        'Deterministic math only',
                                        'Cannot run AI models',
                                    ],
                                }}
                                right={{
                                    label: 'GenLayer GenVM',
                                    points: [
                                        'Python language (standard)',
                                        'Native internet access',
                                        'Handles non-deterministic AI',
                                        'Integrated LLM capabilities',
                                    ],
                                    color: COLORS.accentPrimary,
                                }}
                            />
                        ),
                    },
                    {
                        id: 'features',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Built for Intelligence"
                                bodyLines={[
                                    'GenVM allows developers to import popular Python libraries and write code that looks like normal software.',
                                    'It handles the complexity of "sandboxing" implies — ensuring AI usage doesn\'t break consensus.',
                                ]}
                                highlights={[
                                    { word: 'Python libraries', color: COLORS.accentSecondary },
                                    { word: 'consensus', color: COLORS.accentTertiary },
                                ]}
                                bulletPoints={[
                                    'Write contracts in standard Python',
                                    'make_http_request() to fetch web data',
                                    'run_llm() to process text',
                                ]}
                                imagePath="assets/mochi/Mochi-python-LLM-Https.png"
                                imagePosition="right"
                                durationInFrames={s(15)}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="It's like upgrading from a pocket calculator to a supercomputer. GenVM runs the logic of the future."
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
