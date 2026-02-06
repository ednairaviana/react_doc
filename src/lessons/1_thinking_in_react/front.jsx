import { useState } from "react";
import movies from "./data";

function SearchBar({
  isWatchedOnly,
  onIsWatchedOnlyChange,
  filterText,
  onFilterTextChange,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="search">Search Movie</label>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-5">
        <label htmlFor="watched">Show only watched movies</label>
        <input
          id="watched"
          type="checkbox"
          onChange={(e) => onIsWatchedOnlyChange(e.target.checked)}
          checked={isWatchedOnly}
        />
      </div>
    </div>
  );
}

function MoviesList({ isWatchedOnly, filterText }) {
  const filteredMovies = movies.filter((movie) => {
    if (isWatchedOnly && !movie.watched) return false;

    return movie.title.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <ul>
      {filteredMovies.map((movie) => (
        <li key={movie.id} className={movie.watched ? "text-green-600" : ""}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

function MovieView() {
  const [isWatchedOnly, setIsWatchedOnly] = useState(false);
  const [filterText, setFilterText] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <SearchBar
        isWatchedOnly={isWatchedOnly}
        onIsWatchedOnlyChange={setIsWatchedOnly}
        filterText={filterText}
        onFilterTextChange={setFilterText}
      />
      <MoviesList isWatchedOnly={isWatchedOnly} filterText={filterText} />
    </div>
  );
}

export default MovieView;
