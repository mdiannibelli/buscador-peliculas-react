import { useState } from "react"
import Movies from "./components/Movies"
import { useGetMovies } from "./hooks/getMovies"
import { useSearchMovies } from "./hooks/searchMovies"
function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearchMovies()
  const { responseMovies, getMovies, loading } = useGetMovies({search, sort})

  //const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    //! Forma NO Controlada, usamos el DOM....
    //const value = inputRef.current?.value
    //console.log({value})
    getMovies(search)
  }

  // Forma controlada, desventaja: se renderiza cada vez que cambia el input
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(newSearch)
    //getMovies(newSearch) => Buscar al cambiar el input
  }

  const handleSortedMovies = () => {
    setSort(!sort)
  }
  

  return (
    <main className="flex flex-col justify-center items-center bg-gray-800 min-h-screen pt-8">
      <h1 className="text-2xl p-4 text-white font-semibold">Buscador de películas</h1>
      <div className="flex gap-x-2">
        <h2 className="text-white font-semibold">Ordenar películas A - Z</h2>
        <input type="checkbox" onChange={handleSortedMovies}/>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <input /* ref={inputRef} */ value={search} onChange={handleInputChange} name="search" className="rounded bg-slate-700 border-2 border-slate-800 select-none text-white outline-none m-2 p-1" type="text" placeholder="Avengers, Star wars..." />
        <button type="submit" className="px-4 text-xs h-8 rounded text-white bg-slate-600">Buscar</button>
      </form>
      {error && <p className="text-red-500 font-bold">{error}</p>}
      {loading ? <p className="text-white font-bold">Cargando...</p> : <Movies movies={responseMovies}/>}
    </main>
  )
}

export default App
