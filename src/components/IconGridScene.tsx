import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
    Img,
    random,
} from 'remotion';
import { TypewriterText } from '../animations/TypewriterText';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { LAYOUT, SPACING } from '../brand/tokens';
import { stagger } from '../utils/interpolations';

export interface IconGridItem {
    emoji: string;
    logoUrl?: string;
    label: string;
    sublabel?: string;
    color?: string;
}

interface IconGridSceneProps {
    heading: string;
    items: IconGridItem[];
    columns?: 2 | 3 | 4;
    accentColor?: string;
    theme?: 'light' | 'dark';
    verticalCenter?: boolean;
    durationInFrames?: number;
}

/**
 * Animated emoji/icon grid scene.
 * Items fly in with a stagger from the bottom.
 */
export const IconGridScene: React.FC<IconGridSceneProps> = ({
    heading,
    items,
    columns = 3,
    accentColor = COLORS.accentPrimary,
    theme = 'dark',
    verticalCenter = false,
    durationInFrames,
}) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill
            style={{
                padding: LAYOUT.contentPadding,
                paddingTop: verticalCenter ? undefined : 80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: verticalCenter ? 'center' : 'flex-start',
                gap: SPACING.xl,
            }}
        >
            {/* Heading */}
            <div style={{ textAlign: 'center', width: '100%' }}>
                    <TypewriterText
                        text={heading}
                        startFrame={5}
                        framesPerChar={1}
                        style={{
                            fontFamily: FONTS.primary,
                            fontSize: FONTS.sizes.h2,
                            fontWeight: FONTS.weights.black,
                            color: theme === 'light' ? '#000' : COLORS.textPrimary,
                            textAlign: 'center',
                        }}
                    />
            </div>

            {/* Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: SPACING.lg,
                }}
            >
                {items.map((item, i) => {
                    // Increased stagger delay from 8 to 18
                    const delay = stagger(i, 18) + 20;
                    
                    const exitDuration = 15;
                    const exitStagger = 5;
                    // Start exiting items in reverse order 25 frames before the end
                    const exitDelay = durationInFrames ? durationInFrames - 25 - exitStagger * (items.length - 1 - i) : Infinity;

                    // Randomize directions for entry and exit
                    const entryAngle = random(`enter-${heading}-${i}`) * Math.PI * 2;
                    const exitAngle = random(`exit-${heading}-${i}`) * Math.PI * 2;
                    
                    const startX = Math.cos(entryAngle) * 300;
                    const startY = Math.sin(entryAngle) * 300;
                    const endX = Math.cos(exitAngle) * 300;
                    const endY = Math.sin(exitAngle) * 300;

                    const entryOpacity = interpolate(
                        frame,
                        [delay, delay + 15],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
                    );
                    const exitOpacity = interpolate(
                        frame,
                        [exitDelay, exitDelay + exitDuration],
                        [1, 0],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) }
                    );
                    const opacity = Math.min(entryOpacity, exitOpacity);

                    const translateYEntry = interpolate(frame, [delay, delay + 15], [startY, 0], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)
                    });
                    const translateYExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [0, endY], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)
                    });
                    const translateY = frame > exitDelay ? translateYExit : translateYEntry;

                    const translateXEntry = interpolate(frame, [delay, delay + 15], [startX, 0], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)
                    });
                    const translateXExit = interpolate(frame, [exitDelay, exitDelay + exitDuration], [0, endX], {
                        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)
                    });
                    const translateX = frame > exitDelay ? translateXExit : translateXEntry;

                    const entryScale = interpolate(
                        frame,
                        [delay, delay + 15],
                        [0.85, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.5)) }
                    );
                    const exitScale = interpolate(
                        frame,
                        [exitDelay, exitDelay + exitDuration],
                        [1, 0.85],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) }
                    );
                    const scale = frame > exitDelay ? exitScale : entryScale;

                    const itemColor = item.color ?? accentColor;

                    return (
                        <div
                            key={i}
                            style={{
                                opacity,
                                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                                background: `linear-gradient(135deg, ${itemColor}18, ${itemColor}08)`,
                                border: `1px solid ${itemColor}40`,
                                borderRadius: 16,
                                padding: `${SPACING.lg}px`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: SPACING.sm,
                                textAlign: 'center',
                                backdropFilter: 'blur(8px)',
                            }}
                        >
                            {/* Emoji or Logo */}
                            {item.logoUrl ? (
                                <Img 
                                    src={item.logoUrl} 
                                    style={{ 
                                        width: 64, 
                                        height: 64, 
                                        objectFit: 'contain',
                                        borderRadius: 8,
                                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
                                    }} 
                                />
                            ) : (
                                <div style={{ fontSize: 52, lineHeight: 1 }}>{item.emoji}</div>
                            )}

                            {/* Label */}
                            <TypewriterText
                                text={item.label}
                                startFrame={delay + 10}
                                framesPerChar={1}
                                style={{
                                    fontFamily: FONTS.primary,
                                    fontSize: FONTS.sizes.body,
                                    fontWeight: FONTS.weights.bold,
                                    color: theme === 'light' ? '#000' : COLORS.textPrimary,
                                    lineHeight: 1.2,
                                }}
                            />

                            {/* Sublabel */}
                            {item.sublabel && (
                                <TypewriterText
                                    text={item.sublabel}
                                    startFrame={delay + 20}
                                    framesPerChar={0.8}
                                    style={{
                                        fontFamily: FONTS.primary,
                                        fontSize: FONTS.sizes.small,
                                        fontWeight: FONTS.weights.regular,
                                        color: theme === 'light' ? '#444' : COLORS.textSecondary,
                                        lineHeight: 1.4,
                                        minHeight: 40, // Reserve space to avoid layout jumps
                                    }}
                                />
                            )}

                            {/* Accent bar */}
                            <div
                                style={{
                                    width: 36,
                                    height: 3,
                                    borderRadius: 2,
                                    background: itemColor,
                                    boxShadow: `0 0 10px ${itemColor}`,
                                    marginTop: SPACING.xs,
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
