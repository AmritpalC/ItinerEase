import { useState, useEffect } from "react"
import "./BudgetTable.css"
import * as itinerariesAPI from "../../utilities/itineraries-api"

import { Table } from 'reactstrap'


export default function BudgetTable({ itinerary, setRefreshItineraries }) {

  const [budgetItems, setBudgetItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [newCost, setNewCost] = useState('')

  useEffect(() => {
    setBudgetItems(itinerary.budget)
  }, [itinerary.budget])

  const handleAddItem = async () => {
    if (newItem && newCost) {
      const newBudgetItem = { name: newItem, cost: parseFloat(newCost)}
      const updatedItems = [...budgetItems, newBudgetItem]
      setBudgetItems(updatedItems)
      setNewItem('')
      setNewCost('')
      await itinerariesAPI.updateItinerary(itinerary._id, { budget: updatedItems })
      setRefreshItineraries(true)
    }
  }

  const handleUpdateItem = async (index, field, value) => {
    const updatedItems = [...budgetItems]
    updatedItems[index][field] = field === 'cost' ? parseFloat(value) || 0 : value || ''
    setBudgetItems(updatedItems)
    await itinerariesAPI.updateItinerary(itinerary._id, { budget: updatedItems })
  };

  const handleRemoveItem = async (index) => {
    const updatedItems = [...budgetItems]
    updatedItems.splice(index, 1)
    setBudgetItems(updatedItems)
    await itinerariesAPI.updateItinerary(itinerary._id, { budget: updatedItems })
    setRefreshItineraries(true)
  }

  const calculateTotalCost = () => {
    return budgetItems.reduce((total, item) => total + item.cost, 0)
  }

  return (
    <>
      <div>This is the BudgetTable Page</div>
      <hr />
      <h2>Budget Table for {itinerary.name}</h2>
      <h4>List of budget items:</h4>
      {/* <ul className="budget-list">
        {itinerary.budget.map((item, idx) => (
          <li key={idx}>{item.name} - {item.cost}</li>
        ))}
      </ul> */}
      <hr />
      <table className="table table-primary table-striped budget-table">
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
                  defaultValue={item.cost.toString()}
                  onChange={(e) =>
                    handleUpdateItem(index, 'cost', parseFloat(e.target.value))
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
      <div className="add-budget-item">
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