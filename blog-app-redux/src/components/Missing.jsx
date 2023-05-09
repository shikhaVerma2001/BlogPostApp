import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className='missing emptyMsg'>
      <h2>Post not found!!</h2>
      <p>Well, that's disappointing!</p>
      <p>
        <Link to='/'>Visit Our HomePage!</Link>
      </p>
    </main>
  );
};

export default Missing;
