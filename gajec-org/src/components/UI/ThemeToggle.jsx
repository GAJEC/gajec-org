import React from "react";
import "../../assets/styles/components/UI.css";
import Icon from "./Icon";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <Icon key={theme} name={theme === "dark" ? "sun" : "moon"} size={16} />
    </button>
  );
};

export default ThemeToggle;
