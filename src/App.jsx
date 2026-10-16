import { useState, useEffect } from "react"
import './App.css'


const CORES_TIPOS = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705898',
  fairy: '#EE99AC',
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038', 
  ghost: '#705898',
  steel: '#B8B8B8',
}

function App() {
  const [query, setQuery] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] =  useState(false)
  const [error, setError] = useState('')

  async function buscarPokemon(event) {
    event.preventDefault() 
    if (!query.trim()) return 

    setLoading(true)
    setError('')
    setPokemon(null)

    try {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`,
      )
      if (!resposta.ok) {
        throw new Error('Pokemon nao encontrado')
      }

      const dados = await resposta.json()
      setPokemon(dados)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(pokemon) {
      const corPrincipal = CORES_TIPOS[pokemon.types[0].type.name] || '#f0f2f5';
      document.body.style.backgroundColor = corPrincipal;
    } else {
      document.body.style.backgroundColor = '#f0f2f5';
    }
  }, [pokemon]);


    return (
      <div className="app">
        <h1>Buscador de Pokemon</h1>

        <form className="form" onSubmit={buscarPokemon}>
          <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Digite o nome (ex: pikachu)"
          />
        </form>
  

        {loading && <p>Buscando...</p>}
        {error && <p>Erro: {error}</p>}

        {pokemon && ( 
          <div className="card">
            <img 
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width="140"
            />
            <h2>{pokemon.name}</h2>
            <p>Altura: {pokemon.height / 10} m</p>
            <p>Peso: {pokemon.weight / 10} kg</p>
            <div className="tipos">
              {pokemon.types.map((item) => (
                <span key={item.type.name}
                style={{ backgroundColor: CORES_TIPOS[item.type.name] || '#eee', color: 'white' }}>{item.type.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

export default App
