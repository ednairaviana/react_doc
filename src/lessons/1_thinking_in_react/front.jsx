import movies from "./data";

function SearchBar() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="search">Search Movie</label>
        <input id="search" type="text" placeholder="Search..." />
      </div>
      <div className="flex flex-row gap-1">
        <label htmlFor="search">Show only watched movies</label>
        <input id="search" type="checkbox" value="only_watched" />
      </div>
    </div>
  );
}

function MoviesList() {
  return (
    <ul>
      {movies.map((movie) => {
        return <li key={movie.id}>{movie.title}</li>;
      })}
    </ul>
  );
}

function MovieView() {
  return (
    <div className="flex flex-col gap-8">
      <SearchBar />
      <MoviesList />
    </div>
  );
}

export default MovieView;
