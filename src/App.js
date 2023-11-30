import { useLoacalStorage } from "./useLocalstorage";
import { useState } from "react";

function App() {
  const [items, setItems] = useLoacalStorage([], "items");
  function clearList() {
    setItems([]);
  }
  function handleAdditem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Header />
      <From items={items} onAddItems={handleAdditem} />
      <PackingList
        onclearList={clearList}
        onToggleItem={handleToggleItem}
        onDeleteitems={handleDelete}
        items={items}
      />
      <Stat items={items} />
    </div>
  );
}
function Header() {
  return <h1>Far Away</h1>;
}
function From({ onAddItems, items }) {
  function handlesubmit(e) {
    e.preventDefault(e);
    if (!description) return;
    const newItem = { description, quantity, id: Date.now(), packed: false };
    console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <p>What do you need in your trip?</p>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="...items"
      />

      <button onClick={handlesubmit}>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteitems, onToggleItem, onclearList }) {
  const [sortBy, setSort] = useState("input");
  let sortedItem;
  if (sortBy === "input") sortedItem = items;
  if (sortBy === "description")
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItem.map((items) => (
          <li key={items.id}>
            <input
              type="checkbox"
              value={items.packed}
              onChange={() => onToggleItem(items.id)}
            />
            <span
              style={items.packed ? { textDecoration: "line-through" } : {}}
            >
              {items.quantity} {items.description}
            </span>

            <button onClick={() => onDeleteitems(items.id)}>❌</button>
          </li>
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSort(e.target.value)}>
          <option value="input">Sort item by input order</option>
          <option value="description">Sort item by description</option>
          <option value="packed">Sort item by packed status</option>
        </select>
        <button onClick={onclearList}>Clear list</button>
      </div>
    </div>
  );
}
function Stat({ items }) {
  const numItems = items.length;
  return (
    <footer className="stats">
      You Have {numItems} Items In Your Packig List
    </footer>
  );
}

export default App;
