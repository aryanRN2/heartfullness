import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('file');

    if (!fileName) {
      return new Response('File name is required', { status: 400 });
    }

    // Security check: isolate file name to prevent directory traversal
    const safeFileName = path.basename(fileName);
    const filePath = path.join(process.cwd(), 'gallary', safeFileName);

    if (!fs.existsSync(filePath)) {
      return new Response('Image not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    // Determine target Content-Type MIME header
    let contentType = 'image/png';
    const ext = path.extname(safeFileName).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (ext === '.webp') {
      contentType = 'image/webp';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.svg') {
      contentType = 'image/svg+xml';
    }

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error: any) {
    console.error('Error serving image:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
