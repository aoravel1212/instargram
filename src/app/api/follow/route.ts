import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { follow, unfollow } from '@/service/user';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { targetId, isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = isFollow ? follow : unfollow;

  return request(user.id, targetId)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
