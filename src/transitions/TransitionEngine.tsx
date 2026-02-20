import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
    Sequence,
} from 'remotion';
import { COLORS } from '../brand/colors';
import { fullScreen } from '../utils/types';

interface SceneTransitionProps {
    children: React.ReactNode;
    durationInFrames: number;
    transitionIn?: number;
    transitionOut?: number;
}

/**
 * Wraps a scene with entry/exit transitions.
 * Entry: fade + slight scale up
 * Exit: fade + slight scale up (reverse)
 */
export const SceneTransition: React.FC<SceneTransitionProps> = ({
    children,
    durationInFrames,
    transitionIn = 15,
    transitionOut = 15,
}) => {
    const frame = useCurrentFrame();

    // Entry
    const entryOpacity = transitionIn > 0
        ? interpolate(frame, [0, transitionIn], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
        })
        : 1;

    const entryScale = transitionIn > 0
        ? interpolate(frame, [0, transitionIn], [0.98, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
        })
        : 1;

    // Exit logic removed as per user request to have hard cuts/no outgoing effects

    // Combine
    const opacity = entryOpacity;
    const scale = entryScale;

    return (
        <AbsoluteFill
            style={{
                opacity,
                transform: `scale(${scale})`,
                willChange: 'transform, opacity',
            }}
        >
            {children}
        </AbsoluteFill>
    );
};

interface SceneSequenceItem {
    id: string;
    durationInFrames: number;
    component: React.ReactNode;
    transitionIn?: number;
    transitionOut?: number;
}

interface SceneSequenceProps {
    scenes: SceneSequenceItem[];
}

/**
 * Orchestrates a series of scenes in sequence using Remotion's Sequence.
 */
export const SceneSequence: React.FC<SceneSequenceProps> = ({ scenes }) => {
    let currentFrame = 0;

    return (
        <AbsoluteFill>
            {scenes.map((scene) => {
                const from = currentFrame;
                currentFrame += scene.durationInFrames;

                return (
                    <Sequence
                        key={scene.id}
                        from={from}
                        durationInFrames={scene.durationInFrames}
                        name={scene.id}
                    >
                        <SceneTransition
                            durationInFrames={scene.durationInFrames}
                            transitionIn={scene.transitionIn}
                            transitionOut={scene.transitionOut}
                        >
                            {scene.component}
                        </SceneTransition>
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};
