const StockTable = ({ stocks }) => {
    return (
        <div className="dataTable">
        <h1>Stock Market Data</h1>
        <table border="1">
          <thead>
            <tr>
              <th>Date</th>
              <th>Trade Code</th>
              <th>High</th>
              <th>Low</th>
              <th>Open</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {stocks && stocks.map((stocks, index) => (
              <tr key={index}>
                <td>{stocks.date}</td>
                <td>{stocks.trade_code}</td>
                <td>{stocks.high}</td>
                <td>{stocks.low}</td>
                <td>{stocks.open}</td>
                <td>{stocks.close}</td>
                <td>{stocks.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
   
export default StockTable;