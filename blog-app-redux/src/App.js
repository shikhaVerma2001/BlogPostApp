import Header from './components/Header';
import Home from './components/Home';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import PostPage from './components/PostPage';
import Missing from './components/Missing';
import { Provider } from 'react-redux';
import store from './store/store';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<NewPost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='*' element={<Missing />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
