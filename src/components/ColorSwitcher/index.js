import React from "react";
import "./styles.css";

const ColorSwitcher = ({ handleColorChange }) => {
  return (
    <div className="color-switcher">
      <div
        className="color-option color-box muted-olive-green"
        onClick={() =>
          handleColorChange({
            "--primary-purple": "#556b2f", // Muted Olive Green
            "--primary-purple-shade": "#333333", // Charcoal
          })
        }
      ></div>
      <div
        className="color-option color-box deep-burgundy"
        onClick={() =>
          handleColorChange({
            "--primary-purple": "#5e2129", // Deep Burgundy
            "--primary-purple-shade": "#333333", // Charcoal
          })
        }
      ></div>
      <div
        className="color-option color-box coffee-color"
        onClick={() =>
          handleColorChange({
            "--primary-purple": "#4b2e2e", // Coffee Color
            "--primary-purple-shade": "#333333", // Charcoal
          })
        }
      ></div>
      <div
        className="color-option color-box soft-gray"
        onClick={() =>
          handleColorChange({
            "--primary-purple": "#c99585", // Updated color
            "--primary-purple-shade": "#333333", // Charcoal
          })
        }
      ></div>
      <div
        data-tip="Slate Blue"
        className="color-option color-box slate-blue"
        onClick={() =>
          handleColorChange({
            "--primary-purple": "#6a7f8d", // Slate Blue
            "--primary-purple-shade": "#333333", // Charcoal
          })
        }
      ></div>
      <div
        data-tip="Charcoal"
        className="color-option color-box charcoal"
        onClick={() =>
          handleColorChange({
            "--primary-purple": "#333333", // Charcoal
            "--primary-purple-shade": "#6a7f8d", // Slate Blue
          })
        }
      ></div>
    </div>
  );
};

export default ColorSwitcher;
