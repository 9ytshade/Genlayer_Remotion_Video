import React from 'react';
import { ElegantLayout } from '../components/ElegantLayout';
import { ElegantTitleScene } from '../components/ElegantTitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { IconGridScene } from '../components/IconGridScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { ElegantSceneSequence } from '../transitions/ElegantTransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video17_TenReasons: React.FC = () => {
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
                                title="12 Reasons to Be Excited About GenLayer"
                                subtitle="The GenLayer Bull Case"
                                episodeNumber={17}
                            />
                        ),
                    },
                    {
                        id: 'list-1',
                        durationInFrames: s(28),
                        component: (
                            <IconGridScene
                                heading="1-6: The Tech"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '🌐', label: '1. No Oracles Needed', sublabel: 'Native read/write web access allows contracts to organically fetch and process live internet data', color: COLORS.accentPrimary },
                                    { emoji: '🐍', label: '2. Python Native', sublabel: 'Unlocking Web3 for millions of Python developers without forcing them to learn niche languages like Solidity', color: COLORS.accentSecondary },
                                    { emoji: '🗳️', label: '3. Optimistic Democracy', sublabel: 'A highly scalable, subjective consensus mechanism that rapidly aligns validator agreement via the Equivalence Principle', color: COLORS.accentTertiary },
                                    { emoji: '🔒', label: '4. Unstoppable AI', sublabel: 'Empowering sovereign AI agents to execute natively on-chain without any centralized corporate kill switches', color: COLORS.accentPrimary },
                                    { emoji: '⚙️', label: '5. GenVM Powered', sublabel: 'A custom execution environment engineered from the ground up to support complex, non-deterministic computations', color: COLORS.accentSecondary },
                                    { emoji: '🛰️', label: '6. Cross-Chain Intelligence', sublabel: 'Operating as a decentralized AI co-processor that actively empowers external blockchains with cognitive logic', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(5),
                        component: (
                            <ConceptReveal
                                term="Paradigm Shift"
                                subtitle="Not just faster. Smarter."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'list-2',
                        durationInFrames: s(28),
                        component: (
                            <IconGridScene
                                heading="7-12: The Impact"
                                columns={3}
                                accentColor={COLORS.accentTertiary}
                                items={[
                                    { emoji: '📊', label: '7. Advanced DeFi', sublabel: 'Enabling next-gen protocols like AI-powered insurance underwriters and real-world prediction markets', color: COLORS.accentSecondary },
                                    { emoji: '🏛️', label: '8. Autonomous DAOs', sublabel: 'Self-governing decentralized communities guided by reasoning AI models capable of parsing complex proposals', color: COLORS.accentTertiary },
                                    { emoji: '🪪', label: '9. Decentralized Identity', sublabel: 'Building a bot-proof on-chain social graph utilizing verifiable interaction and cryptographic proofs', color: COLORS.accentPrimary },
                                    { emoji: '🤖', label: '10. Native AI Commerce', sublabel: 'Laying the critical foundation for a seamless, multi-trillion dollar machine-to-machine economy', color: COLORS.accentSecondary },
                                    { emoji: '🧠', label: '11. Intelligent Networks', sublabel: 'Evolving from a rigid ledger of static accounts to a dynamic decentralized network that actually thinks', color: COLORS.accentPrimary },
                                    { emoji: '⚖️', label: '12. Transparent Trust', sublabel: 'Eliminating opaque, biased human arbitration in favor of completely transparent, mathematically verifiable logic', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="We aren't just making a faster horse. We are building the engine for the next industrial revolution."
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
