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

export const Video07_IntelligentOracles: React.FC = () => {
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
                                title="Intelligent Oracles"
                                subtitle="The End of the Middleman"
                                episodeNumber={7}
                            />
                        ),
                    },
                    {
                        id: 'problem',
                        durationInFrames: s(12),
                        component: (
                            <ContentSection
                                heading="The Data Problem"
                                bodyLines={[
                                    'Blockchains are blind. They can\'t see the internet.',
                                    'To get data (like ETH price or weather), they rely on Oracles.',
                                    'Traditional oracles are middlemen. They are slow, expensive, and potential points of failure.',
                                ]}
                                highlights={[
                                    { word: 'blind', color: COLORS.textMuted },
                                    { word: 'middlemen', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Native Web access"
                                subtitle="GenLayer doesn't need oracles. It connects to the internet directly."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'comparison',
                        durationInFrames: s(15),
                        component: (
                            <ComparisonScene
                                heading="Traditional vs Intelligent"
                                left={{
                                    label: 'Traditional Oracles',
                                    points: [
                                        'Third-party service required',
                                        'Pay fees for data updates',
                                        'Limited data types (mostly prices)',
                                        'Trust assumption in the provider',
                                    ],
                                }}
                                right={{
                                    label: 'GenLayer Approach',
                                    points: [
                                        'Direct http requests from code',
                                        'No extra fees or middlemen',
                                        'Access ANY web data',
                                        'Secured by consensus',
                                    ],
                                    color: COLORS.accentPrimary,
                                }}
                            />
                        ),
                    },
                    {
                        id: 'use-cases',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="What This Unlocks"
                                bodyLines={[
                                    'When contracts can read any website, everything changes.',
                                ]}
                                highlights={[
                                    { word: 'read any website', color: COLORS.accentPrimary },
                                ]}
                                bulletPoints={[
                                    'Verify a user\'s identity by checking their Twitter bio',
                                    'Settle a bet by reading BBC News',
                                    'Trigger insurance by checking NOAA weather reports',
                                    'Check stock prices directly from Nasdaq',
                                ]}
                                imagePath="assets/mochi/Mochi-Video07-Scene05.png"
                                imagePosition="right"
                                imageStyle={{ transform: 'scale(1.25)' }}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="We cut out the middleman. Your contract just surfs the web itself."
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
