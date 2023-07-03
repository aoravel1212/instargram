import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[]; // slug/slug/slug 처럼 중첩된 라우트를 받아올 수 있도록
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostsOf; // 실행하지 않고 함수 참조값만 변수에 할당
  if (query === 'saved') {
    request = getSavedPostsOf;
  } else if (query === 'liked') {
    request = getLikedPostsOf;
  }

  return request(username).then((data) => NextResponse.json(data));
}
