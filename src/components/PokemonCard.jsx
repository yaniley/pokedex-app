const colors = {
 fire:"#FD7D24",
 water:"#4592C4",
 grass:"#9BCC50",
 electric:"#EED535",
 normal:"#A4ACAF",
 poison:"#B97FC9",
 psychic:"#F366B9",
 ghost:"#7B62A3"
};

export default function PokemonCard({ pokemon, setSelectedPokemon }) {

  const type = pokemon.types[0].type.name;

  return (
    <div
      className="card"
      style={{ background: colors[type] || "#777" }}
      onClick={()=>setSelectedPokemon(pokemon)}
    >

      <img
        src={pokemon.sprites.front_default}
        style={{ width: "90px" }}
      />

      <h3>{pokemon.name}</h3>

      <p>{type}</p>

    </div>
  );
}