// GenLayer Brand Colors
export const COLORS = {
    // Backgrounds
    bgPrimary: '#0A0A0A',
    bgSecondary: '#111111',
    bgTertiary: '#1A1A2E',

    // Text
    textPrimary: '#FFFFFF',
    textSecondary: '#E5E7EB',
    textMuted: '#9CA3AF',
    textDim: '#6B7280',

    // Accent - Primary (Purple)
    accentPrimary: '#8B5CF6',
    accentPrimaryLight: '#A78BFA',
    accentPrimaryDark: '#7C3AED',
    accentPrimaryGlow: 'rgba(139, 92, 246, 0.25)',
    accentPrimarySubtle: 'rgba(139, 92, 246, 0.08)',

    // Accent - Secondary (Blue)
    accentSecondary: '#3B82F6',
    accentSecondaryLight: '#60A5FA',
    accentSecondaryGlow: 'rgba(59, 130, 246, 0.20)',

    // Accent - Tertiary (Teal)
    accentTertiary: '#14B8A6',
    accentTertiaryGlow: 'rgba(20, 184, 166, 0.20)',

    // Neural Network
    neuralNode: 'rgba(139, 92, 246, 0.6)',
    neuralConnection: 'rgba(139, 92, 246, 0.15)',
    neuralPulse: 'rgba(139, 92, 246, 0.8)',

    // Particles
    particleNear: 'rgba(139, 92, 246, 0.5)',
    particleMid: 'rgba(59, 130, 246, 0.3)',
    particleFar: 'rgba(255, 255, 255, 0.15)',

    // Signal
    signalWave: '#8B5CF6',
    signalGlow: 'rgba(139, 92, 246, 0.4)',

    // Overlays
    vignette: 'rgba(0, 0, 0, 0.7)',
    filmGrain: 'rgba(255, 255, 255, 0.03)',
} as const;

export type ColorKey = keyof typeof COLORS;
