import React, { useState, useRef, useEffect } from "react";

const MenuItem = ({ item }) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const rowRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => {
      if (rowRef.current) {
        observer.unobserve(rowRef.current);
      }
    };
  }, []);

  const getImage = (imageName) => require(`../../assets/images/${imageName}`);

  return (
    <tr
      ref={rowRef}
      className={`content ${visible ? "show" : ""}`}
    >
      <td><img src={getImage(item.image)} alt={item.alt} /></td>
      <td>{item.name}</td>
      <td>
        <div>{item.description}</div>
        {item.ingredients && (
          <div className={`ingredients-container ${showIngredients ? "visible" : ""}`}>
            <button
              className="ingridients-button"
              onClick={() => setShowIngredients(!showIngredients)}
            >
              {showIngredients ? "Сховати інгредієнти" : "Показати інгредієнти"}
            </button>
            <span className="ingredients-text">
              {item.ingredients}
            </span>
          </div>
        )}
      </td>
      <td>{`€${item.price.toFixed(2)}`}</td>
    </tr>
  );
};

export default MenuItem;