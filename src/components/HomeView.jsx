import { useState } from "react";

const lessons = import.meta.glob("../lessons/**/front.jsx", {
  eager: true,
});

// -------- utils --------
function formatTitle(path) {
  const slug = path.split("/").slice(-2, -1)[0];

  return slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// -------- Aside --------
function AsideItems({ lessons, onSelect }) {
  return (
    <>
      {Object.keys(lessons).map((path) => (
        <li key={path}>
          <button onClick={() => onSelect(path)}>{formatTitle(path)}</button>
        </li>
      ))}
    </>
  );
}

// -------- Page --------
function HomeView() {
  const lessonPaths = Object.keys(lessons);
  const [activePath, setActivePath] = useState(lessonPaths[0]);
  const ActiveView = lessons[activePath].default;

  return (
    <div className="container grid grid-cols-[1fr_2fr]">
      <aside>
        <ul>
          <AsideItems lessons={lessons} onSelect={setActivePath} />
        </ul>
      </aside>

      <section>
        <ActiveView />
      </section>
    </div>
  );
}

export default HomeView;
