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
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="The Identity Gap"
                                bodyLines={[
                                    'In crypto, you are just a wallet address (0x123...).',
                                    'But in the real world, you are a person with history, social media presence, and reputation.',
                                    'How do we bridge this gap without giving up privacy?',
                                ]}
                                highlights={[
                                    { word: 'wallet address', color: COLORS.textMuted },
                                    { word: 'reputation', color: COLORS.accentPrimary },
                                ]}
                                imagePath="assets/mochi/Mochi-Video10-Scene02.png"
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
                            <ContentSection
                                heading="Proof of Identity"
                                bodyLines={[
                                    'Imagine posting a verification code on your Twitter.',
                                    'An Intelligent Contract reads that tweet and confirms: "Yes, 0x123 owns this Twitter handle."',
                                    'No API keys. No centralized verifier. Just the contract reading the public web.',
                                ]}
                                highlights={[
                                    { word: 'reads that tweet', color: COLORS.accentPrimary },
                                    { word: 'No centralized verifier', color: COLORS.accentTertiary },
                                ]}
                                imagePath="assets/mochi/Mochi-Video10-Scene04.png"
                                imagePosition="right"
                                imageStyle={{ transform: 'scale(1.25)' }}
                            />
                        ),
                    },
                    {
                        id: 'impact',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Why It Matters"
                                bodyLines={[
                                    'This enables uncollateralized lending based on reputation.',
                                    'Sybil resistance for airdrops by checking account age.',
                                    'Social recovery of wallets using trusted friends.',
                                ]}
                                bulletPoints={[
                                    'Credit scores based on social history',
                                    'One-person-one-vote systems',
                                    'Bot-proof communities',
                                ]}
                                highlights={[
                                    { word: 'reputation', color: COLORS.accentPrimary },
                                    { word: 'Sybil resistance', color: COLORS.accentSecondary },
                                ]}
                                imagePath="assets/mochi/Mochi-Video10-Scene05.png"
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
