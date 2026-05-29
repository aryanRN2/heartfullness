import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallary');
    
    // Ensure directory exists
    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(galleryDir);
    
    // Filter for image and video extensions
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.mp4', '.webm', '.mov'];
    const mediaFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.includes(ext);
    });

    // Sort files alphabetically to keep order consistent
    mediaFiles.sort();

    // Map to API-served source paths and clean titles
    const images = mediaFiles.map((file, idx) => {
      const ext = path.extname(file).toLowerCase();
      const isVideo = ['.mp4', '.webm', '.mov'].includes(ext);
      const nameWithoutExt = path.basename(file, ext);
      const title = nameWithoutExt
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      return {
        src: `/gallary/${encodeURIComponent(file)}`,
        title: title || `${isVideo ? 'Meditation Video' : 'Meditation Image'} ${idx + 1}`,
        desc: isVideo
          ? 'An immersive spiritual video showcasing moments of stillness and deep yogic transmission.'
          : 'A quiet moment of deep meditation, collective harmony, and inner stillness.',
        type: isVideo ? 'video' : 'image'
      };
    });

    return NextResponse.json(images);
  } catch (error: any) {
    console.error('Error reading gallery:', error);
    return NextResponse.json({ error: 'Failed to read gallery' }, { status: 500 });
  }
}
