import { useState } from "react"
import type { Movie } from "../interfaces/movies-interface"
import type { MovieResponse } from "../interfaces/movie-response"

interface Props {
    search: string
}

export function useGetMovies({search}:Props) {
    const [responseMovies, setResponseMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const getMovies = async() => {
        if(search) {
            try {
                setLoading(true)
                const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${search}`)
                const data = await res.json()
                const { Search } = data 
                const mappedMovies = Search?.map((movie:MovieResponse) => ({
                    id: movie.imdbID,
                    title: movie.Title,
                    poster: movie.Poster,
                    year: movie.Year,
                    type: movie.Type
                }))
                if(!res.ok) throw new Error("Response error")
                if(data) {
                    setResponseMovies(mappedMovies)
                    setLoading(false)
                }
            } catch (error) {
                throw new Error("Error at fetching to https://www.odbapi.com")
            }
        }
    }

    return { responseMovies, getMovies, loading }
}