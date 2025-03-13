import React, { useState, useEffect } from "react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "./styles.css";

const StockGraph = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fullDataLoaded, setFullDataLoaded] = useState(false);
    const [selectedTradeCode, setSelectedTradeCode] = useState(""); // ✅ Trade Code Filter

    useEffect(() => {
        //Fetching recent data first
        fetch("http://127.0.0.1:5000/api/stocks/recent")
            .then(res => res.json())
            .then(data => {
                setStocks(data);
                setLoading(false);

                //Fetching full data in the background
                fetch("http://127.0.0.1:5000/api/stocks?limit=5000")
                    .then(res => res.json())
                    .then(fullData => {
                        setStocks(fullData);
                        setFullDataLoaded(true);
                    });
            });
    }, []);

    const cleanedStocks = stocks.filter(stock => stock.close !== 0 && stock.volume !== 0);

    const tradeCodes = [...new Set(cleanedStocks.map(stock => stock.trade_code))];

    // ✅ Filter by selected trade code
    const filteredStocks = selectedTradeCode
        ? cleanedStocks.filter(stock => stock.trade_code === selectedTradeCode)
        : cleanedStocks;

    // ✅ Sort data by date
    filteredStocks.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="graphContainer">
            <h2>Stock Trends</h2>

            {loading && <p>Loading recent stock data...</p>}
            {fullDataLoaded && <p>✅ Full data loaded!</p>}

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
