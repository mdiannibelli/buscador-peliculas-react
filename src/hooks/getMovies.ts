import { useCallback, useMemo, useRef, useState } from "react"
import type { Movie } from "../interfaces/movies-interface"
import type { MovieResponse } from "../interfaces/movie-response"

interface Props {
    search: string
    sort: boolean
}

export function useGetMovies({search, sort}:Props) {
    const [responseMovies, setResponseMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const previousSearch = useRef(search)
    const getMovies = useCallback(async (search:string) => {
        if(search === previousSearch.current) return // Evitar volver a buscar
            try {
                setLoading(true)
                previousSearch.current = search
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
                setResponseMovies(mappedMovies)
                setLoading(false)
                
            } catch (error) {
                throw new Error("Error at fetching to https://www.odbapi.com")
            }
    },[])

    const sortedMovies = useMemo(() => {
        return sort ? [...responseMovies].sort((a, b) => a.title.localeCompare(b.title)) : responseMovies
    }, [sort, responseMovies])

    return { responseMovies: sortedMovies, getMovies, loading }
}