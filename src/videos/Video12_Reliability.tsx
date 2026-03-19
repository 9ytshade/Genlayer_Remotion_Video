import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { ComparisonScene } from '../components/ComparisonScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video12_Reliability: React.FC = () => {
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
                                title="AI Reliability for Blockchain"
                                subtitle="Trusting the Black Box"
                                episodeNumber={12}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(12),
                        component: (
                            <ContentSection
                                heading="The Reliability Gap"
                                bodyLines={[
                                    'Web2 AI services (like ChatGPT) sometimes fail or change their answers.',
                                    'Blockchain transactions need to be final and irreversible.',
                                    'How do we marry the probabilistic nature of AI with the deterministic nature of crypto?',
                                ]}
                                highlights={[
                                    { word: 'probabilistic', color: COLORS.accentSecondary },
                                    { word: 'deterministic', color: COLORS.accentPrimary },
                                ]}
                                imagePath="assets/mochi/Mochi-Video12-Scene02.png"
                                imagePosition="right"
                                imageStyle={{ transform: 'scale(1.25)' }}
                            />
                        ),
                    },
                    {
                        id: 'solution-reveal',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Consensus is Key"
                                subtitle="Redundancy creates reliability."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'mechanics',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Multiplying Trust"
                                bodyLines={[
                                    'If one node runs a model, it might be 90% reliable.',
                                    'If 5 nodes run it independently, reliability jumps to 99.999%.',
                                    'GenLayer enforces this redundancy at the protocol level.',
                                ]}
                                highlights={[
                                    { word: '99.999%', color: COLORS.accentPrimary },
                                    { word: 'protocol level', color: COLORS.accentTertiary },
                                ]}
                                imagePath="assets/mochi/Mochi-Video12-Scene04.png"
                                imagePosition="right"
                                imageStyle={{ transform: 'scale(1.25)' }}
                            />
                        ),
                    },
                    {
                        id: 'comparison',
                        durationInFrames: s(15),
                        component: (
                            <ComparisonScene
                                heading="Centralized vs Decentralized AI"
                                left={{
                                    label: 'Centralized AI API',
                                    points: [
                                        'Single point of failure',
                                        'Opaque model changes',
                                        'Can be censored/shut down',
                                        'No verification',
                                    ],
                                }}
                                right={{
                                    label: 'GenLayer Consensus',
                                    points: [
                                        'Distributed points of failure',
                                        'Transparent execution',
                                        'Unstoppable & uncensorable',
                                        'Cryptographic verification',
                                    ],
                                    color: COLORS.accentPrimary,
                                }}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="We make AI reliable enough to handle millions of dollars."
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
