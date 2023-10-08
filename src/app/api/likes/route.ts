import { NextRequest, NextResponse } from 'next/server';
import { dislikePost, likePost } from '@/service/posts';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { postId, like } = await req.json();

    if (!postId || like == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = like ? likePost : dislikePost;

    return request(postId, user.id)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
