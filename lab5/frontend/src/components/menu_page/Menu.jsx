import React, { useState, useEffect } from "react";
import MenuSection from "./MenuSection";
import SortControls from "./SortControls";
import FilterInput from "./FilterInput";

const Menu = () => {
  const [menuData, setMenuData] = useState([]); 
  const [sortBy, setSortBy] = useState(null); 
  const [filterText, setFilterText] = useState("");
  const [menuLoaded, setMenuLoaded] = useState(false); 

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Не вдалося завантажити меню');
  
        const data = await response.json();
  
        data.sort((a, b) => a.order - b.order);
        setMenuData(data);
      } catch (err) {
        console.error('Помилка при завантаженні меню:', err);
      } finally {
        setMenuLoaded(true);
      }
    };
  
    loadMenuData();
  }, []);

  const getFilteredAndSortedItems = (items) => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filtered;
    }
  };

  if (!menuLoaded) {
    return <div>Завантаження меню...</div>;
  }

  return (
    <main>
      <section className="menu">
        <h2>Наше меню</h2>
        <SortControls sortBy={sortBy} setSortBy={setSortBy} />
        <FilterInput filterText={filterText} setFilterText={setFilterText} />
        <table className="menu-table">
          <thead>
              <th>Зображення</th>
              <th>Страва</th>
              <th>Опис</th>
              <th>Ціна</th>
          </thead>
          <tbody>
            {menuData.map((section, idx) => {
              const sortedFilteredItems = getFilteredAndSortedItems(section.items);
              if (sortedFilteredItems.length === 0) return null;

              return (
                <MenuSection
                  key={idx}
                  title={section.title}
                  items={sortedFilteredItems}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Menu;
