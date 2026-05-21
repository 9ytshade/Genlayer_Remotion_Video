import React from 'react';
import { ElegantLayout } from '../components/ElegantLayout';
import { ElegantTitleScene } from '../components/ElegantTitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { ValidatorConsensusScene } from '../components/ValidatorConsensusScene';
import { IconGridScene } from '../components/IconGridScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { ElegantSceneSequence } from '../transitions/ElegantTransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';
import { FONTS } from '../brand/fonts';

export const Video16_TrustInAI: React.FC = () => {
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
                                title="Trust in the AI Age"
                                subtitle="The Crisis of Truth"
                                episodeNumber={16}
                            />
                        ),
                    },
                    {
                        id: 'problem',
                        durationInFrames: s(20),
                        component: (
                            <IconGridScene
                                heading="The Deepfake Era"
                                columns={3}
                                accentColor={COLORS.textMuted}
                                items={[
                                    { emoji: '🎭', label: 'Weaponized Deepfakes', sublabel: 'Photorealistic AI-generated media deployed to maliciously fracture political and social stability', color: COLORS.textMuted },
                                    { emoji: '📰', label: 'Automated Propaganda', sublabel: '24/7 hallucinated AI journalism indistinguishable from real, verified reporting', color: COLORS.accentSecondary },
                                    { emoji: '🤖', label: 'Sybil Swarms', sublabel: 'Millions of autonomous bot networks manipulating algorithms to artificially steer global narratives', color: COLORS.textMuted },
                                    { emoji: '🎤', label: 'Audio Spoofing', sublabel: 'Hyper-realistic audio cloning bypassing biometric security to deceive and defraud institutions', color: '#ff8a65' },
                                    { emoji: '📉', label: 'Zero Provenance', sublabel: 'The absolute failure of the Web2 internet to mathematically verify the true origin of any content', color: COLORS.textMuted },
                                    { emoji: '⚠️', label: 'Societal Paralysis', sublabel: 'A catastrophic loss of confidence in digital media, rendering unverified communication completely useless', color: COLORS.accentTertiary },
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
                                termFontSize={FONTS.sizes.display + 40}
                                termFontWeight={FONTS.weights.black}
                                typewriterFramesPerChar={1}
                                typewriterStartFrame={6}
                            />
                        ),
                    },
                    {
                        id: 'solution',
                        durationInFrames: s(18),
                        component: <ValidatorConsensusScene />,
                    },
                    {
                        id: 'humanity',
                        durationInFrames: s(20),
                        component: (
                            <IconGridScene
                                heading="Proving Humanity"
                                columns={3}
                                accentColor={COLORS.accentSecondary}
                                items={[
                                    { emoji: '🧑', label: 'ZK Personhood', sublabel: 'Cryptographically proving unique humanity without exposing sensitive KYC to vulnerable databases', color: COLORS.accentSecondary },
                                    { emoji: '🌐', label: 'Bot-Proof Networks', sublabel: 'Building impenetrable on-chain social graphs that synthetic AI agents cannot infiltrate', color: COLORS.accentPrimary },
                                    { emoji: '🔐', label: 'Immutable Truth', sublabel: 'Unforgeable blockchain signatures acting as the ultimate, mathematically verified truth', color: COLORS.accentTertiary },
                                    { emoji: '🛡️', label: 'Sybil-Resistant DAOs', sublabel: 'Reputation-gated ecosystems where malicious bot swarms are instantly identified and slashed', color: '#64b5f6' },
                                    { emoji: '📜', label: 'Transparent Media', sublabel: 'Natively tracking the exact origin and modification history of content directly on GenLayer', color: '#81c784' },
                                    { emoji: '🤝', label: 'Protecting Creators', sublabel: 'Ensuring network tokenomics, yields, and economic incentives flow exclusively to verified humans', color: '#e57373' },
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
        </ElegantLayout>
    );
};
