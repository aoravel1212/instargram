import { NextRequest, NextResponse } from 'next/server';
import { addComment } from '@/service/posts';
import { withSessionUser } from '@/util/session';

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { postId, comment, createdAt } = await req.json();

    if (!postId || comment == null) {
      return new Response('Bad Request', { status: 400 });
    }

    return addComment(postId, user.id, comment, createdAt)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
