import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { dislikePost, likePost } from '@/service/posts';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { postId, like } = await req.json();

  if (!postId || like === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = like ? likePost : dislikePost;

  return request(postId, user.id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
