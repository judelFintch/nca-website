import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const buildDirectory = path.join(projectRoot, 'public', 'build');
const manifestPath = path.join(buildDirectory, 'manifest.json');

const requiredEntries = [
    'resources/css/app.css',
    'resources/css/redesign.css',
    'resources/js/app.js',
    'resources/js/home-page.js',
];

async function assertReadable(filePath, description) {
    try {
        await access(filePath, constants.R_OK);
    } catch {
        throw new Error(`${description} est introuvable : ${path.relative(projectRoot, filePath)}`);
    }
}

await assertReadable(manifestPath, 'Le manifeste Vite');

let manifest;
try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch (error) {
    throw new Error(`Le manifeste Vite n'est pas un JSON valide : ${error.message}`);
}

for (const entry of requiredEntries) {
    const asset = manifest[entry];

    if (!asset?.file) {
        throw new Error(`L'entrée ${entry} manque dans public/build/manifest.json`);
    }

    await assertReadable(path.join(buildDirectory, asset.file), `Le fichier compilé de ${entry}`);

    for (const cssFile of asset.css ?? []) {
        await assertReadable(path.join(buildDirectory, cssFile), `La feuille de style de ${entry}`);
    }
}

console.log(`Build vérifié : ${requiredEntries.length} entrées et tous leurs fichiers sont présents.`);
