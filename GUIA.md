# Buscador de Pokémon — Guia do projeto (test5)

Projeto React + Vite feito no modo "aprender fazendo" (o aluno digita, o guia orienta).

## Como rodar de novo (depois de fechar o terminal)

```bash
cd /home/pedro/opencode/test5
npm run dev
```

Depois abra o link que aparecer (geralmente http://localhost:5173).

> Fechar o terminal NÃO apaga o projeto. Só pare o servidor. Para voltar, rode `npm run dev` de novo.

## API usada

PokeAPI (gratuita, sem chave):

```
https://pokeapi.co/api/v2/pokemon/{nome}
```

## Roadmap (etapas)

1. [x] Criar projeto com Vite (`npm create vite@latest test5 -- --template react`)
2. [x] Limpar boilerplate (App.jsx, index.css, App.css)
3. [x] Campo de busca + estado do texto (input controlado com `useState`)
4. [x] Fetch na API com `async/await` + estados `loading`, `error`, `pokemon`
5. [ ] Mostrar os dados num cartão (imagem, nome, altura, peso, tipos)
6. [ ] Estilizar com CSS

## Conceitos aprendidos

- `useState` para estados: `query`, `pokemon`, `loading`, `error`
- input controlado: `value={query}` + `onChange={...}`
- `async/await` + `fetch`,`resposta.ok`,`throw`, `try/catch/finally`
- `event.preventDefault()` evita recarregar a página no submit
- `.map()` para renderizar listas (tipos) + `key` única
- Acesso a objeto aninhado: `pokemon.sprites.front_default`, `item.type.name`

## Campos úteis da resposta da PokeAPI

- `pokemon.name`
- `pokemon.sprites.front_default` (URL da imagem)
- `pokemon.height` (decímetros -> dividir por 10 = metros)
- `pokemon.weight` (hectogramas -> dividir por 10 = kg)
- `pokemon.types` (array de `{ slot, type: { name, url } }`)

## Passo 5 — Código alvo para o App.jsx (próximo a ser feito)

```jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
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

  return (
    <div className="app">
      <h1>Buscador de Pokemon</h1>

      <form className="form" onSubmit={buscarPokemon}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Digite o nome (ex: pikachu)"
        />
        <button type="submit">Buscar</button>
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
              <span key={item.type.name}>{item.type.name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
```

## Para continuar na próxima sessão

Abra este arquivo e o chat com o opencode, e diga: "vamos continuar o test5 no passo 5".
