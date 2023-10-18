import { SimplePost } from '@/model/post';
import { createContext, useContext } from 'react';

const defaultPost: SimplePost = {
  id: '',
  username: '',
  userImage: '',
  image: '',
  text: '',
  createdAt: '',
  likes: [],
  comments: 0,
  author: { _ref: '' },
};

export const PostContext = createContext<SimplePost>(defaultPost);

export const usePostContext = () => useContext(PostContext);
