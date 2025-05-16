import { NextResponse } from 'next/server';
import { getSong } from '@/lib/song-data';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const song = getSong(id);
  if (!song) {
    return NextResponse.json({ error: 'Song not found' }, { status: 404 });
  }
  return NextResponse.json(song);
}
