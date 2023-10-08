import { NextRequest, NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';
import { addBookmark, removeBookmark } from '@/service/user';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { postId, bookmark } = await req.json();

    if (!postId || bookmark == null) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, postId)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
