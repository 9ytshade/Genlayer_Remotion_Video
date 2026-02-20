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
 * Video 03: What Are Intelligent Contracts?
 * Duration: 120 seconds (3600 frames @ 30fps)
 */
export const Video03_IntelligentContracts: React.FC = () => {
    const energy = useEnergyFactor(s(120));

    return (
        <Layout neuralIntensity={energy} particleIntensity={energy}>
            <Sequence from={s(0)} durationInFrames={s(5)} name="title">
                <SceneTransition durationInFrames={s(5)} transitionOut={12}>
                    <TitleScene
                        title="What Are Intelligent Contracts?"
                        subtitle="The Evolution of On-Chain Logic"
                        episodeNumber={3}
                    />
                </SceneTransition>
            </Sequence>

            <Sequence from={s(5)} durationInFrames={s(15)} name="recap">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="From Smart to Intelligent"
                        bodyLines={[
                            'A smart contract follows one instruction: "When coin inserted, give out snack."',
                            'But what if it could check the weather, adjust prices based on inflation, and solve math problems for you?',
                            'That\'s what Intelligent Contracts are — an upgrade from the classic vending machine to an intelligent one.',
                        ]}
                        highlights={[
                            { word: 'upgrade', color: COLORS.accentTertiary },
                        ]}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            <Sequence from={s(20)} durationInFrames={s(8)} name="concept-capabilities">
                <SceneTransition durationInFrames={s(8)}>
                    <ConceptReveal
                        term="Three Superpowers"
                        // subtitle removed in favor of pills
                        pills={['Search', 'Decide', 'Understand']}
                        accentColor={COLORS.accentPrimary}
                    />
                </SceneTransition>
            </Sequence>

            <Sequence from={s(28)} durationInFrames={s(15)} name="capability-search">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="1. Search the Internet"
                        bodyLines={[
                            'Intelligent Contracts can search the web for any information.',
                            'Checking sports scores, weather reports, news headlines, market data — all natively on-chain.',
                            'No oracles needed. No third-party dependencies.',
                        ]}
                        highlights={[
                            { word: 'search the web', color: COLORS.accentPrimary },
                            { word: 'No oracles', color: COLORS.accentSecondary },
                        ]}
                        imagePath="assets/mochi/mochi_searching_computer.png"
                        imagePosition="right"
                        imageStyle={{ transform: 'scale(1.35)' }}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            <Sequence from={s(43)} durationInFrames={s(15)} name="capability-decide">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="2. Make Complex Decisions"
                        bodyLines={[
                            'Like a smart vending machine that adjusts prices based on current inflation without any human involvement.',
                            'Intelligent Contracts can analyze vast amounts of data and make complex decisions autonomously.',
                            'Investment decisions based on monetary policies. Insurance payouts based on weather events.',
                        ]}
                        highlights={[
                            { word: 'autonomously', color: COLORS.accentTertiary },
                        ]}
                        imagePath="assets/mochi/mochi_thinking.png"
                        imagePosition="right"
                        imageStyle={{ transform: 'scale(1.35)' }}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            <Sequence from={s(58)} durationInFrames={s(15)} name="capability-language">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="3. Understand Natural Language"
                        bodyLines={[
                            'What if you could just tell the vending machine what you want, and it would understand?',
                            'Intelligent Contracts have the same capability. Give them instructions in any language:',
                            '"Pay John if it rains tomorrow" — and they\'ll know exactly what to do.',
                        ]}
                        highlights={[
                            { word: 'Pay John if it rains tomorrow', color: COLORS.accentSecondary },
                        ]}
                        imagePath="assets/mochi/mochi_finally_understands.png"
                        imagePosition="right"
                        imageStyle={{ transform: 'scale(1.35)' }}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            <Sequence from={s(73)} durationInFrames={s(15)} name="how-it-works">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="How Do They Work?"
                        bodyLines={[
                            'Intelligent Contracts are powered by Large Language Models — the "brains" behind the smart vending machine.',
                            'These LLMs allow the contract to read web information, understand any language, and make complex decisions.',
                            'Instead of one "brain," multiple AI-powered validators work together to double-check everything — ensuring accuracy and trust.',
                        ]}
                        highlights={[
                            { word: 'Large Language Models', color: COLORS.accentSecondary },
                            { word: 'multiple AI-powered validators', color: COLORS.accentPrimary },
                            { word: 'accuracy and trust', color: COLORS.accentTertiary },
                        ]}
                        imagePath="assets/mochi/Mochi-LLMs.png"
                        imagePosition="right"
                        imageStyle={{ transform: 'scale(1.35)' }}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            <Sequence from={s(88)} durationInFrames={s(15)} name="mochi">
                <SceneTransition durationInFrames={s(15)}>
                    <MochiScene
                        message="Multiple validators checking each other's work — like several vending machines all agreeing on the price before giving out a snack."
                        position="left"
                    />
                </SceneTransition>
            </Sequence>

            <Sequence from={s(103)} durationInFrames={s(17)} name="closing">
                <SceneTransition durationInFrames={s(17)} transitionIn={15} transitionOut={0}>
                    <ClosingScene />
                </SceneTransition>
            </Sequence>
        </Layout>
    );
};
