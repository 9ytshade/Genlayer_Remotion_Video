import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS } from '../brand/colors';
import { COMP } from '../brand/tokens';
import { seededRandom } from '../utils/interpolations';
import { fullScreen } from '../utils/types';

interface NeuralNetworkProps {
    nodeCount?: number;
    connectionDensity?: number;
    intensity?: number;
    seed?: number;
}

interface Node {
    x: number;
    y: number;
    baseRadius: number;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
    nodeCount = 35,
    connectionDensity = 0.12,
    intensity = 1,
    seed = 42,
}) => {
    const frame = useCurrentFrame();

    const nodes = useMemo<Node[]>(() => {
        return Array.from({ length: nodeCount }, (_, i) => ({
            x: seededRandom(seed + i * 3) * COMP.width,
            y: seededRandom(seed + i * 3 + 1) * COMP.height,
            baseRadius: 2 + seededRandom(seed + i * 3 + 2) * 3,
        }));
    }, [nodeCount, seed]);

    const connections = useMemo(() => {
        const conns: { from: number; to: number; dist: number }[] = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (seededRandom(seed + i * 100 + j) < connectionDensity) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 400) {
                        conns.push({ from: i, to: j, dist });
                    }
                }
            }
        }
        return conns;
    }, [nodes, connectionDensity, seed]);

    return (
        <div style={{ ...fullScreen, overflow: 'hidden' }}>
            <svg
                width={COMP.width}
                height={COMP.height}
                viewBox={`0 0 ${COMP.width} ${COMP.height}`}
                style={fullScreen}
            >
                {/* Connections */}
                {connections.map((conn, i) => {
                    const pulsePhase = seededRandom(seed + i * 7) * Math.PI * 2;
                    const pulseSpeed = 0.02 + seededRandom(seed + i * 11) * 0.03;
                    const pulse = Math.sin(frame * pulseSpeed + pulsePhase);
                    const opacity =
                        interpolate(pulse, [-1, 1], [0.03, 0.15]) *
                        intensity *
                        interpolate(conn.dist, [0, 400], [1, 0.2]);

                    // Traveling light along connection
                    const travelProgress =
                        ((frame * (0.3 + seededRandom(seed + i * 13) * 0.5) + seededRandom(seed + i * 17) * 300) %
                            conn.dist) /
                        conn.dist;

                    const fromNode = nodes[conn.from];
                    const toNode = nodes[conn.to];
                    const lightX = fromNode.x + (toNode.x - fromNode.x) * travelProgress;
                    const lightY = fromNode.y + (toNode.y - fromNode.y) * travelProgress;

                    return (
                        <g key={`conn-${i}`}>
                            <line
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                stroke={COLORS.accentPrimary}
                                strokeWidth={0.5}
                                opacity={opacity}
                            />
                            <circle
                                cx={lightX}
                                cy={lightY}
                                r={1.5}
                                fill={COLORS.accentPrimaryLight}
                                opacity={opacity * 2}
                            />
                        </g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => {
                    const breathPhase = seededRandom(seed + i * 5) * Math.PI * 2;
                    const breathSpeed = 0.03 + seededRandom(seed + i * 9) * 0.02;
                    const breath = Math.sin(frame * breathSpeed + breathPhase);
                    const radius = node.baseRadius + breath * 1.5;
                    const opacity =
                        interpolate(breath, [-1, 1], [0.3, 0.7]) * intensity;

                    return (
                        <g key={`node-${i}`}>
                            {/* Glow */}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={radius * 3}
                                fill={COLORS.accentPrimary}
                                opacity={opacity * 0.1}
                            />
                            {/* Core */}
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={radius}
                                fill={COLORS.accentPrimary}
                                opacity={opacity}
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};
