import './App.css';
import { useMovies } from './hooks/useMovies';
import { Movies } from './components/Movies';
import { useState } from 'react';
import { useEffect } from 'react';

function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search === '') {
      setError('No se puede buscar una pelicula vacia');
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero');
      return;
    }

    if (search.length < 3) {
      setError('No se puede buscar una pelicula menor a 3 caracteres');
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };

}

function App() {
  const { movies } = useMovies();
  const { search, updateSearch, error } = useSearch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(search);
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
