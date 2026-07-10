import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

// Define your master input and output directories
const INPUT_DIR = path.join(process.cwd(), 'public/raw-images');
const OUTPUT_DIR = path.join(process.cwd(), 'public/images');
const MAX_WIDTH = 1200; // Resizes images larger than 1200px wide

async function processDirectory(currentInputDir, currentOutputDir) {
  try {
    // Ensure the current output directory exists
    await fs.mkdir(currentOutputDir, { recursive: true });

    // Read all items in the current directory (files and folders)
    const items = await fs.readdir(currentInputDir, { withFileTypes: true });

    for (const item of items) {
      const inputPath = path.join(currentInputDir, item.name);
      const outputPath = path.join(currentOutputDir, item.name);

      if (item.isDirectory()) {
        // If it's a folder, recursively process it
        console.log(`\n📁 Scanning category folder: ${item.name}`);
        await processDirectory(inputPath, outputPath);
      } else if (item.isFile() && /\.(jpg|jpeg|png)$/i.test(item.name)) {
        // If it's an image, process it
        const outputFilename = item.name.replace(/\.[^/.]+$/, "") + ".webp";
        const finalOutputPath = path.join(currentOutputDir, outputFilename);

        await sharp(inputPath)
          .resize({ 
            width: MAX_WIDTH, 
            withoutEnlargement: true 
          })
          .webp({ quality: 80 })
          .toFile(finalOutputPath);

        console.log(`  ✅ Converted: ${item.name} -> ${outputFilename}`);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${currentInputDir}:`, error);
  }
}

async function startOptimization() {
  console.log('🚀 Starting image optimization...\n');
  await processDirectory(INPUT_DIR, OUTPUT_DIR);
  console.log('\n🎉 All folders and images successfully optimized!');
}

startOptimization();