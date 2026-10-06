import { useContext } from "react"
import { compareContext } from "../components/CompareProvider"
import { pokemonContext } from "../components/PokemonProvider"
import typeConfig from "../layout/TypePokemon" // Adatta il percorso al tuo file

export default function ComparePage() {
  const { compare, removeFromCompare } = useContext(compareContext)
  const { selectedPokemon } = useContext(pokemonContext)

  const statLabels = {
    hp: "HP",
    attack: "Attacco",
    defense: "Difesa",
    "special-attack": "Att. Sp.",
    "special-defense": "Dif. Sp.",
    speed: "Velocità"
  }

  // Optional chaining e controllo di sicurezza per evitare l'errore .find()
  const getStatValue = (poke, statName) => {
    if (!poke || !poke.stats) return 0
    const statObj = poke.stats.find((s) => s.stat?.name === statName)
    return statObj ? statObj.base_stat : 0
  }

  const poke1 = compare[0]
  const poke2 = compare[1] // Può essere undefined se c'è 1 solo Pokémon

  return (
    <div className="container py-5">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-info">⇄ Confronta Pokémon</h1>
        <p className="text-muted">
          {compare.length === 2
            ? "Confronto diretto tra i due Pokémon selezionati."
            : compare.length === 1
            ? "Aggiungi un secondo Pokémon per completare il confronto!"
            : "Nessun Pokémon selezionato per il confronto."}
        </p>
      </header>

      {/* Caso: 0 Pokémon (Lista del tutto vuota) */}
      {compare.length === 0 ? (
        <div className="text-center py-5">
          <div className="card border-2 border-dashed bg-light p-5 rounded-4 max-w-md mx-auto">
            <h4 className="text-muted mb-3">Seleziona almeno un Pokémon</h4>
            <p className="text-secondary mb-0">
              Aggiungi i Pokémon al comparatore cliccando sul pulsante <strong>"⇄ Confronta"</strong>.
            </p>
          </div>
        </div>
      ) : (
        /* Caso: 1 o 2 Pokémon nel comparatore */
        <div className="row g-4">
          
          {/* Card Primo Pokémon */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-secondary-subtle text-secondary rounded-pill px-3 py-2 fw-bold">
                  #{poke1.id}
                </span>
                <button
                  onClick={() => removeFromCompare(poke1)}
                  className="btn btn-outline-danger btn-sm rounded-circle px-2"
                  title="Rimuovi dal confronto"
                >
                  ✕
                </button>
              </div>

              <div className="my-2" style={{ height: "160px" }}>
                <img
                  src={
                    poke1.sprites?.other?.["official-artwork"]?.front_default ||
                    poke1.sprites?.front_default
                  }
                  alt={poke1.name}
                  className="img-fluid h-100"
                  style={{ objectFit: "contain" }}
                />
              </div>

              <h3 className="text-capitalize fw-bold mb-2">{poke1.name}</h3>

              <div className="d-flex justify-content-center gap-2 mb-3">
                {poke1.types?.map((t) => {
                  const typeName = t.type.name
                  const config = typeConfig[typeName] || { label: typeName, color: "#6c757d" }

                  return (
                    <span
                      key={typeName}
                      className="badge px-3 py-2 text-white rounded-3 shadow-sm"
                      style={{ backgroundColor: config.color, fontSize: "0.85rem" }}
                    >
                      {config.label}
                    </span>
                  )
                })}
              </div>

              <button
                onClick={() => selectedPokemon(poke1.name)}
                className="btn btn-outline-primary btn-sm fw-semibold mt-auto"
              >
                Vedi Dettagli
              </button>
            </div>
          </div>

          {/* Card Secondo Pokémon (se presente, altrimenti Box di attesa) */}
          <div className="col-md-6">
            {poke2 ? (
              <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-secondary-subtle text-secondary rounded-pill px-3 py-2 fw-bold">
                    #{poke2.id}
                  </span>
                  <button
                    onClick={() => removeFromCompare(poke2)}
                    className="btn btn-outline-danger btn-sm rounded-circle px-2"
                    title="Rimuovi dal confronto"
                  >
                    ✕
                  </button>
                </div>

                <div className="my-2" style={{ height: "160px" }}>
                  <img
                    src={
                      poke2.sprites?.other?.["official-artwork"]?.front_default ||
                      poke2.sprites?.front_default
                    }
                    alt={poke2.name}
                    className="img-fluid h-100"
                    style={{ objectFit: "contain" }}
                  />
                </div>

                <h3 className="text-capitalize fw-bold mb-2">{poke2.name}</h3>

                <div className="d-flex justify-content-center gap-2 mb-3">
                  {poke2.types?.map((t) => {
                    const typeName = t.type.name
                    const config = typeConfig[typeName] || { label: typeName, color: "#6c757d" }

                    return (
                      <span
                        key={typeName}
                        className="badge px-3 py-2 text-white rounded-3 shadow-sm"
                        style={{ backgroundColor: config.color, fontSize: "0.85rem" }}
                      >
                        {config.label}
                      </span>
                    )
                  })}
                </div>

                <button
                  onClick={() => selectedPokemon(poke2.name)}
                  className="btn btn-outline-primary btn-sm fw-semibold mt-auto"
                >
                  Vedi Dettagli
                </button>
              </div>
            ) : (
              <div className="card border-2 border-dashed bg-light text-center p-5 rounded-4 h-100 d-flex flex-column justify-content-center align-items-center text-muted">
                <span className="display-6 mb-3">➕</span>
                <h5>In attesa del 2° Pokémon</h5>
                <p className="small mb-0">Seleziona un altro Pokémon dalla Home per confrontarlo con {poke1.name}.</p>
              </div>
            )}
          </div>

          {/* Tabella Comparativa Statistiche */}
          <div className="col-12 mt-4">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-header bg-dark text-white text-center py-3">
                <h4 className="m-0 fw-bold">Tabella Statistiche</h4>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center m-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "35%" }} className="text-capitalize fs-5">{poke1.name}</th>
                      <th style={{ width: "30%" }}>Statistica</th>
                      <th style={{ width: "35%" }} className="text-capitalize fs-5">{poke2 ? poke2.name : "---"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Altezza */}
                    <tr>
                      <td className="fw-semibold">{(poke1.height / 10).toFixed(1)} m</td>
                      <td className="text-muted fw-bold text-uppercase">Altezza</td>
                      <td className="fw-semibold">{poke2 ? `${(poke2.height / 10).toFixed(1)} m` : "-"}</td>
                    </tr>

                    {/* Peso */}
                    <tr>
                      <td className="fw-semibold">{(poke1.weight / 10).toFixed(1)} kg</td>
                      <td className="text-muted fw-bold text-uppercase">Peso</td>
                      <td className="fw-semibold">{poke2 ? `${(poke2.weight / 10).toFixed(1)} kg` : "-"}</td>
                    </tr>

                    {/* Statistiche Base */}
                    {Object.entries(statLabels).map(([statKey, label]) => {
                      const val1 = getStatValue(poke1, statKey)
                      const val2 = poke2 ? getStatValue(poke2, statKey) : null

                      const isVal1Higher = poke2 && val1 > val2
                      const isVal2Higher = poke2 && val2 > val1

                      return (
                        <tr key={statKey}>
                          <td className={`fw-bold ${isVal1Higher ? "text-success fs-5" : ""}`}>
                            {val1} {isVal1Higher && "👑"}
                          </td>
                          <td className="text-muted fw-bold text-uppercase">{label}</td>
                          <td className={`fw-bold ${isVal2Higher ? "text-success fs-5" : ""}`}>
                            {poke2 ? `${val2} ${isVal2Higher ? "👑" : ""}` : "-"}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}