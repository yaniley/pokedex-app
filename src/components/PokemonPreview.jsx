export default function PokemonPreview({ pokemon, onClose }) {

  if (!pokemon) return null;

  const type = pokemon.types[0].type.name;

const typeColors = {
  fire: "#f26925",      
  water: "#4592C4",
  grass: "#9BCC50",
  electric: "#EED535",
  bug: "#7cac33",
  normal: "#A4ACAF",
  poison: "#B97FC9",
  ghost: "#7B62A3",
  psychic: "#F366B9",
  ground: "#d6a45c",
  fighting: "#ee5253",
  rock: "#8395a7",
  ice: "#48dbfb",
  dragon: "#6c5ce7",
  fairy: "#f368e0"
};

  const bgColor = typeColors[type] || "#999";

  const darkTextTypes = [
    "electric",
    "normal",
    "fairy",
    "ice",
    "ground"
  ];

  const textColor = darkTextTypes.includes(type)
    ? "black"
    : "white";

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOutsideClick}
    >

      <div
        className="modal-box"
        style={{
          background: bgColor,
          color: textColor,
          outline: "none"
        }}
      >

        <h2 style={{ textTransform:"capitalize" }}>
          {pokemon.name}
        </h2>

        <img
          src={pokemon.sprites.front_default}
          width="160"
          alt={pokemon.name}
        />

        <h3>Abilities</h3>

        {pokemon.abilities.map(a => (
          <p key={a.ability.name}>
            {a.ability.name}
          </p>
        ))}

        <h3>Stats</h3>

        {pokemon.stats.map(s => (
          <p key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </p>
        ))}

        <br />

        <button
          onClick={onClose}
          style={{
            padding:"10px 18px",
            borderRadius:"12px",
            border:"none",
            cursor:"pointer"
          }}
        >
          Close
        </button>

      </div>
    </div>
  );
}