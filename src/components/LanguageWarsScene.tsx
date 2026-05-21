import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Easing,
} from 'remotion';
import { MaskedTextReveal } from '../animations/MaskedTextReveal';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { SPACING } from '../brand/tokens';

const SOLIDITY_CODE = [
    'pragma solidity ^0.8.0;',
    '',
    'interface IERC20 {',
    '  function transfer(',
    '    address recipient,',
    '    uint256 amount',
    '  ) external returns (bool);',
    '  function allowance(',
    '    address owner,',
    '    address spender',
    '  ) external view returns (uint256);',
    '}',
    '',
    '// 200 more lines...',
];

const PYTHON_CODE = [
    'from genlayer import *',
    '',
    'class MyContract(IContract):',
    '',
    '  def transfer(self,',
    '    to: str, amount: int):',
    '    # Just works ✓',
    '    self.balances[to] += amount',
    '',
    '  @gl.public.view',
    '  def get_balance(self) -> int:',
    '    return self.balance',
];

const CodeLine: React.FC<{
    line: string;
    frame: number;
    startFrame: number;
    isSolidity: boolean;
}> = ({ line, frame, startFrame, isSolidity }) => {
    const opacity = interpolate(frame, [startFrame, startFrame + 8], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    const translateX = interpolate(frame, [startFrame, startFrame + 8], [isSolidity ? -16 : 16, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });

    // Syntax highlighting helpers
    const isComment = line.trim().startsWith('//') || line.trim().startsWith('#');
    const isKeyword = /\b(pragma|solidity|interface|function|external|returns|view|from|import|class|def|return|self)\b/.test(line);
    const color = isComment
        ? COLORS.textMuted
        : isSolidity
            ? COLORS.textSecondary
            : COLORS.textPrimary;

    return (
        <div
            style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                fontFamily: 'monospace',
                fontSize: 20,
                lineHeight: 1.7,
                color,
                whiteSpace: 'pre',
                minHeight: 20,
            }}
        >
            {line || '\u00a0'}
        </div>
    );
};

const CodePanel: React.FC<{
    title: string;
    badge: string;
    lines: string[];
    startFrame: number;
    isSolidity: boolean;
    borderColor: string;
    bgColor: string;
}> = ({ title, badge, lines, startFrame, isSolidity, borderColor, bgColor }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const translateX = interpolate(frame, [startFrame, startFrame + 18], [isSolidity ? -50 : 50, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
    });
    const glowPulse = isSolidity ? 0 : interpolate(
        frame,
        [startFrame + 20, startFrame + 50, startFrame + 80],
        [0.5, 1, 0.5],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin) }
    );

    return (
        <div
            style={{
                flex: 1,
                opacity,
                transform: `translateX(${translateX}px)`,
                background: bgColor,
                border: `2px solid ${borderColor}`,
                borderRadius: 20,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isSolidity ? 'none' : `0 0 ${40 * glowPulse}px ${borderColor}50, 0 0 ${80 * glowPulse}px ${borderColor}20`,
            }}
        >
            {/* Title bar */}
            <div
                style={{
                    padding: `${SPACING.md}px ${SPACING.lg}px`,
                    background: isSolidity ? `${borderColor}15` : `${borderColor}20`,
                    borderBottom: `1px solid ${borderColor}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: SPACING.md,
                }}
            >
                {/* Traffic lights */}
                <div style={{ display: 'flex', gap: 8 }}>
                    {['#FF5F56', '#FFBD2E', '#27C93F'].map((c, i) => (
                        <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: isSolidity ? `${c}60` : c }} />
                    ))}
                </div>
                <div style={{
                    fontFamily: FONTS.primary,
                    fontSize: FONTS.sizes.caption,
                    fontWeight: FONTS.weights.bold,
                    color: isSolidity ? COLORS.textMuted : COLORS.textPrimary,
                    letterSpacing: 1,
                }}>
                    {title}
                </div>
                <div style={{
                    background: borderColor,
                    color: isSolidity ? COLORS.textPrimary : COLORS.bgPrimary,
                    fontFamily: FONTS.primary,
                    fontSize: 14,
                    fontWeight: FONTS.weights.bold,
                    padding: '3px 12px',
                    borderRadius: 99,
                    letterSpacing: 1,
                }}>
                    {badge}
                </div>
            </div>

            {/* Code body */}
            <div
                style={{
                    padding: `${SPACING.lg}px ${SPACING.xl}px`,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                {lines.map((line, i) => (
                    <CodeLine
                        key={i}
                        line={line}
                        frame={frame}
                        startFrame={startFrame + 15 + i * 3}
                        isSolidity={isSolidity}
                    />
                ))}
            </div>
        </div>
    );
};

/** Language Wars — Solidity vs Python split panel */
export const LanguageWarsScene: React.FC = () => {
    const frame = useCurrentFrame();

    const vsOpacity = interpolate(frame, [30, 45], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    const vsScale = interpolate(frame, [30, 45], [0.5, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        easing: Easing.out(Easing.back(2)),
    });

    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '70px 100px',
                gap: SPACING.xl,
            }}
        >
            {/* Heading */}
            <MaskedTextReveal
                text="Solidity is Hard"
                startFrame={3}
                duration={16}
                fontSize={FONTS.sizes.h2}
                fontWeight={FONTS.weights.bold}
            />

            {/* Two panels */}
            <div style={{ display: 'flex', gap: SPACING.xl, flex: 1, alignItems: 'stretch' }}>
                {/* Left — Solidity (cold) */}
                <CodePanel
                    title="Token.sol"
                    badge="Solidity"
                    lines={SOLIDITY_CODE}
                    startFrame={10}
                    isSolidity
                    borderColor={COLORS.textMuted}
                    bgColor="linear-gradient(135deg, #0d0d0d, #111118)"
                />

                {/* VS badge */}
                <div
                    style={{
                        opacity: vsOpacity,
                        transform: `scale(${vsScale})`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: SPACING.sm,
                        flexShrink: 0,
                        width: 80,
                    }}
                >
                    <div style={{
                        fontFamily: FONTS.primary,
                        fontSize: 28,
                        fontWeight: 900,
                        color: COLORS.accentSecondary,
                        textShadow: `0 0 20px ${COLORS.accentSecondary}`,
                        letterSpacing: -1,
                    }}>VS</div>
                    <div style={{ width: 2, flex: 1, background: `linear-gradient(180deg, ${COLORS.accentSecondary}40, transparent)` }} />
                </div>

                {/* Right — Python (vibrant) */}
                <CodePanel
                    title="contract.py"
                    badge="Python"
                    lines={PYTHON_CODE}
                    startFrame={20}
                    isSolidity={false}
                    borderColor={COLORS.accentTertiary}
                    bgColor={`linear-gradient(135deg, ${COLORS.accentTertiary}12, ${COLORS.accentPrimary}08)`}
                />
            </div>

            {/* Bottom label */}
            {(() => {
                const labelOpacity = interpolate(frame, [85, 100], [0, 1], {
                    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                });
                return (
                    <div style={{
                        opacity: labelOpacity,
                        textAlign: 'center',
                        fontFamily: FONTS.primary,
                        fontSize: FONTS.sizes.body,
                        color: COLORS.textMuted,
                    }}>
                        GenLayer changes this {' '}
                        <span style={{ color: COLORS.accentTertiary, fontWeight: FONTS.weights.bold }}>
                            if you know Python, you are already a GenLayer developer.
                        </span>
                    </div>
                );
            })()}
        </AbsoluteFill>
    );
};
