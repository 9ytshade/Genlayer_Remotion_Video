import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { ComparisonScene } from '../components/ComparisonScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneTransition } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

/**
 * Video 02: Why Does GenLayer Exist?
 * Duration: 120 seconds (3600 frames @ 30fps)
 */
export const Video02_WhyGenLayerExists: React.FC = () => {
    const energy = useEnergyFactor(s(120));

    return (
        <Layout neuralIntensity={energy} particleIntensity={energy}>
            {/* Title */}
            <Sequence from={s(0)} durationInFrames={s(5)} name="title">
                <SceneTransition durationInFrames={s(5)} transitionOut={12}>
                    <TitleScene
                        title="Why Does GenLayer Exist?"
                        subtitle="Upgrading the Vending Machine"
                        episodeNumber={2}
                    />
                </SceneTransition>
            </Sequence>

            {/* The Vending Machine Analogy */}
            <Sequence from={s(5)} durationInFrames={s(15)} name="vending-machine">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="The Smart Contract Vending Machine"
                        bodyLines={[
                            'Think of smart contracts like a vending machine: you put in a coin, it gives you a snack.',
                            'It can only do a very limited job. It doesn\'t know if prices changed, who is using it, or what\'s happening in the real world.',
                            'Traditional smart contracts are the same - they execute predefined rules and nothing else.',
                        ]}
                        highlights={[
                            { word: 'vending machine', color: COLORS.accentSecondary },
                            { word: 'limited job', color: COLORS.accentPrimary },
                            { word: 'predefined rules', color: COLORS.textMuted },
                        ]}
                        imagePath="assets/mochi/mochi_vending_machine_2.png"
                        imagePosition="right"
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            {/* The Ultra-High-Tech Upgrade */}
            <Sequence from={s(20)} durationInFrames={s(15)} name="upgrade">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="The Intelligent Upgrade"
                        bodyLines={[
                            'Now imagine an ultra-high-tech vending machine with all the fancy stuff integrated:',
                        ]}
                        highlights={[
                            { word: 'ultra-high-tech', color: COLORS.accentPrimary },
                        ]}
                        bulletPoints={[
                            'Check the latest news of the day or the weather forecast',
                            'Solve a complex math problem for you',
                            'Autonomously adapt snack prices without human intervention',
                        ]}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            {/* Concept: Non-deterministic */}
            <Sequence from={s(35)} durationInFrames={s(8)} name="concept-nondeterministic">
                <SceneTransition durationInFrames={s(8)}>
                    <ConceptReveal
                        term="Non-Deterministic"
                        subtitle="The real world changes. Weather. Prices. Events. Traditional smart contracts can't handle unpredictable data."
                    />
                </SceneTransition>
            </Sequence>

            {/* Why now */}
            <Sequence from={s(43)} durationInFrames={s(15)} name="why-now">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="Why Has No One Done This Before?"
                        bodyLines={[
                            'Until now, it hasn\'t been possible in decentralized systems.',
                            'AI models were needed to process unpredictable, real-world data on-chain.',
                            'GenLayer\'s Intelligent Contracts handle non-deterministic inputs - they adapt to changes, making them far more flexible and powerful.',
                        ]}
                        highlights={[
                            { word: 'AI models', color: COLORS.accentSecondary },
                            { word: 'non-deterministic inputs', color: COLORS.accentPrimary },
                            { word: 'Intelligent Contracts', color: COLORS.accentPrimary },
                        ]}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            {/* Comparison */}
            <Sequence from={s(58)} durationInFrames={s(15)} name="comparison">
                <SceneTransition durationInFrames={s(15)}>
                    <ComparisonScene
                        heading="Static vs Intelligent"
                        left={{
                            label: 'Static Smart Contracts',
                            points: [
                                'Always give the same output for the same input',
                                'Cannot react to changing conditions',
                                'Need external oracles for any real-world data',
                            ],
                        }}
                        right={{
                            label: 'Intelligent Contracts',
                            points: [
                                'Adjust insurance payouts based on real-time weather',
                                'Update loan rates using global economic factors',
                                'Make decisions based on fresh news and data',
                            ],
                            color: COLORS.accentPrimary,
                        }}
                    />
                </SceneTransition>
            </Sequence>

            {/* Real-world examples */}
            <Sequence from={s(73)} durationInFrames={s(15)} name="examples">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="Real-World Applications"
                        bodyLines={[
                            'GenLayer makes an entirely new class of decentralized applications possible:',
                        ]}
                        highlights={[
                            { word: 'GenLayer', color: COLORS.accentPrimary },
                        ]}
                        bulletPoints={[
                            'Automatically adjust insurance payouts based on real-time weather conditions',
                            'Update loan interest rates according to global economic factors',
                            'Make decisions based on fresh news - choosing the best sports bets or business moves on the blockchain',
                        ]}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            {/* Mochi */}
            <Sequence from={s(88)} durationInFrames={s(15)} name="mochi">
                <SceneTransition durationInFrames={s(15)}>
                    <MochiScene
                        message="GenLayer exists because the world isn't black and white. Intelligent Contracts react to it in real time."
                        position="right"
                    />
                </SceneTransition>
            </Sequence>

            {/* Closing */}
            <Sequence from={s(103)} durationInFrames={s(17)} name="closing">
                <SceneTransition durationInFrames={s(17)} transitionIn={15} transitionOut={0}>
                    <ClosingScene />
                </SceneTransition>
            </Sequence>
        </Layout>
    );
};
