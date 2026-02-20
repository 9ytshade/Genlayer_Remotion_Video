import React from 'react';
import { useCurrentFrame } from 'remotion';
import { fullScreen } from '../utils/types';
import { COMP } from '../brand/tokens';

interface FilmGrainProps {
    opacity?: number;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({ opacity = 0.04 }) => {
    const frame = useCurrentFrame();

    // Shift turbulence each frame for animated grain
    const baseFreq = 0.65 + (frame % 3) * 0.05;

    return (
        <div style={{ ...fullScreen, pointerEvents: 'none' }}>
            <svg
                width={COMP.width}
                height={COMP.height}
                style={{ ...fullScreen, opacity }}
            >
                <filter id="film-grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency={baseFreq}
                        numOctaves={4}
                        seed={frame}
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect
                    width="100%"
                    height="100%"
                    filter="url(#film-grain)"
                    opacity={1}
                />
            </svg>
        </div>
    );
};
