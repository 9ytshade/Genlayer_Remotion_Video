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

export const Video20_OpenToAll: React.FC = () => {
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
                                title="Opening GenLayer to All Blockchains"
                                subtitle="Universal Intelligence"
                                episodeNumber={20}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(12),
                        component: (
                            <ContentSection
                                heading="Not Just Another L1"
                                bodyLines={[
                                    'GenLayer isn\'t an island. It\'s an intelligence service for the entire crypto ecosystem.',
                                    'We want to export our capabilities to Ethereum, Solana, and beyond.',
                                ]}
                                highlights={[
                                    { word: 'intelligence service', color: COLORS.accentPrimary },
                                    { word: 'export our capabilities', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Cross-Chain Intelligence"
                                subtitle="Your Ethereum dApp can call a GenLayer contract to get an AI answer."
                                accentColor={COLORS.accentTertiary}
                            />
                        ),
                    },
                    {
                        id: 'vision',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="The Vision"
                                bodyLines={[
                                    'Imagine an Ethereum DeFi protocol that uses GenLayer to check risk scores.',
                                    'Or a Solana game that uses GenLayer for NPC dialogue.',
                                    'GenLayer becomes the universal "brain" for all blockchains.',
                                ]}
                                highlights={[
                                    { word: 'Ethereum DeFi', color: COLORS.accentSecondary },
                                    { word: 'universal "brain"', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'final-mochi',
                        durationInFrames: s(15),
                        component: (
                            <MochiScene
                                message="We are building the trust infrastructure for the AI age. Join the revolution."
                                position="center"
                            />
                        ),
                    },
                    {
                        id: 'closing',
                        durationInFrames: s(15),
                        component: <ClosingScene tagline="The Intelligent Future is Here" />,
                    },
                ]}
            />
        </Layout>
    );
};
