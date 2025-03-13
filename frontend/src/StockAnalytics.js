import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import "./styles.css";

const calculateMovingAverage = (data, period = 7) => {
    return data.map((stock, index, arr) => {
        if (index < period - 1) return { ...stock, movingAvg: null };
        const avg = arr.slice(index - period + 1, index + 1).reduce((sum, s) => sum + parseFloat(s.close), 0) / period;
        return { ...stock, movingAvg: avg };
    });
};

const StockAnalytics = ({ stocks }) => {
    const movingAverageData = calculateMovingAverage([...stocks].sort((a, b) => new Date(a.date) - new Date(b.date)));

    const volumeByStock = stocks.reduce((acc, stock) => {
        acc[stock.trade_code] = (acc[stock.trade_code] || 0) + stock.volume;
        return acc;
    }, {});

    const pieData = Object.keys(volumeByStock).map((trade_code) => ({
        name: trade_code,
        value: volumeByStock[trade_code]
    }));

    const topStocks = Object.entries(volumeByStock)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([trade_code, volume]) => ({ trade_code, volume }));

    return (
        <div className="graphContainer">
            <h2>7-Day Moving Average</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={movingAverageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="close" stroke="#8884d8" />
                    <Line type="monotone" dataKey="movingAvg" stroke="#ff7300" strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>

            <h2>Stock Volume Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"][index % 5]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <h2>Top 5 Stocks by Trading Volume</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topStocks}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="trade_code" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="volume" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockAnalytics;