import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <article className='post'>
      <Link to={`/post/${post.id}`}>
        <div className='postInfo'>
          <h2>
            {post.title.length <= 15
              ? post.title
              : `${post.title.slice(0, 15)}...`}
          </h2>
          <p className='postDate'>{post.datetime}</p>
        </div>
        <div className='postInfo'>
          <p className='postBody'>
            {post.body.length <= 35
              ? post.body
              : `${post.body.slice(0, 35)}...`}
          </p>
          <p className='postCategory'>
            {post.category.length <= 15
              ? post.category
              : `${post.category.slice(0, 15)}...`}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default Post;
