import { useState, useEffect } from "react";

import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";
import FilterControls from "./components/FilterControls";
import PokedexList from "./components/PokedexList";
import PokemonPreview from "./components/PokemonPreview";
import Loader from "./components/Loader";
import Pagination from "./components/Pagination";

function App() {

  // States

  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedType, setSelectedType] = useState("");
  const [selectedAbility, setSelectedAbility] = useState("");

  const [sortOption, setSortOption] = useState("");

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 18;

  // Fetch Data

  useEffect(() => {

    async function fetchPokemon() {

      setLoading(true);

      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );

      const data = await res.json();

      const detailedPokemon = await Promise.all(
        data.results.map(p =>
          fetch(p.url).then(res => res.json())
        )
      );

      setPokemonData(detailedPokemon);
      setFilteredData(detailedPokemon);
      setLoading(false);
    }

    fetchPokemon();

  }, []);

  // Filter + Sort Logic

  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableAbilities, setAvailableAbilities] = useState([]);

  useEffect(() => {

    let filtered = [...pokemonData];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(p =>
        p.types.some(t => t.type.name === selectedType)
      );
    }

    // Ability filter
    if (selectedAbility) {
      filtered = filtered.filter(p =>
        p.abilities.some(a =>
          a.ability.name === selectedAbility
        )
      );
    }

    // Sorting
    if (sortOption === "name") {
      filtered.sort((a,b)=>a.name.localeCompare(b.name));
    }

    if (sortOption === "id") {
      filtered.sort((a,b)=>a.id - b.id);
    }

    if (sortOption === "attack") {
      filtered.sort((a,b)=>
        b.stats[1].base_stat - a.stats[1].base_stat
      );
    }

    if (sortOption === "hp") {
      filtered.sort((a,b)=>
        b.stats[0].base_stat - a.stats[0].base_stat
      );
    }

    setFilteredData(filtered);

    // Generate dropdown options dynamically (DEPENDENT FILTERING ⭐)
    setAvailableTypes([
      ...new Set(
        filtered.flatMap(p =>
          p.types.map(t => t.type.name)
        )
      )
    ].sort());

    setAvailableAbilities([
      ...new Set(
        filtered.flatMap(p =>
          p.abilities.map(a => a.ability.name)
        )
      )
    ].sort());

    setCurrentPage(1);

  }, [
    searchTerm,
    selectedType,
    selectedAbility,
    sortOption,
    pokemonData
  ]);

  // Reset Filters

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedAbility("");
    setSortOption("");
  };

  // Pagination

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const currentPokemon = filteredData.slice(firstIndex, lastIndex);

  // Render

  return (
    <Layout>

      <div className="top-bar">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FilterControls
          selectedType={selectedType}
          setSelectedType={setSelectedType}

          selectedAbility={selectedAbility}
          setSelectedAbility={setSelectedAbility}

          sortOption={sortOption}
          setSortOption={setSortOption}

          types={availableTypes}
          abilities={availableAbilities}

          resetFilters={resetFilters}
        />

      </div>

      {loading ? (
        <Loader />
      ) : (
        <PokedexList
          pokemon={currentPokemon}
          setSelectedPokemon={setSelectedPokemon}
        />
      )}

      <Pagination
        total={filteredData.length}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {selectedPokemon && (
        <PokemonPreview
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

    </Layout>
  );
}

export default App;