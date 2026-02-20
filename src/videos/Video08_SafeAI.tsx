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

export const Video08_SafeAI: React.FC = () => {
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
                                title="Making AI Safe"
                                subtitle="Consensus as a Security Layer"
                                episodeNumber={8}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(12),
                        component: (
                            <ContentSection
                                heading="The Hallucination Risk"
                                bodyLines={[
                                    'Everyone knows AI can make mistakes. It can "hallucinate" facts.',
                                    'If a single AI controlled your money, that would be dangerous.',
                                    'GenLayer solves this not by making one perfect AI, but by using many.',
                                ]}
                                highlights={[
                                    { word: 'hallucinate', color: COLORS.accentSecondary },
                                    { word: 'using many', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Strength in Numbers"
                                subtitle="One AI can be wrong. Five AIs are rarely wrong. Fifty AIs are almost never wrong."
                                accentColor={COLORS.accentPrimary}
                            />
                        ),
                    },
                    {
                        id: 'mechanism',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Optimistic Consensus"
                                bodyLines={[
                                    'When a transaction happens, we don\'t trust just one validator.',
                                    'Multiple independent validators using different models must agree on the outcome.',
                                    'If the leader hallucinates, the others reject the result and slash the leader\'s stake.',
                                ]}
                                highlights={[
                                    { word: 'independent validators', color: COLORS.accentSecondary },
                                    { word: 'slash', color: COLORS.accentPrimary },
                                ]}
                                bulletPoints={[
                                    'Validation by Committee',
                                    'Adversarial Protection',
                                    'Economic Penalties for Errors',
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'diversity',
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="Model Diversity"
                                bodyLines={[
                                    'We encourage validators to use different LLMs (Llama, GPT, Mistral).',
                                    'A bug in one model won\'t break the network because others will catch it.',
                                    'It\'s like getting a second, third, and fourth opinion from different doctors.',
                                ]}
                                highlights={[
                                    { word: 'different LLMs', color: COLORS.accentTertiary },
                                    { word: 'diversity', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="It's safer than a single centralized AI agent. Democracy protects us from individual errors."
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
