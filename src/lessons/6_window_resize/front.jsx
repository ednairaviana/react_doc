import { useEffect, useState, useRef } from "react";

function WindowResize() {
  const [widthSize, setWidthSize] = useState(null);
  const ref = useRef();

  function handleSetWidthSize(value) {
    const width = parseInt(value).toFixed(0);
    setWidthSize(width);
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        handleSetWidthSize(entry.contentRect.width);
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={(el) => {
        if (!el) return;
        ref.current = el;
      }}
      className="w-[500px] border border-[white] p-9 flex items-center justify-center text-3xl"
      style={{ resize: "both", overflow: "auto" }}
    >
      {widthSize}px
    </div>
  );
}

export default WindowResize;
