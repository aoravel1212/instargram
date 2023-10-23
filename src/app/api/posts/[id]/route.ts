import { NextRequest, NextResponse } from 'next/server';
import { deletePost, editPost, getPost } from '@/service/posts';
import { withSessionUser } from '@/util/session';

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () =>
    getPost(context.params.id) //
      .then((data) => NextResponse.json(data))
  );
}

export async function PUT(req: NextRequest, context: Context) {
  return withSessionUser(async () => {
    const { editedText } = await req.json();

    if (!editedText === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    return editPost(context.params.id, editedText) //
      .then((data) => NextResponse.json(data));
  });
}

export async function DELETE(_: NextRequest, context: Context) {
  return withSessionUser(async () =>
    deletePost(context.params.id) //
      .then((data) => NextResponse.json(data))
  );
}
