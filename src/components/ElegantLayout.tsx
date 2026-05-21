import React from 'react';
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from 'remotion';
import { BokehBackground } from '../animations/BokehBackground';
import { CameraDrift } from '../animations/CameraDrift';
import { FilmGrain } from '../animations/FilmGrain';
import { Vignette } from '../animations/Vignette';
import { COLORS } from '../brand/colors';
import { fullScreen } from '../utils/types';

interface ElegantLayoutProps {
    children: React.ReactNode;
    showBokeh?: boolean;
    showDrift?: boolean;
    showGrain?: boolean;
    showVignette?: boolean;
    intensity?: number;
    accentColor?: string;
    secondaryColor?: string;
    watermarkLogo?: string;
}

/**
 * Elegant layout component wrapping scenes for Episodes 15-20.
 * Omits neural networks and particles in favor of smooth, cinematic bokeh.
 */
export const ElegantLayout: React.FC<ElegantLayoutProps> = ({
    children,
    showBokeh = true,
    showDrift = true,
    showGrain = true,
    showVignette = true,
    intensity = 1,
    accentColor = COLORS.accentPrimarySubtle,
    secondaryColor = COLORS.accentSecondaryGlow,
    watermarkLogo = 'assets/logos/Genlayer-noBG.png',
}) => {
    const frame = useCurrentFrame();

    const content = (
        <AbsoluteFill
            style={{
                backgroundColor: COLORS.bgPrimary,
            }}
        >
            {/* Elegant deep radial gradient */}
            <div
                style={{
                    ...fullScreen,
                    background: `radial-gradient(circle at 40% 30%, ${accentColor} 0%, transparent 70%),
                                 radial-gradient(circle at 60% 70%, ${secondaryColor} 0%, transparent 60%)`,
                    opacity: 0.8,
                }}
            />

            {/* Subtle Watermark Logo */}
            <AbsoluteFill
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.12, // Subtler for elegant design
                    zIndex: 0,
                }}
            >
                <Img
                    src={staticFile(watermarkLogo)}
                    style={{ 
                        width: '75%', 
                        height: 'auto',
                        objectFit: 'contain', 
                    }}
                />
            </AbsoluteFill>

            {/* Cinematic Bokeh layer */}
            {showBokeh && <BokehBackground intensity={intensity} accentColor={COLORS.accentPrimary} secondaryColor={COLORS.accentSecondary} />}

            {/* Content layer */}
            <AbsoluteFill>{children}</AbsoluteFill>

            {/* Mochi Everywhere (Bottom Right) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    opacity: 1,
                    zIndex: 50,
                    transform: 'rotate(-5deg)',
                }}
            >
                <Img
                    src={staticFile('assets/mochi/mochi.png')}
                    style={{ 
                        width: 140, 
                        height: 140, 
                        objectFit: 'contain',
                        filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.4))'
                    }}
                />
            </div>

            {/* Post-processing layers */}
            {showGrain && <FilmGrain />}
            {showVignette && <Vignette />}
        </AbsoluteFill>
    );

    // Apply a slower, more majestic drift for the elegant layout
    if (showDrift) {
        return (
            <AbsoluteFill style={{ backgroundColor: COLORS.bgPrimary }}>
                {/* Wrap in a container that moves slower than the default CameraDrift */}
                <div style={{ ...fullScreen, transform: `scale(1.05) translate(${Math.sin(frame / 600) * 1}%, ${Math.cos(frame / 600) * 1}%)` }}>
                    {content}
                </div>
            </AbsoluteFill>
        );
    }

    return content;
};
