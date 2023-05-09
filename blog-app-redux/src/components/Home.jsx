import { STATUS } from '../store/postSlice';
import { fetchPosts } from '../store/postSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';

const Home = () => {
  const dispatch = useDispatch();
  const { data: posts, status } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === STATUS.LOADING) {
    return <p className='emptyMsg'>Loading...</p>;
  }

  if (status === STATUS.ERROR) {
    return <p className='emptyMsg error'>Something bad happened!</p>;
  }

  if (posts.length === 0) {
    return <p className='emptyMsg'>No posts to show!</p>;
  }

  return (
    <section className='home'>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};

export default Home;
