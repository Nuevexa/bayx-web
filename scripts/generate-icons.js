/**
 * Icon Generation Script
 *
 * Generates all required favicon and icon formats from the source SVG.
 * Follows Next.js 16 App Router conventions and industry best practices.
 *
 * Source: public/favicon.svg (512x512 vector)
 * Output:
 *   - src/app/icon.svg (optimized SVG - auto-detected by Next.js for modern browsers)
 *   - src/app/favicon.ico (32x32 PNG fallback)
 *   - src/app/icon.png (32x32 - fallback for older browsers)
 *   - src/app/apple-icon.png (180x180 - iOS/iPadOS)
 *   - public/android-chrome-192x192.png (192x192)
 *   - public/android-chrome-512x512.png (512x512)
 *
 * Usage: node scripts/generate-icons.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { optimize } = require('svgo');

// Paths
const SOURCE_SVG = path.join(__dirname, '../public/favicon.svg');
const APP_DIR = path.join(__dirname, '../src/app');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Icon configurations
const ICONS = [
  // Next.js App Router auto-detected icons
  {
    size: 32,
    output: path.join(APP_DIR, 'icon.png'),
    description: 'Next.js auto-detected favicon (32x32)'
  },
  {
    size: 180,
    output: path.join(APP_DIR, 'apple-icon.png'),
    description: 'Apple Touch Icon (180x180)'
  },
  // Android Chrome icons
  {
    size: 192,
    output: path.join(PUBLIC_DIR, 'android-chrome-192x192.png'),
    description: 'Android Chrome Icon (192x192)'
  },
  {
    size: 512,
    output: path.join(PUBLIC_DIR, 'android-chrome-512x512.png'),
    description: 'Android Chrome Icon (512x512)'
  },
];

// Favicon.ico sizes (multi-resolution .ico file)
const ICO_SIZES = [16, 32, 48];

/**
 * Generates a PNG icon at specified size from SVG source
 */
async function generateIcon(size, outputPath, description) {
  try {
    await sharp(SOURCE_SVG)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);

    console.log(`✓ Generated: ${description} -> ${path.basename(outputPath)}`);
    return outputPath;
  } catch (error) {
    console.error(`✗ Failed to generate ${description}:`, error.message);
    throw error;
  }
}

/**
 * Generates favicon.ico from SVG
 */
async function generateFavicon() {
  const faviconPath = path.join(APP_DIR, 'favicon.ico');

  try {
    // Generate 32x32 as the primary favicon size from SVG
    // Note: Sharp doesn't natively support .ico format with multiple sizes
    // We'll generate a 32x32 PNG from SVG and save as .ico (browsers handle this well)
    await sharp(SOURCE_SVG)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFormat('png')
      .toFile(faviconPath);

    console.log(`✓ Generated: Favicon (32x32 from SVG) -> favicon.ico`);
  } catch (error) {
    console.error(`✗ Failed to generate favicon.ico:`, error.message);
    throw error;
  }
}

/**
 * Copies SVG to app directory for modern browsers
 * Note: Original SVG contains embedded raster image, so we keep it as-is
 * to preserve the logo content. Light optimization only removes metadata.
 */
async function copyOptimizedSVG() {
  const svgOutputPath = path.join(APP_DIR, 'icon.svg');

  try {
    // Read the source SVG
    const svgContent = fs.readFileSync(SOURCE_SVG, 'utf-8');
    const originalSize = Buffer.byteLength(svgContent, 'utf-8');

    // Light optimization - only remove metadata, keep the embedded image
    const result = optimize(svgContent, {
      path: SOURCE_SVG,
      multipass: false,
      plugins: [
        // Only remove non-essential metadata
        'removeMetadata',
        'removeComments',
        'removeEditorsNSData',
        // Keep everything else including embedded images
      ],
    });

    // Write SVG
    fs.writeFileSync(svgOutputPath, result.data);

    const optimizedSize = Buffer.byteLength(result.data, 'utf-8');
    const savings = originalSize > optimizedSize ? ((1 - optimizedSize / originalSize) * 100).toFixed(1) : '0.0';

    console.log(`✓ Copied: SVG for modern browsers -> icon.svg`);
    console.log(`  Size: ${(optimizedSize / 1024).toFixed(2)} KB (${savings}% metadata removed)`);

    if (optimizedSize > 100000) {
      console.log(`  ℹ️  Note: SVG contains embedded raster image (preserves perfect quality)`);
    }
  } catch (error) {
    console.error(`✗ Failed to copy SVG:`, error.message);
    throw error;
  }
}

/**
 * Validates source file exists
 */
function validateSourceFile() {
  if (!fs.existsSync(SOURCE_SVG)) {
    throw new Error(`Source SVG not found: ${SOURCE_SVG}`);
  }

  const stats = fs.statSync(SOURCE_SVG);
  console.log(`\n📁 Source Icon: ${path.basename(SOURCE_SVG)}`);
  console.log(`   Format: SVG (Vector)`);
  console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`   Path: ${SOURCE_SVG}\n`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 BayX Icon Generation');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Validate source
    validateSourceFile();

    // Ensure output directories exist
    if (!fs.existsSync(APP_DIR)) {
      fs.mkdirSync(APP_DIR, { recursive: true });
    }
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    console.log('🔨 Generating icons from SVG...\n');

    // Copy optimized SVG first (for modern browsers)
    await copyOptimizedSVG();

    // Generate favicon.ico (fallback)
    await generateFavicon();

    // Generate all PNG icons from SVG
    for (const icon of ICONS) {
      await generateIcon(icon.size, icon.output, icon.description);
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ All icons generated successfully from SVG!');
    console.log('\n📝 Generated files:');
    console.log('   src/app/icon.svg (modern browsers - vector quality)');
    console.log('   src/app/favicon.ico (legacy browser fallback)');
    console.log('   src/app/icon.png (PNG fallback)');
    console.log('   src/app/apple-icon.png (iOS/iPadOS)');
    console.log('   public/android-chrome-192x192.png');
    console.log('   public/android-chrome-512x512.png');
    console.log('\n🚀 Next.js will auto-detect these icons.');
    console.log('   Modern browsers will use SVG (perfect clarity!)');
    console.log('   Mobile devices will use optimized PNGs.');
    console.log('   No additional configuration needed!\n');

  } catch (error) {
    console.error('\n❌ Icon generation failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
