import { bundle } from '@remotion/bundler';
import { getCompositions, renderStill } from '@remotion/renderer';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

// Import video config (we need to compile it or just import the source if using ts-node, 
// strictly speaking we should read the config from the bundle or a shared file. 
// For simplicity, we'll replicate the config reading or just use the bundle's props if possible, 
// but the bundle doesn't expose the config array directly easily without running it.
// So we will parse the videoConfig.ts file or better yet, just hardcode/copy the list for the script 
// OR import it if we use tsx/ts-node. 
// Since we are in .mjs, we can't easily import .ts without a loader. 
// We'll rely on the bundle to get the Composition list, but we need the specific TITLES for the thumbnails.
// The Composition list in Root.tsx has the IDs. 
// A better approach: We'll modify the script to render the 'Thumbnail' composition multiple times 
// with different props passed via inputProps.

// We need the data. Let's try to import the compiled videoConfig if possible, 
// but easier is to standardly read the known list.
// I'll manually paste the list here to ensure it works without complex TS interop in this script.

const VIDEOS = [
    { id: 'Video01', title: 'What is GenLayer?', subtitle: 'The Intelligent Layer of the Internet', episode: 1 },
    { id: 'Video02', title: 'Why Does GenLayer Exist?', subtitle: 'The Problem with Smart Contracts', episode: 2 },
    { id: 'Video03', title: 'Intelligent Contracts', subtitle: 'Search, Decide, Understand', episode: 3 },
    { id: 'Video04', title: 'GenVM', subtitle: 'The Execution Engine', episode: 4 },
    { id: 'Video05', title: 'Optimistic Democracy', subtitle: 'Consensus for Subjectivity', episode: 5 },
    { id: 'Video06', title: 'The Equivalence Principle', subtitle: 'Agreement Without Uniformity', episode: 6 },
    { id: 'Video07', title: 'Intelligent Oracles', subtitle: 'Native Web Access', episode: 7 },
    { id: 'Video08', title: 'Safe AI', subtitle: 'Security Through Diversity', episode: 8 },
    { id: 'Video09', title: 'Use Cases', subtitle: 'Beyond DeFi and NFTs', episode: 9 },
    { id: 'Video10', title: 'Decentralized Identity', subtitle: 'Your Reputation, On-Chain', episode: 10 },
    { id: 'Video11', title: 'Autonomous DAOs', subtitle: 'Governance by AI', episode: 11 },
    { id: 'Video12', title: 'AI Reliability', subtitle: 'Trusting the Black Box', episode: 12 },
    { id: 'Video13', title: 'Python & DevEx', subtitle: 'Code in Your Language', episode: 13 },
    { id: 'Video14', title: 'Unique Approach', subtitle: 'Sovereign vs Centralized AI', episode: 14 },
    { id: 'Video15', title: 'Future of AI', subtitle: 'Convergence is Inevitable', episode: 15 },
    { id: 'Video16', title: 'Trust in AI', subtitle: 'The Crisis of Truth', episode: 16 },
    { id: 'Video17', title: '10 Reasons', subtitle: 'The GenLayer Bull Case', episode: 17 },
    { id: 'Video18', title: 'Roadmap', subtitle: 'Asimov, Bradbury, Clarke', episode: 18 },
    { id: 'Video19', title: 'Ecosystem', subtitle: 'Building Together', episode: 19 },
    { id: 'Video20', title: 'Open to All', subtitle: 'Universal Intelligence', episode: 20 },
];

const start = async () => {
    console.log('📦 Bundling...');
    const bundleLocation = await bundle({
        entryPoint: path.resolve('src/index.ts'),
        // If you have a webpack config, specify it here
    });

    const outDir = path.resolve('out/thumbnails');
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    console.log('🎨 Rendering 20 thumbnails...');

    const comps = await getCompositions(bundleLocation);
    console.log('Found compositions:', comps.map(c => c.id));
    const thumbnailComp = comps.find((c) => c.id === 'Thumbnail');

    if (!thumbnailComp) {
        throw new Error('Thumbnail composition not found in bundle');
    }

    for (const video of VIDEOS) {
        const specificComp = comps.find(c => c.id === `Thumbnail-${video.id}`);

        if (!specificComp) {
            console.error(`Composition Thumbnail-${video.id} not found, skipping`);
            continue;
        }

        console.log(`   - Rendering thumbnail for ${video.id}...`);

        await renderStill({
            // Pass the specific composition object explicitly
            composition: specificComp,
            serveUrl: bundleLocation,
            compositionId: `Thumbnail-${video.id}`,
            output: path.join(outDir, `${video.id}.png`),
            imageFormat: 'png',
            dumpBrowserLogs: true,
        });
    }

    console.log('✅ Done! Thumbnails saved to out/thumbnails/');
};

start();
