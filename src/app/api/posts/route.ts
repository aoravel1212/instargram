import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { createPost, getFollowingPostsOf } from '@/service/posts';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }
  return getFollowingPostsOf(user.username) //
    .then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const form = await req.formData();
  const text = form.get('text')?.toString();
  const file = form.get('file') as Blob;

  if (!text || !file === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  return createPost(user.id, text, file) //
    .then((data) => NextResponse.json(data));
}
