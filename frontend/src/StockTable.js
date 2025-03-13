import "./styles.css";

const StockTable = ({ stocks, handleDelete }) => {
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, index) => (
                  <tr key={index} className="tableRow">
                    <td className="tableCell">{stock.date}</td>
                    <td className="tableCell">{stock.trade_code}</td>
                    <td className="tableCell">{stock.high}</td>
                    <td className="tableCell">{stock.low}</td>
                    <td className="tableCell">{stock.open}</td>
                    <td className="tableCell">{stock.close}</td>
                    <td className="tableCell">{stock.volume}</td>
                    <td className="tableCell">
                      <button className="deleteButton" onClick={() => handleDelete(stock.date, stock.trade_code)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
   
export default StockTable;