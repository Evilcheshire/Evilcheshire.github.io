import React from "react";

const SortControls = ({ sortBy, setSortBy }) => (
  <div className="sort-controls" style={{ marginBottom: "1rem", textAlign: "center" }}>
    <span style={{ fontWeight: "bold", marginRight: "10px" }}>Фільтри: </span>
    <button
      onClick={() => setSortBy("price-asc")}
      className={`filter-button ${sortBy === "price-asc" ? "active" : ""}`}
    >
      Ціна: від дешевших
    </button>
    <button
      onClick={() => setSortBy("price-desc")}
      className={`filter-button ${sortBy === "price-desc" ? "active" : ""}`}
    >
      Ціна: від дорожчих
    </button>
    <button
      onClick={() => setSortBy("name-asc")}
      className={`filter-button ${sortBy === "name-asc" ? "active" : ""}`}
    >
      Назва: від А до Я
    </button>
    <button
      onClick={() => setSortBy("name-desc")}
      className={`filter-button ${sortBy === "name-desc" ? "active" : ""}`}
    >
      Назва: від Я до А
    </button>
    <button
      onClick={() => setSortBy(null)}
      className="filter-button reset-button"
    >
      Очистити фільтри
    </button>
  </div>
);

export default SortControls;
