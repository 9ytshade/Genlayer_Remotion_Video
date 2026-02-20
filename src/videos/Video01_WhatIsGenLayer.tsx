import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { ComparisonScene } from '../components/ComparisonScene';
import { StatHighlight } from '../components/StatHighlight';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneTransition } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

/**
 * Video 01: What is GenLayer?
 * Duration: 120 seconds (3600 frames @ 30fps)
 *
 * Scene breakdown:
 * 1.  0-5s    Title Scene - "What is GenLayer?"
 * 2.  5-17s   The Blockchain Landscape
 * 3.  17-25s  Concept Reveal — "Intelligent Contracts"
 * 4.  25-40s  Comparison — Smart Contracts vs Intelligent Contracts
 * 5.  40-55s  What Intelligent Contracts Can Do
 * 6.  55-63s  Concept Reveal — "GenVM"
 * 7.  63-78s  Optimistic Democracy Overview
 * 8.  78-88s  Concept Reveal — "Optimistic Democracy"
 * 9.  88-100s Stat Highlights
 * 10. 100-112s Mochi Scene
 * 11. 112-120s Closing
 */
export const Video01_WhatIsGenLayer: React.FC = () => {
    const energy = useEnergyFactor(s(120));

    return (
        <Layout
            neuralIntensity={energy}
            particleIntensity={energy}
        >
            {/* Scene 1: Title */}
            <Sequence from={s(0)} durationInFrames={s(5)} name="title">
                <SceneTransition durationInFrames={s(5)} transitionOut={12}>
                    <TitleScene
                        title="What is GenLayer?"
                        subtitle="The Intelligent Layer of the Internet"
                        episodeNumber={1}
                    />
                </SceneTransition>
            </Sequence>

            {/* Scene 2: The Blockchain Landscape */}
            <Sequence from={s(5)} durationInFrames={s(12)} name="blockchain-landscape">
                <SceneTransition durationInFrames={s(12)}>
                    <ContentSection
                        heading="The Blockchain Landscape"
                        bodyLines={[
                            'Ethereum pioneered smart contracts. Solana optimized for speed. Layer 2s scaled throughput.',
                            'But every chain faces the same fundamental limitation: smart contracts cannot see the outside world.',
                            'They process on-chain data only. No news. No web data. No real-world events.',
                        ]}
                        highlights={[
                            { word: 'smart contracts', color: COLORS.accentSecondary },
                            { word: 'fundamental limitation', color: COLORS.accentPrimary },
                            { word: 'outside world', color: COLORS.accentTertiary },
                        ]}
                        durationInFrames={s(12)}
                    />
                </SceneTransition>
            </Sequence>

            {/* Scene 3: Concept Reveal — Intelligent Contracts */}
            <Sequence from={s(17)} durationInFrames={s(8)} name="concept-intelligent-contracts">
                <SceneTransition durationInFrames={s(8)}>
                    <ConceptReveal
                        term="Intelligent Contracts"
                        subtitle="Smart contracts powered by AI - they read the web, process natural language, and make real-time decisions."
                    />
                </SceneTransition>
            </Sequence>

            {/* Scene 4: Comparison */}
            <Sequence from={s(25)} durationInFrames={s(15)} name="comparison">
                <SceneTransition durationInFrames={s(15)}>
                    <ComparisonScene
                        heading="Evolution of Smart Contracts"
                        left={{
                            label: 'Traditional Smart Contracts',
                            points: [
                                'Execute only predefined rules',
                                'Cannot access external data',
                                'Rely on third-party oracles',
                                'Static and deterministic only',
                                'Limited to on-chain information',
                            ],
                            color: COLORS.textMuted,
                        }}
                        right={{
                            label: 'Intelligent Contracts',
                            points: [
                                'Process natural language instructions',
                                'Search and analyze web data natively',
                                'Built-in oracle functionality via AI',
                                'Handle non-deterministic decisions',
                                'React to real-world events in real time',
                            ],
                            color: COLORS.accentPrimary,
                        }}
                    />
                </SceneTransition>
            </Sequence>

            {/* Scene 5: What Intelligent Contracts Can Do */}
            <Sequence from={s(40)} durationInFrames={s(15)} name="capabilities">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="What Can Intelligent Contracts Do?"
                        bodyLines={[
                            'GenLayer\'s Intelligent Contracts combine the power of smart contracts with Large Language Models.',
                        ]}
                        highlights={[
                            { word: 'Intelligent Contracts', color: COLORS.accentPrimary },
                            { word: 'Large Language Models', color: COLORS.accentSecondary },
                        ]}
                        bulletPoints={[
                            'Automatically pay out insurance claims based on real-time weather data',
                            'Adjust DeFi lending rates using global central bank interest rates',
                            'Detect security breaches by monitoring news and block explorers',
                            'Verify on-chain identity by checking social media accounts',
                            'Resolve prediction markets using live headlines',
                        ]}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            {/* Scene 6: Concept Reveal — GenVM */}
            <Sequence from={s(55)} durationInFrames={s(8)} name="concept-genvm">
                <SceneTransition durationInFrames={s(8)}>
                    <ConceptReveal
                        term="GenVM"
                        subtitle="The execution environment that powers Intelligent Contracts - where AI meets blockchain."
                        accentColor={COLORS.accentSecondary}
                    />
                </SceneTransition>
            </Sequence>

            {/* Scene 7: Optimistic Democracy Content */}
            <Sequence from={s(63)} durationInFrames={s(15)} name="optimistic-democracy">
                <SceneTransition durationInFrames={s(15)}>
                    <ContentSection
                        heading="How Validators Reach Agreement"
                        bodyLines={[
                            'Every validator on GenLayer runs an AI model. When a transaction requires judgment, validators process it independently.',
                            'A leader proposes the result. Other validators compare using the Equivalence Principle - outputs don\'t need to be identical, just aligned.',
                            'If consensus fails, an appeals process engages more validators until agreement is reached.',
                        ]}
                        highlights={[
                            { word: 'Equivalence Principle', color: COLORS.accentPrimary },
                            { word: 'appeals process', color: COLORS.accentTertiary },
                            { word: 'AI model', color: COLORS.accentSecondary },
                        ]}
                        durationInFrames={s(15)}
                    />
                </SceneTransition>
            </Sequence>

            {/* Scene 8: Concept Reveal — Optimistic Democracy */}
            <Sequence from={s(78)} durationInFrames={s(10)} name="concept-optimistic-democracy">
                <SceneTransition durationInFrames={s(10)}>
                    <ConceptReveal
                        term="Optimistic Democracy"
                        subtitle="The first consensus protocol built for subjectivity. Agreement without uniformity."
                        accentColor={COLORS.accentTertiary}
                    />
                </SceneTransition>
            </Sequence>

            {/* Scene 9: Stat Highlights */}
            <Sequence from={s(88)} durationInFrames={s(12)} name="stats">
                <SceneTransition durationInFrames={s(12)}>
                    <AbsoluteFill
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            gap: 60,
                            padding: 100, // Add padding to keep away from edges
                        }}
                    >
                        {/* 1. Raised */}
                        <div style={{ position: 'relative', width: 400, height: 300 }}>
                            <StatHighlight
                                value="7.5"
                                prefix="$"
                                suffix="M"
                                label="Raised to build the Intelligent Blockchain"
                                numericValue={7.5}
                                countUp={true}
                            />
                        </div>
                        {/* 2. Validators */}
                        <div style={{ position: 'relative', width: 400, height: 300 }}>
                            <StatHighlight
                                value="5"
                                label="Minimum validators per transaction"
                                numericValue={5}
                                countUp={true}
                                color={COLORS.accentSecondary}
                            />
                        </div>
                        {/* 3. First */}
                        <div style={{ position: 'relative', width: 400, height: 300 }}>
                            <StatHighlight
                                value="1"
                                suffix="st"
                                label="Intelligent Blockchain in existence"
                                numericValue={1}
                                countUp={true}
                                color={COLORS.accentTertiary}
                            />
                        </div>
                        {/* 4. EVM */}
                        <div style={{ position: 'relative', width: 400, height: 300 }}>
                            <StatHighlight
                                value="100"
                                suffix="%"
                                label="EVM Compatible (Solidity / Python)"
                                numericValue={100}
                                countUp={true}
                                color={COLORS.accentPrimary}
                            />
                        </div>
                    </AbsoluteFill>
                </SceneTransition>
            </Sequence>

            {/* Scene 10: Mochi */}
            <Sequence from={s(100)} durationInFrames={s(12)} name="mochi">
                <SceneTransition durationInFrames={s(12)}>
                    <MochiScene
                        message="If Bitcoin is trustless money and Ethereum is trustless computation, then GenLayer is trustless decision-making."
                        position="right"
                    />
                </SceneTransition>
            </Sequence>

            {/* Scene 11: Closing */}
            <Sequence from={s(112)} durationInFrames={s(8)} name="closing">
                <SceneTransition durationInFrames={s(8)} transitionIn={15}>
                    <ClosingScene />
                </SceneTransition>
            </Sequence>
        </Layout>
    );
};
