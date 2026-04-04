import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { IconGridScene } from '../components/IconGridScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video17_TenReasons: React.FC = () => {
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
                                title="10 Reasons to Be Excited"
                                subtitle="The GenLayer Bull Case"
                                episodeNumber={17}
                            />
                        ),
                    },
                    {
                        id: 'list-1',
                        durationInFrames: s(20),
                        component: (
                            <IconGridScene
                                heading="1-5: The Tech"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '🌐', label: '1. No Oracles', sublabel: 'Native internet access built-in', color: COLORS.accentPrimary },
                                    { emoji: '🐍', label: '2. Python Dev', sublabel: 'World\'s largest developer community', color: COLORS.accentSecondary },
                                    { emoji: '🗳️', label: '3. Optimistic Democracy', sublabel: 'Subjective consensus that works', color: COLORS.accentTertiary },
                                    { emoji: '🔒', label: '4. Unstoppable AI', sublabel: 'Sovereign intelligence, no kill switch', color: COLORS.accentPrimary },
                                    { emoji: '⚙️', label: '5. GenVM', sublabel: 'Scalable intelligence layer', color: COLORS.accentSecondary },
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
                        durationInFrames: s(20),
                        component: (
                            <IconGridScene
                                heading="6-10: The Impact"
                                columns={3}
                                accentColor={COLORS.accentTertiary}
                                items={[
                                    { emoji: '📊', label: '6. New DeFi Primitives', sublabel: 'Insurance, Prediction Markets on-chain', color: COLORS.accentSecondary },
                                    { emoji: '🏛️', label: '7. Autonomous DAOs', sublabel: 'Self-governing organizations', color: COLORS.accentTertiary },
                                    { emoji: '🪪', label: '8. Decentralized Identity', sublabel: 'Social graph on the blockchain', color: COLORS.accentPrimary },
                                    { emoji: '🤖', label: '9. AI Commerce', sublabel: 'The machine-to-machine economy', color: COLORS.accentSecondary },
                                    { emoji: '🧠', label: '10. First Intelligent Chain', sublabel: 'A blockchain that can think', color: COLORS.accentPrimary },
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
        </Layout>
    );
};
