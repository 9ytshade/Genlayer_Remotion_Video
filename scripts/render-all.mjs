/**
 * Batch render all GenLayer videos.
 * Usage: node scripts/render-all.mjs [--ids Video01,Video02]
 * 
 * Renders each video composition using the Remotion CLI.
 */
import { execSync } from 'child_process';

const ALL_IDS = [
    'Video01', 'Video02', 'Video03', 'Video04', 'Video05',
    'Video06', 'Video07', 'Video08', 'Video09', 'Video10',
    'Video11', 'Video12', 'Video13', 'Video14', 'Video15',
    'Video16', 'Video17', 'Video18', 'Video19', 'Video20',
];

// Parse --ids flag
const args = process.argv.slice(2);
const idsFlag = args.find(a => a.startsWith('--ids='));
const ids = idsFlag ? idsFlag.split('=')[1].split(',') : ALL_IDS;

console.log(`🎬 Rendering ${ids.length} GenLayer videos...\n`);

for (const id of ids) {
    console.log(`▶ Rendering ${id}...`);
    try {
        execSync(
            `npx remotion render src/index.ts ${id} out/${id}.mp4 --codec h264 --concurrency=100%`,
            { stdio: 'inherit' }
        );
        console.log(`✅ ${id} rendered successfully.\n`);
    } catch (err) {
        console.error(`❌ Failed to render ${id}:`, err.message);
    }
}

console.log('🎬 Batch render complete.');
