import React, { useState, useEffect, useCallback } from 'react'
import MovieCart from '../components/MovieCart'
import "../css/Home.css" 
import { searchMovies, getPopularMovies } from '../services/api'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const movies = debouncedQuery.trim()
          ? await searchMovies(debouncedQuery)
          : await getPopularMovies();

        setMovies(movies);
      } catch (err) {
        setError("Error fetching movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setDebouncedQuery(searchQuery);
    }
  }

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className='home'>
      <form onSubmit={handleSearch} className='search-form'>
        <input
          type="text" 
          placeholder='Search for movies...' 
          className='search-input' 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type='submit' className='search-button'>Search</button>
        {searchQuery && (
          <button type='button' onClick={clearSearch} className='clear-button'>Clear</button>
        )}
      </form>
      <div className='movie-grid'>
        {movies.length > 0 ? (
          movies.map(movie => 
            <MovieCart movie={movie} key={movie.id} />
          )
        ) : (
          <div className="no-movies">
            {debouncedQuery ? `No movies found for "${debouncedQuery}"` : "No movies found"}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home