import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'gallary');
    
    // Ensure directory exists
    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(galleryDir);
    
    // Filter for image extensions
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.includes(ext);
    });

    // Sort files alphabetically to keep order consistent
    imageFiles.sort();

    // Map to API-served source paths and clean titles
    const images = imageFiles.map((file, idx) => {
      const nameWithoutExt = path.basename(file, path.extname(file));
      const title = nameWithoutExt
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      return {
        src: `/api/gallery/image?file=${encodeURIComponent(file)}`,
        title: title || `Meditation Image ${idx + 1}`,
        desc: 'A quiet moment of deep meditation, collective harmony, and inner stillness.'
      };
    });

    return NextResponse.json(images);
  } catch (error: any) {
    console.error('Error reading gallery:', error);
    return NextResponse.json({ error: 'Failed to read gallery' }, { status: 500 });
  }
}
