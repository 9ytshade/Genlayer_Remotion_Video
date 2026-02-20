import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { FONTS } from '../brand/fonts';
import { COLORS } from '../brand/colors';
import { HighlightedWord } from '../utils/types';

interface AccentTextProps {
    text: string;
    highlights: HighlightedWord[];
    startFrame?: number;
    duration?: number;
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    lineHeight?: number;
    style?: React.CSSProperties;
}

export const AccentText: React.FC<AccentTextProps> = ({
    text,
    highlights,
    startFrame = 0,
    duration = 18,
    fontSize = FONTS.sizes.body,
    fontWeight = FONTS.weights.regular,
    color = COLORS.textSecondary,
    lineHeight = FONTS.lineHeights.relaxed,
    style,
}) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(
        frame,
        [startFrame, startFrame + duration],
        [0, 1],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
        }
    );

    const translateY = interpolate(
        frame,
        [startFrame, startFrame + duration],
        [20, 0],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
        }
    );

    // Split text and apply highlights
    const renderText = () => {
        let remaining = text;
        const elements: React.ReactNode[] = [];
        let keyIndex = 0;

        while (remaining.length > 0) {
            let earliestMatch: { index: number; word: string; color: string } | null = null;

            for (const h of highlights) {
                const idx = remaining.toLowerCase().indexOf(h.word.toLowerCase());
                if (idx !== -1 && (earliestMatch === null || idx < earliestMatch.index)) {
                    earliestMatch = { index: idx, word: h.word, color: h.color };
                }
            }

            if (earliestMatch === null) {
                elements.push(<span key={keyIndex++}>{remaining}</span>);
                break;
            }

            // Text before match
            if (earliestMatch.index > 0) {
                elements.push(
                    <span key={keyIndex++}>
                        {remaining.slice(0, earliestMatch.index)}
                    </span>
                );
            }

            // Matched word with accent
            const matchedText = remaining.slice(
                earliestMatch.index,
                earliestMatch.index + earliestMatch.word.length
            );

            // Glow animation for highlighted words
            const glowIntensity = Math.sin(frame * 0.05) * 0.3 + 0.7;

            elements.push(
                <span
                    key={keyIndex++}
                    style={{
                        color: earliestMatch.color,
                        fontWeight: FONTS.weights.medium,
                        textShadow: `0 0 ${20 * glowIntensity}px ${earliestMatch.color}40`,
                    }}
                >
                    {matchedText}
                </span>
            );

            remaining = remaining.slice(
                earliestMatch.index + earliestMatch.word.length
            );
        }

        return elements;
    };

    return (
        <div
            style={{
                fontFamily: FONTS.primary,
                fontSize,
                fontWeight,
                color,
                lineHeight,
                opacity,
                transform: `translateY(${translateY}px)`,
                maxWidth: 1200,
                willChange: 'transform, opacity',
                ...style,
            }}
        >
            {renderText()}
        </div>
    );
};
