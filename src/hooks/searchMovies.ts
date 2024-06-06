import { useEffect, useRef, useState } from "react"

export function useSearchMovies() {
    const [search, setSearch] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const isFirstTime = useRef(true)
    useEffect(() => {
        if(isFirstTime.current) {
          isFirstTime.current = search === ''
          return
        }
        if(search === '') {
          setError("No se puede buscar una película vacía")
          return
        }
        if(/\d/.test(search)) {
          setError("No se puede buscar una película con un número")
          return
        }
    
        if(search.length < 3) {
          setError("La búsqueda debe tener al menos 3 carácteres")
          return
        }
    
        setError(null)
      }, [search])

    return { error, setSearch, search }
}