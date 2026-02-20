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
                            <ContentSection
                                heading="A Collaborative Future"
                                bodyLines={[
                                    'We aren\'t building alone. GenLayer is partnering with the best infrastructure in crypto and AI.',
                                ]}
                                highlights={[
                                    { word: 'partnering', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'partners-1',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Infrastructure Partners"
                                bodyLines={[
                                    'ZKsync: Scaling our execution layer.',
                                    'Caldera: Rollup-as-a-service infrastructure.',
                                    'Atoma: Network availability and data checks.',
                                ]}
                                highlights={[
                                    { word: 'ZKsync', color: COLORS.accentPrimary },
                                    { word: 'Caldera', color: COLORS.accentSecondary },
                                    { word: 'Atoma', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'partners-2',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="AI Partners"
                                bodyLines={[
                                    'io.net: The decentralized compute network for training models.',
                                    'LibertAI: Open source AI agents and tooling.',
                                    'Gaia: Decentralized AI knowledge bases.',
                                ]}
                                highlights={[
                                    { word: 'io.net', color: COLORS.accentPrimary },
                                    { word: 'LibertAI', color: COLORS.accentSecondary },
                                    { word: 'Gaia', color: COLORS.accentTertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="The AI Stack"
                                subtitle="GenLayer is the trust layer. Our partners provide compute, data, and scale."
                                accentColor={COLORS.accentSecondary}
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
