import React from 'react';
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from 'remotion';
import { NeuralNetwork } from '../animations/NeuralNetwork';
import { ParticleField } from '../animations/ParticleField';
import { CameraDrift } from '../animations/CameraDrift';
import { FilmGrain } from '../animations/FilmGrain';
import { Vignette } from '../animations/Vignette';
import { COLORS } from '../brand/colors';
import { fullScreen } from '../utils/types';

interface LayoutProps {
    children: React.ReactNode;
    showNeural?: boolean;
    showParticles?: boolean;
    showDrift?: boolean;
    showGrain?: boolean;
    showVignette?: boolean;
    neuralIntensity?: number;
    particleIntensity?: number;
}

/**
 * Base layout component wrapping all scenes.
 * Provides the cinematic background layer stack: 
 * Background → Neural Network → Particles → Content → Film Grain → Vignette
 */
export const Layout: React.FC<LayoutProps> = ({
    children,
    showNeural = true,
    showParticles = true,
    showDrift = true,
    showGrain = true,
    showVignette = true,
    neuralIntensity = 1,
    particleIntensity = 1,
}) => {
    const content = (
        <AbsoluteFill
            style={{
                backgroundColor: COLORS.bgPrimary,
            }}
        >
            {/* Background gradient layer */}
            <div
                style={{
                    ...fullScreen,
                    background: `radial-gradient(ellipse at 30% 40%, ${COLORS.accentPrimarySubtle} 0%, transparent 60%),
                        radial-gradient(ellipse at 70% 60%, ${COLORS.accentSecondaryGlow} 0%, transparent 50%)`,
                }}
            />

            {/* Watermark Logo */}
            <AbsoluteFill
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.03,
                    zIndex: 0,
                }}
            >
                <Img
                    src={staticFile('assets/logos/Genlayer-noBG.png')}
                    style={{ width: '40%', objectFit: 'contain' }}
                />
            </AbsoluteFill>

            {/* Neural network layer */}
            {showNeural && <NeuralNetwork intensity={neuralIntensity} />}

            {/* Particle field layer */}
            {showParticles && <ParticleField intensity={particleIntensity} />}

            {/* Content layer */}
            <AbsoluteFill>{children}</AbsoluteFill>

            {/* Mochi Everywhere (Bottom Right) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: -20,
                    right: 20,
                    opacity: 0.9,
                    zIndex: 10,
                    transform: 'rotate(-5deg)',
                }}
            >
                <Img
                    src={staticFile('assets/mochi/mochi.png')}
                    style={{ width: 120, height: 120, objectFit: 'contain' }}
                />
            </div>

            {/* Post-processing layers */}
            {showGrain && <FilmGrain />}
            {showVignette && <Vignette />}
        </AbsoluteFill>
    );

    if (showDrift) {
        return (
            <AbsoluteFill style={{ backgroundColor: COLORS.bgPrimary }}>
                <CameraDrift>{content}</CameraDrift>
            </AbsoluteFill>
        );
    }

    return content;
};
