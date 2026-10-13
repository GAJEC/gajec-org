import React from "react";
import "../../assets/styles/components/UI.css";
import Icon from "./Icon";

const ScrollToTop = () => (
  <button
    type="button"
    className="scroll-top"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Scroll to top"
  >
    <Icon name="arrow-up" size={16} />
  </button>
);

export default ScrollToTop;
