import { useState, useEffect } from "react";

function ShowStatus({ status }) {
  switch (status) {
    case "init":
      return <div>Just waiting for your seach</div>;

    case "loading":
      return <div>Loading</div>;

    case "error":
      return <div className="text-red-600">Error</div>;
    default:
      return <div>Undefined Status</div>;
  }
}

function BookCard(props) {
  return (
    <li className="border border-white flex flex-col">
      <img
        className="aspect-2/3 bg-gray-500"
        src={`https://covers.openlibrary.org/b/${props.coverKey}/${props.coverId}-M.jpg`}
        alt=""
      />
      <div className="p-4 flex flex-col justify-between grow">
        <div>
          <h3 className="text-xl">{props.title}</h3>
          <p className="text-[14px] mt-0.5">{props.author}</p>
        </div>
        <a
          href={`https://openlibrary.org${props.infoId}`}
          target="_blank"
          className="inline-block text-[12px] text-blue-300 mt-6"
        >
          View Info
        </a>
      </div>
    </li>
  );
}

function View() {
  const [books, setBooks] = useState("");
  const [value, setValue] = useState("");
  const [resultStatus, setResultStatus] = useState("init");

  useEffect(() => {
    let ignore = false;
    const timer = setTimeout(() => {
      fetchBooks(value);
    }, 1000);

    async function fetchBooks(q) {
      if (value === null || value.length < 2) return;
      try {
        const search = `https://openlibrary.org/search.json?q=${q.replaceAll(" ", "+")}`;
        const res = await fetch(search);
        const data = await res.json();

        if (ignore) return;
        setBooks(data);
        setResultStatus("success");
      } catch (error) {
        console.error(error);
        setResultStatus("error");
      }
    }

    return () => {
      clearTimeout(timer);
      ignore = true;
    };
  }, [value]);

  return (
    <div className="flex flex-col gap-5">
      <div
        style={{ position: "sticky", top: 0, background: "#242424" }}
        className="py-2.5 -mt-2.5 border-b-1 border-gray-300"
      >
        <input
          onChange={(e) => {
            setValue(e.target.value);

            if (e.target.value === "") {
              setResultStatus("init");
            } else {
              setResultStatus("loading");
            }
          }}
          type="text"
          placeholder="Search"
          value={value}
        />
      </div>
      <ul className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {resultStatus === "success" ? (
          books.docs.map((book) => {
            return (
              <BookCard
                key={book.key}
                title={book.title}
                author={book.author_name}
                coverId={
                  book.cover_i === undefined
                    ? book.cover_edition_key
                    : book.cover_i
                }
                coverKey={book.cover_i === undefined ? "olid" : "id"}
                infoId={book.key}
              />
            );
          })
        ) : (
          <ShowStatus status={resultStatus} />
        )}
      </ul>
    </div>
  );
}

export default View;
