import React from 'react';
import { fullScreen } from '../utils/types';

interface VignetteProps {
    intensity?: number;
    size?: number;
}

export const Vignette: React.FC<VignetteProps> = ({
    intensity = 0.6,
    size = 50,
}) => {
    return (
        <div
            style={{
                ...fullScreen,
                pointerEvents: 'none',
                background: `radial-gradient(ellipse at center, transparent ${size}%, rgba(0, 0, 0, ${intensity}) 100%)`,
            }}
        />
    );
};
