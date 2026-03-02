export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      placeholder="🔎 Search Pokémon..."
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
    />
  );
}