import React from 'react';
import { useCurrentFrame } from 'remotion';
import { fullScreen } from '../utils/types';

interface FilmGrainProps {
    opacity?: number;
}

/**
 * Film grain overlay using CSS-only noise pattern.
 * 
 * Previously used SVG feTurbulence which regenerated a full 1920×1080
 * fractal noise texture from scratch each frame — catastrophically slow
 * in headless Chromium (several seconds per frame).
 * 
 * Now uses layered repeating CSS gradients with shifting backgroundPosition
 * to simulate grain at a tiny fraction of the cost.
 */
export const FilmGrain: React.FC<FilmGrainProps> = ({ opacity = 0.04 }) => {
    const frame = useCurrentFrame();

    // Shift the noise pattern each frame for animation
    const offsetX = (frame * 97) % 200;
    const offsetY = (frame * 131) % 200;

    return (
        <div
            style={{
                ...fullScreen,
                pointerEvents: 'none',
                opacity,
                mixBlendMode: 'overlay',
                backgroundImage: `
                    repeating-radial-gradient(circle at 17% 32%, rgba(255,255,255,0.12) 0px, transparent 1px, transparent 3px),
                    repeating-radial-gradient(circle at 63% 68%, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 4px),
                    repeating-radial-gradient(circle at 41% 19%, rgba(255,255,255,0.08) 0px, transparent 1px, transparent 2px),
                    repeating-radial-gradient(circle at 89% 51%, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px)
                `,
                backgroundSize: '150px 150px, 170px 170px, 130px 130px, 190px 190px',
                backgroundPosition: `${offsetX}px ${offsetY}px, ${offsetX + 30}px ${offsetY + 50}px, ${offsetX + 70}px ${offsetY + 20}px, ${offsetX + 10}px ${offsetY + 80}px`,
            }}
        />
    );
};
