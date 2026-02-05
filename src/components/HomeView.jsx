import { useState } from "react";

const lessons = import.meta.glob("../lessons/**/front.jsx", {
  eager: true,
});

function AsideItems({ onSetView }) {
  function formatTitle(path) {
    const slug = path.split("/").slice(-2, -1)[0];
    return slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function handleSetView(module) {
    onSetView(module.default);
  }

  return Object.entries(lessons).map(([path, module]) => {
    const title = formatTitle(path);

    return (
      <li>
        <button onClick={() => handleSetView(module)}>{title}</button>
      </li>
    );
  });
}

function HomeView() {
  const [view, setView] = useState(Object.values(lessons)[0].default);

  return (
    <>
      <aside>
        <ul>
          <AsideItems onSetView={setView}></AsideItems>
        </ul>
      </aside>
      <section>{view}</section>
    </>
  );
}

export default HomeView;
