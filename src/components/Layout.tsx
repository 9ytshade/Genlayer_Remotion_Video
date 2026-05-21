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
    accentColor?: string;
    secondaryColor?: string;
    watermarkLogo?: string;
    theme?: 'light' | 'dark';
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
    accentColor = COLORS.accentPrimarySubtle,
    secondaryColor = COLORS.accentSecondaryGlow,
    watermarkLogo = 'assets/logos/Genlayer-noBG.png',
    theme = 'dark',
}) => {
    const content = (
        <AbsoluteFill
            style={{
                backgroundColor: theme === 'light' ? '#FFFFFF' : COLORS.bgPrimary,
            }}
        >
            {/* Background gradient layer (only in dark mode) */}
            {theme === 'dark' && (
                <div
                    style={{
                        ...fullScreen,
                        background: `radial-gradient(ellipse at 30% 40%, ${accentColor} 0%, transparent 60%),
                            radial-gradient(ellipse at 70% 60%, ${secondaryColor} 0%, transparent 50%)`,
                    }}
                />
            )}

            {/* Watermark Logo - Maximized for "Internet Court" Background Backdrop */}
            <AbsoluteFill
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: theme === 'light' ? 0.22 : 0.18, 
                    zIndex: 0,
                }}
            >
                <Img
                    src={staticFile(watermarkLogo)}
                    style={{ 
                        width: '75%', 
                        height: 'auto',
                        objectFit: 'contain', 
                        // blur(10px) removed — it was re-computed every frame due to
                        // CameraDrift transform invalidating the compositing context,
                        // adding seconds per frame. Slightly lower opacity achieves
                        // the same subtle watermark effect.
                    }}
                />
            </AbsoluteFill>

            {/* Neural network layer */}
            {showNeural && theme === 'dark' && <NeuralNetwork intensity={neuralIntensity} />}

            {/* Particle field layer */}
            {showParticles && theme === 'dark' && <ParticleField intensity={particleIntensity} />}

            {/* Content layer */}
            <AbsoluteFill>{children}</AbsoluteFill>

            {/* Mochi Everywhere (Bottom Right) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    opacity: 1,
                    zIndex: 50,
                    transform: 'rotate(-5deg)',
                }}
            >
                <Img
                    src={staticFile('assets/mochi/mochi.png')}
                    style={{ 
                        width: 140, 
                        height: 140, 
                        objectFit: 'contain',
                        filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.4))'
                    }}
                />
            </div>

            {/* Post-processing layers */}
            {showGrain && theme === 'dark' && <FilmGrain />}
            {showVignette && theme === 'dark' && <Vignette />}
        </AbsoluteFill>
    );

    if (showDrift) {
        return (
            <AbsoluteFill style={{ backgroundColor: theme === 'light' ? '#FFFFFF' : COLORS.bgPrimary }}>
                <CameraDrift>{content}</CameraDrift>
            </AbsoluteFill>
        );
    }

    return content;
};
