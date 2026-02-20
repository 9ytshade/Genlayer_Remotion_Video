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

export const Video16_TrustInAI: React.FC = () => {
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
                                title="Trust in the AI Age"
                                subtitle="The Crisis of Truth"
                                episodeNumber={16}
                            />
                        ),
                    },
                    {
                        id: 'problem',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="The Deepfake Era"
                                bodyLines={[
                                    'As AI gets better, truth gets harder to verify.',
                                    'Deepfakes, fake news, and AI spam are flooding the internet.',
                                    'How do we know what is real? How do we know who is human?',
                                ]}
                                highlights={[
                                    { word: 'Deepfakes', color: COLORS.textMuted },
                                    { word: 'truth', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Trust Infrastructure"
                                subtitle="GenLayer is the base layer for verifiable truth."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'solution',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Anchoring Truth"
                                bodyLines={[
                                    'GenLayer uses consensus to anchor truth on-chain.',
                                    'When multiple validators agree on a fact (like a news event), it becomes immutable.',
                                    'We are building a ledger of verified reality that AI agents can rely on.',
                                ]}
                                highlights={[
                                    { word: 'anchor truth', color: COLORS.accentPrimary },
                                    { word: 'verified reality', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'humanity',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Proving Humanity"
                                bodyLines={[
                                    'Through decentralized identity and social verification, we can prove humanness without centralized KYC.',
                                    'This preserves the "web of trust" in a digital world overrun by bots.',
                                ]}
                                highlights={[
                                    { word: 'prove humanness', color: COLORS.accentSecondary },
                                    { word: 'web of trust', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="In a world of synthetic media, cryptographic truth is the only anchor we have."
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
