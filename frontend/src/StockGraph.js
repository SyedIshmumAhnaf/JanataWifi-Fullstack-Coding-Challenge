import React, { useState } from "react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart, Legend } from "recharts";
import "./styles.css";

const StockGraph = ({ stocks }) => {
    const [selectedTradeCode, setSelectedTradeCode] = useState("");
    const tradeCodes = [...new Set(stocks.map(stock => stock.trade_code))];
    const filteredStocks = selectedTradeCode
        ? stocks.filter(stock => stock.trade_code === selectedTradeCode)
        : stocks;
        filteredStocks.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="graphContainer">
            <h2>Stock Market Trends</h2>
            <label>Select Trade Code: </label>
            <select onChange={(e) => setSelectedTradeCode(e.target.value)} value={selectedTradeCode}>
                <option value="">All</option>
                {tradeCodes.map((code, index) => (
                    <option key={index} value={code}>{code}</option>
                ))}
            </select>

            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={filteredStocks}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#007bff" />
                    <YAxis yAxisId="right" orientation="right" stroke="#28a745" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="right" dataKey="volume" fill="#28a745" />
                    <Line yAxisId="left" type="monotone" dataKey="close" stroke="#007bff" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockGraph;