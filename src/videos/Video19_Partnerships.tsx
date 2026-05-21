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
import marbMarketsLogo from '../assets/logos/marb-markets.svg';
import healthProtocolLogo from '../assets/logos/health-protocol.svg';
import comput3Logo from '../assets/logos/comput3.svg';

export const Video19_Partnerships: React.FC = () => {
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
                        id: 'partners-1',
                        durationInFrames: s(18),
                        component: (
                            <IconGridScene
                                heading="Partners"
                                columns={6}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=base.org&sz=128', label: 'Base' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=layerzero.network&sz=128', label: 'LayerZero' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=zksync.io&sz=128', label: 'ZKsync' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=nansen.ai&sz=128', label: 'Nansen' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=io.net&sz=128', label: 'io.net' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=grvt.io&sz=128', label: 'grvt' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=nirvana.finance&sz=128', label: 'Nirvana' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=diadata.org&sz=128', label: 'DIA' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=radixdlt.com&sz=128', label: 'Radix' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=hyperbolic.xyz&sz=128', label: 'Hyperbolic' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=mor.org&sz=128', label: 'Morpheus' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=autonomys.xyz&sz=128', label: 'Autonomys' },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'partners-2',
                        durationInFrames: s(18),
                        component: (
                            <IconGridScene
                                heading="Partners (cont.)"
                                columns={6}
                                accentColor={COLORS.accentSecondary}
                                items={[
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=aleph.cloud&sz=128', label: 'Aleph Cloud' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=spheron.network&sz=128', label: 'Spheron' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=fermah.xyz&sz=128', label: 'Fermah' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=atoma.network&sz=128', label: 'Atoma' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=etherisc.com&sz=128', label: 'Etherisc' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=heurist.ai&sz=128', label: 'Heurist' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=2factor.finance&sz=128', label: '2factor' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=chutes.ai&sz=128', label: 'Chutes' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=peersyst.com&sz=128', label: 'Peersyst' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=chasm.net&sz=128', label: 'Chasm' },
                                    { logoUrl: marbMarketsLogo, label: 'Marb Markets' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=predx.ai&sz=128', label: 'PredX' },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'partners-3',
                        durationInFrames: s(18),
                        component: (
                            <IconGridScene
                                heading="Partners (cont.)"
                                columns={6}
                                accentColor={COLORS.accentTertiary}
                                items={[
                                    { logoUrl: healthProtocolLogo, label: 'Health Protocol' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=provably.ai&sz=128', label: 'Provably' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=antseed.com&sz=128', label: 'Antseed' },
                                    { logoUrl: comput3Logo, label: 'Comput3' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=creatorchain.io&sz=128', label: 'Creator Chain' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=arkhai.io&sz=128', label: 'arkhai' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=delphibets.com&sz=128', label: 'DELPHIBETS' },
                                    { logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=collectivememory.ai&sz=128', label: 'Collective Memory' },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'investors-1',
                        durationInFrames: s(22),
                        component: (
                            <IconGridScene
                                heading="Lead & Strategic Backers"
                                columns={4}
                                accentColor={COLORS.accentSecondary}
                                items={[
                                    { emoji: '🦅', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=northisland.ventures&sz=128', label: 'North Island', sublabel: 'Lead Strategy', color: COLORS.accentPrimary },
                                    { emoji: '🌪️', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=maelstrom.fund&sz=128', label: 'Maelstrom', sublabel: 'Arthur Hayes', color: COLORS.accentSecondary },
                                    { emoji: '🏛️', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=arringtoncapital.com&sz=128', label: 'Arrington', sublabel: 'Web3 Pioneer', color: COLORS.accentTertiary },
                                    { emoji: '🌐', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=node.capital&sz=128', label: 'Node Capital', sublabel: 'Infrastructure', color: COLORS.accentPrimary },
                                    { emoji: '⚡', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=zkventures.com&sz=128', label: 'ZK Ventures', sublabel: 'Ecosystem', color: COLORS.accentSecondary },
                                    { emoji: '🤝', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=wagmiventures.io&sz=128', label: 'WAGMI', sublabel: 'Global VC', color: COLORS.accentTertiary },
                                    { emoji: '🧠', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=cogitent.vc&sz=128', label: 'Cogitent', sublabel: 'Early-stage', color: COLORS.accentPrimary },
                                ]}
                            />
                        ),
                    },
                    {
                        id: 'investors-2',
                        durationInFrames: s(22),
                        component: (
                            <IconGridScene
                                heading="Core Institutional Investors"
                                columns={4}
                                accentColor={COLORS.accentPrimary}
                                items={[
                                    { emoji: '📈', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=ms2.capital&sz=128', label: 'MS2 Capital', sublabel: 'Digital Assets', color: COLORS.accentSecondary },
                                    { emoji: '🌲', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=samara-ag.com&sz=128', label: 'Samara AG', sublabel: 'Strategic Firm', color: COLORS.accentTertiary },
                                    { emoji: '💸', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=dcf.capital&sz=128', label: 'DCF Capital', sublabel: 'Venture Capital', color: COLORS.accentPrimary },
                                    { emoji: 'Σ', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=sigmas.capital&sz=128', label: 'Sigmas Capital', sublabel: 'Blockchain Fund', color: COLORS.accentSecondary },
                                    { emoji: '🧲', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=magnuscapital.com&sz=128', label: 'Magnus', sublabel: 'Asset Venture', color: COLORS.accentTertiary },
                                    { emoji: '💼', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=mhventures.io&sz=128', label: 'MH Ventures', sublabel: 'Global VC', color: COLORS.accentPrimary },
                                    { emoji: '🧱', logoUrl: 'https://s2.googleusercontent.com/s2/favicons?domain=blockbuilders.com&sz=128', label: 'BlockBuilders', sublabel: 'Ecosystems', color: COLORS.accentSecondary },
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
        </ElegantLayout>
    );
};
