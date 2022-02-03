import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, handleAddItem }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchedName, setSearchedName] = useState('All')

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  function onSearchChange(e) {
    setSearchedName(e.target.value);
  }

  function onItemFormSubmit(newItem) {
    handleAddItem(newItem)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  const searchedItemsToDisplay = itemsToDisplay.filter((item) => {
    if (searchedName === 'All') return true;

    return item.name.toLowerCase().includes(searchedName.toLowerCase()) 
  })

  return (
    <div className="ShoppingList">
      <ItemForm 
      onItemFormSubmit={onItemFormSubmit}
      />
      <Filter 
      search={searchedName}
      onSearchChange = {onSearchChange} 
      onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {searchedItemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
