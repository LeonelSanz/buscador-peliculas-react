const API_KEY = '32617b3d';

export const searchMovies = async ({ search }) => {
    if (search === '') return null;

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`)
        const json = await response.json();

        const movies = json.Search;

        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster,
        }))
    } catch (e) {
        throw new Error('Error searching movies')
    }
}