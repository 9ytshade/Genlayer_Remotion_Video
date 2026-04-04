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

export const Video19_Partnerships: React.FC = () => {
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
                                title="GenLayer Ecosystem"
                                subtitle="Building Together"
                                episodeNumber={19}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(10),
                        component: (
                            <ConceptReveal
                                term="The AI Stack"
                                subtitle="GenLayer is the trust layer. Partners provide compute, data, and scale."
                                accentColor={COLORS.accentSecondary}
                            />
                        ),
                    },
                    {
                        id: 'partners-infra',
                        durationInFrames: s(18),
                        component: (
                            <IconGridScene
                                heading="Infrastructure Partners"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '⚡', label: 'ZKsync', sublabel: 'Scaling our execution layer with ZK technology', color: COLORS.accentPrimary },
                                    { emoji: '🔄', label: 'Caldera', sublabel: 'Rollup-as-a-service infrastructure', color: COLORS.accentSecondary },
                                    { emoji: '📡', label: 'Atoma', sublabel: 'Network availability and data verification', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'partners-ai',
                        durationInFrames: s(18),
                        component: (
                            <IconGridScene
                                heading="AI Partners"
                                columns={3}
                                accentColor={COLORS.accentTertiary}
                                items={[
                                    { emoji: '🖥️', label: 'io.net', sublabel: 'Decentralized compute for training models', color: COLORS.accentPrimary },
                                    { emoji: '🗽', label: 'LibertAI', sublabel: 'Open source AI agents and developer tooling', color: COLORS.accentSecondary },
                                    { emoji: '🧠', label: 'Gaia', sublabel: 'Decentralized AI knowledge bases', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="It takes a village (and a lot of GPUs) to build the Intelligent Internet."
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
