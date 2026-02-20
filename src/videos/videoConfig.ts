import { COMP, s } from '../brand/tokens';

export interface VideoEntry {
    id: string;
    title: string;
    description: string;
    durationInFrames: number;
    episode: number;
}

export const VIDEO_CONFIG: VideoEntry[] = [
    {
        id: 'Video01',
        title: 'What is GenLayer?',
        description: 'Overview of the Intelligent Blockchain - Intelligent Contracts, GenVM, Optimistic Democracy.',
        durationInFrames: s(120),
        episode: 1,
    },
    {
        id: 'Video02',
        title: 'Why Does GenLayer Exist?',
        description: 'The problem with static smart contracts and why AI-powered contracts are the evolution.',
        durationInFrames: s(120),
        episode: 2,
    },
    {
        id: 'Video03',
        title: 'What Are Intelligent Contracts?',
        description: 'AI-powered smart contracts that search the web, process language, and make decisions.',
        durationInFrames: s(120),
        episode: 3,
    },
    {
        id: 'Video04',
        title: 'GenVM: The Execution Engine',
        description: 'Deep dive into GenVM - the execution environment combining AI and blockchain.',
        durationInFrames: s(120),
        episode: 4,
    },
    {
        id: 'Video05',
        title: 'Optimistic Democracy',
        description: 'The AI-native consensus mechanism for subjective, non-deterministic decisions.',
        durationInFrames: s(120),
        episode: 5,
    },
    {
        id: 'Video06',
        title: 'The Equivalence Principle',
        description: 'How validators agree on outputs that are different but equivalent.',
        durationInFrames: s(120),
        episode: 6,
    },
    {
        id: 'Video07',
        title: 'Intelligent Oracles',
        description: 'Replacing traditional oracles with native AI-powered data access.',
        durationInFrames: s(120),
        episode: 7,
    },
    {
        id: 'Video08',
        title: 'Making AI on the Blockchain Safe',
        description: 'Security, greyboxing, multi-validator verification, and adversarial defense.',
        durationInFrames: s(120),
        episode: 8,
    },
    {
        id: 'Video09',
        title: '3 Use Cases That Will Disrupt dApps',
        description: 'Prediction markets, parametric insurance, and AI-powered DAOs.',
        durationInFrames: s(120),
        episode: 9,
    },
    {
        id: 'Video10',
        title: 'Decentralized Identity',
        description: 'Linking blockchain wallets to social media on-chain.',
        durationInFrames: s(120),
        episode: 10,
    },
    {
        id: 'Video11',
        title: 'How DAOs Become Fully Autonomous',
        description: 'AI-powered governance — DAOs that read and vote on natural language proposals.',
        durationInFrames: s(120),
        episode: 11,
    },
    {
        id: 'Video12',
        title: 'AI Reliability for Blockchain',
        description: 'How GenLayer makes AI trustworthy through multi-validator consensus.',
        durationInFrames: s(120),
        episode: 12,
    },
    {
        id: 'Video13',
        title: 'Code with Python & Natural Language',
        description: 'Developer experience — writing contracts in Python, GenLayer Studio.',
        durationInFrames: s(120),
        episode: 13,
    },
    {
        id: 'Video14',
        title: "GenLayer's Unique Approach to AI",
        description: 'Multi-model diversity vs single-model risk — decentralizing AI decision-making.',
        durationInFrames: s(120),
        episode: 14,
    },
    {
        id: 'Video15',
        title: 'The Future of AI and Crypto',
        description: 'Vision for AI-powered commerce and the convergence of AI + blockchain.',
        durationInFrames: s(120),
        episode: 15,
    },
    {
        id: 'Video16',
        title: 'Trust in the AI Age',
        description: 'What trust means for AI systems and why GenLayer is trust infrastructure.',
        durationInFrames: s(120),
        episode: 16,
    },
    {
        id: 'Video17',
        title: '10 Reasons to Be Excited',
        description: 'Comprehensive value proposition — from new DeFi primitives to AI commerce.',
        durationInFrames: s(120),
        episode: 17,
    },
    {
        id: 'Video18',
        title: 'Roadmap to Mainnet',
        description: 'Testnets Asimov, Bradbury, Clarke — the path to production.',
        durationInFrames: s(120),
        episode: 18,
    },
    {
        id: 'Video19',
        title: 'GenLayer Partnerships',
        description: 'ZKsync, io.net, LibertAI, Atoma, Gaia, Caldera — building the ecosystem.',
        durationInFrames: s(120),
        episode: 19,
    },
    {
        id: 'Video20',
        title: 'Opening GenLayer to All Blockchains',
        description: 'Cross-chain interoperability and the vision for universal access.',
        durationInFrames: s(120),
        episode: 20,
    },
];
