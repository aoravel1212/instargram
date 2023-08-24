import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { addBookmark, removeBookmark } from '@/service/user';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { postId, bookmark } = await req.json();

  if (!postId || bookmark === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  return request(user.id, postId)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
