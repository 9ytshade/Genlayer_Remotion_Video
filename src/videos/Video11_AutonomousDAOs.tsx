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

export const Video11_AutonomousDAOs: React.FC = () => {
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
                                title="How DAOs Become Fully Autonomous"
                                subtitle="Governance by AI"
                                episodeNumber={11}
                            />
                        ),
                    },
                    {
                        id: 'problem',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="The DAO Bottleneck"
                                bodyLines={[
                                    'Most DAOs today are just multisig wallets controlled by a few humans.',
                                    'Voting is slow. Participation is low. Decisions take weeks.',
                                    'They aren\'t truly autonomous. They are just digital bureaucracies.',
                                ]}
                                highlights={[
                                    { word: 'multisig wallets', color: COLORS.accentSecondary },
                                    { word: 'digital bureaucracies', color: COLORS.textMuted },
                                ]}
                                imagePath="assets/mochi/Mochi-Video11-Scene02.png"
                                imagePosition="right"
                                imageStyle={{ transform: 'scale(1.25)' }}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="AI Constitution"
                                subtitle="Give the DAO a mission statement it can understand and execute."
                                accentColor={COLORS.accentTertiary}
                            />
                        ),
                    },
                    {
                        id: 'solution',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Governance at Speed"
                                bodyLines={[
                                    'An Intelligent Contract can act as the DAO\'s executive branch.',
                                    '"Invest only in carbon-neutral projects." The AI checks the project\'s whitepaper and news before releasing funds.',
                                    '"Reject proposals with hate speech." The AI moderates submissions automatically.',
                                ]}
                                highlights={[
                                    { word: 'executive branch', color: COLORS.accentPrimary },
                                    { word: 'checks the project', color: COLORS.accentSecondary },
                                ]}
                                imagePath="assets/mochi/Mochi-Video11-Scene04.png"
                                imagePosition="right"
                                imageStyle={{ transform: 'scale(1.25)' }}
                            />
                        ),
                    },
                    {
                        id: 'vision',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Self-Driving Organizations"
                                bodyLines={[
                                    'This allows DAOs to operate at the speed of software.',
                                    'Micro-decisions happen instantly based on the constitution.',
                                    'Humans only vote on major strategic shifts or constitutional amendments.',
                                ]}
                                highlights={[
                                    { word: 'speed of software', color: COLORS.accentPrimary },
                                    { word: 'Micro-decisions', color: COLORS.accentTertiary },
                                ]}
                                imagePath="assets/mochi/Mochi-Video11-Scene05.png"
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
                                message="Less voting on boring stuff, more building the future."
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
