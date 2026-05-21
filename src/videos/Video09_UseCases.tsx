import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { IconGridScene } from '../components/IconGridScene';
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
                        id: 'intro-grid',
                        durationInFrames: s(15),
                        component: (
                            <IconGridScene
                                heading="The Next Generation of dApps"
                                columns={3}
                                verticalCenter={true}
                                items={[
                                    {
                                        emoji: '🤖',
                                        label: 'AI-Resolved Markets',
                                        sublabel: 'Prediction markets settled by reading the web',
                                        color: COLORS.accentSecondary,
                                    },
                                    {
                                        emoji: '🌧️',
                                        label: 'Parametric Insurance',
                                        sublabel: 'Payouts triggered by real-world data',
                                        color: COLORS.accentTertiary,
                                    },
                                    {
                                        emoji: '🏛️',
                                        label: 'Autonomous DAOs',
                                        sublabel: 'Governance that never sleeps',
                                        color: COLORS.accentPrimary,
                                    },
                                ]}
                            />
                        ),
                    },
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
                            <IconGridScene
                                heading="Automated Resolution"
                                columns={2}
                                accentColor={COLORS.accentSecondary}
                                items={[
                                    { emoji: '📰', label: 'Reads the news', sublabel: 'AP, Reuters, BBC — checked instantly', color: COLORS.accentSecondary },
                                    { emoji: '⚡', label: 'Instant Settlement', sublabel: 'No manual review process', color: COLORS.accentPrimary },
                                    { emoji: '🔗', label: 'On-chain Truth', sublabel: 'Verified by validator consensus', color: COLORS.accentTertiary },
                                    { emoji: '🚫', label: 'No Oracles Needed', sublabel: 'Contract reads the web directly', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
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
                            <IconGridScene
                                heading="Weather-Based Payouts"
                                columns={2}
                                accentColor={COLORS.accentTertiary}
                                items={[
                                    { emoji: '🌾', label: 'Drought Insurance', sublabel: 'Farmers protected automatically', color: COLORS.accentTertiary },
                                    { emoji: '📡', label: 'NOAA Data', sublabel: 'Contract checks weather daily', color: COLORS.accentPrimary },
                                    { emoji: '📋', label: 'No Paperwork', sublabel: 'Zero claims process needed', color: COLORS.accentSecondary },
                                    { emoji: '💰', label: 'Auto Payout', sublabel: 'Below threshold = instant payment', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
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
                            <IconGridScene
                                heading="Autonomous Management"
                                columns={3}
                                verticalCenter={true}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '📜', label: 'AI Constitution', sublabel: 'Reads proposals in any language', color: COLORS.accentPrimary },
                                    { emoji: '✅', label: 'Auto-Votes', sublabel: 'Enforces rules 24/7', color: COLORS.accentTertiary },
                                    { emoji: '🏦', label: 'Treasury AI', sublabel: 'Manages funds by market conditions', color: COLORS.accentSecondary },
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
