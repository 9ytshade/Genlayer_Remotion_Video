import { CSSProperties } from 'react';

export interface AnimationProps {
    startFrame?: number;
    durationInFrames?: number;
}

export interface SceneProps extends AnimationProps {
    title?: string;
    subtitle?: string;
}

export interface HighlightedWord {
    word: string;
    color: string;
}

export interface ParticleConfig {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    layer: 'near' | 'mid' | 'far';
}

export interface NeuralNode {
    id: number;
    x: number;
    y: number;
    connections: number[];
}

export interface VideoConfig {
    id: string;
    title: string;
    description: string;
    durationInFrames: number;
    scenes: SceneTimingConfig[];
}

export interface SceneTimingConfig {
    name: string;
    startFrame: number;
    durationInFrames: number;
    component: string;
}

export type EasingFunction = (t: number) => number;

export const fullScreen: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
};
