import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import format from 'date-fns/format';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/postSlice';

const NewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postCategory, setPostCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = uuid();
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
      id: id,
      title: postTitle,
      category: postCategory,
      datetime: datetime,
      body: postBody,
      likes: 0,
    };
    try {
      dispatch(createPost(newPost));
    } catch (err) {
      console.log(err.message);
    }
    setPostBody('');
    setPostTitle('');
    setPostCategory('');
    navigate('/');
  };

  return (
    <main className='newPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title: </label>
        <input
          type='text'
          placeholder='Enter Post Title'
          id='postTitle'
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
          maxLength='50'
        />
        <br />
        <label htmlFor='postCategory'>Category: </label>
        <input
          type='text'
          placeholder='Enter Post Category'
          id='postCategory'
          value={postCategory}
          onChange={(e) => setPostCategory(e.target.value)}
          required
        />
        <br />
        <label htmlFor='postBody'>Body: </label>
        <input
          type='text'
          id='postBody'
          placeholder='Enter Post Body'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required
        />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
