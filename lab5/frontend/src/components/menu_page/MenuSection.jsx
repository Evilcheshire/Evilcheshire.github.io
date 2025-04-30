import React from "react";
import MenuItem from "./MenuItem";

const MenuSection = ({ title, items }) => (
  <>
    <tr className="show"><th colSpan="4">{title}</th></tr>
    {items.map((item, idx) => (
      <MenuItem key={idx} item={item} />
    ))}
  </>
);

export default MenuSection;