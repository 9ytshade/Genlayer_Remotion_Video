import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { IconGridScene } from '../components/IconGridScene';
import { TimelineScene } from '../components/TimelineScene';
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
                            <IconGridScene
                                heading="The DAO Bottleneck Today"
                                columns={3}
                                accentColor={COLORS.accentSecondary}
                                items={[
                                    { emoji: '🕐', label: 'Weeks to Decide', sublabel: 'Voting is painfully slow', color: COLORS.textMuted },
                                    { emoji: '😴', label: 'Low Participation', sublabel: 'Most token holders never vote', color: COLORS.textMuted },
                                    { emoji: '🏛️', label: 'Just Multisigs', sublabel: 'Controlled by a few humans', color: COLORS.textMuted },
                                ]}
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
                            <IconGridScene
                                heading="Governance at the Speed of Software"
                                columns={2}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '🌱', label: 'Carbon-Neutral Check', sublabel: 'AI reviews project whitepapers before releasing funds', color: COLORS.accentTertiary },
                                    { emoji: '🚫', label: 'Auto-Moderation', sublabel: 'Reject hate speech proposals automatically', color: COLORS.accentSecondary },
                                    { emoji: '⚡', label: 'Instant Micro-Decisions', sublabel: 'Routine ops happen without any vote', color: COLORS.accentPrimary },
                                    { emoji: '🧠', label: 'Reads the Internet', sublabel: 'Checks news, data, market conditions live', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'vision',
                        durationInFrames: s(18),
                        component: (
                            <TimelineScene
                                heading="DAO Evolution"
                                accentColor={COLORS.accentPrimary}
                                steps={[
                                    {
                                        label: 'Today',
                                        title: 'Digital Bureaucracy',
                                        description: 'Multisig wallets. Weeks of voting. Low participation.',
                                        color: COLORS.textMuted,
                                        status: 'done',
                                    },
                                    {
                                        label: 'With GenLayer',
                                        title: 'AI-Assisted Governance',
                                        description: 'Routine decisions automated. Humans vote on major shifts only.',
                                        color: COLORS.accentSecondary,
                                        status: 'active',
                                    },
                                    {
                                        label: 'The Future',
                                        title: 'Fully Autonomous Organizations',
                                        description: 'Self-driving DAOs operating at the speed of software.',
                                        color: COLORS.accentPrimary,
                                        status: 'upcoming',
                                    },
                                ]}
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
