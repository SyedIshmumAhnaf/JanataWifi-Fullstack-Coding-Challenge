import { useState } from "react";
import "./styles.css";

const AddStock = ({ addStock }) => {
    const [stock, setStock] = useState({
        date: "",
        trade_code: "",
        high: "",
        low: "",
        open: "",
        close: "",
        volume: "",
    });

    const handleChange = (e) => {
        setStock({ ...stock, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addStock(stock);
        setStock({
            date: "",
            trade_code: "",
            high: "",
            low: "",
            open: "",
            close: "",
            volume: "",
        });
    };

    return (
        <div className="addStockContainer">
            <h2>Add New Stock</h2>
            <form onSubmit={handleSubmit} className="addStockForm">
                <input type="date" name="date" value={stock.date} onChange={handleChange} required />
                <input type="text" name="trade_code" placeholder="Trade Code" value={stock.trade_code} onChange={handleChange} required />
                <input type="number" name="high" placeholder="High" value={stock.high} onChange={handleChange} required />
                <input type="number" name="low" placeholder="Low" value={stock.low} onChange={handleChange} required />
                <input type="number" name="open" placeholder="Open" value={stock.open} onChange={handleChange} required />
                <input type="number" name="close" placeholder="Close" value={stock.close} onChange={handleChange} required />
                <input type="number" name="volume" placeholder="Volume" value={stock.volume} onChange={handleChange} required />
                <button type="submit">Add Stock</button>
            </form>
        </div>
    );
};

export default AddStock;
