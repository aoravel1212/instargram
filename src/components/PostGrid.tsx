import GridSpinner from './ui/GridSpinner';
import PostGridCard from './PostGridCard';
import usePosts from '@/hooks/posts';
import { PostContext } from '@/context/PostContext';

export default function PostGrid() {
  const { posts, isLoading, error } = usePosts();

  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-1 md:gap-4 md:py-4 md:px-8">
        {posts
          ? posts.map((post, index) => (
              <li key={post.id}>
                <PostContext.Provider value={{ ...post }}>
                  <PostGridCard priority={index < 6} />
                </PostContext.Provider>
              </li>
            ))
          : error}
      </ul>
    </div>
  );
}
