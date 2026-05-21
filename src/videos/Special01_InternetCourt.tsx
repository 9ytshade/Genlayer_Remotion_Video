import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ConceptReveal } from '../components/ConceptReveal';
import { TimelineScene } from '../components/TimelineScene';
import { ValidatorConsensusScene } from '../components/ValidatorConsensusScene';
import { ComparisonScene } from '../components/ComparisonScene';
import { IconGridScene } from '../components/IconGridScene';
import { MochiScene } from '../components/MochiScene';
import { StatCounterScene } from '../components/StatCounterScene';
import { ClosingScene } from '../components/ClosingScene';
import { HomepageCTAScene } from '../components/HomepageCTAScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

const IC_THEME = {
    primary: '#00E5FF',     // Electric Cyan 
    secondary: '#FF3D00',   // Neon Orange
    tertiary: '#D500F9',    // True Violet
};

export const Special01_InternetCourt: React.FC = () => {
    const energy = useEnergyFactor(s(150));

    return (
        <Layout
            neuralIntensity={energy}
            particleIntensity={energy}
            accentColor={`${IC_THEME.primary}25`}
            secondaryColor={`${IC_THEME.secondary}20`}
            watermarkLogo="assets/internet_court/logo.png"
            theme="light"
        >
            <SceneSequence
                scenes={[
                    {
                        id: 'title',
                        durationInFrames: s(6),
                        component: (
                            <TitleScene
                                title="Internet Court"
                                subtitle="The Legal System for the Agentic Economy"
                                accentColor={IC_THEME.primary}
                                logoPath="assets/logos/GenLayer_Logo_Black_Cropped.png"
                                coBrandLogoPath="assets/internet_court/logo.png"
                                logoHeight={100}
                                coBrandLogoHeight={300}
                                theme="light"
                            />
                        ),
                    },
                    {
                        id: 'agentic-revolution',
                        durationInFrames: s(12),
                        component: (
                            <StatCounterScene
                                heading="The Agentic Revolution"
                                theme="light"
                                stats={[
                                    { value: '20,000+', label: 'Agent Deployments', sublabel: '~300% growth since late 2025', color: IC_THEME.primary },
                                    { value: '15-20%', label: 'DeFi Volume', sublabel: 'Driven by autonomous intent-solvers', color: IC_THEME.secondary },
                                    { value: '$30T', label: 'Agent Economy', sublabel: 'Projected market size by 2030', color: IC_THEME.tertiary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'the-problem',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="The Conflict of Autonomy"
                                subtitle="In a world of millions of autonomous actions, disputes are inevitable. But who decides?"
                                accentColor={IC_THEME.secondary}
                                theme="light"
                            />
                        ),
                    },
                    {
                        id: 'lifecycle-timeline',
                        durationInFrames: s(18),
                        component: (
                            <TimelineScene
                                heading="The 5-Step lifecycle of how Internetcourt works"
                                accentColor={IC_THEME.primary}
                                theme="light"
                                steps={[
                                    { label: 'Step 1', title: 'Created', description: 'A binary claim is filed.', emoji: '📄', color: IC_THEME.primary },
                                    { label: 'Step 2', title: 'Active', description: 'Parties agree to the process.', emoji: '⛓️', color: IC_THEME.secondary },
                                    { label: 'Step 3', title: 'Disputed', description: 'Evidence constraints are submitted.', emoji: '🔍', color: IC_THEME.tertiary },
                                    { label: 'Step 4', title: 'Resolving', description: 'AI jury analyzes data.', emoji: '🧠', color: IC_THEME.secondary },
                                    { label: 'Step 5', title: 'Resolved', description: 'Final & immutable verdict on-chain.', emoji: '⚖️', color: IC_THEME.primary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'how-it-works-validators',
                        durationInFrames: s(18),
                        component: (
                            <ValidatorConsensusScene
                                title="An AI Jury Analyzing Evidence"
                                fact='"Party A delivered late. Party B is owed full refund."'
                                accentColor={IC_THEME.primary}
                                secondaryColor={IC_THEME.secondary}
                                theme="light"
                            />
                        ),
                    },
                    {
                        id: 'metrics-comparison',
                        durationInFrames: s(16),
                        component: (
                            <ComparisonScene
                                heading="The Stat That Matters"
                                left={{
                                    label: '',
                                    headerIcon: '⚖️',
                                    points: ['6 to 18 months average time', '$10k - $100k+ in legal fees', 'Human bias & procedural delays', 'Jurisdiction dependent'],
                                }}
                                right={{
                                    label: '', // Label hidden when logo is provided
                                    headerLogoPath: 'assets/internet_court/logo.png',
                                    points: ['~5 minutes resolution time', 'Fraction of the cost', 'Unbiased AI jury working 24/7', 'On-chain & borderless'],
                                }}
                                theme="light"
                            />
                        ),
                    },
                    {
                        id: 'the-future',
                        durationInFrames: s(14),
                        component: (
                            <IconGridScene
                                heading="The Future of Trustless Arbitration"
                                columns={2}
                                accentColor={IC_THEME.primary}
                                theme="light"
                                items={[
                                    { emoji: '💰', label: 'Faster & Cheaper', sublabel: 'Beats slow human jury models', color: IC_THEME.primary },
                                    { emoji: '📈', label: 'Infinitely Scalable', sublabel: 'Resolves thousands of cases instantly', color: IC_THEME.secondary },
                                    { emoji: '🤖', label: 'AI-Native', sublabel: 'No token politics or human boundaries', color: IC_THEME.tertiary },
                                    { emoji: '🚀', label: 'Essential Infrastructure', sublabel: 'Every autonomous platform needs this', color: IC_THEME.primary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'agentic-trust',
                        durationInFrames: s(12),
                        component: (
                            <ConceptReveal
                                term="A Foundation for Agentic Trust"
                                subtitle="Whether it's DAOs, SaaS, or smart contracts; Internet Court provides the unbiased layer needed to settle disputes between agents."
                                accentColor={IC_THEME.secondary}
                                theme="light"
                            />
                        ),
                    },
                    {
                        id: 'closing',
                        durationInFrames: s(8), // Shortened slightly to transition to CTA
                        component: (
                            <ClosingScene
                                accentColor={IC_THEME.primary}
                                logoPath="assets/internet_court/logo.png"
                                poweredByLogoPath="assets/logos/GenLayer_Logo_Black_Cropped.png"
                                theme="light"
                                tagline="The Sovereign Court for Autonomous Agents"
                            />
                        ),
                    },
                    {
                        id: 'cta-homepage',
                        durationInFrames: s(12),
                        component: (
                            <HomepageCTAScene
                                theme="light"
                                accentColor={IC_THEME.primary}
                            />
                        ),
                    },
                ]}
            />
        </Layout>
    );
};
