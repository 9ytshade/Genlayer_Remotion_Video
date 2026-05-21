import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
    random,
} from 'remotion';
import { MaskedTextReveal } from '../animations/MaskedTextReveal';
import { TypewriterText } from '../animations/TypewriterText';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { LAYOUT, SPACING } from '../brand/tokens';
import { stagger } from '../utils/interpolations';

export interface TimelineStep {
    label: string;
    title: string;
    description: string;
    color?: string;
    emoji?: string;
    status?: 'done' | 'active' | 'upcoming';
}
interface TimelineSceneProps {
    heading: string;
    steps: TimelineStep[];
    accentColor?: string;
    theme?: 'light' | 'dark';
    durationInFrames?: number;
    startIndex?: number;
}

/**
 * Winding Roadmap scene.
 * SVG-based path with pins placed along the curve.
 */
/**
 * Serpentine Loop Roadmap scene.
 * SVG-based serpentine path with circular nodes and leader lines.
 */
export const TimelineScene: React.FC<TimelineSceneProps> = ({
    heading,
    steps = [],
    accentColor = COLORS.accentPrimary,
    theme = 'dark',
    durationInFrames,
    startIndex = 1,
}) => {
    const frame = useCurrentFrame();
    
    // Core Layout Metrics - Dynamic based on step count
    const isSmall = steps.length <= 2;
    const isMedium = steps.length === 3;
    
    const rowHeight = isSmall ? 350 : isMedium ? 240 : 160;
    const startY = isSmall ? 350 : isMedium ? 300 : 280;
    const paddingX = isSmall ? 350 : 450;
    const width = 1920;
    const textWidth = isSmall ? 600 : 380;
    const titleSize = isSmall ? 36 : 24;
    const descSize = isSmall ? 28 : 20;
    
    // Calculate coordinates for a zig-zag flow
    const nodes = steps.map((_, i) => {
        const isOddRow = i % 2 !== 0;
        return {
            x: isOddRow ? width - paddingX : paddingX,
            y: startY + i * rowHeight,
            side: isOddRow ? 'right' : 'left'
        };
    });

    // Create the serpentine path string using Arcs
    let pathD = `M 100 ${startY} H ${nodes[0].x}`;
    nodes.forEach((node, i) => {
        if (i < nodes.length - 1) {
            const radius = rowHeight / 2;
            const sweep = node.side === 'left' ? 1 : 0;
            pathD += ` A ${radius} ${radius} 0 0 ${sweep} ${node.x} ${node.y + rowHeight} H ${nodes[i+1].x}`;
        } else {
            // Finish line extension
            pathD += ` H ${width - 100}`;
        }
    });

    const pathLength = 4000;
    const roadProgress = interpolate(frame, [10, 180], [pathLength, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.4, 0, 0.2, 1),
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: theme === 'light' ? '#F8F9FA' : '#0A0A0A',
            }}
        >
            {/* Header Area */}
            <div style={{ position: 'absolute', top: 40, width: '100%', textAlign: 'center', zIndex: 100 }}>
                <TypewriterText
                    text={heading}
                    startFrame={5}
                    framesPerChar={1}
                    fontSize={52}
                    fontWeight={FONTS.weights.black}
                    color={theme === 'light' ? '#333' : COLORS.textPrimary}
                    style={{ textTransform: 'uppercase', letterSpacing: 4 }}
                />
                <div style={{ height: 4, width: 180, background: accentColor, margin: '15px auto' }} />
            </div>

            {/* Labels */}
            <div style={{ 
                position: 'absolute', 
                top: startY - 50, 
                left: 100, 
                fontFamily: FONTS.primary, 
                fontSize: 42, 
                fontWeight: '900', 
                color: theme === 'light' ? '#DDD' : '#222',
                letterSpacing: 8
            }}>START</div>
            <div style={{ 
                position: 'absolute', 
                top: nodes[nodes.length-1].y - 50, 
                right: 100, 
                fontFamily: FONTS.primary, 
                fontSize: 42, 
                fontWeight: '900', 
                color: theme === 'light' ? '#DDD' : '#222',
                letterSpacing: 8
            }}>FINISH</div>

            {/* SVG Background Road */}
            <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', top: 0, left: 0 }}>
                {/* Road Base */}
                <path
                    d={pathD}
                    fill="none"
                    stroke={theme === 'light' ? '#E9ECEF' : '#1A1A1A'}
                    strokeWidth="130"
                    strokeLinecap="round"
                />
                {/* Dashed Center line */}
                <path
                    d={pathD}
                    fill="none"
                    stroke={theme === 'light' ? '#DEE2E6' : '#333'}
                    strokeWidth="4"
                    strokeDasharray="25, 30"
                    strokeDashoffset={roadProgress}
                    strokeLinecap="round"
                />
            </svg>

            {/* Step Nodes & Leader Lines */}
            {steps.map((step, i) => {
                const node = nodes[i];
                const delay = 40 + i * 40; // Increased stagger from 25 to 40
                const stepColor = step.color ?? accentColor;
                const isRight = node.side === 'right';
                
                // Randomize entry and exit angles
                const entryAngle = random(`timeline-enter-${heading}-${i}`) * Math.PI * 2;
                const exitAngle = random(`timeline-exit-${heading}-${i}`) * Math.PI * 2;
                
                const startX = Math.cos(entryAngle) * 300;
                const startY = Math.sin(entryAngle) * 300;
                const endX = Math.cos(exitAngle) * 300;
                const endY = Math.sin(exitAngle) * 300;

                const nodeScaleEntry = interpolate(frame, [delay, delay + 15], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.back(1.5),
                });
                const contentOpacityEntry = interpolate(frame, [delay + 12, delay + 25], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                });

                const exitDuration = 15;
                const exitStagger = 8;
                const exitDelay = durationInFrames ? durationInFrames - 25 - exitStagger * (steps.length - 1 - i) : Infinity;

                const nodeScaleExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.in(Easing.back(1.5)),
                });
                const contentOpacityExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                });

                const nodeScale = frame > exitDelay ? nodeScaleExit : nodeScaleEntry;
                const contentOpacity = Math.min(contentOpacityEntry, contentOpacityExit);

                const translateXEntry = interpolate(frame, [delay, delay + 15], [startX, 0], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)
                });
                const translateYEntry = interpolate(frame, [delay, delay + 15], [startY, 0], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)
                });
                const translateXExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [0, endX], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)
                });
                const translateYExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [0, endY], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)
                });

                const translateX = frame > exitDelay ? translateXExit : translateXEntry;
                const translateY = frame > exitDelay ? translateYExit : translateYEntry;

                return (
                    <div key={i}>
                        {/* Circular Node Container */}
                        <div style={{
                            position: 'absolute',
                            left: node.x,
                            top: node.y,
                            transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${nodeScale})`,
                            zIndex: 50,
                        }}>
                            <div style={{
                                width: 150,
                                height: 150,
                                background: '#FFF',
                                borderRadius: '50%',
                                border: `12px solid ${stepColor}`,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.12), inset 0 0 15px rgba(0,0,0,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <div style={{ fontSize: 68, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
                                    {step.emoji || i + startIndex}
                                </div>
                            </div>
                        </div>

                        {/* Leader Line SVG */}
                        <svg width="600" height="200" style={{
                            position: 'absolute',
                            left: isRight ? node.x - 550 : node.x + 80,
                            top: node.y - 100,
                            opacity: contentOpacity,
                            overflow: 'visible',
                            zIndex: 40
                        }}>
                            <line 
                                x1={isRight ? 450 : 0} 
                                y1="100" 
                                x2={isRight ? 350 : 100} 
                                y2="60" 
                                stroke={stepColor} 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                            />
                            <line 
                                x1={isRight ? 350 : 100} 
                                y1="60" 
                                x2={isRight ? 0 : 450} 
                                y2="60" 
                                stroke={stepColor} 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                            />
                            <circle cx={isRight ? 0 : 450} cy="60" r="8" fill={stepColor} />
                        </svg>

                        {/* Text Content */}
                        <div style={{
                            position: 'absolute',
                            left: isRight ? node.x - (isSmall ? 750 : 550) : node.x + 180,
                            top: node.y - 120,
                            width: textWidth,
                            textAlign: isRight ? 'right' : 'left',
                            opacity: contentOpacity,
                            fontFamily: FONTS.primary,
                            zIndex: 60
                        }}>
                            <TypewriterText
                                text={step.title}
                                startFrame={delay + 10}
                                framesPerChar={1}
                                style={{
                                    fontSize: titleSize,
                                    fontWeight: FONTS.weights.black,
                                    color: stepColor,
                                    textTransform: 'uppercase',
                                    marginBottom: 12,
                                    letterSpacing: 2
                                }}
                            />
                            <TypewriterText
                                text={step.description}
                                startFrame={delay + 20}
                                framesPerChar={0.8}
                                style={{
                                    fontSize: descSize,
                                    fontWeight: FONTS.weights.black, // Bolder
                                    color: theme === 'light' ? '#212529' : '#F8F9FA',
                                    lineHeight: 1.3,
                                    minHeight: 100 // Pre-allocate height
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
