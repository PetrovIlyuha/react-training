import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Tab = ({ title, path }) => {
  let location = useLocation();
  const [highlightStyle, setHighlightStyle] = useState({
    left: -200,
    top: -50,
    opacity: 0,
  });
  const moveHighlight = (e) => {
    setHighlightStyle({
      left: e.nativeEvent.layerX - 220,
      top: e.nativeEvent.layerY - 50,
    });
  };

  const hideHighlight = (e) => {
    setHighlightStyle({ ...highlightStyle, opacity: 0 });
  };
  return (
    <div
      className="tab"
      onMouseMove={moveHighlight}
      onMouseLeave={hideHighlight}
    >
      <div className="highlight" style={highlightStyle}></div>
      <div
        href={path}
        className={`${location.pathname === path} ? "active_tab" : ""`}
      >
        {title}
      </div>
    </div>
  );
};

export default Tab;
