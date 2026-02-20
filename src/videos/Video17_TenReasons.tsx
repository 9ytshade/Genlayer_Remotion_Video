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
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="1-5: The Tech"
                                bodyLines={[
                                    '1. Native Internet Access (No Oracles)',
                                    '2. Python Development (DevEx)',
                                    '3. Subjective Consensus (Optimistic Democracy)',
                                    '4. Unstoppable AI (Sovereignty)',
                                    '5. Scalable Intelligence (GenVM)',
                                ]}
                                highlights={[
                                    { word: 'No Oracles', color: COLORS.accentPrimary },
                                    { word: 'Python', color: COLORS.accentSecondary },
                                    { word: 'Optimistic Democracy', color: COLORS.accentTertiary },
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
                        durationInFrames: s(15),
                        component: (
                            <ContentSection
                                heading="6-10: The Impact"
                                bodyLines={[
                                    '6. New DeFi Primitives (Insurance, Prediction)',
                                    '7. Autonomous DAOs (Self-governing)',
                                    '8. Decentralized Identity (Social Graph)',
                                    '9. AI Commerce (Agent Economy)',
                                    '10. The First Intelligent Blockchain',
                                ]}
                                highlights={[
                                    { word: 'New DeFi Primitives', color: COLORS.accentSecondary },
                                    { word: 'AI Commerce', color: COLORS.accentTertiary },
                                    { word: 'First Intelligent Blockchain', color: COLORS.accentPrimary },
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
