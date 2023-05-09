import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='header'>
      <div id='logo'>
        <p>Blog Post</p>
      </div>
      <nav className='nav'>
        <ul>
          <li id='firstChild'>
            <Link to='/'>Home</Link>
          </li>
          <li id='lastChild'>
            <Link to='/new'>New </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
