import React from "react";

const FilterInput = ({ filterText, setFilterText }) => {
  return (
    <div className="filter-input" style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Пошук за назвою..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;