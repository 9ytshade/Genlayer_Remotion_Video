import React from 'react';
import { Img } from 'remotion';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { SPACING } from '../brand/tokens';

export const SocialPill: React.FC<{ label: string; color: string }> = ({ label, color }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24, // SPACING.md
            background: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${color}40`,
            padding: `16px 32px`, // SPACING.sm SPACING.lg
            borderRadius: 50,
            boxShadow: `0 4px 20px ${color}10`,
        }}
    >
        <span
            style={{
                fontSize: 28,
                fontWeight: FONTS.weights.medium,
                color: COLORS.textSecondary,
                letterSpacing: 1,
            }}
        >
            {label}
        </span>
    </div>
);
