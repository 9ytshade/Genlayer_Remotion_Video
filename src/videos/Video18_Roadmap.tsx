import React from 'react';
import { ElegantLayout } from '../components/ElegantLayout';
import { ElegantTitleScene } from '../components/ElegantTitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { TimelineScene } from '../components/TimelineScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { ElegantSceneSequence } from '../transitions/ElegantTransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video18_Roadmap: React.FC = () => {
    const energy = useEnergyFactor(s(120));

    return (
        <ElegantLayout intensity={energy}>
            <ElegantSceneSequence
                scenes={[
                    {
                        id: 'title',
                        durationInFrames: s(5),
                        component: (
                            <ElegantTitleScene
                                title="Roadmap to Mainnet"
                                subtitle="The Path Forward"
                                episodeNumber={18}
                            />
                        ),
                    },
                    {
                        id: 'phases-1',
                        durationInFrames: s(22),
                        component: (
                            <TimelineScene
                                heading="Where We Are"
                                accentColor={COLORS.accentSecondary}
                                steps={[
                                    {
                                        label: 'Phase 1 — Complete',
                                        title: 'Asimov · Local Testnet',
                                        description: 'Successfully completed. Developers deployed local validators to rigorously test the core Intelligent Contract framework, establishing crucial GenVM stability and native Python execution.',
                                        color: COLORS.accentTertiary,
                                        status: 'done',
                                    },
                                    {
                                        label: 'Phase 2 — Live Now 🔴',
                                        title: 'Bradbury · Public Testnet',
                                        description: 'Our active public environment. Builders everywhere are deploying contracts while we stress-test the consensus mechanism, optimize network scaling, and undergo critical security audits.',
                                        color: COLORS.accentSecondary,
                                        status: 'active',
                                    },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'phases-2',
                        durationInFrames: s(22),
                        component: (
                            <TimelineScene
                                heading="Where We're Going"
                                accentColor={COLORS.accentPrimary}
                                startIndex={3}
                                steps={[
                                    {
                                        label: 'Phase 3 — Coming Soon',
                                        title: 'Clarke · Incentivized Testnet',
                                        description: 'The ultimate proving ground and final rehearsal. Designed for extreme stress-testing, large-scale validator onboarding, and refining complex cryptoeconomic game theory.',
                                        color: COLORS.accentPrimary,
                                        status: 'upcoming',
                                    },
                                    {
                                        label: 'The Goal',
                                        title: 'Mainnet Launch 🚀',
                                        description: 'The genesis of the world\'s first true Intelligent Blockchain. Unlocking a completely permissionless, unstoppable network where AI and Web3 converge natively for everyone.',
                                        color: COLORS.accentPrimaryLight,
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
        </ElegantLayout>
    );
};
