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
                        durationInFrames: s(24),
                        component: (
                            <IconGridScene
                                heading="The DAO Bottleneck Today"
                                columns={3}
                                accentColor={COLORS.accentSecondary}
                                items={[
                                    { emoji: '🕐', label: 'Paralyzing Bureaucracy', sublabel: 'Governance proposals take weeks to pass, fatally stalling critical protocol upgrades', color: COLORS.textMuted },
                                    { emoji: '😴', label: 'Voter Apathy', sublabel: 'The vast majority of token holders are too overwhelmed to read complex, highly technical proposals', color: COLORS.textMuted },
                                    { emoji: '🏛️', label: 'Centralized Multisigs', sublabel: 'Ultimately controlled by a handful of human signers, completely betraying the promise of decentralization', color: COLORS.textMuted },
                                    { emoji: '🧱', label: 'Rigid Smart Contracts', sublabel: 'Unable to process nuance, requiring developers to manually hardcode every single possible edge case', color: COLORS.accentSecondary },
                                    { emoji: '🦯', label: 'Blind to Reality', sublabel: 'Completely incapable of assessing real-world off-chain events without expensive, highly trusted oracles', color: COLORS.textMuted },
                                    { emoji: '⚔️', label: 'Governance Attacks', sublabel: 'Vulnerable to malicious actors flooding the network with deceptive, Trojan-horse governance proposals', color: COLORS.accentTertiary },
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
                        durationInFrames: s(24),
                        component: (
                            <TimelineScene
                                heading="DAO Evolution"
                                accentColor={COLORS.accentPrimary}
                                steps={[
                                    {
                                        label: 'Today',
                                        title: 'Digital Bureaucracy',
                                        description: 'Stifled by voter apathy and slow, manual multisig execution. Protocols are completely unable to rapidly adapt to live market conditions.',
                                        color: COLORS.textMuted,
                                        status: 'done',
                                    },
                                    {
                                        label: 'With GenLayer',
                                        title: 'Intelligent Delegation',
                                        description: 'Routine operations and moderation are instantly executed by AI delegates. Human token-holders are only called upon for core protocol pivots.',
                                        color: COLORS.accentSecondary,
                                        status: 'active',
                                    },
                                    {
                                        label: 'The Future',
                                        title: 'Self-Driving Protocols',
                                        description: 'Fully autonomous DAOs continuously parsing web data, managing their own treasuries, and executing complex strategy entirely at the speed of software.',
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
