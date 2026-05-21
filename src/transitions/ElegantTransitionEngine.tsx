import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
    Sequence,
} from 'remotion';

interface SceneTransitionProps {
    children: React.ReactNode;
    durationInFrames: number;
    transitionIn?: number;
    transitionOut?: number;
}

/**
 * Elegant Scene Transition
 * Smooth, slow fade in with slight zoom.
 * Gentle fade out. Classic and refined.
 */
export const ElegantSceneTransition: React.FC<SceneTransitionProps> = ({
    children,
    durationInFrames,
    transitionIn = 20,
    transitionOut = 20,
}) => {
    const frame = useCurrentFrame();

    // Elegant Fade In
    const entryOpacity = transitionIn > 0
        ? interpolate(frame, [0, transitionIn], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.cubic),
        })
        : 1;

    // Elegant Subtle Zoom In
    const entryScale = transitionIn > 0
        ? interpolate(frame, [0, transitionIn * 2], [1.02, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
        })
        : 1;

    // Elegant Fade Out
    const exitStart = durationInFrames - transitionOut;
    const exitOpacity = transitionOut > 0
        ? interpolate(frame, [exitStart, durationInFrames], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.inOut(Easing.cubic),
        })
        : 1;

    // Combine
    const opacity = Math.min(entryOpacity, exitOpacity);

    // Optional subtle blur during transition In
    const blurAmount = transitionIn > 0
        ? interpolate(frame, [0, transitionIn], [10, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.quad),
        })
        : 0;

    return (
        <AbsoluteFill
            style={{
                opacity,
                transform: `scale(${entryScale})`,
                filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
                willChange: 'transform, opacity, filter',
            }}
        >
            {children}
        </AbsoluteFill>
    );
};

export interface SceneSequenceItem {
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
 * Orchestrates a series of scenes using the Elegant transition.
 */
export const ElegantSceneSequence: React.FC<SceneSequenceProps> = ({ scenes }) => {
    let currentFrame = 0;

    return (
        <AbsoluteFill>
            {scenes.map((scene) => {
                // To create a crossfade effect, we overlap the scenes slightly
                // by pulling the start time back by the transitionOut duration of the PREVIOUS scene.
                // For simplicity without complex duration math, we'll use a soft fade down/fade up.
                const from = currentFrame;
                currentFrame += scene.durationInFrames;

                return (
                    <Sequence
                        key={scene.id}
                        from={from}
                        durationInFrames={scene.durationInFrames}
                        name={scene.id}
                    >
                        <ElegantSceneTransition
                            durationInFrames={scene.durationInFrames}
                            transitionIn={scene.transitionIn ?? 20}
                            transitionOut={scene.transitionOut ?? 10}
                        >
                            {React.isValidElement(scene.component)
                                ? React.cloneElement(scene.component as React.ReactElement, {
                                      durationInFrames: scene.durationInFrames,
                                  })
                                : scene.component}
                        </ElegantSceneTransition>
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};
