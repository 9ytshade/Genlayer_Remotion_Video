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

export const Video09_UseCases: React.FC = () => {
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
                                title="3 Use Cases That Will Disrupt dApps"
                                subtitle="Beyond DeFi and NFTs"
                                episodeNumber={9}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(10),
                        component: (
                            <ContentSection
                                heading="The Next Generation"
                                bodyLines={[
                                    'With Intelligent Contracts, we can build applications that were previously impossible.',
                                    'Here are three ways GenLayer will change the game.',
                                ]}
                                highlights={[
                                    { word: 'change the game', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    // Use Case 1: Prediction Markets
                    {
                        id: 'prediction-mkts-concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="1. Prediction Markets"
                                subtitle="Resolved by AI, not people."
                                accentColor={COLORS.accentSecondary}
                            />
                        ),
                    },
                    {
                        id: 'prediction-mkts-detail',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Automated Resolution"
                                bodyLines={[
                                    'Current prediction markets rely on slow, manual resolution or centralized oracles.',
                                    'On GenLayer, the contract reads the news itself to determine the winner.',
                                    '"Who won the election?" — The contract checks AP, Reuters, and BBC instantly.',
                                ]}
                                highlights={[
                                    { word: 'reads the news', color: COLORS.accentPrimary },
                                    { word: 'instantly', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    // Use Case 2: Parametric Insurance
                    {
                        id: 'insurance-concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="2. Parametric Insurance"
                                subtitle="Payouts triggered by real-world data."
                                accentColor={COLORS.accentTertiary}
                            />
                        ),
                    },
                    {
                        id: 'insurance-detail',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Weather-Based Payouts"
                                bodyLines={[
                                    'Farmers can buy drought insurance that pays out automatically if rainfall covers below a threshold.',
                                    'The contract checks NOAA weather data daily. No claims process. No paperwork.',
                                ]}
                                highlights={[
                                    { word: 'pays out automatically', color: COLORS.accentPrimary },
                                    { word: 'No paperwork', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    // Use Case 3: AI DAOs
                    {
                        id: 'daos-concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="3. AI-Managed DAOs"
                                subtitle="Governance that never sleeps."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'daos-detail',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Autonomous Management"
                                bodyLines={[
                                    'A DAO that manages its own treasury based on market conditions.',
                                    'It can read proposals in natural language and vote based on its constitution.',
                                    'True autonomous organizations, not just chat rooms with a bank account.',
                                ]}
                                highlights={[
                                    { word: 'read proposals', color: COLORS.accentTertiary },
                                    { word: 'True autonomous', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="These aren't sci-fi ideas. They are possible on GenLayer today."
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
