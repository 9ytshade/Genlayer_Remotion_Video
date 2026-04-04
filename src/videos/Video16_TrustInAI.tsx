import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { IconGridScene } from '../components/IconGridScene';
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
                            <IconGridScene
                                heading="The Deepfake Era"
                                columns={3}
                                accentColor={COLORS.textMuted}
                                items={[
                                    { emoji: '🎭', label: 'Deepfakes', sublabel: 'AI-generated video of anyone saying anything', color: COLORS.textMuted },
                                    { emoji: '📰', label: 'Fake News', sublabel: 'AI-written articles indistinguishable from real', color: COLORS.textMuted },
                                    { emoji: '🤖', label: 'AI Spam Bots', sublabel: 'Flooding the internet with synthetic content', color: COLORS.textMuted },
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
                                heading="Anchoring Truth On-Chain"
                                bodyLines={[
                                    'GenLayer uses consensus to anchor truth on-chain.',
                                    'When multiple validators agree on a fact (like a news event), it becomes immutable.',
                                    'We are building a ledger of verified reality that AI agents can rely on.',
                                ]}
                                highlights={[
                                    { word: 'anchor truth', color: COLORS.accentPrimary },
                                    { word: 'verified reality', color: COLORS.accentTertiary },
                                    { word: 'immutable', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'humanity',
                        durationInFrames: s(15),
                        component: (
                            <IconGridScene
                                heading="Proving Humanity"
                                columns={3}
                                accentColor={COLORS.accentSecondary}
                                items={[
                                    { emoji: '🧑', label: 'Prove You\'re Human', sublabel: 'Decentralized identity — no centralized KYC', color: COLORS.accentSecondary },
                                    { emoji: '🌐', label: 'Web of Trust', sublabel: 'Social graph on-chain, Bot-proof communities', color: COLORS.accentPrimary },
                                    { emoji: '🔐', label: 'Cryptographic Proof', sublabel: 'The only anchor in a world of synthetic media', color: COLORS.accentTertiary },
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
