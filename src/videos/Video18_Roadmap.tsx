import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { TimelineScene } from '../components/TimelineScene';
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
                        id: 'phases',
                        durationInFrames: s(30),
                        component: (
                            <TimelineScene
                                heading="The Road to Mainnet"
                                accentColor={COLORS.accentPrimary}
                                steps={[
                                    {
                                        label: 'Phase 1',
                                        title: 'Asimov - Local Testnet',
                                        description: 'Developers run a local validator and test Intelligent Contracts. Focus: GenVM stability and basic Python execution.',
                                        color: COLORS.accentTertiary,
                                        status: 'done',
                                    },
                                    {
                                        label: 'Phase 2',
                                        title: 'Bradbury - Public Testnet',
                                        description: 'A live network where anyone can deploy. Focus: Consensus mechanism, networking, and security auditing.',
                                        color: COLORS.accentSecondary,
                                        status: 'active',
                                    },
                                    {
                                        label: 'Phase 3',
                                        title: 'Clarke - Incentivized Testnet',
                                        description: 'The final rehearsal before launch. Focus: Stress testing, validator onboarding, and economic game theory.',
                                        color: COLORS.accentPrimary,
                                        status: 'upcoming',
                                    },
                                    {
                                        label: 'The Goal',
                                        title: 'Mainnet Launch',
                                        description: 'The Genesis of the Intelligent Blockchain. Open to all builders.',
                                        color: COLORS.accentPrimary,
                                        status: 'upcoming',
                                    },
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
