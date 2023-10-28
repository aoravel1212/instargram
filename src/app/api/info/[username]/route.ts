import { getUserInfo } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { username: string };
};

export async function GET(_: NextRequest, context: Context) {
  return getUserInfo(context.params.username) //
    .then((data) => NextResponse.json(data));
}
