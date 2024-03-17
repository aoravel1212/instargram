'use client';
import usePosts from '@/hooks/posts';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';
import { PostContext } from '@/context/PostContext';

export default function PostList() {
  const { posts, isLoading, error } = usePosts();

  return (
    <section className="max-w-full" style={{ width: 'min(470px, 100vw)' }}>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner color="red" />
        </div>
      )}
      {posts && (
        <ul className="w-full">
          {posts
            ? posts.map((post, index) => (
                <li key={post.id} className="mb-4">
                  <PostContext.Provider value={{ ...post }}>
                    <PostListCard priority={index < 2} />
                  </PostContext.Provider>
                </li>
              ))
            : error}
        </ul>
      )}
    </section>
  );
}
