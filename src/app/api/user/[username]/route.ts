import { getPost } from '@/service/posts';
import { getUserByUsername } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { username: string };
};

export async function GET(_: NextRequest, context: Context) {
  // // const data = getUserByUsername(context.params.username).then((data) => ({
  // //   ...data,
  // //   ...getPost(data.id),
  // // }));
  // // const data = { ...userData, ...userPost };
  // // const data = { ...userData };
  // // console.log(userPost);
  // return getUserByUsername(context.params.username).then((data) =>
  //   NextResponse.json({
  //     userData: { ...data },
  //     userPost: { ...getPost(data.id) },
  //   })
  // );
}
