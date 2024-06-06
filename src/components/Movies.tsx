import type { Movie } from "../interfaces/movies-interface"


interface Props {
    movies: Movie[]
}

const Movies = ({movies}:Props) => {
  return (
    <div className="grid grid-cols-3">
        {movies?.length > 0 ?
          movies.map((movie) => (
            <div key={movie.id} className="flex flex-col p-6">
              <p className="text-xl text-white font-bold uppercase italic mb-1">{movie.year}</p>
              <img src={movie.poster} alt={movie.title} className="w-72 h-92 object-cover" />
              <span className="text-2xl text-white font-semibold mt-2">{movie.title}</span>
            </div>
          ))
        : <p className="text-center col-span-3 text-white font-2xl">No se han encontrado películas.</p>
      }
      </div>
  )
}

export default Movies
