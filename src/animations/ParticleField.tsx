import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../brand/colors';
import { COMP } from '../brand/tokens';
import { seededRandom } from '../utils/interpolations';
import { fullScreen, ParticleConfig } from '../utils/types';

interface ParticleFieldProps {
    particleCount?: number;
    speed?: number;
    intensity?: number;
    seed?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
    particleCount = 80,
    speed = 1,
    intensity = 1,
    seed = 7,
}) => {
    const frame = useCurrentFrame();

    const particles = useMemo<ParticleConfig[]>(() => {
        return Array.from({ length: particleCount }, (_, i) => {
            const rand = (offset: number) => seededRandom(seed + i * 5 + offset);
            const layer = rand(0) < 0.2 ? 'near' : rand(0) < 0.6 ? 'mid' : 'far';

            return {
                x: rand(1) * COMP.width,
                y: rand(2) * COMP.height,
                size:
                    layer === 'near'
                        ? 2 + rand(3) * 2.5
                        : layer === 'mid'
                            ? 1 + rand(3) * 1.5
                            : 0.5 + rand(3) * 1,
                speed:
                    (layer === 'near' ? 0.8 : layer === 'mid' ? 0.4 : 0.15) * speed,
                opacity:
                    (layer === 'near' ? 0.5 : layer === 'mid' ? 0.3 : 0.12) * intensity,
                layer,
            };
        });
    }, [particleCount, speed, intensity, seed]);

    const layerColor = {
        near: COLORS.particleNear,
        mid: COLORS.particleMid,
        far: COLORS.particleFar,
    };

    return (
        <div style={{ ...fullScreen, overflow: 'hidden' }}>
            <svg
                width={COMP.width}
                height={COMP.height}
                viewBox={`0 0 ${COMP.width} ${COMP.height}`}
                style={fullScreen}
            >
                <defs>
                    <filter id="particle-glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {particles.map((p, i) => {
                    // Upward drift
                    const yOffset = (frame * p.speed) % COMP.height;
                    const y = ((p.y - yOffset + COMP.height) % COMP.height);

                    // Lateral sine wave
                    const lateralFreq = 0.01 + seededRandom(seed + i * 11) * 0.02;
                    const lateralAmp = 15 + seededRandom(seed + i * 13) * 25;
                    const lateralPhase = seededRandom(seed + i * 17) * Math.PI * 2;
                    const x = p.x + Math.sin(frame * lateralFreq + lateralPhase) * lateralAmp;

                    // Twinkle
                    const twinkle = Math.sin(
                        frame * (0.05 + seededRandom(seed + i * 19) * 0.1) +
                        seededRandom(seed + i * 23) * Math.PI * 2
                    );
                    const opacity = p.opacity * interpolate(twinkle, [-1, 1], [0.5, 1]);

                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={p.size}
                            fill={layerColor[p.layer]}
                            opacity={opacity}
                            filter={p.layer === 'near' ? 'url(#particle-glow)' : undefined}
                        />
                    );
                })}
            </svg>
        </div>
    );
};
