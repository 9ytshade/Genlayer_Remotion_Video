import React from 'react';
import { Img } from 'remotion';
import { TypewriterText } from '../animations/TypewriterText';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { SPACING } from '../brand/tokens';

export const SocialPill: React.FC<{ label: string; color: string; theme?: 'light' | 'dark'; typewriter?: boolean }> = ({
    label,
    color,
    theme = 'dark',
    typewriter = false,
}) => {
    const isLight = theme === 'light';
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24, // SPACING.md
                background: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${color}${isLight ? 'B3' : '60'}`, // Increased thickness and opacity
                padding: `16px 32px`, // SPACING.sm SPACING.lg
                borderRadius: 50,
                boxShadow: isLight ? `0 4px 15px ${color}30` : `0 4px 20px ${color}10`,
            }}
        >
            {typewriter ? (
                <TypewriterText
                    text={label}
                    startFrame={80}
                    framesPerChar={1}
                    style={{
                        fontSize: 28,
                        fontWeight: FONTS.weights.medium,
                        color: isLight ? '#000' : COLORS.textSecondary,
                        letterSpacing: 1,
                    }}
                />
            ) : (
                <span
                    style={{
                        fontSize: 28,
                        fontWeight: FONTS.weights.medium,
                        color: isLight ? '#000' : COLORS.textSecondary,
                        letterSpacing: 1,
                    }}
                >
                    {label}
                </span>
            )}
        </div>
    );
};
