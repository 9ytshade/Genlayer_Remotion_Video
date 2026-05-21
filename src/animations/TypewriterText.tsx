import React from 'react';
import { useCurrentFrame } from 'remotion';

interface TypewriterTextProps {
    text: string;
    startFrame: number;
    framesPerChar?: number;
    style?: React.CSSProperties;
    cursorStyle?: React.CSSProperties;
    hideCursorAfterDone?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    startFrame,
    framesPerChar = 1.5,
    style = {},
    cursorStyle = {},
    hideCursorAfterDone = true,
}) => {
    const frame = useCurrentFrame();

    if (frame < startFrame) {
        return <div style={{ ...style, opacity: 0 }}>{text}</div>; // Invisible placeholder for layout sizing
    }

    const elapsed = frame - startFrame;
    const charsToShow = Math.floor(elapsed / framesPerChar);
    const displayedText = text.slice(0, charsToShow);
    const isDone = charsToShow >= text.length;

    // Blinking cursor
    const cursorVisible = isDone && hideCursorAfterDone ? false : Math.floor(frame / 15) % 2 === 0;

    return (
        <div style={{ ...style, position: 'relative', display: 'inline-block' }}>
            {displayedText}
            <span
                style={{
                    opacity: cursorVisible ? 1 : 0,
                    transition: 'opacity 0.1s',
                    marginLeft: 2,
                    ...cursorStyle,
                }}
            >
                |
            </span>
            {/* Invisible full text to ensure the container always takes up the full final space */}
            <span style={{ visibility: 'hidden', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: 'max-content' }}>
                {text}
            </span>
        </div>
    );
};
