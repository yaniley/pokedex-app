export default function PokemonDetail({ pokemon }) {

  if (!pokemon) return <h3>Select Pokemon</h3>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{pokemon.name}</h2>

      <img src={pokemon.sprites.front_default} />

      <h3>Abilities</h3>
      <ul>
        {pokemon.abilities.map(a => (
          <li key={a.ability.name}>
            {a.ability.name}
          </li>
        ))}
      </ul>

      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map(s => (
          <li key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}