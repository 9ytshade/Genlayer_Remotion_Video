import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { IdentityGapScene } from '../components/IdentityGapScene';
import { IconGridScene } from '../components/IconGridScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video10_DecentralizedIdentity: React.FC = () => {
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
                                title="Decentralized Identity"
                                subtitle="Your Reputation, On-Chain"
                                episodeNumber={10}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(17),
                        component: <IdentityGapScene />,
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Social Verification"
                                subtitle="Link your Web2 identity to your Web3 wallet trustlessly."
                                accentColor={COLORS.accentSecondary}
                            />
                        ),
                    },
                    {
                        id: 'how-it-works',
                        durationInFrames: s(15),
                        component: (
                            <IconGridScene
                                heading="Proof of Identity - How It Works"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '🐦', label: 'Post a Code', sublabel: 'Share a verification code on Twitter/X', color: COLORS.accentSecondary },
                                    { emoji: '🔍', label: 'Contract Reads It', sublabel: 'Intelligent Contract fetches the tweet', color: COLORS.accentPrimary },
                                    { emoji: '✅', label: 'Identity Linked', sublabel: 'No API keys. No centralized verifier.', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'impact',
                        durationInFrames: s(15),
                        component: (
                            <IconGridScene
                                heading="Why It Matters"
                                columns={3}
                                accentColor={COLORS.accentSecondary}
                                items={[
                                    { emoji: '💳', label: 'Credit Scores', sublabel: 'Lending based on social history', color: COLORS.accentPrimary },
                                    { emoji: '🗳️', label: 'One Person, One Vote', sublabel: 'Sybil-proof governance systems', color: COLORS.accentSecondary },
                                    { emoji: '🤝', label: 'Social Recovery', sublabel: 'Restore wallets using trusted friends', color: COLORS.accentTertiary },
                                    { emoji: '🤖', label: 'Bot Proof', sublabel: 'Only real humans get access', color: COLORS.accentPrimary },
                                    { emoji: '🎁', label: 'Fair Airdrops', sublabel: 'Check account age automatically', color: COLORS.accentSecondary },
                                    { emoji: '🔒', label: 'Privacy First', sublabel: 'No passport or KYC required', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="You can finally prove you're not a bot, without uploading your passport to a random server."
                                position="left"
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
