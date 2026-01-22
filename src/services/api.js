const API_KEY = "14b12c4f";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );

  const data = await response.json();
  if (data.Response === "True") {
    return data.Search.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      release_date: movie.Year,
      url: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"
    }));
  }
  return [];
};

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=avengers&type=movie`
  );

  const data = await response.json();
  if (data.Response === "True") {
    return data.Search.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      release_date: movie.Year,
      url: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"
    }));
  }
  return [];
};
