import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Missing from './Missing';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, updatePost } from '../store/postSlice';

const EditPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const { id } = useParams();
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
      setEditCategory(post.category);
    }
  }, [post, setEditTitle, setEditBody, setEditCategory]);

  if (!editTitle) {
    return <Missing />;
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {
      id: id,
      title: editTitle,
      category: editCategory,
      datetime: datetime,
      body: editBody,
      likes: post.likes,
    };
    try {
      dispatch(updatePost(updatedPost));
      setEditTitle('');
      setEditBody('');
      setEditCategory('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className='newPost'>
      <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
        <h2>Edit Post</h2>
        <label htmlFor='postTitle'>Title: </label>
        <input
          type='text'
          placeholder='Enter Post Title'
          id='postTitle'
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          required
        />
        <label htmlFor='postCategory'>Category: </label>
        <input
          type='text'
          placeholder='Enter Post Category'
          id='postCategory'
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          required
        />
        <label htmlFor='postBody'>Body: </label>
        <input
          type='text'
          id='postBody'
          placeholder='Enter Post Body'
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
          required
        />
        <button type='submit' onClick={() => handleEdit(id)}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default EditPost;
