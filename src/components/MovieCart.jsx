import React from 'react'
import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContex';

const MovieCart = ({movie}) => {
    const {
        isFavorite,
        addToFavorites,
        removeFromFavorites,
    } = useMovieContext();
    
    const favorite = isFavorite(movie.id); 

    function onFavoriteClick(){
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    return (
        <div className='movie-card'>
           <div className='movie-poster'>
               <img src={movie.url} alt={movie.title} />
               <div className='movie-overplay'>
                <button 
                    className={`favorite-btn ${favorite ? 'favorite-active' : ''}`} 
                    onClick={onFavoriteClick}
                >
                    {favorite ? '❤️' : '🤍'}
                </button>
               </div>
           </div>
           <div className='movie-info'>
                 <h3>{movie.title}</h3>
                 <p>{movie.release_date}</p>
           </div>
        </div>
    )
}

export default MovieCart