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

export const Video18_Roadmap: React.FC = () => {
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
                                title="Roadmap to Mainnet"
                                subtitle="The Path Forward"
                                episodeNumber={18}
                            />
                        ),
                    },
                    {
                        id: 'phase-1',
                        durationInFrames: s(12),
                        component: (
                            <ContentSection
                                heading="Phase 1: Asimov"
                                bodyLines={[
                                    'The first local testnet. Developers can run a local validator and test Intelligent Contracts.',
                                    'Focus: GenVM stability and basic Python execution.',
                                ]}
                                highlights={[
                                    { word: 'Asimov', color: COLORS.accentTertiary },
                                    { word: 'local validator', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'phase-2',
                        durationInFrames: s(12),
                        component: (
                            <ContentSection
                                heading="Phase 2: Bradbury"
                                bodyLines={[
                                    'Public Testnet. A live network where anyone can deploy.',
                                    'Focus: Consensus mechanism, networking, and security auditing.',
                                ]}
                                highlights={[
                                    { word: 'Bradbury', color: COLORS.accentSecondary },
                                    { word: 'Public Testnet', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'phase-3',
                        durationInFrames: s(12),
                        component: (
                            <ContentSection
                                heading="Phase 3: Clarke"
                                bodyLines={[
                                    'Incentivized Testnet. The final rehearsal before launch.',
                                    'Focus: Stress testing, validator onboarding, and economic game theory.',
                                ]}
                                highlights={[
                                    { word: 'Clarke', color: COLORS.accentPrimary },
                                    { word: 'Incentivized', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mainnet',
                        durationInFrames: s(10),
                        component: (
                            <ConceptReveal
                                term="Mainnet Launch"
                                subtitle="The Genesis of the Intelligent Blockchain."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(10),
                        component: (
                            <MochiScene
                                message="We are building carefully. Security first. The future is worth waiting for."
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
