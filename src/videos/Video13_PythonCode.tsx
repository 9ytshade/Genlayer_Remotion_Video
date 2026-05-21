import React from 'react';
import { Layout } from '../components/Layout';
import { TitleScene } from '../components/TitleScene';
import { ContentSection } from '../components/ContentSection';
import { ConceptReveal } from '../components/ConceptReveal';
import { LanguageWarsScene } from '../components/LanguageWarsScene';
import { IconGridScene } from '../components/IconGridScene';
import { MochiScene } from '../components/MochiScene';
import { ClosingScene } from '../components/ClosingScene';
import { SceneSequence } from '../transitions/TransitionEngine';
import { COLORS } from '../brand/colors';
import { s } from '../brand/tokens';
import { useEnergyFactor } from '../animations/EnergyBuild';

export const Video13_PythonCode: React.FC = () => {
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
                                title="Code with Python & Natural Language"
                                subtitle="The Best Developer Experience"
                                episodeNumber={13}
                            />
                        ),
                    },
                    {
                        id: 'intro',
                        durationInFrames: s(18),
                        component: <LanguageWarsScene />,
                    },
                    {
                        id: 'concept',
                        durationInFrames: s(8),
                        component: (
                            <ConceptReveal
                                term="Python Native"
                                subtitle="If you know Python, you are already a GenLayer developer."
                                accentColor={COLORS.accentTertiary}
                            />
                        ),
                    },
                    {
                        id: 'features',
                        durationInFrames: s(24),
                        component: (
                            <IconGridScene
                                heading="Supercharged Development"
                                columns={3}
                                accentColor={COLORS.accentTertiary}
                                items={[
                                    { emoji: '🐍', label: 'Native Python Support', sublabel: 'Write smart contracts using the world’s most popular programming language—no need to learn esoteric Web3 syntax.', color: COLORS.accentTertiary },
                                    { emoji: '🧠', label: 'Integrated AI Logic', sublabel: 'Seamlessly blend deterministic logic (if x > 10) with subjective AI reasoning (if sentiment is positive) in the exact same function.', color: COLORS.accentPrimary },
                                    { emoji: '🌐', label: 'Native Web Access', sublabel: 'Fetch and process real-time internet data directly within your contract without relying on complex, centralized oracles.', color: COLORS.accentSecondary },
                                    { emoji: '📦', label: 'Standard Libraries', sublabel: 'Leverage Python’s massive ecosystem. Import familiar standard libraries directly into your blockchain execution environment.', color: COLORS.accentTertiary },
                                    { emoji: '⚡', label: 'Zero Learning Curve', sublabel: 'If you know basic Python, you are instantly a highly capable GenLayer developer. Start building the future immediately.', color: COLORS.accentPrimary },
                                    { emoji: '🛡️', label: 'Equivalence Validation', sublabel: 'Write complex AI-driven code while the protocol automatically guarantees deterministic consensus across all validators.', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'simulator',
                        durationInFrames: s(24),
                        component: (
                            <IconGridScene
                                heading="GenLayer Simulator"
                                columns={3}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '🧪', label: 'Local Sandbox', sublabel: 'Instantly spin up a local GenLayer environment to thoroughly test your intelligent contracts before exposing them to the mainnet.', color: COLORS.accentPrimary },
                                    { emoji: '🎭', label: 'Deterministic Mocking', sublabel: 'Precisely mock complex LLM responses and web requests to guarantee your contract behaves exactly as expected under edge cases.', color: COLORS.accentTertiary },
                                    { emoji: '🔄', label: 'Rapid Iteration', sublabel: 'Experience Web2-level development speed. Write, simulate, debug, and deploy complex AI logic in seconds—not hours.', color: COLORS.accentSecondary },
                                    { emoji: '📊', label: 'Advanced Debugging', sublabel: 'Track execution paths, gas consumption, and AI reasoning branches with granular precision directly from your local terminal.', color: COLORS.accentPrimary },
                                    { emoji: '🔌', label: 'API Emulation', sublabel: 'Safely simulate interactions with external APIs and live web endpoints without paying network gas fees or hitting rate limits.', color: COLORS.accentTertiary },
                                    { emoji: '🚀', label: 'One-Click Deployment', sublabel: 'Transition seamlessly from local simulation to the live Bradbury testnet with a single, frictionless CLI command.', color: COLORS.accentSecondary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'updates',
                        durationInFrames: s(25),
                        component: (
                            <IconGridScene
                                heading="The Vibe Coding Era"
                                columns={2}
                                accentColor={COLORS.accentSecondary}
                                items={[
                                    { 
                                        emoji: '🤖', 
                                        label: 'AI-Native Building', 
                                        sublabel: 'Write contracts with Claude, Gemini, or Copilot. If they know Python, they know GenLayer.', 
                                        color: COLORS.accentPrimary 
                                    },
                                    { 
                                        emoji: '🧱', 
                                        label: 'GenLayer Skills', 
                                        sublabel: 'Don\'t reinvent the wheel. Snap in modular capabilities and plugins effortlessly.', 
                                        color: COLORS.accentSecondary 
                                    },
                                    { 
                                        emoji: '🌐', 
                                        label: 'Testnet Bradbury', 
                                        sublabel: 'Take your AI-generated contracts straight to a live network. Instant deployment.', 
                                        color: COLORS.accentTertiary 
                                    },
                                    { 
                                        emoji: '🎨', 
                                        label: 'Focus on the Vibe', 
                                        sublabel: 'Zero blockchain complexity. Tell the AI what you want, and bring your ideas to life.', 
                                        color: COLORS.accentPrimary 
                                    },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'mochi',
                        durationInFrames: s(12),
                        component: (
                            <MochiScene
                                message="Write Python. Invoke AI. Build the future. It's that simple."
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
