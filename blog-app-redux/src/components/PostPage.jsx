import {
  deletePostById,
  fetchPostById,
  likeById,
  STATUS,
} from '../store/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Missing from './Missing';
import { useEffect } from 'react';
import { FaPen, FaTrashAlt, FaThumbsUp } from 'react-icons/fa';

const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, status, likes } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (status === STATUS.LOADING) {
    return <p className='emptyMsg'>Loading...</p>;
  }

  if (status === STATUS.ERROR) {
    return <p className='emptyMsg error'>Something bad happened!</p>;
  }

  if (post.title === undefined) {
    return <Missing />;
  }

  const handleDelete = (id) => {
    dispatch(deletePostById(id));
    navigate('/');
  };

  const handleLike = (id) => {
    dispatch(likeById(id));
  };

  return (
    <main className='postPage'>
      <article className='post'>
        <div className='postInfo postInfoMobile'>
          <h2>{post.title}</h2>
          <ul className='icons'>
            <li>
              <Link to={`/edit/${id}`}>
                <FaPen />
              </Link>
            </li>
            <li
              role='button'
              onClick={() => handleDelete(post.id)}
              className='error'
            >
              <FaTrashAlt />
            </li>
            <li
              role='button'
              onClick={() => {
                handleLike(post.id);
              }}
            >
              <FaThumbsUp />
            </li>
            <p>{likes}</p>
          </ul>
        </div>
        <div className='postInfo'>
          <p className='postDate'>Date: {post.datetime}</p>
          <p className='postCategory'>Category: {post.category}</p>
        </div>
        <p className='postBody'>{post.body}</p>
      </article>
    </main>
  );
};
export default PostPage;
