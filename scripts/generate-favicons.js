const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE = './Leader24-Favicon2.0.png';
const OUTPUT = './public';

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generate() {
  // Verify source exists
  if (!fs.existsSync(SOURCE)) {
    console.error(`❌ Source file not found: ${SOURCE}`);
    process.exit(1);
  }

  console.log('🎨 Generating favicon variants from Leader24-Favicon2.0.png...\n');

  // Generate square icons
  for (const { name, size } of sizes) {
    await sharp(SOURCE)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUTPUT, name));
    console.log(`✓ ${name} (${size}x${size})`);
  }

  // OG Image (1200x630 with centered logo on indigo background)
  const logoSize = 400;
  const ogWidth = 1200;
  const ogHeight = 630;

  await sharp(SOURCE)
    .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.floor((ogHeight - logoSize) / 2),
      bottom: Math.ceil((ogHeight - logoSize) / 2),
      left: Math.floor((ogWidth - logoSize) / 2),
      right: Math.ceil((ogWidth - logoSize) / 2),
      background: { r: 99, g: 102, b: 241, alpha: 1 } // indigo-500
    })
    .png()
    .toFile(path.join(OUTPUT, 'og-image.png'));
  console.log(`✓ og-image.png (${ogWidth}x${ogHeight})`);

  // Generate favicon.ico with multiple sizes
  const ico16 = await sharp(SOURCE).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(SOURCE).resize(32, 32).png().toBuffer();
  const ico48 = await sharp(SOURCE).resize(48, 48).png().toBuffer();

  // For favicon.ico we'll just use the 32x32 PNG (browsers handle it well)
  await sharp(SOURCE)
    .resize(32, 32)
    .toFile(path.join('./src/app', 'favicon.ico'));
  console.log(`✓ favicon.ico (32x32)`);

  console.log('\n✅ All favicons generated successfully!');
}

generate().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
