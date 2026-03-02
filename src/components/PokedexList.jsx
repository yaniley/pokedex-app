import PokemonCard from "./PokemonCard";

export default function PokedexList({ pokemon, setSelectedPokemon }) {

  return (
    <div className="grid">
      {pokemon.map(p => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          setSelectedPokemon={setSelectedPokemon}
        />
      ))}
    </div>
  );
}