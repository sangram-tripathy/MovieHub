import React, { createContext, useState, useContext, useEffect } from 'react'

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
  const [favorites, setFavorites] = useState([])
  
  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites')
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs))
      } catch (error) {
        setFavorites([])
      }
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (movie) => {
    if (!isFavorite(movie.id)) {
      setFavorites(prev => [...prev, movie])
    }
  }
  
  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(movie => movie.id !== id))
  }     
  
  const isFavorite = (id) => {
    return favorites.some(movie => movie.id === id)
  }    
  
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }                               

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  )
}