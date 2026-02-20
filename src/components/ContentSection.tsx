import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    Img,
    staticFile,
    interpolate,
    Easing,
} from 'remotion';
import { MaskedTextReveal } from '../animations/MaskedTextReveal';
import { AccentText } from '../animations/AccentText';
import { COLORS } from '../brand/colors';
import { FONTS } from '../brand/fonts';
import { LAYOUT, SPACING } from '../brand/tokens';
import { HighlightedWord } from '../utils/types';
import { stagger } from '../utils/interpolations';

interface ContentSectionProps {
    heading: string;
    bodyLines: string[];
    highlights?: HighlightedWord[];
    imagePath?: string;
    imagePosition?: 'right' | 'left' | 'bottom';
    bulletPoints?: string[];
    durationInFrames?: number;
    imageStyle?: React.CSSProperties;
}

/**
 * Main content section scene.
 * Left-aligned heading with masked reveal, body text appearing sequentially.
 * Optional image on the right. AccentText for key terms.
 */
export const ContentSection: React.FC<ContentSectionProps> = ({
    heading,
    bodyLines,
    highlights = [],
    imagePath,
    imagePosition = 'right',
    bulletPoints,
    durationInFrames,
    imageStyle,
}) => {
    const frame = useCurrentFrame();

    const hasImage = !!imagePath;
    const contentWidth = hasImage && imagePosition !== 'bottom' ? '50%' : '80%';

    // Exit timing (if duration provided)
    const exitStart = durationInFrames ? durationInFrames - 30 : 99999;

    // Calculate global exit opacity for the container or individual items
    // We'll stagger exit reverse of entrance?
    // Entrance: Heading -> Body -> Bullets
    // Exit: Bullets -> Body -> Heading

    // Heading Animation
    const headingExit = interpolate(frame, [exitStart + 15, exitStart + 25], [1, 0], { extrapolateRight: 'clamp' });
    const headingOpacity = Math.min(1, headingExit); // Entrance handled by MaskedTextReveal internal? No, it handles its own. 
    // MaskedTextReveal doesn't support exit prop easily without modification.
    // So we wrap it in a div that handles exit opacity.

    // Image matches heading exit
    const imageExitOpacity = interpolate(frame, [exitStart + 10, exitStart + 30], [1, 0], { extrapolateRight: 'clamp' });

    // Image animation
    const imageEnterOpacity = interpolate(frame, [20, 45], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const imageOpacity = Math.min(imageEnterOpacity, imageExitOpacity);

    const imageScale = interpolate(frame, [20, 45], [0.95, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });


    return (
        <AbsoluteFill
            style={{
                padding: LAYOUT.contentPadding,
                display: 'flex',
                flexDirection: imagePosition === 'bottom' ? 'column' : 'row',
                alignItems: imagePosition === 'bottom' ? 'center' : 'center',
                gap: SPACING.xxl,
            }}
        >
            {/* Text content */}
            <div
                style={{
                    flex: 1,
                    maxWidth: contentWidth,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: SPACING.md,
                }}
            >
                {/* Heading */}
                <div style={{ opacity: headingOpacity }}>
                    <MaskedTextReveal
                        text={heading}
                        startFrame={5}
                        duration={20}
                        fontSize={FONTS.sizes.h2}
                        fontWeight={FONTS.weights.bold}
                    />
                </div>

                {/* Body lines */}
                {bodyLines.map((line, i) => {
                    const lineExitDelay = stagger(bodyLines.length - 1 - i, 5); // Reverse order
                    const lineExit = interpolate(frame, [exitStart + lineExitDelay, exitStart + lineExitDelay + 10], [1, 0], { extrapolateRight: 'clamp' });

                    return (
                        <div key={i} style={{ opacity: lineExit }}>
                            <AccentText
                                text={line}
                                highlights={highlights}
                                startFrame={30 + stagger(i, 12)}
                                duration={15}
                                fontSize={FONTS.sizes.body}
                                style={{ maxWidth: 900 }}
                            />
                        </div>
                    );
                })}

                {/* Bullet points */}
                {bulletPoints && bulletPoints.length > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: SPACING.sm,
                            marginTop: SPACING.md,
                        }}
                    >
                        {bulletPoints.map((point, i) => {
                            const bulletEnterOpacity = interpolate(
                                frame,
                                [
                                    50 + stagger(i, 10),
                                    65 + stagger(i, 10),
                                ],
                                [0, 1],
                                {
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp',
                                    easing: Easing.out(Easing.cubic),
                                }
                            );

                            const bulletExitDelay = stagger(bulletPoints.length - 1 - i, 5);
                            const bulletExitOpacity = interpolate(frame, [exitStart - 10 + bulletExitDelay, exitStart + bulletExitDelay], [1, 0], { extrapolateRight: 'clamp' });

                            const bulletOpacity = Math.min(bulletEnterOpacity, bulletExitOpacity);

                            const bulletX = interpolate(
                                frame,
                                [
                                    50 + stagger(i, 10),
                                    65 + stagger(i, 10),
                                ],
                                [20, 0],
                                {
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp',
                                    easing: Easing.out(Easing.cubic),
                                }
                            );

                            return (
                                <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: SPACING.sm,
                                        opacity: bulletOpacity,
                                        transform: `translateX(${bulletX}px)`,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: COLORS.accentPrimary,
                                            marginTop: 10,
                                            flexShrink: 0,
                                        }}
                                    />
                                    <AccentText
                                        text={point}
                                        highlights={highlights}
                                        startFrame={0}
                                        duration={1}
                                        fontSize={FONTS.sizes.body}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Image */}
            {hasImage && (
                <div
                    style={{
                        flex: imagePosition === 'bottom' ? undefined : 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: imageOpacity,
                        transform: `scale(${imageScale})`,
                    }}
                >
                    <Img
                        src={staticFile(imagePath!)}
                        style={{
                            maxWidth: imagePosition === 'bottom' ? 800 : '100%',
                            maxHeight: imagePosition === 'bottom' ? 300 : 700,
                            objectFit: 'contain',
                            borderRadius: 12,
                            boxShadow: `0 0 40px ${COLORS.accentPrimaryGlow}`,
                            ...imageStyle,
                        }}
                    />
                </div>
            )}
        </AbsoluteFill>
    );
};
