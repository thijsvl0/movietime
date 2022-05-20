import type { NextPage } from 'next';
import { MovieList } from '../components/movieList';

const Home: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <MovieList />
      </div>
    </div>
  );
};

export default Home;
