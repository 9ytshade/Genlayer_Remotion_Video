import React from 'react';
import { Composition } from 'remotion';
import { COMP } from './brand/tokens';
import { VIDEO_CONFIG } from './videos/videoConfig';
import { Video01_WhatIsGenLayer } from './videos/Video01_WhatIsGenLayer';
import { Video02_WhyGenLayerExists } from './videos/Video02_WhyGenLayerExists';
import { Video03_IntelligentContracts } from './videos/Video03_IntelligentContracts';
import { Video04_GenVM } from './videos/Video04_GenVM';
import { Video05_OptimisticDemocracy } from './videos/Video05_OptimisticDemocracy';
import { Video06_EquivalencePrinciple } from './videos/Video06_EquivalencePrinciple';
import { Video07_IntelligentOracles } from './videos/Video07_IntelligentOracles';
import { Video08_SafeAI } from './videos/Video08_SafeAI';
import { Video09_UseCases } from './videos/Video09_UseCases';
import { Video10_DecentralizedIdentity } from './videos/Video10_DecentralizedIdentity';
import { Video11_AutonomousDAOs } from './videos/Video11_AutonomousDAOs';
import { Video12_Reliability } from './videos/Video12_Reliability';
import { Video13_PythonCode } from './videos/Video13_PythonCode';
import { Video14_UniqueApproach } from './videos/Video14_UniqueApproach';
import { Video15_FutureOfAI } from './videos/Video15_FutureOfAI';
import { Video16_TrustInAI } from './videos/Video16_TrustInAI';
import { Video17_TenReasons } from './videos/Video17_TenReasons';
import { Video18_Roadmap } from './videos/Video18_Roadmap';
import { Video19_Partnerships } from './videos/Video19_Partnerships';
import { Video20_OpenToAll } from './videos/Video20_OpenToAll';
import { Special01_InternetCourt } from './videos/Special01_InternetCourt';
import { Thumbnail } from './components/Thumbnail';

/**
 * Component map — maps video IDs to their React components.
 */
const VIDEO_COMPONENTS: Record<string, React.FC> = {
    Video01: Video01_WhatIsGenLayer,
    Video02: Video02_WhyGenLayerExists,
    Video03: Video03_IntelligentContracts,
    Video04: Video04_GenVM,
    Video05: Video05_OptimisticDemocracy,
    Video06: Video06_EquivalencePrinciple,
    Video07: Video07_IntelligentOracles,
    Video08: Video08_SafeAI,
    Video09: Video09_UseCases,
    Video10: Video10_DecentralizedIdentity,
    Video11: Video11_AutonomousDAOs,
    Video12: Video12_Reliability,
    Video13: Video13_PythonCode,
    Video14: Video14_UniqueApproach,
    Video15: Video15_FutureOfAI,
    Video16: Video16_TrustInAI,
    Video17: Video17_TenReasons,
    Video18: Video18_Roadmap,
    Video19: Video19_Partnerships,
    Video20: Video20_OpenToAll,
    Special01: Special01_InternetCourt,
};

/**
 * Root composition — registers all video compositions with Remotion.
 * Each composition is individually selectable and renderable.
 */
export const RemotionRoot: React.FC = () => {
    return (
        <>
            {VIDEO_CONFIG.map((video) => {
                const Component = VIDEO_COMPONENTS[video.id];
                if (!Component) return null;

                return (
                    <Composition
                        key={video.id}
                        id={video.id}
                        component={Component}
                        durationInFrames={video.durationInFrames}
                        fps={COMP.fps}
                        width={COMP.width}
                        height={COMP.height}
                        defaultProps={{}}
                    />
                );
            })}

            <Composition
                id="Thumbnail"
                component={Thumbnail}
                durationInFrames={1}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    title: 'What is GenLayer?',
                    subtitle: 'The Intelligent Layer of the Internet',
                    episodeNumber: 1,
                    showMochi: true,
                }}
            />

            {/* Individual Thumbnails for Batch Rendering */}
            {VIDEO_CONFIG.map((video) => (
                <Composition
                    key={`Thumbnail-${video.id}`}
                    id={`Thumbnail-${video.id}`}
                    component={Thumbnail}
                    durationInFrames={1}
                    fps={30}
                    width={1920}
                    height={1080}
                    defaultProps={{
                        title: video.title,
                        // Use description as subtitle for thumbnails
                        subtitle: video.description,
                        episodeNumber: video.episode,
                        showMochi: true,
                    }}
                />
            ))}
        </>
    );
};
