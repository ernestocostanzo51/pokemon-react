import { useContext , useMemo } from "react"
import { favoriteContext } from "../components/FavoriteProvider"
import { pokemonContext } from "../components/PokemonProvider"
import { searchContext } from "../components/SearchProvider"


import typeConfig from "../layout/TypePokemon"


export default function FavoritePage() {
  const { favorite, removeFromFavorite } = useContext(favoriteContext)
  const { selectedPokemon } = useContext(pokemonContext)
  const {search , setSearch} = useContext(searchContext)

  const filtredPokemon = useMemo(() => {
    return favorite.filter((poke) => poke.name.includes(search))
  } , [favorite , search])

  return (
    <div className="container py-5">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-warning">★ Pokémon Preferiti</h1>
        <p className="text-muted">
          {favorite.length > 0
            ? `Hai salvato ${favorite.length} Pokémon nei tuoi preferiti.`
            : "Nessun Pokémon salvato tra i preferiti."}
        </p>
         <input
          type="text"
          className="form-control border-0 bg-white shadow-none ps-2 fs-6"
          placeholder="Cerca Pokémon per nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button 
            className="btn btn-link text-secondary text-decoration-none pe-4"
            onClick={() => setSearch("")}
            type="button"
          >
            ✕
          </button>
        )}

      </header>

      {/* Caso: Lista Preferiti Vuota */}
      {filtredPokemon.length === 0 ? (
        <div className="text-center py-5">
          <div className="card border-2 border-dashed bg-light p-5 rounded-4 max-w-md mx-auto">
            <h4 className="text-muted mb-3">La tua lista è vuota</h4>
            <p className="text-secondary mb-0">
              Aggiungi alcuni Pokémon ai preferiti dalla pagina principale per ritrovarli qui!
            </p>
          </div>
        </div>
      ) : (
        /* Griglia Pokémon Preferiti */
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filtredPokemon.map((poke) => (
            <div key={poke.name} className="col">
              <div className="card h-100 border-0 shadow-sm rounded-4 text-center p-3 hover-shadow transition">
                
                {/* ID Pokémon */}
                <div className="d-flex justify-content-end mb-2">
                  <span className="badge bg-secondary-subtle text-secondary rounded-pill px-2 py-1 fw-bold">
                    #{poke.id}
                  </span>
                </div>

                {/* Immagine */}
                <div className="my-2" style={{ height: "120px" }}>
                  <img
                    src={
                      poke.sprites?.other?.["official-artwork"]?.front_default ||
                      poke.sprites?.front_default
                    }
                    alt={poke.name}
                    className="img-fluid h-100"
                    style={{ objectFit: "contain" }}
                  />
                </div>

                {/* Nome */}
                <h5 className="text-capitalize fw-bold mb-2">{poke.name}</h5>

                {/* Tipi */}
                <div className="d-flex justify-content-center gap-1 mb-3">
                  {poke.types?.map((t) => {
                    const typeName = t.type.name
                    const config = typeConfig[typeName] || { label: typeName, color: "#6c757d" }

                    return (
                      <span
                        key={typeName}
                        className="badge px-2 py-1 text-white rounded-2"
                        style={{ backgroundColor: config.color, fontSize: "0.75rem" }}
                      >
                        {config.label}
                      </span>
                    )
                  })}
                </div>

                {/* Bottoni Azione */}
                <div className="mt-auto d-flex gap-2">
                  <button
                    onClick={() => selectedPokemon(poke.name)}
                    className="btn btn-outline-danger btn-sm w-100 fw-semibold"
                  >
                    Dettagli
                  </button>
                  <button
                    onClick={() => removeFromFavorite(poke)}
                    className="btn btn-outline-secondary btn-sm fw-semibold"
                    title="Rimuovi dai preferiti"
                  >
                    ✕
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}