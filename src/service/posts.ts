import { SimplePost } from '@/model/post';
import { client, urlFor } from './sanity';

const simplePostProjection = `
  ...,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  "comments": count(comments),
  "id": _id,
  "createdAt": _createdAt
`;

export async function getFollowingPostsOf(username: string) {
  return await client
    .fetch(
      `*[_type == "post" && author->.username == "${username}"
    || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
    | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return await client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
        ...,
        "username": author->username,
        "userImage": author->image,
        "image": photo,
        "likes": likes[]->username,
        comments[]{"username": author->username, "image": author->image, text, createdAt},
        "id": _id,
        "createdAt": _createdAt
      }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(
  postId: string,
  userId: string,
  text: string,
  createdAt: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        author: {
          _ref: userId,
          _type: 'reference',
        },
        text,
        createdAt,
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  return client.assets //
    .upload('image', fileBuffer) //
    .then((result) => {
      return client.create(
        {
          _type: 'post',
          author: { _ref: userId },
          photo: { asset: { _ref: result._id } },
          text: text,
          likes: [],
        },
        { autoGenerateArrayKeys: true }
      );
    });

  // nextjs 버전이 낮아서 app/api 내에서 node환경의 upload가 안써졌을 때
  // return fetch(assetsURL, {
  //   method: 'POST',
  //   headers: {
  //     'content-type': file.type,
  //     authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
  //   },
  //   body: file,
  // })
  //   .then((res) => res.json())
  //   .then((result) => {
  //     return client.create(
  //       {
  //         _type: 'post',
  //         author: { _ref: userId },
  //         photo: { asset: { _ref: result.document._id } },
  //         text: text,
  //         likes: [],
  //       },
  //       { autoGenerateArrayKeys: true }
  //     );
  //   });
}
