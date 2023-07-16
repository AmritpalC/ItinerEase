import { useState } from "react";
import "./BudgetTable.css"


export default function BudgetTable() {

  const [budgetItems, setBudgetItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [newCost, setNewCost] = useState('')

  const handleAddItem = () => {
    if (newItem && newCost) {
      const newBudgetItem = { name: newItem, cost: Number(newCost)}
      setBudgetItems([...budgetItems, newBudgetItem])
      setNewItem('')
      setNewCost('')
    }
  }

  const handleUpdateItem = (index, field, value) => {
    const updatedItems = [...budgetItems];
    updatedItems[index][field] = value;
    setBudgetItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...budgetItems]
    updatedItems.splice(index, 1)
    setBudgetItems(updatedItems)
  }

  const calculateTotalCost = () => {
    return budgetItems.reduce((total, item) => total + item.cost, 0)
  }

  return (
    <>
      <div>This is the BudgetTable Page</div>
      <hr />
      <h2>Budget Table</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgetItems.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleUpdateItem(index, 'name', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.cost}
                  onChange={(e) =>
                    handleUpdateItem(index, 'cost', Number(e.target.value))
                  }
                />
              </td>
              <td>
                <button onClick={() => handleRemoveItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Total</td>
            <td>{calculateTotalCost()}</td>
          </tr>
        </tfoot>
      </table>
      <div>
        <input
          type="text"
          placeholder="Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost"
          value={newCost}
          onChange={(e) => setNewCost(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </>
  )
}