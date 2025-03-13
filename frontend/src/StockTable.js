import React, { useState } from "react";
import "./styles.css";

const StockTable = ({ stocks, setStocks, handleDelete }) => {
    const [editingRow, setEditingRow] = useState(null);
    const [editData, setEditData] = useState({});

    const startEditing = (stock) => {
        setEditingRow(stock.date + stock.trade_code);
        setEditData(stock);
    };

    const handleEditChange = (e, field) => {
        setEditData({ ...editData, [field]: e.target.value });
    };

    const saveEdit = () => {
        fetch(`http://127.0.0.1:5000/api/stocks/${editData.date}/${editData.trade_code}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editData),
        })
        .then(res => res.json())
        .then(() => {
            setStocks(stocks.map(stock =>
                (stock.date === editData.date && stock.trade_code === editData.trade_code) ? editData : stock
            ));
            setEditingRow(null);
        })
        .catch(error => console.error("Error updating stock:", error));
    };

    return (
      <div className="tableContainer">
        <h1 className="tableTitle">Stock Market Data</h1>
        <div className="tableWrapper">
          <table className="table">
            <thead className="tableHeader">
              <tr>
                <th>Date</th>
                <th>Trade Code</th>
                <th>High</th>
                <th>Low</th>
                <th>Open</th>
                <th>Close</th>
                <th>Volume</th>
                <th>Update</th>
                <th>Remove</th>
              </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.date + stock.trade_code} className="tableRow">
                <td className="tableCell">{stock.date}</td>
                <td className="tableCell">{stock.trade_code}</td>
                {["high", "low", "open", "close", "volume"].map(field => (
                  <td key={field} className="tableCell">
                    {editingRow === stock.date + stock.trade_code ? (
                      <input
                        type="text"
                        value={editData[field] || ""}
                        onChange={(e) => handleEditChange(e, field)}
                        className="editInput"
                      />
                  ) : (
                      stock[field]
                    )}
                  </td>
                ))}
                
                <td className="tableCell">
                  {editingRow === stock.date + stock.trade_code ? (
                    <button className="saveButton" onClick={saveEdit}
                    >Save</button>
                  ) : (
                    <button className="editButton" onClick={() =>
                      startEditing(stock)}>Edit</button>
                  )}
                </td>
                <td className="tableCell">
                  <button className="deleteButton" onClick={() => 
                  handleDelete(stock.date, stock.trade_code)}>Delete
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};


export default StockTable;
