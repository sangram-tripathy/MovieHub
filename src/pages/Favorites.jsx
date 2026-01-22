import React from 'react'
import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContex'
import MovieCart from '../components/MovieCart'

const Favorites = () => {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className='favorites-empty'>
        <h2>No Favorite Movies yet</h2>
        <p>Start adding movies to your favorites and they will appear here</p>
      </div>
    )
  }

  return (
    <div className='favorites'>
      <h2>Your Favorite Movies</h2>
      <div className='movie-grid'>
        {favorites.map(movie => 
          <MovieCart movie={movie} key={movie.id} />
        )}
      </div>
    </div>
  )
}

export default Favorites