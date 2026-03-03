export default function FilterControls({
  selectedType,
  setSelectedType,

  selectedAbility,
  setSelectedAbility,

  sortOption,
  setSortOption,

  types = [],
  abilities = [],

  resetFilters
}) {

  return (
    <div style={{
      display:"flex",
      flexWrap:"wrap",
      gap:"12px",
      justifyContent:"center",
      alignItems:"center"
    }}>

      {/* Type Filter */}
      <select
        value={selectedType}
        onChange={(e)=>setSelectedType(e.target.value)}
      >
        <option value="">All Types</option>

        {types.map(t=>(
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}

      </select>

      {/* Ability Filter */}
      <select
        value={selectedAbility}
        onChange={(e)=>setSelectedAbility(e.target.value)}
      >
        <option value="">All Abilities</option>

        {abilities.map(a=>(
          <option key={a} value={a}>
            {a.charAt(0).toUpperCase() + a.slice(1)}
          </option>
        ))}
      </select>

      {/* Sorting */}
      <select
        value={sortOption}
        onChange={(e)=>setSortOption(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="id">Pokédex ID</option>
        <option value="attack">Highest Attack</option>
        <option value="hp">Highest HP</option>
      </select>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        style={{
          padding:"10px 16px",
          borderRadius:"12px",
          border:"none",
          background:"#444",
          color:"white",
          cursor:"pointer"
        }}
      >
        Reset Filters
      </button>

    </div>
  );
}