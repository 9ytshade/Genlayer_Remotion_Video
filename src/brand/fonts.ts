import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

export const FONTS = {
    primary: 'Inter',
    weights: {
        regular: 500,
        medium: 600,
        bold: 800,
        black: 900,
    },
    sizes: {
        display: 140,
        h1: 100,
        h2: 72,
        h3: 56,
        h4: 42,
        body: 38,
        caption: 18,
        small: 28,
        label: 16,
    },
    lineHeights: {
        tight: 1.1,
        normal: 1.4,
        relaxed: 1.6,
    },
} as const;
