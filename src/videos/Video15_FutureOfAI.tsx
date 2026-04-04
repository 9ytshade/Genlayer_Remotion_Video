import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { CollisionScene } from '../components/CollisionScene';
import { IconGridScene } from '../components/IconGridScene';
import { StatCounterScene } from '../components/StatCounterScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video15_FutureOfAI: React.FC = () => {
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
                                title="The Future of AI and Crypto"
                                subtitle="Convergence is Inevitable"
                                episodeNumber={15}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(16),
                        component: <CollisionScene />,
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="AI Commerce"
                                subtitle="Agents buying, selling, and negotiating on-chain."
                                accentColor={COLORS.accentTertiary}
                            />
                        ),
                    },
                    {
                        id: 'vision',
                        durationInFrames: s(15),
                        component: (
                            <StatCounterScene
                                heading="An Economy for Agents"
                                accentColor={COLORS.accentSecondary}
                                stats={[
                                    {
                                        value: '$2T+',
                                        label: 'AI Agent Economy by 2030',
                                        sublabel: 'Most internet traffic will be AI agents transacting with other agents',
                                        color: COLORS.accentSecondary,
                                    },
                                ]}
                                bodyText="They need neutral ground to transact. They can't use bank accounts. They need GenLayer."
                            />
                        ),
                    },
                    {
                        id: 'infrastructure',
                        durationInFrames: s(15),
                        component: (
                            <IconGridScene
                                heading="The Substrate for AI"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '⚖️', label: 'The Legal System', sublabel: 'Binding agreements between autonomous agents', color: COLORS.accentPrimary },
                                    { emoji: '🏦', label: 'The Bank', sublabel: 'Trustless settlement without intermediaries', color: COLORS.accentTertiary },
                                    { emoji: '🤝', label: 'The Marketplace', sublabel: 'Machine-to-machine economy worth trillions', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="Humans built the first economy. AI will build the second. GenLayer supports both."
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
